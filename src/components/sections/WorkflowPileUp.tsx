'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  LucideIcon,
  Search,
  SlidersHorizontal,
  MessageSquare,
  LayoutDashboard,
  MapPin,
  CheckCircle2,
  Wifi,
  Utensils,
  Zap,
  ShieldCheck,
  Phone,
  Clock,
  ChevronRight,
  Wallet,
} from 'lucide-react';

interface WorkflowStepItem {
  num: string;
  title: string;
  desc: string;
  tag: string;
  icon: LucideIcon;
  themeColor: string;
}

const stepsData: WorkflowStepItem[] = [
  {
    num: '01',
    title: '1. Explore Your Options',
    desc: 'Browse hostel listings and discover accommodation that matches your location, budget, and needs.',
    tag: 'Location & Budget',
    icon: Search,
    themeColor: '#C3FF7D',
  },
  {
    num: '02',
    title: '2. Compare What Matters',
    desc: 'Review available details, facilities, room options, and published prices before contacting a hostel.',
    tag: 'Facilities & Tariffs',
    icon: SlidersHorizontal,
    themeColor: '#38bdf8',
  },
  {
    num: '03',
    title: '3. Connect With the Owner',
    desc: 'Ask questions, confirm availability and costs, and take the next step toward your stay.',
    tag: 'Direct Communication',
    icon: MessageSquare,
    themeColor: '#fbbf24',
  },
  {
    num: '04',
    title: '4. Manage With Confidence',
    desc: 'For hostel owners and authorized residents, the appropriate dashboard provides access to the information and features available to their account.',
    tag: 'Live Operations',
    icon: LayoutDashboard,
    themeColor: '#c084fc',
  },
];

const tickerWords = [
  'EXPLORE YOUR OPTIONS',
  'COMPARE WHAT MATTERS',
  'CONNECT WITH THE OWNER',
  'MANAGE WITH CONFIDENCE',
  'VERIFIED HOSTELS',
  'ZERO BROKERAGE',
  'DIRECT CONNECT',
  'NEPAL REGION',
];

