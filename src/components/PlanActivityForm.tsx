import React, { useState } from 'react';
import { ArrowLeft, Send, Calendar, Users, MapPin, AlertCircle } from 'lucide-react';
import { TangentEvent, UserProfile } from '../types';

interface PlanActivityFormProps {
  user: UserProfile;
  onBack: () => void;
  onSubmitEvent: (newEvent: TangentEvent) => void;
}

export default function PlanActivityForm({ user, onBack, onSubmitEvent }: PlanActivityFormProps) {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [maxCompanions, setMaxCompanions] = useState('');
  const [location, setLocation] = useState('');
  
  // Validation indicator
  const [showErrors, setShowErrors] = useState(false);

  const isLocationEmpty = !location.trim();
  const isCategoryEmpty = !category;
  const isNameEmpty = !name.trim();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocationEmpty || isCategoryEmpty || isNameEmpty) {
      setShowErrors(true);
      return;
    }

    // Populate a mock event
    const generatedEvent: TangentEvent = {
      id: 'e_custom_' + Date.now(),
      title: name,
      dateTime: dateTime ? new Date(dateTime).toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) : 'TBD',
      location: location,
      description: description || 'No description provided.',
      category: category,
      image: category === 'Hiking' ? 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600' :
             category === 'Music' ? 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=600' :
             category === 'Cooking' ? 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600' :
             category === 'Gaming' ? 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600' :
             'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=600',
      tag: category.toUpperCase(),
      tagsList: [category, 'Personal'],
      hearts: false,
      attendeesCount: 1, // Self
      maxCompanions: maxCompanions ? parseInt(maxCompanions, 10) : 4,
      duration: '2 Hours',
      organizer: {
        name: user.name, // Logged in user (mocked identity)
        role: 'Creator',
        rating: '100% Reliability Rating',
        avatar: user.avatar
      }
    };

    onSubmitEvent(generatedEvent);
  };

  const handleSaveDraft = () => {
    if (isNameEmpty) {
      alert('Please enter at least an Event Name to save a draft!');
      return;
    }
    const generatedEvent: TangentEvent = {
      id: 'e_custom_draft_' + Date.now(),
      title: name + ' (Draft)',
      dateTime: dateTime || 'Draft Date',
      location: location || 'Draft Location',
      description: description,
      category: category || 'General',
      image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=600',
      tag: 'DRAFT',
      isDraft: true
    };
    onSubmitEvent(generatedEvent);
    alert('Activity saved as draft in "My Events"!');
  };

  return (
    <div className="max-w-xl mx-auto bg-white border border-gray-100 rounded-lg shadow-xs py-8 px-6 my-4 animate-in fade-in slide-in-from-bottom-6 duration-300" id="plan-activity-form">
      {/* Back Header */}
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-zinc-600 hover:text-black mb-6 text-sm font-semibold transition cursor-pointer"
        id="plan-form-back-btn"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events</span>
      </button>

      <h1 className="font-display text-2xl font-bold tracking-tight text-black mb-1">
        Plan a New Activity
      </h1>
      <p className="text-sm text-zinc-600 mb-8 leading-relaxed">
        Fill out the details below to find companions for your next adventure.
      </p>

      <form onSubmit={handleCreate} className="space-y-6">
        
        {/* Event Category */}
        <div className="space-y-1">
          <label className="flex items-center space-x-2 text-sm font-bold text-zinc-900">
            <span>Event Category</span>
          </label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded outline-none transition focus:border-black focus:ring-1 focus:ring-black ${
              showErrors && isCategoryEmpty ? 'border-rose-500 ring-1 ring-rose-500' : 'border-zinc-300'
            }`}
            id="plan-category-select"
          >
            <option value="">Select a category...</option>
            <option value="Hiking">Hiking</option>
            <option value="Music">Music</option>
            <option value="Cooking">Cooking</option>
            <option value="Yoga">Yoga</option>
            <option value="Creative">Creative</option>
            <option value="Gaming">Gaming</option>
            <option value="Sport">Sport</option>
          </select>
          {showErrors && isCategoryEmpty && (
            <p className="text-xs text-rose-500 font-semibold" id="category-error">Category is required</p>
          )}
          <p className="text-xs text-zinc-500 leading-normal">
            Choose the category that best describes your activity.
          </p>
        </div>

        {/* Event Name */}
        <div className="space-y-1">
          <label className="flex items-center space-x-2 text-sm font-bold text-zinc-900">
            <span>Event Name</span>
          </label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Saturday Morning Hike at Blue Ridge"
            className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded outline-none transition focus:border-black focus:ring-1 focus:ring-black ${
              showErrors && isNameEmpty ? 'border-rose-500 ring-1 ring-rose-500' : 'border-zinc-300'
            }`}
            id="plan-name-input"
          />
          {showErrors && isNameEmpty && (
            <p className="text-xs text-rose-500 font-semibold" id="name-error">Event name is required</p>
          )}
          <p className="text-xs text-zinc-500 leading-normal">
            Keep it catchy and descriptive.
          </p>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-zinc-900">Description</label>
            <span className="text-xs text-zinc-400 font-mono">
              {description.length}/500
            </span>
          </div>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 500))}
            placeholder="Describe the activity, what to bring, and who you're looking for..."
            rows={4}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded outline-none transition focus:border-black focus:ring-1 focus:ring-black resize-none"
            id="plan-description-textarea"
          />
          <p className="text-xs text-zinc-500 leading-normal">
            Provide enough detail so others know what to expect.
          </p>
        </div>

        {/* Date & Time */}
        <div className="space-y-1">
          <label className="flex items-center space-x-2 text-sm font-bold text-zinc-900">
            <span>Date & Time</span>
          </label>
          <input 
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded outline-none transition focus:border-black focus:ring-1 focus:ring-black"
            id="plan-datetime-input"
          />
          <p className="text-xs text-zinc-500 leading-normal">
            When should everyone meet?
          </p>
        </div>

        {/* Maximum Companions */}
        <div className="space-y-1">
          <label className="flex items-center space-x-2 text-sm font-bold text-zinc-900">
            <span>Maximum Companions</span>
          </label>
          <input 
            type="number"
            value={maxCompanions}
            onChange={(e) => setMaxCompanions(e.target.value)}
            placeholder="e.g., 4"
            min="1"
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded outline-none transition focus:border-black focus:ring-1 focus:ring-black"
            id="plan-max-input"
          />
          <p className="text-xs text-zinc-500 leading-normal">
            Limit the number of people who can join.
          </p>
        </div>

        {/* Location / Venue with custom validation to look like Image 6 */}
        <div className="space-y-1">
          <label className="flex items-center space-x-2 text-sm font-bold text-zinc-900">
            <span>Location/Venue</span>
          </label>
          <div className="relative">
            <input 
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search for a location or address"
              className={`w-full px-3.5 py-2.5 pr-10 text-sm bg-white border rounded outline-none transition focus:border-black focus:ring-1 focus:ring-black ${
                showErrors && isLocationEmpty ? 'border-red-800 ring-1 ring-red-800' : 'border-zinc-300'
              }`}
              id="plan-location-input"
            />
            {showErrors && isLocationEmpty && (
              <AlertCircle className="absolute right-3.5 top-3 w-4.5 h-4.5 text-red-700" />
            )}
          </div>
          {showErrors && isLocationEmpty && (
            <p className="text-xs text-red-800 font-semibold mt-1" id="location-error-msg">
              Address is required
            </p>
          )}
          <p className="text-xs text-zinc-500 leading-normal">
            Specify the exact meeting point.
          </p>
        </div>

        {/* Spacer line */}
        <hr className="border-zinc-100 my-6" />

        {/* Submission Panel */}
        <div className="space-y-3">
          <button
            type="submit"
            className="w-full bg-black text-white hover:bg-zinc-800 py-3.5 rounded font-bold text-sm tracking-wide transition flex items-center justify-center space-x-2 cursor-pointer shadow-md select-none active:scale-99"
            id="plan-create-event-submit"
          >
            <span>Create Event</span>
            <Send className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleSaveDraft}
            className="w-full py-2.5 bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-sm text-center rounded transition border-0 cursor-pointer select-none"
            id="plan-save-draft-btn"
          >
            Save as Draft
          </button>
        </div>

      </form>
    </div>
  );
}
