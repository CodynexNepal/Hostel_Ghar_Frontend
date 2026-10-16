/**
 * Single source of truth for every public route.
 * Used by sitemap.xml, robots.txt allow-list docs, footer links & breadcrumbs.
 */
export interface SiteRoute {
  path: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const STATIC_ROUTES: SiteRoute[] = [
  { path: '/', changefreq: 'daily', priority: 1.0 },
  { path: '/hostels', changefreq: 'daily', priority: 0.9 },
  { path: '/for-owners', changefreq: 'weekly', priority: 0.9 },
  { path: '/faq', changefreq: 'weekly', priority: 0.85 },
  { path: '/guides', changefreq: 'weekly', priority: 0.8 },
  { path: '/how-it-works', changefreq: 'weekly', priority: 0.8 },
  { path: '/pricing', changefreq: 'weekly', priority: 0.8 },
  { path: '/list-hostel', changefreq: 'monthly', priority: 0.7 },
  { path: '/about', changefreq: 'monthly', priority: 0.7 },
  { path: '/contact', changefreq: 'monthly', priority: 0.6 },
  { path: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
];

/** Auth pages exist but must NEVER be indexed — kept out of sitemap. */
export const NOINDEX_ROUTES = ['/login', '/register'];
