'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { HostelImage } from '@/components/ui/Media';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Building2,
  MapPin,
  Wallet,
  Sparkles,
  BadgeCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Star,
  Users,
  Wifi,
  Coffee,
  Utensils,
  Dumbbell,
  Car,
  Tv,
  Wind,
  PawPrint,
  ShieldCheck,
  Clock,
  TrendingUp,
  Phone,
  Mail,
  Camera,
  Plus,
  X,
  Send,
  PartyPopper,
  HandCoins,
  CalendarCheck,
  ChevronDown,
  PenLine,
  Eye,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const hostelTypes = [
  {
    id: 'boys',
    label: "Boy's",
    hint: 'Male residents only',
    icon: <Users size={20} strokeWidth={2} />,
  },
  {
    id: 'girls',
    label: "Girl's",
    hint: 'Female residents only',
    icon: <ShieldCheck size={20} strokeWidth={2} />,
  },
  {
    id: 'coed',
    label: 'Co-Ed',
    hint: 'Everyone welcome',
    icon: <Sparkles size={20} strokeWidth={2} />,
  },
];
const amenityOptions = [
  { id: 'wifi', label: 'High-speed WiFi', icon: <Wifi size={15} /> },
  { id: 'food', label: 'Meals / Mess', icon: <Utensils size={15} /> },
  { id: 'breakfast', label: 'Breakfast', icon: <Coffee size={15} /> },
  { id: 'parking', label: 'Parking', icon: <Car size={15} /> },
  { id: 'gym', label: 'Gym', icon: <Dumbbell size={15} /> },
  { id: 'tv', label: 'TV Hall', icon: <Tv size={15} /> },
  { id: 'ac', label: 'AC / Heating', icon: <Wind size={15} /> },
  { id: 'pet', label: 'Pet friendly', icon: <PawPrint size={15} /> },
];
const cities = [
  'Kathmandu',
  'Pokhara',
  'Chitwan',
  'Butwal',
  'Dharan',
  'Biratnagar',
  'Nepalgunj',
  'Dhangadhi',
  'Other',
];
const faqs = [
  {
    q: 'Is it really free to list?',
    a: 'Yes. Listing is free forever. We only take a small 5% fee when you get a paid booking through us. No beds filled = no fee.',
  },
  {
    q: 'How fast do I go live?',
    a: 'Most hostels go live in 24 hours. Our team calls you, verifies photos on WhatsApp, and polishes your page the same day.',
  },
  {
    q: 'Do I need professional photos?',
    a: 'No. Daylight phone photos are perfect. Shoot entrance, rooms, washroom, kitchen + one smiling face. We enhance them free.',
  },
  {
    q: 'Can I manage fees here too?',
    a: 'Yes — listing unlocks the free owner dashboard: auto fee sheets, leave approvals, occupancy tracking. Owners save ~15 hrs/month.',
  },
  {
    q: 'Who owns my data?',
    a: 'You do. Export anytime, delete in one click. No lock-in, no dark patterns.',
  },
];
const marqueeWords = [
  'Free to list',
  'Verified badge',
  '5% only on booking',
  'Go live in 24hrs',
  'Nepali support',
  'No lock-in',
];
const stepsMeta = [
  {
    kicker: 'Step 01 — Basics',
    title: 'Tell us about your place',
    icon: <Building2 size={18} strokeWidth={2.2} />,
  },
  {
    kicker: 'Step 02 — Location & Rent',
    title: 'Where is it, what does it cost?',
    icon: <MapPin size={18} strokeWidth={2.2} />,
  },
  {
    kicker: 'Step 03 — Vibe & Photos',
    title: 'Show off your vibe',
    icon: <Camera size={18} strokeWidth={2.2} />,
  },
  {
    kicker: 'Step 04 — You & Launch',
    title: 'Almost live — who owns this?',
    icon: <Send size={18} strokeWidth={2.2} />,
  },
];
type FormState = {
  hostelName: string;
  type: string;
  totalBeds: string;
  phone: string;
  city: string;
  area: string;
  address: string;
  priceFrom: string;
  negotiable: boolean;
  amenities: string[];
  description: string;
  rules: string;
  photos: string[];
  ownerName: string;
  email: string;
  agree: boolean;
};
const initialForm: FormState = {
  hostelName: '',
  type: 'coed',
  totalBeds: '30',
  phone: '',
  city: 'Kathmandu',
  area: '',
  address: '',
  priceFrom: '8000',
  negotiable: true,
  amenities: ['wifi', 'food'],
  description: '',
  rules: '',
  photos: [],
  ownerName: '',
  email: '',
  agree: false,
};

function useCountUp(target: number, duration = 0.9, started = true) {
  const [val, setVal] = useState(0);
  const obj = useRef({ v: 0 });
  useEffect(() => {
    if (!started) return;
    const tw = gsap.to(obj.current, {
      v: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => setVal(Math.round(obj.current.v)),
    });
    return () => {
      tw.kill();
    };
  }, [target, duration, started]);
  return val;
}

