import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import Seo from '@/components/seo/Seo';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import DirectAnswer from '@/components/aeo/DirectAnswer';
import AuthorCard from '@/components/geo/AuthorCard';
import TrustSignals from '@/components/geo/TrustSignals';
import FaqAccordion from '@/components/aeo/FaqAccordion';
import { GUIDES, getGuideBySlug, type Guide } from '@/data/guides';
import { GUIDE_BODIES } from '@/data/guide-bodies';
import { FAQS } from '@/data/faqs';
import { articleJsonLd } from '@/lib/seo/jsonLd';
import { MapPin, CalendarDays, Clock3, ArrowRight, ExternalLink } from 'lucide-react';

export default function GuidePage({ guide }: { guide: Guide }) {
  const body = GUIDE_BODIES[guide.slug] || { intro: guide.description, sections: [] };
  const relatedFaqs = FAQS.slice(0, 4);
  return (
    <>
      <Seo
        title={guide.title}
        description={guide.description}
        path={`/guides/${guide.slug}`}
        type="article"
        publishedTime={guide.published}
        modifiedTime={guide.updated}
        author={guide.author.name}
        section={guide.category}
        keywords={['Nepal hostel guide', guide.category]}
      />
      <JsonLd
        data={articleJsonLd({
          path: `/guides/${guide.slug}`,
          headline: guide.title,
          description: guide.description,
          datePublished: guide.published,
          dateModified: guide.updated,
          authorName: guide.author.name,
        })}
        id="ld-article"
      />
      <main className="min-h-screen bg-white">
        <Header />
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Guides', path: '/guides' },
              { label: 'Article', path: `/guides/${guide.slug}` },
            ]}
          />
          <p className="inline-block px-3 py-1 bg-brand-lime/20 text-brand-black text-xs font-bold rounded-full mb-4">
            {guide.category}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight leading-tight mb-4">
            {guide.title}
          </h1>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500 mb-6">
            <span className="inline-flex items-center gap-1">
              <CalendarDays size={14} aria-hidden /> Updated {guide.updated.slice(0, 10)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock3 size={14} aria-hidden /> {guide.readMinutes} min read
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} aria-hidden /> Nepal
            </span>
          </p>
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 bg-neutral-100">
            <Image
              src="/images/static/hostel.jpg"
              alt={guide.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
          <p className="text-lg text-neutral-700 leading-relaxed font-medium">{body.intro}</p>
          <AuthorCard author={{ ...guide.author, reviewer: guide.reviewer }} />
          {body.sections.map((s) => (
            <section key={s.h} className="mt-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight mb-2">
                {s.h}
              </h2>
              {s.answer && <DirectAnswer question={s.h} answer={s.answer} />}
              <p className="text-neutral-600 leading-relaxed text-[17px]">{s.p}</p>
            </section>
          ))}
          <section className="mt-12 bg-neutral-50 border border-neutral-100 rounded-2xl p-6">
            <h2 className="text-xl font-extrabold text-brand-black mb-2">
              Methodology and sources
            </h2>
            <p className="text-[15px] text-neutral-600 leading-relaxed m-0">
              Dataset: 500+ verified Hostel Ghar listings, Jan 2024 - Aug 2026. Prices are medians
              of bookable rates. External references:{' '}
              <a
                className="underline font-semibold inline-flex items-center gap-1"
                href="https://www.nepal-tourism.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nepal Tourism Board <ExternalLink size={12} />
              </a>
              {', '}
              <a
                className="underline font-semibold inline-flex items-center gap-1"
                href="https://www.nrb.org.np"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nepal Rastra Bank forex <ExternalLink size={12} />
              </a>
              .
            </p>
          </section>
          <TrustSignals />
          <section className="mt-10">
            <h2 className="text-2xl font-extrabold text-brand-black mb-4">
              Questions about this guide
            </h2>
            <FaqAccordion faqs={relatedFaqs} />
          </section>
          <nav aria-label="More guides" className="mt-12 flex flex-wrap gap-3">
            {GUIDES.filter((g) => g.slug !== guide.slug).map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl bg-brand-black text-white text-sm font-semibold hover:bg-brand-black/85 transition-colors"
              >
                Read: {g.slug.replace(/-/g, ' ').slice(0, 30)}… <ArrowRight size={14} aria-hidden />
              </Link>
            ))}
          </nav>
        </article>
        <Footer />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: GUIDES.map((g) => ({ params: { slug: g.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const guide = getGuideBySlug(String(params?.slug));
  if (!guide) return { notFound: true };
  return { props: { guide } };
};
