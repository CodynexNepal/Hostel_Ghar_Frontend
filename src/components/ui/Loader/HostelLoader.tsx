'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

export type HostelLoaderSize = 'sm' | 'md' | 'lg';
export type HostelLoaderVariant = 'house' | 'bed' | 'pulse' | 'bars';

export interface HostelLoaderProps {
  size?: HostelLoaderSize;
  variant?: HostelLoaderVariant;
  label?: string;
  showLabel?: boolean;
  fullScreen?: boolean;
  className?: string;
}

const sizeStyles: Record<HostelLoaderSize, { box: string; img: number; text: string }> = {
  sm: { box: 'h-12 w-12 rounded-xl', img: 48, text: 'text-xs' },
  md: { box: 'h-20 w-20 rounded-2xl', img: 80, text: 'text-sm' },
  lg: { box: 'h-28 w-28 rounded-3xl', img: 112, text: 'text-base' },
};

/**
 * Hostel Ghar Shaking Logo Loader.
 * Displays the authentic Hostel Ghar logo with a playful, dynamic shake animation.
 */
const HostelLoader = ({
  size = 'md',
  variant = 'house',
  label = 'Finding cozy stays…',
  showLabel,
  fullScreen = false,
  className,
}: HostelLoaderProps) => {
  const currentSize = sizeStyles[size] || sizeStyles.md;
  const isLabelVisible = showLabel !== undefined ? showLabel : Boolean(label);

  const content = (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn('flex flex-col items-center justify-center gap-4', className)}
    >
      <div className="relative">
        {/* Soft lime glow pulse behind the shaking logo */}
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 bg-brand-lime/40 blur-xl animate-pulse pointer-events-none',
            currentSize.box
          )}
        />

        {/* Shaking Hostel Ghar Logo */}
        <div
          className={cn(
            'relative overflow-hidden border-2 border-brand-black bg-white shadow-lime flex items-center justify-center animate-hostel-shake select-none',
            currentSize.box
          )}
        >
          <Image
            src="/images/logo/hostel_ghar_logo.jpg"
            alt="Hostel Ghar logo"
            width={currentSize.img}
            height={currentSize.img}
            className="h-full w-full object-cover pointer-events-none select-none"
            priority
          />
        </div>
      </div>

      {isLabelVisible && label && (
        <div className="text-center">
          <p className={cn('font-bold text-brand-black tracking-tight', currentSize.text)}>
            {label}
          </p>
          <p className="mt-1 text-xs font-medium text-neutral-400">
            Hostel Ghar • Find • Book • Stay
          </p>
        </div>
      )}

      <span className="sr-only">{label}</span>

      <style jsx global>{`
        @keyframes hostel-shake {
          0%,
          100% {
            transform: rotate(0deg) scale(1);
          }
          15% {
            transform: rotate(-10deg) scale(1.05);
          }
          30% {
            transform: rotate(10deg) scale(1.05);
          }
          45% {
            transform: rotate(-7deg) scale(1.03);
          }
          60% {
            transform: rotate(7deg) scale(1.03);
          }
          75% {
            transform: rotate(-3deg) scale(1.01);
          }
          90% {
            transform: rotate(3deg) scale(1.01);
          }
        }
        .animate-hostel-shake {
          animation: hostel-shake 1.1s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
          transform-origin: center center;
          will-change: transform;
        }
      `}</style>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className={cn(
          'fixed inset-0 z-[100] flex items-center justify-center bg-white/85 backdrop-blur-md',
          className
        )}
      >
        {content}
      </div>
    );
  }

  return content;
};

export default HostelLoader;