const ListHostelPage = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photoInput, setPhotoInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [calcBeds, setCalcBeds] = useState(40);
  const [calcRent, setCalcRent] = useState(9000);
  const [calcOcc, setCalcOcc] = useState(85);
  const rootRef = useRef<HTMLDivElement>(null);
  const journeyFillRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const stepCardRef = useRef<HTMLDivElement>(null);
  const previewCardRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const monthlyEstimate = useMemo(
    () => Math.round(calcBeds * calcRent * (calcOcc / 100)),
    [calcBeds, calcRent, calcOcc]
  );
  const animatedEstimate = useCountUp(monthlyEstimate, 0.8, true);
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const n = { ...e };
      delete n[key as string];
      return n;
    });
  };
  const toggleAmenity = (id: string) => {
    set(
      'amenities',
      form.amenities.includes(id) ? form.amenities.filter((a) => a !== id) : [...form.amenities, id]
    );
  };
  const validateStep = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (form.hostelName.trim().length < 3)
        e.hostelName = 'Give your hostel a real name (min 3 letters).';
      const beds = Number(form.totalBeds);
      if (!beds || beds < 4 || beds > 500) e.totalBeds = 'Beds should be between 4 and 500.';
      if (!/^[0-9+\-\s()]{7,15}$/.test(form.phone.trim()))
        e.phone = 'Enter a valid phone / WhatsApp number.';
    }
    if (s === 1) {
      if (form.area.trim().length < 2) e.area = 'e.g. Thamel, Lakeside, Sauraha...';
      if (form.address.trim().length < 5)
        e.address = 'Add a full address so students can find you.';
      const p = Number(form.priceFrom);
      if (!p || p < 1000 || p > 50000) e.priceFrom = 'Monthly rent is usually NPR 1,000 - 50,000.';
    }
    if (s === 2) {
      if (form.description.trim().length < 30)
        e.description = 'Tell a 2-line story - min 30 characters.';
      if (form.amenities.length < 2) e.amenities = 'Pick at least 2 amenities.';
    }
    if (s === 3) {
      if (form.ownerName.trim().length < 2) e.ownerName = 'Your good name?';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
        e.email = 'That email looks off - double-check?';
      if (!form.agree) e.agree = 'Please accept so we can call you for verification.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const animateStepChange = (next: number) => {
    if (!stepCardRef.current) {
      setStep(next);
      return;
    }
    gsap.to(stepCardRef.current, {
      y: 14,
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        setStep(next);
        requestAnimationFrame(() => {
          gsap.fromTo(
            stepCardRef.current,
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }
          );
        });
      },
    });
  };
  const goNext = () => {
    if (!validateStep(step)) {
      gsap.fromTo(
        stepCardRef.current,
        { x: -8 },
        { x: 0, duration: 0.4, ease: 'elastic.out(1,0.4)' }
      );
      return;
    }
    if (step < 3) animateStepChange(step + 1);
    else {
      gsap
        .timeline({ onComplete: () => setSubmitted(true) })
        .to(
          planeRef.current,
          { x: 60, y: -40, rotation: 18, opacity: 1, duration: 0.45, ease: 'power2.in' },
          0
        )
        .to(
          stepCardRef.current,
          { y: -16, opacity: 0, scale: 0.98, duration: 0.35, ease: 'power2.in' },
          0.15
        );
    }
  };
  const goBack = () => {
    if (step > 0) animateStepChange(step - 1);
  };
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.lh-hero-line',
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.12, ease: 'power4.out', delay: 0.1 }
      );
      gsap.fromTo(
        '.lh-fade',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.09, ease: 'power3.out', delay: 0.35 }
      );
      gsap.fromTo(
        '.lh-sticker',
        { scale: 0, rotation: -18 },
        {
          scale: 1,
          rotation: (i: number) => (i % 2 === 0 ? -6 : 5),
          duration: 0.7,
          stagger: 0.1,
          ease: 'back.out(1.8)',
          delay: 0.6,
        }
      );
      gsap.to('.lh-float', {
        y: -10,
        duration: 1.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.2,
      });
      const draw = document.querySelector('.lh-underline-path') as SVGPathElement | null;
      if (draw) {
        const len = draw.getTotalLength();
        gsap.fromTo(
          draw,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out', delay: 0.8 }
        );
      }
      gsap.utils.toArray<HTMLElement>('.lh-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
      if (journeyFillRef.current) {
        gsap.fromTo(
          journeyFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '#lh-journey',
              start: 'top 70%',
              end: 'bottom 55%',
              scrub: 0.6,
            },
          }
        );
      }
      gsap.to(previewCardRef.current, {
        rotationY: 4,
        rotationX: -2,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformPerspective: 900,
      });
      gsap.utils.toArray('.lh-orb').forEach((orb, i) => {
        gsap.to(orb as HTMLElement, {
          y: i % 2 === 0 ? 60 : -60,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);
  useEffect(() => {
    if (progressBarRef.current)
      gsap.to(progressBarRef.current, {
        width: `${((step + 1) / 4) * 100}%`,
        duration: 0.6,
        ease: 'power3.out',
      });
  }, [step]);
  useEffect(() => {
    if (submitted && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { scale: 0.92, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' }
      );
      gsap.fromTo(
        '.lh-confetti',
        { y: 0, opacity: 1, scale: 1 },
        {
          y: () => gsap.utils.random(-120, -40),
          x: () => gsap.utils.random(-90, 90),
          rotation: () => gsap.utils.random(-180, 180),
          opacity: 0,
          duration: 1.4,
          stagger: 0.03,
          ease: 'power2.out',
        }
      );
    }
  }, [submitted]);
  const previewAmenities = amenityOptions.filter((a) => form.amenities.includes(a.id)).slice(0, 4);
  return (
    <>
      <Head>
        <title>List Your Hostel - Free Forever | Hostel Ghar</title>
        <meta name="description" content="List your hostel free. Verified in 24hrs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        ref={rootRef}
        className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#FDFDF6] text-brand-black"
      >
        <Header />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 opacity-50"
          style={{
            backgroundImage: 'radial-gradient(rgba(1,1,1,0.06) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        <div
          aria-hidden
          className="lh-orb pointer-events-none absolute left-0 top-[8%] z-0 h-[420px] w-[420px] -translate-x-1/3 rounded-full bg-brand-lime/30 blur-[100px]"
        />
        <div
          aria-hidden
          className="lh-orb pointer-events-none absolute right-0 top-[46%] z-0 h-[480px] w-[480px] translate-x-1/3 rounded-full bg-[#ffe27a]/40 blur-[110px]"
        />
        <section className="relative z-10 pt-10 md:pt-16 pb-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="lh-fade inline-flex items-center gap-2 rounded-full border-2 border-brand-black bg-white px-4 py-1.5 text-[13px] font-bold shadow-[3px_3px_0_#010101]">
                  <span className="flex h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  500+ owners - avg +38% occupancy in 60 days
                </div>
                <h1 className="mt-5 text-[2.6rem] leading-[0.95] font-extrabold tracking-tight sm:text-6xl lg:text-[4.2rem]">
                  <span className="block overflow-hidden pb-1">
                    <span className="lh-hero-line block">Empty beds?</span>
                  </span>
                  <span className="block overflow-hidden pb-3">
                    <span className="lh-hero-line block">
                      Lets fill them{' '}
                      <span className="relative inline-block">
                        <span className="relative z-10 bg-brand-lime px-2 -rotate-1 inline-block border-2 border-brand-black rounded-lg shadow-[4px_4px_0_#010101]">
                          together.
                        </span>
                        <svg
                          className="absolute -bottom-2 left-0 w-full"
                          viewBox="0 0 220 14"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            className="lh-underline-path"
                            d="M3 10 C 60 3, 140 3, 217 8"
                            stroke="#010101"
                            strokeWidth="4"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </span>
                  </span>
                </h1>
                <p className="lh-fade mt-5 max-w-xl text-[17px] leading-relaxed text-neutral-600">
                  List in <strong className="text-brand-black">under 4 minutes</strong>. No listing
                  fee, no photoshoot - just your phone and a story.
                </p>
                <div className="lh-fade mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href="#lh-form"
                    className="group inline-flex items-center gap-2 rounded-xl border-2 border-brand-black bg-brand-black px-7 py-3.5 font-bold text-white shadow-[5px_5px_0_#B9FF66] transition-all hover:-translate-y-0.5"
                  >
                    <PenLine size={18} strokeWidth={2.4} />
                    Start free listing
                    <ArrowRight
                      size={18}
                      strokeWidth={2.6}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </a>
                  <a
                    href="#lh-calculator"
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-black bg-white px-6 py-3.5 font-bold shadow-[5px_5px_0_#010101] transition-all hover:-translate-y-0.5 hover:bg-brand-lime"
                  >
                    <HandCoins size={18} strokeWidth={2.2} />
                    See earnings
                  </a>
                </div>
                <div className="lh-fade mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-600">
                  <span className="inline-flex items-center gap-1.5">
                    <BadgeCheck size={16} className="text-lime-600" />
                    <strong className="text-brand-black">Verified</strong> in 24 hrs
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Wallet size={16} />
                    <strong className="text-brand-black">NPR 0</strong> to list
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={16} />
                    Live in <strong className="text-brand-black">4 mins</strong>
                  </span>
                </div>
                <div className="lh-fade mt-6 flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {['RH', 'PS', 'BT', 'SK'].map((n, i) => (
                      <span
                        key={n}
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-xs font-extrabold shadow ${i % 2 ? 'bg-brand-lime text-brand-black' : 'bg-brand-black text-white'}`}
                      >
                        {n}
                      </span>
                    ))}
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-black bg-white text-[11px] font-extrabold">
                      500+
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="flex items-center gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={13} fill="currentColor" strokeWidth={0} />
                      ))}
                      <strong className="ml-1 text-brand-black">4.9/5</strong>
                    </span>
                    <p className="text-neutral-500">from 320+ owners</p>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[520px] overflow-visible">
                <div className="lh-sticker absolute -left-1 top-2 z-20 rounded-xl border-2 border-brand-black bg-white px-3 py-2 text-xs font-extrabold shadow-[4px_4px_0_#010101]">
                  No listing fee, ever
                </div>
                <div className="lh-sticker absolute -right-1 top-24 z-20 rounded-xl border-2 border-brand-black bg-brand-black px-3 py-2 text-xs font-bold text-brand-lime shadow-[4px_4px_0_#B9FF66]">
                  2 new bookings today
                </div>
                <div className="lh-sticker absolute bottom-8 left-8 z-20 rounded-xl border-2 border-brand-black bg-[#fff3a3] px-3 py-2 text-xs font-extrabold shadow-[4px_4px_0_#010101]">
                  +40% occupancy - Priya
                </div>
                <div className="lh-fade relative rotate-1 rounded-3xl border-2 border-brand-black bg-white p-3 shadow-[8px_8px_0_#010101]">
                  <div className="overflow-hidden rounded-2xl border-2 border-brand-black bg-gradient-to-br from-[#eaffc7] via-white to-[#fff6c9]">
                    <div className="flex items-center justify-between px-4 pt-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-black px-3 py-1 text-[11px] font-bold text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" /> LIVE PREVIEW
                      </span>
                      <span className="inline-flex items-center gap-1 text-[12px] font-bold">
                        <Star size={13} fill="#f59e0b" className="text-amber-500" /> 4.9 (189)
                      </span>
                    </div>
                    <div className="relative">
                      <HostelImage
                        src="/images/static/hostel.jpeg"
                        alt="Hostel showcase"
                        aspect="wide"
                        rounded="none"
                        priority
                        className="border-b-2 border-brand-black"
                        imgClassName="object-cover"
                      />
                      <div className="lh-float absolute right-4 top-4 rounded-xl border-2 border-brand-black bg-white px-2.5 py-1.5 text-xs font-extrabold shadow-[3px_3px_0_#010101]">
                        +NPR 42k
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-4 pb-3 pt-3">
                      <div>
                        <p className="font-extrabold leading-none">
                          {form.hostelName || 'Your Hostel Name'}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
                          <MapPin size={12} /> {form.area || 'Thamel'}, {form.city}
                        </p>
                      </div>
                      <p className="rounded-lg border-2 border-brand-black bg-brand-lime px-2.5 py-1 text-sm font-extrabold">
                        NPR {Number(form.priceFrom || 0).toLocaleString('en-IN')}
                        <span className="text-[11px] font-bold">/mo</span>
                      </p>
                    </div>
                  </div>
                </div>
                <p className="lh-fade mt-4 text-center text-sm italic text-neutral-500">
                  This could be your card by tonight - updates as you type!
                </p>
              </div>
            </div>
            <div className="lh-fade mt-10 overflow-hidden rounded-2xl border-2 border-brand-black bg-brand-black py-3 shadow-[5px_5px_0_#B9FF66]">
              <div className="flex w-max animate-[footer-marquee_22s_linear_infinite] items-center gap-8 pr-8">
                {[...marqueeWords, ...marqueeWords].map((w, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-8 whitespace-nowrap text-sm font-bold uppercase tracking-widest text-white"
                  >
                    <span className="text-brand-lime">✦</span> {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="lh-form" className="relative z-10 scroll-mt-24 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[370px_1fr]">
              <aside id="lh-journey" className="lh-reveal relative">
                <div className="lg:sticky lg:top-24 rounded-3xl border-2 border-brand-black bg-white p-6 shadow-[7px_7px_0_#010101]">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-lime-700">
                    How listing feels
                  </p>
                  <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
                    4 tiny steps.
                    <br />
                    One big queue <span className="bg-brand-lime px-1 rounded">of guests.</span>
                  </h2>
                  <div className="relative mt-6 space-y-5">
                    <div
                      aria-hidden
                      className="absolute left-[19px] top-2 bottom-2 w-[3px] rounded bg-neutral-200"
                    />
                    <div
                      ref={journeyFillRef}
                      aria-hidden
                      className="absolute left-[19px] top-2 bottom-2 w-[3px] origin-top rounded bg-brand-black"
                      style={{ transform: 'scaleY(0)' }}
                    />
                    {[
                      {
                        t: 'You tell the story',
                        d: 'Name, beds, vibe - 60 seconds.',
                        icon: <PenLine size={16} strokeWidth={2.4} />,
                        done: step > 0,
                      },
                      {
                        t: 'We verify (human call)',
                        d: 'A real teammate calls you.',
                        icon: <Phone size={16} strokeWidth={2.4} />,
                        done: step > 1,
                      },
                      {
                        t: 'You go live',
                        d: 'Polished page + verified badge.',
                        icon: <BadgeCheck size={16} strokeWidth={2.4} />,
                        done: step > 2,
                      },
                      {
                        t: 'Beds fill while you sleep',
                        d: 'Bookings + auto fee tracking.',
                        icon: <CalendarCheck size={16} strokeWidth={2.4} />,
                        done: submitted,
                      },
                    ].map((s, i) => (
                      <div key={i} className="relative flex gap-3">
                        <span
                          className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-brand-black ${s.done ? 'bg-brand-lime' : 'bg-white'} shadow-[2px_2px_0_#010101]`}
                        >
                          {s.icon}
                        </span>
                        <div>
                          <p className="font-extrabold leading-tight">{s.t}</p>
                          <p className="text-sm text-neutral-500">{s.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    ref={previewCardRef}
                    className="mt-6 rounded-2xl border-2 border-brand-black bg-[#f6ffdf] p-4"
                  >
                    <p className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-neutral-600">
                      <Eye size={14} /> Live preview
                    </p>
                    <p className="mt-2 truncate font-extrabold">
                      {form.hostelName || 'Sunshine Backpackers'}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {form.totalBeds || '30'} beds - {form.city}
                      {form.area ? `, ${form.area}` : ''}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {previewAmenities.length ? (
                        previewAmenities.map((a) => (
                          <span
                            key={a.id}
                            className="inline-flex items-center gap-1 rounded-full border border-brand-black bg-white px-2 py-0.5 text-[11px] font-bold"
                          >
                            {a.icon}
                            {a.label}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-neutral-400">
                          Pick amenities - they appear here
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-2 rounded-xl bg-brand-black p-3 text-white">
                    <ShieldCheck size={20} className="shrink-0 text-brand-lime" />
                    <p className="text-[13px] leading-snug">
                      <strong>Owner promise:</strong> free list, export anytime, delete in 1 click.
                    </p>
                  </div>
                </div>
              </aside>
              <div className="lh-reveal">
                <div className="overflow-hidden rounded-3xl border-2 border-brand-black bg-white shadow-[8px_8px_0_#010101]">
                  <div className="border-b-2 border-brand-black bg-[#f6ffdf] px-6 py-5 md:px-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-brand-black bg-brand-lime shadow-[3px_3px_0_#010101]">
                          {stepsMeta[step].icon}
                        </span>
                        <div>
                          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-lime-700">
                            {stepsMeta[step].kicker}
                          </p>
                          <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">
                            {stepsMeta[step].title}
                          </h2>
                        </div>
                      </div>
                      <span className="rounded-full border-2 border-brand-black bg-white px-3 py-1 text-xs font-extrabold">
                        Step {step + 1} / 4
                      </span>
                    </div>
                    <div className="mt-4 h-3 overflow-hidden rounded-full border-2 border-brand-black bg-white">
                      <div
                        ref={progressBarRef}
                        className="h-full rounded-full bg-gradient-to-r from-brand-lime via-lime-300 to-brand-black"
                        style={{ width: '25%' }}
                      />
                    </div>
                    <div className="mt-3 flex gap-2">
                      {stepsMeta.map((s, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            if (i < step) animateStepChange(i);
                          }}
                          disabled={i > step}
                          className={`flex-1 truncate rounded-lg border-2 px-2 py-1.5 text-[11px] font-extrabold transition-all ${i === step ? 'border-brand-black bg-brand-black text-brand-lime' : i < step ? 'border-brand-black bg-brand-lime text-brand-black' : 'border-neutral-200 bg-white text-neutral-400'}`}
                        >
                          {i < step ? `✓ ${s.title}` : s.title}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="relative px-6 py-6 md:px-8 md:py-8">
                    <div
                      ref={planeRef}
                      aria-hidden
                      className="pointer-events-none absolute right-10 top-2 z-10 opacity-0"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-black bg-brand-lime shadow-[3px_3px_0_#010101]">
                        <Send size={20} strokeWidth={2.4} />
                      </span>
                    </div>
                    {!submitted ? (
                      <div ref={stepCardRef}>
                        {step === 0 && (
                          <div className="space-y-5">
                            <div>
                              <label
                                htmlFor="lh-name"
                                className="mb-1.5 block text-sm font-extrabold"
                              >
                                Hostel name <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <Building2
                                  size={18}
                                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                                />
                                <input
                                  id="lh-name"
                                  value={form.hostelName}
                                  onChange={(e) => set('hostelName', e.target.value)}
                                  placeholder="e.g. Sunshine Backpackers, Thamel"
                                  className={`w-full rounded-xl border-2 bg-neutral-50/60 py-3 pl-11 pr-4 text-[15px] font-medium outline-none transition-all placeholder:text-neutral-400 ${errors.hostelName ? 'border-red-500 ring-4 ring-red-500/10' : 'border-neutral-200 focus:border-brand-black focus:bg-white focus:shadow-[3px_3px_0_#B9FF66]'}`}
                                />
                              </div>
                              {errors.hostelName && (
                                <p
                                  role="alert"
                                  className="mt-1.5 text-[13px] font-bold text-red-600"
                                >
                                  {errors.hostelName}
                                </p>
                              )}
                              <p className="mt-1.5 text-xs text-neutral-500">
                                Tip: names with area rank 2x higher - Himalayan Stay Lakeside.
                              </p>
                            </div>
                            <div>
                              <p className="mb-2 text-sm font-extrabold">
                                Who stays here? <span className="text-red-500">*</span>
                              </p>
                              <div className="grid gap-3 sm:grid-cols-3">
                                {hostelTypes.map((t) => (
                                  <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => set('type', t.id)}
                                    aria-pressed={form.type === t.id}
                                    className={`rounded-2xl border-2 p-3 text-left transition-all hover:-translate-y-0.5 ${form.type === t.id ? 'border-brand-black bg-brand-black text-white shadow-[4px_4px_0_#B9FF66]' : 'border-neutral-200 bg-white hover:border-brand-black hover:shadow-[3px_3px_0_#010101]'}`}
                                  >
                                    <span
                                      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${form.type === t.id ? 'bg-brand-lime text-brand-black' : 'bg-neutral-100'}`}
                                    >
                                      {t.icon}
                                    </span>
                                    <span className="mt-2 block font-extrabold">{t.label}</span>
                                    <span
                                      className={`text-xs ${form.type === t.id ? 'text-white/70' : 'text-neutral-500'}`}
                                    >
                                      {t.hint}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <label
                                  htmlFor="lh-beds"
                                  className="mb-1.5 block text-sm font-extrabold"
                                >
                                  Total beds <span className="text-red-500">*</span>
                                </label>
                                <input
                                  id="lh-beds"
                                  inputMode="numeric"
                                  value={form.totalBeds}
                                  onChange={(e) =>
                                    set('totalBeds', e.target.value.replace(/[^0-9]/g, ''))
                                  }
                                  className={`w-full rounded-xl border-2 bg-neutral-50/60 px-4 py-3 font-bold outline-none ${errors.totalBeds ? 'border-red-500' : 'border-neutral-200 focus:border-brand-black focus:bg-white'}`}
                                />
                                {errors.totalBeds ? (
                                  <p
                                    role="alert"
                                    className="mt-1.5 text-[13px] font-bold text-red-600"
                                  >
                                    {errors.totalBeds}
                                  </p>
                                ) : (
                                  <p className="mt-1.5 text-xs text-neutral-500">
                                    Bunk + private combined. Even 6 beds is enough.
                                  </p>
                                )}
                              </div>
                              <div>
                                <label
                                  htmlFor="lh-phone"
                                  className="mb-1.5 block text-sm font-extrabold"
                                >
                                  WhatsApp number <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                  <Phone
                                    size={18}
                                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                                  />
                                  <input
                                    id="lh-phone"
                                    value={form.phone}
                                    onChange={(e) => set('phone', e.target.value)}
                                    placeholder="+977 98XXXXXXXX"
                                    className={`w-full rounded-xl border-2 bg-neutral-50/60 py-3 pl-11 pr-4 font-medium outline-none ${errors.phone ? 'border-red-500' : 'border-neutral-200 focus:border-brand-black focus:bg-white'}`}
                                  />
                                </div>
                                {errors.phone && (
                                  <p
                                    role="alert"
                                    className="mt-1.5 text-[13px] font-bold text-red-600"
                                  >
                                    {errors.phone}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        {step === 1 && (
                          <div className="space-y-5">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <label
                                  htmlFor="lh-city"
                                  className="mb-1.5 block text-sm font-extrabold"
                                >
                                  City <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                  <select
                                    id="lh-city"
                                    value={form.city}
                                    onChange={(e) => set('city', e.target.value)}
                                    className="w-full appearance-none rounded-xl border-2 border-neutral-200 bg-neutral-50/60 px-4 py-3 font-bold outline-none focus:border-brand-black focus:bg-white"
                                  >
                                    {cities.map((c) => (
                                      <option key={c}>{c}</option>
                                    ))}
                                  </select>
                                  <ChevronDown
                                    size={18}
                                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500"
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor="lh-area"
                                  className="mb-1.5 block text-sm font-extrabold"
                                >
                                  Area / Tole <span className="text-red-500">*</span>
                                </label>
                                <input
                                  id="lh-area"
                                  value={form.area}
                                  onChange={(e) => set('area', e.target.value)}
                                  placeholder="Thamel, Lakeside..."
                                  className={`w-full rounded-xl border-2 bg-neutral-50/60 px-4 py-3 font-medium outline-none ${errors.area ? 'border-red-500' : 'border-neutral-200 focus:border-brand-black focus:bg-white'}`}
                                />
                                {errors.area && (
                                  <p
                                    role="alert"
                                    className="mt-1.5 text-[13px] font-bold text-red-600"
                                  >
                                    {errors.area}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="lh-address"
                                className="mb-1.5 block text-sm font-extrabold"
                              >
                                Full address <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <MapPin
                                  size={18}
                                  className="pointer-events-none absolute left-3.5 top-3.5 text-neutral-400"
                                />
                                <textarea
                                  id="lh-address"
                                  rows={2}
                                  value={form.address}
                                  onChange={(e) => set('address', e.target.value)}
                                  placeholder="House no, street, landmark"
                                  className={`w-full resize-none rounded-xl border-2 bg-neutral-50/60 py-3 pl-11 pr-4 font-medium outline-none ${errors.address ? 'border-red-500' : 'border-neutral-200 focus:border-brand-black focus:bg-white'}`}
                                />
                              </div>
                              {errors.address && (
                                <p
                                  role="alert"
                                  className="mt-1.5 text-[13px] font-bold text-red-600"
                                >
                                  {errors.address}
                                </p>
                              )}
                            </div>
                            <div className="rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-4">
                              <div className="flex flex-wrap items-end gap-4">
                                <div className="flex-1 min-w-[180px]">
                                  <label
                                    htmlFor="lh-price"
                                    className="mb-1.5 block text-sm font-extrabold"
                                  >
                                    Starting rent (NPR / month){' '}
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <div className="relative">
                                    <Wallet
                                      size={18}
                                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                                    />
                                    <input
                                      id="lh-price"
                                      inputMode="numeric"
                                      value={form.priceFrom}
                                      onChange={(e) =>
                                        set('priceFrom', e.target.value.replace(/[^0-9]/g, ''))
                                      }
                                      className={`w-full rounded-xl border-2 bg-white py-3 pl-11 pr-4 text-lg font-extrabold outline-none ${errors.priceFrom ? 'border-red-500' : 'border-brand-black focus:shadow-[3px_3px_0_#B9FF66]'}`}
                                    />
                                  </div>
                                  {errors.priceFrom && (
                                    <p
                                      role="alert"
                                      className="mt-1.5 text-[13px] font-bold text-red-600"
                                    >
                                      {errors.priceFrom}
                                    </p>
                                  )}
                                </div>
                                <label className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-brand-black bg-white px-4 py-3 text-sm font-bold shadow-[3px_3px_0_#010101]">
                                  <input
                                    type="checkbox"
                                    checked={form.negotiable}
                                    onChange={(e) => set('negotiable', e.target.checked)}
                                    className="h-4 w-4 accent-black"
                                  />
                                  Negotiable
                                </label>
                              </div>
                              <input
                                type="range"
                                min={3000}
                                max={25000}
                                step={500}
                                value={Number(form.priceFrom) || 8000}
                                onChange={(e) => set('priceFrom', e.target.value)}
                                className="mt-3 w-full accent-black"
                                aria-label="Rent slider"
                              />
                              <p className="mt-1 text-xs text-neutral-500">
                                Sweet spot in {form.city}: NPR 7k-12k fills 2x faster.
                              </p>
                            </div>
                          </div>
                        )}
                        {step === 2 && (
                          <div className="space-y-5">
                            <div>
                              <p className="mb-2 text-sm font-extrabold">
                                What do guests brag about?{' '}
                                <span className="font-medium text-neutral-500">(pick 2+)</span>
                              </p>
                              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                {amenityOptions.map((a) => {
                                  const on = form.amenities.includes(a.id);
                                  return (
                                    <button
                                      key={a.id}
                                      type="button"
                                      onClick={() => toggleAmenity(a.id)}
                                      aria-pressed={on}
                                      className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-[13px] font-bold transition-all hover:-translate-y-0.5 ${on ? 'border-brand-black bg-brand-lime shadow-[3px_3px_0_#010101]' : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-brand-black'}`}
                                    >
                                      {a.icon}
                                      <span className="truncate">{a.label}</span>
                                      {on && <Check size={14} strokeWidth={3} />}
                                    </button>
                                  );
                                })}
                              </div>
                              {errors.amenities && (
                                <p
                                  role="alert"
                                  className="mt-1.5 text-[13px] font-bold text-red-600"
                                >
                                  {errors.amenities}
                                </p>
                              )}
                            </div>
                            <div>
                              <label
                                htmlFor="lh-desc"
                                className="mb-1.5 flex items-center justify-between text-sm font-extrabold"
                              >
                                Your story <span className="text-red-500">*</span>
                                <span
                                  className={`text-xs font-bold ${form.description.length < 30 ? 'text-neutral-400' : 'text-lime-700'}`}
                                >
                                  {form.description.length}/30+ chars
                                </span>
                              </label>
                              <textarea
                                id="lh-desc"
                                rows={4}
                                value={form.description}
                                onChange={(e) => set('description', e.target.value)}
                                placeholder="Mornings smell like fresh chiya here. 2 mins from Lakeside, rooftop jams on Fridays..."
                                className={`w-full resize-none rounded-xl border-2 bg-neutral-50/60 p-4 font-medium leading-relaxed outline-none ${errors.description ? 'border-red-500' : 'border-neutral-200 focus:border-brand-black focus:bg-white'}`}
                              />
                              {errors.description && (
                                <p
                                  role="alert"
                                  className="mt-1.5 text-[13px] font-bold text-red-600"
                                >
                                  {errors.description}
                                </p>
                              )}
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <label
                                  htmlFor="lh-rules"
                                  className="mb-1.5 block text-sm font-extrabold"
                                >
                                  House rules{' '}
                                  <span className="font-medium text-neutral-400">(optional)</span>
                                </label>
                                <input
                                  id="lh-rules"
                                  value={form.rules}
                                  onChange={(e) => set('rules', e.target.value)}
                                  placeholder="e.g. Gate closes 10pm"
                                  className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50/60 px-4 py-3 font-medium outline-none focus:border-brand-black focus:bg-white"
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="lh-photo"
                                  className="mb-1.5 block text-sm font-extrabold"
                                >
                                  Photo links{' '}
                                  <span className="font-medium text-neutral-400">
                                    (paste + add)
                                  </span>
                                </label>
                                <div className="flex gap-2">
                                  <input
                                    id="lh-photo"
                                    value={photoInput}
                                    onChange={(e) => setPhotoInput(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (photoInput.trim()) {
                                          set('photos', [...form.photos, photoInput.trim()]);
                                          setPhotoInput('');
                                        }
                                      }
                                    }}
                                    placeholder="https://..."
                                    className="min-w-0 flex-1 rounded-xl border-2 border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm font-medium outline-none focus:border-brand-black focus:bg-white"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (photoInput.trim()) {
                                        set('photos', [...form.photos, photoInput.trim()]);
                                        setPhotoInput('');
                                      }
                                    }}
                                    className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl border-2 border-brand-black bg-brand-lime shadow-[3px_3px_0_#010101] transition-transform hover:-translate-y-0.5"
                                    aria-label="Add photo"
                                  >
                                    <Plus size={20} strokeWidth={2.6} />
                                  </button>
                                </div>
                              </div>
                            </div>
                            {form.photos.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {form.photos.map((p, i) => (
                                  <span
                                    key={i}
                                    className="inline-flex max-w-full items-center gap-2 rounded-full border-2 border-brand-black bg-white py-1 pl-3 pr-1.5 text-xs font-bold"
                                  >
                                    <Camera size={13} />
                                    <span className="max-w-[180px] truncate">{p}</span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        set(
                                          'photos',
                                          form.photos.filter((_, j) => j !== i)
                                        )
                                      }
                                      className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 hover:bg-red-100 hover:text-red-600"
                                      aria-label={`Remove photo ${i + 1}`}
                                    >
                                      <X size={13} strokeWidth={2.6} />
                                    </button>
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="flex items-center gap-2 rounded-xl bg-neutral-50 p-3 text-[13px] text-neutral-500">
                                <Camera size={16} /> No photos yet - totally fine. We verify over
                                WhatsApp.
                              </p>
                            )}
                          </div>
                        )}
                        {step === 3 && (
                          <div className="space-y-5">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <label
                                  htmlFor="lh-owner"
                                  className="mb-1.5 block text-sm font-extrabold"
                                >
                                  Your name <span className="text-red-500">*</span>
                                </label>
                                <input
                                  id="lh-owner"
                                  value={form.ownerName}
                                  onChange={(e) => set('ownerName', e.target.value)}
                                  placeholder="e.g. Anisha Gurung"
                                  className={`w-full rounded-xl border-2 bg-neutral-50/60 px-4 py-3 font-medium outline-none ${errors.ownerName ? 'border-red-500' : 'border-neutral-200 focus:border-brand-black focus:bg-white'}`}
                                />
                                {errors.ownerName && (
                                  <p
                                    role="alert"
                                    className="mt-1.5 text-[13px] font-bold text-red-600"
                                  >
                                    {errors.ownerName}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label
                                  htmlFor="lh-email"
                                  className="mb-1.5 block text-sm font-extrabold"
                                >
                                  Email <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                  <Mail
                                    size={18}
                                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                                  />
                                  <input
                                    id="lh-email"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => set('email', e.target.value)}
                                    placeholder="you@yourhostel.com"
                                    className={`w-full rounded-xl border-2 bg-neutral-50/60 py-3 pl-11 pr-4 font-medium outline-none ${errors.email ? 'border-red-500' : 'border-neutral-200 focus:border-brand-black focus:bg-white'}`}
                                  />
                                </div>
                                {errors.email && (
                                  <p
                                    role="alert"
                                    className="mt-1.5 text-[13px] font-bold text-red-600"
                                  >
                                    {errors.email}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="rounded-2xl border-2 border-brand-black bg-[#FDFDF6] p-5 shadow-[4px_4px_0_#B9FF66]">
                              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-neutral-500">
                                Quick review before launch
                              </p>
                              <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                                <div className="rounded-xl bg-white border border-neutral-200 p-3">
                                  <p className="text-xs text-neutral-500">Hostel</p>
                                  <p className="font-extrabold truncate">
                                    {form.hostelName || '-'} - {form.totalBeds} beds
                                  </p>
                                </div>
                                <div className="rounded-xl bg-white border border-neutral-200 p-3">
                                  <p className="text-xs text-neutral-500">Where</p>
                                  <p className="font-extrabold truncate">
                                    {form.area || '-'}, {form.city}
                                  </p>
                                </div>
                                <div className="rounded-xl bg-white border border-neutral-200 p-3">
                                  <p className="text-xs text-neutral-500">Rent</p>
                                  <p className="font-extrabold">
                                    NPR {Number(form.priceFrom || 0).toLocaleString('en-IN')}/mo{' '}
                                    {form.negotiable ? '(negotiable)' : ''}
                                  </p>
                                </div>
                                <div className="rounded-xl bg-white border border-neutral-200 p-3">
                                  <p className="text-xs text-neutral-500">Contact</p>
                                  <p className="font-extrabold truncate">{form.phone || '-'}</p>
                                </div>
                              </div>
                              <p className="mt-3 line-clamp-3 text-sm italic text-neutral-600">
                                {form.description || 'Your story will appear here...'}
                              </p>
                              <button
                                type="button"
                                onClick={() => animateStepChange(0)}
                                className="mt-2 text-[13px] font-bold underline decoration-brand-lime decoration-2 underline-offset-4"
                              >
                                Edit details
                              </button>
                            </div>
                            <label
                              className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition-all ${errors.agree ? 'border-red-500 bg-red-50' : form.agree ? 'border-brand-black bg-[#f6ffdf]' : 'border-neutral-200 bg-neutral-50 hover:border-brand-black'}`}
                            >
                              <input
                                type="checkbox"
                                checked={form.agree}
                                onChange={(e) => set('agree', e.target.checked)}
                                className="mt-1 h-5 w-5 accent-black"
                              />
                              <span className="text-sm leading-relaxed">
                                <strong>Yes, call me for a 2-min verification.</strong> I agree to
                                be contacted on WhatsApp/phone and accept the{' '}
                                <Link
                                  href="/privacy-policy"
                                  className="underline decoration-brand-lime decoration-2 underline-offset-2"
                                >
                                  owner terms
                                </Link>
                                .
                              </span>
                            </label>
                            {errors.agree && (
                              <p role="alert" className="-mt-2 text-[13px] font-bold text-red-600">
                                {errors.agree}
                              </p>
                            )}
                          </div>
                        )}
                        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-neutral-200 pt-5">
                          <button
                            type="button"
                            onClick={goBack}
                            disabled={step === 0}
                            className={`inline-flex items-center gap-2 rounded-xl border-2 px-5 py-3 font-bold transition-all ${step === 0 ? 'cursor-not-allowed border-neutral-200 text-neutral-300' : 'border-brand-black bg-white shadow-[3px_3px_0_#010101] hover:-translate-y-0.5'}`}
                          >
                            <ArrowLeft size={17} strokeWidth={2.5} /> Back
                          </button>
                          <p className="hidden text-xs text-neutral-400 sm:block">
                            Draft auto-saved
                          </p>
                          <button
                            type="button"
                            onClick={goNext}
                            className="group inline-flex items-center gap-2 rounded-xl border-2 border-brand-black bg-brand-lime px-7 py-3 font-extrabold shadow-[4px_4px_0_#010101] transition-all hover:-translate-y-0.5 active:translate-y-0"
                          >
                            {step === 3 ? (
                              <>
                                <PartyPopper size={18} strokeWidth={2.4} /> Launch my hostel
                              </>
                            ) : (
                              <>
                                Continue{' '}
                                <ArrowRight
                                  size={18}
                                  strokeWidth={2.6}
                                  className="transition-transform group-hover:translate-x-1"
                                />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div ref={successRef} className="relative overflow-hidden py-4 text-center">
                        {Array.from({ length: 18 }).map((_, i) => (
                          <span
                            key={i}
                            aria-hidden
                            className={`lh-confetti absolute left-1/2 top-10 h-2.5 w-2.5 ${i % 3 === 0 ? 'bg-brand-lime border border-brand-black' : i % 3 === 1 ? 'bg-brand-black rounded-full' : 'bg-[#ffce4a] rounded-sm'}`}
                          />
                        ))}
                        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-brand-black bg-brand-lime shadow-[4px_4px_0_#010101]">
                          <PartyPopper size={30} strokeWidth={2.2} />
                        </span>
                        <h3 className="mt-4 text-3xl font-extrabold tracking-tight">
                          Dhanyabad, {form.ownerName.split(' ')[0] || 'owner'}!
                        </h3>
                        <p className="mx-auto mt-2 max-w-md text-neutral-600">
                          <strong className="text-brand-black">
                            {form.hostelName || 'Your hostel'}
                          </strong>{' '}
                          is in the verification queue. We call{' '}
                          <strong className="text-brand-black">{form.phone || 'you'}</strong> within
                          24 hrs.
                        </p>
                        <div className="mx-auto mt-5 grid max-w-md gap-2 text-left">
                          {[
                            'Verification call + WhatsApp photo check',
                            'Free page polish + verified badge',
                            'First booking alert on SMS + email',
                          ].map((t, i) => (
                            <p
                              key={i}
                              className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm font-medium"
                            >
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-black text-[11px] font-extrabold text-brand-lime">
                                {i + 1}
                              </span>
                              {t}
                            </p>
                          ))}
                        </div>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                          <Link
                            href="/for-owners"
                            className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-black bg-brand-black px-6 py-3 font-bold text-white shadow-[4px_4px_0_#B9FF66] hover:-translate-y-0.5 transition-all"
                          >
                            Explore owner dashboard <ArrowRight size={17} />
                          </Link>
                          <button
                            onClick={() => {
                              setSubmitted(false);
                              setForm(initialForm);
                              setStep(0);
                            }}
                            className="rounded-xl border-2 border-brand-black bg-white px-6 py-3 font-bold shadow-[4px_4px_0_#010101] hover:bg-brand-lime transition-all"
                          >
                            List another hostel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-center text-xs text-neutral-500">
                  Your info is encrypted. Questions?{' '}
                  <Link href="/contact" className="font-bold underline">
                    Talk to a human
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="lh-calculator" className="relative z-10 scroll-mt-24 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lh-reveal overflow-hidden rounded-3xl border-2 border-brand-black bg-brand-black text-white shadow-[8px_8px_0_#B9FF66]">
              <div className="grid gap-8 p-7 md:grid-cols-2 md:p-10">
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-brand-lime px-3 py-1 text-[12px] font-extrabold text-brand-black">
                    <TrendingUp size={14} strokeWidth={2.6} /> EARNINGS CALCULATOR
                  </p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
                    What if empty beds <span className="text-brand-lime">paid rent?</span>
                  </h2>
                  <div className="mt-6 space-y-5">
                    <div>
                      <div className="mb-1.5 flex justify-between text-sm font-bold">
                        <span>Beds - {calcBeds}</span>
                        <span className="text-brand-lime">beds</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={150}
                        value={calcBeds}
                        onChange={(e) => setCalcBeds(Number(e.target.value))}
                        className="w-full accent-[#B9FF66]"
                        aria-label="beds"
                      />
                    </div>
                    <div>
                      <div className="mb-1.5 flex justify-between text-sm font-bold">
                        <span>Rent - NPR {calcRent.toLocaleString('en-IN')}</span>
                        <span className="text-brand-lime">/mo</span>
                      </div>
                      <input
                        type="range"
                        min={4000}
                        max={20000}
                        step={250}
                        value={calcRent}
                        onChange={(e) => setCalcRent(Number(e.target.value))}
                        className="w-full accent-[#B9FF66]"
                        aria-label="rent"
                      />
                    </div>
                    <div>
                      <div className="mb-1.5 flex justify-between text-sm font-bold">
                        <span>Occupancy - {calcOcc}%</span>
                        <span className="text-brand-lime">filled</span>
                      </div>
                      <input
                        type="range"
                        min={40}
                        max={98}
                        value={calcOcc}
                        onChange={(e) => setCalcOcc(Number(e.target.value))}
                        className="w-full accent-[#B9FF66]"
                        aria-label="occupancy"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center rounded-2xl border-2 border-dashed border-white/20 bg-white/5 p-7 text-center">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/50">
                    Estimated monthly revenue
                  </p>
                  <p className="mt-1 text-5xl font-extrabold tracking-tight text-brand-lime md:text-6xl">
                    NPR {animatedEstimate.toLocaleString('en-IN')}
                  </p>
                  <a
                    href="#lh-form"
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-lime px-6 py-3.5 font-extrabold text-brand-black transition-all hover:-translate-y-0.5"
                  >
                    Claim this revenue <ArrowRight size={18} strokeWidth={2.6} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative z-10 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lh-reveal flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-lime-700">
                  Why owners stay
                </p>
                <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                  Not a listing site. Your back-office.
                </h2>
              </div>
              <Link
                href="/for-owners"
                className="inline-flex items-center gap-1.5 rounded-xl border-2 border-brand-black bg-white px-4 py-2.5 text-sm font-bold shadow-[3px_3px_0_#010101] hover:bg-brand-lime transition-all"
              >
                See toolkit <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: <BadgeCheck size={22} />,
                  bg: 'bg-brand-lime',
                  t: 'Verified badge = trust',
                  d: 'Verified listings get 3.1x more clicks.',
                  tag: 'Trust',
                },
                {
                  icon: <HandCoins size={22} />,
                  bg: 'bg-[#fff3a3]',
                  t: 'Only pay when you earn',
                  d: 'Zero listing fee. 5% only on bookings.',
                  tag: 'Pricing',
                },
                {
                  icon: <CalendarCheck size={22} />,
                  bg: 'bg-white',
                  t: 'Fees and leaves auto',
                  d: 'Fee sheets write themselves. One-tap leaves.',
                  tag: 'Auto',
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="lh-reveal rounded-3xl border-2 border-brand-black bg-white p-6 shadow-[6px_6px_0_#010101] transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-brand-black ${c.bg}`}
                    >
                      {c.icon}
                    </span>
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest">
                      {c.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold leading-snug">{c.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="relative z-10 py-8 md:pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="lh-reveal text-center">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-lime-700">
                Honest answers
              </p>
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight md:text-4xl">
                Owners asked. We answered like humans.
              </h2>
            </div>
            <div className="mt-6 space-y-3">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div
                    key={i}
                    className={`lh-reveal overflow-hidden rounded-2xl border-2 transition-all ${open ? 'border-brand-black bg-white shadow-[5px_5px_0_#B9FF66]' : 'border-neutral-200 bg-white hover:border-brand-black'}`}
                  >
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      className="flex w-full items-center gap-3 px-5 py-4 text-left font-extrabold"
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-brand-black ${open ? 'bg-brand-black text-brand-lime' : 'bg-brand-lime'}`}
                      >
                        <ChevronDown
                          size={17}
                          strokeWidth={2.6}
                          className={`transition-transform ${open ? 'rotate-180' : ''}`}
                        />
                      </span>
                      {f.q}
                    </button>
                    <div
                      className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 pl-[68px] text-[15px] leading-relaxed text-neutral-600">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="lh-reveal mt-8 rounded-3xl border-2 border-brand-black bg-gradient-to-br from-brand-lime via-[#d8ff9e] to-white p-8 text-center shadow-[7px_7px_0_#010101] md:p-10">
              <h2 className="mx-auto max-w-xl text-3xl font-extrabold tracking-tight md:text-4xl">
                Your next resident is already scrolling.
              </h2>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a
                  href="#lh-form"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-black bg-brand-black px-8 py-4 font-extrabold text-white shadow-[5px_5px_0_#fff] transition-all hover:-translate-y-0.5"
                >
                  List free now <ArrowRight size={18} />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-black bg-white px-6 py-4 font-bold shadow-[5px_5px_0_#010101] transition-all"
                >
                  <Phone size={17} /> Talk first
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
      <style>{`@keyframes footer-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        html, body { overflow-x: hidden; max-width: 100vw; }
        main { overflow-x: hidden; }
      `}</style>
    </>
  );
};
export default ListHostelPage;
