import { useState, useMemo, useEffect } from 'react';
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
  AlertCircle,
  Navigation,
  ExternalLink,
  Clock,
  Utensils,
  Calendar,
  Globe,
  Sun,
  Moon,
  Loader2,
} from 'lucide-react';
import {
  type DayOfWeek,
  type HostelMeal,
  type DailyMealSlot,
  getHostelDailyMeals,
} from '@/lib/api/hostels';

const WEEKDAY_NAMES: Array<{ key: DayOfWeek; name: string; nepali: string }> = [
  { key: 'SUNDAY', name: 'Sunday', nepali: 'आइतबार' },
  { key: 'MONDAY', name: 'Monday', nepali: 'सोमबार' },
  { key: 'TUESDAY', name: 'Tuesday', nepali: 'मंगलबार' },
  { key: 'WEDNESDAY', name: 'Wednesday', nepali: 'बुधबार' },
  { key: 'THURSDAY', name: 'Thursday', nepali: 'बिहीबार' },
  { key: 'FRIDAY', name: 'Friday', nepali: 'शुक्रबार' },
  { key: 'SATURDAY', name: 'Saturday', nepali: 'शनिबार' },
];

export interface DayMealPlan {
  dayKey: DayOfWeek;
  name: string;
  nepali: string;
  breakfast: {
    time: string;
    description: string;
    notes?: string;
  };
  lunch: {
    time: string;
    description: string;
    notes?: string;
  };
  snack: {
    time: string;
    description: string;
    notes?: string;
  };
  dinner: {
    time: string;
    description: string;
    notes?: string;
  };
}

