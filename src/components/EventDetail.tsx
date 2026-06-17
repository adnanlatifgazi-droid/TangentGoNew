import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, MapPin, Heart, Shield, Check, Share2, Copy, Mail, HelpCircle, Users, Clock } from 'lucide-react';
import { TangentEvent, MatchProfile } from '../types';
import MatchesDialog from './MatchesDialog';

interface EventDetailProps {
  event: TangentEvent;
  isLoggedIn: boolean;
  onBack: () => void;
  onJoinEventToggle: (eventId: string) => void;
  onFavoriteToggle: (eventId: string) => void;
  hasJoined: boolean;
  isFavorited: boolean;
  onLoginTrigger: () => void;
  onRegisterTrigger: () => void;
  matches: MatchProfile[];
}

export default function EventDetail({
  event,
  isLoggedIn,
  onBack,
  onJoinEventToggle,
  onFavoriteToggle,
  hasJoined,
  isFavorited,
  onLoginTrigger,
  onRegisterTrigger,
  matches
}: EventDetailProps) {
  const [copied, setCopied] = useState(false);
  const [showMatchesDialog, setShowMatchesDialog] = useState(false);

  // Always start at the top of the page when an event detail opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [event.id]);

  // Attendees count calculation
  const totalAttendees = (event.attendeesCount || 6) + (hasJoined ? 1 : 0);
  const maxCompanions = event.maxCompanions || 20;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Rendering beautiful circular topographic custom line vector graphic for the map to look extremely customized!
  const renderMockMap = (locationName: string) => {
    return (
      <div className="relative w-full h-56 bg-teal-50 border border-teal-100 rounded-lg overflow-hidden flex items-center justify-center">
        {/* Topographic line overlays using CSS patterns */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 20px, rgba(15, 118, 110, 0.15) 21px, rgba(15, 118, 110, 0.15) 22px, transparent 23px),
                            radial-gradient(circle at 30% 70%, transparent 40px, rgba(15, 118, 110, 0.15) 41px, rgba(15, 118, 110, 0.15) 42px, transparent 43px),
                            radial-gradient(circle at 80% 20%, transparent 60px, rgba(15, 118, 110, 0.15) 61px, rgba(15, 118, 110, 0.15) 62px, transparent 63px)`,
          backgroundSize: '120px 120px',
        }}></div>

        {/* Map grid representation */}
        <div className="w-40 h-40 rounded-full border-2 border-dashed border-teal-200/50 flex items-center justify-center animate-spin-slow">
          <div className="w-28 h-28 rounded-full border border-teal-300/30"></div>
        </div>

        {/* Floating marker pin */}
        <div className="absolute flex flex-col items-center animate-bounce">
          <div className="bg-black text-white p-2.5 rounded-full shadow-lg">
            <MapPin className="w-5 h-5 text-teal-400 fill-zinc-900" />
          </div>
          <div className="w-2 h-2 bg-black rotate-45 -mt-1 shadow-md"></div>
        </div>

        {/* Location chip bar */}
        <div className="absolute bottom-3 left-3 right-3 bg-white border border-zinc-200/80 rounded px-3 py-1.5 flex items-center justify-between shadow-xs">
          <span className="text-xs font-bold text-zinc-800 tracking-tight truncate max-w-[70%]">
            {locationName}
          </span>
          <button 
            onClick={() => alert(`Directions copied! Simulated coordinates are geared near ${locationName}.`)}
            className="text-[10px] font-bold text-teal-700 hover:text-teal-900 uppercase tracking-wider"
          >
            Get Directions
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 animate-in fade-in duration-300" id={`event-detail-${event.id}`}>
      
      {/* Top Navigation */}
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-zinc-600 hover:text-black mb-6 text-sm font-semibold transition cursor-pointer"
        id="detail-back-btn"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events</span>
      </button>

      {/* Tags Panel */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="bg-black text-white text-[10px] font-bold tracking-widest px-2.5 py-1 uppercase rounded-sm">
          {event.tag || event.category.toUpperCase()}
        </span>
        {event.tagsList?.map((extraTag) => (
          <span 
            key={extraTag} 
            className="bg-zinc-150 text-zinc-700 text-[10px] font-semibold tracking-widest px-2.5 py-1 uppercase rounded-sm"
          >
            {extraTag}
          </span>
        ))}
      </div>

      {/* Main Title heading precisely matches size with Space Grotesk layout style */}
      <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-black mb-4 leading-tight">
        {event.title}
      </h1>

      {/* Main Image banner representation */}
      <div className="relative rounded-lg overflow-hidden mb-6 group border border-zinc-100 shadow-xs">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-64 sm:h-80 object-cover group-hover:scale-101 transition duration-500 filter brightness-95"
          referrerPolicy="no-referrer"
        />
        {isFavorited && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs p-2 rounded-full shadow">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          </div>
        )}
      </div>

      {/* GRID OVER DETAIL SECTIONS */}
      <div className="space-y-6">
        
        {/* Date & Time card */}
        <div className="bg-white border border-zinc-150 rounded-lg p-5 flex items-start space-x-4">
          <div className="bg-teal-50 p-3 rounded text-teal-700">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
              Date & Time
            </h3>
            <p className="text-sm font-bold text-zinc-900 mb-1">
              {event.dateTime}
            </p>
            <p className="text-xs text-zinc-500">
              {event.duration ? `${event.duration} duration` : 'Join us on time!'}
            </p>
          </div>
        </div>

        {/* Location details card */}
        <div className="bg-white border border-zinc-150 rounded-lg p-5 flex items-start space-x-4">
          <div className="bg-teal-50 p-3 rounded text-teal-700">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
              Location
            </h3>
            <p className="text-sm font-bold text-zinc-900 mb-1 leading-tight">
              {event.location.split(',')[0]}
            </p>
            <p className="text-xs text-zinc-500">
              {event.location}
            </p>
          </div>
        </div>

        {/* About detail copy */}
        <div className="space-y-3 pt-2">
          <h2 className="font-display text-lg font-bold text-black border-l-4 border-black pl-3 py-0.5">
            About the Event
          </h2>
          <p className="text-sm text-zinc-700 leading-relaxed font-sans whitespace-pre-line">
            {event.description}
          </p>
        </div>

        {/* Mock Map canvas box */}
        <div className="space-y-3 pt-2">
          <h2 className="font-display text-lg font-bold text-black">
            Venue Map
          </h2>
          {renderMockMap(event.location)}
        </div>

        {/* SECONDARY SIDE PANELS / BOTTOM ACTION BLOCKS DEPENDING ON AUTH STATE */}
        {!isLoggedIn ? (
          /* UNAPPROVED PUBLIC GUEST SCREEN DETAILS OVERLAY PANEL (Image 3) */
          <div className="bg-[#0b1329] text-white rounded-lg p-8 text-center space-y-5 shadow-xl border border-zinc-900">
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
              Join the community
            </h3>
            <p className="text-xs text-zinc-350 max-w-sm mx-auto leading-relaxed">
              Login or Register to see which community members are going and join this activity yourself.
            </p>
            
            <div className="pt-2 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
              <button 
                onClick={onRegisterTrigger}
                className="bg-white text-black hover:bg-zinc-100 px-6 py-2.5 rounded text-sm font-bold tracking-wide transition border-none cursor-pointer shadow-sm"
                id="guest-detail-register-btn"
              >
                REGISTER
              </button>
              <button 
                onClick={onLoginTrigger}
                className="bg-transparent text-white border border-zinc-600 hover:border-white hover:bg-white/5 px-6 py-2.5 rounded text-sm font-bold tracking-wide transition cursor-pointer"
                id="guest-detail-login-btn"
              >
                LOGIN
              </button>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED USER DETAIL ACTIONS (Image 10) */
          <div className="space-y-6 pt-2">
            
            {/* Quick Organizer profile verification tag */}
            {event.organizer && (
              <div className="flex items-center space-x-3.5 bg-zinc-50 border border-zinc-200/80 rounded-lg p-3.5 shadow-5xs">
                <img 
                  src={event.organizer.avatar} 
                  alt={event.organizer.name} 
                  className="w-10 h-10 rounded-full object-cover filter brightness-95" 
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-zinc-900 truncate">
                    {event.organizer.name} <span className="text-teal-700 font-semibold">{event.organizer.role || 'Member'}</span>
                  </p>
                  <p className="text-[11px] text-zinc-500 font-medium">
                    ✓ Verified • {event.organizer.rating || '98% Reliability Rating'}
                  </p>
                </div>
              </div>
            )}

            {/* Main Interactive Button Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  const wasJoined = hasJoined;
                  onJoinEventToggle(event.id);
                  if (!wasJoined) setShowMatchesDialog(true);
                }}
                className={`w-full py-3.5 rounded font-bold text-sm transition flex items-center justify-center space-x-2 select-none cursor-pointer shadow-md ${
                  hasJoined 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                    : 'bg-black hover:bg-zinc-800 text-white'
                }`}
                id={`join-toggle-btn-${event.id}`}
              >
                {hasJoined ? (
                  <>
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Attending Event</span>
                  </>
                ) : (
                  <span>Join Event</span>
                )}
              </button>

              <button
                onClick={() => onFavoriteToggle(event.id)}
                className={`w-full py-3.5 rounded font-bold text-sm transition flex items-center justify-center space-x-2 border select-none cursor-pointer ${
                  isFavorited
                    ? 'border-rose-300 bg-rose-50/50 text-rose-700 hover:bg-rose-100/50'
                    : 'border-zinc-350 bg-white text-zinc-800 hover:bg-zinc-50'
                }`}
                id={`fav-toggle-btn-${event.id}`}
              >
                <Heart className={`w-4 h-4 shrink-0 ${isFavorited ? 'fill-rose-600 text-rose-600' : 'text-zinc-650'}`} />
                <span>{isFavorited ? 'Added to Favorites' : 'Add to Favorites'}</span>
              </button>
            </div>

            {/* Quick Stats Grid representation (Image 10 footer items) */}
            <div className="grid grid-cols-2 gap-4 bg-zinc-50 border border-zinc-200/55 rounded-lg p-4 text-center">
              <div className="border-r border-zinc-200">
                <span className="block text-[11px] text-zinc-500 font-bold uppercase tracking-wider mb-1">
                  Attending
                </span>
                <span className="text-lg font-extrabold text-black">
                  {totalAttendees} / {maxCompanions}
                </span>
              </div>
              <div>
                <span className="block text-[11px] text-zinc-500 font-bold uppercase tracking-wider mb-1">
                  Duration
                </span>
                <span className="text-lg font-extrabold text-black">
                  {event.duration || '2 Hours'}
                </span>
              </div>
            </div>

          </div>
        )}

        {/* Safety certification check (Image 3) */}
        <div className="border border-zinc-150 rounded-lg p-5 bg-zinc-50/80 flex items-start space-x-3.5">
          <Shield className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-teal-900 tracking-wide uppercase">
              TRUSTED EVENT
            </h4>
            <p className="text-xs text-zinc-600 leading-relaxed font-sans">
              This event has been verified by the TangentGo community moderation team for safety and accuracy. Let's make connections happen responsibly!
            </p>
          </div>
        </div>

        {/* Share events element bottom bar */}
        <div className="text-center pt-2 space-y-2 select-none">
          <p className="text-xs font-extrabold text-zinc-400 uppercase tracking-widest">
            SHARE EVENT
          </p>
          
          <div className="flex items-center justify-center space-x-3.5">
            {/* Share button */}
            <button 
              onClick={() => alert(`Copied event coordinates: ${event.title}!`)}
              className="p-2 border border-zinc-300 hover:border-black rounded-sm transition cursor-pointer text-zinc-600 hover:text-black bg-white"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {/* Copy button */}
            <button 
              onClick={handleCopy}
              className={`p-2 border rounded-sm transition cursor-pointer ${copied ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-zinc-300 hover:border-black text-zinc-600 hover:text-black bg-white'}`}
              title="Copy details link"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            {/* Email icon */}
            <a 
              href={`mailto:?subject=Join me at ${encodeURIComponent(event.title)}&body=Let's co-attend ${encodeURIComponent(event.title)}!`}
              className="p-2 border border-zinc-300 hover:border-black rounded-sm transition cursor-pointer text-zinc-600 hover:text-black bg-white inline-block"
              title="Email friend"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Matches invite dialog (opens after joining an event) */}
      <MatchesDialog
        isOpen={showMatchesDialog}
        onClose={() => setShowMatchesDialog(false)}
        matches={matches}
        eventTitle={event.title}
      />
    </div>
  );
}
