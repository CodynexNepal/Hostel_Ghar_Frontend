'use client';

import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';

export interface AuthLayoutProps {
  children: ReactNode;
  maxWidth?: string;
  // Legacy optional props for backwards compatibility
  badge?: string;
  title?: string;
  subtitle?: string;
  benefits?: string[];
  trust?: string;
  mobileBrand?: string;
}

const AuthLayout = ({ children, maxWidth = 'max-w-[440px]' }: AuthLayoutProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative flex min-h-[calc(100vh-140px)] w-full items-center justify-center bg-neutral-50/70 px-4 py-12 sm:px-6 lg:px-8">
      {/* Subtle ambient blur */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-lime/15 blur-3xl" />
      </div>

      <div ref={cardRef} className={`relative w-full ${maxWidth}`}>
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-10">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