const DEFAULT_WEEKLY_4_MEALS: Record<DayOfWeek, DayMealPlan> = {
  SUNDAY: {
    dayKey: 'SUNDAY',
    name: 'Sunday',
    nepali: 'आइतबार',
    breakfast: {
      time: '7:00 AM – 8:00 AM',
      description: 'Milk Tea, Boiled Eggs, Toast with Jam, or Bread & Butter',
      notes: 'Freshly brewed milk tea & butter toast',
    },
    lunch: {
      time: '12:00 PM – 1:30 PM',
      description: 'Steamed Rice, Lentils (Dal), Seasonal Curry, Papad, and Fresh Pickle',
      notes: 'Unlimited rice & dal refill for residents',
    },
    snack: {
      time: '4:00 PM – 5:00 PM',
      description: 'Chowmein, Samosa, or Biscuits served with Hot Tea',
      notes: 'Evening Khaja refreshment',
    },
    dinner: {
      time: '7:30 PM – 9:00 PM',
      description: 'Steamed Rice, Yellow Dal, Chicken / Paneer Curry, and Seasonal Green Saag',
      notes: 'Non-veg & Veg options cooked separately',
    },
  },
  MONDAY: {
    dayKey: 'MONDAY',
    name: 'Monday',
    nepali: 'सोमबार',
    breakfast: {
      time: '7:00 AM – 8:00 AM',
      description: 'Milk Tea / Black Coffee, Aloo Paratha with Curd (Dahi) & Mint Pickle',
      notes: 'Hot stuffed potato parathas',
    },
    lunch: {
      time: '12:00 PM – 1:30 PM',
      description:
        'Steamed Rice, Black Lentil (Masyang/Maas Dal), Seasonal Aloo-Gobi Curry, Papad & Fresh Chutney',
      notes: 'Traditional Nepali Thakali-style dal bhat',
    },
    snack: {
      time: '4:00 PM – 5:00 PM',
      description: 'Fresh Fried Samosa with Tangy Tomato Chutney and Spiced Milk Tea',
      notes: 'Freshly fried crispy samosas',
    },
    dinner: {
      time: '7:30 PM – 9:00 PM',
      description:
        'Steamed Rice, Rahar Dal, Egg Curry / Mushroom Masala, and Fresh Green Rayo Saag',
      notes: 'Nutritious green vegetables daily',
    },
  },
  TUESDAY: {
    dayKey: 'TUESDAY',
    name: 'Tuesday',
    nepali: 'मंगलबार',
    breakfast: {
      time: '7:00 AM – 8:00 AM',
      description: 'Milk Tea, Veg Poha (Flattened Rice) with Peanuts & Boiled Chickpeas (Chana)',
      notes: 'Protein-packed morning meal',
    },
    lunch: {
      time: '12:00 PM – 1:30 PM',
      description:
        'Steamed Rice, Musuro Dal, Aloo Bodi Tama (Bamboo Shoot Curry), Papad & Gundruk Achar',
      notes: 'Authentic Nepali Bodi Tama flavor',
    },
    snack: {
      time: '4:00 PM – 5:00 PM',
      description: 'Crispy Vegetable Pakoda with Fresh Mint Chutney & Cardamom Tea',
      notes: 'Hot crunchy evening pakodas',
    },
    dinner: {
      time: '7:30 PM – 9:00 PM',
      description:
        'Steamed Rice, Yellow Dal, Chicken Curry / Paneer Mattar, and Fried Bitter Gourd (Karela)',
      notes: 'Delicious gravy with steamed rice',
    },
  },
  WEDNESDAY: {
    dayKey: 'WEDNESDAY',
    name: 'Wednesday',
    nepali: 'बुधबार',
    breakfast: {
      time: '7:00 AM – 8:00 AM',
      description: 'Milk Tea, French Toast or Bread Omelette, Seasonal Fruit / Banana',
      notes: 'Toast prepared to order',
    },
    lunch: {
      time: '12:00 PM – 1:30 PM',
      description:
        'Steamed Rice, Kalo Dal, Cauliflower & Green Peas Curry, Papad, Fresh Lapsi Pickle',
      notes: 'Balanced wholesome lunch',
    },
    snack: {
      time: '4:00 PM – 5:00 PM',
      description: 'Spicy Veg Chowmein / Veg Thukpa with Hot Milk Tea',
      notes: 'Freshly tossed noodles',
    },
    dinner: {
      time: '7:30 PM – 9:00 PM',
      description: 'Steamed Rice, Moong Dal, Fish Gravy / Tofu Curry, and Seasonal Green Saag',
      notes: 'Choice of fresh fish or tofu',
    },
  },
  THURSDAY: {
    dayKey: 'THURSDAY',
    name: 'Thursday',
    nepali: 'बिहीबार',
    breakfast: {
      time: '7:00 AM – 8:00 AM',
      description: 'Milk Tea, Soft Puris with Spiced Potato Curry (Aloo Tarkari)',
      notes: 'Popular hot breakfast combo',
    },
    lunch: {
      time: '12:00 PM – 1:30 PM',
      description:
        'Steamed Rice, Mixed Panchratna Dal, Bhindi (Okra) Fry, Fresh Cucumber Salad & Curd',
      notes: 'Refreshing cooling lunch',
    },
    snack: {
      time: '4:00 PM – 5:00 PM',
      description: 'Steamed Vegetable Momos (6 pcs) with Spicy Sesame Tomato Sauce & Black Tea',
      notes: 'Student favorite momo afternoon',
    },
    dinner: {
      time: '7:30 PM – 9:00 PM',
      description: 'Steamed Rice, Yellow Dal Tadka, Chicken Masala / Rajma Curry, and Mustard Saag',
      notes: 'Hearty evening dinner',
    },
  },
  FRIDAY: {
    dayKey: 'FRIDAY',
    name: 'Friday',
    nepali: 'शुक्रबार',
    breakfast: {
      time: '7:00 AM – 8:00 AM',
      description: 'Milk Tea, Oatmeal Porridge with Honey / Hard Boiled Eggs & Toasted Bread',
      notes: 'Healthy balanced start',
    },
    lunch: {
      time: '12:00 PM – 1:30 PM',
      description: 'Steamed Rice, Rahar Dal, Aloo Dum, Crispy Papad & Spicy Mango Pickle',
      notes: 'Delicious rich gravy',
    },
    snack: {
      time: '4:00 PM – 5:00 PM',
      description: 'Crunchy Chana Chatpate / Biscuits served with Spiced Milk Tea',
      notes: 'Tangy zesty Nepali snack',
    },
    dinner: {
      time: '7:30 PM – 9:00 PM',
      description:
        'Special Friday Feast: Steamed Basmati Rice, Rich Dal, Butter Chicken / Paneer Butter Masala, Fresh Salad & Kheer Dessert',
      notes: 'Weekly Friday special sweet dish',
    },
  },
  SATURDAY: {
    dayKey: 'SATURDAY',
    name: 'Saturday',
    nepali: 'शनिबार',
    breakfast: {
      time: '8:00 AM – 9:30 AM',
      description:
        'Special Weekend Breakfast: Milk Tea, Aloo Paratha with Butter, Boiled Eggs & Toast with Jam',
      notes: 'Relaxed extended weekend breakfast window',
    },
    lunch: {
      time: '12:30 PM – 2:00 PM',
      description: 'Steamed Rice, Yellow Lentil (Dal), Seasonal Mix Tarkari, Papad & Lemon Pickle',
      notes: 'Weekend relaxed lunch schedule',
    },
    snack: {
      time: '4:00 PM – 5:00 PM',
      description: 'Vegetable Chowmein or Crispy Samosa with Hot Ginger Tea',
      notes: 'Freshly prepared evening snack',
    },
    dinner: {
      time: '7:30 PM – 9:00 PM',
      description:
        'Steamed Rice, Yellow Dal, Egg Curry / Fresh Paneer Curry, and Seasonal Green Saag',
      notes: 'Comforting home-style weekend dinner',
    },
  },
};

