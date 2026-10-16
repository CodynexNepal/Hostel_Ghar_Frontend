/**
 * GEO original-research layer — guide articles with named authors,
 * dates, sources and methodology. Each powers /guides/[slug].
 */
export interface Guide {
  slug: string;
  title: string;
  description: string;
  updated: string;
  published: string;
  author: { name: string; role: string; bio: string; location: string };
  reviewer: string;
  readMinutes: number;
  category: string;
}

export const GUIDES: Guide[] = [
  {
    slug: 'hostel-prices-nepal-2026',
    title: 'Hostel Prices in Nepal 2026: What 500+ Listings Reveal',
    description:
      'Original research on 500+ verified Nepali hostel listings: average dorm NPR 800-1,200, private NPR 1,500-2,500, seasonal swings, and the cheapest cities to stay.',
    updated: '2026-09-01T00:00:00+05:45',
    published: '2026-06-15T00:00:00+05:45',
    author: {
      name: 'Aashish Sharma',
      role: 'Head of Research, Hostel Ghar',
      bio: 'Aashish has analysed Nepali accommodation pricing for 4 years and personally visited 200+ hostels across 12 districts.',
      location: 'Kathmandu, Nepal',
    },
    reviewer: 'Priya Shrestha, Data Analyst',
    readMinutes: 9,
    category: 'Original Research',
  },
  {
    slug: 'solo-female-travel-nepal-safety',
    title: 'Solo Female Travel in Nepal: Hostel Safety Guide',
    description:
      'Girls-only dorms, verified badges, arrival tips and emergency contacts — everything a solo female traveler needs to book hostels safely in Nepal.',
    updated: '2026-08-20T00:00:00+05:45',
    published: '2026-04-02T00:00:00+05:45',
    author: {
      name: 'Sneha Karki',
      role: 'Travel Safety Writer',
      bio: 'Sneha spent 18 months solo-traveling Nepal and reviews hostel safety standards for Hostel Ghar verification.',
      location: 'Pokhara, Nepal',
    },
    reviewer: 'Aashish Sharma, Head of Research',
    readMinutes: 7,
    category: 'Safety Guide',
  },
  {
    slug: 'kathmandu-vs-pokhara-hostels',
    title: 'Kathmandu vs Pokhara Hostels: Where Should You Stay?',
    description:
      'Price, vibe, WiFi speed, trekking access and nightlife compared across 300+ listings — plus our pick for backpackers, students and digital nomads.',
    updated: '2026-08-10T00:00:00+05:45',
    published: '2026-03-11T00:00:00+05:45',
    author: {
      name: 'Aashish Sharma',
      role: 'Head of Research, Hostel Ghar',
      bio: 'Aashish has analysed Nepali accommodation pricing for 4 years and personally visited 200+ hostels across 12 districts.',
      location: 'Kathmandu, Nepal',
    },
    reviewer: 'Sneha Karki, Travel Safety Writer',
    readMinutes: 8,
    category: 'Comparison',
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function guideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}
