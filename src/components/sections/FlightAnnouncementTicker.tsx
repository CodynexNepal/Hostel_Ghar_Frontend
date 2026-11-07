'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, MapPin, ShieldCheck, Zap, Users } from 'lucide-react';

interface FlightCardItem {
  id: string;
  text: string;
  isGreen: boolean;
  type: 'city' | 'platform' | 'verified' | 'broker' | 'connect';
  layer: 'foreground' | 'midground';
}

const TICKER_DATA: FlightCardItem[] = [
  {
    id: 'platform',
    text: "NEPAL'S HOSTEL DISCOVERY & MANAGEMENT PLATFORM",
    isGreen: true,
    type: 'platform',
    layer: 'foreground',
  },
  { id: 'ktm', text: 'KATHMANDU', isGreen: false, type: 'city', layer: 'midground' },
  { id: 'pkr', text: 'POKHARA', isGreen: true, type: 'city', layer: 'foreground' },
  { id: 'lalitpur', text: 'LALITPUR', isGreen: false, type: 'city', layer: 'midground' },
  { id: 'chitwan', text: 'CHITWAN', isGreen: true, type: 'city', layer: 'foreground' },
  { id: 'butwal', text: 'BUTWAL', isGreen: false, type: 'city', layer: 'midground' },
  { id: 'dharan', text: 'DHARAN', isGreen: true, type: 'city', layer: 'foreground' },
  {
    id: 'verified',
    text: '100% PHYSICALLY VERIFIED PROPERTIES',
    isGreen: false,
    type: 'verified',
    layer: 'midground',
  },
  {
    id: 'broker',
    text: 'ZERO BROKER COMMISSIONS',
    isGreen: true,
    type: 'broker',
    layer: 'foreground',
  },
  {
    id: 'connect',
    text: 'DIRECT OWNER CONNECT',
    isGreen: false,
    type: 'connect',
    layer: 'midground',
  },
];

/**
 * 3D Flying Cards Announcement Ribbon.
 * Renders each announcement item as an individual aerodynamic 3D glass card
 * that flies across the screen dynamically as the user scrolls.
 */
