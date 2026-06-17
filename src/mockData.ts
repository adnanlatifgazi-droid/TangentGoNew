import { TangentEvent, MatchProfile, UserProfile } from './types';

export const initialEvents: TangentEvent[] = [
  {
    id: 'e1',
    title: 'Jazz in the Park',
    dateTime: 'Sept 24, 6:00 PM',
    location: 'Central Green, Central Park, NYC',
    description: 'Join us for an evening of soulful melodies under the stars at Central Green. Bring your own picnic blanket and favorite treats. Everyone is welcome to relax and appreciate the vibe!',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800',
    tag: 'MUSIC',
    tagsList: ['LIVE MUSIC', 'OUTDOOR'],
    hearts: true,
    attendeesCount: 15,
    maxCompanions: 30,
    duration: '2.5 Hours',
    organizer: {
      name: 'Jessica Reynolds',
      role: 'Organizer',
      rating: '97% Reliability Rating',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120'
    }
  },
  {
    id: 'e2',
    title: 'Hilltop Hike',
    dateTime: 'Sept 25, 8:00 AM',
    location: 'Beacon Hill Trailhead',
    description: 'A moderate 5-mile loop with stunning panoramic views. Best for intermediate hikers. We meet at the main parking area. Don\'t forget to bundle up and pack some trail snacks!',
    category: 'Hiking',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    tag: 'OUTDOORS',
    tagsList: ['OUTDOOR', 'FITNESS'],
    hearts: false,
    attendeesCount: 8,
    maxCompanions: 15,
    duration: '4 Hours',
    organizer: {
      name: 'Dave K.',
      role: 'Organizer',
      rating: '96% Reliability Rating',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120'
    }
  },
  {
    id: 'e3',
    title: 'Vegan Cooking Masterclass',
    dateTime: 'Sept 26, 2:00 PM',
    location: 'Downtown Food Studio',
    description: 'Learn the art of plant-based cuisine with Chef Marcus. This session focuses on fall root vegetables, rich savory glazes, and delicious nut-free desserts.',
    category: 'Cooking',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800',
    tag: 'WORKSHOP',
    tagsList: ['WORKSHOP', 'VEGAN'],
    hearts: false,
    attendeesCount: 12,
    maxCompanions: 15,
    duration: '2 Hours',
    organizer: {
      name: 'Chef Marcus',
      role: 'Instructor',
      rating: '99% Reliability Rating',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120'
    }
  },
  {
    id: 'e4',
    title: 'Jazz Concert at the Square',
    dateTime: 'Saturday, Oct 14, 2023 • 7:30 PM - 10:00 PM EST',
    location: 'Union Square Plaza, 14th St & Broadway, New York, NY',
    description: 'Experience an unforgettable evening of contemporary jazz under the city stars. This special showcase features the \'Silver Street Quartet,\' known for their innovative fusion of traditional swing and modern urban rhythms.\n\nThe event is free to the public, though premium seating near the stage is available on a first-come, first-served basis. Attendees are encouraged to bring blankets or portable chairs. Local artisan food vendors will be present on-site.',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000',
    tag: 'LIVE MUSIC',
    tagsList: ['LIVE MUSIC', 'OUTDOOR'],
    hearts: false,
    attendeesCount: 42,
    maxCompanions: 100,
    duration: '2.5 Hours',
    organizer: {
      name: 'Union Square Guild',
      role: 'Organizer',
      rating: '99% Reliability Rating',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120'
    }
  },
  {
    id: 'e5',
    title: 'Sunset Ridge Trail Hike & Social',
    dateTime: 'Saturday, Oct 14 • 4:30 PM - 7:30 PM',
    location: 'North Peak Trailhead, Boulder Canyon, CO',
    description: 'Join us for a moderately paced hike up to the Sunset Lookout point. We\'ll spend about an hour at the top for photos and light conversation before heading back down. This event is perfect for people looking to meet active locals in a low-pressure environment. Bring water and comfortable trail shoes!',
    category: 'Hiking',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000',
    tag: 'Hiking',
    tagsList: ['Hiking', 'Social'],
    hearts: true,
    attendeesCount: 12,
    maxCompanions: 20,
    duration: '3 Hours',
    organizer: {
      name: 'Alex Miller',
      role: 'Organizer',
      rating: '98% Reliability Rating',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120'
    }
  },
  {
    id: 'e6',
    title: 'Peak Trail Morning Ascent',
    dateTime: 'Tomorrow • 06:30 AM',
    location: 'Peak View Trailhead, Boulder Canyon, CO',
    description: 'Experience the early sun hitting the high ridges. This is an early morning ascent to catch the majestic views before the heat settles. We will walk at a moderate pace.',
    category: 'Hiking',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=800',
    tag: 'Hiking',
    tagsList: ['Hiking', 'Early Bird'],
    hearts: false,
    attendeesCount: 3,
    maxCompanions: 10,
    duration: '3.5 Hours',
    organizer: {
      name: 'Marcus Chen',
      role: 'Reliable Member',
      rating: '99% Reliability Rating',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120'
    }
  },
  {
    id: 'e7',
    title: 'Acoustic Jam Session',
    dateTime: 'Friday • 19:00 PM',
    location: 'South Studio Lane, New York, NY',
    description: 'Dust off your acoustic guitar, violin, cajon, or vocal pipes! We are hosting a casual, low-stress acoustic circular jam session in a beautiful retro brick studio.',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=800',
    tag: 'Music',
    tagsList: ['Music', 'Jam'],
    hearts: false,
    attendeesCount: 6,
    maxCompanions: 12,
    duration: '3 Hours',
    organizer: {
      name: 'Elena Rossi',
      role: 'Reliable Member',
      rating: '97% Reliability Rating',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
    }
  },
  {
    id: 'e8',
    title: 'Co-op Strategy Night',
    dateTime: 'Saturday • 20:00 PM',
    location: 'Tech Lounge, Seaport District, NY',
    description: 'Whether you play RTS games, complex board games, or virtual sandbox strategies, join us for a food-and-game marathon with fellow tactical thinkers.',
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    tag: 'Gaming',
    tagsList: ['Gaming', 'Co-op'],
    hearts: false,
    attendeesCount: 5,
    maxCompanions: 8,
    duration: '4 Hours',
    organizer: {
      name: 'Liam Park',
      role: 'Reliable Member',
      rating: '96% Reliability Rating',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120'
    }
  },
  {
    id: 'e9',
    title: 'Calcetto del Giovedì',
    dateTime: 'Giovedì, 12 Ott • 20:00',
    location: 'Centro Sportivo Nord',
    description: 'Gestisci le tue connessioni e le attività in programma. Partita classica di calcio a 5 per amatori amanti del gioco pulito e della birra post-partita.',
    category: 'Sport',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800',
    tag: 'SPORT',
    tagsList: ['Sport', 'Weekly'],
    hearts: false,
    attendeesCount: 4,
    maxCompanions: 10,
    duration: '1 Hour',
    organizer: {
      name: 'Fabio V.',
      role: 'Organizzatore',
      rating: '95% Affidabilità',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120'
    }
  },
  {
    id: 'e10',
    title: 'Ceramic Workshop: Texture',
    dateTime: 'Wednesday, Oct 18 • 6:00 PM',
    location: 'Clay Studio, Brooklyn, NY',
    description: 'A masterclass concentrating purely on hands-on texture sculpting, smoothing, and patterns on fresh greenware pottery.',
    category: 'Creative',
    image: 'https://images.unsplash.com/photo-1565192647048-f997ded87958?auto=format&fit=crop&q=80&w=800',
    tag: 'CREATIVE',
    tagsList: ['Creative', 'Workshop'],
    hearts: true,
    attendeesCount: 7,
    maxCompanions: 10,
    duration: '2.5 Hours',
    organizer: {
      name: 'Serena Moretti',
      role: 'Instructor',
      rating: '100% Reliability Rating',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'
    }
  }
];

