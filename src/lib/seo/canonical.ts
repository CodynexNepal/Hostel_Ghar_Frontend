import { siteConfig } from '@/config/site';

/**
 * Canonical URL builder — single source of truth for every indexed URL.
 * Always pass a site-relative path ("/hostels", "/pricing").
 * Normalises trailing slashes, query strings and duplicate slashes so
 * search engines never see duplicate URLs.
 */
export function canonical(path = '/'): string {
  const clean = `/${String(path || '/')
    .split('?')[0]
    .split('#')[0]
    .replace(/^\/+|\/+$/g, '')}`;
  const normalised = clean === '/' ? '' : clean.replace(/\/+/g, '/');
  return `${siteConfig.url}${normalised}`;
}

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (pathOrUrl.startsWith('/')) return `${siteConfig.url}${pathOrUrl}`;
  return `${siteConfig.url}/${pathOrUrl}`;
}

export function ogImageUrl(image?: string): string {
  return absoluteUrl(image || siteConfig.ogImage);
}
