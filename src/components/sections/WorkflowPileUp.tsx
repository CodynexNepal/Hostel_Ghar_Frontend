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
  ArrowRight,
  Sliders,
  Sparkles,
  Wifi,
  Utensils,
  Zap,
  ShieldCheck,
  Phone,
  BedDouble,
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
  accentBg: string;
  accentBorder: string;
}

const stepsData: WorkflowStepItem[] = [
  {
    num: '01',
    title: '1. Explore Your Options',
    desc: 'Browse hostel listings and discover accommodation that matches your location, budget, and needs.',
    tag: 'Location & Budget',
    icon: Search,
    themeColor: '#010101',
    accentBg: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
    accentBorder: 'hover:border-emerald-500/40',
  },
  {
    num: '02',
    title: '2. Compare What Matters',
    desc: 'Review available details, facilities, room options, and published prices before contacting a hostel.',
    tag: 'Facilities & Tariffs',
    icon: SlidersHorizontal,
    themeColor: '#010101',
    accentBg: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
    accentBorder: 'hover:border-blue-500/40',
  },
  {
    num: '03',
    title: '3. Connect With the Owner',
    desc: 'Ask questions, confirm availability and costs, and take the next step toward your stay.',
    tag: 'Direct Communication',
    icon: MessageSquare,
    themeColor: '#010101',
    accentBg: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
    accentBorder: 'hover:border-amber-500/40',
  },
  {
    num: '04',
    title: '4. Manage With Confidence',
    desc: 'For hostel owners and authorized residents, the appropriate dashboard provides access to the information and features available to their account.',
    tag: 'Live Operations',
    icon: LayoutDashboard,
    themeColor: '#010101',
    accentBg: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
    accentBorder: 'hover:border-purple-500/40',
  },
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
              start: 'top 75%',
              end: 'top 25%',
              scrub: true,
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.to(card, {
                  scale: 1 - progress * 0.04,
                  opacity: 1 - progress * 0.2,
                  yPercent: -progress * 2,
                  filter: `brightness(${1 - progress * 0.12})`,
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
      className="py-16 sm:py-24 md:py-28 bg-gradient-to-b from-neutral-100/80 via-neutral-50 to-neutral-100/70 border-y border-neutral-200/80 relative"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3.5 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-neutral-800 text-xs font-mono font-bold uppercase tracking-wider border border-neutral-300 shadow-xs">
            <Sliders size={13} className="text-neutral-700" />
            <span>The Workflow</span>
          </div>

          <h2 className="scroll-reveal-heading text-3xl sm:text-4xl md:text-5xl font-black text-brand-black tracking-tight leading-tight">
            Discover. Connect. Feel at Home.
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Four simple steps designed to make finding accommodation easy and operating a hostel
            straightforward.
          </p>
        </div>

        {/* ========================================================
            CARD PILE-UP STACK CONTAINER
           ======================================================== */}
        <div className="relative max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-12">
          {stepsData.map((step, idx) => {
            const Icon = step.icon;
            // Progressive sticky top offset creates the layered pile-up deck on scroll
            const topOffset = `calc(85px + ${idx * 26}px)`;

            return (
              <div
                key={step.num}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                style={{ top: topOffset }}
                className="sticky rounded-3xl border border-neutral-200/90 bg-white/95 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-2xl hover:border-brand-black/50"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 sm:gap-8">
                  {/* Left Column: Text & Step Details */}
                  <div className="lg:w-1/2 space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                      {step.desc}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold text-neutral-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
                      <span>Zero Intermediaries · 100% Direct Verification</span>
                    </div>
                  </div>

                  {/* Right Column: Interactive UI Showcase Mockup */}
                  <div className="lg:w-1/2 rounded-2xl border border-neutral-100 bg-gradient-to-br from-neutral-50 via-white to-neutral-50/70 p-5 shadow-xs">
                    {idx === 0 && (
                      /* Step 1 Visual: Location & Budget Search Mock */
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                          <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-500 uppercase">
                            <MapPin size={13} className="text-emerald-600" />
                            Listing Discovery
                          </span>
                          <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            350+ Hostels
                          </span>
                        </div>

                        <div className="rounded-xl border border-neutral-200 bg-white p-3 space-y-2 shadow-xs">
                          <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
                            <span>Kathmandu, Banasthali</span>
                            <span className="text-neutral-500 font-normal">Boys &amp; Girls</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <span className="text-[11px] font-medium bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-md">
                              Rs. 8,000 - 14,000/mo
                            </span>
                            <span className="text-[11px] font-medium bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-md">
                              Near TU / College
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-xl border border-neutral-200/80 bg-white shadow-2xs">
                            <p className="font-bold text-neutral-900 truncate">ABC Girls Hostel</p>
                            <p className="text-[11px] text-neutral-500">Banasthali · Rs. 10.5k</p>
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-1">
                              <CheckCircle2 size={11} /> 2 Beds Left
                            </span>
                          </div>
                          <div className="p-2.5 rounded-xl border border-neutral-200/80 bg-white shadow-2xs">
                            <p className="font-bold text-neutral-900 truncate">
                              ABC Hostel PVT LTD
                            </p>
                            <p className="text-[11px] text-neutral-500">Boys · Rs. 11.2k</p>
                            <span className="inline-flex items-center gap-1 text-emerald-600 font-bold mt-1">
                              <CheckCircle2 size={11} /> 1 Bed Left
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {idx === 1 && (
                      /* Step 2 Visual: Compare Facilities & Tariffs */
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                          <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-500 uppercase">
                            <SlidersHorizontal size={13} className="text-blue-600" />
                            Amenities &amp; Pricing
                          </span>
                          <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                            Transparent
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-neutral-100 text-xs text-neutral-700">
                            <Wifi size={14} className="text-blue-600" />
                            <span className="font-medium truncate">Wi-Fi (100 Mbps)</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-neutral-100 text-xs text-neutral-700">
                            <Utensils size={14} className="text-amber-600" />
                            <span className="font-medium truncate">4x Fresh Meals</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-neutral-100 text-xs text-neutral-700">
                            <Zap size={14} className="text-yellow-600" />
                            <span className="font-medium truncate">24/7 Power Backup</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-neutral-100 text-xs text-neutral-700">
                            <ShieldCheck size={14} className="text-emerald-600" />
                            <span className="font-medium truncate">CCTV &amp; Security</span>
                          </div>
                        </div>

                        <div className="rounded-xl border border-neutral-200 bg-white p-3 space-y-1.5 shadow-xs">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-neutral-900">
                              2-Seater (Shared Balcony)
                            </span>
                            <span className="font-mono font-bold text-neutral-900">
                              Rs. 10,500/mo
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500">
                            Includes meals, laundry, electricity, Wi-Fi — zero hidden charges.
                          </p>
                        </div>
                      </div>
                    )}

                    {idx === 2 && (
                      /* Step 3 Visual: Direct Communication Mock */
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                          <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-500 uppercase">
                            <MessageSquare size={13} className="text-amber-600" />
                            Direct Contact
                          </span>
                          <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            No Broker
                          </span>
                        </div>

                        <div className="space-y-2 rounded-xl border border-neutral-200 bg-white p-3 text-xs shadow-xs">
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-[10px]">
                              You
                            </span>
                            <div className="rounded-lg bg-neutral-100 p-2 text-neutral-800 text-[11px] max-w-[85%]">
                              Hello! Is a 2-seater room available starting next Sunday?
                            </div>
                          </div>
                          <div className="flex items-start gap-2 justify-end">
                            <div className="rounded-lg bg-neutral-900 text-white p-2 text-[11px] max-w-[85%]">
                              Yes, Room 204 is vacant. You are welcome for a visit today!
                            </div>
                            <span className="w-5 h-5 rounded-full bg-brand-lime flex items-center justify-center font-bold text-brand-black text-[10px]">
                              HG
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-xl border border-amber-200 bg-amber-50/60 text-xs">
                          <span className="font-semibold text-neutral-800 flex items-center gap-1.5">
                            <Phone size={13} className="text-amber-600" />
                            Call Warden Directly
                          </span>
                          <span className="font-mono font-bold text-neutral-900">
                            +977 98XXXXXXXX
                          </span>
                        </div>
                      </div>
                    )}

                    {idx === 3 && (
                      /* Step 4 Visual: Live Operations Dashboard Mock */
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                          <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-500 uppercase">
                            <LayoutDashboard size={13} className="text-purple-600" />
                            Dedicated Portals
                          </span>
                          <span className="text-[11px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                            Enterprise &amp; Resident
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-3 rounded-xl border border-neutral-200 bg-white shadow-2xs">
                            <div className="flex items-center justify-between text-neutral-500 text-[11px]">
                              <span>Attendance</span>
                              <Clock size={12} className="text-emerald-500" />
                            </div>
                            <p className="font-bold text-neutral-900 mt-1">Checked In</p>
                            <span className="text-[10px] text-neutral-500">Today at 8:15 AM</span>
                          </div>
                          <div className="p-3 rounded-xl border border-neutral-200 bg-white shadow-2xs">
                            <div className="flex items-center justify-between text-neutral-500 text-[11px]">
                              <span>Fee Status</span>
                              <Wallet size={12} className="text-blue-500" />
                            </div>
                            <p className="font-bold text-emerald-600 mt-1">Rent Paid</p>
                            <span className="text-[10px] text-neutral-500">Receipt #HG-4821</span>
                          </div>
                        </div>

                        <div className="rounded-xl border border-neutral-200 bg-neutral-900 text-white p-3 space-y-1.5 shadow-sm">
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
                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-neutral-600">
                    <Icon size={14} className="text-brand-black" />
                    {step.tag}
                  </span>
                  <div className="flex items-center gap-1 text-neutral-500 group-hover:text-brand-black transition-colors font-semibold">
                    <span>Explore Step {step.num}</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
