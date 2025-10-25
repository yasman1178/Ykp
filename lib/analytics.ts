/**
 * Comprehensive Analytics System for Pharaonic Pillows Website
 * Tracks visitor behavior, B2B leads, and Egyptian heritage content engagement
 */

import CookieManager from './cookie-manager';

export interface AnalyticsEvent {
  name: string;
  parameters?: Record<string, any>;
  timestamp?: string;
}

export interface PageViewData {
  page_title: string;
  page_location: string;
  page_referrer?: string;
  user_language?: string;
  egyptian_theme?: string;
}

export interface ProductEngagement {
  product_id: string;
  product_name: string;
  product_category: 'b123' | 't' | 'tb';
  action: 'view' | 'image_click' | 'inquiry' | 'share';
  engagement_duration?: number;
}

export interface BlogEngagement {
  article_id: string;
  article_title: string;
  pharaonic_symbol: string;
  action: 'view' | 'scroll_depth' | 'related_product_click' | 'share';
  scroll_percentage?: number;
  time_on_page?: number;
}

export interface B2BLeadData {
  lead_type: 'wholesale_inquiry' | 'partnership_application' | 'contact_form';
  company_name?: string;
  country?: string;
  estimated_quantity?: number;
  products_of_interest?: string[];
  lead_quality_score?: number;
}

export interface ConversionData {
  conversion_type: 'blog_to_product' | 'homepage_to_inquiry' | 'product_to_wholesale';
  source_page: string;
  target_page: string;
  pharaonic_symbol?: string;
  product_category?: string;
}

