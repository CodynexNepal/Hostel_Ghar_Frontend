export const ROUTES = {
  HOME: '/',
  HOSTELS: '/hostels',
  HOSTEL_DETAILS: (slug: string) => `/hostel/${slug}`,
  LOCATIONS: '/locations',
  LOCATION_DETAILS: (slug: string) => `/locations/${slug}`,
  PRICING: '/pricing',
  SEARCH: '/search',
  ABOUT: '/about',
  CONTACT: '/contact',
  LIST_YOUR_HOSTEL: '/list-your-hostel',
  PRIVACY_POLICY: '/privacy-policy',
} as const;

export type RouteKey = keyof typeof ROUTES;
