'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Laptop,
  Smartphone,
  Layers,
  Building2,
  Users,
  CheckCircle2,
  Maximize2,
  X,
  Shield,
  ArrowRight,
  TrendingUp,
  Receipt,
  Bed,
  CalendarCheck,
  BellRing,
  Lock,
  ExternalLink,
  Sparkles,
  Wifi,
  BatteryCharging,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface DashboardInsightShowcaseProps {
  /** Initial active dashboard tab ('owner' | 'resident') */
  defaultDashboard?: 'owner' | 'resident';
  /** Whether to show the dashboard tab switchers */
  showTabs?: boolean;
  /** Custom section ID */
  id?: string;
  /** Extra wrapper classes */
  className?: string;
  /** Override title */
  title?: string;
  /** Override description */
  description?: string;
}

type DeviceMode = 'dual' | 'laptop' | 'mobile';

interface FeatureHighlight {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tag: string;
}

export default function DashboardInsightShowcase({
  defaultDashboard = 'owner',
  showTabs = true,
  id = 'dashboards',
  className,
  title,
  description,
}: DashboardInsightShowcaseProps) {
  const [activeDashboard, setActiveDashboard] = useState<'owner' | 'resident'>(defaultDashboard);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('dual');
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number>(0);

  // Sync state if defaultDashboard changes
  useEffect(() => {
    setActiveDashboard(defaultDashboard);
  }, [defaultDashboard]);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsZoomOpen(false);
    };
    if (isZoomOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isZoomOpen]);

  const dashboardData = {
    owner: {
      name: 'Hostel Owner Dashboard',
      shortName: 'Owner Dashboard',
      badge: 'For Hostel Owners & Wardens',
      image: '/images/static/hostel_ghar_owner_dashboard.png',
      alt: 'Hostel Ghar Owner Dashboard - Room occupancy, resident management, and fee tracking',
      browserUrl: 'https://app.hostelghar.com/owner/dashboard',
      tagline: 'Your complete hostel management command center on laptop & mobile.',
      summary:
        'Eliminate chaotic register notebooks and spreadsheets. Track occupied beds, manage incoming student admissions, automate monthly fee sheets, and approve gate leaves with live sync across your desktop and smartphone.',
      ctaText: 'Start Managing Your Hostel',
      ctaHref: '/for-owners',
      secondaryCta: 'Request a Demo',
      secondaryHref: '/contact',
      kpis: [
        { label: 'Real-time Occupancy', val: '100% Live' },
        { label: 'Paperwork Reduction', val: '15+ hrs/mo saved' },
        { label: 'Fee Collection', val: 'Automated Sheets' },
        { label: 'Mobile Sync', val: 'Instant Push' },
      ],
      features: [
        {
          icon: <Bed className="w-5 h-5 text-brand-black" />,
          title: 'Live Occupancy & Bed Inventory',
          desc: 'Monitor single, double, and triple sharing rooms in real-time. Know vacant beds instantly when new students visit.',
          tag: 'Real-Time Capacity',
        },
        {
          icon: <Receipt className="w-5 h-5 text-brand-black" />,
          title: 'Automated Monthly Fee Sheets',
          desc: 'Auto-calculate monthly tariffs, electricity, and meal fees. Identify dues and verify digital payments effortlessly.',
          tag: 'Zero Accounting Stress',
        },
        {
          icon: <Users className="w-5 h-5 text-brand-black" />,
          title: 'Digital Resident KYC & Records',
          desc: 'Maintain student ID cards, citizenship proofs, emergency guardian contacts, and check-in dates securely in the cloud.',
          tag: 'Verified Profiles',
        },
        {
          icon: <CalendarCheck className="w-5 h-5 text-brand-black" />,
          title: 'Leave & Gate Pass Management',
          desc: 'Review and approve resident night-out passes or holiday leaves from anywhere with one tap on your mobile phone.',
          tag: 'Remote Warden Control',
        },
      ] as FeatureHighlight[],
    },
    resident: {
      name: 'Resident & Student Dashboard',
      shortName: 'Resident Dashboard',
      badge: 'For Students & Residents',
      image: '/images/static/resident_dashboard.png',
      alt: 'Hostel Ghar Resident Dashboard - Stay details, payment history, and leave requests',
      browserUrl: 'https://app.hostelghar.com/resident/overview',
      tagline: 'Stay organized, track dues, and request passes anytime from your phone or laptop.',
      summary:
        'A dedicated, clean portal for hostel residents. Check your assigned room & bed number, view verified digital payment receipts, request gate passes directly to the warden, and stay informed with instant hostel notices.',
      ctaText: 'Explore Verified Hostels',
      ctaHref: '/hostels',
      secondaryCta: 'Resident Login',
      secondaryHref: '/login',
      kpis: [
        { label: 'Stay Status', val: 'Active & Verified' },
        { label: 'Fee Invoices', val: 'Digital Receipts' },
        { label: 'Leave Requests', val: '1-Tap Approval' },
        { label: 'Device Support', val: 'Laptop + Mobile' },
      ],
      features: [
        {
          icon: <Bed className="w-5 h-5 text-brand-black" />,
          title: 'Personal Stay & Room Hub',
          desc: 'View your room allocation, bed number, room type, check-in date, and hostel manager contact details at a glance.',
          tag: 'My Stay Info',
        },
        {
          icon: <Receipt className="w-5 h-5 text-brand-black" />,
          title: 'Fee Transparency & Receipts',
          desc: 'Clear breakdown of monthly rent, mess charges, and payment history with downloadable digital receipts.',
          tag: '100% Transparent',
        },
        {
          icon: <CalendarCheck className="w-5 h-5 text-brand-black" />,
          title: 'Digital Leave & Night-Out Passes',
          desc: 'Submit leave applications with emergency details directly to the warden and receive real-time approval status.',
          tag: 'Instant Approvals',
        },
        {
          icon: <BellRing className="w-5 h-5 text-brand-black" />,
          title: 'Notices & Mess Timetable',
          desc: 'Never miss breakfast, lunch, or dinner schedules. Stay updated on building maintenance and warden notices.',
          tag: 'Stay Connected',
        },
      ] as FeatureHighlight[],
    },
  };

  const current = dashboardData[activeDashboard];

  return (
    <section id={id} className={cn('py-16 sm:py-20 md:py-28 relative overflow-hidden', className)}>
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3.5 mb-10 sm:mb-14">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
            Interactive Platform Insight
          </p>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight leading-tight">
            {title || 'See the Dashboards in Action'}
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {description ||
              'Discover how Hostel Ghar empowers both hostel owners and residents with intuitive, role-tailored dashboards—crafted to work seamlessly across laptops and mobile devices.'}
          </p>
        </div>

        {/* Dashboard Role Switcher Tabs */}
        {showTabs && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto mb-8 sm:mb-10 p-1.5 bg-neutral-100/90 rounded-2xl border border-neutral-200/90 shadow-inner">
            <button
              type="button"
              onClick={() => {
                setActiveDashboard('owner');
                setActiveFeature(0);
              }}
              className={cn(
                'w-full sm:w-1/2 flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300',
                activeDashboard === 'owner'
                  ? 'bg-brand-black text-brand-lime shadow-md shadow-brand-black/10 scale-[1.01]'
                  : 'text-neutral-600 hover:text-brand-black hover:bg-white/60'
              )}
            >
              <Building2
                size={17}
                className={activeDashboard === 'owner' ? 'text-brand-lime' : 'text-neutral-500'}
              />
              <span>Owner Dashboard</span>
              <span
                className={cn(
                  'text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-md font-semibold',
                  activeDashboard === 'owner'
                    ? 'bg-brand-lime/20 text-brand-lime'
                    : 'bg-neutral-200 text-neutral-600'
                )}
              >
                Operators
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveDashboard('resident');
                setActiveFeature(0);
              }}
              className={cn(
                'w-full sm:w-1/2 flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300',
                activeDashboard === 'resident'
                  ? 'bg-brand-black text-brand-lime shadow-md shadow-brand-black/10 scale-[1.01]'
                  : 'text-neutral-600 hover:text-brand-black hover:bg-white/60'
              )}
            >
              <Users
                size={17}
                className={activeDashboard === 'resident' ? 'text-brand-lime' : 'text-neutral-500'}
              />
              <span>Resident Dashboard</span>
              <span
                className={cn(
                  'text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-md font-semibold',
                  activeDashboard === 'resident'
                    ? 'bg-brand-lime/20 text-brand-lime'
                    : 'bg-neutral-200 text-neutral-600'
                )}
              >
                Tenants
              </span>
            </button>
          </div>
        )}

        {/* Device Viewport Selector & Quick Insight Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 max-w-5xl mx-auto mb-6 px-1">
          {/* Active Dashboard Title / Tagline */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                {current.badge}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={13} />
                Fully Responsive
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-brand-black">{current.name}</h3>
          </div>

          {/* Device Switcher Pills: Dual, Laptop, Mobile */}
          <div className="inline-flex items-center gap-1 p-1 bg-white rounded-xl border border-neutral-200 shadow-xs">
            <button
              type="button"
              onClick={() => setDeviceMode('dual')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
                deviceMode === 'dual'
                  ? 'bg-brand-lime text-brand-black shadow-xs'
                  : 'text-neutral-600 hover:text-brand-black hover:bg-neutral-100'
              )}
              title="Show Laptop and Mobile together"
            >
              <Layers size={14} />
              <span className="hidden sm:inline">Laptop &amp; Mobile</span>
              <span className="sm:hidden">Both</span>
            </button>

            <button
              type="button"
              onClick={() => setDeviceMode('laptop')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
                deviceMode === 'laptop'
                  ? 'bg-brand-lime text-brand-black shadow-xs'
                  : 'text-neutral-600 hover:text-brand-black hover:bg-neutral-100'
              )}
              title="Full Laptop Display"
            >
              <Laptop size={14} />
              <span>Laptop</span>
            </button>

            <button
              type="button"
              onClick={() => setDeviceMode('mobile')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
                deviceMode === 'mobile'
                  ? 'bg-brand-lime text-brand-black shadow-xs'
                  : 'text-neutral-600 hover:text-brand-black hover:bg-neutral-100'
              )}
              title="Focused Mobile Display"
            >
              <Smartphone size={14} />
              <span>Mobile</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            INTERACTIVE DEVICE SHOWCASE STAGE
           ======================================================== */}
        <div className="relative max-w-5xl mx-auto rounded-3xl bg-neutral-950 p-4 sm:p-7 md:p-10 border border-neutral-800 shadow-2xl overflow-hidden">
          {/* Action Bar inside Showcase Header */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-neutral-800/80 mb-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-brand-lime font-mono text-[11px] font-bold">
                LIVE PREVIEW
              </span>
              <span className="text-neutral-400 text-xs hidden sm:inline">
                {deviceMode === 'dual'
                  ? 'Showing synchronized view on Laptop & Mobile'
                  : deviceMode === 'laptop'
                    ? 'Showing high-resolution laptop view'
                    : 'Showing touch-optimized mobile viewport'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsZoomOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-all hover:text-white"
                title="Expand full-size preview"
              >
                <Maximize2 size={13} />
                <span>Inspect Fullscreen</span>
              </button>
            </div>
          </div>

          {/* STAGE CONTAINER WITH DEVICES */}
          <div className="relative z-10 min-h-[360px] sm:min-h-[460px] md:min-h-[520px] flex items-center justify-center">
            {/* --------------------------------------------------------
                LAPTOP MOCKUP CHASSIS
               -------------------------------------------------------- */}
            {(deviceMode === 'dual' || deviceMode === 'laptop') && (
              <div
                className={cn(
                  'transition-all duration-500 ease-out flex flex-col items-center',
                  deviceMode === 'dual' ? 'w-full lg:w-[86%] mr-0 lg:-mr-12' : 'w-full max-w-4xl'
                )}
              >
                {/* Laptop Screen Bezel */}
                <div className="w-full rounded-t-2xl sm:rounded-t-3xl border-[6px] sm:border-[10px] md:border-[12px] border-[#18181D] bg-[#0E0E12] shadow-2xl relative overflow-hidden ring-1 ring-white/10">
                  {/* Laptop Top Camera & Bezel Indicator */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 border border-neutral-700" />
                    <span className="w-1 h-1 rounded-full bg-emerald-400/80" />
                  </div>

                  {/* Browser Chrome Header */}
                  <div className="bg-[#1C1C22] px-3 sm:px-4 py-2 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400 select-none">
                    {/* Window Controls */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block shadow-xs" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block shadow-xs" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block shadow-xs" />
                    </div>

                    {/* URL Bar */}
                    <div className="flex-1 max-w-xs sm:max-w-md mx-2 bg-[#0E0E12] px-3 py-1 rounded-md text-[11px] sm:text-xs font-mono text-neutral-300 flex items-center justify-center gap-1.5 border border-neutral-800">
                      <Lock size={11} className="text-emerald-400" />
                      <span className="truncate">{current.browserUrl}</span>
                    </div>

                    {/* Badge */}
                    <span className="hidden md:inline-block text-[10px] font-mono text-brand-lime font-bold uppercase tracking-wider">
                      Hostel Ghar v2.0
                    </span>
                  </div>

                  {/* Screen Viewport with Dashboard Image */}
                  <div
                    onClick={() => setIsZoomOpen(true)}
                    className="relative bg-neutral-950 aspect-[16/9] sm:aspect-[16/8.5] w-full cursor-zoom-in group overflow-hidden"
                  >
                    <Image
                      src={current.image}
                      alt={current.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 1000px"
                      priority
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                    />

                    {/* Subtle Glass Reflection Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] pointer-events-none" />

                    {/* Hover Prompt */}
                    <div className="absolute inset-0 bg-brand-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs sm:text-sm backdrop-blur-[2px]">
                      <span className="px-4 py-2 rounded-xl bg-brand-black/80 border border-white/20 shadow-xl flex items-center gap-2">
                        <Maximize2 size={15} className="text-brand-lime" />
                        Click to view high-resolution dashboard
                      </span>
                    </div>

                    {/* Interactive Feature Pulse Tags (Desktop Preview) */}
                    <div className="absolute bottom-3 left-3 hidden sm:flex items-center gap-2 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-lg bg-brand-black/85 text-brand-lime border border-brand-lime/40 font-mono text-[11px] font-bold shadow-md backdrop-blur-md">
                        ●{' '}
                        {activeDashboard === 'owner' ? 'Owner Operations Hub' : 'Student Stay Hub'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Laptop Keyboard Base & Hinge */}
                <div className="w-[102%] sm:w-[104%] h-3 sm:h-4 bg-gradient-to-b from-[#24242A] to-[#141418] rounded-b-xl shadow-2xl border-t border-neutral-700/60 relative flex justify-center items-start">
                  <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-[#0C0C10] rounded-b-md shadow-inner" />
                </div>
              </div>
            )}

            {/* --------------------------------------------------------
                MOBILE SMARTPHONE MOCKUP CHASSIS
               -------------------------------------------------------- */}
            {(deviceMode === 'dual' || deviceMode === 'mobile') && (
              <div
                className={cn(
                  'transition-all duration-500 ease-out',
                  deviceMode === 'dual'
                    ? 'absolute -bottom-4 right-0 sm:right-4 md:right-8 z-30 w-[190px] sm:w-[220px] md:w-[250px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]'
                    : 'w-[280px] sm:w-[320px] max-w-full my-4 z-20'
                )}
              >
                {/* Phone Outer Chassis */}
                <div className="rounded-[2.4rem] sm:rounded-[2.8rem] border-[6px] sm:border-[8px] border-[#222228] bg-[#0A0A0E] shadow-2xl overflow-hidden ring-1 ring-white/15 relative">
                  {/* Dynamic Island / Top Speaker Pill */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 w-20 sm:w-24 h-4 bg-black rounded-full flex items-center justify-end px-2 border border-neutral-800">
                    <span className="w-2 h-2 rounded-full bg-[#1A1A22] border border-neutral-700 mr-1" />
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  </div>

                  {/* Phone Status Bar (Time, Wifi, Battery) */}
                  <div className="pt-2 px-4 pb-1 flex items-center justify-between text-[10px] text-neutral-300 font-mono bg-black/80 select-none relative z-20">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <Wifi size={10} />
                      <span className="text-[9px] font-bold">5G</span>
                      <BatteryCharging size={11} className="text-emerald-400" />
                    </div>
                  </div>

                  {/* Phone Screen Viewport */}
                  <div
                    onClick={() => setIsZoomOpen(true)}
                    className="relative bg-neutral-950 aspect-[9/18.5] w-full cursor-zoom-in group overflow-hidden"
                  >
                    <Image
                      src={current.image}
                      alt={`${current.name} on mobile screen`}
                      fill
                      sizes="320px"
                      className="object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient Fade for Bottom of Phone Screen */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Mobile Feature Badge */}
                    <div className="absolute bottom-6 left-2 right-2 p-2 rounded-xl bg-brand-black/90 border border-brand-lime/40 text-left shadow-lg backdrop-blur-md">
                      <div className="flex items-center gap-1.5 text-brand-lime text-[10px] font-bold font-mono">
                        <Smartphone size={11} />
                        <span>MOBILE READY</span>
                      </div>
                      <p className="text-[11px] text-white font-bold leading-tight mt-0.5">
                        {activeDashboard === 'owner'
                          ? 'Manage anytime on your phone'
                          : 'Student portal on the go'}
                      </p>
                    </div>

                    {/* Bottom Home Indicator Bar */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/40 rounded-full z-30" />
                  </div>
                </div>

                {/* Device Pill Tag under Mobile Frame in Dual Mode */}
                {deviceMode === 'dual' && (
                  <div className="mt-2 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-lime/20 text-brand-lime text-[10px] font-mono font-bold border border-brand-lime/40 shadow-xs">
                      <Smartphone size={10} />
                      Phone &amp; Tablet Ready
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Metrics Ticker inside Showcase */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-neutral-800">
            {current.kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="p-3 sm:p-3.5 rounded-xl bg-white/5 border border-white/10 text-center backdrop-blur-sm"
              >
                <p className="text-brand-lime text-base sm:text-lg font-extrabold tracking-tight">
                  {kpi.val}
                </p>
                <p className="text-[11px] sm:text-xs text-neutral-400 font-medium mt-0.5">
                  {kpi.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            FEATURE INSIGHT SPOTLIGHT CARDS
           ======================================================== */}
        <div className="max-w-5xl mx-auto mt-10 sm:mt-14 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-neutral-200 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                Deep Dive Insights
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-brand-black">
                What you can do with the {current.shortName}
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 max-w-md">
              Engineered with feedback from 500+ hostel owners and residents in Kathmandu, Pokhara,
              and Lalitpur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {current.features.map((feat, idx) => (
              <div
                key={feat.title}
                onClick={() => setActiveFeature(idx)}
                className={cn(
                  'p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between',
                  activeFeature === idx
                    ? 'bg-white border-brand-black shadow-lg ring-2 ring-brand-lime/70 -translate-y-1'
                    : 'bg-white/80 border-neutral-200/90 shadow-sm hover:border-neutral-300 hover:shadow-md'
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-lime/30 flex items-center justify-center font-bold">
                      {feat.icon}
                    </div>
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">
                      0{idx + 1}
                    </span>
                  </div>

                  <h5 className="font-extrabold text-brand-black text-sm sm:text-base leading-snug mb-1.5">
                    {feat.title}
                  </h5>

                  <p className="text-xs text-neutral-600 leading-relaxed">{feat.desc}</p>
                </div>

                <div className="pt-4 mt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    {feat.tag}
                  </span>
                  <CheckCircle2 size={14} className="text-emerald-600" />
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="p-6 rounded-2xl bg-neutral-100/90 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-extrabold text-brand-black text-sm sm:text-base">
                Ready to experience the {current.name}?
              </p>
              <p className="text-xs sm:text-sm text-neutral-600">{current.tagline}</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
              <Link
                href={current.ctaHref}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-black text-brand-lime font-bold text-xs sm:text-sm shadow-md hover:bg-neutral-800 transition-all"
              >
                <span>{current.ctaText}</span>
                <ArrowRight size={15} />
              </Link>

              <Link
                href={current.secondaryHref}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-neutral-300 text-brand-black font-semibold text-xs sm:text-sm hover:border-brand-black hover:bg-neutral-50 transition-all shadow-xs"
              >
                <span>{current.secondaryCta}</span>
              </Link>
            </div>
          </div>

          {/* Verification Hub Trust Banner */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white/90 border border-neutral-200/90 shadow-sm backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-lime text-brand-black flex items-center justify-center font-bold shadow-lime flex-shrink-0">
                <Shield className="w-6 h-6 text-brand-black" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h5 className="text-base sm:text-lg font-extrabold text-brand-black">
                    The Verification Hub &amp; Safety Assurance
                  </h5>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                    PHYSICALLY AUDITED
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl">
                  Every listed hostel is audited on-ground with verified owner identities, honest
                  photos, transparent monthly charges, and direct communication with zero middleman
                  fees.
                </p>
              </div>
            </div>

            <Link
              href="/about"
              className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs whitespace-nowrap transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Learn About Verification</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================
          FULLSCREEN LIGHTBOX MODAL (FOR DEEP INSPECTION)
         ======================================================== */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-fade-in"
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between pb-3 text-white max-w-7xl mx-auto w-full">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-lime" />
                <h4 className="text-sm sm:text-base font-extrabold">{current.name}</h4>
                <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
                  — High Resolution Dashboard Preview
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">{current.browserUrl}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <X size={16} />
                <span className="hidden sm:inline">Close (Esc)</span>
              </button>
            </div>
          </div>

          {/* Lightbox Body: Full Dashboard Image */}
          <div className="flex-1 relative max-w-7xl mx-auto w-full rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-950 flex items-center justify-center">
            <Image src={current.image} alt={current.alt} fill className="object-contain" priority />
          </div>

          {/* Lightbox Footer */}
          <div className="pt-3 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-2">
            <span>
              💡 Tip: The dashboard dynamically adapts whether viewed on an iPhone, Android,
              MacBook, or desktop monitor.
            </span>
            <Link
              href={current.ctaHref}
              className="text-brand-lime font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>{current.ctaText}</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
