// Advanced Analytics and Tracking System for Manufacturing Blog
// Comprehensive tracking for user behavior, conversions, and business metrics

import { BlogArticleEnhanced } from '@/types/blog-enhanced';
import { Product } from '@/lib/product-recommendation-engine-simple';

export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  customParameters?: { [key: string]: any };
}

export interface ConversionEvent {
  type: 'lead' | 'quote_request' | 'catalog_download' | 'contact_form' | 'product_inquiry';
  source: string;
  articleId?: string;
  productId?: string;
  value?: number;
  metadata?: { [key: string]: any };
}

export interface UserBehaviorEvent {
  type: 'page_view' | 'scroll' | 'time_on_page' | 'click' | 'search' | 'filter';
  page: string;
  timestamp: number;
  sessionId: string;
  userId?: string;
  data?: { [key: string]: any };
}

export interface BusinessMetrics {
  articleViews: number;
  uniqueVisitors: number;
  averageTimeOnPage: number;
  bounceRate: number;
  conversionRate: number;
  leadGeneration: number;
  quoteRequests: number;
  catalogDownloads: number;
  topPerformingArticles: Array<{
    articleId: string;
    views: number;
    conversions: number;
    conversionRate: number;
  }>;
  topPerformingProducts: Array<{
    productId: string;
    views: number;
    inquiries: number;
    conversionRate: number;
  }>;
}

