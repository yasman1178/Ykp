/**
 * Page Tracking Hook
 * Automatically tracks page views and user activities
 */

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AnalyticsTracker from '../lib/analytics-tracker';
import { useCookieConsent } from './useCookieConsent';

export const usePageTracking = () => {
  const router = useRouter();
  const { preferences } = useCookieConsent();

  useEffect(() => {
    const handleRouteChange = async (url: string) => {
      // Only track if analytics cookies are accepted
      if (preferences.analytics && AnalyticsTracker.isReady()) {
        await AnalyticsTracker.trackPageView(url, document.title);
      }
    };

    // Track initial page load
    if (router.isReady && preferences.analytics) {
      handleRouteChange(router.asPath);
    }

    // Track route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, router.asPath, router.isReady, preferences.analytics]);
};

export default usePageTracking;