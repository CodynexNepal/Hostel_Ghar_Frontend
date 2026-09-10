import type { AppProps } from 'next/app';
import '@/styles/globals.css' assert { type: 'css' };
import { RouteLoader } from '@/components/ui/Loader';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RouteLoader />
      <Component {...pageProps} />
    </>
  );
}

