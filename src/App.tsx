import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Users, 
  Grid, 
  Calendar, 
  User, 
  Plus, 
  MapPin, 
  Info, 
  Shield, 
  X, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Modals & Components imports
import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import PlanActivityForm from './components/PlanActivityForm';
import EventDetail from './components/EventDetail';
import UpcomingExperiences from './components/UpcomingExperiences';
import MatchesView from './components/MatchesView';
import ProfileView from './components/ProfileView';
import MissionView from './components/MissionView';
import MyEventsView from './components/MyEventsView';

// Types & Mock Data
import { AppTab, TangentEvent, MatchProfile, UserProfile } from './types';
import { initialEvents, initialMatches, initialUser } from './mockData';
import { buildUserProfileFromEmail } from './userIdentity';

// Bump this whenever the shape/seed of the mocked demo data changes. On load we
// drop any persisted state from an older version so a stale logged-in profile
// (e.g. the old "Alex Rivera" default) can never linger between demo runs.
const STORAGE_VERSION = 'v2';
const STORAGE_KEYS = [
  'isLoggedIn',
  'activeTab',
  'tangent_events',
  'tangent_matches',
  'tangent_user',
  'tangent_favs',
  'tangent_joined',
];

(function ensureStorageVersion() {
  try {
    if (localStorage.getItem('tangent_storage_version') !== STORAGE_VERSION) {
      STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
      localStorage.setItem('tangent_storage_version', STORAGE_VERSION);
    }
  } catch {
    /* localStorage unavailable (private mode / SSR) - safe to ignore. */
  }
})();