export default function HostelDetail({ hostel: initialHostel }: { hostel: Hostel }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedMealDay, setSelectedMealDay] = useState<DayOfWeek>('SUNDAY');
  const [dayScheduleMap, setDayScheduleMap] = useState<Record<string, DailyMealSlot[]>>({});
  const [isDayScheduleLoading, setIsDayScheduleLoading] = useState(false);

  // Hook to call the hostel endpoint with Axios
  const {
    hostel: apiHostel,
    facilities: apiFacilities,
    meals: apiMeals,
    hasMeals: apiHasMeals,
    dailyMeals: apiDailyMeals,
    hasDailyMeals: apiHasDailyMeals,
    configuredDays: apiConfiguredDays,
    location: apiLocation,
    loading: isHostelLoading,
    error: apiError,
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
        apiHostel.monthlyRent ||
        apiHostel.hostelFee ||
        apiHostel.monthlyPrice ||
        initialHostel.monthlyPrice ||
        0,
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
      latitude: apiHostel.latitude !== undefined ? apiHostel.latitude : initialHostel.latitude,
      longitude: apiHostel.longitude !== undefined ? apiHostel.longitude : initialHostel.longitude,
      isLocationShared:
        apiHostel.isLocationShared !== undefined
          ? apiHostel.isLocationShared
          : initialHostel.isLocationShared,
      meals: apiHostel.meals || initialHostel.meals,
      dailyMeals:
        apiDailyMeals && apiDailyMeals.length > 0 ? apiDailyMeals : initialHostel.dailyMeals,
      owner: (apiHostel.owner as any) ?? initialHostel.owner,
    };
  }, [apiHostel, apiDailyMeals, initialHostel]);

  // Fetch real day-specific meal schedule from backend when day tab changes
  useEffect(() => {
    const hostelId = hostel.id || initialHostel.id;
    if (!hostelId) return;

    let isCancelled = false;
    const loadDaySchedule = async () => {
      try {
        setIsDayScheduleLoading(true);
        const res = await getHostelDailyMeals(hostelId, selectedMealDay);
        if (!isCancelled && res.success && res.data?.schedule && res.data.schedule.length > 0) {
          setDayScheduleMap((prev) => ({
            ...prev,
            [selectedMealDay]: res.data.schedule,
          }));
        }
      } catch {
        // Fallback gracefully to day plan
      } finally {
        if (!isCancelled) {
          setIsDayScheduleLoading(false);
        }
      }
    };

    loadDaySchedule();
    return () => {
      isCancelled = true;
    };
  }, [selectedMealDay, hostel.id, initialHostel.id]);

  // Geographic location resolution: strictly hide coordinates if isLocationShared is not true
  const isLocationShared = Boolean(
    apiLocation?.isLocationShared ?? apiHostel?.isLocationShared ?? hostel.isLocationShared
  );
  const locationLat = isLocationShared
    ? apiLocation?.latitude ?? apiHostel?.latitude ?? hostel.latitude ?? null
    : null;
  const locationLng = isLocationShared
    ? apiLocation?.longitude ?? apiHostel?.longitude ?? hostel.longitude ?? null
    : null;
  const hasValidCoordinates =
    locationLat !== null && locationLng !== null && !isNaN(locationLat) && !isNaN(locationLng);

  // Meal schedule resolution
  const effectiveMeals = useMemo<HostelMeal[]>(() => {
    if (apiMeals && apiMeals.length > 0) return apiMeals;
    if (apiHostel?.meals && apiHostel.meals.length > 0) return apiHostel.meals;
    if (hostel.meals && hostel.meals.length > 0) return hostel.meals;
    return [];
  }, [apiMeals, apiHostel?.meals, hostel.meals]);

  const hasConfiguredMeals = useMemo(() => {
    return (
      apiHasMeals ||
      effectiveMeals.some(
        (m) =>
          (m.breakfastDescription && m.breakfastDescription.trim().length > 0) ||
          (m.mainMealDescription && m.mainMealDescription.trim().length > 0)
      )
    );
  }, [apiHasMeals, effectiveMeals]);

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

          {apiError && (
            <div className="mt-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-neutral-700 text-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <AlertCircle size={16} className="text-neutral-500 shrink-0" />
                <span>
                  Live availability may be temporarily delayed. Please contact the property directly
                  to confirm vacancy.
                </span>
              </div>
              <Link
                href="/contact"
                className="text-xs font-semibold text-brand-black hover:underline shrink-0"
              >
                Need Help?
              </Link>
            </div>
          )}

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
                      {hostel.monthlyPrice > 0 ? (
                        <>
                          <span className="text-3xl sm:text-4xl font-extrabold text-brand-black">
                            NPR {hostel.monthlyPrice.toLocaleString()}
                          </span>
                          <span className="text-sm text-neutral-500 font-semibold">/ month</span>
                        </>
                      ) : (
                        <span className="text-2xl sm:text-3xl font-extrabold text-brand-black">
                          Contact for price
                        </span>
                      )}
                    </div>
                  </div>
                  {hostel.originalMonthlyPrice && hostel.monthlyPrice > 0 && (
                    <span className="text-sm font-semibold text-neutral-400 line-through">
                      NPR {hostel.originalMonthlyPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-600 mt-2">
                  *Includes 4 daily meals, electricity, Wi-Fi & water.
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

          {/* Section: Meals & Menu (Daily Timetable + 7-Day Schedule) */}
          <section className="mt-14 pt-10 border-t border-neutral-100 space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1.5 rounded-lg bg-brand-lime/30 text-brand-black">
                    <Utensils size={18} />
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight">
                    Weekly Meals & 4-Time Diet Menu
                  </h2>
                </div>
                <p className="text-sm text-neutral-500">
                  Nutritious, hygienic 4 daily cooked meals prepared fresh daily for hostel
                  residents.
                </p>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-brand-lime/20 text-brand-black text-xs font-bold border border-brand-lime/40">
                4 Daily Meals Included
              </span>
            </div>

            {/* 7-Day Day-by-Day Meal Schedule Browser */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="text-base sm:text-lg font-extrabold text-brand-black flex items-center gap-2">
                    <Calendar size={18} className="text-brand-black" /> 7-Day Weekly Diet Menu
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Select any day below to inspect all 4 planned meal servings (Sunday through
                    Saturday)
                  </p>
                </div>
                <span className="text-xs font-semibold text-neutral-500 flex items-center gap-1.5">
                  {isDayScheduleLoading && (
                    <Loader2 size={13} className="animate-spin text-brand-black" />
                  )}
                  Showing menu for:{' '}
                  <strong className="text-brand-black">
                    {WEEKDAY_NAMES.find((w) => w.key === selectedMealDay)?.name}
                  </strong>
                </span>
              </div>

              {/* Weekday Selector Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-200/70">
                {WEEKDAY_NAMES.map((day) => {
                  const isSelected = selectedMealDay === day.key;
                  return (
                    <button
                      key={day.key}
                      type="button"
                      onClick={() => setSelectedMealDay(day.key)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-brand-black text-white shadow-sm'
                          : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/80'
                      }`}
                    >
                      <span>{day.name}</span>
                      <span className="text-[10px] opacity-75 font-normal">({day.nepali})</span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? 'bg-brand-lime' : 'bg-emerald-500'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* 4 Cards for Selected Day */}
              {(() => {
                const dayPlan = DEFAULT_WEEKLY_4_MEALS[selectedMealDay];
                const apiDayMeal = effectiveMeals.find((m) => m.dayOfWeek === selectedMealDay);
                const liveDaySlots = dayScheduleMap[selectedMealDay];
                const sortedDaySlots = liveDaySlots
                  ? [...liveDaySlots].sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
                  : null;

                const bSlot =
                  sortedDaySlots?.find((s) => s.orderIndex === 1) || sortedDaySlots?.[0];
                const lSlot =
                  sortedDaySlots?.find((s) => s.orderIndex === 2) || sortedDaySlots?.[1];
                const sSlot =
                  sortedDaySlots?.find((s) => s.orderIndex === 3) || sortedDaySlots?.[2];
                const dSlot =
                  sortedDaySlots?.find((s) => s.orderIndex === 4) || sortedDaySlots?.[3];

                // If backend has custom description for breakfast/main or daily slots, merge them
                const breakfastMenu =
                  bSlot?.menuDescription?.trim() ||
                  apiDayMeal?.breakfastDescription?.trim() ||
                  dayPlan.breakfast.description;
                const breakfastTime =
                  bSlot?.time?.trim() ||
                  apiDayMeal?.breakfastTime?.trim() ||
                  dayPlan.breakfast.time;
                const breakfastNotes =
                  bSlot?.mealNameEn?.trim() ||
                  apiDayMeal?.breakfastNotes?.trim() ||
                  dayPlan.breakfast.notes;

                const lunchMenu = lSlot?.menuDescription?.trim() || dayPlan.lunch.description;
                const lunchTime = lSlot?.time?.trim() || dayPlan.lunch.time;
                const lunchNotes = lSlot?.mealNameEn?.trim() || dayPlan.lunch.notes;

                const snackMenu = sSlot?.menuDescription?.trim() || dayPlan.snack.description;
                const snackTime = sSlot?.time?.trim() || dayPlan.snack.time;
                const snackNotes = sSlot?.mealNameEn?.trim() || dayPlan.snack.notes;

                const dinnerMenu =
                  dSlot?.menuDescription?.trim() ||
                  apiDayMeal?.mainMealDescription?.trim() ||
                  dayPlan.dinner.description;
                const dinnerTime =
                  dSlot?.time?.trim() || apiDayMeal?.mainMealTime?.trim() || dayPlan.dinner.time;
                const dinnerNotes =
                  dSlot?.mealNameEn?.trim() ||
                  apiDayMeal?.mainMealNotes?.trim() ||
                  dayPlan.dinner.notes;

                const dayMealsCards = [
                  {
                    order: 1,
                    name: 'Morning Breakfast',
                    type: 'Breakfast',
                    time: breakfastTime,
                    menu: breakfastMenu,
                    notes: breakfastNotes,
                    icon: <Coffee size={18} className="text-amber-600" />,
                    bg: 'bg-amber-50/50 border-amber-200/80',
                    badgeBg: 'bg-amber-100 text-amber-800',
                  },
                  {
                    order: 2,
                    name: 'Lunch',
                    type: 'Main Meal',
                    time: lunchTime,
                    menu: lunchMenu,
                    notes: lunchNotes,
                    icon: <Utensils size={18} className="text-emerald-600" />,
                    bg: 'bg-emerald-50/50 border-emerald-200/80',
                    badgeBg: 'bg-emerald-100 text-emerald-800',
                  },
                  {
                    order: 3,
                    name: 'Afternoon Snack',
                    type: 'Evening Khaja',
                    time: snackTime,
                    menu: snackMenu,
                    notes: snackNotes,
                    icon: <Sun size={18} className="text-orange-600" />,
                    bg: 'bg-orange-50/50 border-orange-200/80',
                    badgeBg: 'bg-orange-100 text-orange-800',
                  },
                  {
                    order: 4,
                    name: 'Dinner',
                    type: 'Evening Meal',
                    time: dinnerTime,
                    menu: dinnerMenu,
                    notes: dinnerNotes,
                    icon: <Moon size={18} className="text-indigo-600" />,
                    bg: 'bg-indigo-50/50 border-indigo-200/80',
                    badgeBg: 'bg-indigo-100 text-indigo-800',
                  },
                ];

                return (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {dayMealsCards.map((m) => (
                      <div
                        key={m.name}
                        className={`p-5 rounded-2xl bg-white border ${m.bg} shadow-xs hover:shadow-md transition-all flex flex-col justify-between`}
                      >
                        <div>
                          <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5 mb-2.5">
                            <div className="flex items-center gap-2">
                              <span className="p-1.5 rounded-lg bg-white border border-neutral-200/80 shadow-2xs">
                                {m.icon}
                              </span>
                              <div>
                                <h4 className="font-extrabold text-brand-black text-sm">
                                  {m.name}
                                </h4>
                                <p className="text-[11px] text-neutral-500 font-medium">{m.type}</p>
                              </div>
                            </div>
                          </div>
                          <div className="mb-2.5">
                            <span
                              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${m.badgeBg}`}
                            >
                              <Clock size={11} /> {m.time}
                            </span>
                          </div>
                          <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed font-medium">
                            {m.menu}
                          </p>
                        </div>
                        {m.notes && (
                          <p className="text-[11px] text-neutral-500 italic pt-2 mt-3 border-t border-neutral-100">
                            Note: {m.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </section>

          {/* Section: Hostel Location */}
          <section className="mt-14 pt-10 border-t border-neutral-100">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1.5 rounded-lg bg-brand-lime/30 text-brand-black">
                    <MapPin size={18} />
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight">
                    Hostel Location
                  </h2>
                </div>
                <p className="text-sm text-neutral-500">
                  {hostel.area
                    ? `Located at ${hostel.area}`
                    : `Verified location in ${hostel.city}`}
                </p>
              </div>

              {isLocationShared && hasValidCoordinates && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationLat!)},${encodeURIComponent(locationLng!)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-lime text-brand-black text-xs font-bold shadow-xs hover:bg-brand-lime/85 transition-all"
                >
                  <Navigation size={14} /> Get Directions <ExternalLink size={12} />
                </a>
              )}
            </div>

            {isLocationShared && hasValidCoordinates ? (
              <div className="space-y-4">
                {/* Interactive Map Preview */}
                <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden border border-neutral-200/90 shadow-sm bg-neutral-100">
                  <iframe
                    title={`${hostel.name} Location Map`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(locationLng! - 0.005)}%2C${encodeURIComponent(locationLat! - 0.003)}%2C${encodeURIComponent(locationLng! + 0.005)}%2C${encodeURIComponent(locationLat! + 0.003)}&layer=mapnik&marker=${encodeURIComponent(locationLat!)}%2C${encodeURIComponent(locationLng!)}`}
                    className="w-full h-full"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-neutral-800 shadow-sm flex items-center gap-1.5 border border-neutral-200/60 pointer-events-none">
                    <BadgeCheck size={14} className="text-emerald-600" />
                    Verified Building Location
                  </div>
                </div>

                {/* Location Meta Card */}
                <div className="grid sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs">
                  <div>
                    <span className="text-neutral-400 block uppercase text-[10px] font-semibold">
                      Full Address
                    </span>
                    <span className="font-semibold text-neutral-800 block mt-0.5">
                      {hostel.area || hostel.city}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block uppercase text-[10px] font-semibold">
                      GPS Coordinates
                    </span>
                    <span className="font-mono font-semibold text-neutral-800 block mt-0.5">
                      {locationLat!.toFixed(5)}, {locationLng!.toFixed(5)}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block uppercase text-[10px] font-semibold">
                      Direct Navigation
                    </span>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationLat!)},${encodeURIComponent(locationLng!)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-black font-bold hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      Open in Maps App <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-brand-black" />
                  <h3 className="font-bold text-neutral-900 text-sm">Verified Address</h3>
                </div>
                <p className="text-sm text-neutral-700">
                  {hostel.area
                    ? `${hostel.name}, ${hostel.area}`
                    : `${hostel.name}, ${hostel.city}`}
                </p>
                <p className="text-xs text-neutral-400 pt-1">
                  GPS coordinates are not publicly shared for this property. Prospective residents
                  may visit the verified address above or call the hostel directly for landmark
                  directions.
                </p>
              </div>
            )}
          </section>
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
              answer={`${hostel.name} in ${hostel.area} offers monthly packages ${
                hostel.monthlyPrice > 0
                  ? `from NPR ${hostel.monthlyPrice.toLocaleString()}/month`
                  : 'at competitive monthly rates'
              }.${
                hostel.totalBeds > 0
                  ? ` There are currently ${hostel.availableBeds} beds available out of ${hostel.totalBeds} total beds, with ${hostel.totalStudents} active students residing.`
                  : ''
              } Rated ${hostel.rating}/5 from verified stays.`}
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
              {hostel.monthlyPrice > 0 ? (
                <>
                  NPR {hostel.monthlyPrice.toLocaleString()}
                  <span className="text-xs font-normal text-neutral-500">/mo</span>
                </>
              ) : (
                'Contact for price'
              )}
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
    const [resSettled, dailyMealsSettled] = await Promise.allSettled([
      getHostelById(slug),
      getHostelDailyMeals(slug),
    ]);

    if (resSettled.status === 'fulfilled' && resSettled.value?.data) {
      const data = resSettled.value.data;
      const fetchedDailyMeals =
        dailyMealsSettled.status === 'fulfilled' &&
        dailyMealsSettled.value?.data?.schedule &&
        dailyMealsSettled.value.data.schedule.length > 0
          ? dailyMealsSettled.value.data.schedule
          : [];
      const apiHostel: Hostel = {
        id: data.id,
        slug: data.id,
        name: staticHostel?.name || data.name,
        city: data.city || staticHostel?.city || 'Kathmandu',
        area:
          [data.address, data.city].filter(Boolean).join(', ') ||
          data.address ||
          data.city ||
          staticHostel?.area ||
          'Nepal',
        priceFrom: data.priceFrom || staticHostel?.priceFrom || 1100,
        monthlyPrice:
          data.monthlyRent ||
          data.hostelFee ||
          data.monthlyPrice ||
          staticHostel?.monthlyPrice ||
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
        latitude: data.isLocationShared && data.latitude != null ? data.latitude : null,
        longitude: data.isLocationShared && data.longitude != null ? data.longitude : null,
        isLocationShared: Boolean(data.isLocationShared),
        locationUpdatedAt: data.isLocationShared ? data.locationUpdatedAt ?? null : null,
        meals: data.meals || [],
        dailyMeals: fetchedDailyMeals,
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
