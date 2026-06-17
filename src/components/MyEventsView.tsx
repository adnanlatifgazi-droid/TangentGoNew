import React, { useState } from 'react';
import { Heart, Sliders, Calendar, MapPin, Check, X, Languages, AlertCircle } from 'lucide-react';
import { TangentEvent } from '../types';

interface MyEventsViewProps {
  events: TangentEvent[];
  onFavoriteToggle: (eventId: string) => void;
  onSelectEvent: (eventId: string) => void;
  favoriteIds: string[];
}

export default function MyEventsView({
  events,
  onFavoriteToggle,
  onSelectEvent,
  favoriteIds
}: MyEventsViewProps) {
  const [lang, setLang] = useState<'EN' | 'IT'>('EN');
  const [activeSubTab, setActiveSubTab] = useState<'favorites' | 'invitations' | 'created'>('favorites');

  // Simulated Invitations List with real profiles
  const [invitations, setInvitations] = useState([
    {
      id: 'i1',
      sender: 'Alex Chen',
      eventTitle: 'Sunset Ridge Trail Hike & Social',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120'
    },
    {
      id: 'i2',
      sender: 'Jordan Miller',
      eventTitle: 'Peak Trail Morning Ascent',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120'
    },
    {
      id: 'i3',
      sender: 'Sarah Wilson',
      eventTitle: 'Acoustic Jam Session',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'
    }
  ]);

  const handleAcceptInvite = (id: string, sender: string) => {
    setInvitations(invitations.map(inv => inv.id === id ? { ...inv, status: 'accepted' } : inv));
    alert(`Accepted invitation request from ${sender}!`);
  };

  const handleDeclineInvite = (id: string) => {
    setInvitations(invitations.filter(inv => inv.id !== id));
  };

  const activeInvitationsCount = invitations.filter(inv => inv.status === 'pending').length;

  // Filter events based on active sub tab
  const favoritedEventsList = events.filter(e => favoriteIds.includes(e.id) && !e.isDraft);
  const createdEventsList = events.filter(e => e.id.startsWith('e_custom_') || e.id === 'e9'); // Custom creation or sports soccer match default

  // Translation labels
  const text = {
    EN: {
      title: "My Events",
      sub: "Manage your community connections and upcoming activities.",
      tabFavorites: "Favorite Events",
      tabInboxes: "Invitations Dashboard",
      tabCreated: "Participants/Created By Me",
      emptyFavorites: "You haven't favorited any events yet. Heart some events to save them!",
      emptyCreated: "No activities planned yet. Click '+ CREATE' to kickstart your own event!",
      buttonView: "View Details",
      buttonManage: "Manage Event",
      joinedBadge: "Joined",
      draftBadge: "DRAFT"
    },
    IT: {
      title: "I Miei Eventi",
      sub: "Gestisci le tue connessioni e le attività in programma.",
      tabFavorites: "Partecipazioni / Preferiti",
      tabInboxes: "Inviti Ricevuti",
      tabCreated: "Creati da me",
      emptyFavorites: "Nessun evento salvato nei preferiti. Clicca sul cuore per aggiungerne uno!",
      emptyCreated: "Non hai ancora pianificato nessun evento. Clicca su '+ CREATE' per iniziare!",
      buttonView: "Visualizza Dettagli",
      buttonManage: "Gestisci Evento",
      joinedBadge: "Partecipi",
      draftBadge: "BOZZA"
    }
  }[lang];

  return (
    <div className="max-w-xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-300" id="my-events-view-container">
      
      {/* Header with Bilingual Language Pill Toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-bold text-black tracking-tight">
            {text.title}
          </h1>
          <p className="text-xs text-zinc-650">
            {text.sub}
          </p>
        </div>

        {/* Floating Language Toggler */}
        <button 
          onClick={() => setLang(lang === 'EN' ? 'IT' : 'EN')}
          className="flex items-center space-x-1.5 px-3 py-1.5 border border-zinc-200 hover:border-black rounded-full text-xs font-semibold hover:bg-zinc-50 transition cursor-pointer shrink-0"
          title="Toggle Language"
          id="language-lang-pill"
        >
          <Languages className="w-3.5 h-3.5 text-teal-600" />
          <span>{lang}</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs bar matching Image 9 */}
      <div className="flex border-b border-zinc-200 text-xs font-bold font-sans overflow-x-auto select-none no-scrollbar">
        <button
          onClick={() => setActiveSubTab('favorites')}
          className={`pb-3 pr-2 mr-4 whitespace-nowrap border-b-2 transition ${
            activeSubTab === 'favorites' ? 'border-black text-black' : 'border-transparent text-zinc-500 hover:text-black'
          }`}
          id="subtab-favorites"
        >
          {text.tabFavorites}
        </button>
        <button
          onClick={() => setActiveSubTab('invitations')}
          className={`pb-3 px-2 mr-4 whitespace-nowrap border-b-2 transition relative flex items-center space-x-1.5 ${
            activeSubTab === 'invitations' ? 'border-black text-black' : 'border-transparent text-zinc-500 hover:text-black'
          }`}
          id="subtab-invitations"
        >
          <span>{text.tabInboxes}</span>
          {activeInvitationsCount > 0 && (
            <span className="bg-black text-white px-1.5 py-0.5 rounded-full text-[10px] tracking-tighter">
              {activeInvitationsCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveSubTab('created')}
          className={`pb-3 pl-2 whitespace-nowrap border-b-2 transition ${
            activeSubTab === 'created' ? 'border-black text-black' : 'border-transparent text-zinc-500 hover:text-black'
          }`}
          id="subtab-created"
        >
          {text.tabCreated}
        </button>
      </div>

      {/* FILTER CONTENT */}
      <div className="space-y-4">
        
        {/* TAB 1: FAVORITES */}
        {activeSubTab === 'favorites' && (
          favoritedEventsList.length === 0 ? (
            <div className="text-center py-10 bg-white border border-zinc-150 rounded-lg p-6">
              <span className="text-2xl mb-2 block select-none">❤️</span>
              <p className="text-xs text-zinc-650 leading-relaxed max-w-xs mx-auto">
                {text.emptyFavorites}
              </p>
            </div>
          ) : (
            favoritedEventsList.map((evt) => (
              <div 
                key={evt.id}
                className="bg-white border text-left border-zinc-150 rounded-lg p-5 flex flex-col justify-between space-y-4 shadow-3xs"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="bg-teal-300 text-teal-950 text-[10px] font-bold tracking-widest px-2.5 py-1 uppercase rounded-sm">
                      {evt.tag || 'EVENT'}
                    </span>
                    <h3 className="font-display text-base font-bold text-black pt-1">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-zinc-500 flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-zinc-450" />
                      <span>{evt.dateTime}</span>
                    </p>
                    <p className="text-xs text-zinc-500 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-450" />
                      <span>{evt.location.split(',')[0]}</span>
                    </p>
                  </div>

                  {/* Togglable Heart icon */}
                  <button 
                    onClick={() => onFavoriteToggle(evt.id)}
                    className="p-1 text-zinc-400 hover:text-rose-500 transition cursor-pointer"
                  >
                    <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                  </button>
                </div>

                <button
                  onClick={() => onSelectEvent(evt.id)}
                  className="w-full text-center bg-black hover:bg-zinc-800 text-white py-2.5 rounded text-xs font-bold tracking-wide transition cursor-pointer"
                >
                  {text.buttonView}
                </button>
              </div>
            ))
          )
        )}

        {/* TAB 2: INVITATIONS DASHBOARD */}
        {activeSubTab === 'invitations' && (
          invitations.length === 0 ? (
            <div className="text-center py-10 bg-white border border-zinc-150 rounded-lg p-6">
              <span className="text-2xl mb-2 block select-none">📩</span>
              <p className="text-xs text-zinc-650 max-w-xs mx-auto">
                No active invitations left in your dashboard.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {invitations.map((inv) => (
                <div 
                  key={inv.id}
                  className="bg-white border text-left border-zinc-150 rounded-lg p-4 flex items-center space-x-4 shadow-3xs"
                >
                  <img 
                    src={inv.avatar} 
                    alt={inv.sender} 
                    className="w-10 h-10 rounded-full object-cover filter brightness-95" 
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-800 font-medium leading-normal">
                      <strong className="text-black font-bold">{inv.sender}</strong> requested to join your activity:
                    </p>
                    <p className="text-xs font-bold text-zinc-950 truncate">
                      "{inv.eventTitle}"
                    </p>

                    {inv.status === 'accepted' ? (
                      <span className="inline-flex items-center space-x-1 text-emerald-600 font-bold text-[10px] mt-1.5 uppercase">
                        <Check className="w-3 h-3" />
                        <span>Accepted</span>
                      </span>
                    ) : (
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => handleAcceptInvite(inv.id, inv.sender)}
                          className="bg-black hover:bg-zinc-800 text-white px-3 py-1 rounded text-[10px] font-bold tracking-wide transition cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDeclineInvite(inv.id)}
                          className="border border-zinc-200 hover:bg-zinc-55 text-zinc-700 px-3 py-1 rounded text-[10px] font-bold transition cursor-pointer"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* TAB 3: CREATED BY ME */}
        {activeSubTab === 'created' && (
          createdEventsList.length === 0 ? (
            <div className="text-center py-10 bg-white border border-zinc-150 rounded-lg p-6">
              <span className="text-2xl mb-2 block select-none">✏️</span>
              <p className="text-xs text-zinc-650 leading-relaxed max-w-xs mx-auto">
                {text.emptyCreated}
              </p>
            </div>
          ) : (
            createdEventsList.map((evt) => (
              <div 
                key={evt.id}
                className="bg-white border text-left border-zinc-150 rounded-lg p-5 flex flex-col justify-between space-y-4 shadow-3xs"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="bg-teal-300 text-teal-950 text-[10px] font-bold tracking-widest px-2.5 py-1 uppercase rounded-sm">
                      {evt.tag || 'CREATION'}
                    </span>
                    <h3 className="font-display text-base font-bold text-black pt-1">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-zinc-500 flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{evt.dateTime}</span>
                    </p>
                    <p className="text-xs text-zinc-500 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{evt.location.split(',')[0]}</span>
                    </p>
                  </div>

                  {evt.isDraft && (
                    <span className="bg-yellow-100 text-yellow-800 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-2xs">
                      {text.draftBadge}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      if (evt.isDraft) {
                        alert('This draft was successfully parsed! Direct event creation active on submit.');
                      } else {
                        onSelectEvent(evt.id);
                      }
                    }}
                    className="flex-1 text-center bg-black hover:bg-zinc-800 text-white py-2.5 rounded text-xs font-bold tracking-wide transition cursor-pointer"
                  >
                    {evt.isDraft ? 'Resume Draft' : text.buttonView}
                  </button>
                  
                  <button
                    onClick={() => alert(`Management controls active for your event: "${evt.title}". Here you can manage participants, update location details, or close the registrations.`)}
                    className="flex-1 py-2.5 border border-black hover:bg-zinc-50 text-black font-bold text-xs rounded transition text-center cursor-pointer"
                  >
                    {text.buttonManage}
                  </button>
                </div>
              </div>
            ))
          )
        )}

      </div>
    </div>
  );
}
