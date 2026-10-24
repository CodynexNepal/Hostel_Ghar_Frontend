'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowUp,
  ArrowRight,
  ShieldCheck,
  Star,
  BedDouble,
  BadgeCheck,
  Clock,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={17} height={17} {...props}>
    <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7V11H8.2v3h2.5v7h2.8Z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    width={17}
    height={17}
    {...props}
  >
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16} {...props}>
    <path d="M17.7 4h2.6l-5.7 6.6L21.3 20h-5.2l-4.1-5.4L7.2 20H4.6l6.1-7L4 4h5.4l3.7 4.9L17.7 4Zm-.9 14.3h1.4L8.6 5.6H7.1l9.7 12.7Z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18} {...props}>
    <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.9C18.2 5 12 5 12 5s-6.2 0-7.8.3A2.6 2.6 0 0 0 2.4 7.2 27.3 27.3 0 0 0 2 12c0 1.6.1 3.2.4 4.8a2.6 2.6 0 0 0 1.8 1.9c1.6.3 7.8.3 7.8.3s6.2 0 7.8-.3a2.6 2.6 0 0 0 1.8-1.9c.3-1.6.4-3.2.4-4.8 0-1.6-.1-3.2-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z" />
  </svg>
);

const exploreLinks = [
  { label: 'Browse Hostels', href: '/hostels' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'For Hostel Owners', href: '/for-owners' },
  { label: 'Locations', href: '/hostels' },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Careers', href: '/about' },
  { label: 'Blog', href: '/hostels' },
  { label: 'Press Kit', href: '/about' },
];

