import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import Seo from '@/components/seo/Seo';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FaqAccordion from '@/components/aeo/FaqAccordion';
import DirectAnswer from '@/components/aeo/DirectAnswer';
import { FAQS, FAQ_CATEGORIES } from '@/data/faqs';
import { faqJsonLd } from '@/lib/seo/jsonLd';
import { getPageMeta } from '@/lib/seo/metadata';
import { MessageCircleQuestion } from 'lucide-react';

export default function FaqPage() {
  const meta = getPageMeta('/faq');
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/faq" keywords={meta.keywords} />
      <JsonLd
        data={faqJsonLd(
          FAQS.map((f) => ({
            question: f.question,
            answer: `${f.answer} ${f.details || ''}`.trim(),
          }))
        )}
        id="ld-faq"
      />
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'FAQs', path: '/faq' },
            ]}
          />

          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-lime/20 text-brand-black text-sm font-semibold">
              <MessageCircleQuestion size={16} aria-hidden /> {FAQS.length} expert answers
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight mt-4 mb-4">
              Hostel Booking in Nepal, Answered
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Direct answers to the questions travelers and owners ask most — prices, safety,
              booking, payments and listing. Every answer is short enough for voice assistants to
              quote, with details below.
            </p>
          </div>

          <DirectAnswer
            question="How much does a hostel cost in Nepal?"
            answer="A hostel bed in Nepal costs NPR 600–2,000 per night ($5–$15). Dorms in Kathmandu average NPR 800, private rooms NPR 1,500–2,500. Browsing and booking on Hostel Ghar is always free for travelers."
            ctaHref="/hostels"
            ctaLabel="Browse hostels by price"
          />

          <FaqAccordion faqs={FAQS} showFilter />

          <section
            aria-label="Still have questions"
            className="mt-12 bg-brand-black rounded-3xl p-8 sm:p-10 text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              Still have a question?
            </h2>
            <p className="text-neutral-400 mb-6">We reply within 24 hours, Sun–Fri (NPT).</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="px-6 py-3 bg-brand-lime text-brand-black font-bold rounded-xl hover:bg-brand-lime/85 transition-colors"
              >
                Contact support
              </Link>
              <Link
                href="/hostels"
                className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
              >
                Browse hostels
              </Link>
            </div>
          </section>

          <p className="text-xs text-neutral-400 mt-8 text-center">
            Categories: {FAQ_CATEGORIES.filter((c) => c !== 'All').join(' · ')} · Content reviewed
            Sept 2026 by the Hostel Ghar Research Team, Kathmandu.
          </p>
        </div>
        <Footer />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => ({ props: {} });