export const initialMatches: MatchProfile[] = [
  {
    id: 'm1',
    name: 'Alex Chen',
    reliability: 99,
    skills: ['Hiking', 'Photography', 'Travel', 'Nature'],
    suggestedCommonEvents: 3,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
    status: 'Top Match'
  },
  {
    id: 'm2',
    name: 'Jordan Miller',
    reliability: 96,
    skills: ['Biking', 'Coffee', 'Hike'],
    suggestedCommonEvents: 1,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 'm3',
    name: 'Sarah Wilson',
    reliability: 98,
    skills: ['Yoga', 'Art', 'Books'],
    suggestedCommonEvents: 4,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 'm4',
    name: 'Liam Davis',
    reliability: 95,
    skills: ['Running', 'Tech', 'Games'],
    suggestedCommonEvents: 2,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120'
  }
];

export const initialUser: UserProfile = {
  name: 'Alex Rivera',
  location: 'Seattle, WA',
  joinedDate: 'Joined Jan 2024',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
  matchesCount: 14,
  eventsCount: 8,
  karma: 122,
  story: "I'm a software architect by day and an avid mountaineer by weekend. I moved to the Pacific Northwest to be closer to the peaks and am looking for partners who don't mind a 4 AM trailhead start or discussing systemic scalability over a post-hike brew.\n\nBeyond the outdoors, I'm a modular synth enthusiast and a self-taught baker currently mastering sourdough.",
  interests: ['Photography', 'Hiking', 'Synth music', 'Sourdough baking'],
  isVerified: false
};
