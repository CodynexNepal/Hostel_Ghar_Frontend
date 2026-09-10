'use client';

import { cn } from '@/lib/utils/cn';

export type HostelLoaderSize = 'sm' | 'md' | 'lg';
export type HostelLoaderVariant = 'house' | 'bed' | 'pulse' | 'bars';

export interface HostelLoaderProps {
  size?: HostelLoaderSize;
  variant?: HostelLoaderVariant;
  label?: string;
  fullScreen?: boolean;
  className?: string;
}

const sizeStyles: Record<HostelLoaderSize, { box: string; text: string }> = {
  sm: { box: 'h-12 w-12', text: 'text-xs' },
  md: { box: 'h-20 w-20', text: 'text-sm' },
  lg: { box: 'h-28 w-28', text: 'text-base' },
};

/**
 * Unique Hostel Ghar loader — a little hostel "house" with
 * bouncing dots, a sweeping lime shine and a glowing ring.
 * Use `variant="bars"` for compact inline skeletons,
 * `variant="bed"` for card placeholders.
 */
const HostelLoader = ({
  size = 'md',
  variant = 'house',
  label = 'Finding cozy stays…',
  fullScreen = false,
  className,
}: HostelLoaderProps) => {
  const content = (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn('flex flex-col items-center justify-center gap-4', className)}
    >
      {variant === 'house' && (
        <div className={cn('relative', sizeStyles[size].box)}>
          {/* glow */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-3xl bg-brand-lime/30 blur-2xl animate-pulse"
          />
          {/* house card */}
          <div className="absolute inset-0 rounded-3xl border-2 border-brand-black bg-white shadow-hard flex items-center justify-center overflow-hidden">
            {/* roof */}
            <svg
              viewBox="0 0 64 64"
              className="h-3/4 w-3/4 animate-loader-bounce-soft"
              fill="none"
              aria-hidden
            >
              {/* mountains behind */}
              <path d="M8 44 L22 24 L36 44 Z" fill="#B9FF66" fillOpacity="0.45" />
              <path d="M24 44 L38 18 L52 44 Z" fill="#B9FF66" fillOpacity="0.7" />
              {/* building */}
              <rect x="20" y="34" width="24" height="16" rx="2" fill="#fff" stroke="#010101" strokeWidth="2" />
              <path d="M17 34 L32 25 L47 34 Z" fill="#010101" />
              {/* door with pulsing light */}
              <rect x="29" y="39" width="6" height="11" rx="1" fill="#B9FF66" stroke="#010101" strokeWidth="1.5" className="animate-loader-door" />
            </svg>
            {/* shine sweep */}
            <div aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brand-lime/40 to-transparent animate-loader-shine" />
          </div>
          {/* orbiting dot */}
          <span
            aria-hidden
            className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-brand-black animate-loader-orbit"
          />
          <span
            aria-hidden
            className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-brand-lime border border-brand-black animate-loader-orbit-reverse"
          />
        </div>
      )}

      {variant === 'pulse' && (
        <div className={cn('relative flex items-center justify-center', sizeStyles[size].box)}>
          <span aria-hidden className="absolute inset-0 rounded-full bg-brand-lime/30 animate-ping" />
          <span aria-hidden className="absolute inset-2 rounded-full bg-brand-lime/40 animate-pulse" />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-black text-brand-lime font-extrabold text-xl shadow-lime animate-loader-bounce-soft">
            H
          </span>
        </div>
      )}

      {variant === 'bed' && (
        <div className={cn('flex items-end gap-1.5', sizeStyles[size].box, 'h-auto w-auto')}>
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              aria-hidden
              className="w-2.5 rounded-full bg-brand-black animate-loader-bed"
              style={{ height: '2rem', animationDelay: `${i * 0.12}s` }}
            />
          ))}
          <style>{`@keyframes loader-bed { 0%,100% { transform: scaleY(0.4); opacity:.4 } 50% { transform: scaleY(1); opacity:1 } }`}</style>
        </div>
      )}

      {variant === 'bars' && (
        <div className="flex items-center gap-2" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-3 w-3 rounded-full bg-brand-lime border border-brand-black animate-loader-dot"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </div>
      )}

      {label && variant !== 'bars' && (
        <div className="text-center">
          <p className={cn('font-bold text-brand-black tracking-tight', sizeStyles[size].text)}>
            {label}
          </p>
          <p className="mt-1 text-xs font-medium text-neutral-400">Hostel Ghar • Find • Book • Stay</p>
        </div>
      )}

      <span className="sr-only">{label}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className={cn('fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-md', className)}>
        {content}
      </div>
    );
  }

  return content;
};

export default HostelLoader;