class AnalyticsManager {
  private static instance: AnalyticsManager;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager();
    }
    return AnalyticsManager.instance;
  }

  /**
   * Initialize Google Analytics with Egyptian website configuration
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

    // Configure Google Analytics for Egyptian B2B website
    if ((window as any).gtag) {
      (window as any).gtag('config', GA_MEASUREMENT_ID, {
        // Enhanced ecommerce for B2B tracking
        send_page_view: false, // We'll handle page views manually
        anonymize_ip: true,
        cookie_flags: 'SameSite=Lax;Secure',
        
        // Custom dimensions for Egyptian website
        custom_map: {
          'custom_dimension_1': 'egyptian_theme',
          'custom_dimension_2': 'user_language',
          'custom_dimension_3': 'pharaonic_symbol',
          'custom_dimension_4': 'product_category',
          'custom_dimension_5': 'lead_type',
        },
      });

      this.isInitialized = true;
    }
  }

  /**
   * Track page views with Egyptian context
   */
  trackPageView(data: PageViewData): void {
    if (!this.canTrack()) return;

    (window as any).gtag('event', 'page_view', {
      page_title: data.page_title,
      page_location: data.page_location,
      page_referrer: data.page_referrer || document.referrer,
      egyptian_theme: data.egyptian_theme || 'gold',
      user_language: data.user_language || 'en',
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track product engagement for B2B analytics
   */
  trackProductEngagement(data: ProductEngagement): void {
    if (!this.canTrack()) return;

    (window as any).gtag('event', 'product_engagement', {
      product_id: data.product_id,
      product_name: data.product_name,
      product_category: data.product_category,
      engagement_action: data.action,
      engagement_duration: data.engagement_duration,
      event_category: 'Product Interaction',
      event_label: `${data.product_category}_${data.action}`,
      timestamp: new Date().toISOString(),
    });

    // Track specific product actions
    switch (data.action) {
      case 'view':
        this.trackEvent('view_item', {
          item_id: data.product_id,
          item_name: data.product_name,
          item_category: data.product_category,
          content_type: 'pharaonic_pillow',
        });
        break;
      case 'inquiry':
        this.trackEvent('generate_lead', {
          item_id: data.product_id,
          item_name: data.product_name,
          lead_type: 'product_inquiry',
          value: 1,
        });
        break;
    }
  }

  /**
   * Track blog engagement and symbol-to-product conversions
   */
  trackBlogEngagement(data: BlogEngagement): void {
    if (!this.canTrack()) return;

    (window as any).gtag('event', 'blog_engagement', {
      article_id: data.article_id,
      article_title: data.article_title,
      pharaonic_symbol: data.pharaonic_symbol,
      engagement_action: data.action,
      scroll_percentage: data.scroll_percentage,
      time_on_page: data.time_on_page,
      event_category: 'Blog Interaction',
      event_label: `${data.pharaonic_symbol}_${data.action}`,
      timestamp: new Date().toISOString(),
    });

    // Track symbol-specific engagement
    if (data.action === 'related_product_click') {
      this.trackEvent('symbol_to_product_conversion', {
        pharaonic_symbol: data.pharaonic_symbol,
        article_id: data.article_id,
        conversion_type: 'blog_to_product',
        value: 1,
      });
    }
  }

  /**
   * Track B2B leads and partnership inquiries
   */
  trackB2BLead(data: B2BLeadData): void {
    if (!this.canTrack()) return;

    // Calculate lead quality score
    const qualityScore = this.calculateLeadQuality(data);

    (window as any).gtag('event', 'generate_lead', {
      lead_type: data.lead_type,
      company_name: data.company_name,
      country: data.country,
      estimated_quantity: data.estimated_quantity,
      products_of_interest: data.products_of_interest?.join(','),
      lead_quality_score: qualityScore,
      event_category: 'B2B Lead Generation',
      event_label: data.lead_type,
      value: qualityScore,
      timestamp: new Date().toISOString(),
    });

    // Track high-value leads separately
    if (qualityScore >= 8) {
      this.trackEvent('high_value_lead', {
        lead_type: data.lead_type,
        lead_quality_score: qualityScore,
        estimated_quantity: data.estimated_quantity,
        country: data.country,
      });
    }
  }

  /**
   * Track conversion funnels
   */
  trackConversion(data: ConversionData): void {
    if (!this.canTrack()) return;

    (window as any).gtag('event', 'conversion', {
      conversion_type: data.conversion_type,
      source_page: data.source_page,
      target_page: data.target_page,
      pharaonic_symbol: data.pharaonic_symbol,
      product_category: data.product_category,
      event_category: 'Conversion Tracking',
      event_label: data.conversion_type,
      value: 1,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track Egyptian heritage content performance
   */
  trackHeritageEngagement(symbolName: string, engagementType: string, value?: number): void {
    if (!this.canTrack()) return;

    (window as any).gtag('event', 'heritage_engagement', {
      pharaonic_symbol: symbolName,
      engagement_type: engagementType,
      event_category: 'Egyptian Heritage',
      event_label: `${symbolName}_${engagementType}`,
      value: value || 1,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track user journey milestones
   */
  trackUserJourney(milestone: string, additionalData?: Record<string, any>): void {
    if (!this.canTrack()) return;

    (window as any).gtag('event', 'user_journey', {
      milestone: milestone,
      event_category: 'User Journey',
      event_label: milestone,
      ...additionalData,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track custom events
   */
  trackEvent(eventName: string, parameters?: Record<string, any>): void {
    if (!this.canTrack()) return;

    (window as any).gtag('event', eventName, {
      ...parameters,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track scroll depth for content engagement
   */
  trackScrollDepth(page: string, depth: number): void {
    if (!this.canTrack()) return;

    // Only track significant scroll milestones
    const milestones = [25, 50, 75, 90, 100];
    if (milestones.includes(depth)) {
      (window as any).gtag('event', 'scroll', {
        event_category: 'Engagement',
        event_label: page,
        value: depth,
        scroll_depth: depth,
      });
    }
  }

  /**
   * Track time on page for content analysis
   */
  trackTimeOnPage(page: string, timeInSeconds: number): void {
    if (!this.canTrack() || timeInSeconds < 10) return;

    (window as any).gtag('event', 'timing_complete', {
      name: 'time_on_page',
      value: timeInSeconds,
      event_category: 'Engagement',
      event_label: page,
    });
  }

  /**
   * Calculate lead quality score based on B2B data
   */
  private calculateLeadQuality(data: B2BLeadData): number {
    let score = 5; // Base score

    // Lead type scoring
    if (data.lead_type === 'partnership_application') score += 3;
    if (data.lead_type === 'wholesale_inquiry') score += 2;

    // Quantity scoring
    if (data.estimated_quantity) {
      if (data.estimated_quantity >= 1000) score += 3;
      else if (data.estimated_quantity >= 500) score += 2;
      else if (data.estimated_quantity >= 100) score += 1;
    }

    // Company information scoring
    if (data.company_name) score += 1;
    if (data.country) score += 1;

    // Product interest scoring
    if (data.products_of_interest && data.products_of_interest.length > 1) {
      score += 1;
    }

    return Math.min(score, 10); // Cap at 10
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

export default AnalyticsManager.getInstance();