/**
 * Page Tracking Hook
 * Automatically tracks page views and initializes event tracking
 */

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import EnhancedAnalyticsManager from '../lib/analytics-enhanced';
import EventTrackingSystem from '../lib/event-tracking-system';
import AnalyticsTracker from '../lib/analytics-tracker';
import { useCookieConsent } from './useCookieConsent';

export const usePageTracking = () => {
  const router = useRouter();
  const { preferences, userPreferences } = useCookieConsent();

  // Initialize analytics and event tracking
  useEffect(() => {
    if (preferences.analytics) {
      EnhancedAnalyticsManager.initialize();
      EventTrackingSystem.initialize();
    }
  }, [preferences.analytics]);

  // Initialize local analytics tracker
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load existing visitor or initialize new one
    AnalyticsTracker.loadExistingVisitor();
    
    if (!AnalyticsTracker.isReady()) {
      AnalyticsTracker.initializeVisitor({
        language: userPreferences.language || navigator.language || 'en',
        theme: userPreferences.theme || 'gold',
        referrer: document.referrer,
      });
    }
  }, [userPreferences]);

  // Track page views on route change
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Reset tracking state
      EnhancedAnalyticsManager.resetScrollDepth();
      EnhancedAnalyticsManager.resetPerformanceReporting();
      EventTrackingSystem.reset();

      // Track page view in GA4
      if (preferences.analytics) {
        EnhancedAnalyticsManager.trackPageView({
          page_title: document.title,
          page_location: window.location.href,
          page_path: url,
          page_referrer: document.referrer,
          user_language: userPreferences.language || 'en',
          egyptian_theme: userPreferences.theme || 'gold',
        });
      }

      // Track page view in local analytics
      AnalyticsTracker.trackPageView(url, document.title);
    };

    // Track initial page view
    handleRouteChange(router.asPath);

    // Track subsequent page views
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, preferences.analytics, userPreferences]);

  // Track time on page before unload
  useEffect(() => {
    const startTime = Date.now();

    const handleBeforeUnload = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      
      if (preferences.analytics && timeOnPage >= 10) {
        EnhancedAnalyticsManager.trackEvent('timing_complete', {
          name: 'time_on_page',
          value: timeOnPage,
          page_path: router.asPath,
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router.asPath, preferences.analytics]);
};

export default usePageTracking;