export default function App() {
  // App States with durable local persistence
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  
  const [activeTab, setActiveTab] = useState<AppTab>(() => {
    return (localStorage.getItem('activeTab') as AppTab) || 'Home';
  });

  const [events, setEvents] = useState<TangentEvent[]>(() => {
    const stored = localStorage.getItem('tangent_events');
    return stored ? JSON.parse(stored) : initialEvents;
  });

  const [matches, setMatches] = useState<MatchProfile[]>(() => {
    const stored = localStorage.getItem('tangent_matches');
    return stored ? JSON.parse(stored) : initialMatches;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const stored = localStorage.getItem('tangent_user');
    return stored ? JSON.parse(stored) : initialUser;
  });

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const stored = localStorage.getItem('tangent_favs');
    return stored ? JSON.parse(stored) : ['e1', 'e5', 'e10'];
  });

  const [joinedIds, setJoinedIds] = useState<string[]>(() => {
    const stored = localStorage.getItem('tangent_joined');
    return stored ? JSON.parse(stored) : ['e1', 'e5'];
  });

  // Modal & Detail navigation states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [matchEventFilter, setMatchEventFilter] = useState<{ category: string; title: string } | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
    localStorage.setItem('activeTab', activeTab);
    localStorage.setItem('tangent_events', JSON.stringify(events));
    localStorage.setItem('tangent_matches', JSON.stringify(matches));
    localStorage.setItem('tangent_user', JSON.stringify(user));
    localStorage.setItem('tangent_favs', JSON.stringify(favoriteIds));
    localStorage.setItem('tangent_joined', JSON.stringify(joinedIds));
  }, [isLoggedIn, activeTab, events, matches, user, favoriteIds, joinedIds]);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Auth Functions
  const handleLoginSuccess = (email: string) => {
    // No backend yet: build a complete, coherent profile from the email so the
    // logged-in identity (name, photo, city, bio, interests, stats) is fully
    // replaced rather than partially overriding the default seed user.
    const profile = buildUserProfileFromEmail(email);
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setUser(profile);
    triggerToast(`Logged in successfully! Welcome back, ${profile.name}.`);
  };

  const handleRegisterSuccess = (fullName: string, email: string) => {
    // Same mocked profile generation, but honour the name the user typed in.
    const profile = buildUserProfileFromEmail(email);
    const trimmedName = fullName.trim();
    setIsLoggedIn(true);
    setUser({ ...profile, name: trimmedName || profile.name });
    setShowRegisterModal(false);
    triggerToast(`Welcome to the TangentGo family, ${trimmedName || profile.name}!`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('Home');
    setSelectedEventId(null);
    setShowPlanForm(false);
    setMatchEventFilter(null);
    triggerToast(`Logged out. See you next session!`);
  };

  // Activity management
  const handleFavoriteToggle = (id: string) => {
    setFavoriteIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        triggerToast('Removed activity from favorites.');
        return prev.filter(item => item !== id);
      } else {
        triggerToast('Added activity to favorites!');
        return [...prev, id];
      }
    });
  };

  const handleJoinToggle = (id: string) => {
    setJoinedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        triggerToast('Left activity.');
        return prev.filter(item => item !== id);
      } else {
        triggerToast('Successfully registered for event! See you there!');
        return [...prev, id];
      }
    });
  };

  // Navigate to Matches filtered by this event's category
  const handleViewMatchesForEvent = (event: TangentEvent) => {
    setMatchEventFilter({ category: event.category, title: event.title });
    setActiveTab('Matches');
    setSelectedEventId(null);
    setShowPlanForm(false);
    triggerToast(`Showing companions for ${event.category} events`);
  };

  const handleCreateEvent = (newEvent: TangentEvent) => {
    setEvents([newEvent, ...events]);
    setShowPlanForm(false);
    setSelectedEventId(newEvent.id); // View details
    triggerToast('New experience proposed to companions!');
  };

  const handleCategorySelection = (catName: string) => {
    // Navigate home and trigger alerts or popular tag searches
    setActiveTab('Home');
    setSelectedEventId(null);
    setShowPlanForm(false);
    triggerToast(`Filtered community list by category: ${catName}`);
  };

  const currentSelectedEvent = events.find(e => e.id === selectedEventId);

  // CATEGORY METADATA LIST (to render Image representation)
  const categoryTiles = [
    { name: 'Hiking', tag: 'Hiking / Mountaineering', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400', count: 3 },
    { name: 'Music', tag: 'Consonances / Acoustic Jam', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=400', count: 3 },
    { name: 'Cooking', tag: 'Culinary Masterclasses', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400', count: 1 },
    { name: 'Yoga', tag: 'Vinyasa / Mindfulness Loops', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400', count: 0 },
    { name: 'Gaming', tag: 'Cooperative / Tabletop nights', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400', count: 1 },
    { name: 'Sport', tag: 'Calculated Athletic drills', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=400', count: 1 },
    { name: 'Creative', tag: 'Clay Modeling / Ceramics', image: 'https://images.unsplash.com/photo-1565192647048-f997ded87958?auto=format&fit=crop&q=80&w=400', count: 1 }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafb] selection:bg-teal-500 selection:text-white" id="main-scaffold-root">
      
      {/* Dynamic Pop Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-20 inset-x-0 mx-auto w-fit max-w-[calc(100vw-2rem)] z-50 bg-zinc-900 border border-zinc-850 text-white text-xs font-bold px-5 py-3 rounded shadow-2xl flex items-center space-x-2 select-none"
            id="global-toast-notification"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Header */}
      <Header 
        isLoggedIn={isLoggedIn}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedEventId(null);
          setShowPlanForm(false);
          if (tab !== 'Matches') setMatchEventFilter(null);
        }}
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
        onLogout={handleLogout}
      />

      {/* Main Core View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 mb-20 md:mb-10">
        
        {/* VIEW 1: PLAN ACTIVITY CREATOR (Visible under Active form trigger) */}
        {showPlanForm ? (
          <PlanActivityForm 
            user={user}
            onBack={() => {
              setShowPlanForm(false);
              setSelectedEventId(null);
            }}
            onSubmitEvent={handleCreateEvent}
          />
        ) : (
          /* SINGLE EVENT DETAILED SCREEN (Image 3 or 10 style display) */
          selectedEventId && currentSelectedEvent ? (
            <EventDetail 
              event={currentSelectedEvent}
              isLoggedIn={isLoggedIn}
              onBack={() => setSelectedEventId(null)}
              onJoinEventToggle={handleJoinToggle}
              onFavoriteToggle={handleFavoriteToggle}
              hasJoined={joinedIds.includes(currentSelectedEvent.id)}
              isFavorited={favoriteIds.includes(currentSelectedEvent.id)}
              onLoginTrigger={() => setShowLoginModal(true)}
              onRegisterTrigger={() => setShowRegisterModal(true)}
              matches={matches}
            />
          ) : (
            /* NAVIGATION VIEWS WRAPPER */
            <div className="relative">
              
              {/* TAB A: HOME (DEFAULT DISCOVER FEED) */}
              {activeTab === 'Home' && (
                <UpcomingExperiences 
                  events={events}
                  isLoggedIn={isLoggedIn}
                  onSelectEvent={(id) => setSelectedEventId(id)}
                  onFavoriteToggle={handleFavoriteToggle}
                  favoritedIds={favoriteIds}
                  onJoinEventToggle={handleJoinToggle}
                  joinedIds={joinedIds}
                  onRegisterTrigger={() => setShowRegisterModal(true)}
                  onLoginTrigger={() => setShowLoginModal(true)}
                  onViewMatchesForEvent={handleViewMatchesForEvent}
                />
              )}

              {/* TAB B: MATCHES (PRIVATE NETWORK LOGGED IN ACCESS ONLY) */}
              {activeTab === 'Matches' && (
                isLoggedIn ? (
                  <MatchesView 
                    matches={matches} 
                    events={events}
                    eventFilter={matchEventFilter}
                    onClearFilter={() => setMatchEventFilter(null)}
                  />
                ) : (
                  <div className="max-w-md mx-auto text-center py-20 bg-white border border-gray-100 rounded-lg shadow-5xs p-6 space-y-4">
                    <span className="text-3xl block">🔐</span>
                    <h2 className="font-display text-xl font-bold text-black">Private Matches Directory</h2>
                    <p className="text-xs text-zinc-650 leading-relaxed font-sans">
                      Connect with verified activity partners who share your exact passions. Sign up to build your safety circle!
                    </p>
                    <button 
                      onClick={() => setShowRegisterModal(true)}
                      className="px-6 py-2.5 bg-black hover:bg-zinc-800 text-white font-bold text-xs rounded transition uppercase tracking-wide cursor-pointer"
                    >
                      GET FULL ACCESS
                    </button>
                  </div>
                )
              )}

              {/* TAB C: CATEGORIES MATRIX LIST */}
              {activeTab === 'Categories' && (
                <div className="max-w-xl mx-auto space-y-6">
                  <div className="text-left space-y-1">
                    <h1 className="font-display text-2xl font-bold tracking-tight text-black">
                      Activity Categories
                    </h1>
                    <p className="text-xs text-zinc-650 leading-relaxed">
                      Select a structured hobby vertical to explore local community connections and scheduled groups.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {categoryTiles.map((cat) => (
                      <div 
                        key={cat.name}
                        onClick={() => handleCategorySelection(cat.name)}
                        className="group relative h-40 rounded-lg overflow-hidden border border-zinc-150 cursor-pointer shadow-5xs text-left"
                      >
                        {/* Background Overlay */}
                        <img 
                          src={cat.image} 
                          alt={cat.name} 
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-101 transition duration-500 filter brightness-75"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        {/* Title & Count indicators */}
                        <div className="absolute bottom-4 left-4 right-4 text-white space-y-0.5">
                          <h3 className="font-display text-base font-bold tracking-tight text-white group-hover:text-teal-300 transition">
                            {cat.name}
                          </h3>
                          <p className="text-[10px] text-zinc-300 font-medium">
                            {cat.tag}
                          </p>
                          {cat.count > 0 && (
                            <span className="inline-block bg-teal-500/90 text-teal-980 font-bold text-[9px] px-2 py-0.5 rounded shadow-2xs mt-1.5">
                              {cat.count} AVAILABLE
                            </span>
                          )}
                        </div>

                        {/* Chevron right */}
                        <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition duration-300">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB D: EVENTS ACTIONS & BILINGUAL DASHBOARD (LOGGED IN ONLY) */}
              {activeTab === 'Events' && (
                isLoggedIn ? (
                  <MyEventsView 
                    events={events}
                    onFavoriteToggle={handleFavoriteToggle}
                    onSelectEvent={(id) => setSelectedEventId(id)}
                    favoriteIds={favoriteIds}
                  />
                ) : (
                  <div className="max-w-md mx-auto text-center py-20 bg-white border border-gray-100 rounded-lg shadow-5xs p-6 space-y-4">
                    <span className="text-3xl block">🗓️</span>
                    <h2 className="font-display text-xl font-bold text-black">My Activities Calendar</h2>
                    <p className="text-xs text-zinc-655 leading-relaxed font-sans">
                      Keep track of approvals, invitations, and events you're organizing in Italian or English. Create your free account below.
                    </p>
                    <button 
                      onClick={() => setShowRegisterModal(true)}
                      className="px-6 py-2.5 bg-black hover:bg-zinc-805 text-white font-bold text-xs rounded transition uppercase tracking-wide cursor-pointer"
                    >
                      GET FULL ACCESS
                    </button>
                  </div>
                )
              )}

              {/* TAB E: USER PROFILE (LOGGED IN ONLY) */}
              {activeTab === 'Profile' && (
                isLoggedIn ? (
                  <ProfileView 
                    user={user}
                    onUpdateUser={(updated) => {
                      setUser(updated);
                      triggerToast('Identity settings persistent!');
                    }}
                  />
                ) : (
                  <div className="max-w-md mx-auto text-center py-20 bg-white border border-gray-100 rounded-lg shadow-5xs p-6 space-y-4">
                    <span className="text-3xl block">👤</span>
                    <h2 className="font-display text-xl font-bold text-black">Member Identity Card</h2>
                    <p className="text-xs text-zinc-650 leading-relaxed">
                      Customise your passions, verify your ID for trustworthiness badge, and log your attendance score!
                    </p>
                    <button 
                      onClick={() => setShowLoginModal(true)}
                      className="px-6 py-2.5 bg-black hover:bg-zinc-800 text-white font-bold text-xs rounded transition uppercase tracking-wide cursor-pointer"
                    >
                      LOGIN TO PROFILE
                    </button>
                  </div>
                )
              )}

              {/* TAB F: MISSION VIEW OVERVIEW */}
              {activeTab === 'Mission' && (
                <MissionView onStartExploring={() => setActiveTab('Home')} />
              )}

            </div>
          )
        )}

      </main>

      {/* Floating Bottom Navigator for Logged in active members (satisfies Images) */}
      {isLoggedIn && (
        <nav className="fixed bottom-0 left-0 right-0 z-45 bg-white border-t border-zinc-200 py-2.5 px-4 shadow-xl select-none" id="floating-bottom-navigator">
          <div className="max-w-md mx-auto flex items-center justify-around">
            
            {/* Tab: Home */}
            <button 
              onClick={() => {
                setActiveTab('Home');
                setSelectedEventId(null);
                setShowPlanForm(false);
                setMatchEventFilter(null);
              }}
              className={`flex flex-col items-center space-y-1 cursor-pointer transition ${
                activeTab === 'Home' ? 'text-black font-bold' : 'text-zinc-400 hover:text-black'
              }`}
              id="navtab-trigger-home"
            >
              <Compass className="w-5 h-5" />
              <span className="text-[10px] tracking-tight">Home</span>
            </button>

            {/* Tab: Private Matches Vetted */}
            <button 
              onClick={() => {
                setActiveTab('Matches');
                setSelectedEventId(null);
                setShowPlanForm(false);
              }}
              className={`flex flex-col items-center space-y-1 cursor-pointer transition ${
                activeTab === 'Matches' ? 'text-black font-bold' : 'text-zinc-400 hover:text-black'
              }`}
              id="navtab-trigger-matches"
            >
              <Users className="w-5 h-5" />
              <span className="text-[10px] tracking-tight">Matches</span>
            </button>

            {/* Float Action + Proposal Trigger (Bento Center button) */}
            <button 
              onClick={() => {
                setShowPlanForm(true);
                setSelectedEventId(null);
              }}
              className="bg-black hover:bg-zinc-800 text-white p-3 rounded-full shadow-lg border-2 border-white -mt-5 transform active:scale-90 transition cursor-pointer"
              title="Plan an Event"
              id="float-new-event-btn"
            >
              <Plus className="w-5 h-5 text-teal-400" />
            </button>

            {/* Tab: Categories Matrix */}
            <button 
              onClick={() => {
                setActiveTab('Categories');
                setSelectedEventId(null);
                setShowPlanForm(false);
                setMatchEventFilter(null);
              }}
              className={`flex flex-col items-center space-y-1 cursor-pointer transition ${
                activeTab === 'Categories' ? 'text-black font-bold' : 'text-zinc-400 hover:text-black'
              }`}
              id="navtab-trigger-categories"
            >
              <Grid className="w-5 h-5" />
              <span className="text-[10px] tracking-tight">Categories</span>
            </button>

            {/* Tab: My Dashboard */}
            <button 
              onClick={() => {
                setActiveTab('Events');
                setSelectedEventId(null);
                setShowPlanForm(false);
                setMatchEventFilter(null);
              }}
              className={`flex flex-col items-center space-y-1 cursor-pointer transition relative ${
                activeTab === 'Events' ? 'text-black font-bold' : 'text-zinc-400 hover:text-black'
              }`}
              id="navtab-trigger-events"
            >
              <Calendar className="w-5 h-5" />
              <span className="text-[10px] tracking-tight">Events</span>
              {/* Inbox bubble badge representation */}
              <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            
          </div>
        </nav>
      )}

      {/* Footer rendering (Guest / Home defaults) */}
      <Footer />

      {/* 4. MODALS BACKDROPS (Image 4 & 5 matching) */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal 
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegisterSuccess={handleRegisterSuccess}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />

    </div>
  );
}
