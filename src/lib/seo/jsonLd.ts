import { siteConfig } from '@/config/site';
import { canonical } from '@/lib/seo/canonical';

/* ------------------------------------------------------------------ */
/*  Shared JSON-LD builders (schema.org) — used by <JsonLd />          */
/* ------------------------------------------------------------------ */

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.organization.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/images/logo/hostel_ghar_logo.jpg`,
      width: 512,
      height: 512,
    },
    description: siteConfig.description,
    foundingDate: siteConfig.organization.foundingDate,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.organization.address.streetAddress,
      addressLocality: siteConfig.organization.address.addressLocality,
      postalCode: siteConfig.organization.address.postalCode,
      addressCountry: siteConfig.organization.address.addressCountry,
    },
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.instagram,
      siteConfig.links.twitter,
      siteConfig.links.youtube,
      siteConfig.links.linkedin,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      contactType: 'customer service',
      areaServed: 'NP',
      availableLanguage: ['en', 'ne'],
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/hostels?search={search_term_string}`,
      },
      // Required by Google for sitelinks searchbox
      'query-input': 'required name=search_term_string',
    },
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteConfig.url}/#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

export interface ProductSchemaInput {
  slug: string;
  name: string;
  description: string;
  image: string | string[];
  priceFrom: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  addressLocality?: string;
}

/** Hostel listing as schema.org LodgingBusiness (richer than generic Product). */
export function hostelJsonLd(h: ProductSchemaInput) {
  const images = Array.isArray(h.image) ? h.image : [h.image];
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${canonical(`/hostel/${h.slug}`)}#lodging`,
    name: h.name,
    description: h.description,
    url: canonical(`/hostel/${h.slug}`),
    image: images.map((src) =>
      src.startsWith('http') ? src : `${siteConfig.url}${src}`,
    ),
    priceRange: `NPR ${h.priceFrom}+`,
    currenciesAccepted: h.currency || 'NPR',
    address: {
      '@type': 'PostalAddress',
      addressLocality: h.addressLocality || 'Kathmandu',
      addressCountry: 'NP',
    },
    ...(h.rating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: h.rating,
            reviewCount: h.reviewCount || 1,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

export interface ArticleSchemaInput {
  path: string;
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  authorUrl?: string;
}

export function articleJsonLd(a: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonical(a.path)}#article`,
    mainEntityOfPage: canonical(a.path),
    headline: a.headline,
    description: a.description,
    image: a.image
      ? [a.image.startsWith('http') ? a.image : `${siteConfig.url}${a.image}`]
      : [`${siteConfig.url}${siteConfig.ogImage}`],
    datePublished: a.datePublished,
    dateModified: a.dateModified || a.datePublished,
    author: {
      '@type': 'Person',
      name: a.authorName || 'Hostel Ghar Research Team',
      url: a.authorUrl || `${siteConfig.url}/about#team`,
    },
    publisher: { '@id': `${siteConfig.url}/#organization` },
    inLanguage: 'en',
  };
}

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export function howToJsonLd(opts: {
  path: string;
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${canonical(opts.path)}#howto`,
    name: opts.name,
    description: opts.description,
    totalTime: opts.totalTime || 'PT10M',
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.image ? { image: s.image } : {}),
    })),
  };
}
