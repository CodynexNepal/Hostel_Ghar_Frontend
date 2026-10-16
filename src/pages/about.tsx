import type { GetStaticProps } from 'next';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import Seo from '@/components/seo/Seo';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import DirectAnswer from '@/components/aeo/DirectAnswer';
import TrustSignals from '@/components/geo/TrustSignals';
import AuthorCard from '@/components/geo/AuthorCard';
import { getPageMeta } from '@/lib/seo/metadata';

export default function AboutPage() {
  const meta = getPageMeta('/about');
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/about" keywords={meta.keywords} />
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'About', path: '/about' }]} />
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight mb-4">
            Safe, affordable beds for every traveler in Nepal
          </h1>
          <DirectAnswer
            question="What is Hostel Ghar?"
            answer="Hostel Ghar is Nepal's hostel booking platform: 500+ physically verified hostels across 50+ cities, 10,000+ traveler reviews, free browsing and instant booking. Founded in Kathmandu in 2023, we also give owners free fee-tracking and booking tools."
          />
          <TrustSignals />
          <section className="mt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight mb-3">How we verify every hostel</h2>
            <p className="text-neutral-600 leading-relaxed text-[17px]">
              Only about 60% of applicants earn the Verified badge. Our Kathmandu team checks real
              photos, working WiFi and water, correct map pins and legal registration — then
              re-audits every 6 months. Travelers can report mismatches; we re-check within 72 hours.
            </p>
          </section>
          <section className="mt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight mb-3">What travelers say</h2>
            <p className="text-neutral-600 leading-relaxed text-[17px]">
              4.8/5 average across 10,000+ verified stays. Backpackers praise instant confirmation;
              students praise monthly tariffs from NPR 8,000; owners report ~15 hours saved monthly
              on fee automation. Read unedited reviews on every hostel page.
            </p>
          </section>
          <AuthorCard author={{ name: 'Hostel Ghar Team', role: 'Kathmandu, Nepal — 12 full-time staff', bio: 'We are travelers, hostelers and engineers. Half the team lived in hostels through university — we built the platform we wished existed.', location: 'Thamel, Kathmandu' }} />
        </div>
        <Footer />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => ({ props: {} });
