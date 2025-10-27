// Performance Optimization System for Manufacturing Blog
// Core Web Vitals optimization and loading performance enhancements

import { BlogArticleEnhanced } from '@/types/blog-enhanced';

export interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
}

export interface ImageOptimizationConfig {
  quality: number;
  format: 'webp' | 'avif' | 'jpeg';
  sizes: string;
  priority: boolean;
  placeholder: 'blur' | 'empty';
}

export class PerformanceOptimizer {
  private observer: IntersectionObserver | null = null;
  private performanceMetrics: Partial<PerformanceMetrics> = {};

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializePerformanceTracking();
      this.initializeLazyLoading();
    }
  }

  /**
   * Initialize Core Web Vitals tracking
   */
  private initializePerformanceTracking(): void {
    // Track LCP (Largest Contentful Paint)
    this.trackLCP();
    
    // Track FID (First Input Delay)
    this.trackFID();
    
    // Track CLS (Cumulative Layout Shift)
    this.trackCLS();
    
    // Track FCP (First Contentful Paint)
    this.trackFCP();
    
    // Track TTFB (Time to First Byte)
    this.trackTTFB();
  }

  /**
   * Track Largest Contentful Paint
   */
  private trackLCP(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.performanceMetrics.lcp = lastEntry.startTime;
        
        // Send to analytics if LCP > 2.5s (poor)
        if (lastEntry.startTime > 2500) {
          console.warn('Poor LCP detected:', lastEntry.startTime);
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  /**
   * Track First Input Delay
   */
  private trackFID(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.performanceMetrics.fid = entry.processingStart - entry.startTime;
          
          // Send to analytics if FID > 100ms (poor)
          if (entry.processingStart - entry.startTime > 100) {
            console.warn('Poor FID detected:', entry.processingStart - entry.startTime);
          }
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    }
  }

  /**
   * Track Cumulative Layout Shift
   */
  private trackCLS(): void {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        this.performanceMetrics.cls = clsValue;
        
        // Send to analytics if CLS > 0.1 (poor)
        if (clsValue > 0.1) {
          console.warn('Poor CLS detected:', clsValue);
        }
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }

  /**
   * Track First Contentful Paint
   */
  private trackFCP(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.performanceMetrics.fcp = entry.startTime;
          }
        });
      });
      
      observer.observe({ entryTypes: ['paint'] });
    }
  }

  /**
   * Track Time to First Byte
   */
  private trackTTFB(): void {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const entry = navigationEntries[0];
        this.performanceMetrics.ttfb = entry.responseStart - entry.requestStart;
      }
    }
  }

  /**
   * Initialize lazy loading for images and components
   */
  private initializeLazyLoading(): void {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              
              // Handle lazy loading for images
              if (target.tagName === 'IMG') {
                const img = target as HTMLImageElement;
                const dataSrc = img.getAttribute('data-src');
                if (dataSrc) {
                  img.src = dataSrc;
                  img.removeAttribute('data-src');
                  img.classList.remove('lazy');
                }
              }
              
              // Handle lazy loading for components
              if (target.hasAttribute('data-lazy-component')) {
                target.setAttribute('data-loaded', 'true');
              }
              
              this.observer?.unobserve(target);
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.1
        }
      );
    }
  }

  /**
   * Optimize image loading configuration
   */
  getImageOptimizationConfig(
    priority: boolean = false,
    size: 'small' | 'medium' | 'large' = 'medium'
  ): ImageOptimizationConfig {
    const sizeConfigs = {
      small: {
        quality: 75,
        sizes: '(max-width: 768px) 100vw, 33vw'
      },
      medium: {
        quality: 80,
        sizes: '(max-width: 768px) 100vw, 50vw'
      },
      large: {
        quality: 85,
        sizes: '(max-width: 768px) 100vw, 75vw'
      }
    };

    return {
      quality: sizeConfigs[size].quality,
      format: 'webp',
      sizes: sizeConfigs[size].sizes,
      priority,
      placeholder: priority ? 'blur' : 'empty'
    };
  }

  /**
   * Preload critical resources
   */
  preloadCriticalResources(): void {
    if (typeof window === 'undefined') return;

    // Preload critical fonts
    this.preloadFont('/fonts/inter-var.woff2', 'font/woff2');
    this.preloadFont('/fonts/playfair-display-var.woff2', 'font/woff2');
    
    // Preload critical images
    this.preloadImage('/images/hero-bg.webp');
    this.preloadImage('/images/logo.webp');
    
    // Preload critical CSS
    this.preloadCSS('/styles/critical.css');
  }

  /**
   * Preload font
   */
  private preloadFont(href: string, type: string): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'font';
    link.type = type;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }

  /**
   * Preload image
   */
  private preloadImage(href: string): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'image';
    document.head.appendChild(link);
  }

  /**
   * Preload CSS
   */
  private preloadCSS(href: string): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'style';
    document.head.appendChild(link);
  }

  /**
   * Optimize bundle loading
   */
  optimizeBundleLoading(): void {
    // Prefetch next page resources
    this.prefetchNextPageResources();
    
    // Preconnect to external domains
    this.preconnectExternalDomains();
  }

  /**
   * Prefetch resources for likely next pages
   */
  private prefetchNextPageResources(): void {
    const currentPath = window.location.pathname;
    
    // Prefetch likely next pages based on current page
    if (currentPath === '/blog') {
      // Prefetch first few articles
      this.prefetchResource('/blog/anubis-ancient-figure-travel-pillows');
      this.prefetchResource('/blog/eye-of-horus-protection-pillow-manufacturing');
    } else if (currentPath.startsWith('/blog/')) {
      // Prefetch related articles and products
      this.prefetchResource('/products');
      this.prefetchResource('/wholesale');
    }
  }

  /**
   * Prefetch resource
   */
  private prefetchResource(href: string): void {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  }

  /**
   * Preconnect to external domains
   */
  private preconnectExternalDomains(): void {
    const domains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com'
    ];

    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  /**
   * Optimize article content loading
   */
  optimizeArticleLoading(article: BlogArticleEnhanced): void {
    // Preload article images
    if (article.featuredImage) {
      this.preloadImage(article.featuredImage.url);
    }
    
    // Preload gallery images (first 3)
    if (article.gallery) {
      article.gallery.slice(0, 3).forEach(image => {
        this.preloadImage(image.url);
      });
    }
    
    // Lazy load remaining content
    this.setupLazyLoadingForArticle();
  }

  /**
   * Setup lazy loading for article content
   */
  private setupLazyLoadingForArticle(): void {
    if (!this.observer) return;

    // Observe all lazy-loadable elements
    const lazyElements = document.querySelectorAll('.lazy, [data-lazy-component]');
    lazyElements.forEach(element => {
      this.observer?.observe(element);
    });
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics(): Partial<PerformanceMetrics> {
    return { ...this.performanceMetrics };
  }

  /**
   * Generate performance report
   */
  generatePerformanceReport(): {
    score: number;
    recommendations: string[];
    metrics: Partial<PerformanceMetrics>;
  } {
    const metrics = this.getPerformanceMetrics();
    const recommendations: string[] = [];
    let score = 100;

    // Check LCP
    if (metrics.lcp && metrics.lcp > 2500) {
      score -= 20;
      recommendations.push('Optimize Largest Contentful Paint (LCP) - consider image optimization and server response time');
    }

    // Check FID
    if (metrics.fid && metrics.fid > 100) {
      score -= 15;
      recommendations.push('Optimize First Input Delay (FID) - reduce JavaScript execution time');
    }

    // Check CLS
    if (metrics.cls && metrics.cls > 0.1) {
      score -= 25;
      recommendations.push('Optimize Cumulative Layout Shift (CLS) - ensure proper image dimensions and avoid layout shifts');
    }

    // Check FCP
    if (metrics.fcp && metrics.fcp > 1800) {
      score -= 10;
      recommendations.push('Optimize First Contentful Paint (FCP) - optimize critical rendering path');
    }

    // Check TTFB
    if (metrics.ttfb && metrics.ttfb > 600) {
      score -= 10;
      recommendations.push('Optimize Time to First Byte (TTFB) - improve server response time');
    }

    return {
      score: Math.max(0, score),
      recommendations,
      metrics
    };
  }

  /**
   * Cleanup observers
   */
  cleanup(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// Utility functions for performance optimization
export const performanceUtils = {
  /**
   * Debounce function for performance
   */
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  /**
   * Throttle function for performance
   */
  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * Check if device is mobile
   */
  isMobile(): boolean {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  },

  /**
   * Check if connection is slow
   */
  isSlowConnection(): boolean {
    if (typeof navigator === 'undefined' || !('connection' in navigator)) return false;
    const connection = (navigator as any).connection;
    return connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  },

  /**
   * Reduce motion for accessibility
   */
  prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
};

// Export singleton instance
export const performanceOptimizer = new PerformanceOptimizer();