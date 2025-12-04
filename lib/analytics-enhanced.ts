/**
 * Enhanced Analytics System for GA4
 * Comprehensive tracking with custom events, e-commerce, and performance monitoring
 */

import CookieManager from './cookie-manager';

// ============================================================================
// Type Definitions
// ============================================================================

export interface AnalyticsEvent {
  name: string;
  parameters?: Record<string, any>;
  timestamp?: string;
}

export interface PageViewData {
  page_title: string;
  page_location: string;
  page_path: string;
  page_referrer?: string;
  user_language?: string;
  egyptian_theme?: string;
  performance_metrics?: PerformanceMetrics;
}

export interface PerformanceMetrics {
  // Core Web Vitals
  lcp?: number;  // Largest Contentful Paint
  fid?: number;  // First Input Delay
  cls?: number;  // Cumulative Layout Shift
  
  // Additional metrics
  ttfb?: number;  // Time to First Byte
  fcp?: number;   // First Contentful Paint
  tti?: number;   // Time to Interactive
  tbt?: number;   // Total Blocking Time
  
  // Page-specific
  page_load_time?: number;
  dom_content_loaded?: number;
  resource_load_time?: number;
}

export interface ProductViewData {
  item_id: string;
  item_name: string;
  item_category: string;
  item_variant?: string;
  price?: number;
  currency?: string;
  cultural_element?: string;
  collection?: string;
}

export interface ConversionData {
  conversion_type: 'contact_form' | 'wholesale_inquiry' | 'catalog_download' | 'phone_click' | 'email_click';
  value?: number;
  currency?: string;
  source: string;
  medium: string;
  campaign?: string;
  product_id?: string;
  lead_quality?: number;
  metadata?: Record<string, any>;
}

export interface ScrollDepthData {
  page_path: string;
  scroll_depth: number;
  max_scroll_depth: number;
}

export interface ClickData {
  element_type: 'cta' | 'link' | 'button' | 'image' | 'nav';
  element_text: string;
  element_url?: string;
  element_id?: string;
  page_path: string;
}

export interface FormInteractionData {
  form_id: string;
  form_name: string;
  field_name?: string;
  interaction_type: 'start' | 'field_interaction' | 'submit' | 'abandon';
  page_path: string;
}

export interface UserProperties {
  user_language?: string;
  user_country?: string;
  user_type?: 'new' | 'returning';
  preferred_theme?: string;
  device_category?: 'mobile' | 'tablet' | 'desktop';
}

// ============================================================================
// Enhanced Analytics Manager
// ============================================================================

class EnhancedAnalyticsManager {
  private static instance: EnhancedAnalyticsManager;
  private isInitialized = false;
  private sessionId: string;
  private scrollDepthTracked: Set<number> = new Set();
  private performanceReported = false;

  private constructor() {
    this.sessionId = this.generateSessionId();
  }

  public static getInstance(): EnhancedAnalyticsManager {
    if (!EnhancedAnalyticsManager.instance) {
      EnhancedAnalyticsManager.instance = new EnhancedAnalyticsManager();
    }
    return EnhancedAnalyticsManager.instance;
  }

