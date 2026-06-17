import React, { useState } from 'react';
import { Shield, Sparkles, Plus, Check, Edit2, MapPin, Calendar, HelpCircle, UserCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
}

export default function ProfileView({ user, onUpdateUser }: ProfileViewProps) {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(user.story);
  const [newPassion, setNewPassion] = useState('');
  const [showPassionInput, setShowPassionInput] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleSaveBio = () => {
    onUpdateUser({
      ...user,
      story: bioInput
    });
    setIsEditingBio(false);
  };

  const handleAddPassion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassion.trim()) return;
    if (user.interests.includes(newPassion.trim())) {
      setNewPassion('');
      setShowPassionInput(false);
      return;
    }

    onUpdateUser({
      ...user,
      interests: [...user.interests, newPassion.trim()]
    });
    setNewPassion('');
    setShowPassionInput(false);
  };

  const handleVerificationSubscribe = () => {
    setVerifying(true);
    setTimeout(() => {
      onUpdateUser({
        ...user,
        isVerified: true
      });
      setVerifying(false);
      alert('Subscription mock successful! Your profile has been assigned the TangentGo Identity Verification badge in real-time.');
    }, 1500);
  };

  const handleRemoveInterest = (interestName: string) => {
    onUpdateUser({
      ...user,
      interests: user.interests.filter(i => i !== interestName)
    });
  };

  return (
    <div className="max-w-xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-300" id="profile-view-layout">
      
      {/* 1. Verified Subscription Badge Banner */}
      <div className="bg-zinc-900 border border-zinc-800 text-white rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start space-x-3 text-left">
          <div className="bg-teal-500 rounded p-2 text-zinc-950 mt-1 shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-teal-400 tracking-wider uppercase mb-0.5">
              Identity Verification
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans max-w-sm">
              Verify your passport or ID to gain a verified partner badge. Increase matching velocity, unlock advanced filters, and demonstrate reliable participation.
            </p>
          </div>
        </div>

        {user.isVerified ? (
          <span className="bg-teal-500 text-teal-950 text-[10px] font-extrabold px-3 py-1.5 rounded-full select-none flex items-center space-x-1 uppercase shrink-0">
            <UserCheck className="w-3.5 h-3.5" />
            <span>VETTED MEMBER</span>
          </span>
        ) : (
          <button
            onClick={handleVerificationSubscribe}
            disabled={verifying}
            className="px-4 py-2 bg-white text-black hover:bg-zinc-100 font-bold text-xs rounded transition uppercase tracking-wide cursor-pointer text-center select-none shrink-0 disabled:opacity-50"
            id="profile-verification-trigger-btn"
          >
            {verifying ? 'Verifying...' : 'VERIFY NOW ($2/mo)'}
          </button>
        )}
      </div>

      {/* 2. Main Profile Card Details */}
      <div className="bg-white border text-left border-zinc-150 rounded-lg p-6 shadow-3xs space-y-5">
        
        {/* Profile Avatar details row */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-16 h-16 rounded-full object-cover border border-zinc-200 shadow-5xs filter brightness-95"
              referrerPolicy="no-referrer"
            />
            {user.isVerified && (
              <span className="absolute bottom-0 right-0 bg-teal-500 text-white p-1 rounded-full ring-2 ring-white" title="Verified Member">
                <Check className="w-3.5 h-3.5 stroke-[3px]" />
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-display text-xl font-bold text-black flex items-center space-x-1.5">
              <span>{user.name}</span>
              {user.isVerified && <span className="bg-teal-100 text-teal-800 text-[9px] font-bold px-1.5 py-0.5 rounded-full">VETTED</span>}
            </h2>
            <p className="text-xs text-zinc-500 font-medium flex items-center space-x-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{user.location}</span>
            </p>
            <p className="text-[11px] text-zinc-400 font-medium flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{user.joinedDate}</span>
            </p>
          </div>
        </div>

        {/* Dynamic Horizontal Stats Count */}
        <div className="grid grid-cols-3 gap-2 py-3.5 border-y border-zinc-55 text-center">
          <div>
            <span className="text-xl font-extrabold text-black block">
              {user.matchesCount}
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
              Matches
            </span>
          </div>
          <div>
            <span className="text-xl font-extrabold text-black block">
              {user.eventsCount}
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
              Joined
            </span>
          </div>
          <div>
            <span className="text-xl font-extrabold text-teal-700 block">
              +{user.karma}
            </span>
            <span className="text-[10px] text-teal-700 uppercase tracking-wider font-bold">
              Karma
            </span>
          </div>
        </div>

        {/* Edit Story Bio Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xs font-bold text-zinc-400 uppercase tracking-wider">
              My Story / About Me
            </h3>
            
            <button
              onClick={() => setIsEditingBio(!isEditingBio)}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center space-x-1 transition cursor-pointer"
              id="profile-edit-bio-toggle"
            >
              <Edit2 className="w-3 h-3" />
              <span>{isEditingBio ? 'Cancel' : 'Edit'}</span>
            </button>
          </div>

          {isEditingBio ? (
            <div className="space-y-2 pt-1 animate-in slide-in-from-top-1.5 duration-200">
              <textarea
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                rows={5}
                className="w-full text-xs px-3 py-2 border border-zinc-300 rounded outline-none bg-zinc-50 focus:bg-white focus:border-black resize-none text-zinc-800 leading-relaxed font-sans"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveBio}
                  className="bg-black hover:bg-zinc-800 text-white font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded shadow transition cursor-pointer"
                  id="profile-save-bio-btn"
                >
                  Save Bio
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-zinc-750 leading-relaxed font-sans whitespace-pre-line pl-1">
              {user.story}
            </p>
          )}
        </div>

        {/* Interests & Passions Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Interests & Passions
            </h3>
            
            {!showPassionInput && (
              <button
                onClick={() => setShowPassionInput(true)}
                className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center space-x-0.5 transition cursor-pointer"
                id="profile-add-interest-trigger"
              >
                <Plus className="w-4 h-4" />
                <span>Add Passion</span>
              </button>
            )}
          </div>

          {/* Inline form to write a new Passion element */}
          {showPassionInput && (
            <form onSubmit={handleAddPassion} className="flex items-center space-x-2 pt-1 animate-in slide-in-from-top-1 duration-205">
              <input
                type="text"
                value={newPassion}
                onChange={(e) => setNewPassion(e.target.value)}
                placeholder="e.g. Clay sculpting, Chess"
                className="flex-1 px-3 py-2 border border-zinc-300 rounded text-xs bg-zinc-50 focus:bg-white focus:border-black outline-none"
                required
                id="profile-interest-input-field"
                maxLength={25}
              />
              <button
                type="submit"
                className="px-3 py-2 bg-black text-white text-xs font-bold rounded cursor-pointer"
                id="profile-interest-submit-btn"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => { setShowPassionInput(false); setNewPassion(''); }}
                className="p-2 border border-zinc-200 text-zinc-500 rounded text-xs hover:text-black cursor-pointer"
              >
                Cancel
              </button>
            </form>
          )}

          <div className="flex flex-wrap gap-2 pt-1 pl-1 select-none">
            {user.interests.map((interest) => (
              <span 
                key={interest}
                className="bg-zinc-100 text-zinc-800 text-[10px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-wide flex items-center space-x-1 bg-teal-50/10 border border-zinc-200"
              >
                <span>{interest}</span>
                <button 
                  onClick={() => handleRemoveInterest(interest)}
                  type="button"
                  className="text-zinc-405 hover:text-red-500 pl-1 cursor-pointer focus:outline-none"
                  title="Remove passion"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
