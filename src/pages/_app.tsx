import type { AppProps } from 'next/app';
import '@/styles/globals.css' assert { type: 'css' };
import { RouteLoader } from '@/components/ui/Loader';
import InteractiveParticles from '@/components/effects/InteractiveParticles';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <InteractiveParticles />
      <RouteLoader />
      <Component {...pageProps} />
    </>
  );
}
