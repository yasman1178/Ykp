/**
 * Performance Monitoring System
 * Track Core Web Vitals, page load times, API response times, and performance degradation
 */

import EnhancedAnalyticsManager, { PerformanceMetrics } from './analytics-enhanced';

// ============================================================================
// Type Definitions
// ============================================================================

export interface WebVitalsMetrics {
  lcp: number | null;  // Largest Contentful Paint
  fid: number | null;  // First Input Delay
  cls: number | null;  // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
  fcp: number | null;  // First Contentful Paint
  inp: number | null;  // Interaction to Next Paint (new metric)
}

export interface PageLoadMetrics {
  page_load_time: number;
  dom_content_loaded: number;
  dom_interactive: number;
  resource_load_time: number;
  first_byte_time: number;
}

export interface APIPerformanceMetrics {
  endpoint: string;
  method: string;
  response_time: number;
  status_code: number;
  success: boolean;
  timestamp: number;
}

export interface PerformanceAlert {
  type: 'lcp' | 'fid' | 'cls' | 'page_load' | 'api_slow' | 'resource_error';
  severity: 'warning' | 'critical';
  message: string;
  value: number;
  threshold: number;
  timestamp: number;
}

export interface ResourceTiming {
  name: string;
  type: string;
  duration: number;
  size: number;
  start_time: number;
}

// ============================================================================
// Performance Monitoring Manager
// ============================================================================

class PerformanceMonitoringManager {
  private static instance: PerformanceMonitoringManager;
  private webVitals: Partial<WebVitalsMetrics> = {};
  private apiMetrics: APIPerformanceMetrics[] = [];
  private alerts: PerformanceAlert[] = [];
  private isInitialized = false;

  // Performance thresholds
  private readonly THRESHOLDS = {
    lcp: { good: 2500, poor: 4000 },
    fid: { good: 100, poor: 300 },
    cls: { good: 0.1, poor: 0.25 },
    ttfb: { good: 800, poor: 1800 },
    fcp: { good: 1800, poor: 3000 },
    page_load: { good: 3000, poor: 5000 },
    api_response: { good: 500, poor: 2000 },
  };

  private constructor() {}

  public static getInstance(): PerformanceMonitoringManager {
    if (!PerformanceMonitoringManager.instance) {
      PerformanceMonitoringManager.instance = new PerformanceMonitoringManager();
    }
    return PerformanceMonitoringManager.instance;
  }

  /**
   * Initialize performance monitoring
   */
  initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    this.setupWebVitalsTracking();
    this.setupPageLoadTracking();
    this.setupResourceTracking();
    this.setupAPITracking();