  /**
   * Initialize Google Analytics 4 with enhanced configuration
   */
  initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    const preferences = CookieManager.getCookiePreferences();
    if (!preferences.analytics) return;

    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!GA_MEASUREMENT_ID) {
      console.warn('Google Analytics Measurement ID not found');
      return;
    }

    // Configure GA4 with enhanced measurement
    if ((window as any).gtag) {
      (window as any).gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false, // Manual page view tracking
        anonymize_ip: true,
        cookie_flags: 'SameSite=Lax;Secure',
        
        // Enhanced measurement settings
        allow_google_signals: true,
        allow_ad_personalization_signals: false,
        
        // Custom dimensions for Egyptian B2B website
        custom_map: {
          dimension1: 'egyptian_theme',
          dimension2: 'user_language',
          dimension3: 'pharaonic_symbol',
          dimension4: 'product_category',
          dimension5: 'lead_type',
          dimension6: 'cultural_element',
          dimension7: 'collection',
          dimension8: 'device_category',
          dimension9: 'user_type',
          dimension10: 'lead_quality',
        },
        
        // User properties
        user_properties: {
          session_id: this.sessionId,
        },
      });

      this.isInitialized = true;
      this.setupPerformanceTracking();
    }
  }

  /**
   * Track enhanced page views with performance metrics
   */
  trackPageView(data: PageViewData): void {
    if (!this.canTrack()) return;

    const eventData: Record<string, any> = {
      page_title: data.page_title,
      page_location: data.page_location,
      page_path: data.page_path,
      page_referrer: data.page_referrer || document.referrer,
      egyptian_theme: data.egyptian_theme || 'gold',
      user_language: data.user_language || 'en',
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    };

    // Add performance metrics if available
    if (data.performance_metrics) {
      Object.assign(eventData, {
        lcp: data.performance_metrics.lcp,
        fid: data.performance_metrics.fid,
        cls: data.performance_metrics.cls,
        page_load_time: data.performance_metrics.page_load_time,
      });
    }

    (window as any).gtag('event', 'page_view', eventData);
  }

  /**
   * Track product views with e-commerce data
   */
  trackProductView(product: ProductViewData): void {
    if (!this.canTrack()) return;

    // GA4 e-commerce event
    (window as any).gtag('event', 'view_item', {
      currency: product.currency || 'USD',
      value: product.price || 0,
      items: [{
        item_id: product.item_id,
        item_name: product.item_name,
        item_category: product.item_category,
        item_variant: product.item_variant,
        price: product.price,
        quantity: 1,
      }],
      cultural_element: product.cultural_element,
      collection: product.collection,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track conversions with detailed attribution
   */
  trackConversion(data: ConversionData): void {
    if (!this.canTrack()) return;

    // Track as GA4 conversion event
    (window as any).gtag('event', 'conversion', {
      conversion_type: data.conversion_type,
      value: data.value || 1,
      currency: data.currency || 'USD',
      source: data.source,
      medium: data.medium,
      campaign: data.campaign,
      product_id: data.product_id,
      lead_quality: data.lead_quality,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
      ...data.metadata,
    });

    // Also track specific conversion types
    switch (data.conversion_type) {
      case 'contact_form':
        this.trackEvent('generate_lead', {
          lead_type: 'contact_form',
          value: data.value || 1,
          source: data.source,
        });
        break;
      case 'wholesale_inquiry':
        this.trackEvent('generate_lead', {
          lead_type: 'wholesale_inquiry',
          value: data.value || 5,
          source: data.source,
          lead_quality: data.lead_quality,
        });
        break;
      case 'catalog_download':
        this.trackEvent('file_download', {
          file_name: 'product_catalog',
          file_extension: 'pdf',
          link_text: 'Download Catalog',
        });
        break;
      case 'phone_click':
      case 'email_click':
        this.trackEvent('contact_interaction', {
          interaction_type: data.conversion_type,
          value: 0.5,
        });
        break;
    }
  }

  /**
   * Track scroll depth with milestones
   */
  trackScrollDepth(data: ScrollDepthData): void {
    if (!this.canTrack()) return;

    const milestones = [25, 50, 75, 100];
    const currentMilestone = milestones.find(m => 
      data.scroll_depth >= m && !this.scrollDepthTracked.has(m)
    );

    if (currentMilestone) {
      this.scrollDepthTracked.add(currentMilestone);
      
      (window as any).gtag('event', 'scroll', {
        scroll_depth: currentMilestone,
        max_scroll_depth: data.max_scroll_depth,
        page_path: data.page_path,
        session_id: this.sessionId,
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Track click events
   */
  trackClick(data: ClickData): void {
    if (!this.canTrack()) return;

    (window as any).gtag('event', 'click', {
      element_type: data.element_type,
      element_text: data.element_text,
      element_url: data.element_url,
      element_id: data.element_id,
      page_path: data.page_path,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });

    // Track CTA clicks separately
    if (data.element_type === 'cta') {
      this.trackEvent('cta_click', {
        cta_text: data.element_text,
        cta_url: data.element_url,
        page_path: data.page_path,
      });
    }
  }

  /**
   * Track form interactions
   */
  trackFormInteraction(data: FormInteractionData): void {
    if (!this.canTrack()) return;

    (window as any).gtag('event', 'form_interaction', {
      form_id: data.form_id,
      form_name: data.form_name,
      field_name: data.field_name,
      interaction_type: data.interaction_type,
      page_path: data.page_path,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });

    // Track form submission as conversion
    if (data.interaction_type === 'submit') {
      this.trackEvent('form_submit', {
        form_id: data.form_id,
        form_name: data.form_name,
        page_path: data.page_path,
      });
    }
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metrics: PerformanceMetrics, pagePath: string): void {
    if (!this.canTrack() || this.performanceReported) return;

    (window as any).gtag('event', 'web_vitals', {
      lcp: metrics.lcp,
      fid: metrics.fid,
      cls: metrics.cls,
      ttfb: metrics.ttfb,
      fcp: metrics.fcp,
      tti: metrics.tti,
      tbt: metrics.tbt,
      page_load_time: metrics.page_load_time,
      page_path: pagePath,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });

    this.performanceReported = true;
  }

  /**
   * Set user properties for segmentation
   */
  setUserProperties(properties: UserProperties): void {
    if (!this.canTrack()) return;

    (window as any).gtag('set', 'user_properties', {
      user_language: properties.user_language,
      user_country: properties.user_country,
      user_type: properties.user_type,
      preferred_theme: properties.preferred_theme,
      device_category: properties.device_category,
    });
  }

  /**
   * Set custom dimension
   */
  setCustomDimension(key: string, value: string): void {
    if (!this.canTrack()) return;

    (window as any).gtag('set', { [key]: value });
  }

  /**
   * Track custom event
   */
  trackEvent(eventName: string, parameters?: Record<string, any>): void {
    if (!this.canTrack()) return;

    (window as any).gtag('event', eventName, {
      ...parameters,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Setup automatic performance tracking
   */
  private setupPerformanceTracking(): void {
    if (typeof window === 'undefined') return;

    // Track Core Web Vitals using Performance Observer
    if ('PerformanceObserver' in window) {
      // LCP - Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          
          this.trackEvent('web_vitals_lcp', {
            value: lastEntry.renderTime || lastEntry.loadTime,
            rating: this.getWebVitalRating('lcp', lastEntry.renderTime || lastEntry.loadTime),
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // LCP not supported
      }

      // FID - First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            this.trackEvent('web_vitals_fid', {
              value: entry.processingStart - entry.startTime,
              rating: this.getWebVitalRating('fid', entry.processingStart - entry.startTime),
            });
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // FID not supported
      }

      // CLS - Cumulative Layout Shift
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Report CLS on page unload
        window.addEventListener('beforeunload', () => {
          this.trackEvent('web_vitals_cls', {
            value: clsValue,
            rating: this.getWebVitalRating('cls', clsValue),
          });
        });
      } catch (e) {
        // CLS not supported
      }
    }
  }

  /**
   * Get Web Vital rating (good, needs-improvement, poor)
   */
  private getWebVitalRating(metric: string, value: number): string {
    const thresholds: Record<string, { good: number; poor: number }> = {
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      ttfb: { good: 800, poor: 1800 },
      fcp: { good: 1800, poor: 3000 },
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'unknown';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return 'session_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Get session ID
   */
  getSessionId(): string {
    return this.sessionId;
  }

  /**
   * Reset scroll depth tracking (call on route change)
   */
  resetScrollDepth(): void {
    this.scrollDepthTracked.clear();
  }

  /**
   * Reset performance reporting (call on route change)
   */
  resetPerformanceReporting(): void {
    this.performanceReported = false;
  }

  /**
   * Check if tracking is allowed
   */
  private canTrack(): boolean {
    if (typeof window === 'undefined') return false;
    
    const preferences = CookieManager.getCookiePreferences();
    return preferences.analytics && (window as any).gtag;
  }
}

export default EnhancedAnalyticsManager.getInstance();
