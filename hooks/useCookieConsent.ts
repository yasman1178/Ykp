/**
 * Custom hook for managing cookie consent state
 * Provides reactive state management for cookie preferences
 */

import { useState, useEffect, useCallback } from 'react';
import CookieManager, { CookiePreferences, UserPreferences } from '../lib/cookie-manager';
import AnalyticsTracker from '../lib/analytics-tracker';

interface UseCookieConsentReturn {
  hasConsent: boolean;
  showBanner: boolean;
  preferences: CookiePreferences;
  userPreferences: UserPreferences;
  acceptAllCookies: () => void;
  rejectAllCookies: () => void;
  updatePreferences: (prefs: CookiePreferences) => void;
  updateUserPreferences: (prefs: Partial<UserPreferences>) => void;
  hideBanner: () => void;
  trackEvent: (eventName: string, parameters?: Record<string, any>) => void;
  trackPageView: (url: string, title?: string) => void;
}

export const useCookieConsent = (): UseCookieConsentReturn => {
  const [hasConsent, setHasConsent] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    language: 'en',
    theme: 'gold',
    cookieConsent: preferences,
    consentTimestamp: new Date().toISOString(),
    consentVersion: '1.0',
  });

  // Initialize state on mount
  useEffect(() => {
    const initializeConsent = async () => {
      const consent = CookieManager.hasConsent();
      const needsUpdate = CookieManager.needsConsentUpdate();
      const currentPrefs = CookieManager.getCookiePreferences();
      const currentUserPrefs = CookieManager.getUserPreferences();

      setHasConsent(consent);
      setShowBanner(!consent || needsUpdate);
      setPreferences(currentPrefs);
      setUserPreferences(currentUserPrefs);

      // Initialize visitor tracking
      AnalyticsTracker.loadExistingVisitor();
      if (!AnalyticsTracker.isReady()) {
        await AnalyticsTracker.initializeVisitor({
          language: currentUserPrefs.language,
          theme: currentUserPrefs.theme,
          referrer: document.referrer,
        });
      }

      // Initialize analytics if consent already given
      if (consent && currentPrefs.analytics) {
        CookieManager.initializeAnalytics();
      }
    };

    // Delay initialization to avoid hydration mismatch
    const timer = setTimeout(initializeConsent, 100);
    return () => clearTimeout(timer);
  }, []);

  const acceptAllCookies = useCallback(async () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };

    CookieManager.setCookiePreferences(allAccepted);
    CookieManager.initializeAnalytics();
    
    setPreferences(allAccepted);
    setHasConsent(true);
    setShowBanner(false);

    // Track consent in local database
    await AnalyticsTracker.trackCookieConsent(allAccepted);

    // Track consent acceptance in Google Analytics
    setTimeout(() => {
      CookieManager.trackEvent('cookie_consent_accepted', {
        consent_type: 'accept_all',
        timestamp: new Date().toISOString(),
      });
    }, 1000);
  }, []);

  const rejectAllCookies = useCallback(async () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };

    CookieManager.setCookiePreferences(essentialOnly);
    
    setPreferences(essentialOnly);
    setHasConsent(true);
    setShowBanner(false);

    // Track consent in local database
    await AnalyticsTracker.trackCookieConsent(essentialOnly);
  }, []);

  const updatePreferences = useCallback(async (prefs: CookiePreferences) => {
    CookieManager.setCookiePreferences(prefs);
    
    if (prefs.analytics) {
      CookieManager.initializeAnalytics();
    }
    
    setPreferences(prefs);
    setHasConsent(true);
    setShowBanner(false);

    // Track consent in local database
    await AnalyticsTracker.trackCookieConsent(prefs);

    // Track custom preferences in Google Analytics
    setTimeout(() => {
      CookieManager.trackEvent('cookie_preferences_updated', {
        analytics: prefs.analytics,
        marketing: prefs.marketing,
        preferences: prefs.preferences,
        timestamp: new Date().toISOString(),
      });
    }, 1000);
  }, []);

  const updateUserPreferences = useCallback((prefs: Partial<UserPreferences>) => {
    const updated = { ...userPreferences, ...prefs };
    CookieManager.setUserPreferences(updated);
    setUserPreferences(updated);

    // Track user preference changes
    if (preferences.analytics) {
      CookieManager.trackEvent('user_preferences_updated', {
        language: prefs.language,
        theme: prefs.theme,
        timestamp: new Date().toISOString(),
      });
    }
  }, [userPreferences, preferences.analytics]);

  const hideBanner = useCallback(() => {
    setShowBanner(false);
  }, []);

  const trackEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    CookieManager.trackEvent(eventName, parameters);
  }, []);

  const trackPageView = useCallback((url: string, title?: string) => {
    CookieManager.trackPageView(url, title);
  }, []);

  return {
    hasConsent,
    showBanner,
    preferences,
    userPreferences,
    acceptAllCookies,
    rejectAllCookies,
    updatePreferences,
    updateUserPreferences,
    hideBanner,
    trackEvent,
    trackPageView,
  };
};

export default useCookieConsent;