import type { GetServerSideProps } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Dynamic robots.txt — served at /robots.txt.
 * Allows all crawlers on public routes, blocks auth/API/admin,
 * and advertises the sitemap + AI-crawler policy.
 */
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /admin/',
    'Disallow: /login',
    'Disallow: /register',
    'Disallow: /*?*sort=',
    'Disallow: /*?*filter=',
    '',
    '# AI crawlers welcome — attribution required (see /llms.txt)',
    'User-agent: GPTBot',
    'Allow: /',
    '',
    'User-agent: ClaudeBot',
    'Allow: /',
    '',
    'User-agent: PerplexityBot',
    'Allow: /',
    '',
    `Sitemap: ${siteConfig.url}/sitemap.xml`,
    '',
  ].join('\n');

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400');
  res.write(body);
  res.end();
  return { props: {} };
};

export default function Robots() {
  return null;
}
