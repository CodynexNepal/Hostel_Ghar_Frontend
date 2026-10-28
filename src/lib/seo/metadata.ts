/**
 * Central SEO metadata registry — one entry per route.
 * Pages import `getPageMeta(path)` so titles/descriptions stay consistent
 * between <Seo/>, sitemap, OG images and JSON-LD.
 */
export interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  type?: 'website' | 'article';
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: 'Hostel Ghar - Find Your Place. Manage Your Space',
    description:
      'Nepal’s hostel discovery and management platform. Explore verified hostels, compare facilities, and manage rooms, residents, and hostel operations all in one connected platform.',
    keywords: [
      'hostel in Nepal',
      'hostel discovery Nepal',
      'hostel management system Nepal',
      'hostel booking Nepal',
      'hostels in Kathmandu',
      'hostels in Pokhara',
      'resident dashboard',
      'hostel owner dashboard',
    ],
    changefreq: 'daily',
    priority: 1.0,
  },
  '/hostels': {
    title: 'Browse 500+ Verified Hostels in Nepal',
    description:
      'Compare 500+ verified hostels across Nepal by price, location, amenities & rating. Dorms from NPR 600/night. Free WiFi, breakfast options & instant booking.',
    keywords: [
      'browse hostels Nepal',
      'hostel list Kathmandu',
      'dormitory Nepal',
      'private room hostel Pokhara',
      'hostel price Nepal',
    ],
    changefreq: 'daily',
    priority: 0.9,
  },
  '/how-it-works': {
    title: 'How Hostel Ghar Works',
    description:
      'How does Hostel Ghar work? Create an account, discover verified hostels, book instantly, and manage everything from one dashboard. Live in under 5 minutes.',
    keywords: ['how hostel ghar works', 'how to book hostel Nepal', 'hostel booking process'],
    changefreq: 'weekly',
    priority: 0.8,
  },
  '/pricing': {
    title: 'Simple Pricing for Hostel Owners',
    description:
      'Hostel Ghar pricing: Starter is free forever. Professional NPR 2,999/mo with unlimited residents & fee automation. Enterprise custom. 14-day free trial, no credit card.',
    keywords: ['hostel management pricing Nepal', 'hostel software price', 'hostel ghar pricing'],
    changefreq: 'weekly',
    priority: 0.8,
  },
  '/for-owners': {
    title: 'List Your Hostel — Get More Bookings',
    description:
      'Own a hostel in Nepal? List free on Hostel Ghar, reach 10,000+ travelers, automate fees & fill beds faster. Go live in 24 hours. Only 5% fee on paid bookings.',
    keywords: [
      'list hostel Nepal',
      'hostel owner dashboard',
      'increase hostel bookings',
      'hostel management software Nepal',
    ],
    changefreq: 'weekly',
    priority: 0.9,
  },
  '/list-hostel': {
    title: 'List Your Hostel Free',
    description:
      'List your hostel on Hostel Ghar in 4 steps — free forever, go live in 24 hours, verified badge, Nepali support. Join 500+ hostels already listed.',
    keywords: ['list hostel free', 'add hostel Nepal', 'register hostel online'],
    changefreq: 'monthly',
    priority: 0.7,
  },
  '/faq': {
    title: 'FAQs — Hostel Booking in Nepal, Answered',
    description:
      'How much does a hostel cost in Nepal? Is Hostel Ghar free? 40+ direct answers about booking, prices, safety, payments & listing your hostel.',
    keywords: ['hostel Nepal FAQ', 'hostel booking questions', 'hostel price Nepal questions'],
    type: 'website',
    changefreq: 'weekly',
    priority: 0.85,
  },
  '/guides': {
    title: 'Hostel Guides & Original Research',
    description:
      'Data-backed guides: hostel prices in Kathmandu & Pokhara, safety tips, packing lists & booking research from 500+ Nepali hostels.',
    keywords: ['Nepal hostel guide', 'Kathmandu hostel prices', 'Pokhara backpacker guide'],
    changefreq: 'weekly',
    priority: 0.8,
  },
  '/forgot-password': {
    title: 'Forgot Password | Hostel Ghar',
    description: 'Request a password reset link for your Hostel Ghar account.',
    keywords: ['forgot password', 'hostel ghar reset'],
    changefreq: 'monthly',
    priority: 0.3,
  },
  '/reset-password': {
    title: 'Reset Password | Hostel Ghar',
    description: 'Set a new password for your Hostel Ghar account.',
    keywords: ['reset password', 'hostel ghar account'],
    changefreq: 'monthly',
    priority: 0.3,
  },
  '/about': {
    title: 'About Hostel Ghar — Our Team & Mission',
    description:
      'Meet the team behind Nepal’s hostel platform. Our mission: safe, affordable beds for every traveler. 500+ hostels, 10K+ travelers, 50+ cities.',
    keywords: ['about hostel ghar', 'hostel ghar team', 'Nepal hostel company'],
    changefreq: 'monthly',
    priority: 0.7,
  },
  '/contact': {
    title: 'Contact Us — We Reply Within 24 Hours',
    description:
      'Questions about a booking or listing? Email info@hostelghar.com or call +977-1-1234567 (Sun–Fri, 9am–6pm NPT). Thamel, Kathmandu.',
    keywords: ['contact hostel ghar', 'hostel ghar support', 'hostel ghar phone'],
    changefreq: 'monthly',
    priority: 0.6,
  },
  '/privacy-policy': {
    title: 'Privacy Policy & Terms',
    description:
      'How Hostel Ghar collects, uses and protects your data. You own your data — export or delete anytime. Read our privacy policy & terms of service.',
    keywords: ['hostel ghar privacy', 'hostel ghar terms'],
    changefreq: 'yearly',
    priority: 0.3,
  },
};

export function getPageMeta(path: string): PageMeta {
  return (
    PAGE_META[path] || {
      title: 'Hostel Ghar',
      description:
        'Find and book verified hostels across Nepal. Compare prices, amenities & reviews.',
      keywords: ['hostel Nepal', 'hostel ghar'],
      changefreq: 'weekly' as const,
      priority: 0.5,
    }
  );
}
