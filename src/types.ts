export interface Organizer {
  name: string;
  role?: string;
  rating?: string;
  avatar: string;
}

export interface TangentEvent {
  id: string;
  title: string;
  dateTime: string;
  location: string;
  description: string;
  category: string;
  image: string;
  tag: string;
  tagsList?: string[];
  hearts?: boolean;
  attendeesCount?: number;
  maxCompanions?: number;
  duration?: string;
  organizer?: Organizer;
  isDraft?: boolean;
}

export interface MatchProfile {
  id: string;
  name: string;
  reliability: number;
  skills: string[];
  suggestedCommonEvents: number;
  avatar: string;
  status?: string;
}

export interface UserProfile {
  name: string;
  location: string;
  joinedDate: string;
  avatar: string;
  matchesCount: number;
  eventsCount: number;
  karma: number;
  story: string;
  interests: string[];
  isVerified: boolean;
}

export type AppTab = 'Home' | 'Matches' | 'Categories' | 'Events' | 'Profile' | 'Mission';
