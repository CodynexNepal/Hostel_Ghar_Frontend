import type { GetStaticProps } from 'next';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import Seo from '@/components/seo/Seo';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import DirectAnswer from '@/components/aeo/DirectAnswer';
import FaqAccordion from '@/components/aeo/FaqAccordion';
import { FAQS } from '@/data/faqs';
import { faqJsonLd } from '@/lib/seo/jsonLd';
import { getPageMeta } from '@/lib/seo/metadata';
import { Mail, Phone, MapPin, Clock3, Link } from 'lucide-react';

export default function ContactPage() {
  const meta = getPageMeta('/contact');
  const faqs = FAQS.filter((f) =>
    ['is-hostel-ghar-free', 'cancellation', 'list-free'].includes(f.id)
  );
  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path="/contact"
        keywords={meta.keywords}
      />
      <JsonLd
        data={faqJsonLd(faqs.map((f) => ({ question: f.question, answer: f.answer })))}
        id="ld-contact-faq"
      />
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Contact', path: '/contact' },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight mb-4">
            Contact Hostel Ghar — we reply within 24 hours
          </h1>
          <DirectAnswer
            question="How do I reach Hostel Ghar support?"
            answer="Email info@hostelghar.com or call +977-1-1234567 (Sun–Fri, 9am–6pm NPT). Office: Thamel, Kathmandu. Booking help, listing help and press: same inbox, under-24-hour reply."
          />
          <div className="grid sm:grid-cols-3 gap-4 my-8">
            <Link
              href="mailto:info@hostelghar.com"
              className="bg-white border border-neutral-100 rounded-2xl p-5 hover:border-brand-lime transition-colors"
            >
              <Mail size={22} aria-hidden className="mb-2" />
              <p className="font-bold text-brand-black m-0">Email</p>
              <p className="text-sm text-neutral-500 m-0">info@hostelghar.com</p>
            </Link>
            <Link
              href="tel:+97711234567"
              className="bg-white border border-neutral-100 rounded-2xl p-5 hover:border-brand-lime transition-colors"
            >
              <Phone size={22} aria-hidden className="mb-2" />
              <p className="font-bold text-brand-black m-0">Phone</p>
              <p className="text-sm text-neutral-500 m-0">+977-1-1234567</p>
            </Link>
            <div className="bg-white border border-neutral-100 rounded-2xl p-5">
              <MapPin size={22} aria-hidden className="mb-2" />
              <p className="font-bold text-brand-black m-0">Office</p>
              <p className="text-sm text-neutral-500 m-0">Thamel, Kathmandu</p>
            </div>
          </div>
          <p className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
            <Clock3 size={15} aria-hidden /> Support hours: Sunday–Friday, 9:00–18:00 Nepal Time
            (UTC+5:45)
          </p>
          <h2 className="text-2xl font-extrabold text-brand-black mb-4">
            Quick answers before you write
          </h2>
          <FaqAccordion faqs={faqs} />
        </div>
        <Footer />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => ({ props: {} });
