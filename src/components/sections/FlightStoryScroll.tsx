'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, ShieldCheck, Users, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

interface CleanStorySlide {
  id: string;
  title: string;
  highlightText: string;
  description: string;
  themeColor: string;
  icon: React.ReactNode;
  tags: string[];
}

const STORY_SLIDES: CleanStorySlide[] = [
  {
    id: 'zero-commission',
    title: 'ZERO BROKER COMMISSIONS',
    highlightText: 'No Middlemen. No Hidden Charges.',
    description:
      'Search, compare, and connect completely free of charge. No brokers inflating rents or taking cuts. Every rupee you pay goes directly to your accommodation and peace of mind.',
    themeColor: '#B9FF66',
    icon: <Zap size={44} className="text-brand-lime fill-brand-lime" />,
    tags: ['NPR 0 Brokerage Fee', '100% Free for Students', 'Direct Transparent Pricing'],
  },
  {
    id: 'verified-properties',
    title: '100% PHYSICALLY VERIFIED',
    highlightText: 'Inspected In Person. Guaranteed Genuine.',
    description:
      'Say goodbye to fake photos and misleading descriptions. Our ground team visits, physically inspects facilities, checks hygiene, audits security, and verifies authentic ownership before any hostel is approved.',
    themeColor: '#34D399',
    icon: <ShieldCheck size={44} className="text-emerald-400" />,
    tags: ['In-Person Audit', 'Verified Facilities & Wi-Fi', 'Authentic Photo Guarantee'],
  },
  {
    id: 'direct-connect',
    title: 'DIRECT OWNER CONNECT',
    highlightText: 'Speak Directly. Settle In Faster.',
    description:
      'Communicate straight with hostel managers and owners. Confirm available beds, ask questions about food menus and study spaces, and finalize your booking without intermediaries.',
    themeColor: '#38BDF8',
    icon: <Users size={44} className="text-sky-400" />,
    tags: ['Direct Phone & WhatsApp', 'Instant Availability Check', 'Clear House Rules'],
  },
  {
    id: 'cities-network',
    title: 'CITIES ACROSS NEPAL',
    highlightText: 'Kathmandu, Pokhara, Chitwan & More.',
    description:
      'Building Nepal’s most trusted verified hostel network across top educational, medical, and business hubs—from Kathmandu Valley to Gandaki and the Terai.',
    themeColor: '#A78BFA',
    icon: <MapPin size={44} className="text-purple-400" />,
    tags: ['Kathmandu', 'Pokhara', 'Lalitpur', 'Chitwan', 'Butwal', 'Dharan'],
  },
  {
    id: 'unified-platform',
    title: "NEPAL'S HOSTEL DISCOVERY & MANAGEMENT PLATFORM",
    highlightText: 'One Connected Experience.',
    description:
      'Bringing hostel search, verified booking enquiries, resident records, fee tracking, and day-to-day operations together into one cohesive platform for residents and owners alike.',
    themeColor: '#B9FF66',
    icon: <Sparkles size={44} className="text-brand-lime" />,
    tags: ['Student Room Search', 'Owner Operational Suite', 'Verified Ratings & Reviews'],
  },
];

/**
 * Minimalist FullScreen Story Scroll.
 * Pure black background, zero gradients, zero duplicated labels,
 * zero stepper/progress bars, zero bottom prompts.
 * Each message flies in individually, covering the whole page on scroll.
 */
export default function FlightStoryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    const slides = slidesRef.current.filter((s): s is HTMLDivElement => Boolean(s));

    if (!container || !pinSection || slides.length === 0) return;

    const numSlides = slides.length;

    const ctx = gsap.context(() => {
      // Set initial states: first slide visible in center, subsequent slides staged in 3D distance
      slides.forEach((slide, idx) => {
        if (idx === 0) {
          gsap.set(slide, {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            z: 0,
            filter: 'blur(0px)',
          });
        } else {
          gsap.set(slide, {
            autoAlpha: 0,
            scale: prefersReducedMotion ? 1 : 0.82,
            y: prefersReducedMotion ? 40 : 120,
            rotateX: prefersReducedMotion ? 0 : 20,
            z: prefersReducedMotion ? 0 : -350,
            filter: prefersReducedMotion ? 'none' : 'blur(8px)',
          });
        }
      });

      // Master Timeline linked to scrubbed scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${numSlides * 105}%`,
          pin: pinSection,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Sequence the 3D flight of each slide
      for (let i = 0; i < numSlides - 1; i++) {
        const currentSlide = slides[i];
        const nextSlide = slides[i + 1];

        // 1. Current slide flies up and zooms forward / fades away
        tl.to(
          currentSlide,
          {
            autoAlpha: 0,
            scale: prefersReducedMotion ? 1 : 1.25,
            y: prefersReducedMotion ? -50 : -130,
            rotateX: prefersReducedMotion ? 0 : -18,
            z: prefersReducedMotion ? 0 : 250,
            filter: prefersReducedMotion ? 'none' : 'blur(8px)',
            duration: 1,
            ease: 'power2.inOut',
          },
          `slide-${i}`
        );

        // 2. Next slide flies in from deep 3D space into the center
        tl.to(
          nextSlide,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            z: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power2.inOut',
          },
          `slide-${i}+=0.15`
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#0A0A0A] text-white select-none border-y border-neutral-900"
      id="platform-story"
    >
      {/* Pinned Viewport covering full screen */}
      <div
        ref={pinSectionRef}
        className="h-screen w-full relative overflow-hidden flex items-center justify-center bg-[#0A0A0A]"
        style={{
          perspective: '1300px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* Center Stage: Individual 3D Story Cards */}
        <div className="relative z-20 w-full max-w-4xl px-4 sm:px-8 mx-auto flex items-center justify-center">
          {STORY_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              ref={(el) => {
                slidesRef.current[idx] = el;
              }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity, filter',
              }}
            >
              {/* Clean Minimalist Card Chassis (No Gradients, No Clutter) */}
              <div className="w-full max-w-3xl rounded-3xl p-7 sm:p-11 md:p-14 border border-neutral-800 bg-[#121212] shadow-2xl space-y-5 sm:space-y-6">
                {/* Single Icon */}
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    {slide.icon}
                  </div>
                </div>

                {/* Primary Headline */}
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white uppercase">
                  {slide.title}
                </h2>

                {/* Highlight Subtitle */}
                <p
                  className="text-base sm:text-xl font-bold tracking-tight"
                  style={{ color: slide.themeColor }}
                >
                  {slide.highlightText}
                </p>

                {/* Narrative Paragraph */}
                <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                  {slide.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-2">
                  {slide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs sm:text-sm text-neutral-300 font-medium"
                    >
                      <CheckCircle2 size={13} style={{ color: slide.themeColor }} />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
