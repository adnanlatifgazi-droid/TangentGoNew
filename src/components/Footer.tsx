import React from 'react';
import { Compass, Globe, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 py-12 px-6" id="app-footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Compass className="w-5 h-5 text-black" />
              <span className="font-display text-lg font-bold tracking-tight text-black">
                TangentGo
              </span>
            </div>
            <p className="text-sm text-zinc-600 max-w-xs leading-relaxed">
              Reliable experiences for a modern community. We connect individuals safely through real-world actions.
            </p>
          </div>

          {/* Platform Columns */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold tracking-wider text-black uppercase">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li><a href="#how-it-works" className="hover:text-black hover:underline transition">How it works</a></li>
              <li><a href="#safety" className="hover:text-black hover:underline transition">Safety</a></li>
              <li><a href="#pricing" className="hover:text-black hover:underline transition">Pricing</a></li>
            </ul>
          </div>

          {/* Community Columns */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold tracking-wider text-black uppercase">
              Community
            </h4>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li><span className="hover:text-black cursor-pointer hover:underline transition">Events</span></li>
              <li><span className="hover:text-black cursor-pointer hover:underline transition">Guidelines</span></li>
              <li><span className="hover:text-black cursor-pointer hover:underline transition">Blog</span></li>
            </ul>
          </div>

          {/* Support Columns */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold tracking-wider text-black uppercase">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li><span className="hover:text-black cursor-pointer hover:underline transition">Help Center</span></li>
              <li><span className="hover:text-black cursor-pointer hover:underline transition">Privacy</span></li>
              <li><span className="hover:text-black cursor-pointer hover:underline transition">Terms</span></li>
            </ul>
          </div>

        </div>

        {/* Separator / Credit Bar */}
        <div className="border-t border-zinc-200 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500">
          <p>© 2024 TangentGo. Built for action.</p>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            {/* Language / Globe symbol */}
            <button className="flex items-center space-x-1 hover:text-black transition">
              <Globe className="w-4 h-4" />
              <span>EN | IT</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-black transition">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
