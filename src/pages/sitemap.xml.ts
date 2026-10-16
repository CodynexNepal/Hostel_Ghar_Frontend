import type { GetServerSideProps } from 'next';
import { siteConfig } from '@/config/site';
import { STATIC_ROUTES } from '@/lib/seo/routes';
import { HOSTELS } from '@/data/hostels';
import { GUIDES } from '@/data/guides';

/**
 * Dynamic XML sitemap — served at /sitemap.xml.
 * Covers static routes + hostel detail pages + guide articles.
 * getServerSideProps sets the XML content-type + cache headers.
 */
function buildSitemap(): string {
  const now = new Date().toISOString();
  const urls: { loc: string; lastmod: string; changefreq: string; priority: number }[] = [
    ...STATIC_ROUTES.map((r) => ({
      loc: `${siteConfig.url}${r.path === '/' ? '' : r.path}`,
      lastmod: now,
      changefreq: r.changefreq,
      priority: r.priority,
    })),
    ...HOSTELS.map((h) => ({
      loc: `${siteConfig.url}/hostel/${h.slug}`,
      lastmod: now,
      changefreq: 'weekly',
      priority: 0.85,
    })),
    ...GUIDES.map((g) => ({
      loc: `${siteConfig.url}/guides/${g.slug}`,
      lastmod: g.updated,
      changefreq: 'monthly',
      priority: 0.75,
    })),
  ];

  const body = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = buildSitemap();
  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(xml);
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
