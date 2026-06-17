import React, { useState } from 'react';
import { Compass, Bell, Menu, X, Home, Users, Grid, Calendar, User, Sparkles } from 'lucide-react';
import { UserProfile, AppTab } from '../types';

interface HeaderProps {
  isLoggedIn: boolean;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  user: UserProfile;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogout: () => void;
}

const NAV_ITEMS: { tab: AppTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { tab: 'Home', label: 'Home', icon: Home },
  { tab: 'Matches', label: 'Matches', icon: Users },
  { tab: 'Categories', label: 'Categories', icon: Grid },
  { tab: 'Events', label: 'Events', icon: Calendar },
  { tab: 'Profile', label: 'Profile', icon: User },
  { tab: 'Mission', label: 'Our Mission', icon: Sparkles }
];

export default function Header({
  isLoggedIn,
  activeTab,
  setActiveTab,
  user,
  onLoginClick,
  onRegisterClick,
  onLogout
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavSelect = (tab: AppTab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Hamburger menu + Brand Name */}
        <div className="flex items-center space-x-2 min-w-0">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-1.5 -ml-1.5 text-black hover:bg-zinc-100 rounded-md transition cursor-pointer shrink-0"
            aria-label="Open navigation menu"
            id="header-hamburger-btn"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div
            className="flex items-center cursor-pointer select-none min-w-0"
            onClick={() => setActiveTab('Home')}
            id="header-brand-logo"
          >
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-black truncate">
              TangentGo
            </span>
          </div>
        </div>

        {/* Dynamic Navigation Action Panel */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {activeTab === 'Mission' && (
            <button 
              onClick={() => setActiveTab('Home')}
              className="hidden sm:inline-flex text-xs font-semibold px-3 py-1.5 rounded-full text-zinc-600 bg-zinc-100 hover:bg-zinc-200 transition"
              id="back-to-explore-btn"
            >
              Explore Events
            </button>
          )}
          
          <button 
            onClick={() => setActiveTab('Mission')}
            className={`hidden sm:inline-block text-xs font-semibold px-3 py-1.5 rounded-full transition ${activeTab === 'Mission' ? 'bg-black text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
            id="nav-mission-btn"
          >
            Our Mission
          </button>

          {isLoggedIn ? (
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Notification icon with state indicator */}
              <button className="relative p-1.5 text-zinc-600 hover:text-black hover:bg-zinc-100 rounded-full transition cursor-pointer">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              </button>

              {/* User Avatar linking to Profile */}
              <div 
                className={`flex items-center space-x-2 cursor-pointer p-1 rounded-full border transition hover:bg-zinc-100 ${
                  activeTab === 'Profile' ? 'border-teal-500 bg-teal-50/50' : 'border-gray-200'
                }`}
                onClick={() => setActiveTab('Profile')}
                title="View Profile"
                id="header-user-profile-trigger"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full object-cover filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                <span className="text-xs font-semibold pr-2 hidden md:inline-block text-zinc-800">
                  {user.name}
                </span>
              </div>

              {/* Quick Logout option for presentation flexibility */}
              <button 
                onClick={onLogout}
                className="hidden sm:block text-xs text-red-500 hover:text-red-700 font-medium transition cursor-pointer px-2"
                id="header-logout-btn"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <button 
                onClick={onLoginClick}
                className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold border border-black text-black hover:bg-zinc-50 transition rounded-md mr-2 md:mr-3 cursor-pointer"
                id="header-login-btn"
              >
                Login
              </button>
              <button 
                onClick={onRegisterClick}
                className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold bg-black text-white hover:bg-zinc-800 transition rounded-md cursor-pointer"
                id="header-register-btn"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Slide-out navigation drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50" id="nav-drawer-root">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setMenuOpen(false)}
          />

          {/* Sliding panel */}
          <div className="absolute top-0 left-0 h-full w-72 max-w-[80%] bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            {/* Drawer brand header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
              <div className="flex items-center space-x-2 select-none">
                <Compass className="w-6 h-6 text-black rotate-12" />
                <span className="font-display text-lg font-bold tracking-tight text-black">
                  TangentGo
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition cursor-pointer"
                aria-label="Close navigation menu"
                id="close-nav-drawer-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
              {NAV_ITEMS.map(({ tab, label, icon: Icon }) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => handleNavSelect(tab)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-semibold transition cursor-pointer ${
                      isActive ? 'bg-zinc-100 text-black' : 'text-zinc-600 hover:bg-zinc-50 hover:text-black'
                    }`}
                    id={`drawer-nav-${tab.toLowerCase()}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Drawer auth actions */}
            <div className="border-t border-zinc-100 p-4 space-y-2.5">
              {isLoggedIn ? (
                <button
                  onClick={() => { onLogout(); setMenuOpen(false); }}
                  className="w-full px-4 py-2.5 text-sm font-semibold border border-zinc-200 text-red-500 hover:bg-red-50 hover:border-red-200 rounded-md transition cursor-pointer"
                  id="drawer-logout-btn"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => { onLoginClick(); setMenuOpen(false); }}
                    className="w-full px-4 py-2.5 text-sm font-semibold border border-black text-black hover:bg-zinc-50 transition rounded-md cursor-pointer"
                    id="drawer-login-btn"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => { onRegisterClick(); setMenuOpen(false); }}
                    className="w-full px-4 py-2.5 text-sm font-semibold bg-black text-white hover:bg-zinc-800 transition rounded-md cursor-pointer"
                    id="drawer-register-btn"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
