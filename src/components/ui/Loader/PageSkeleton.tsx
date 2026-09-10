'use client';

import { cn } from '@/lib/utils/cn';

export interface PageLoaderProps {
  label?: string;
  className?: string;
}

const shimmer =
  'relative overflow-hidden bg-neutral-100 before:absolute before:inset-0 before:-translate-x-full before:animate-loader-shine before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent';

/**
 * Skeleton placeholder for whole pages / cards while data loads.
 * Pair with HostelLoader (brand moment) + skeletons (layout).
 */
const PageSkeleton = ({ label = 'Loading…', className }: PageLoaderProps) => {
  return (
    <div aria-label={label} role="status" className={cn('w-full', className)}>
      <div className={cn('h-8 w-1/3 rounded-xl', shimmer)} />
      <div className={cn('mt-3 h-4 w-2/3 rounded-lg', shimmer)} />
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="rounded-2xl border border-neutral-100 bg-white p-6">
            <div className={cn('h-14 w-14 rounded-xl', shimmer)} />
            <div className={cn('mt-5 h-5 w-3/4 rounded-lg', shimmer)} />
            <div className={cn('mt-3 h-4 w-full rounded-lg', shimmer)} />
            <div className={cn('mt-2 h-4 w-5/6 rounded-lg', shimmer)} />
            <div className={cn('mt-5 h-9 w-28 rounded-xl', shimmer)} />
          </div>
        ))}
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default PageSkeleton;
