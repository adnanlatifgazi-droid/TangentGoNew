import React from 'react';
import { Shield, Sparkles, CheckSquare, Search, Users, Activity, Heart, Eye } from 'lucide-react';

interface MissionViewProps {
  onStartExploring: () => void;
}

export default function MissionView({ onStartExploring }: MissionViewProps) {
  return (
    <div className="space-y-16 py-0 animate-in fade-in duration-300" id="mission-view-layout">
      
      {/* 1. Hero Background Jumbotron Overlay */}
      <div 
        className="relative bg-zinc-900 overflow-hidden min-h-[460px] flex items-center justify-center px-6 py-20 bg-cover bg-center text-center" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200')`
        }}
      >
        <div className="max-w-2xl space-y-6 text-white relative z-10">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Connecting through Action
          </h1>
          <p className="text-sm sm:text-base text-zinc-200 font-medium max-w-lg mx-auto leading-relaxed">
            Beyond the swipe. TangentGo facilitates meaningful real-world connections through the activities you already love.
          </p>
          <div className="pt-2">
            <button 
              onClick={onStartExploring}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm tracking-wide px-8 py-3.5 rounded transition shadow-lg cursor-pointer transform hover:scale-101 active:scale-99"
              id="mission-hero-explore-btn"
            >
              Start Exploring
            </button>
          </div>
        </div>
      </div>

      {/* 2. Our Mission Statement Block */}
      <div className="max-w-3xl mx-auto px-6 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest block">
            OUR MISSION
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-black tracking-tight leading-tight">
            Built for Reliability, Focused on Community
          </h2>
        </div>

        <p className="text-sm sm:text-base text-zinc-650 leading-relaxed font-sans">
          TangentGo was born from a simple observation: the best friendships and partnerships are forged in the heat of a shared challenge. Whether it's a 10k hike, a pottery workshop, or a weekend hackathon, we prioritize the <strong className="text-black">"do"</strong> over the <strong className="text-black">"swipe."</strong>
        </p>

        {/* Highlight Verification Alert pill */}
        <div className="flex items-center space-x-4 bg-teal-50 border border-teal-100 rounded-lg p-5">
          <div className="bg-teal-400 p-2.5 rounded-sm shadow-2xs text-teal-950">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-teal-900 tracking-wider uppercase mb-0.5">
              Trust-First Ecosystem
            </h4>
            <p className="text-xs text-teal-850 font-medium leading-normal">
              Every member is verified through a rigorous reliability scoring system. Say goodbye to late cancelations and ghosting.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Quote with Mockup Frame */}
      <div className="max-w-xl mx-auto px-6">
        <div className="border border-zinc-200 bg-white rounded-lg p-6 shadow-sm flex flex-col items-center">
          
          {/* Mock laptop visualization */}
          <div className="w-full bg-slate-100 border border-slate-200 rounded p-3 mb-5 shadow-inner">
            <div className="w-full h-34 bg-slate-800 rounded flex items-center justify-center relative overflow-hidden">
              {/* Screen graphic: Team sitting on table */}
              <img 
                src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&q=80&w=600" 
                alt="Workspace laptop mockup" 
                className="absolute inset-0 w-full h-full object-cover filter brightness-90 shrink-0" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              {/* Laptop mock UI details */}
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-[8px] text-white">
                ✓ Verified Team Meet
              </div>
            </div>
            {/* Keyboard bar representation */}
            <div className="w-1/3 h-1 bg-zinc-400 mx-auto mt-2 rounded"></div>
          </div>

          <p className="text-sm italic text-zinc-600 text-center leading-relaxed">
            "TangentGo isn't about meeting people for the sake of it; it's about doing the things I love with people who actually show up."
          </p>
          <span className="block text-xs font-bold text-zinc-900 mt-2 text-center uppercase tracking-wider">
            — Marco S.
          </span>
        </div>
      </div>

      {/* 4. "How It Works" Section */}
      <div className="bg-zinc-50 border-y border-zinc-150 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-bold tracking-tight text-black">
              How It Works
            </h2>
            <p className="text-sm text-zinc-650 max-w-md mx-auto">
              Three simple steps from intent to experience. Built from the ground up to respect your offline life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white border border-zinc-200 rounded-lg p-6 flex flex-col items-center text-center space-y-4 shadow-3xs">
              <div className="bg-zinc-900 text-white p-3.5 rounded-sm">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display font-medium text-lg text-black">
                Discover Activities
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                Browse locally curated events and member-led activities across dozens of categories near you.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-zinc-200 rounded-lg p-6 flex flex-col items-center text-center space-y-4 shadow-3xs">
              <div className="bg-[#0f766e] text-white p-3.5 rounded-sm">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display font-medium text-lg text-black">
                Match with Companions
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                Our algorithm suggests partners based on shared skill levels, scheduling matching, and reliability.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-zinc-200 rounded-lg p-6 flex flex-col items-center text-center space-y-4 shadow-3xs">
              <div className="bg-teal-300 text-teal-900 p-3.5 rounded-sm">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-display font-medium text-lg text-black">
                Experience Together
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                Confirm details, meet at designated spots, explore the event, and rate your companion afterwards.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* 5. Safety & Trust dark banner card */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-zinc-900 text-white rounded-lg p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 border border-zinc-850 shadow-xl">
          <div className="flex-1 space-y-4 text-left">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white">
              Safety & Trust
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We believe safety isn't a feature — it's the foundation. TangentGo uses a multi-layered verification system to ensure everyone you meet is who they say they are.
            </p>
            
            <ul className="space-y-2 text-xs font-semibold text-zinc-200">
              <li className="flex items-center space-x-2">
                <span className="text-teal-400">✓</span> <span>Verified Member Badges</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-teal-400">✓</span> <span>Public Reliability Scores</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-teal-400">✓</span> <span>Encrypted In-App Logistics</span>
              </li>
            </ul>
          </div>

          {/* Huge Percentage callout box */}
          <div className="bg-teal-400 text-teal-950 p-6 rounded-lg text-center w-full md:w-48 shrink-0 flex flex-col justify-center shadow-md border border-teal-300">
            <span className="text-4xl font-extrabold block mb-1">98%</span>
            <span className="text-[10px] font-bold tracking-wider uppercase block text-teal-900 leading-normal">
              Attendance Rate
            </span>
            <span className="text-[9px] text-teal-900 font-medium block mt-1">
              across verified matches
            </span>
          </div>
        </div>
      </div>

      {/* 6. Community Values Section */}
      <div className="max-w-4xl mx-auto px-6 text-center space-y-10 pb-8">
        <h2 className="font-display text-2xl font-bold text-black">
          Community Values
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2 p-4">
            <span className="text-2xl block select-none">👥</span>
            <h4 className="font-bold text-sm text-zinc-900 text-center">Radical Inclusion</h4>
            <p className="text-xs text-zinc-650 font-sans text-center">Open to all backgrounds and skill levels.</p>
          </div>
          <div className="space-y-2 p-4">
            <span className="text-2xl block select-none">🛑</span>
            <h4 className="font-bold text-sm text-zinc-900 text-center">Zero-Tolerance</h4>
            <p className="text-xs text-zinc-650 font-sans text-center">Strict policies against harassment of any kind.</p>
          </div>
          <div className="space-y-2 p-4">
            <span className="text-2xl block select-none">🤝</span>
            <h4 className="font-bold text-sm text-zinc-900 text-center">Mutual Respect</h4>
            <p className="text-xs text-zinc-650 font-sans text-center">Valuing each other's time and boundaries.</p>
          </div>
          <div className="space-y-2 p-4">
            <span className="text-2xl block select-none">🌍</span>
            <h4 className="font-bold text-sm text-zinc-900 text-center">Eco-Conscious</h4>
            <p className="text-xs text-zinc-650 font-sans text-center">Respecting the spaces and trails where we meet.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
