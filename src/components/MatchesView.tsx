import React, { useState, useEffect } from 'react';
import { Sparkles, Check, Clock, UserCheck, X, Compass, CheckCircle, Calendar, List, MapPin } from 'lucide-react';
import { MatchProfile, TangentEvent } from '../types';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Deterministic day-of-month for an event so the calendar placement is stable per event.
function eventDayOfMonth(event: TangentEvent, daysInMonth: number) {
  const hash = event.id.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return (hash % daysInMonth) + 1;
}

// Events section shown inside the match profile dialog: Calendar (default) + List views.
function ProfileEventsSection({ events, personName, resetKey }: { events: TangentEvent[]; personName: string; resetKey: string }) {
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Reset to the default (calendar view, default day) whenever a different member is opened
  useEffect(() => {
    setView('calendar');
    setSelectedDay(null);
  }, [resetKey]);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthLabel = today.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();

  // Map events onto deterministic days of the current month
  const eventsByDay = new Map<number, TangentEvent[]>();
  events.forEach((evt) => {
    const day = eventDayOfMonth(evt, daysInMonth);
    const list = eventsByDay.get(day) || [];
    list.push(evt);
    eventsByDay.set(day, list);
  });

  const firstEventDay = events.length ? eventDayOfMonth(events[0], daysInMonth) : null;
  const activeDay = selectedDay ?? firstEventDay;
  const activeDayEvents = activeDay ? (eventsByDay.get(activeDay) || []) : [];

  // Build calendar grid cells (leading blanks + day numbers)
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="space-y-3 text-left pt-1">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
          Events
        </h4>

        {/* Calendar / List view toggle */}
        <div className="flex items-center bg-zinc-100 rounded-md p-0.5 select-none">
          <button
            type="button"
            onClick={() => setView('calendar')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide transition cursor-pointer ${
              view === 'calendar' ? 'bg-white text-black shadow-2xs' : 'text-zinc-500 hover:text-black'
            }`}
            id="profile-events-view-calendar"
          >
            <Calendar className="w-3 h-3" />
            <span>Calendar</span>
          </button>
          <button
            type="button"
            onClick={() => setView('list')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide transition cursor-pointer ${
              view === 'list' ? 'bg-white text-black shadow-2xs' : 'text-zinc-500 hover:text-black'
            }`}
            id="profile-events-view-list"
          >
            <List className="w-3 h-3" />
            <span>List</span>
          </button>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-6 bg-zinc-50 border border-zinc-150 rounded-lg">
          <p className="text-xs text-zinc-500">No other events for {personName} yet.</p>
        </div>
      ) : view === 'calendar' ? (
        <div className="space-y-3" id="profile-events-calendar">
          <p className="text-xs font-bold text-zinc-800 text-center">{monthLabel}</p>

          {/* Weekday header */}
          <div className="grid grid-cols-7 gap-1">
            {WEEKDAYS.map((w) => (
              <span key={w} className="text-[9px] font-bold text-zinc-400 text-center uppercase">
                {w}
              </span>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, idx) => {
              if (day === null) return <span key={`blank-${idx}`} />;
              const hasEvents = eventsByDay.has(day);
              const isActive = activeDay === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => hasEvents && setSelectedDay(day)}
                  disabled={!hasEvents}
                  className={`relative aspect-square rounded-md text-[11px] font-semibold flex items-center justify-center transition ${
                    isActive && hasEvents
                      ? 'bg-black text-white'
                      : hasEvents
                      ? 'bg-teal-50 text-teal-800 hover:bg-teal-100 cursor-pointer'
                      : 'text-zinc-400'
                  }`}
                >
                  {day}
                  {hasEvents && !isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Events for the selected day */}
          <div className="space-y-2 pt-1">
            {activeDayEvents.length > 0 ? (
              activeDayEvents.map((evt) => (
                <div key={evt.id} className="flex items-center space-x-3 p-2.5 border border-zinc-150 rounded-lg">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-10 h-10 rounded object-cover shrink-0 filter brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-zinc-900 truncate capitalize">{evt.title}</p>
                    <p className="text-[10px] text-zinc-500 font-medium truncate">{evt.dateTime}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[11px] text-zinc-400 text-center py-2">
                Select a highlighted day to see events.
              </p>
            )}
          </div>
        </div>
      ) : (
        /* LIST VIEW */
        <div className="space-y-2" id="profile-events-list">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="flex items-center space-x-3 p-2.5 border border-zinc-150 rounded-lg hover:border-teal-300 transition"
            >
              <img
                src={evt.image}
                alt={evt.title}
                className="w-12 h-12 rounded object-cover shrink-0 filter brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-zinc-900 truncate capitalize">{evt.title}</p>
                <p className="text-[10px] text-zinc-500 font-medium flex items-center space-x-1 truncate">
                  <Calendar className="w-3 h-3 shrink-0" />
                  <span className="truncate">{evt.dateTime}</span>
                </p>
                <p className="text-[10px] text-zinc-500 font-medium flex items-center space-x-1 truncate">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{evt.location.split(',')[0]}</span>
                </p>
              </div>
              <span className="text-[8px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded uppercase tracking-wide shrink-0">
                {evt.category}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface MatchesViewProps {
  matches: MatchProfile[];
  events: TangentEvent[];
  eventFilter?: { category: string; title: string } | null;
  onClearFilter?: () => void;
}

export default function MatchesView({ matches, events, eventFilter, onClearFilter }: MatchesViewProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'high' | 'shared' | 'nearby'>('all');
  const [selectedMatch, setSelectedMatch] = useState<MatchProfile | null>(null);
  const [inviteMatch, setInviteMatch] = useState<MatchProfile | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState<string | null>(null);

  // Reset tab filter to "All" whenever a new event filter arrives
  useEffect(() => {
    if (eventFilter) setActiveFilter('all');
  }, [eventFilter]);

  // Narrow to companions whose skills overlap with the event category (loose contains-match).
  // Falls back to the full list when no skill overlap is found.
  const skillMatchesCategory = (skills: string[], category: string) => {
    const catLow = category.toLowerCase();
    return skills.some(sk => {
      const skLow = sk.toLowerCase();
      return skLow === catLow || skLow.includes(catLow) || catLow.includes(skLow);
    });
  };

  const categoryMatches = eventFilter
    ? matches.filter(m => skillMatchesCategory(m.skills, eventFilter.category))
    : matches;

  // If no skill overlap found, fall back to all matches so the page is never empty
  const noExactSkillMatch = eventFilter !== null && eventFilter !== undefined && categoryMatches.length === 0;
  const baseMatches = noExactSkillMatch ? matches : categoryMatches;

  // Filtered Matches
  const filteredMatches = baseMatches.filter(m => {
    if (activeFilter === 'high') return m.reliability >= 97;
    if (activeFilter === 'shared') return m.suggestedCommonEvents >= 3;
    if (activeFilter === 'nearby') return m.id === 'm1' || m.id === 'm3'; // Simulated geographically local
    return true; // All
  });

  const handleSendInvite = (eventName: string) => {
    if (!inviteMatch) return;
    setInviteSuccess(`Invitation request to ${inviteMatch.name} for "${eventName}" sent successfully!`);
    setTimeout(() => {
      setInviteSuccess(null);
      setInviteMatch(null);
    }, 2500);
  };

  // Derive "this member's other events" from the global list (no real association in mock data).
  // Match by skill/category overlap; fall back to a stable slice so the section is never empty.
  const getMatchEvents = (match: MatchProfile): TangentEvent[] => {
    const active = events.filter((e) => !e.isDraft);
    const bySkill = active.filter((e) =>
      match.skills.some((sk) => {
        const s = sk.toLowerCase();
        const cat = e.category.toLowerCase();
        const tag = (e.tag || '').toLowerCase();
        return s === cat || cat.includes(s) || s.includes(cat) || (!!tag && (tag.includes(s) || s.includes(tag)));
      })
    );
    if (bySkill.length > 0) return bySkill;
    if (active.length === 0) return [];
    const hash = match.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const start = hash % active.length;
    return [...active.slice(start), ...active.slice(0, start)].slice(0, 3);
  };

  return (
    <div className="max-w-xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-300" id="matches-view-panel">
      
      {/* Intro Copy */}
      <div className="space-y-1">
        <h1 className="font-display text-2xl font-bold text-black tracking-tight flex items-center space-x-2">
          <span>Activity Companions</span>
        </h1>
        <p className="text-xs text-zinc-650 leading-relaxed font-sans">
          Connect with reliable activity partners who share your interests and schedule. Every match is vetted by the community.
        </p>
      </div>

      {/* Event context filter banner */}
      {eventFilter && (
        <div className="flex items-center justify-between bg-teal-50 border border-teal-200 rounded-lg px-4 py-3 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-center space-x-2 min-w-0">
            <Sparkles className="w-3.5 h-3.5 text-teal-700 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-teal-900 truncate">
                {eventFilter.category} companions for:
              </p>
              <p className="text-[11px] text-teal-700 font-medium truncate">
                "{eventFilter.title}"
              </p>
              {noExactSkillMatch && (
                <p className="text-[10px] text-teal-600 mt-0.5">
                  No exact skill match — showing all companions
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClearFilter}
            className="p-1.5 text-teal-500 hover:text-teal-900 hover:bg-teal-100 rounded-full transition cursor-pointer shrink-0 ml-2"
            title="Clear filter"
            id="matches-clear-event-filter"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Filter Tabs matching Image 8 */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1 select-none">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeFilter === 'all' ? 'bg-black text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
          }`}
          id="match-filter-all"
        >
          All Matches
        </button>
        <button
          onClick={() => setActiveFilter('high')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeFilter === 'high' ? 'bg-black text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
          }`}
          id="match-filter-reliability"
        >
          High Reliability
        </button>
        <button
          onClick={() => setActiveFilter('shared')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeFilter === 'shared' ? 'bg-black text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
          }`}
          id="match-filter-shared"
        >
          Shared Events
        </button>
        <button
          onClick={() => setActiveFilter('nearby')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeFilter === 'nearby' ? 'bg-black text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
          }`}
          id="match-filter-nearby"
        >
          Nearby
        </button>
      </div>

      {/* Render Matches List */}
      <div className="space-y-4">
        {filteredMatches.map((item) => (
          <div 
            key={item.id}
            className="bg-white border text-left border-zinc-150 rounded-lg p-5 flex flex-col justify-between space-y-4 shadow-3xs hover:shadow-xs transition relative overflow-hidden"
            id={`match-card-${item.id}`}
          >
            {/* Top Match ribbon badge as seen in top right of Image 8 */}
            {item.status && (
              <span className="absolute top-4 right-4 bg-teal-100 text-teal-800 text-[9px] font-extrabold px-2.5 py-1 uppercase rounded-full shadow-2xs">
                {item.status}
              </span>
            )}

            <div className="flex items-start space-x-4">
              <img 
                src={item.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'} 
                alt={item.name} 
                className="w-14 h-14 rounded-full object-cover border border-zinc-200 filter brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="font-display text-base font-bold text-black flex items-center space-x-1.5">
                  <span>{item.name}</span>
                  <CheckCircle className="w-4 h-4 text-teal-600 fill-teal-105" />
                </h3>
                
                {/* Reliability Score stats */}
                <p className="text-xs font-semibold text-zinc-500">
                  🛡️ Reliability: <span className="text-teal-700 font-bold">{item.reliability}%</span>
                </p>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.skills.map((sk) => (
                    <span 
                      key={sk} 
                      className="bg-zinc-100 text-zinc-800 font-medium text-[9px] px-2.5 py-0.5 rounded-full uppercase"
                    >
                      {sk}
                    </span>
                  ))}
                  <span className="text-[9px] text-zinc-400 font-bold px-1.5">+2</span>
                </div>
              </div>
            </div>

            {/* Suggested events summary */}
            <div className="border-t border-zinc-55 pt-3.5">
              <p className="text-xs text-zinc-600 flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Suggested Events in Common: <strong className="text-zinc-900 font-bold">{item.suggestedCommonEvents}</strong></span>
              </p>
            </div>

            {/* Match CTA Actions */}
            <div className="grid grid-cols-2 gap-3.5 pt-1">
              <button
                onClick={() => setInviteMatch(item)}
                className="bg-black hover:bg-zinc-800 text-white font-bold text-xs py-3 rounded text-center tracking-wide transition cursor-pointer select-none active:scale-98"
                id={`invite-match-${item.id}`}
              >
                Invite to Event
              </button>
              <button
                onClick={() => setSelectedMatch(item)}
                className="bg-white hover:bg-zinc-50 text-zinc-805 font-bold text-xs py-2.5 rounded border border-black text-center tracking-wide transition cursor-pointer select-none"
                id={`view-match-bio-${item.id}`}
              >
                View Profile
              </button>
            </div>

          </div>
        ))}

        {filteredMatches.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-zinc-150">
            <p className="text-sm text-zinc-655 font-medium">
              No matches found with this configuration filter.
            </p>
          </div>
        )}
      </div>

      {/* MATCH BIO SHOWCASE MODAL / DRAWER */}
      {selectedMatch && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          onClick={() => setSelectedMatch(null)}
        >
          <div
            className="bg-white rounded-lg border border-zinc-200 shadow-2xl p-6 w-full max-w-md relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedMatch(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-black transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center space-y-3 pb-4">
              <img 
                src={selectedMatch.avatar} 
                alt={selectedMatch.name} 
                className="w-20 h-20 rounded-full object-cover border-2 border-teal-400 filter brightness-95"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="font-display text-lg font-bold text-black flex items-center justify-center space-x-1">
                  <span>{selectedMatch.name}</span>
                  <CheckCircle className="w-4.5 h-4.5 text-teal-600 fill-teal-50" />
                </h3>
                <p className="text-xs text-zinc-500 font-semibold mt-0.5">
                  Joined since February 2023 • Seattle Community
                </p>
                <div className="inline-flex items-center space-x-1.5 bg-zinc-50 border px-3 py-1 rounded-full text-[10px] text-zinc-600 font-bold uppercase tracking-wider mt-2.5">
                  <span>🛡️ Vetted Accuracy:</span>
                  <span className="text-teal-700">{selectedMatch.reliability}% Reliability score</span>
                </div>
              </div>
            </div>

            <hr className="border-zinc-100 my-4" />

            <div className="space-y-3 text-left">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                My Story / Bio
              </h4>
              <p className="text-xs text-zinc-755 leading-relaxed font-sans">
                "Hey! I am {selectedMatch.name}. I love getting outdoors, experimenting with film photography, and joining local community workshops on weekends. I co-attend TangentGo events to meet fellow active doers who value their offline hours. Let's make an activity happen!"
              </p>

              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider pt-2">
                Active Interests
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedMatch.skills.map((sk) => (
                  <span key={sk} className="bg-zinc-100 text-zinc-800 text-[9px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wide">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Events section: this member's other events (calendar + list) */}
            <hr className="border-zinc-100 my-4" />
            <ProfileEventsSection
              resetKey={selectedMatch.id}
              events={getMatchEvents(selectedMatch)}
              personName={selectedMatch.name}
            />

            <button
              onClick={() => {
                setSelectedMatch(null);
                setInviteMatch(selectedMatch);
              }}
              className="w-full bg-black hover:bg-zinc-800 text-white font-bold text-xs py-3 rounded text-center tracking-wide transition cursor-pointer select-none mt-6"
            >
              Invite {selectedMatch.name} to Event
            </button>
          </div>
        </div>
      )}

      {/* INVITE TO ACTIVITY SELECTOR POPUP */}
      {inviteMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-zinc-200 shadow-2xl p-6 w-full max-w-md relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setInviteMatch(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-black transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-lg font-bold text-black mb-1">
              Invite {inviteMatch.name}
            </h3>
            <p className="text-xs text-zinc-600 mb-4 leading-normal">
              Choose one of your saved or planned activities to co-attend with {inviteMatch.name}.
            </p>

            {inviteSuccess && (
              <div className="mb-4 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 rounded p-2.5 flex items-center space-x-1.5 animate-pulse">
                <span>✓</span>
                <span>{inviteSuccess}</span>
              </div>
            )}

            <div className="space-y-2.5 max-h-60 overflow-y-auto no-scrollbar pr-1">
              {events.filter(e => !e.isDraft).map((evt) => (
                <div 
                  key={evt.id}
                  onClick={() => handleSendInvite(evt.title)}
                  className="p-3 border border-zinc-200 hover:border-teal-400 hover:bg-teal-50/20 rounded-md cursor-pointer transition flex items-center justify-between"
                >
                  <div className="text-left">
                    <p className="text-xs font-extrabold text-zinc-950 truncate max-w-xs capitalize">
                      {evt.title}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-semibold">
                      {evt.dateTime} • {evt.location.split(',')[0]}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest bg-teal-50 px-2 py-0.5 rounded shadow-5xs text-right">
                    Select
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-100 mt-5 pt-4 text-center">
              <button 
                onClick={() => setInviteMatch(null)}
                className="text-xs text-zinc-500 hover:text-black font-semibold cursor-pointer underline"
              >
                Cancel invitation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
