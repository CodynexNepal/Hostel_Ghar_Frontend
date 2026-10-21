import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import Seo from '@/components/seo/Seo';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import DirectAnswer from '@/components/aeo/DirectAnswer';
import FaqAccordion from '@/components/aeo/FaqAccordion';
import { HOSTELS, getHostelBySlug, type Hostel } from '@/data/hostels';
import { getHostelById } from '@/lib/api/hostels';
import { FAQS } from '@/data/faqs';
import { hostelJsonLd, faqJsonLd } from '@/lib/seo/jsonLd';
import { MapPin, Star, BadgeCheck, ArrowRight, Phone } from 'lucide-react';

export default function HostelDetail({ hostel }: { hostel: Hostel }) {
  const faqs = FAQS.filter((f) => ['cancellation', 'payment-methods'].includes(f.id));
  const isExternal = hostel.image.startsWith('http://') || hostel.image.startsWith('https://');

  return (
    <>
      <Seo
        title={`${hostel.name} — ${hostel.roomType} in ${hostel.city}`}
        description={`${hostel.description} Rated ${hostel.rating}/5 from ${hostel.reviews} verified reviews. Book ${hostel.name}, ${hostel.area} on Hostel Ghar.`}
        path={`/hostel/${hostel.slug}`}
        image={hostel.image}
      />
      <JsonLd
        data={[
          hostelJsonLd({
            slug: hostel.slug,
            name: hostel.name,
            description: hostel.description,
            image: hostel.image,
            priceFrom: hostel.priceFrom,
            rating: hostel.rating,
            reviewCount: hostel.reviews,
            addressLocality: hostel.city,
          }),
          faqJsonLd(faqs.map((f) => ({ question: f.question, answer: f.answer }))),
        ]}
        id="ld-hostel"
      />
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Hostels', path: '/hostels' },
              { label: hostel.name, path: `/hostel/${hostel.slug}` },
            ]}
          />
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-100">
              <Image
                src={hostel.image}
                alt={`${hostel.name}, ${hostel.area}`}
                fill
                unoptimized={isExternal}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-brand-lime text-brand-black text-xs font-bold">
                <BadgeCheck size={14} aria-hidden /> Verified
              </span>
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-neutral-500 mb-2">
                <MapPin size={15} aria-hidden /> {hostel.area}
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight mb-3">
                {hostel.name}
              </h1>
              <p className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-black text-white text-sm font-bold">
                  <Star size={14} aria-hidden fill="#B9FF66" stroke="#B9FF66" /> {hostel.rating}
                </span>
                <span className="text-sm text-neutral-500 font-medium">
                  {hostel.reviews} reviews · {hostel.roomType}
                </span>
              </p>
              <DirectAnswer
                question={`How much does ${hostel.name} cost?`}
                answer={`${hostel.roomType}s at ${hostel.name}, ${hostel.area} start at NPR ${hostel.priceFrom}/night. Rated ${hostel.rating}/5 from ${hostel.reviews} verified stays. Free cancellation on most bookings.`}
              />
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-extrabold text-brand-black">
                  NPR {hostel.priceFrom.toLocaleString()}
                </span>
                <span className="text-neutral-500 font-medium">/ night</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/hostels"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-lime text-brand-black font-bold rounded-xl hover:bg-brand-lime/85 transition-colors"
                >
                  Book this hostel <ArrowRight size={17} aria-hidden />
                </Link>
                <a
                  href="tel:+97711234567"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-black text-white font-semibold rounded-xl hover:bg-brand-black/85 transition-colors"
                >
                  <Phone size={17} aria-hidden /> Call hostel
                </a>
              </div>
            </div>
          </div>
          <section className="mt-12 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight mb-3">
              About {hostel.name}
            </h2>
            <p className="text-neutral-600 leading-relaxed text-[17px]">{hostel.description}</p>
          </section>
          <section className="mt-8 max-w-3xl">
            <h2 className="text-2xl font-extrabold text-brand-black tracking-tight mb-4">
              Common questions
            </h2>
            <FaqAccordion faqs={faqs} />
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: HOSTELS.map((h) => ({ params: { slug: h.slug } })),
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = String(params?.slug);
  const staticHostel = getHostelBySlug(slug);
  if (staticHostel) {
    return { props: { hostel: staticHostel } };
  }

  // Attempt to fetch from API by ID
  try {
    const res = await getHostelById(slug);
    if (res?.data) {
      const data = res.data;
      const apiHostel: Hostel = {
        slug: data.id,
        name: data.name,
        city: data.city || 'Kathmandu',
        area: [data.address, data.city].filter(Boolean).join(', ') || 'Nepal',
        priceFrom: 1200,
        originalPrice: null,
        rating: 4.8,
        reviews: 0,
        roomType: data.type ? `${data.type.charAt(0).toUpperCase() + data.type.slice(1).toLowerCase()} Hostel` : 'Hostel',
        amenities:
          (data.hostelFacilities?.map((f) => f.facility?.name).filter(Boolean) as string[]) || [
            'Free WiFi',
          ],
        image: data.logoUrl || '/images/static/hostel.jpg',
        description: `${data.name} is a verified hostel located in ${data.address || data.city}. Contact phone: ${data.phone || 'N/A'}.`,
      };
      return { props: { hostel: apiHostel }, revalidate: 60 };
    }
  } catch {
    // If not found in API, falls through to notFound
  }

  return { notFound: true };
};
