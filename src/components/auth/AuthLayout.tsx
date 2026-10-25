'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { CheckCircle, Shield } from 'lucide-react';

export interface AuthLayoutProps {
  badge: string;
  title: string;
  subtitle: string;
  benefits: string[];
  trust: string;
  mobileBrand: string;
  children: ReactNode;
}

const stats = [
  { big: '500+', small: 'Verified hostels' },
  { big: '12k+', small: 'Happy guests' },
  { big: '4.9', small: 'Average rating' },
];

const AuthLayout = ({
  badge,
  title,
  subtitle,
  benefits,
  trust,
  mobileBrand,
  children,
}: AuthLayoutProps) => {
  const leftRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(leftRef.current, { x: -48, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 });
      tl.fromTo(
        cardRef.current,
        { x: 48, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 },
        '-=0.45'
      );
      tl.fromTo(
        artRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.6)' },
        '-=0.4'
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-brand-lime/10">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-lime/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand-lime/15 blur-3xl" />
      </div>
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid w-full items-stretch overflow-hidden rounded-[24px] border border-neutral-100 bg-white shadow-hard sm:rounded-[28px] lg:grid-cols-2">
          <div
            ref={leftRef}
            className="relative hidden flex-col justify-between overflow-hidden bg-brand-black p-10 text-white lg:flex lg:min-h-[660px] xl:p-12"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-lime/20 blur-3xl" />
              <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-brand-lime/10 blur-3xl" />
            </div>
            <Link href="/" className="relative flex items-center gap-3 group">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl overflow-hidden bg-white shadow-lime p-0.5 border border-brand-lime/50 group-hover:scale-105 transition-transform">
                <Image
                  src="/images/logo/hostel_ghar_logo.jpg"
                  alt="Hostel Ghar Logo"
                  width={46}
                  height={46}
                  className="w-full h-full object-cover rounded-xl"
                  priority
                />
              </span>
              <span className="leading-tight">
                <span className="block text-lg font-extrabold tracking-tight">Hostel Ghar</span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-brand-lime">
                  Find • Book • Stay
                </span>
              </span>
            </Link>
            <div className="relative mt-8">
              <p className="inline-flex items-center rounded-full bg-brand-lime px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-black">
                {badge}
              </p>
              <h2 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight xl:text-[2.75rem]">
                {title}
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/65">{subtitle}</p>
              <div
                ref={artRef}
                className="relative mt-8 rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur text-center"
              >
                <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden shadow-2xl border-2 border-brand-lime/40 bg-white p-2">
                  <Image
                    src="/images/logo/hostel_ghar_logo.jpg"
                    alt="Hostel Ghar Official Logo"
                    fill
                    className="object-contain p-1 rounded-2xl"
                    priority
                  />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                  {stats.map((s) => (
                    <div
                      key={s.small}
                      className="rounded-xl bg-white/5 px-2 py-3 border border-white/5"
                    >
                      <p className="text-lg font-extrabold text-brand-lime">{s.big}</p>
                      <p className="text-[11px] font-medium text-white/55">{s.small}</p>
                    </div>
                  ))}
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-white/80">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-lime/20">
                      <CheckCircle size={16} strokeWidth={2.5} className="text-brand-lime" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <p className="relative mt-10 flex items-center gap-2 text-xs text-white/45">
              <Shield size={14} strokeWidth={2} className="text-brand-lime" />
              {trust}
            </p>
          </div>
          <div
            ref={cardRef}
            className="flex min-h-[660px] flex-col justify-center bg-white p-6 sm:p-10 lg:p-12"
          >
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <Link href="/" className="flex items-center gap-2.5">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden bg-white shadow-sm border border-neutral-200 p-0.5">
                  <Image
                    src="/images/logo/hostel_ghar_logo.jpg"
                    alt="Hostel Ghar Logo"
                    width={38}
                    height={38}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </span>
                <span className="text-lg font-extrabold text-brand-black">{mobileBrand}</span>
              </Link>
            </div>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
