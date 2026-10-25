import { useState, useMemo } from 'react';
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
import BookingModal from '@/components/booking/BookingModal';
import StarRating from '@/components/hostel/StarRating';
import { HOSTELS, getHostelBySlug, type Hostel, type DetailedFacility } from '@/data/hostels';
import { listHostels, getHostelById } from '@/lib/api/hostels';
import { useHostel } from '@/hooks/useHostels';
import { FAQS } from '@/data/faqs';
import { hostelJsonLd, faqJsonLd } from '@/lib/seo/jsonLd';
import {
  MapPin,
  Star,
  BadgeCheck,
  ArrowRight,
  Phone,
  BedDouble,
  Users,
  Tag,
  CheckCircle2,
  Wifi,
  Coffee,
  ShieldCheck,
  Zap,
  BookOpen,
  Sparkles,
} from 'lucide-react';

export default function HostelDetail({ hostel: initialHostel }: { hostel: Hostel }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Hook to call the hostel endpoint with Axios
  const {
    hostel: apiHostel,
    facilities: apiFacilities,
    loading: isHostelLoading,
  } = useHostel(initialHostel.id || initialHostel.slug);

  // Merge live API data with initial props
  const hostel = useMemo<Hostel>(() => {
    if (!apiHostel) return initialHostel;
    return {
      ...initialHostel,
      name: apiHostel.name || initialHostel.name,
      city: apiHostel.city || initialHostel.city,
      area: [apiHostel.address, apiHostel.city].filter(Boolean).join(', ') || initialHostel.area,
      phone: apiHostel.phone ?? initialHostel.phone,
      email: apiHostel.email ?? initialHostel.email,
      image: apiHostel.logoUrl || initialHostel.image,
      priceFrom: apiHostel.priceFrom || initialHostel.priceFrom,
      monthlyPrice:
        apiHostel.monthlyRent ??
        apiHostel.hostelFee ??
        apiHostel.monthlyPrice ??
        initialHostel.monthlyPrice,
      totalBeds: apiHostel.totalBeds ?? apiHostel.beds?.total ?? initialHostel.totalBeds,
      availableBeds:
        apiHostel.availableBeds ?? apiHostel.beds?.available ?? initialHostel.availableBeds,
      occupiedBeds:
        apiHostel.occupiedBeds ?? apiHostel.beds?.occupied ?? initialHostel.occupiedBeds,
      totalStudents:
        apiHostel.totalStudents ?? apiHostel.activeResidents ?? initialHostel.totalStudents,
      roomType: apiHostel.type
        ? `${apiHostel.type.charAt(0).toUpperCase() + apiHostel.type.slice(1).toLowerCase()} Hostel`
        : initialHostel.roomType,
      owner: (apiHostel.owner as any) ?? initialHostel.owner,
    };
  }, [apiHostel, initialHostel]);

  // Merge facilities fetched via Axios hook
  const facilities = useMemo<DetailedFacility[]>(() => {
    if (apiFacilities && apiFacilities.length > 0) {
      return apiFacilities.map((f) => ({
        id: f.id,
        title: f.title,
        description: f.description || 'Verified on-site hostel amenity',
        tag: f.tag || 'Included',
      }));
    }
    return initialHostel.detailedFacilities || [];
  }, [apiFacilities, initialHostel.detailedFacilities]);

  const faqs = FAQS.filter((f) => ['cancellation', 'payment-methods'].includes(f.id));
  const isExternal = hostel.image.startsWith('http://') || hostel.image.startsWith('https://');

  const getFacilityIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('wifi') || t.includes('internet'))
      return <Wifi size={18} className="text-blue-500" />;
    if (t.includes('meal') || t.includes('food') || t.includes('breakfast'))
      return <Coffee size={18} className="text-amber-500" />;
    if (t.includes('cctv') || t.includes('security') || t.includes('guard'))
      return <ShieldCheck size={18} className="text-emerald-500" />;
    if (
      t.includes('power') ||
      t.includes('backup') ||
      t.includes('inverter') ||
      t.includes('electric')
    )
      return <Zap size={18} className="text-yellow-500" />;
    if (t.includes('study') || t.includes('desk') || t.includes('silent'))
      return <BookOpen size={18} className="text-purple-500" />;
    return <Sparkles size={18} className="text-brand-black" />;
  };

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Hostels', path: '/hostels' },
              { label: hostel.name, path: `/hostel/${hostel.slug}` },
            ]}
          />

          <div className="grid lg:grid-cols-12 gap-10 items-start mt-4">
            {/* Left Image & Visuals (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                <Image
                  src={hostel.image}
                  alt={`${hostel.name}, ${hostel.area}`}
                  fill
                  unoptimized={isExternal}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-lime text-brand-black text-xs font-bold shadow-sm">
                    <BadgeCheck size={14} aria-hidden /> Physically Verified
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-brand-black/85 text-white text-xs font-semibold backdrop-blur-sm">
                    {hostel.roomType}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-emerald-800 text-xs font-extrabold flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {hostel.availableBeds} Beds Free
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-neutral-800 text-xs font-bold shadow-sm">
                    {hostel.totalStudents} Active Students
                  </span>
                </div>
              </div>

              {/* Key Overview Highlights */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 text-center">
                <div className="p-2">
                  <div className="w-8 h-8 mx-auto mb-1 rounded-lg bg-brand-lime/30 flex items-center justify-center text-brand-black">
                    <Tag size={16} />
                  </div>
                  <p className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider">
                    Monthly Rent
                  </p>
                  <p className="text-base font-extrabold text-neutral-900">
                    Rs. {hostel.monthlyPrice.toLocaleString()}
                  </p>
                </div>
                <div className="p-2 border-x border-neutral-200">
                  <div className="w-8 h-8 mx-auto mb-1 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <BedDouble size={16} />
                  </div>
                  <p className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider">
                    Beds Available
                  </p>
                  <p className="text-base font-extrabold text-emerald-600">
                    {hostel.availableBeds} / {hostel.totalBeds}
                  </p>
                </div>
                <div className="p-2">
                  <div className="w-8 h-8 mx-auto mb-1 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
                    <Users size={16} />
                  </div>
                  <p className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider">
                    Total Students
                  </p>
                  <p className="text-base font-extrabold text-purple-900">{hostel.totalStudents}</p>
                </div>
              </div>
            </div>

            {/* Right Information & Booking Panel (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <p className="flex items-center gap-1.5 text-sm font-semibold text-neutral-500 mb-1.5">
                  <MapPin size={15} aria-hidden className="text-brand-black" /> {hostel.area}
                </p>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight mb-3">
                  {hostel.name}
                </h1>

                {/* Interactive Star Rating with Add-A-Star feature */}
                <div className="mb-4">
                  <StarRating
                    hostelId={hostel.id || hostel.slug}
                    initialRating={hostel.rating}
                    initialReviews={hostel.reviews}
                    size={20}
                    showDetails={true}
                  />
                </div>
              </div>

              {/* Price Display Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100/70 border border-neutral-200">
                <div className="flex items-baseline justify-between mb-1">
                  <div>
                    <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider">
                      Standard Monthly Fee
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-3xl sm:text-4xl font-extrabold text-brand-black">
                        NPR {hostel.monthlyPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-neutral-500 font-semibold">/ month</span>
                    </div>
                  </div>
                  {hostel.originalMonthlyPrice && (
                    <span className="text-sm font-semibold text-neutral-400 line-through">
                      NPR {hostel.originalMonthlyPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-600 mt-2">
                  *Includes 4 daily meals, electricity, Wi-Fi & water. Nightly stay from NPR{' '}
                  {hostel.priceFrom.toLocaleString()}/night.
                </p>
              </div>

              {/* Primary Call-to-Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-lime text-brand-black font-extrabold rounded-xl hover:bg-brand-lime/85 transition-all shadow-md hover:shadow-lime cursor-pointer text-base"
                >
                  Book this hostel <ArrowRight size={18} aria-hidden />
                </button>
                <a
                  href={`tel:${hostel.phone || '+9779817161246'}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-black text-white font-semibold rounded-xl hover:bg-brand-black/85 transition-colors text-base"
                >
                  <Phone size={17} aria-hidden /> Call {hostel.phone || 'Hostel'}
                </a>
              </div>

              {/* Verified Property Owner Card */}
              {hostel.owner && (
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center gap-4">
                  {hostel.owner.avatarUrl ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-lime flex-shrink-0">
                      <Image
                        src={hostel.owner.avatarUrl}
                        alt={`${hostel.owner.firstName || ''} ${hostel.owner.lastName || ''}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <div>
                    <p className="text-xs text-neutral-500 font-medium">Verified Property Owner</p>
                    <p className="text-sm font-bold text-brand-black">
                      {[hostel.owner.firstName, hostel.owner.lastName].filter(Boolean).join(' ')}
                    </p>
                    {hostel.owner.phone && (
                      <p className="text-xs text-neutral-500 font-medium">{hostel.owner.phone}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section: Facilities & Amenities */}
          <section className="mt-14 pt-10 border-t border-neutral-100">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight">
                  Facilities & Amenities
                </h2>
                <p className="text-sm text-neutral-500 mt-1">
                  Everything provided at {hostel.name} for comfortable student living.
                </p>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                ✓ All Essential Amenities Included
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {facilities.map((facility, idx) => (
                <div
                  key={facility.id || idx}
                  className="p-4 rounded-2xl bg-white border border-neutral-200/80 hover:border-brand-lime/80 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center">
                      {getFacilityIcon(facility.title)}
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        facility.tag === 'Optional'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {facility.tag || 'Included'}
                    </span>
                  </div>
                  <h3 className="font-bold text-neutral-900 text-sm mb-1">{facility.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{facility.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: About Hostel */}
          <section className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-extrabold text-brand-black tracking-tight mb-3">
              About {hostel.name}
            </h2>
            <p className="text-neutral-600 leading-relaxed text-[16px]">{hostel.description}</p>
          </section>

          {/* Section: Direct Answer & FAQ */}
          <div className="mt-10 max-w-3xl">
            <DirectAnswer
              question={`How much does ${hostel.name} cost and what are the bed details?`}
              answer={`${hostel.name} in ${hostel.area} offers monthly packages from NPR ${hostel.monthlyPrice.toLocaleString()}/month and nightly stays at NPR ${hostel.priceFrom.toLocaleString()}/night. There are currently ${hostel.availableBeds} beds available out of ${hostel.totalBeds} total beds, with ${hostel.totalStudents} active students residing. Rated ${hostel.rating}/5 from verified stays.`}
            />
          </div>

          <section className="mt-10 max-w-3xl">
            <h2 className="text-2xl font-extrabold text-brand-black tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <FaqAccordion faqs={faqs} />
          </section>
        </div>

        {/* Sticky Mobile Booking Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-neutral-200 z-40 flex items-center justify-between gap-3 shadow-lg">
          <div>
            <p className="text-[11px] text-neutral-500">Monthly Rent</p>
            <p className="text-base font-extrabold text-brand-black">
              NPR {hostel.monthlyPrice.toLocaleString()}
              <span className="text-xs font-normal text-neutral-500">/mo</span>
            </p>
          </div>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="px-6 py-2.5 bg-brand-lime text-brand-black font-extrabold rounded-xl text-sm shadow hover:bg-brand-lime/85"
          >
            Book Now
          </button>
        </div>

        <Footer />

        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          hostelId={hostel.id || hostel.slug}
          hostelName={hostel.name}
          monthlyPrice={hostel.monthlyPrice}
          priceFrom={hostel.priceFrom}
          availableBeds={hostel.availableBeds}
          totalBeds={hostel.totalBeds}
          location={hostel.area}
        />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await listHostels({ limit: 50 });
    if (res?.data && res.data.length > 0) {
      const paths = res.data.map((h) => ({ params: { slug: h.id } }));
      return { paths, fallback: 'blocking' };
    }
  } catch {
    // API not reachable during static build; fall back to known static slugs
  }
  return {
    paths: HOSTELS.map((h) => ({ params: { slug: h.slug } })),
    fallback: 'blocking',
  };
};

function sanitizeForJson<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = String(params?.slug);
  const staticHostel = getHostelBySlug(slug);

  // 1. Fetch from actual production backend API endpoint first
  try {
    const res = await getHostelById(slug);
    if (res?.data) {
      const data = res.data;
      const apiHostel: Hostel = {
        id: data.id,
        slug: data.id,
        name: staticHostel?.name || data.name,
        city: data.city || staticHostel?.city || 'Kathmandu',
        area:
          [data.address, data.city].filter(Boolean).join(', ') ||
          staticHostel?.area ||
          'Banasthali-16, Kathmandu',
        priceFrom: data.priceFrom || staticHostel?.priceFrom || 1100,
        monthlyPrice:
          data.monthlyRent ??
          data.hostelFee ??
          data.monthlyPrice ??
          staticHostel?.monthlyPrice ??
          11000,
        originalPrice: staticHostel?.originalPrice ?? 1400,
        originalMonthlyPrice: staticHostel?.originalMonthlyPrice ?? 13000,
        totalBeds: data.totalBeds ?? data.beds?.total ?? staticHostel?.totalBeds ?? 36,
        availableBeds:
          data.availableBeds ?? data.beds?.available ?? staticHostel?.availableBeds ?? 6,
        occupiedBeds: data.occupiedBeds ?? data.beds?.occupied ?? staticHostel?.occupiedBeds ?? 30,
        totalStudents:
          data.totalStudents ?? data.activeResidents ?? staticHostel?.totalStudents ?? 30,
        rating: staticHostel?.rating ?? 4.8,
        reviews: staticHostel?.reviews ?? 0,
        roomType: data.type
          ? `${data.type.charAt(0).toUpperCase() + data.type.slice(1).toLowerCase()} Hostel`
          : staticHostel?.roomType || 'Boys Hostel',
        amenities: staticHostel?.amenities || ['wifi', 'breakfast', 'powerbackup', 'laundry'],
        detailedFacilities:
          data.hostelFacilities && data.hostelFacilities.length > 0
            ? data.hostelFacilities.map((hf) => ({
                id: hf.id,
                title: hf.facility?.title || hf.facility?.name || 'Verified Amenity',
                description: hf.description || 'Verified facility for hostel residents',
                tag: hf.tag || 'Included',
              }))
            : staticHostel?.detailedFacilities || [
                {
                  title: 'High-Speed Wi-Fi',
                  description: 'Fast internet across all rooms',
                  tag: 'Included',
                },
                {
                  title: 'Nutritious Meals',
                  description: 'Daily fresh meals and breakfast',
                  tag: 'Included',
                },
                {
                  title: '24/7 Hot Water',
                  description: 'Solar & electric heated water',
                  tag: 'Included',
                },
              ],
        image: data.logoUrl || staticHostel?.image || '/images/static/hostel.jpg',
        description:
          staticHostel?.description ||
          `${data.name} is a verified hostel located in ${data.address || data.city}. Contact phone: ${data.phone || 'N/A'}.`,
        ...(staticHostel?.latitude !== undefined ? { latitude: staticHostel.latitude } : {}),
        ...(staticHostel?.longitude !== undefined ? { longitude: staticHostel.longitude } : {}),
        ...(data.createdAt || staticHostel?.createdAt
          ? { createdAt: data.createdAt || staticHostel?.createdAt }
          : {}),
        ...(staticHostel?.aliasSlugs ? { aliasSlugs: staticHostel.aliasSlugs } : {}),
        phone: data.phone || staticHostel?.phone || null,
        email: data.email || staticHostel?.email || null,
        isActive: data.isActive ?? true,
        owner: (data.owner as any) || staticHostel?.owner || null,
      };
      return { props: { hostel: sanitizeForJson(apiHostel) }, revalidate: 60 };
    }
  } catch {
    // If not found in API or API request times out, fall through to static catalog
  }

  // 2. Fallback to static catalog if API is offline
  if (staticHostel) {
    return { props: { hostel: sanitizeForJson(staticHostel) }, revalidate: 60 };
  }

  return { notFound: true };
};