    this.isInitialized = true;
  }

  /**
   * Setup Core Web Vitals tracking
   */
  private setupWebVitalsTracking(): void {
    if (!('PerformanceObserver' in window)) return;

    // Track LCP - Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcp = lastEntry.renderTime || lastEntry.loadTime;

        this.webVitals.lcp = lcp;
        this.checkPerformanceThreshold('lcp', lcp);

        EnhancedAnalyticsManager.trackEvent('web_vitals_lcp', {
          value: lcp,
          rating: this.getMetricRating('lcp', lcp),
          page_path: window.location.pathname,
        });
      });

      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.warn('LCP tracking not supported');
    }

    // Track FID - First Input Delay
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;

          this.webVitals.fid = fid;
          this.checkPerformanceThreshold('fid', fid);

          EnhancedAnalyticsManager.trackEvent('web_vitals_fid', {
            value: fid,
            rating: this.getMetricRating('fid', fid),
            page_path: window.location.pathname,
          });
        });
      });

      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.warn('FID tracking not supported');
    }

    // Track CLS - Cumulative Layout Shift
    try {
      let clsValue = 0;
      let clsEntries: any[] = [];

      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            clsEntries.push(entry);
          }
        });

        this.webVitals.cls = clsValue;
      });

      clsObserver.observe({ type: 'layout-shift', buffered: true });

      // Report CLS on visibility change or page unload
      const reportCLS = () => {
        this.checkPerformanceThreshold('cls', clsValue);

        EnhancedAnalyticsManager.trackEvent('web_vitals_cls', {
          value: clsValue,
          rating: this.getMetricRating('cls', clsValue),
          page_path: window.location.pathname,
        });
      };

      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          reportCLS();
        }
      });

      window.addEventListener('beforeunload', reportCLS);
    } catch (e) {
      console.warn('CLS tracking not supported');
    }

    // Track TTFB - Time to First Byte
    try {
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const ttfb = entry.responseStart - entry.requestStart;

          this.webVitals.ttfb = ttfb;
          this.checkPerformanceThreshold('ttfb', ttfb);

          EnhancedAnalyticsManager.trackEvent('web_vitals_ttfb', {
            value: ttfb,
            rating: this.getMetricRating('ttfb', ttfb),
            page_path: window.location.pathname,
          });
        });
      });

      navigationObserver.observe({ type: 'navigation', buffered: true });
    } catch (e) {
      console.warn('TTFB tracking not supported');
    }

    // Track FCP - First Contentful Paint
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.name === 'first-contentful-paint') {
            const fcp = entry.startTime;

            this.webVitals.fcp = fcp;
            this.checkPerformanceThreshold('fcp', fcp);

            EnhancedAnalyticsManager.trackEvent('web_vitals_fcp', {
              value: fcp,
              rating: this.getMetricRating('fcp', fcp),
              page_path: window.location.pathname,
            });
          }
        });
      });

      fcpObserver.observe({ type: 'paint', buffered: true });
    } catch (e) {
      console.warn('FCP tracking not supported');
    }
  }

  /**
   * Setup page load tracking
   */
  private setupPageLoadTracking(): void {
    if (typeof window === 'undefined' || !('performance' in window)) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        const metrics = this.collectPageLoadMetrics();
        
        if (metrics) {
          // Check page load threshold
          this.checkPerformanceThreshold('page_load', metrics.page_load_time);

          // Track page load metrics
          const performanceMetrics: PerformanceMetrics = {
            lcp: this.webVitals.lcp || undefined,
            fid: this.webVitals.fid || undefined,
            cls: this.webVitals.cls || undefined,
            ttfb: this.webVitals.ttfb || undefined,
            fcp: this.webVitals.fcp || undefined,
            page_load_time: metrics.page_load_time,
            dom_content_loaded: metrics.dom_content_loaded,
            resource_load_time: metrics.resource_load_time,
          };

          EnhancedAnalyticsManager.trackPerformance(
            performanceMetrics,
            window.location.pathname
          );
        }
      }, 0);
    });
  }

  /**
   * Collect page load metrics
   */
  private collectPageLoadMetrics(): PageLoadMetrics | null {
    if (!('performance' in window)) return null;

    const navigation = performance.getEntriesByType('navigation')[0] as any;
    
    if (!navigation) return null;

    return {
      page_load_time: navigation.loadEventEnd - navigation.fetchStart,
      dom_content_loaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      dom_interactive: navigation.domInteractive - navigation.fetchStart,
      resource_load_time: navigation.loadEventEnd - navigation.responseEnd,
      first_byte_time: navigation.responseStart - navigation.requestStart,
    };
  }

  /**
   * Setup resource timing tracking
   */
  private setupResourceTracking(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry: any) => {
          // Track slow resources
          if (entry.duration > 1000) {
            EnhancedAnalyticsManager.trackEvent('slow_resource', {
              resource_name: entry.name,
              resource_type: entry.initiatorType,
              duration: entry.duration,
              size: entry.transferSize,
              page_path: window.location.pathname,
            });

            // Create alert for slow resources
            this.createAlert({
              type: 'resource_error',
              severity: 'warning',
              message: `Slow resource load: ${entry.name}`,
              value: entry.duration,
              threshold: 1000,
              timestamp: Date.now(),
            });
          }
        });
      });

      resourceObserver.observe({ type: 'resource', buffered: true });
    } catch (e) {
      console.warn('Resource timing not supported');
    }
  }

  /**
   * Setup API performance tracking
   */
  private setupAPITracking(): void {
    if (typeof window === 'undefined') return;

    // Intercept fetch requests
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const url = typeof args[0] === 'string' ? args[0] : (args[0] as Request).url;
      const method = args[1]?.method || 'GET';

      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        const responseTime = endTime - startTime;

        // Track API performance
        this.trackAPIPerformance({
          endpoint: url,
          method,
          response_time: responseTime,
          status_code: response.status,
          success: response.ok,
          timestamp: Date.now(),
        });

        return response;
      } catch (error) {
        const endTime = performance.now();
        const responseTime = endTime - startTime;

        // Track failed API call
        this.trackAPIPerformance({
          endpoint: url,
          method,
          response_time: responseTime,
          status_code: 0,
          success: false,
          timestamp: Date.now(),
        });

        throw error;
      }
    };
  }

  /**
   * Track API performance
   */
  trackAPIPerformance(metrics: APIPerformanceMetrics): void {
    this.apiMetrics.push(metrics);

    // Keep only last 100 API calls
    if (this.apiMetrics.length > 100) {
      this.apiMetrics.shift();
    }

    // Check if API is slow
    if (metrics.response_time > this.THRESHOLDS.api_response.poor) {
      this.createAlert({
        type: 'api_slow',
        severity: 'critical',
        message: `Slow API response: ${metrics.endpoint}`,
        value: metrics.response_time,
        threshold: this.THRESHOLDS.api_response.poor,
        timestamp: Date.now(),
      });
    }

    // Track in analytics
    EnhancedAnalyticsManager.trackEvent('api_performance', {
      endpoint: metrics.endpoint,
      method: metrics.method,
      response_time: metrics.response_time,
      status_code: metrics.status_code,
      success: metrics.success,
      rating: this.getAPIRating(metrics.response_time),
    });
  }

  /**
   * Get current Web Vitals
   */
  getWebVitals(): Partial<WebVitalsMetrics> {
    return { ...this.webVitals };
  }

  /**
   * Get API metrics
   */
  getAPIMetrics(): APIPerformanceMetrics[] {
    return [...this.apiMetrics];
  }

  /**
   * Get performance alerts
   */
  getAlerts(): PerformanceAlert[] {
    return [...this.alerts];
  }

  /**
   * Clear alerts
   */
  clearAlerts(): void {
    this.alerts = [];
  }

  /**
   * Check performance threshold and create alert if needed
   */
  private checkPerformanceThreshold(
    metric: keyof typeof this.THRESHOLDS,
    value: number
  ): void {
    const threshold = this.THRESHOLDS[metric];
    
    if (value > threshold.poor) {
      this.createAlert({
        type: metric as any,
        severity: 'critical',
        message: `Poor ${metric.toUpperCase()}: ${value.toFixed(2)}ms`,
        value,
        threshold: threshold.poor,
        timestamp: Date.now(),
      });
    } else if (value > threshold.good) {
      this.createAlert({
        type: metric as any,
        severity: 'warning',
        message: `${metric.toUpperCase()} needs improvement: ${value.toFixed(2)}ms`,
        value,
        threshold: threshold.good,
        timestamp: Date.now(),
      });
    }
  }

  /**
   * Create performance alert
   */
  private createAlert(alert: PerformanceAlert): void {
    this.alerts.push(alert);

    // Keep only last 50 alerts
    if (this.alerts.length > 50) {
      this.alerts.shift();
    }

    // Track alert in analytics
    EnhancedAnalyticsManager.trackEvent('performance_alert', {
      alert_type: alert.type,
      severity: alert.severity,
      value: alert.value,
      threshold: alert.threshold,
      page_path: window.location.pathname,
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Performance Alert] ${alert.message}`, alert);
    }
  }

  /**
   * Get metric rating (good, needs-improvement, poor)
   */
  private getMetricRating(metric: keyof typeof this.THRESHOLDS, value: number): string {
    const threshold = this.THRESHOLDS[metric];
    
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  /**
   * Get API response time rating
   */
  private getAPIRating(responseTime: number): string {
    if (responseTime <= this.THRESHOLDS.api_response.good) return 'good';
    if (responseTime <= this.THRESHOLDS.api_response.poor) return 'needs-improvement';
    return 'poor';
  }
}

export default PerformanceMonitoringManager.getInstance();
