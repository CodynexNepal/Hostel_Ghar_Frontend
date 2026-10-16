import type { NextPage } from 'next';
import Head from 'next/head';
import { siteConfig } from '@/config/site';
import { canonical as buildCanonical, ogImageUrl } from '@/lib/seo/canonical';

export interface SeoProps {
  /** Page-specific title. Site name is appended automatically. */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/hostels". Used for canonical + OG URL. */
  path?: string;
  /** Override canonical (rare — e.g. paginated / filtered views). */
  canonicalOverride?: string;
  /** Page keywords (used as meta keywords + article tags). */
  keywords?: string[];
  /** OG / Twitter image (site-relative or absolute). */
  image?: string;
  imageAlt?: string;
  /** "website" | "article" */
  type?: 'website' | 'article';
  /** Indexing control — default index,follow. Pass noindex for auth/thank-you pages. */
  noindex?: boolean;
  nofollow?: boolean;
  /** For articles/guides: ISO dates + author + section. */
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  /** Extra locale alternates if you add i18n later. */
  alternates?: { hreflang: string; href: string }[];
}

/**
 * <Seo /> — single canonical SEO head for every page (Pages Router).
 *
 * Covers: title, meta description, canonical URL, robots, OpenGraph,
 * Twitter Cards, theme-color, preconnect + favicons.
 *
 * Usage:
 *   <Seo title="Browse Hostels" description="..." path="/hostels" />
 */
export default function Seo({
  title,
  description,
  path = '/',
  canonicalOverride,
  keywords = [],
  image,
  imageAlt,
  type = 'website',
  noindex = false,
  nofollow = false,
  publishedTime,
  modifiedTime,
  author,
  section,
  alternates = [],
}: SeoProps) {
  const fullTitle =
    path === '/' ? `${siteConfig.name} — ${title}` : `${title} | ${siteConfig.name}`;
  const canonicalUrl = canonicalOverride || buildCanonical(path);
  const ogImage = ogImageUrl(image);
  const robots = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'},max-image-preview:large,max-snippet:-1`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Geographic + language targeting */}
      <meta name="geo.region" content="NP" />
      <meta name="geo.placename" content="Kathmandu, Nepal" />
      <meta httpEquiv="content-language" content={siteConfig.language} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={imageAlt || siteConfig.ogImageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={siteConfig.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteConfig.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={imageAlt || siteConfig.ogImageAlt} />

      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && <meta property="article:author" content={author} />}
      {type === 'article' && section && <meta property="article:section" content={section} />}

      {alternates.map((alt) => (
        <link key={alt.hreflang} rel="alternate" hrefLang={alt.hreflang} href={alt.href} />
      ))}

      <meta name="theme-color" content={siteConfig.themeColor} />
    </Head>
  );
}

export type { NextPage };
