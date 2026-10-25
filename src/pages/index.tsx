import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import Seo from '@/components/seo/Seo';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FaqAccordion from '@/components/aeo/FaqAccordion';
import DirectAnswer from '@/components/aeo/DirectAnswer';
import HowTo from '@/components/aeo/HowTo';
import TrustSignals from '@/components/geo/TrustSignals';
import { FAQS } from '@/data/faqs';
import { faqJsonLd, breadcrumbJsonLd, howToJsonLd } from '@/lib/seo/jsonLd';
import { getPageMeta } from '@/lib/seo/metadata';
import Services from '@/components/sections/Services';
import CaseStudies from '@/components/sections/CaseStudies';
import WorkingProcess from '@/components/sections/WorkingProcess';
import Team from '@/components/sections/Team';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import { Section, CTAButton } from '@/components/ui/Section';

const HOME_FAQS = FAQS.filter((f) =>
  ['cost-per-night', 'is-hostel-ghar-free', 'how-to-book', 'safe-for-solo-female'].includes(f.id)
);

export default function Home() {
  const meta = getPageMeta('/');
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/" keywords={meta.keywords} />
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: 'Home', path: '/' }]),
          faqJsonLd(HOME_FAQS.map((f) => ({ question: f.question, answer: f.answer }))),
          howToJsonLd({
            path: '/',
            name: 'How to book a hostel on Hostel Ghar',
            description: 'Book a verified hostel in Nepal in under 2 minutes.',
            steps: [
              {
                name: 'Search by city',
                text: 'Enter Kathmandu, Pokhara, Chitwan or any of 50+ cities and pick your dates.',
              },
              {
                name: 'Compare verified stays',
                text: 'Filter by price (NPR 600+), dorm or private room, amenities and real traveler reviews.',
              },
              {
                name: 'Confirm instantly',
                text: 'One-click booking with instant SMS + email confirmation. Pay at the property on most listings.',
              },
            ],
          }),
        ]}
        id="ld-home"
      />

      <main className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <Section
          tone="tint"
          spacing="lg"
          className="relative overflow-hidden pt-16 md:pt-24 pb-14 md:pb-20"
        >
          <div className="max-w-4xl mx-auto text-center space-y-7 animate-slide-up">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-lime/25 text-brand-black text-sm font-bold tracking-tight shadow-sm border border-brand-lime/40">
                 #1 Hostel Booking Platform in Nepal
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-black leading-[1.15] tracking-tight">
              Find Your Perfect{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Hostel</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-brand-lime/50 -z-0 rounded-sm"></span>
              </span>{' '}
              Away From Home
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Discover affordable, comfortable, and safe hostels across Nepal. Whether you&apos;re a
              backpacker, student, or digital nomad, we&apos;ve got the perfect place for you.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <CTAButton href="/hostels" variant="dark" arrow="right">
                Explore Hostels
              </CTAButton>
              <CTAButton href="/list-hostel" variant="lime">
                List Your Hostel
              </CTAButton>
            </div>

            <div className="flex items-center justify-center gap-6 sm:gap-12 pt-6">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-brand-black">500+</p>
                <p className="text-sm text-neutral-500 font-medium">Hostels Listed</p>
              </div>
              <div className="h-10 w-px bg-neutral-200"></div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-brand-black">10K+</p>
                <p className="text-sm text-neutral-500 font-medium">Happy Travelers</p>
              </div>
              <div className="h-10 w-px bg-neutral-200"></div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-brand-black">50+</p>
                <p className="text-sm text-neutral-500 font-medium">Cities Covered</p>
              </div>
            </div>
          </div>
        </Section>

        <Services />
        <CaseStudies />
        <WorkingProcess />
        <Team />
        <Testimonials />
        <Contact />

        <Footer />
      </main>
    </>
  );
}
