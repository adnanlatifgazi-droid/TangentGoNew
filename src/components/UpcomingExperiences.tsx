import React, { useState } from 'react';
import { Search, MapPin, Heart, Calendar, ArrowRight, Star } from 'lucide-react';
import { TangentEvent } from '../types';

interface UpcomingExperiencesProps {
  events: TangentEvent[];
  isLoggedIn: boolean;
  onSelectEvent: (eventId: string) => void;
  onFavoriteToggle: (eventId: string) => void;
  favoritedIds: string[];
  onJoinEventToggle: (eventId: string) => void;
  joinedIds: string[];
  onRegisterTrigger: () => void;
}

export default function UpcomingExperiences({
  events,
  isLoggedIn,
  onSelectEvent,
  onFavoriteToggle,
  favoritedIds,
  onJoinEventToggle,
  joinedIds,
  onRegisterTrigger
}: UpcomingExperiencesProps) {
  const [search, setSearch] = useState('');
  const [radius, setRadius] = useState('10');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Handle popular tags list
  const popularTags = ['HIKING', 'JAZZ', 'COOKING', 'YOGA'];

  // Filter events based on search query AND active Tag
  const filteredEvents = events.filter((evt) => {
    // Exclude custom drafts
    if (evt.isDraft) return false;

    const matchesSearch = 
      evt.title.toLowerCase().includes(search.toLowerCase()) || 
      evt.category.toLowerCase().includes(search.toLowerCase()) ||
      evt.location.toLowerCase().includes(search.toLowerCase()) ||
      evt.description.toLowerCase().includes(search.toLowerCase());

    const matchesTag = activeTag 
      ? evt.tag.toUpperCase() === activeTag.toUpperCase() || evt.category.toUpperCase() === activeTag.toUpperCase()
      : true;

    return matchesSearch && matchesTag;
  });

  const handlePopularTagClick = (tag: string) => {
    if (activeTag === tag) {
      setActiveTag(null); // Untoggle
    } else {
      setActiveTag(tag); // Set active
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300" id="upcoming-experiences-feed">
      
      {/* 1. HERO SEARCH CONTAINER (Image 1) */}
      <div className="max-w-xl mx-auto text-center space-y-6 px-1 md:px-0">
        <h1 className="font-display text-3xl sm:text-4xl font-black text-black tracking-tight leading-none pt-4">
          Find your next experience
        </h1>

        {/* Input container box with custom black/white borders */}
        <div className="bg-white border-2 border-black rounded-sm p-4 text-left space-y-4 shadow-md">
          
          {/* Row A: Search query input */}
          <div className="flex items-center space-x-3 bg-zinc-50 border border-zinc-200 rounded px-3 py-2.5">
            <Search className="w-5 h-5 text-zinc-400 shrink-0" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events or categories..."
              className="w-full text-sm outline-none bg-transparent text-zinc-900"
              id="hero-input-search"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Row B: Location proximity marker dropdown */}
            <div className="flex items-center space-x-2.5 bg-zinc-50 border border-zinc-200 rounded px-3 py-2.5 select-none">
              <MapPin className="w-5 h-5 text-teal-600 shrink-0" />
              <select 
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-full text-xs font-semibold bg-transparent text-zinc-800 outline-none cursor-pointer"
                id="hero-select-radius"
              >
                <option value="10">Within 10 miles</option>
                <option value="25">Within 25 miles</option>
                <option value="50">Within 50 miles</option>
              </select>
            </div>

            {/* Simulated Live Location widget indicator */}
            <div className="bg-zinc-50 border border-zinc-200 rounded px-3 py-2.5 text-center flex items-center justify-center">
              <span className="text-[11px] font-bold text-teal-700 tracking-wide uppercase">
                🎯 GPS Location Active
              </span>
            </div>

          </div>

          {/* Heavy Black Action trigger button */}
          <button 
            onClick={() => alert(`Found ${filteredEvents.length} activities near Seattle, WA within ${radius} miles!`)}
            className="w-full bg-black hover:bg-zinc-800 text-white font-extrabold tracking-widest text-sm py-3.5 rounded-xs transition-colors cursor-pointer uppercase select-none shadow-sm active:scale-99"
            id="hero-search-action-btn"
          >
            SEARCH
          </button>
        </div>

        {/* Popular Tags labels */}
        <div className="pt-2 select-none">
          <span className="block text-[10px] font-bold tracking-widest uppercase text-zinc-400 mb-2">
            POPULAR TAGS
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {popularTags.map((tag) => {
              const isSelected = activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => handlePopularTagClick(tag)}
                  className={`px-4.5 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-wider transition-colors cursor-pointer border ${
                    isSelected 
                      ? 'bg-black text-white border-black' 
                      : 'bg-teal-400/10 border-teal-200 text-teal-800 hover:bg-teal-400/20'
                  }`}
                  id={`tag-pill-${tag}`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 2. FEED GRID (Image 1 & 11) */}
      <div className="space-y-6 my-10 max-w-xl mx-auto">
        <div className="space-y-1.5 text-left pl-2">
          <h2 className="font-display text-2xl font-black text-black tracking-tight leading-none">
            Upcoming Experiences
          </h2>
          <p className="text-xs text-zinc-600 font-sans leading-relaxed">
            Discover curated activities happening near you in the next 48 hours.
          </p>
        </div>

        {/* Listing cards list */}
        <div className="space-y-6">
          {filteredEvents.map((evt) => {
            const isFav = favoritedIds.includes(evt.id);
            const hasJoined = joinedIds.includes(evt.id);
            
            return (
              <div 
                key={evt.id}
                className="bg-white border text-left border-zinc-150 rounded-lg overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-sm transition duration-300"
                id={`feed-event-card-${evt.id}`}
              >
                
                {/* Image panel with category ribbon */}
                <div 
                  className="relative h-56 w-full cursor-pointer overflow-hidden border-b border-zinc-100"
                  onClick={() => onSelectEvent(evt.id)}
                >
                  <img 
                    src={evt.image} 
                    alt={evt.title}
                    className="w-full h-full object-cover filter brightness-95 hover:scale-101 transition duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-black text-white text-[9px] font-extrabold tracking-widest px-2.5 py-1 uppercase rounded-xs">
                    {evt.tag}
                  </div>
                  
                  {/* Heart button inside absolute top right */}
                  {isLoggedIn && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onFavoriteToggle(evt.id);
                      }}
                      className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs p-2 rounded-full cursor-pointer transition transform hover:scale-105 active:scale-95"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'text-rose-500 fill-rose-500' : 'text-zinc-650'}`} />
                    </button>
                  )}
                </div>

                {/* Body Details pane */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between cursor-pointer" onClick={() => onSelectEvent(evt.id)}>
                    <h3 className="font-display text-lg font-bold text-black tracking-tight line-clamp-1 hover:text-teal-700 transition">
                      {evt.title}
                    </h3>
                  </div>

                  {/* Metadata Row */}
                  <div className="flex flex-col text-xs text-zinc-500 space-y-1 font-sans">
                    <p className="flex items-center space-x-1.5 font-semibold text-zinc-700">
                      <Calendar className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>{evt.dateTime}</span>
                    </p>
                    <p className="flex items-center space-x-1.5 truncate">
                      <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>{evt.location}</span>
                    </p>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2 font-sans pt-1">
                    {evt.description}
                  </p>

                  <hr className="border-zinc-100 my-2" />

                  {/* Dynamic Join Event button or details trigger */}
                  <div className="flex items-center justify-between pt-1">
                    {isLoggedIn ? (
                      <button
                        onClick={() => onJoinEventToggle(evt.id)}
                        className={`px-5 py-2.5 rounded font-bold text-xs tracking-wide transition uppercase cursor-pointer select-none ${
                          hasJoined 
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                            : 'bg-black hover:bg-zinc-800 text-white'
                        }`}
                        id={`feed-join-btn-${evt.id}`}
                      >
                        {hasJoined ? 'Attending ✓' : 'Join Event'}
                      </button>
                    ) : (
                      <button
                        onClick={() => onSelectEvent(evt.id)}
                        className="px-5 py-2.5 bg-black hover:bg-zinc-800 text-white font-bold text-xs tracking-wide transition uppercase rounded cursor-pointer select-none"
                        id={`feed-join-guest-${evt.id}`}
                      >
                        Join Event
                      </button>
                    )}

                    <button 
                      onClick={() => onSelectEvent(evt.id)}
                      className="text-xs font-bold text-teal-850 hover:text-teal-950 flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}

          {filteredEvents.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-zinc-150 p-6">
              <p className="text-xs text-zinc-650 max-w-xs mx-auto">
                No active events near Seattle, WA match your search criteria. Try matching another popular tag!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. LANDING CALL TO ACTION JUMBOTRON (Image 1 bottom banner) */}
      {!isLoggedIn && (
        <div className="bg-[#0e213b] text-white rounded-lg p-8 text-center space-y-6 max-w-xl mx-auto border border-zinc-900 shadow-xl">
          <div className="space-y-1.5">
            <h2 className="font-display text-xl sm:text-2xl font-black tracking-tight text-white leading-none">
              Ready to do more?
            </h2>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
              Sign up now to save events, message organizers, and join a community of doers in your city.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center pt-2">
            <button 
              onClick={onRegisterTrigger}
              className="bg-white hover:bg-zinc-100 text-teal-950 font-extrabold text-xs tracking-wide px-6 py-3 rounded uppercase transition cursor-pointer select-none shadow-md"
              id="cta-join-now-btn"
            >
              GET FULL ACCESS
            </button>
            <button 
              onClick={() => alert('You are currently viewing our live calendar! Log in to join specific slots.')}
              className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-900 text-white font-extrabold text-xs tracking-wide rounded border border-zinc-700 transition cursor-pointer select-none"
              id="cta-browse-calendar-btn"
            >
              BROWSE CALENDAR
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
