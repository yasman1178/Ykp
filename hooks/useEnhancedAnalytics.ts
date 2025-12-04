/**
 * Enhanced Analytics Hook
 * Provides comprehensive tracking functions with automatic event handling
 */

import { useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import EnhancedAnalyticsManager, {
  PageViewData,
  ProductViewData,
  ConversionData,
  ScrollDepthData,
  ClickData,
  FormInteractionData,
  UserProperties,
  PerformanceMetrics,
} from '../lib/analytics-enhanced';
import { useCookieConsent } from './useCookieConsent';

interface UseEnhancedAnalyticsReturn {
  // Page tracking
  trackPageView: (data?: Partial<PageViewData>) => void;
  
  // Product tracking
  trackProductView: (product: ProductViewData) => void;
  
  // Conversion tracking
  trackConversion: (data: ConversionData) => void;
  trackContactForm: (source: string, metadata?: Record<string, any>) => void;
  trackWholesaleInquiry: (leadQuality: number, metadata?: Record<string, any>) => void;
  trackCatalogDownload: (source: string) => void;
  trackPhoneClick: (source: string) => void;
  trackEmailClick: (source: string) => void;
  
  // Interaction tracking
  trackClick: (data: ClickData) => void;
  trackCTAClick: (ctaText: string, ctaUrl?: string) => void;
  trackLinkClick: (linkText: string, linkUrl: string) => void;
  trackScrollDepth: (depth: number) => void;
  trackFormStart: (formId: string, formName: string) => void;
  trackFormSubmit: (formId: string, formName: string) => void;
  trackFormAbandon: (formId: string, formName: string) => void;
  
  // Performance tracking
  trackPerformance: (metrics: PerformanceMetrics) => void;
  
  // User properties
  setUserProperties: (properties: UserProperties) => void;
  
  // Custom events
  trackCustomEvent: (eventName: string, parameters?: Record<string, any>) => void;
  
  // Session info
  getSessionId: () => string;
}

export const useEnhancedAnalytics = (): UseEnhancedAnalyticsReturn => {
  const router = useRouter();
  const { preferences, userPreferences } = useCookieConsent();
  const startTimeRef = useRef<number>(Date.now());
  const maxScrollDepthRef = useRef<number>(0);
  const currentScrollDepthRef = useRef<number>(0);

  // Initialize analytics when consent is given
  useEffect(() => {
    if (preferences.analytics) {
      EnhancedAnalyticsManager.initialize();
    }
  }, [preferences.analytics]);

  // Reset tracking on route change
  useEffect(() => {
    const handleRouteChange = () => {
      EnhancedAnalyticsManager.resetScrollDepth();
      EnhancedAnalyticsManager.resetPerformanceReporting();
      startTimeRef.current = Date.now();
      maxScrollDepthRef.current = 0;
      currentScrollDepthRef.current = 0;
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Track scroll depth automatically
  useEffect(() => {
    if (!preferences.analytics) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      currentScrollDepthRef.current = scrollPercent;
      
      if (scrollPercent > maxScrollDepthRef.current) {
        maxScrollDepthRef.current = scrollPercent;
      }

      // Track scroll depth
      trackScrollDepth(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [preferences.analytics]);

  // Track page view
  const trackPageView = useCallback((data?: Partial<PageViewData>) => {
    if (!preferences.analytics) return;

    const pageData: PageViewData = {
      page_title: document.title,
      page_location: window.location.href,
      page_path: router.asPath,
      page_referrer: document.referrer,
      user_language: userPreferences.language || 'en',
      egyptian_theme: userPreferences.theme || 'gold',
      ...data,
    };

    EnhancedAnalyticsManager.trackPageView(pageData);
  }, [preferences.analytics, userPreferences, router.asPath]);

  // Track product view
  const trackProductView = useCallback((product: ProductViewData) => {
    if (!preferences.analytics) return;

    EnhancedAnalyticsManager.trackProductView(product);
  }, [preferences.analytics]);

  // Track conversion
  const trackConversion = useCallback((data: ConversionData) => {
    if (!preferences.analytics) return;

    EnhancedAnalyticsManager.trackConversion(data);
  }, [preferences.analytics]);

  // Track contact form submission
  const trackContactForm = useCallback((source: string, metadata?: Record<string, any>) => {
    if (!preferences.analytics) return;

    const conversionData: ConversionData = {
      conversion_type: 'contact_form',
      value: 1,
      source: source,
      medium: 'website',
      metadata,
    };

    EnhancedAnalyticsManager.trackConversion(conversionData);
  }, [preferences.analytics]);

  // Track wholesale inquiry
  const trackWholesaleInquiry = useCallback((leadQuality: number, metadata?: Record<string, any>) => {
    if (!preferences.analytics) return;

    const conversionData: ConversionData = {
      conversion_type: 'wholesale_inquiry',
      value: 5,
      source: router.asPath,
      medium: 'website',
      lead_quality: leadQuality,
      metadata,
    };

    EnhancedAnalyticsManager.trackConversion(conversionData);
  }, [preferences.analytics, router.asPath]);

  // Track catalog download
  const trackCatalogDownload = useCallback((source: string) => {
    if (!preferences.analytics) return;

    const conversionData: ConversionData = {
      conversion_type: 'catalog_download',
      value: 2,
      source: source,
      medium: 'website',
    };

    EnhancedAnalyticsManager.trackConversion(conversionData);
  }, [preferences.analytics]);

  // Track phone click
  const trackPhoneClick = useCallback((source: string) => {
    if (!preferences.analytics) return;

    const conversionData: ConversionData = {
      conversion_type: 'phone_click',
      value: 0.5,
      source: source,
      medium: 'website',
    };

    EnhancedAnalyticsManager.trackConversion(conversionData);
  }, [preferences.analytics]);

  // Track email click
  const trackEmailClick = useCallback((source: string) => {
    if (!preferences.analytics) return;

    const conversionData: ConversionData = {
      conversion_type: 'email_click',
      value: 0.5,
      source: source,
      medium: 'website',
    };

    EnhancedAnalyticsManager.trackConversion(conversionData);
  }, [preferences.analytics]);

  // Track click
  const trackClick = useCallback((data: ClickData) => {
    if (!preferences.analytics) return;

    EnhancedAnalyticsManager.trackClick(data);
  }, [preferences.analytics]);

  // Track CTA click
  const trackCTAClick = useCallback((ctaText: string, ctaUrl?: string) => {
    if (!preferences.analytics) return;

    const clickData: ClickData = {
      element_type: 'cta',
      element_text: ctaText,
      element_url: ctaUrl,
      page_path: router.asPath,
    };

    EnhancedAnalyticsManager.trackClick(clickData);
  }, [preferences.analytics, router.asPath]);

  // Track link click
  const trackLinkClick = useCallback((linkText: string, linkUrl: string) => {
    if (!preferences.analytics) return;

    const clickData: ClickData = {
      element_type: 'link',
      element_text: linkText,
      element_url: linkUrl,
      page_path: router.asPath,
    };

    EnhancedAnalyticsManager.trackClick(clickData);
  }, [preferences.analytics, router.asPath]);

  // Track scroll depth
  const trackScrollDepth = useCallback((depth: number) => {
    if (!preferences.analytics) return;

    const scrollData: ScrollDepthData = {
      page_path: router.asPath,
      scroll_depth: depth,
      max_scroll_depth: maxScrollDepthRef.current,
    };

    EnhancedAnalyticsManager.trackScrollDepth(scrollData);
  }, [preferences.analytics, router.asPath]);

  // Track form start
  const trackFormStart = useCallback((formId: string, formName: string) => {
    if (!preferences.analytics) return;

    const formData: FormInteractionData = {
      form_id: formId,
      form_name: formName,
      interaction_type: 'start',
      page_path: router.asPath,
    };

    EnhancedAnalyticsManager.trackFormInteraction(formData);
  }, [preferences.analytics, router.asPath]);

  // Track form submit
  const trackFormSubmit = useCallback((formId: string, formName: string) => {
    if (!preferences.analytics) return;

    const formData: FormInteractionData = {
      form_id: formId,
      form_name: formName,
      interaction_type: 'submit',
      page_path: router.asPath,
    };

    EnhancedAnalyticsManager.trackFormInteraction(formData);
  }, [preferences.analytics, router.asPath]);

  // Track form abandon
  const trackFormAbandon = useCallback((formId: string, formName: string) => {
    if (!preferences.analytics) return;

    const formData: FormInteractionData = {
      form_id: formId,
      form_name: formName,
      interaction_type: 'abandon',
      page_path: router.asPath,
    };

    EnhancedAnalyticsManager.trackFormInteraction(formData);
  }, [preferences.analytics, router.asPath]);

  // Track performance
  const trackPerformance = useCallback((metrics: PerformanceMetrics) => {
    if (!preferences.analytics) return;

    EnhancedAnalyticsManager.trackPerformance(metrics, router.asPath);
  }, [preferences.analytics, router.asPath]);

  // Set user properties
  const setUserProperties = useCallback((properties: UserProperties) => {
    if (!preferences.analytics) return;

    EnhancedAnalyticsManager.setUserProperties(properties);
  }, [preferences.analytics]);

  // Track custom event
  const trackCustomEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    if (!preferences.analytics) return;

    EnhancedAnalyticsManager.trackEvent(eventName, parameters);
  }, [preferences.analytics]);

  // Get session ID
  const getSessionId = useCallback(() => {
    return EnhancedAnalyticsManager.getSessionId();
  }, []);

  // Set initial user properties
  useEffect(() => {
    if (!preferences.analytics) return;

    const deviceCategory = (): 'mobile' | 'tablet' | 'desktop' => {
      const width = window.innerWidth;
      if (width < 768) return 'mobile';
      if (width < 1024) return 'tablet';
      return 'desktop';
    };

    setUserProperties({
      user_language: userPreferences.language || 'en',
      preferred_theme: userPreferences.theme || 'gold',
      device_category: deviceCategory(),
    });
  }, [preferences.analytics, userPreferences, setUserProperties]);

  return {
    trackPageView,
    trackProductView,
    trackConversion,
    trackContactForm,
    trackWholesaleInquiry,
    trackCatalogDownload,
    trackPhoneClick,
    trackEmailClick,
    trackClick,
    trackCTAClick,
    trackLinkClick,
    trackScrollDepth,
    trackFormStart,
    trackFormSubmit,
    trackFormAbandon,
    trackPerformance,
    setUserProperties,
    trackCustomEvent,
    getSessionId,
  };
};

export default useEnhancedAnalytics;