export class AnalyticsSystem {
  private sessionId: string;
  private userId?: string;
  private isInitialized: boolean = false;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeAnalytics();
  }

  /**
   * Initialize analytics services
   */
  private initializeAnalytics(): void {
    if (typeof window === 'undefined') return;

    // Initialize Google Analytics 4
    this.initializeGA4();
    
    // Initialize Facebook Pixel
    this.initializeFacebookPixel();
    
    // Initialize LinkedIn Insight Tag
    this.initializeLinkedInInsight();
    
    // Initialize custom analytics
    this.initializeCustomAnalytics();
    
    this.isInitialized = true;
  }

  /**
   * Initialize Google Analytics 4
   */
  private initializeGA4(): void {
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!GA_MEASUREMENT_ID) return;

    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        custom_parameter_1: 'manufacturing_focus',
        custom_parameter_2: 'cultural_element',
        custom_parameter_3: 'user_type'
      }
    });
  }

  /**
   * Initialize Facebook Pixel
   */
  private initializeFacebookPixel(): void {
    const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
    if (!FB_PIXEL_ID) return;

    (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    (window as any).fbq('init', FB_PIXEL_ID);
    (window as any).fbq('track', 'PageView');
  }

  /**
   * Initialize LinkedIn Insight Tag
   */
  private initializeLinkedInInsight(): void {
    const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
    if (!LINKEDIN_PARTNER_ID) return;

    (window as any)._linkedin_partner_id = LINKEDIN_PARTNER_ID;
    (window as any)._linkedin_data_partner_ids = (window as any)._linkedin_data_partner_ids || [];
    (window as any)._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    document.head.appendChild(script);
  }

  /**
   * Initialize custom analytics
   */
  private initializeCustomAnalytics(): void {
    // Track session start
    this.trackEvent({
      event: 'session_start',
      category: 'engagement',
      action: 'session_start',
      customParameters: {
        session_id: this.sessionId,
        timestamp: Date.now(),
        user_agent: navigator.userAgent,
        referrer: document.referrer,
        language: navigator.language
      }
    });

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackEvent({
          event: 'page_hidden',
          category: 'engagement',
          action: 'page_hidden'
        });
      } else {
        this.trackEvent({
          event: 'page_visible',
          category: 'engagement',
          action: 'page_visible'
        });
      }
    });

    // Track scroll depth
    this.initializeScrollTracking();
    
    // Track time on page
    this.initializeTimeTracking();
  }

  /**
   * Track article view
   */
  trackArticleView(article: BlogArticleEnhanced): void {
    // Google Analytics 4
    this.trackEvent({
      event: 'page_view',
      category: 'content',
      action: 'article_view',
      label: article.slug,
      customParameters: {
        article_id: article.id,
        article_title: article.title,
        cultural_element: article.culturalElement.englishName,
        manufacturing_focus: article.category.manufacturingRelevance,
        author: article.author.name,
        reading_time: article.readingTime,
        word_count: article.content.split(' ').length
      }
    });

    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', {
        content_type: 'article',
        content_ids: [article.id],
        content_name: article.title,
        content_category: article.category.name,
        value: 0,
        currency: 'USD'
      });
    }

    // LinkedIn Insight
    if (typeof window !== 'undefined' && (window as any).lintrk) {
      (window as any).lintrk('track', { conversion_id: 'content_view' });
    }

    // Custom analytics
    this.trackUserBehavior({
      type: 'page_view',
      page: `/blog/${article.slug}`,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      data: {
        articleId: article.id,
        culturalElement: article.culturalElement.englishName,
        manufacturingRelevance: article.category.manufacturingRelevance
      }
    });
  }

  /**
   * Track product view
   */
  trackProductView(product: Product, source: string): void {
    this.trackEvent({
      event: 'view_item',
      category: 'ecommerce',
      action: 'product_view',
      label: product.id,
      value: product.price.wholesale,
      customParameters: {
        product_id: product.id,
        product_name: product.name,
        cultural_element: product.culturalElement.name,
        price: product.price.wholesale,
        currency: product.price.currency,
        source: source,
        category: product.seo.category
      }
    });

    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', {
        content_type: 'product',
        content_ids: [product.id],
        content_name: product.name,
        content_category: product.seo.category,
        value: product.price.wholesale,
        currency: product.price.currency
      });
    }
  }

  /**
   * Track conversion events
   */
  trackConversion(conversion: ConversionEvent): void {
    // Google Analytics 4
    this.trackEvent({
      event: 'conversion',
      category: 'conversion',
      action: conversion.type,
      label: conversion.source,
      value: conversion.value || 0,
      customParameters: {
        conversion_type: conversion.type,
        source: conversion.source,
        article_id: conversion.articleId,
        product_id: conversion.productId,
        ...conversion.metadata
      }
    });

    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      const fbEventMap = {
        'lead': 'Lead',
        'quote_request': 'Lead',
        'catalog_download': 'CompleteRegistration',
        'contact_form': 'Contact',
        'product_inquiry': 'Lead'
      };
      
      (window as any).fbq('track', fbEventMap[conversion.type] || 'Lead', {
        value: conversion.value || 0,
        currency: 'USD',
        source: conversion.source
      });
    }

    // LinkedIn Insight
    if (typeof window !== 'undefined' && (window as any).lintrk) {
      (window as any).lintrk('track', { conversion_id: conversion.type });
    }

    // Custom conversion tracking
    this.sendCustomEvent('conversion', {
      type: conversion.type,
      source: conversion.source,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      articleId: conversion.articleId,
      productId: conversion.productId,
      value: conversion.value,
      metadata: conversion.metadata
    });
  }

  /**
   * Track search events
   */
  trackSearch(query: string, resultsCount: number, source: string = 'blog_search'): void {
    this.trackEvent({
      event: 'search',
      category: 'engagement',
      action: 'search',
      label: query,
      value: resultsCount,
      customParameters: {
        search_term: query,
        results_count: resultsCount,
        source: source
      }
    });

    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Search', {
        search_string: query,
        content_category: 'manufacturing'
      });
    }
  }

  /**
   * Track CTA clicks
   */
  trackCTAClick(ctaType: string, location: string, articleId?: string, productId?: string): void {
    this.trackEvent({
      event: 'cta_click',
      category: 'engagement',
      action: 'cta_click',
      label: ctaType,
      customParameters: {
        cta_type: ctaType,
        location: location,
        article_id: articleId,
        product_id: productId
      }
    });

    // Track as potential conversion
    if (['wholesale', 'quote', 'contact', 'catalog'].some(type => ctaType.includes(type))) {
      this.trackConversion({
        type: ctaType.includes('quote') ? 'quote_request' : 
              ctaType.includes('catalog') ? 'catalog_download' : 
              ctaType.includes('contact') ? 'contact_form' : 'lead',
        source: location,
        articleId,
        productId
      });
    }
  }

  /**
   * Track social sharing
   */
  trackSocialShare(platform: string, articleId: string, articleTitle: string): void {
    this.trackEvent({
      event: 'share',
      category: 'engagement',
      action: 'social_share',
      label: platform,
      customParameters: {
        platform: platform,
        article_id: articleId,
        article_title: articleTitle
      }
    });

    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Share', {
        content_type: 'article',
        content_ids: [articleId]
      });
    }
  }

  /**
   * Track user behavior
   */
  trackUserBehavior(behavior: UserBehaviorEvent): void {
    // Store in local analytics
    this.sendCustomEvent('user_behavior', behavior);

    // Send to Google Analytics for specific behaviors
    if (['scroll', 'time_on_page'].includes(behavior.type)) {
      this.trackEvent({
        event: behavior.type,
        category: 'engagement',
        action: behavior.type,
        label: behavior.page,
        customParameters: behavior.data
      });
    }
  }

  /**
   * Initialize scroll tracking
   */
  private initializeScrollTracking(): void {
    let scrollDepth = 0;
    const scrollThresholds = [25, 50, 75, 90, 100];
    const trackedThresholds = new Set<number>();

    const trackScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollDepth = Math.round((scrollTop / docHeight) * 100);

      scrollThresholds.forEach(threshold => {
        if (scrollDepth >= threshold && !trackedThresholds.has(threshold)) {
          trackedThresholds.add(threshold);
          this.trackUserBehavior({
            type: 'scroll',
            page: window.location.pathname,
            timestamp: Date.now(),
            sessionId: this.sessionId,
            data: { depth: threshold }
          });
        }
      });
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          trackScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * Initialize time tracking
   */
  private initializeTimeTracking(): void {
    const startTime = Date.now();
    const timeThresholds = [30, 60, 120, 300, 600]; // seconds
    const trackedThresholds = new Set<number>();

    const trackTime = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      
      timeThresholds.forEach(threshold => {
        if (timeOnPage >= threshold && !trackedThresholds.has(threshold)) {
          trackedThresholds.add(threshold);
          this.trackUserBehavior({
            type: 'time_on_page',
            page: window.location.pathname,
            timestamp: Date.now(),
            sessionId: this.sessionId,
            data: { seconds: threshold }
          });
        }
      });
    };

    // Track time every 30 seconds
    setInterval(trackTime, 30000);

    // Track on page unload
    window.addEventListener('beforeunload', () => {
      const finalTime = Math.round((Date.now() - startTime) / 1000);
      this.trackUserBehavior({
        type: 'time_on_page',
        page: window.location.pathname,
        timestamp: Date.now(),
        sessionId: this.sessionId,
        data: { seconds: finalTime, final: true }
      });
    });
  }

  /**
   * Generic event tracking
   */
  private trackEvent(event: AnalyticsEvent): void {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.customParameters
      });
    }

    // Custom analytics
    this.sendCustomEvent('analytics_event', event);
  }

  /**
   * Send custom events to analytics endpoint (internal endpoint disabled)
   */
  private sendCustomEvent(_eventType: string, _data: any): void {
    // Internal endpoint disabled in favor of Google Analytics
  }

  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Set user ID for tracking
   */
  setUserId(userId: string): void {
    this.userId = userId;
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        user_id: userId
      });
    }
  }

  /**
   * Get business metrics (would typically fetch from analytics API)
   */
  async getBusinessMetrics(dateRange: string = '30d'): Promise<BusinessMetrics> {
    // This would typically fetch from your analytics API
    // For now, returning mock data structure
    return {
      articleViews: 0,
      uniqueVisitors: 0,
      averageTimeOnPage: 0,
      bounceRate: 0,
      conversionRate: 0,
      leadGeneration: 0,
      quoteRequests: 0,
      catalogDownloads: 0,
      topPerformingArticles: [],
      topPerformingProducts: []
    };
  }
}

// Export singleton instance
export const analyticsSystem = new AnalyticsSystem();