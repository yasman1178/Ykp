import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { usePageTracking } from '@/hooks/usePageTracking';
import '@/styles/globals.css';

export default function App({ Component, pageProps, router }: AppProps) {
  const { preferences } = useCookieConsent();

  // Automatically track page views
  usePageTracking(router);

  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <>
      {/* Default SEO Meta Tags */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Google Analytics - only load if user consented and ID is available */}
      {GA_MEASUREMENT_ID && preferences.analytics && (
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
      )}

      <Layout {...pageProps}>
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
        <CookieConsentBanner />
      </Layout>
    </>
  );
}