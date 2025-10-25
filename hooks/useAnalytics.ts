/**
 * Custom hook for analytics tracking
 * Provides easy-to-use analytics functions for components
 */

import { useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import AnalyticsManager, {
  ProductEngagement,
  BlogEngagement,
  B2BLeadData,
  ConversionData,
  PageViewData,
} from '../lib/analytics';
import { useCookieConsent } from './useCookieConsent';

interface UseAnalyticsReturn {
  trackPageView: (data?: Partial<PageViewData>) => void;
  trackProductView: (productId: string, productName: string, category: 'b123' | 't' | 'tb') => void;
  trackProductInquiry: (productId: string, productName: string, category: 'b123' | 't' | 'tb') => void;
  trackBlogView: (articleId: string, title: string, symbol: string) => void;
  trackBlogToProduct: (articleId: string, symbol: string, productId: string) => void;
  trackB2BLead: (leadData: B2BLeadData) => void;
  trackConversion: (conversionData: ConversionData) => void;
  trackScrollDepth: (depth: number) => void;
  trackTimeOnPage: () => void;
  trackHeritageEngagement: (symbol: string, type: string) => void;
  trackUserJourney: (milestone: string, data?: Record<string, any>) => void;
}

export const useAnalytics = (): UseAnalyticsReturn => {
  const router = useRouter();
  const { preferences, userPreferences } = useCookieConsent();
  const startTimeRef = useRef<number>(Date.now());
  const scrollDepthRef = useRef<number>(0);

  // Initialize analytics when consent is given
  useEffect(() => {
    if (preferences.analytics) {
      AnalyticsManager.initialize();
    }
  }, [preferences.analytics]);

  // Track scroll depth
  useEffect(() => {
    if (!preferences.analytics) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > scrollDepthRef.current) {
        scrollDepthRef.current = scrollPercent;
      }
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
      page_referrer: document.referrer,
      user_language: userPreferences.language,
      egyptian_theme: userPreferences.theme,
      ...data,
    };

    AnalyticsManager.trackPageView(pageData);
  }, [preferences.analytics, userPreferences]);

  // Track product view
  const trackProductView = useCallback((
    productId: string,
    productName: string,
    category: 'b123' | 't' | 'tb'
  ) => {
    if (!preferences.analytics) return;

    const engagement: ProductEngagement = {
      product_id: productId,
      product_name: productName,
      product_category: category,
      action: 'view',
    };

    AnalyticsManager.trackProductEngagement(engagement);
  }, [preferences.analytics]);

  // Track product inquiry
  const trackProductInquiry = useCallback((
    productId: string,
    productName: string,
    category: 'b123' | 't' | 'tb'
  ) => {
    if (!preferences.analytics) return;

    const engagement: ProductEngagement = {
      product_id: productId,
      product_name: productName,
      product_category: category,
      action: 'inquiry',
    };

    AnalyticsManager.trackProductEngagement(engagement);
  }, [preferences.analytics]);

  // Track blog article view
  const trackBlogView = useCallback((
    articleId: string,
    title: string,
    symbol: string
  ) => {
    if (!preferences.analytics) return;

    const engagement: BlogEngagement = {
      article_id: articleId,
      article_title: title,
      pharaonic_symbol: symbol,
      action: 'view',
    };

    AnalyticsManager.trackBlogEngagement(engagement);
  }, [preferences.analytics]);

  // Track blog to product conversion
  const trackBlogToProduct = useCallback((
    articleId: string,
    symbol: string,
    productId: string
  ) => {
    if (!preferences.analytics) return;

    const engagement: BlogEngagement = {
      article_id: articleId,
      article_title: '',
      pharaonic_symbol: symbol,
      action: 'related_product_click',
    };

    AnalyticsManager.trackBlogEngagement(engagement);

    const conversion: ConversionData = {
      conversion_type: 'blog_to_product',
      source_page: router.asPath,
      target_page: `/products/${productId}`,
      pharaonic_symbol: symbol,
    };

    AnalyticsManager.trackConversion(conversion);
  }, [preferences.analytics, router.asPath]);

  // Track B2B lead
  const trackB2BLead = useCallback((leadData: B2BLeadData) => {
    if (!preferences.analytics) return;

    AnalyticsManager.trackB2BLead(leadData);
  }, [preferences.analytics]);

  // Track conversion
  const trackConversion = useCallback((conversionData: ConversionData) => {
    if (!preferences.analytics) return;

    AnalyticsManager.trackConversion(conversionData);
  }, [preferences.analytics]);

  // Track scroll depth
  const trackScrollDepth = useCallback((depth: number) => {
    if (!preferences.analytics) return;

    AnalyticsManager.trackScrollDepth(router.asPath, depth);
  }, [preferences.analytics, router.asPath]);

  // Track time on page
  const trackTimeOnPage = useCallback(() => {
    if (!preferences.analytics) return;

    const timeOnPage = Math.round((Date.now() - startTimeRef.current) / 1000);
    AnalyticsManager.trackTimeOnPage(router.asPath, timeOnPage);
  }, [preferences.analytics, router.asPath]);

  // Track heritage engagement
  const trackHeritageEngagement = useCallback((symbol: string, type: string) => {
    if (!preferences.analytics) return;

    AnalyticsManager.trackHeritageEngagement(symbol, type);
  }, [preferences.analytics]);

  // Track user journey
  const trackUserJourney = useCallback((milestone: string, data?: Record<string, any>) => {
    if (!preferences.analytics) return;

    AnalyticsManager.trackUserJourney(milestone, data);
  }, [preferences.analytics]);

  // Track scroll depth milestones
  useEffect(() => {
    if (!preferences.analytics) return;

    const checkScrollDepth = () => {
      const currentDepth = scrollDepthRef.current;
      const milestones = [25, 50, 75, 90, 100];
      
      milestones.forEach(milestone => {
        if (currentDepth >= milestone) {
          trackScrollDepth(milestone);
        }
      });
    };

    const interval = setInterval(checkScrollDepth, 5000);
    return () => clearInterval(interval);
  }, [preferences.analytics, trackScrollDepth]);

  // Track time on page when component unmounts
  useEffect(() => {
    return () => {
      trackTimeOnPage();
    };
  }, [trackTimeOnPage]);

  return {
    trackPageView,
    trackProductView,
    trackProductInquiry,
    trackBlogView,
    trackBlogToProduct,
    trackB2BLead,
    trackConversion,
    trackScrollDepth,
    trackTimeOnPage,
    trackHeritageEngagement,
    trackUserJourney,
  };
};

export default useAnalytics;