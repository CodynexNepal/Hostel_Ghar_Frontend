'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import Seo from '@/components/seo/Seo';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, howToJsonLd } from '@/lib/seo/jsonLd';
import { getPageMeta } from '@/lib/seo/metadata';
import { CTAButton } from '@/components/ui/Section';
import { DashboardInsightShowcase, WorkflowPileUp, FlightStoryScroll } from '@/components/sections';
import LottieAnimation from '@/components/lottie/LottieAnimation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import apiClient from '@/lib/api/client';
import {
  Compass,
  Building2,
  ShieldCheck,
  Check,
  ArrowRight,
  Search,
  SlidersHorizontal,
  MessageSquare,
  Sparkles,
  LayoutDashboard,
  Users,
  FolderSync,
  HelpCircle,
  TrendingUp,
  Layers,
  ArrowUpRight,
  Zap,
  ChevronRight,
  Sliders,
  MapPin,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const meta = getPageMeta('/');

  // Mobile Bottom Action Dock visibility
  const [showMobileDock, setShowMobileDock] = useState(false);

  // Actual Metrics from Backend (with fallback to 500+, 50+, 10,000+)
  const [stats, setStats] = useState({
    hostels: '500+',
    cities: '50+',
    students: '10,000+',
  });

  useEffect(() => {
    let active = true;
    const fetchActualMetrics = async () => {
      try {
        const res = await apiClient.get<any>('/hostels', { params: { limit: 100 } });
        if (active && res.data?.success && res.data.data) {
          const list = Array.isArray(res.data.data) ? res.data.data : [];
          const rawTotal =
            res.data.pagination?.total ?? res.data.pagination?.totalItems ?? list.length;

          const uniqueCities = new Set(list.map((h: any) => h.city?.trim()).filter(Boolean));
          const citiesCount = uniqueCities.size;

          const totalStudents = list.reduce((sum: number, h: any) => {
            const count = h.totalStudents ?? h.activeResidents ?? h.occupiedBeds ?? 0;
            return sum + (typeof count === 'number' && !isNaN(count) ? count : 0);
          }, 0);

          setStats({
            hostels: typeof rawTotal === 'number' && rawTotal > 0 ? `${rawTotal}+` : '500+',
            cities: citiesCount > 0 ? `${citiesCount}+` : '50+',
            students: totalStudents > 0 ? `${totalStudents.toLocaleString()}+` : '10,000+',
          });
        }
      } catch {
        // Fallback to verified figures if backend is unavailable or errors
        if (active) {
          setStats({
            hostels: '500+',
            cities: '50+',
            students: '10,000+',
          });
        }
      }
    };
    fetchActualMetrics();
    return () => {
      active = false;
    };
  }, []);

  // Parallax Container Refs
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setShowMobileDock(window.scrollY > 300);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Text Reveal & Smooth Scroll-Triggered Entrance Animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      // Staggered reveal for section headings
      gsap.utils.toArray<HTMLElement>('.scroll-reveal-heading').forEach((heading) => {
        gsap.fromTo(
          heading,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Smooth rise-up for cards
      gsap.utils.toArray<HTMLElement>('.experience-card-item').forEach((card, idx) => {
        gsap.fromTo(
          card,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            delay: idx * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/" keywords={meta.keywords} />
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: 'Home', path: '/' }]),
          howToJsonLd({
            path: '/',
            name: 'How to discover and manage hostels on Hostel Ghar',
            description:
              'Hostel Ghar connects hostel discovery, room enquiries, resident management, and operations in one platform.',
            steps: [
              {
                name: 'Explore Your Options',
                text: 'Browse hostel listings and discover accommodation that matches your location, budget, and needs.',
              },
              {
                name: 'Compare What Matters',
                text: 'Review available details, facilities, room options, and published prices before contacting a hostel.',
              },
              {
                name: 'Connect With the Owner',
                text: 'Ask questions, confirm availability and costs, and take the next step toward your stay.',
              },
              {
                name: 'Manage With Confidence',
                text: 'Use the dedicated dashboard to keep stay details, payments, and hostel operations organized with ease.',
              },
            ],
          }),
        ]}
        id="ld-home"
      />

      <main className="min-h-screen bg-transparent text-[#0A0A0A] selection:bg-brand-lime selection:text-brand-black relative">
        <Header />

        {/* ========================================================
            1. HERO SECTION: TEXT REVEAL & SQUARE DESIGN BACKDROP
           ======================================================== */}
        <section
          ref={heroRef}
          className="relative overflow-hidden pt-12 sm:pt-16 md:pt-24 pb-16 sm:pb-20 md:pb-28 border-b border-neutral-200/90"
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[350px] bg-gradient-to-b from-brand-lime/20 via-brand-lime/5 to-transparent blur-3xl pointer-events-none -z-0" />
          <div className="absolute top-1/4 -right-24 w-80 h-80 bg-brand-lime/15 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
              {/* Clean, Elegant Brand Eyebrow Badge (No "NEPAL REGION // LIVE", No Blinking Dot) */}
              <div className="flex items-center justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-lime/25 text-brand-black text-xs sm:text-sm font-bold tracking-tight border border-brand-lime/50 shadow-sm transition-all duration-300 hover:bg-brand-lime/35">
                  <Sparkles size={15} className="text-brand-black" />
                  <span>Nepal&apos;s hostel discovery and management platform.</span>
                </div>
              </div>

              {/* Main Headline with Masked Text Reveal Animation */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-brand-black leading-[1.12]">
                <span className="inline-block overflow-hidden pb-1">
                  <span className="animate-text-reveal">Find Your Place.</span>
                </span>{' '}
                <span className="inline-block overflow-hidden pb-1">
                  <span className="animate-text-reveal-delay-1 relative inline-block mt-1 sm:mt-0">
                    <span className="relative z-10 px-2.5 py-0.5 rounded-xl bg-brand-lime/90 text-brand-black shadow-lime">
                      Manage Your Space.
                    </span>
                  </span>
                </span>
              </h1>

              {/* Subtitle / Lead Paragraph with Masked Text Reveal */}
              <div className="space-y-3.5 max-w-2xl sm:max-w-3xl mx-auto text-neutral-600 px-2">
                <p className="font-semibold text-neutral-900 text-base sm:text-lg md:text-xl leading-snug animate-text-reveal-delay-2">
                  Finding a hostel should feel exciting, not overwhelming. Managing one should feel
                  organized, not exhausting.
                </p>
                <p className="text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                  Hostel Ghar brings hostel discovery, room enquiries, resident management, and
                  hostel operations into one connected platform—making it easier for residents to
                  find their next place to call home and for hostel owners to run their businesses
                  with confidence.
                </p>
              </div>

              {/* Hero Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-2 px-4 max-w-md mx-auto sm:max-w-none">
                <CTAButton
                  href="/hostels"
                  variant="dark"
                  arrow="right"
                  className="w-full sm:w-auto text-sm sm:text-base py-3.5 sm:py-4 px-7 sm:px-8 font-bold shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  Find Your Hostel
                </CTAButton>
                <CTAButton
                  href="/for-owners"
                  variant="lime"
                  arrow="right"
                  className="w-full sm:w-auto text-sm sm:text-base py-3.5 sm:py-4 px-7 sm:px-8 font-extrabold text-brand-black shadow-lime hover:shadow-lime-lg transition-all duration-300"
                >
                  Manage Your Hostel
                </CTAButton>
              </div>

              {/* Quick Metrics & Pillars */}
              <div className="pt-8 sm:pt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4 max-w-3xl mx-auto text-left">
                  {/* Metric 1: Verified Hostels */}
                  <div className="group p-4 sm:p-5 rounded-2xl bg-white/90 border border-neutral-200/90 shadow-xs hover:shadow-md hover:border-brand-black/30 transition-all duration-300 backdrop-blur-sm flex items-start gap-3.5">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 group-hover:bg-emerald-100 transition-all duration-300 shadow-2xs">
                      <ShieldCheck size={24} strokeWidth={2.2} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight leading-none">
                        {stats.hostels}
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-700 font-bold mt-1">
                        Verified Hostels
                      </p>
                      <p className="text-[11px] text-neutral-400 font-medium truncate">
                        Physically inspected
                      </p>
                    </div>
                  </div>

                  {/* Metric 2: Cities Across Nepal */}
                  <div className="group p-4 sm:p-5 rounded-2xl bg-white/90 border border-neutral-200/90 shadow-xs hover:shadow-md hover:border-brand-black/30 transition-all duration-300 backdrop-blur-sm flex items-start gap-3.5">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-sky-50 border border-sky-200/70 flex items-center justify-center text-sky-600 shrink-0 group-hover:scale-105 group-hover:bg-sky-100 transition-all duration-300 shadow-2xs">
                      <MapPin size={24} strokeWidth={2.2} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight leading-none">
                        {stats.cities}
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-700 font-bold mt-1">
                        Cities Across Nepal
                      </p>
                      <p className="text-[11px] text-neutral-400 font-medium truncate">
                        Kathmandu, Pokhara &amp; more
                      </p>
                    </div>
                  </div>

                  {/* Metric 3: Students & Travelers */}
                  <div className="group col-span-1 sm:col-span-2 md:col-span-1 p-4 sm:p-5 rounded-2xl bg-white/90 border border-neutral-200/90 shadow-xs hover:shadow-md hover:border-brand-black/30 transition-all duration-300 backdrop-blur-sm flex items-start gap-3.5">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-brand-lime/30 border border-brand-black/10 flex items-center justify-center text-brand-black shrink-0 group-hover:scale-105 group-hover:bg-brand-lime/50 transition-all duration-300 shadow-2xs">
                      <Users size={24} strokeWidth={2.2} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight leading-none">
                        {stats.students}
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-700 font-bold mt-1">
                        Students &amp; Travelers
                      </p>
                      <p className="text-[11px] text-neutral-400 font-medium truncate">
                        Active residents &amp; reviews
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            FULL-PAGE PINNED 3D FLIGHT STORY SEQUENCE
           ======================================================== */}
        <FlightStoryScroll />

        {/* ========================================================
            2. THREE CONNECTED EXPERIENCES: EXPANSIVE 3-COLUMN SHOWCASE (NO PIN)
           ======================================================== */}
        <section id="perspectives" className="py-16 sm:py-20 md:py-28 relative">
          <div className="container-custom">
            {/* Section Header with Text Reveal */}
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-lime/30 text-brand-black text-xs font-mono font-bold uppercase tracking-wider border border-brand-lime/60">
                <Sparkles size={13} />
                Three Connected Experiences
              </span>
              <h2 className="scroll-reveal-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight leading-tight">
                More Than a Hostel. A Better Way to Live and Manage.
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Whether you&apos;re searching for a comfortable place to stay or looking for a
                smarter way to run your hostel, Hostel Ghar brings the experience together.
              </p>
            </div>

            {/* Expansive 3-Card Balanced Grid (Clean, Responsive, Zero Pinning Lag) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {/* Card 1: For Residents */}
              <div className="experience-card-item flex flex-col justify-between rounded-3xl bg-white/90 border border-neutral-200/90 p-7 sm:p-8 hover:shadow-2xl hover:border-brand-black/30 transition-all duration-300 relative backdrop-blur-sm">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-13 h-13 rounded-2xl bg-brand-lime/30 border border-brand-lime/60 flex items-center justify-center text-brand-black">
                      <Compass size={26} strokeWidth={2.2} />
                    </div>
                    <LottieAnimation variant="house-assembly" size="sm" />
                  </div>

                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                      For Residents
                    </span>
                    <h3 className="text-2xl font-extrabold text-brand-black tracking-tight mt-1">
                      Your Next Chapter Starts Here.
                    </h3>
                  </div>

                  <p className="text-neutral-600 text-sm leading-relaxed">
                    A hostel is more than a room. It&apos;s where you study, grow, build
                    friendships, and create memories. Explore hostels, compare prices and
                    facilities, discover accommodation that fits your needs, and connect with hostel
                    owners—all in one place.
                  </p>

                  <div className="space-y-3 pt-2">
                    {[
                      'Discover hostels by location and budget.',
                      'Explore room details, photos, and facilities.',
                      'Compare your options before making a decision.',
                      'Contact hostel owners and enquire about availability.',
                      'Book or request a room through the booking options available.',
                    ].map((bullet) => (
                      <div
                        key={bullet}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700"
                      >
                        <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                          <Check size={11} strokeWidth={3} />
                        </span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 sm:pt-8 mt-6 border-t border-neutral-200/80 space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 py-1.5 px-3 rounded-lg inline-block border border-emerald-200/60">
                    Find a Place That Feels Right.
                  </p>
                  <div>
                    <CTAButton
                      href="/hostels"
                      variant="dark"
                      arrow="right"
                      className="w-full text-center py-3.5 text-sm font-bold"
                    >
                      Explore Hostels
                    </CTAButton>
                  </div>
                </div>
              </div>

              {/* Card 2: For Hostel Owners (Sleek Obsidian Chassis) */}
              <div className="experience-card-item flex flex-col justify-between rounded-3xl bg-[#0F0F10] text-white p-7 sm:p-8 border border-neutral-800 hover:shadow-2xl hover:border-brand-lime/60 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-lime/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-5 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-13 h-13 rounded-2xl bg-brand-lime text-brand-black flex items-center justify-center font-bold shadow-lime">
                      <Building2 size={26} strokeWidth={2.2} />
                    </div>
                    <LottieAnimation variant="owner-dashboard" size="sm" />
                  </div>

                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-lime">
                      For Hostel Owners
                    </span>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight mt-1">
                      Less Paperwork. More Control.
                    </h3>
                  </div>

                  <p className="text-neutral-300 text-sm leading-relaxed">
                    You built your hostel to serve people and grow your business—not to spend every
                    day searching through notebooks and scattered records. Hostel Ghar gives you a
                    dedicated dashboard to organize your operations, keep important records in one
                    place, and manage residents more efficiently.
                  </p>

                  <div className="space-y-3 pt-2">
                    {[
                      'Manage resident profiles and records.',
                      'Organize rooms and occupancy.',
                      'Track monthly fees and payment statuses.',
                      'Keep hostel expenses and records organized.',
                      'Access useful operational information through your dashboard.',
                      'Present your hostel to people actively looking for accommodation.',
                    ].map((bullet) => (
                      <div
                        key={bullet}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200"
                      >
                        <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-brand-lime/20 text-brand-lime flex items-center justify-center">
                          <Check size={11} strokeWidth={3} />
                        </span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 sm:pt-8 mt-6 border-t border-neutral-800 space-y-4 relative z-10">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-lime bg-white/5 py-1.5 px-3 rounded-lg inline-block border border-white/10 font-mono">
                    Your Hostel. Your Dashboard. Your Control.
                  </p>
                  <div className="flex flex-col gap-2.5 w-full">
                    <CTAButton
                      href="/for-owners"
                      variant="lime"
                      arrow="right"
                      className="w-full text-center justify-center !py-3 !px-4 text-xs sm:text-sm font-bold text-brand-black shadow-lime"
                    >
                      Explore Owner Dashboard
                    </CTAButton>
                    <CTAButton
                      href="/contact"
                      variant="dark-outline"
                      className="w-full text-center justify-center !py-3 !px-4 text-xs sm:text-sm font-semibold hover:border-white/30"
                    >
                      Request a Demo
                    </CTAButton>
                  </div>
                </div>
              </div>

              {/* Card 3: The Hostel Ghar Promise */}
              <div className="experience-card-item flex flex-col justify-between rounded-3xl bg-white/90 border border-neutral-200/90 p-7 sm:p-8 hover:shadow-2xl hover:border-brand-black/30 transition-all duration-300 relative backdrop-blur-sm">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-13 h-13 rounded-2xl bg-brand-lime/30 border border-brand-lime/60 text-brand-black flex items-center justify-center font-bold">
                      <ShieldCheck size={26} strokeWidth={2.2} />
                    </div>
                    <LottieAnimation variant="security-shield" size="sm" />
                  </div>

                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                      The Hostel Ghar Promise
                    </span>
                    <h3 className="text-2xl font-extrabold text-brand-black tracking-tight mt-1">
                      Safe, Verified &amp; Stress-Free.
                    </h3>
                  </div>

                  <p className="text-neutral-600 text-sm leading-relaxed">
                    Hostel Ghar was founded in Nepal to bring trust and transparency back to hostel
                    living. We personally inspect premises, verify genuine ownership, and remove
                    middlemen brokers so you can find your next home with total peace of mind.
                  </p>

                  <div className="space-y-3 pt-2">
                    {[
                      '100% physically verified properties with genuine photos.',
                      'Transparent monthly tariffs with food, Wi-Fi & electricity included.',
                      'Direct communication with hostel owners without middlemen.',
                      'Safe student environments with clear house rules and security.',
                      'Free to search and zero broker commissions for residents.',
                    ].map((bullet) => (
                      <div
                        key={bullet}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700"
                      >
                        <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-brand-lime/35 text-brand-black flex items-center justify-center">
                          <Check size={11} strokeWidth={3} />
                        </span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 sm:pt-8 mt-6 border-t border-neutral-200/80 space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-black bg-brand-lime/25 py-1.5 px-3 rounded-lg inline-block border border-brand-lime/40">
                    Peace of Mind for Every Stay.
                  </p>
                  <div>
                    <CTAButton
                      href="/about"
                      variant="light-outline"
                      arrow="right"
                      className="w-full text-center py-3.5 text-sm font-bold"
                    >
                      About Hostel Ghar
                    </CTAButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. THE WORKFLOW: GSAP PILE-UP STACKING ANIMATION ON SCROLL
           ======================================================== */}
        <WorkflowPileUp />

        {/* ========================================================
            4. ONE UNIFIED PLATFORM: INTERACTIVE DASHBOARD SUITE & VERIFICATION
           ======================================================== */}
        <DashboardInsightShowcase id="dashboards" />

        {/* ========================================================
            5. THE ADVANTAGES: WHY HOSTEL GHAR? (SQUARE GRID THEME)
           ======================================================== */}
        <section
          id="why-hostel-ghar"
          className="py-16 sm:py-20 md:py-24 bg-neutral-900 text-white relative overflow-hidden bg-square-grid-dark"
        >
          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-14">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-lime text-xs font-mono font-bold uppercase tracking-wider border border-white/10">
                <TrendingUp size={13} />
                The Advantages
              </span>
              <h2 className="scroll-reveal-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Why Hostel Ghar?
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                Designed from the ground up to solve real friction points in Nepal&apos;s hostel
                ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
              {/* 1. Less Guesswork */}
              <div className="group p-6 sm:p-7 rounded-2xl bg-neutral-800/80 border border-neutral-700/80 hover:border-brand-lime/70 hover:bg-neutral-800 transition-all duration-300 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-lime/20 text-brand-lime flex items-center justify-center group-hover:scale-110 transition-transform">
                    <HelpCircle size={20} strokeWidth={2.4} />
                  </div>
                  <span className="font-mono text-xs text-neutral-500 font-bold">SPEC.01</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Less Guesswork</h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Explore hostel information before deciding which places to contact.
                </p>
              </div>

              {/* 2. More Organization */}
              <div className="group p-6 sm:p-7 rounded-2xl bg-neutral-800/80 border border-neutral-700/80 hover:border-brand-lime/70 hover:bg-neutral-800 transition-all duration-300 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-lime/20 text-brand-lime flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FolderSync size={20} strokeWidth={2.4} />
                  </div>
                  <span className="font-mono text-xs text-neutral-500 font-bold">SPEC.02</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">More Organization</h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Bring important hostel records and management activities together.
                </p>
              </div>

              {/* 3. Better Connections */}
              <div className="group p-6 sm:p-7 rounded-2xl bg-neutral-800/80 border border-neutral-700/80 hover:border-brand-lime/70 hover:bg-neutral-800 transition-all duration-300 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-lime/20 text-brand-lime flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users size={20} strokeWidth={2.4} />
                  </div>
                  <span className="font-mono text-xs text-neutral-500 font-bold">SPEC.03</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Better Connections</h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Help residents discover accommodation and help owners reach potential residents.
                </p>
              </div>

              {/* 4. Clearer Decisions */}
              <div className="group p-6 sm:p-7 rounded-2xl bg-neutral-800/80 border border-neutral-700/80 hover:border-brand-lime/70 hover:bg-neutral-800 transition-all duration-300 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-lime/20 text-brand-lime flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp size={20} strokeWidth={2.4} />
                  </div>
                  <span className="font-mono text-xs text-neutral-500 font-bold">SPEC.04</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Clearer Decisions</h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Compare relevant details, track available records, and make more informed choices.
                </p>
              </div>

              {/* 5. One Connected Experience */}
              <div className="group p-6 sm:p-7 rounded-2xl bg-neutral-800/80 border border-neutral-700/80 hover:border-brand-lime/70 hover:bg-neutral-800 transition-all duration-300 relative md:col-span-2 lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-lime text-brand-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-lime">
                    <Layers size={20} strokeWidth={2.4} />
                  </div>
                  <span className="font-mono text-xs text-brand-lime font-bold">
                    INTEGRATED HUB
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                  One Connected Experience
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Hostel discovery and hostel management, brought together under one platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            6. GET STARTED: DUAL-LANE ACTION LAUNCHPAD
           ======================================================== */}
        <section id="get-started" className="py-16 sm:py-20 md:py-24 relative">
          <div className="container-custom max-w-5xl">
            <div className="text-center mb-10 sm:mb-12">
              <span className="inline-block px-4 py-1.5 text-xs sm:text-sm font-mono font-bold rounded-full bg-brand-lime/30 text-brand-black mb-3 border border-brand-lime/60">
                Get Started
              </span>
              <h2 className="scroll-reveal-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight">
                Your Hostel Journey Starts Here.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
              {/* Resident Choice */}
              <div className="p-7 sm:p-10 rounded-3xl bg-white/90 border border-neutral-200/90 flex flex-col justify-between hover:border-brand-black/30 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-brand-lime/30 text-brand-black flex items-center justify-center font-bold">
                      <Compass size={24} />
                    </div>
                    <LottieAnimation variant="house-assembly" size="sm" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-brand-black">
                    Looking for a place to stay?
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed">
                    Discover your options and take the first step toward finding a hostel that fits
                    your needs.
                  </p>
                </div>
                <div className="pt-6 sm:pt-8">
                  <CTAButton
                    href="/hostels"
                    variant="dark"
                    arrow="right"
                    className="w-full text-center py-3.5 sm:py-4 font-bold"
                  >
                    Find a Hostel
                  </CTAButton>
                </div>
              </div>

              {/* Owner Choice */}
              <div className="p-7 sm:p-10 rounded-3xl bg-neutral-900 text-white flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-lime/10 rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-brand-lime text-brand-black flex items-center justify-center font-bold shadow-lime">
                      <Building2 size={24} />
                    </div>
                    <LottieAnimation variant="owner-dashboard" size="sm" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Ready to manage your hostel smarter?
                  </h3>
                  <p className="text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed">
                    Explore the dashboard, see how the system works, and discover whether Hostel
                    Ghar is right for your business.
                  </p>
                </div>
                <div className="pt-6 sm:pt-8 relative z-10">
                  <CTAButton
                    href="/contact"
                    variant="lime"
                    arrow="right"
                    className="w-full text-center py-3.5 sm:py-4 font-extrabold text-brand-black shadow-lime"
                  >
                    Request a Demo
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            7. CLOSING BRAND BANNER & DISCLAIMER
           ======================================================== */}
        <section className="py-12 sm:py-16 bg-neutral-100/70 border-t border-neutral-200">
          <div className="container-custom max-w-4xl mx-auto text-center space-y-5 sm:space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-black">Hostel Ghar</h3>
            <p className="text-base sm:text-xl font-bold text-neutral-800">
              Find Your Place. Manage Your Space.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Connecting hostel discovery with smarter hostel management. Explore accommodation.
              Empower hostel owners. Build a more organized hostel experience.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2 text-xs sm:text-sm font-semibold">
              <Link
                href="/hostels"
                className="px-4 py-2 rounded-xl bg-white border border-neutral-200 text-neutral-800 hover:border-brand-black hover:bg-neutral-50 transition-all shadow-sm"
              >
                Find Hostels
              </Link>
              <span className="text-neutral-300 hidden sm:inline">•</span>
              <Link
                href="/for-owners"
                className="px-4 py-2 rounded-xl bg-white border border-neutral-200 text-neutral-800 hover:border-brand-black hover:bg-neutral-50 transition-all shadow-sm"
              >
                For Hostel Owners
              </Link>
              <span className="text-neutral-300 hidden sm:inline">•</span>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-xl bg-white border border-neutral-200 text-neutral-800 hover:border-brand-black hover:bg-neutral-50 transition-all shadow-sm"
              >
                Contact Us
              </Link>
            </div>

            <div className="pt-6 border-t border-neutral-200 max-w-3xl mx-auto">
              <p className="text-[11px] sm:text-xs text-neutral-500 italic leading-relaxed">
                Hostel Ghar helps you explore hostel options and manage hostel operations through
                role-specific experiences. Confirm availability, pricing, facilities, and booking
                arrangements directly with the hostel before making a commitment.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            MOBILE THUMB DOCK (Floating Quick Nav for Phones)
           ======================================================== */}
        <div
          className={`md:hidden fixed bottom-4 left-4 right-4 z-40 transition-all duration-300 ease-out ${
            showMobileDock
              ? 'translate-y-0 opacity-100 pointer-events-auto'
              : 'translate-y-12 opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-brand-black/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl flex items-center justify-between gap-2.5">
            <Link
              href="/hostels"
              className="flex-1 bg-brand-lime text-brand-black font-extrabold text-xs py-3 px-3 rounded-xl text-center flex items-center justify-center gap-1.5 shadow-lime active:scale-95 transition-all"
            >
              <Search size={14} strokeWidth={2.5} />
              Find Hostels
            </Link>
            <Link
              href="/for-owners"
              className="flex-1 bg-white/10 text-white font-bold text-xs py-3 px-3 rounded-xl text-center flex items-center justify-center gap-1.5 border border-white/10 hover:bg-white/20 active:scale-95 transition-all"
            >
              <Building2 size={14} strokeWidth={2.5} />
              For Owners
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