export default function WorkflowPileUp() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP Pile-up ScrollTrigger animation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const cards = cardsRef.current.filter((c): c is HTMLDivElement => Boolean(c));
    if (!cards.length || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pile-up stack effect: previous cards shrink slightly and dim as next cards scroll over
      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1];
          if (nextCard) {
            ScrollTrigger.create({
              trigger: nextCard,
              start: 'top 85%',
              end: 'top 25%',
              scrub: true,
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.to(card, {
                  scale: 1 - progress * 0.05,
                  filter: `brightness(${1 - progress * 0.25})`,
                  duration: 0.1,
                  overwrite: 'auto',
                });
              },
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-16 sm:py-24 md:py-28 bg-[#FAFAFC] bg-square-grid border-y border-neutral-200/80 relative"
      style={{ overflow: 'visible' }}
    >
      {/* ========================================================
          BACKGROUND TICKER ("TICKLING") & TWINKLE ACCENTS
          (Clipped inside its own container so section overflow remains visible)
         ======================================================== */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      >
        {/* Top Floating Ticker Track */}
        <div className="absolute top-20 -left-10 right-0 opacity-[0.04] sm:opacity-[0.055]">
          <div className="flex w-max workflow-marquee-track">
            {[...tickerWords, ...tickerWords].map((word, i) => (
              <span
                key={`t1-${i}`}
                className="text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-[0.2em] text-brand-black flex items-center gap-12 pr-12 whitespace-nowrap"
              >
                <span>{word}</span>
                <span className="text-3xl sm:text-4xl text-neutral-600">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Floating Ticker Track (Reverse Direction) */}
        <div className="absolute bottom-24 -left-10 right-0 opacity-[0.035] sm:opacity-[0.05]">
          <div className="flex w-max workflow-marquee-reverse-track">
            {[...tickerWords, ...tickerWords].map((word, i) => (
              <span
                key={`t2-${i}`}
                className="text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-[0.2em] text-brand-black flex items-center gap-12 pr-12 whitespace-nowrap"
              >
                <span>{word}</span>
                <span className="text-3xl sm:text-4xl text-neutral-600">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Subtle Ambient Twinkling Dots */}
        <span className="absolute top-[18%] left-[8%] w-2 h-2 rounded-full bg-brand-lime/60 animate-pulse" />
        <span className="absolute top-[38%] right-[10%] w-1.5 h-1.5 rounded-full bg-neutral-400/40 animate-pulse duration-1000" />
        <span className="absolute top-[62%] left-[12%] w-2 h-2 rounded-full bg-brand-lime/50 animate-pulse duration-1500" />
        <span className="absolute bottom-[16%] right-[14%] w-1.5 h-1.5 rounded-full bg-neutral-400/40 animate-pulse duration-700" />
      </div>

      <div className="container-custom relative z-10" style={{ overflow: 'visible' }}>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3.5 mb-12 sm:mb-16">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
            The Workflow
          </p>

          <h2 className="scroll-reveal-heading text-3xl sm:text-4xl md:text-5xl font-black text-brand-black tracking-tight leading-tight">
            Discover. Connect. Feel at Home.
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Four simple steps designed to make finding accommodation easy and operating a hostel
            straightforward.
          </p>
        </div>

        {/* ========================================================
            BLACK CARD PILE-UP STACK CONTAINER
           ======================================================== */}
        <div className="relative max-w-4xl mx-auto pb-20" style={{ overflow: 'visible' }}>
          {stepsData.map((step, idx) => {
            const Icon = step.icon;
            // Progressive sticky top offset creates the layered pile-up deck on scroll
            const topOffset = `calc(75px + ${idx * 32}px)`;
            const isLast = idx === stepsData.length - 1;

            return (
              <div
                key={step.num}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                style={{
                  top: topOffset,
                  zIndex: idx + 10,
                  marginBottom: isLast ? '0px' : '22vh',
                }}
                className="sticky rounded-3xl border border-neutral-800 bg-[#0F0F12] text-white p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-neutral-700 backdrop-blur-xl relative overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 sm:gap-8">
                  {/* Left Column: Text & Step Details */}
                  <div className="lg:w-1/2 space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-normal">
                      {step.desc}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-lime shadow-xs" />
                      <span>Zero Intermediaries · 100% Direct Verification</span>
                    </div>
                  </div>

                  {/* Right Column: Interactive UI Showcase Mockup */}
                  <div className="lg:w-1/2 rounded-2xl border border-neutral-800 bg-neutral-950/90 p-5 shadow-inner">
                    {idx === 0 && (
                      /* Step 1 Visual: Location & Budget Search Mock */
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                          <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-400 uppercase">
                            <MapPin size={13} className="text-brand-lime" />
                            Listing Discovery
                          </span>
                          <span className="text-[11px] font-mono font-bold text-brand-lime bg-brand-lime/10 px-2 py-0.5 rounded-full border border-brand-lime/30">
                            350+ Hostels
                          </span>
                        </div>

                        <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-3 space-y-2 shadow-xs">
                          <div className="flex items-center justify-between text-xs font-bold text-white">
                            <span>Kathmandu, Banasthali</span>
                            <span className="text-neutral-400 font-normal">Boys &amp; Girls</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <span className="text-[11px] font-medium bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-md border border-neutral-700/60">
                              Rs. 8,000 - 14,000/mo
                            </span>
                            <span className="text-[11px] font-medium bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-md border border-neutral-700/60">
                              Near TU / College
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900/80 shadow-2xs">
                            <p className="font-bold text-white truncate">ABC Girls Hostel</p>
                            <p className="text-[11px] text-neutral-400">Banasthali · Rs. 10.5k</p>
                            <span className="inline-flex items-center gap-1 text-[10px] text-brand-lime font-bold mt-1">
                              <CheckCircle2 size={11} /> 2 Beds Left
                            </span>
                          </div>
                          <div className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900/80 shadow-2xs">
                            <p className="font-bold text-white truncate">
                              ABC Hostel PVT LTD
                            </p>
                            <p className="text-[11px] text-neutral-400">Boys · Rs. 11.2k</p>
                            <span className="inline-flex items-center gap-1 text-brand-lime font-bold mt-1">
                              <CheckCircle2 size={11} /> 1 Bed Left
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {idx === 1 && (
                      /* Step 2 Visual: Compare Facilities & Tariffs */
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                          <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-400 uppercase">
                            <SlidersHorizontal size={13} className="text-sky-400" />
                            Amenities &amp; Pricing
                          </span>
                          <span className="text-[11px] font-mono font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded-full border border-sky-800/60">
                            Transparent
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300">
                            <Wifi size={14} className="text-sky-400" />
                            <span className="font-medium truncate">Wi-Fi (100 Mbps)</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300">
                            <Utensils size={14} className="text-amber-400" />
                            <span className="font-medium truncate">4x Fresh Meals</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300">
                            <Zap size={14} className="text-yellow-400" />
                            <span className="font-medium truncate">24/7 Power Backup</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300">
                            <ShieldCheck size={14} className="text-emerald-400" />
                            <span className="font-medium truncate">CCTV &amp; Security</span>
                          </div>
                        </div>

                        <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-3 space-y-1.5 shadow-xs">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-white">
                              2-Seater (Shared Balcony)
                            </span>
                            <span className="font-mono font-bold text-brand-lime">
                              Rs. 10,500/mo
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400">
                            Includes meals, laundry, electricity, Wi-Fi — zero hidden charges.
                          </p>
                        </div>
                      </div>
                    )}

                    {idx === 2 && (
                      /* Step 3 Visual: Direct Communication Mock */
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                          <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-400 uppercase">
                            <MessageSquare size={13} className="text-amber-400" />
                            Direct Contact
                          </span>
                          <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800/60">
                            No Broker
                          </span>
                        </div>

                        <div className="space-y-2 rounded-xl border border-neutral-800 bg-neutral-900/90 p-3 text-xs shadow-xs">
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-[10px] text-neutral-300">
                              You
                            </span>
                            <div className="rounded-lg bg-neutral-800 border border-neutral-700/60 p-2 text-neutral-200 text-[11px] max-w-[85%]">
                              Hello! Is a 2-seater room available starting next Sunday?
                            </div>
                          </div>
                          <div className="flex items-start gap-2 justify-end">
                            <div className="rounded-lg bg-brand-lime text-brand-black font-semibold p-2 text-[11px] max-w-[85%] shadow-lime">
                              Yes, Room 204 is vacant. You are welcome for a visit today!
                            </div>
                            <span className="w-5 h-5 rounded-full bg-brand-lime flex items-center justify-center font-bold text-brand-black text-[10px] shadow-lime">
                              HG
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-xl border border-amber-900/60 bg-amber-950/40 text-xs">
                          <span className="font-semibold text-amber-200 flex items-center gap-1.5">
                            <Phone size={13} className="text-amber-400" />
                            Call Warden Directly
                          </span>
                          <span className="font-mono font-bold text-amber-300">
                            +977 98XXXXXXXX
                          </span>
                        </div>
                      </div>
                    )}

                    {idx === 3 && (
                      /* Step 4 Visual: Live Operations Dashboard Mock */
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                          <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-400 uppercase">
                            <LayoutDashboard size={13} className="text-purple-400" />
                            Dedicated Portals
                          </span>
                          <span className="text-[11px] font-mono font-bold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-800/60">
                            Enterprise &amp; Resident
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/90 shadow-2xs">
                            <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                              <span>Attendance</span>
                              <Clock size={12} className="text-emerald-400" />
                            </div>
                            <p className="font-bold text-white mt-1">Checked In</p>
                            <span className="text-[10px] text-neutral-400">Today at 8:15 AM</span>
                          </div>
                          <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/90 shadow-2xs">
                            <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                              <span>Fee Status</span>
                              <Wallet size={12} className="text-sky-400" />
                            </div>
                            <p className="font-bold text-emerald-400 mt-1">Rent Paid</p>
                            <span className="text-[10px] text-neutral-400">Receipt #HG-4821</span>
                          </div>
                        </div>

                        <div className="rounded-xl border border-neutral-800 bg-black/90 text-white p-3 space-y-1.5 shadow-sm">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono text-brand-lime font-bold">
                              LIVE OPERATIONS
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] text-neutral-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Synchronized
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-300">
                            Multi-Hostel console, daily meal tracker, attendance ledger &amp; gate
                            pass management.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Bar */}
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-neutral-300">
                    <Icon size={14} className="text-brand-lime" />
                    {step.tag}
                  </span>
                  <div className="flex items-center gap-1 text-neutral-400 group-hover:text-brand-lime transition-colors font-semibold">
                    <span>Explore Step {step.num}</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .workflow-marquee-track {
          animation: workflow-marquee 45s linear infinite;
        }
        .workflow-marquee-reverse-track {
          animation: workflow-marquee-reverse 55s linear infinite;
        }
        @keyframes workflow-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes workflow-marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
