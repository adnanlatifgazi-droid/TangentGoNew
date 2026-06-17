import React, { useState } from 'react';
import { Sparkles, Sliders, Check, Clock, UserCheck, X, Compass, CheckCircle } from 'lucide-react';
import { MatchProfile, TangentEvent } from '../types';

interface MatchesViewProps {
  matches: MatchProfile[];
  events: TangentEvent[];
}

export default function MatchesView({ matches, events }: MatchesViewProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'high' | 'shared' | 'nearby'>('all');
  const [selectedMatch, setSelectedMatch] = useState<MatchProfile | null>(null);
  const [inviteMatch, setInviteMatch] = useState<MatchProfile | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState<string | null>(null);

  // Filtered Matches
  const filteredMatches = matches.filter(m => {
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

      {/* Refine Search button matching Image 8 */}
      <div className="flex justify-end select-none">
        <button 
          onClick={() => alert(`Refinement filters active: proximity: 10 miles, skills matching: true, rating cutoff: 90%`)}
          className="inline-flex items-center space-x-1.5 px-4 py-2 border border-zinc-200 hover:border-black text-xs font-bold rounded-sm hover:bg-zinc-50 transition cursor-pointer"
          id="refine-matches-search-btn"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Refine Search</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-zinc-200 shadow-2xl p-6 w-full max-w-md relative animate-in zoom-in-95 duration-200">
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
