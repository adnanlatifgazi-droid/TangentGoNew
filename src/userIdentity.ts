// Helpers to build a coherent, demo-ready user identity from the email used at
// login.
//
// The backend is not available yet, so the entire logged-in profile is mocked
// on the client. Everything is derived deterministically from the email
// address: the same email always produces the same name, photo, city, bio and
// stats. That keeps a live demo stable and repeatable while still looking like
// real data (log in with valentina.bulgheroni@docebo.com and you consistently
// get "Valentina Bulgheroni" from Milano, etc.).

import { UserProfile } from './types';

/** Stable 32-bit hash for a string. Same input always yields the same number. */
function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/**
 * Integer bit-mixer (murmur3 finalizer). Gives good avalanche so that even
 * correlated seeds (e.g. seed, seed+1, seed >>> 3) map to well-spread indexes.
 */
function mix(n: number): number {
  let h = n >>> 0;
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

/** Deterministically pick a single item from a list using a numeric seed. */
function pick<T>(items: T[], seed: number): T {
  return items[mix(seed) % items.length];
}

/** Deterministically pick `count` distinct items from a list using a seed. */
function pickDistinct<T>(items: T[], seed: number, count: number): T[] {
  const pool = [...items];
  const result: T[] = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    // Salt the seed per index so each pick is independently well-distributed.
    const idx = mix(seed + i * 0x9e3779b1) % pool.length;
    result.push(pool.splice(idx, 1)[0]);
  }
  return result;
}

/**
 * Derives a human-readable display name from an email address.
 *
 * Examples:
 *   valentina.bulgheroni@docebo.com -> "Valentina Bulgheroni"
 *   mario.rossi92@example.com       -> "Mario Rossi"
 *   google.user@example.com         -> "Google User"
 *   john@example.com                -> "John"
 */
export function deriveNameFromEmail(email: string): string {
  const localPart = (email.split('@')[0] ?? '').trim();
  // Drop any "+tag" suffix (e.g. name+promo@...)
  const base = localPart.split('+')[0];

  const parts = base
    // Split on the common separators found in email local parts
    .split(/[._\-]+/)
    // Remove digits so things like "rossi92" become "rossi"
    .map((part) => part.replace(/[0-9]+/g, ''))
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());

  if (parts.length === 0) return 'TangentGo Member';
  return parts.join(' ');
}

/** First name only, handy for greetings and bio copy. */
export function deriveFirstName(email: string): string {
  return deriveNameFromEmail(email).split(' ')[0] || 'there';
}

// A pool of portrait photos (already used elsewhere in the app) to pick from.
const AVATAR_POOL = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300',
];

/**
 * Picks an avatar for the given email. The choice looks random but is stable
 * per email, so the same user keeps the same photo across views and reloads.
 */
export function pickAvatarForEmail(email: string): string {
  return pick(AVATAR_POOL, hashString(email));
}

// City pools. We bias toward Italian cities for Italian-looking domains so the
// demo feels right in front of an Italian audience (e.g. Docebo).
const ITALIAN_CITIES = [
  'Milano, IT',
  'Biassono, IT',
  'Roma, IT',
  'Torino, IT',
  'Bologna, IT',
  'Como, IT',
  'Firenze, IT',
  'Napoli, IT',
];

const INTERNATIONAL_CITIES = [
  'Seattle, WA',
  'Austin, TX',
  'Berlin, DE',
  'Lisbon, PT',
  'Amsterdam, NL',
  'Toronto, CA',
  'Barcelona, ES',
  'London, UK',
  'Denver, CO',
  'Brooklyn, NY',
];

const INTEREST_POOL = [
  'Hiking',
  'Photography',
  'Live music',
  'Cooking',
  'Yoga',
  'Trail running',
  'Board games',
  'Cycling',
  'Sourdough baking',
  'Travel',
  'Pottery',
  'Specialty coffee',
  'Climbing',
  'Film & cinema',
  'Synth music',
  'Street food',
];

const JOIN_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** Picks a home city, biased to Italy for docebo.com / .it domains. */
function cityForEmail(email: string, seed: number): string {
  const domain = (email.split('@')[1] ?? '').toLowerCase();
  const italian = domain.endsWith('docebo.com') || domain.endsWith('.it');
  return pick(italian ? ITALIAN_CITIES : INTERNATIONAL_CITIES, seed + 7);
}

/** Builds a short, friendly "about me" using the picked interests and city. */
function storyForUser(
  firstName: string,
  city: string,
  interests: string[],
  seed: number,
): string {
  const a = (interests[0] ?? 'meeting people').toLowerCase();
  const b = (interests[1] ?? 'good coffee').toLowerCase();
  const c = (interests[2] ?? 'weekend trips').toLowerCase();

  const templates = [
    `Hi, I'm ${firstName}! I'm based in ${city} and I'm happiest when there's ${a} or ${b} on the calendar.\n\nI joined TangentGo to meet reliable companions for spontaneous plans, no awkward small talk, just shared interests and good energy.`,
    `${firstName} here. Work keeps me busy during the week, but weekends are for ${a} or planning the next ${c} around ${city}.\n\nAlways up for meeting people who take their hobbies seriously, but not themselves.`,
    `New to building my circle in ${city} and looking for partners in ${a}, ${b}, and everything in between.\n\nI'm ${firstName}, I show up when I say I will, and I think the best plans start with "why not?"`,
    `I'm ${firstName}. ${city} local, lover of ${a}, part-time ${c} enthusiast, and a firm believer that doing things alongside other people just makes them better.\n\nLet's find something on the calendar and make it happen.`,
  ];

  return pick(templates, seed + 17);
}

/**
 * Builds a complete, coherent UserProfile from an email address. Used at login
 * and registration to stand in for the (not-yet-available) backend. Everything
 * is stable per email so the same account always looks the same.
 */
export function buildUserProfileFromEmail(email: string): UserProfile {
  const normalized = email.toLowerCase().trim();
  const seed = hashString(normalized);

  const name = deriveNameFromEmail(email);
  const firstName = name.split(' ')[0];
  const interests = pickDistinct(INTEREST_POOL, seed, 4);
  const city = cityForEmail(email, seed);
  const joinMonth = pick(JOIN_MONTHS, seed + 31);
  const joinYear = 2023 + (mix(seed + 53) % 4); // 2023 - 2026

  return {
    name,
    location: city,
    joinedDate: `Joined ${joinMonth} ${joinYear}`,
    avatar: pickAvatarForEmail(email),
    matchesCount: 6 + (mix(seed + 101) % 38),
    eventsCount: 2 + (mix(seed + 211) % 22),
    karma: 40 + (mix(seed + 307) % 210),
    story: storyForUser(firstName, city, interests, seed),
    interests,
    isVerified: false,
  };
}
