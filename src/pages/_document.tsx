import { Html, Head, Main, NextScript } from 'next/document';
import { siteConfig } from '@/config/site';

/**
 * Custom Document — global shell for SEO/GEO/AEO:
 * lang, theme-color, favicons, font preconnect, Organization+WebSite JSON-LD
 * (emitted once, site-wide — page components add their own page-level schemas).
 */
export default function Document() {
  const orgLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.organization.legalName,
        alternateName: siteConfig.name,
        url: siteConfig.url,
        logo: {
          '@type': 'ImageObject',
          url: `${siteConfig.url}/images/logo/hostel_ghar_logo.jpg`,
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
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { '@id': `${siteConfig.url}/#organization` },
        inLanguage: 'en',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteConfig.url}/hostels?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content={siteConfig.themeColor} />
        <meta name="geo.region" content="NP" />
        <meta name="geo.placename" content="Kathmandu, Nepal" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd).replace(/</g, '\\u003c') }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