export default function FlightAnnouncementTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const set1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    const container = containerRef.current;
    const track = trackRef.current;
    const set1 = set1Ref.current;

    if (!container || !track) return;

    // Animation physics state - ALWAYS initialized to active cruising
    let currentX = 0;
    const baseSpeed = -1.6; // constant baseline flight cruise
    let scrollVelocity = 0;
    let smoothVelocity = 0;
    let flightTime = 0;
    let isInView = true; // start active immediately

    const getSetWidth = () => {
      if (set1) {
        const w = set1.offsetWidth;
        if (w > 200) return w;
      }
      return 2600;
    };
    let setWidth = getSetWidth();

    // IntersectionObserver with generous 300px margin ensures continuous execution
    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isInView = entry.isIntersecting;
          });
        },
        { rootMargin: '300px 0px' }
      );
      observer.observe(container);
    }

    // Direct window scroll listener: instantaneous response to wheel/touch scroll
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      if (prefersReducedMotion) return;
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Downward scroll accelerates flight forward (-X), upward reverses flight (+X)
      if (Math.abs(delta) > 0.5) {
        scrollVelocity -= delta * 0.48;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // GSAP ScrollTrigger for additional velocity integration
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom+=30% ',
      end: 'bottom top-=30%',
      onUpdate: (self) => {
        if (prefersReducedMotion) return;
        const vel = self.getVelocity(); // px/second
        if (Math.abs(vel) > 15) {
          scrollVelocity -= vel * 0.0065;
        }
      },
    });

    const handleResize = () => {
      setWidth = getSetWidth();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // 60FPS Flight Physics Loop
    const onTick = (_time: number, deltaTime: number) => {
      if (!isInView) return;

      const dt = Math.min(deltaTime / 16.67, 3);
      flightTime += 0.026 * dt;

      if (!prefersReducedMotion) {
        // Momentum dampening with spring interpolation
        smoothVelocity += (scrollVelocity - smoothVelocity) * 0.14 * dt;
        // Friction decay
        scrollVelocity *= Math.pow(0.91, dt);
      } else {
        smoothVelocity = 0;
      }

      // Clamp max flight boost for stability
      const clampedSmooth = Math.max(-42, Math.min(42, smoothVelocity));

      // Translate track position
      const totalSpeed = (baseSpeed + clampedSmooth) * dt;
      currentX += totalSpeed;

      // Seamless infinite modulo wrapping
      const actualWidth = setWidth > 200 ? setWidth : getSetWidth();
      if (actualWidth > 0) {
        if (currentX <= -actualWidth) {
          currentX += actualWidth;
        } else if (currentX >= 0) {
          currentX -= actualWidth;
        }
      }

      track.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;

      if (!prefersReducedMotion) {
        // Aerodynamic Flight Angles:
        // Bank / Yaw: Tilts into flight trajectory
        const bankY = Math.max(-16, Math.min(16, clampedSmooth * 1.45));
        // Pitch Climb: Nose up during acceleration
        const climbX = Math.max(-6, Math.min(9, Math.abs(clampedSmooth) * 0.65));
        // Altitude Lift: Lifts up from cruising runway
        const liftY = -Math.min(Math.abs(clampedSmooth) * 1.15, 10);
        // Reactive neon glow intensity
        const glow = Math.min(Math.abs(clampedSmooth) * 0.08, 1);
        // Foreground vs Midground parallax offsets
        const parallaxFg = -clampedSmooth * 2.2;
        const parallaxStar = -clampedSmooth * 3.6;
        // Celestial Star spin angle
        const starRot = (flightTime * 65 - currentX * 0.32) % 360;

        const style = container.style;
        style.setProperty('--flight-bank-y', `${bankY.toFixed(2)}deg`);
        style.setProperty('--flight-climb-x', `${climbX.toFixed(2)}deg`);
        style.setProperty('--flight-lift-y', `${liftY.toFixed(2)}px`);
        style.setProperty('--flight-glow', glow.toFixed(3));
        style.setProperty('--flight-parallax-fg', `${parallaxFg.toFixed(2)}px`);
        style.setProperty('--flight-parallax-star', `${parallaxStar.toFixed(2)}px`);
        style.setProperty('--star-rot', `${starRot.toFixed(1)}deg`);
      }
    };

    gsap.ticker.add(onTick);

    return () => {
      gsap.ticker.remove(onTick);
      trigger.kill();
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderCardItem = (item: FlightCardItem, idx: number) => {
    const floatClass =
      idx % 4 === 0
        ? 'animate-flight-float-1'
        : idx % 4 === 1
          ? 'animate-flight-float-2'
          : idx % 4 === 2
            ? 'animate-flight-float-3'
            : 'animate-flight-float-4';

    // Icon corresponding to the card type
    let cardIcon = null;
    if (item.type === 'city') {
      cardIcon = (
        <MapPin
          size={13}
          className={item.isGreen ? 'text-brand-lime shrink-0' : 'text-neutral-400 shrink-0'}
        />
      );
    } else if (item.type === 'platform') {
      cardIcon = <Sparkles size={14} className="text-brand-lime shrink-0" />;
    } else if (item.type === 'verified') {
      cardIcon = <ShieldCheck size={14} className="text-emerald-400 shrink-0" />;
    } else if (item.type === 'broker') {
      cardIcon = <Zap size={14} className="text-brand-lime fill-brand-lime shrink-0" />;
    } else if (item.type === 'connect') {
      cardIcon = <Users size={14} className="text-sky-400 shrink-0" />;
    }

    return (
      <React.Fragment key={`${item.id}-${idx}`}>
        {/* 3D Flying Card Container */}
        <div
          className="inline-flex items-center px-2.5 sm:px-3 select-none shrink-0"
          style={{
            transformStyle: 'preserve-3d',
            transform:
              item.layer === 'foreground'
                ? 'translate3d(var(--flight-parallax-fg, 0px), var(--flight-lift-y, 0px), 28px) rotateY(var(--flight-bank-y, 0deg)) rotateX(var(--flight-climb-x, 0deg))'
                : 'translate3d(0, var(--flight-lift-y, 0px), 0px) rotateY(calc(var(--flight-bank-y, 0deg) * 0.75)) rotateX(calc(var(--flight-climb-x, 0deg) * 0.75))',
            willChange: 'transform',
          }}
        >
          {/* Aerodynamic 3D Card Capsule */}
          <div
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl border font-mono text-xs sm:text-sm font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-200 backdrop-blur-md shadow-md ${floatClass} ${
              item.isGreen
                ? 'bg-[#151711]/90 text-brand-lime border-brand-lime/45 hover:border-brand-lime shadow-[0_4px_20px_rgba(185,255,102,0.15)]'
                : 'bg-[#141417]/85 text-neutral-100 border-neutral-700/80 hover:border-neutral-500 shadow-[0_4px_18px_rgba(0,0,0,0.5)]'
            }`}
            style={{
              textShadow: item.isGreen
                ? '0 0 calc(6px + var(--flight-glow, 0) * 14px) rgba(185, 255, 102, calc(0.35 + var(--flight-glow, 0) * 0.45))'
                : undefined,
              boxShadow: item.isGreen
                ? '0 0 calc(10px + var(--flight-glow, 0) * 22px) rgba(185, 255, 102, calc(0.12 + var(--flight-glow, 0) * 0.28)), 0 8px 24px rgba(0,0,0,0.45)'
                : '0 8px 24px rgba(0,0,0,0.45)',
              willChange: 'transform, box-shadow, text-shadow',
            }}
          >
            {cardIcon}
            <span className={item.isGreen ? 'font-extrabold text-brand-lime' : 'text-neutral-200'}>
              {item.text}
            </span>
          </div>
        </div>

        {/* 3D Floating Celestial Particle Star Separator */}
        <div
          className="inline-flex items-center justify-center px-1.5 sm:px-2 select-none shrink-0"
          style={{
            transformStyle: 'preserve-3d',
            transform:
              'translate3d(var(--flight-parallax-star, 0px), calc(var(--flight-lift-y, 0px) * 1.35), 42px) rotateZ(var(--star-rot, 0deg)) scale(calc(1 + var(--flight-glow, 0) * 0.35))',
            willChange: 'transform',
          }}
          aria-hidden="true"
        >
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-lime/10 border border-brand-lime/30 flex items-center justify-center text-brand-lime text-xs sm:text-sm backdrop-blur-md shadow-sm ${floatClass}`}
            style={{
              filter:
                'drop-shadow(0 0 calc(6px + var(--flight-glow, 0) * 8px) rgba(185, 255, 102, 0.75))',
              willChange: 'transform, filter',
            }}
          >
            ✦
          </div>
        </div>
      </React.Fragment>
    );
  };

  const renderPhraseSet = (ref?: React.RefObject<HTMLDivElement>) => (
    <div ref={ref} className="flex items-center shrink-0" style={{ transformStyle: 'preserve-3d' }}>
      {TICKER_DATA.map((item, idx) => renderCardItem(item, idx))}
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="bg-[#0A0A0D] text-brand-lime py-5 sm:py-6 border-y border-neutral-800/90 overflow-hidden relative shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),inset_0_-1px_0_0_rgba(255,255,255,0.06)] select-none"
      style={{
        perspective: '1400px',
        perspectiveOrigin: '50% 50%',
      }}
      aria-label="Hostel Ghar live network updates and benefits ticker"
    >
      {/* Background Cosmic Runway Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Atmospheric Edge Vignette: Deep space gradient masks so cards emerge & depart seamlessly */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 z-20 pointer-events-none bg-gradient-to-r from-[#0A0A0D] via-[#0A0A0D]/90 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 z-20 pointer-events-none bg-gradient-to-l from-[#0A0A0D] via-[#0A0A0D]/90 to-transparent"
        aria-hidden="true"
      />

      {/* Continuous 3D Flight Runway Track */}
      <div
        ref={trackRef}
        className="flex items-center w-max"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {renderPhraseSet(set1Ref)}
        {renderPhraseSet()}
        {renderPhraseSet()}
      </div>
    </section>
  );
}