const supportLinks = [
  { label: 'Help Center', href: '/contact' },
  { label: 'FAQs', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/privacy-policy' },
  { label: 'Cancellation Policy', href: '/privacy-policy' },
];

const tickerItems = [
  'Kathmandu',
  'Pokhara',
  'Chitwan',
  'Butwal',
  'Dharan',
  'Biratnagar',
  'Nepalgunj',
  '500+ Verified Hostels',
];

const socials = [
  { label: 'Facebook', href: siteConfig.links.facebook, Icon: FacebookIcon },
  { label: 'Instagram', href: siteConfig.links.instagram, Icon: InstagramIcon },
  { label: 'X', href: siteConfig.links.twitter, Icon: XIcon },
  { label: 'YouTube', href: 'https://youtube.com', Icon: YoutubeIcon },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef<(HTMLElement | null)[]>([]);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const watermarkLightRef = useRef<HTMLDivElement>(null);
  const orbARef = useRef<HTMLDivElement>(null);
  const orbBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaRef.current,
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 88%' },
        }
      );
      gsap.fromTo(
        colsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo(
        watermarkRef.current,
        { xPercent: 4, opacity: 0 },
        {
          xPercent: -4,
          opacity: 1,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        }
      );
      if (orbARef.current) {
        gsap.to(orbARef.current, {
          y: -24,
          x: 16,
          duration: 5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      }
      if (orbBRef.current) {
        gsap.to(orbBRef.current, {
          y: 22,
          x: -18,
          duration: 6.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      }
    }, rootRef);
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      ctx.revert();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3500);
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleWatermarkGlow = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = watermarkRef.current;
    const light = watermarkLightRef.current;
    if (!el || !light) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    gsap.to(light, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.to(el, {
      '--glow-x': `${x}%`,
      '--glow-y': `${y}%`,
      duration: 0.4,
      ease: 'power2.out',
    } as gsap.TweenVars);
  };

  const hideWatermarkGlow = () => {
    if (watermarkLightRef.current) {
      gsap.to(watermarkLightRef.current, { opacity: 0, duration: 0.6, ease: 'power2.out' });
    }
  };

  return (
    <footer ref={rootRef} className="relative overflow-hidden bg-brand-black text-white">
      {/* ambient orbs + grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          ref={orbARef}
          className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-lime/15 blur-3xl"
        />
        <div
          ref={orbBRef}
          className="absolute top-1/3 -right-28 h-[28rem] w-[28rem] rounded-full bg-brand-lime/10 blur-3xl"
        />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      </div>
      {/* top wave divider */}
      <div aria-hidden className="relative z-10 -mb-px">
        <svg
          viewBox="0 0 1440 70"
          preserveAspectRatio="none"
          className="block h-[46px] w-full sm:h-[70px]"
        >
          <path
            d="M0,40 C240,75 480,5 720,30 C960,55 1200,70 1440,25 L1440,70 L0,70 Z"
            className="fill-neutral-50"
          />
        </svg>
      </div>

      {/* marquee ticker */}
      <div className="relative z-10 border-y border-white/10 bg-white/[0.03] py-3 backdrop-blur">
        <div className="group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="flex min-w-full shrink-0 animate-[footer-marquee_28s_linear_infinite] items-center gap-8 pr-8 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={`a-${i}`}
                className="flex items-center gap-8 whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.22em] text-white/70"
              >
                {item}
                <Sparkles size={14} className="text-brand-lime" />
              </span>
            ))}
          </div>
          <div
            aria-hidden
            className="flex min-w-full shrink-0 animate-[footer-marquee_28s_linear_infinite] items-center gap-8 pr-8 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          >
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={`b-${i}`}
                className="flex items-center gap-8 whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.22em] text-white/70"
              >
                {item}
                <Sparkles size={14} className="text-brand-lime" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA banner */}
        <div ref={ctaRef} className="relative -mt-2 pt-10 sm:pt-14">
          <div className="group relative overflow-hidden rounded-3xl border border-brand-lime/30 bg-gradient-to-br from-brand-lime via-[#d4ff7a] to-brand-lime p-7 shadow-lime-lg sm:p-10 lg:p-12">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/30 blur-2xl transition-transform duration-700 group-hover:scale-125" />
              <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-brand-black/10 blur-2xl" />
              <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,#010101_1px,transparent_0)] [background-size:22px_22px]" />
            </div>
            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-black px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-lime">
                  <BedDouble size={14} strokeWidth={2.5} />
                  List your hostel
                </p>
                <h2 className="text-3xl font-extrabold leading-[1.05] tracking-tight text-brand-black sm:text-4xl lg:text-5xl">
                  Turn empty beds into
                  <span className="relative ml-3 inline-block">
                    <span className="relative z-10">bookings.</span>
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 z-0 h-3 w-full -rotate-1 rounded bg-brand-black/15"
                    />
                  </span>
                </h2>
                <p className="mt-4 max-w-xl text-sm font-medium text-brand-black/70 sm:text-base">
                  Join 500+ owners getting verified listings, instant inquiries and zero commission
                  for the first 3 months.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-[13px] font-semibold text-brand-black/80">
                  <span className="inline-flex items-center gap-1.5">
                    <BadgeCheck size={16} /> Verified badge
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={16} /> Live in 24 hrs
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck size={16} /> Secure payouts
                  </span>
                </div>
              </div>
              <div className="flex w-full max-w-sm flex-col gap-3">
                <Link
                  href="/for-owners"
                  className="group/btn inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-black px-7 py-4 text-base font-bold text-white shadow-hard transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lime-lg"
                >
                  List Your Hostel — It&apos;s Free
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1.5"
                  />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-brand-black/80 bg-white/40 px-7 py-3.5 text-sm font-bold text-brand-black backdrop-blur transition-all hover:bg-brand-black hover:text-brand-lime"
                >
                  View pricing plans
                </Link>
                <p className="text-center text-xs font-medium text-brand-black/60">
                  No credit card required • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* main columns */}
        <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_1.2fr]">
          <div
            ref={(el) => {
              colsRef.current[0] = el;
            }}
          >
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border-2 border-brand-lime bg-white shadow-lime transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                <Image
                  src="/images/logo/hostel_ghar_logo.jpg"
                  alt="Hostel Ghar logo"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
                <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-brand-black bg-white" />
              </span>
              <span className="leading-tight">
                <span className="block text-xl font-extrabold tracking-tight">Hostel Ghar</span>
                <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-brand-lime">
                  Find • Book • Stay
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Nepal&apos;s most loved hostel marketplace. Verified stays, honest reviews and instant
              booking.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
              <span className="flex text-brand-lime">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} strokeWidth={2.5} className="fill-brand-lime" />
                ))}
              </span>
              4.9 · 12k+ happy guests
            </div>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-brand-lime hover:bg-brand-lime hover:text-brand-black hover:shadow-lime"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>

          {[
            { title: 'Explore', links: exploreLinks },
            { title: 'Company', links: companyLinks },
            { title: 'Support', links: supportLinks },
          ].map((col, idx) => (
            <nav
              key={col.title}
              ref={(el) => {
                colsRef.current[idx + 1] = el;
              }}
              aria-label={col.title}
            >
              <h3 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white/90">
                <span className="h-1.5 w-6 rounded-full bg-brand-lime" />
                {col.title}
              </h3>
              <ul className="space-y-1">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1.5 rounded-lg px-1 py-1.5 text-sm text-white/60 transition-all duration-200 hover:translate-x-1 hover:text-brand-lime"
                    >
                      <ChevronRight
                        size={14}
                        className="-ml-1 opacity-0 transition-all duration-200 group-hover:ml-0 group-hover:opacity-100"
                      />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div
            ref={(el) => {
              colsRef.current[4] = el;
            }}
          >
            <h3 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white/90">
              <span className="h-1.5 w-6 rounded-full bg-brand-lime" />
              Stay in the loop
            </h3>
            <p className="text-sm leading-relaxed text-white/60">
              New hostels, deals & guides. One email a week, no spam.
            </p>
            <form onSubmit={handleSubscribe} className="mt-5">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1.5 backdrop-blur transition-colors focus-within:border-brand-lime/60">
                <Mail size={17} className="ml-2.5 shrink-0 text-white/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-10 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-lime text-brand-black transition-all duration-300 hover:shadow-lime active:scale-95"
                >
                  <Send size={17} strokeWidth={2.4} />
                </button>
              </div>
              <p
                className={`mt-3 min-h-[1.25rem] text-xs font-medium transition-all ${subscribed ? 'text-brand-lime' : 'text-white/40'}`}
              >
                {subscribed ? 'You are on the list! Check your inbox.' : 'Join 8,000+ subscribers'}
              </p>
            </form>
            <ul className="mt-2 space-y-3 text-sm text-white/60">
              <li>
                <Link
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-brand-lime"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                    <Mail size={15} />
                  </span>
                  {siteConfig.contact.email}
                </Link>
              </li>
              <li>
                <Link
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-brand-lime"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                    <Phone size={15} />
                  </span>
                  {siteConfig.contact.phone}
                </Link>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                  <MapPin size={15} />
                </span>
                {siteConfig.contact.address}
              </li>
            </ul>
          </div>
        </div>
        {/* trust strip */}
        <div className="grid gap-3 border-t border-white/10 py-8 sm:grid-cols-3">
          {[
            {
              Icon: ShieldCheck,
              title: 'Verified stays only',
              sub: 'Every hostel is visited & checked',
            },
            { Icon: BadgeCheck, title: 'Honest reviews', sub: 'Real guests, real photos' },
            { Icon: Clock, title: '24/7 support', sub: 'We reply in under 5 minutes' },
          ].map(({ Icon, title, sub }) => (
            <div
              key={title}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-lime/40 hover:bg-white/[0.07]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-lime/15 text-brand-lime transition-all duration-300 group-hover:bg-brand-lime group-hover:text-brand-black">
                <Icon size={20} strokeWidth={2.2} />
              </span>
              <span>
                <span className="block text-sm font-bold">{title}</span>
                <span className="block text-xs text-white/50">{sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* giant watermark */}
      <div
        className="group/watermark relative z-0 cursor-default select-none overflow-hidden"
        onMouseMove={handleWatermarkGlow}
        onMouseLeave={hideWatermarkGlow}
      >
        <div
          ref={watermarkRef}
          className="watermark-glow whitespace-nowrap text-center text-[18vw] font-extrabold leading-none tracking-tighter text-transparent lg:text-[11rem]"
        >
          <span className="bg-gradient-to-b from-white/[0.09] to-white/[0.01] bg-clip-text transition-all duration-500 group-hover/watermark:from-brand-lime/40 group-hover/watermark:to-brand-lime/5">
            HOSTEL GHAR
          </span>
        </div>
        {/* mouse-following light beam */}
        <div
          ref={watermarkLightRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            background:
              'radial-gradient(420px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(185,255,102,0.22), rgba(185,255,102,0.06) 45%, transparent 70%)',
            mixBlendMode: 'screen',
          }}
        />
        {/* sweeping shine on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out group-hover/watermark:translate-x-full"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-black to-transparent" />
      </div>

      {/* bottom bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-xs text-white/50 sm:px-6 md:flex-row lg:px-8">
          <p className="flex flex-wrap items-center justify-center gap-1.5 text-center md:justify-start">
            <span>
              © {new Date().getFullYear()} {siteConfig.name}
            </span>
            <span className="hidden h-3 w-px bg-white/20 sm:inline-block" aria-hidden />
            <span className="inline-flex items-center gap-1">
              Developed by
              <a
                href="https://codynexnepal.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group/dev relative inline-flex items-center gap-1 overflow-hidden rounded-md px-1 font-bold text-white/80 transition-colors duration-300 hover:text-brand-lime"
              >
                <span
                  className="absolute inset-0 origin-left scale-x-0 rounded-md bg-brand-lime/15 transition-transform duration-300 ease-out group-hover/dev:scale-x-100"
                  aria-hidden
                />
                <span className="relative">CodyNex Nepal</span>
                <ExternalLink
                  size={12}
                  strokeWidth={2.5}
                  className="relative transition-transform duration-300 group-hover/dev:-translate-y-px group-hover/dev:translate-x-px"
                />
                <span
                  className="absolute -bottom-px left-1 right-1 h-px origin-left scale-x-0 bg-brand-lime shadow-[0_0_8px_rgba(185,255,102,0.9)] transition-transform duration-300 group-hover/dev:scale-x-100"
                  aria-hidden
                />
              </a>
            </span>
          </p>
          <div className="flex items-center gap-5 font-medium">
            <Link href="/privacy-policy" className="transition-colors hover:text-brand-lime">
              Privacy
            </Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-brand-lime">
              Terms
            </Link>
            <Link href="/contact" className="transition-colors hover:text-brand-lime">
              Sitemap
            </Link>
          </div>
        </div>
      </div>

      {/* back to top */}
      <button
        onClick={scrollTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-lime text-brand-black shadow-lime-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lime active:scale-95 ${showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
      >
        <ArrowUp size={20} strokeWidth={2.5} />
      </button>
      <style>{`@keyframes footer-marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }`}</style>
    </footer>
  );
};

export default Footer;
