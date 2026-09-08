export const siteConfig = {
  name: 'Hostel Ghar',
  description: 'Find and book the best hostels across Nepal',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/images/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/hostelghar',
    facebook: 'https://facebook.com/hostelghar',
    instagram: 'https://instagram.com/hostelghar',
  },
  contact: {
    email: 'info@hostelghar.com',
    phone: '+977-1-1234567',
    address: 'Kathmandu, Nepal',
  },
  pagination: {
    defaultLimit: 12,
    maxLimit: 100,
  },
} as const;

export type SiteConfig = typeof siteConfig;
