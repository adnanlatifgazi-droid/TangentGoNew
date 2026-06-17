import React from 'react';
import { Compass, Bell } from 'lucide-react';
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

export default function Header({
  isLoggedIn,
  activeTab,
  setActiveTab,
  user,
  onLoginClick,
  onRegisterClick,
  onLogout
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          className="flex items-center space-x-2 cursor-pointer select-none" 
          onClick={() => setActiveTab('Home')}
          id="header-brand-logo"
        >
          <Compass className="w-6 h-6 text-black rotate-12 transition-transform duration-300 hover:rotate-45" />
          <span className="font-display text-xl font-bold tracking-tight text-black">
            TangentGo
          </span>
        </div>

        {/* Dynamic Navigation Action Panel */}
        <div className="flex items-center space-x-3">
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
            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition ${activeTab === 'Mission' ? 'bg-black text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
            id="nav-mission-btn"
          >
            Our Mission
          </button>

          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
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
                className="text-xs text-red-500 hover:text-red-700 font-medium transition cursor-pointer px-2"
                id="header-logout-btn"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <button 
                onClick={onLoginClick}
                className="px-4 py-1.5 md:py-2 text-sm font-semibold border border-black text-black hover:bg-zinc-50 transition rounded-md mr-3 cursor-pointer"
                id="header-login-btn"
              >
                Login
              </button>
              <button 
                onClick={onRegisterClick}
                className="px-4 py-1.5 md:py-2 text-sm font-semibold bg-black text-white hover:bg-zinc-800 transition rounded-md cursor-pointer"
                id="header-register-btn"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
