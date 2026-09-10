'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import HostelLoader from './HostelLoader';
import { cn } from '@/lib/utils/cn';

/**
 * Global route-change loader — shows the unique Hostel Ghar
 * loader overlay on every Next.js page transition.
 * Drop once in _app.tsx.
 */
const RouteLoader = ({ className }: { className?: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const start = () => {
      // small delay so fast transitions don't flash
      timer = setTimeout(() => setLoading(true), 150);
    };
    const done = () => {
      if (timer) clearTimeout(timer);
      setLoading(false);
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', done);
    router.events.on('routeChangeError', done);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', done);
      router.events.off('routeChangeError', done);
      if (timer) clearTimeout(timer);
    };
  }, [router]);

  if (!loading) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-white/85 backdrop-blur-md animate-fade-in',
        className
      )}
    >
      <HostelLoader size="lg" label="Loading Hostel Ghar…" />
    </div>
  );
};

export default RouteLoader;
