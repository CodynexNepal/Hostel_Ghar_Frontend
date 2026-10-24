export const siteConfig = {
  name: 'Hostel Ghar',
  tagline: 'Find Your Perfect Hostel Away From Home',
  description:
    'Find and book verified hostels across Nepal — Kathmandu, Pokhara, Chitwan & 50+ cities. Compare prices, amenities & real reviews. Free to browse, instant booking.',
  // Canonical production URL. Override with NEXT_PUBLIC_SITE_URL in production.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'https://hostelghar.com'
  ).replace(/\/$/, ''),
  ogImage: '/images/og-default.svg',
  ogImageAlt: 'Hostel Ghar — Find verified hostels across Nepal',
  locale: 'en_US',
  language: 'en',
  themeColor: '#B9FF66',
  twitterHandle: '@hostelghar',
  links: {
    twitter: 'https://twitter.com/hostelghar',
    facebook: 'https://facebook.com/hostelghar',
    instagram: 'https://instagram.com/hostelghar',
    youtube: 'https://youtube.com/@hostelghar',
    linkedin: 'https://linkedin.com/company/hostelghar',
  },
  contact: {
    email: 'info@hostelghar.com',
    phone: '+977-1-1234567',
    address: 'Thamel, Kathmandu, Nepal',
  },
  organization: {
    legalName: 'Hostel Ghar Pvt. Ltd.',
    foundingDate: '2023-01-15',
    founders: ['Hostel Ghar Team'],
    address: {
      streetAddress: 'Thamel',
      addressLocality: 'Kathmandu',
      postalCode: '44600',
      addressCountry: 'NP',
    },
  },
  pagination: {
    defaultLimit: 12,
    maxLimit: 100,
  },
} as const;

export type SiteConfig = typeof siteConfig;
