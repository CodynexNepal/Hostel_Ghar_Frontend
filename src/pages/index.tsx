import React from 'react';
import Link from 'next/link';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import Seo from '@/components/seo/Seo';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, howToJsonLd } from '@/lib/seo/jsonLd';
import { getPageMeta } from '@/lib/seo/metadata';
import { Section, CTAButton, SectionHeader } from '@/components/ui/Section';
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
  Eye,
  FileCheck2,
  FolderSync,
  HelpCircle,
  TrendingUp,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export default function Home() {
  const meta = getPageMeta('/');

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

      <main className="min-h-screen bg-white">
        <Header />

        {/* 1. HERO SECTION */}
        <Section
          tone="tint"
          spacing="lg"
          className="relative overflow-hidden pt-16 md:pt-24 pb-16 md:pb-24 border-b border-neutral-100"
        >
          <div className="max-w-4xl mx-auto text-center space-y-7 animate-slide-up">
            {/* Tagline / Eyebrow */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-lime/30 text-brand-black text-sm font-bold tracking-tight shadow-sm border border-brand-lime/60">
                <Sparkles size={16} className="text-brand-black" />
                Nepal&apos;s hostel discovery and management platform.
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-brand-black leading-[1.12] tracking-tight">
              Find Your Place.{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Manage Your Space.</span>
                <span className="absolute bottom-2 left-0 right-0 h-3.5 bg-brand-lime/60 -z-0 rounded-sm"></span>
              </span>
            </h1>

            {/* Subtitle / Lead Paragraph */}
            <div className="space-y-4 max-w-3xl mx-auto text-neutral-600 text-base md:text-xl leading-relaxed font-normal">
              <p className="font-medium text-neutral-800 text-lg md:text-xl">
                Finding a hostel should feel exciting, not overwhelming. Managing one should feel
                organized, not exhausting.
              </p>
              <p className="text-sm md:text-base text-neutral-600">
                Hostel Ghar brings hostel discovery, room enquiries, resident management, and hostel
                operations into one connected platform—making it easier for residents to find their
                next place to call home and for hostel owners to run their businesses with
                confidence.
              </p>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <CTAButton
                href="/hostels"
                variant="dark"
                arrow="right"
                className="text-sm md:text-base"
              >
                Find Your Hostel
              </CTAButton>
              <CTAButton
                href="/for-owners"
                variant="lime"
                arrow="right"
                className="text-sm md:text-base"
              >
                Manage Your Hostel
              </CTAButton>
            </div>

            {/* Quick Metrics & Pillars */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8 max-w-2xl mx-auto text-left">
              <div className="p-4 rounded-2xl bg-white/70 border border-neutral-200/80 shadow-sm backdrop-blur-sm">
                <p className="text-2xl md:text-3xl font-extrabold text-brand-black">500+</p>
                <p className="text-xs md:text-sm text-neutral-500 font-medium">Verified Hostels</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/70 border border-neutral-200/80 shadow-sm backdrop-blur-sm">
                <p className="text-2xl md:text-3xl font-extrabold text-brand-black">50+</p>
                <p className="text-xs md:text-sm text-neutral-500 font-medium">
                  Cities Across Nepal
                </p>
              </div>
              <div className="col-span-2 md:col-span-1 p-4 rounded-2xl bg-white/70 border border-neutral-200/80 shadow-sm backdrop-blur-sm">
                <p className="text-2xl md:text-3xl font-extrabold text-brand-black">10,000+</p>
                <p className="text-xs md:text-sm text-neutral-500 font-medium">
                  Students &amp; Travelers
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* 2. SECTION: MORE THAN A HOSTEL (FOR RESIDENTS, FOR OWNERS, FOR ADMINS) */}
        <Section tone="white" spacing="lg" id="perspectives">
          <SectionHeader
            eyebrow="Three Connected Experiences"
            title="More Than a Hostel. A Better Way to Live and Manage."
            description="Whether you're searching for a comfortable place to stay or looking for a smarter way to run your hostel, Hostel Ghar brings the experience together."
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Card 1: For Residents */}
            <div className="flex flex-col justify-between rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 hover:shadow-xl hover:border-brand-black/20 transition-all duration-300">
              <div className="space-y-5">
                <div className="w-13 h-13 rounded-2xl bg-brand-lime/30 border border-brand-lime/60 flex items-center justify-center text-brand-black">
                  <Compass size={26} strokeWidth={2.2} />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    For Residents
                  </span>
                  <h3 className="text-2xl font-extrabold text-brand-black tracking-tight mt-1">
                    Your Next Chapter Starts Here.
                  </h3>
                </div>

                <p className="text-neutral-600 text-sm leading-relaxed">
                  A hostel is more than a room. It&apos;s where you study, grow, build friendships,
                  and create memories. Explore hostels, compare prices and facilities, discover
                  accommodation that fits your needs, and connect with hostel owners—all in one
                  place.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    'Discover hostels by location and budget.',
                    'Explore room details, photos, and facilities.',
                    'Compare your options before making a decision.',
                    'Contact hostel owners and enquire about availability.',
                    'Book or request a room through the booking options available.',
                  ].map((bullet) => (
                    <div key={bullet} className="flex items-start gap-2.5 text-sm text-neutral-700">
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-neutral-200/80 space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 py-1.5 px-3 rounded-lg inline-block border border-emerald-200/60">
                  Find a Place That Feels Right.
                </p>
                <div>
                  <CTAButton
                    href="/hostels"
                    variant="dark"
                    arrow="right"
                    className="w-full text-center py-3.5"
                  >
                    Explore Hostels
                  </CTAButton>
                </div>
              </div>
            </div>

            {/* Card 2: For Hostel Owners */}
            <div className="flex flex-col justify-between rounded-3xl bg-neutral-900 text-white p-8 border border-neutral-800 hover:shadow-2xl hover:border-brand-lime/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-lime/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="space-y-5 relative z-10">
                <div className="w-13 h-13 rounded-2xl bg-brand-lime text-brand-black flex items-center justify-center font-bold">
                  <Building2 size={26} strokeWidth={2.2} />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-lime">
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
                    <div key={bullet} className="flex items-start gap-2.5 text-sm text-neutral-200">
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-brand-lime/20 text-brand-lime flex items-center justify-center">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-neutral-800 space-y-4 relative z-10">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-lime bg-white/5 py-1.5 px-3 rounded-lg inline-block border border-white/10">
                  Your Hostel. Your Dashboard. Your Control.
                </p>
                <div className="flex flex-col gap-3 w-full">
                  <CTAButton
                    href="/for-owners"
                    variant="lime"
                    arrow="right"
                    className="w-full text-center justify-center !py-3 !px-4 text-xs sm:text-sm font-bold"
                  >
                    Explore Owner Dashboard
                  </CTAButton>
                  <CTAButton
                    href="/contact"
                    variant="dark-outline"
                    className="w-full text-center justify-center !py-3 !px-4 text-xs sm:text-sm font-semibold"
                  >
                    Request a Demo
                  </CTAButton>
                </div>
              </div>
            </div>

            {/* Card 3: The Hostel Ghar Promise */}
            <div className="flex flex-col justify-between rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 hover:shadow-xl hover:border-brand-black/20 transition-all duration-300">
              <div className="space-y-5">
                <div className="w-13 h-13 rounded-2xl bg-brand-lime/30 border border-brand-lime/60 text-brand-black flex items-center justify-center font-bold">
                  <ShieldCheck size={26} strokeWidth={2.2} />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
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
                    <div key={bullet} className="flex items-start gap-2.5 text-sm text-neutral-700">
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-brand-lime/35 text-brand-black flex items-center justify-center">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-neutral-200/80 space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-black bg-brand-lime/25 py-1.5 px-3 rounded-lg inline-block border border-brand-lime/40">
                  Peace of Mind for Every Stay.
                </p>
                <div>
                  <CTAButton
                    href="/about"
                    variant="light-outline"
                    arrow="right"
                    className="w-full text-center py-3.5"
                  >
                    About Hostel Ghar
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 3. SECTION: DISCOVER. CONNECT. FEEL AT HOME. (HOW IT WORKS) */}
        <Section tone="gray" spacing="lg" id="how-it-works">
          <SectionHeader
            eyebrow="The Workflow"
            title="Discover. Connect. Feel at Home."
            description="Four simple steps designed to make finding accommodation easy and operating a hostel straightforward."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest">
                  Step 01
                </span>
                <div className="w-10 h-10 rounded-xl bg-brand-lime/25 text-brand-black flex items-center justify-center">
                  <Search size={18} strokeWidth={2.4} />
                </div>
              </div>
              <h4 className="text-xl font-bold text-brand-black mb-2">1. Explore Your Options</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Browse hostel listings and discover accommodation that matches your location,
                budget, and needs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest">
                  Step 02
                </span>
                <div className="w-10 h-10 rounded-xl bg-brand-lime/25 text-brand-black flex items-center justify-center">
                  <SlidersHorizontal size={18} strokeWidth={2.4} />
                </div>
              </div>
              <h4 className="text-xl font-bold text-brand-black mb-2">2. Compare What Matters</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Review available details, facilities, room options, and published prices before
                contacting a hostel.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest">
                  Step 03
                </span>
                <div className="w-10 h-10 rounded-xl bg-brand-lime/25 text-brand-black flex items-center justify-center">
                  <MessageSquare size={18} strokeWidth={2.4} />
                </div>
              </div>
              <h4 className="text-xl font-bold text-brand-black mb-2">3. Connect With the Owner</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Ask questions, confirm availability and costs, and take the next step toward your
                stay.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest">
                  Step 04
                </span>
                <div className="w-10 h-10 rounded-xl bg-brand-lime/25 text-brand-black flex items-center justify-center">
                  <LayoutDashboard size={18} strokeWidth={2.4} />
                </div>
              </div>
              <h4 className="text-xl font-bold text-brand-black mb-2">4. Manage With Confidence</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                For hostel owners and authorized residents, the appropriate dashboard provides
                access to the information and features available to their account.
              </p>
            </div>
          </div>
        </Section>

        {/* 4. SECTION: EVERYTHING CONNECTED. EVERYONE EMPOWERED. (THE THREE DASHBOARDS) */}
        <Section tone="white" spacing="lg" id="dashboards">
          <SectionHeader
            eyebrow="One Unified Platform"
            title="Everything Connected. Everyone Empowered."
            description="One platform, designed around three experiences."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* The Resident Dashboard */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:bg-neutral-100/60 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-lime/30 text-brand-black flex items-center justify-center font-bold">
                  <Users size={24} />
                </div>
                <h3 className="text-2xl font-extrabold text-brand-black tracking-tight">
                  The Resident Dashboard
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Access the resident features available to your account, review relevant
                  information, and stay connected with your hostel.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-neutral-200 text-xs font-semibold text-neutral-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Room, stay &amp; enquiry access
              </div>
            </div>

            {/* The Hostel Owner Dashboard */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:bg-neutral-100/60 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-lime text-brand-black flex items-center justify-center font-bold">
                  <Building2 size={24} />
                </div>
                <h3 className="text-2xl font-extrabold text-brand-black tracking-tight">
                  The Hostel Owner Dashboard
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Keep resident information, room records, fee tracking, and other supported hostel
                  operations organized in one place.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-neutral-200 text-xs font-semibold text-neutral-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Occupancy, dues &amp; operations
              </div>
            </div>

            {/* The Verification & Safety Guarantee */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:bg-neutral-100/60 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-lime text-brand-black flex items-center justify-center font-bold">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-2xl font-extrabold text-brand-black tracking-tight">
                  The Verification Hub
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  On-ground property audits, verified owner badges, transparent pricing standards,
                  and 24/7 student emergency support across Nepal.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-neutral-200 text-xs font-semibold text-neutral-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Physical audits &amp; safety assurance
              </div>
            </div>
          </div>

          {/* Community Trust Callout */}
          <div className="mt-10 p-6 rounded-2xl bg-brand-lime/15 border border-brand-lime/40 text-center max-w-3xl mx-auto">
            <p className="text-sm md:text-base font-semibold text-brand-black">
              Connecting students, guardians, and verified hostel owners across Nepal for a safer,
              more transparent living experience.
            </p>
          </div>
        </Section>

        {/* 5. SECTION: WHY HOSTEL GHAR? */}
        <Section tone="gray" spacing="lg" id="why-hostel-ghar">
          <SectionHeader
            eyebrow="The Advantages"
            title="Why Hostel Ghar?"
            description="Designed from the ground up to solve real friction points in Nepal's hostel ecosystem."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* 1. Less Guesswork */}
            <div className="p-7 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-lime/25 text-brand-black flex items-center justify-center mb-4">
                <HelpCircle size={20} strokeWidth={2.4} />
              </div>
              <h4 className="text-xl font-bold text-brand-black mb-2">Less Guesswork</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Explore hostel information before deciding which places to contact.
              </p>
            </div>

            {/* 2. More Organization */}
            <div className="p-7 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-lime/25 text-brand-black flex items-center justify-center mb-4">
                <FolderSync size={20} strokeWidth={2.4} />
              </div>
              <h4 className="text-xl font-bold text-brand-black mb-2">More Organization</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Bring important hostel records and management activities together.
              </p>
            </div>

            {/* 3. Better Connections */}
            <div className="p-7 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-lime/25 text-brand-black flex items-center justify-center mb-4">
                <Users size={20} strokeWidth={2.4} />
              </div>
              <h4 className="text-xl font-bold text-brand-black mb-2">Better Connections</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Help residents discover accommodation and help owners reach potential residents.
              </p>
            </div>

            {/* 4. Clearer Decisions */}
            <div className="p-7 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-lime/25 text-brand-black flex items-center justify-center mb-4">
                <TrendingUp size={20} strokeWidth={2.4} />
              </div>
              <h4 className="text-xl font-bold text-brand-black mb-2">Clearer Decisions</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Compare relevant details, track available records, and make more informed choices.
              </p>
            </div>

            {/* 5. One Connected Experience */}
            <div className="p-7 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-all md:col-span-2 lg:col-span-2">
              <div className="w-10 h-10 rounded-xl bg-brand-lime/25 text-brand-black flex items-center justify-center mb-4">
                <Layers size={20} strokeWidth={2.4} />
              </div>
              <h4 className="text-xl font-bold text-brand-black mb-2">One Connected Experience</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Hostel discovery and hostel management, brought together under one platform.
              </p>
            </div>
          </div>
        </Section>

        {/* 6. SECTION: YOUR HOSTEL JOURNEY STARTS HERE (DUAL CTAS) */}
        <Section tone="white" spacing="lg" id="get-started">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full bg-brand-lime/20 text-brand-black mb-3">
                Get Started
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-brand-black tracking-tight">
                Your Hostel Journey Starts Here.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Resident Choice */}
              <div className="p-8 md:p-10 rounded-3xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between hover:border-brand-black/20 hover:shadow-lg transition-all">
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-lime/30 text-brand-black flex items-center justify-center font-bold">
                    <Compass size={22} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-brand-black">
                    Looking for a place to stay?
                  </h3>
                  <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                    Discover your options and take the first step toward finding a hostel that fits
                    your needs.
                  </p>
                </div>
                <div className="pt-8">
                  <CTAButton
                    href="/hostels"
                    variant="dark"
                    arrow="right"
                    className="w-full text-center py-4"
                  >
                    Find a Hostel
                  </CTAButton>
                </div>
              </div>

              {/* Owner Choice */}
              <div className="p-8 md:p-10 rounded-3xl bg-neutral-900 text-white flex flex-col justify-between hover:shadow-xl transition-all">
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-lime text-brand-black flex items-center justify-center font-bold">
                    <Building2 size={22} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">
                    Ready to manage your hostel smarter?
                  </h3>
                  <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                    Explore the dashboard, see how the system works, and discover whether Hostel
                    Ghar is right for your business.
                  </p>
                </div>
                <div className="pt-8">
                  <CTAButton
                    href="/contact"
                    variant="lime"
                    arrow="right"
                    className="w-full text-center py-4"
                  >
                    Request a Demo
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 7. CLOSING BRAND BANNER & DISCLAIMER */}
        <Section tone="tint" spacing="md" className="border-t border-neutral-200">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-extrabold text-brand-black">Hostel Ghar</h3>
            <p className="text-lg md:text-xl font-bold text-neutral-800">
              Find Your Place. Manage Your Space.
            </p>
            <p className="text-sm md:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Connecting hostel discovery with smarter hostel management. Explore accommodation.
              Empower hostel owners. Build a more organized hostel experience.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-sm font-semibold">
              <Link
                href="/hostels"
                className="px-4 py-2 rounded-lg bg-white border border-neutral-200 text-neutral-800 hover:border-brand-black transition-all"
              >
                Find Hostels
              </Link>
              <span className="text-neutral-300">•</span>
              <Link
                href="/for-owners"
                className="px-4 py-2 rounded-lg bg-white border border-neutral-200 text-neutral-800 hover:border-brand-black transition-all"
              >
                For Hostel Owners
              </Link>
              <span className="text-neutral-300">•</span>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-lg bg-white border border-neutral-200 text-neutral-800 hover:border-brand-black transition-all"
              >
                Contact Us
              </Link>
            </div>

            <div className="pt-6 border-t border-neutral-200/60 max-w-3xl mx-auto">
              <p className="text-xs text-neutral-500 italic leading-relaxed">
                Hostel Ghar helps you explore hostel options and manage hostel operations through
                role-specific experiences. Confirm availability, pricing, facilities, and booking
                arrangements directly with the hostel before making a commitment.
              </p>
            </div>
          </div>
        </Section>

        <Footer />
      </main>
    </>
  );
}
