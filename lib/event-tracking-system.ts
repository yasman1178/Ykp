/**
 * Comprehensive Event Tracking System
 * Automatic tracking for page views, scrolls, clicks, forms, and videos
 */

import EnhancedAnalyticsManager, {
  PerformanceMetrics,
  ClickData,
  FormInteractionData,
} from './analytics-enhanced';

// ============================================================================
// Event Tracking Manager
// ============================================================================

class EventTrackingSystem {
  private static instance: EventTrackingSystem;
  private isInitialized = false;
  private scrollDepthTracked: Set<number> = new Set();
  private formStartTracked: Set<string> = new Set();
  private performanceMetrics: Partial<PerformanceMetrics> = {};

  private constructor() {}

  public static getInstance(): EventTrackingSystem {
    if (!EventTrackingSystem.instance) {
      EventTrackingSystem.instance = new EventTrackingSystem();
    }
    return EventTrackingSystem.instance;
  }

  /**
   * Initialize all event tracking
   */
  initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    this.setupScrollTracking();
    this.setupClickTracking();
    this.setupFormTracking();
    this.setupPerformanceTracking();
    this.setupVideoTracking();

    this.isInitialized = true;
  }

  /**
   * Reset tracking state (call on route change)
   */
  reset(): void {
    this.scrollDepthTracked.clear();
    this.formStartTracked.clear();
    this.performanceMetrics = {};
  }

  /**
   * Setup scroll depth tracking (25%, 50%, 75%, 100%)
   */
  private setupScrollTracking(): void {
    let maxScrollDepth = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
      }

      // Track milestones: 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !this.scrollDepthTracked.has(milestone)) {
          this.scrollDepthTracked.add(milestone);
          
          EnhancedAnalyticsManager.trackScrollDepth({
            page_path: window.location.pathname,
            scroll_depth: milestone,
            max_scroll_depth: maxScrollDepth,
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * Setup automatic click tracking for CTAs and links
   */
  private setupClickTracking(): void {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Find the actual clickable element (might be nested)
      const clickableElement = target.closest('a, button, [role="button"]') as HTMLElement;
      if (!clickableElement) return;

      const elementType = this.getElementType(clickableElement);
      const elementText = this.getElementText(clickableElement);
      const elementUrl = clickableElement.getAttribute('href') || undefined;
      const elementId = clickableElement.id || undefined;

      // Track the click
      const clickData: ClickData = {
        element_type: elementType,
        element_text: elementText,
        element_url: elementUrl,
        element_id: elementId,
        page_path: window.location.pathname,
      };

      EnhancedAnalyticsManager.trackClick(clickData);

      // Track specific click types
      if (elementUrl) {
        // Phone number clicks
        if (elementUrl.startsWith('tel:')) {
          EnhancedAnalyticsManager.trackConversion({
            conversion_type: 'phone_click',
            value: 0.5,
            source: window.location.pathname,
            medium: 'website',
          });
        }
        
        // Email clicks
        if (elementUrl.startsWith('mailto:')) {
          EnhancedAnalyticsManager.trackConversion({
            conversion_type: 'email_click',
            value: 0.5,
            source: window.location.pathname,
            medium: 'website',
          });
        }

        // External link clicks
        if (this.isExternalLink(elementUrl)) {
          EnhancedAnalyticsManager.trackEvent('outbound_click', {
            link_url: elementUrl,
            link_text: elementText,
          });
        }
      }
    };

    document.addEventListener('click', handleClick, true);
  }

  /**
   * Setup form interaction tracking
   */
  private setupFormTracking(): void {
    // Track form start (first interaction)
    const handleFormStart = (event: Event) => {
      const target = event.target as HTMLElement;
      const form = target.closest('form');
      
      if (form) {
        const formId = form.id || form.name || 'unnamed-form';
        const formName = form.getAttribute('data-form-name') || form.name || 'Unnamed Form';

        if (!this.formStartTracked.has(formId)) {
          this.formStartTracked.add(formId);

          const formData: FormInteractionData = {
            form_id: formId,
            form_name: formName,
            interaction_type: 'start',
            page_path: window.location.pathname,
          };

          EnhancedAnalyticsManager.trackFormInteraction(formData);
        }
      }
    };

    // Track form submission
    const handleFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      const formId = form.id || form.name || 'unnamed-form';
      const formName = form.getAttribute('data-form-name') || form.name || 'Unnamed Form';

      const formData: FormInteractionData = {
        form_id: formId,
        form_name: formName,
        interaction_type: 'submit',
        page_path: window.location.pathname,
      };

      EnhancedAnalyticsManager.trackFormInteraction(formData);
    };

    // Track field interactions
    const handleFieldInteraction = (event: Event) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      const form = target.closest('form');

      if (form && target.name) {
        const formId = form.id || form.name || 'unnamed-form';
        const formName = form.getAttribute('data-form-name') || form.name || 'Unnamed Form';

        const formData: FormInteractionData = {
          form_id: formId,
          form_name: formName,
          field_name: target.name,
          interaction_type: 'field_interaction',
          page_path: window.location.pathname,
        };

        EnhancedAnalyticsManager.trackFormInteraction(formData);
      }
    };

    // Listen for form events
    document.addEventListener('focus', handleFormStart, true);
    document.addEventListener('submit', handleFormSubmit, true);
    document.addEventListener('change', handleFieldInteraction, true);
  }

  /**
   * Setup performance tracking with Core Web Vitals
   */
  private setupPerformanceTracking(): void {
    if (typeof window === 'undefined' || !('performance' in window)) return;

    // Wait for page load to collect metrics
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.collectPerformanceMetrics();
      }, 0);
    });

    // Track navigation timing
    if ('PerformanceObserver' in window) {
      try {
        // Navigation timing
        const navObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            this.performanceMetrics.page_load_time = entry.loadEventEnd - entry.fetchStart;
            this.performanceMetrics.dom_content_loaded = entry.domContentLoadedEventEnd - entry.fetchStart;
            this.performanceMetrics.ttfb = entry.responseStart - entry.requestStart;
          });
        });
        navObserver.observe({ entryTypes: ['navigation'] });
      } catch (e) {
        // Navigation timing not supported
      }

      // Resource timing
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          let totalResourceTime = 0;
          entries.forEach((entry: any) => {
            totalResourceTime += entry.duration;
          });
          this.performanceMetrics.resource_load_time = totalResourceTime;
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (e) {
        // Resource timing not supported
      }
    }
  }

  /**
   * Collect and report performance metrics
   */
  private collectPerformanceMetrics(): void {
    if (!('performance' in window)) return;

    const navigation = performance.getEntriesByType('navigation')[0] as any;
    
    if (navigation) {
      this.performanceMetrics.page_load_time = navigation.loadEventEnd - navigation.fetchStart;
      this.performanceMetrics.dom_content_loaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
      this.performanceMetrics.ttfb = navigation.responseStart - navigation.requestStart;
    }

    // Get paint timing
    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach((entry: any) => {
      if (entry.name === 'first-contentful-paint') {
        this.performanceMetrics.fcp = entry.startTime;
      }
    });

    // Report metrics
    EnhancedAnalyticsManager.trackPerformance(
      this.performanceMetrics as PerformanceMetrics,
      window.location.pathname
    );
  }

  /**
   * Setup video play tracking
   */
  private setupVideoTracking(): void {
    const trackVideoEvent = (video: HTMLVideoElement, eventType: string, data?: any) => {
      const videoTitle = video.title || video.getAttribute('data-title') || 'Untitled Video';
      const videoUrl = video.currentSrc || video.src;

      EnhancedAnalyticsManager.trackEvent('video_' + eventType, {
        video_title: videoTitle,
        video_url: videoUrl,
        video_duration: video.duration,
        video_current_time: video.currentTime,
        video_percent: Math.round((video.currentTime / video.duration) * 100),
        ...data,
      });
    };

    // Track video play
    document.addEventListener('play', (event) => {
      const video = event.target as HTMLVideoElement;
      if (video.tagName === 'VIDEO') {
        trackVideoEvent(video, 'play');
      }
    }, true);

    // Track video pause
    document.addEventListener('pause', (event) => {
      const video = event.target as HTMLVideoElement;
      if (video.tagName === 'VIDEO') {
        trackVideoEvent(video, 'pause');
      }
    }, true);

    // Track video complete
    document.addEventListener('ended', (event) => {
      const video = event.target as HTMLVideoElement;
      if (video.tagName === 'VIDEO') {
        trackVideoEvent(video, 'complete');
      }
    }, true);

    // Track video progress (25%, 50%, 75%)
    const videoProgressTracked = new WeakMap<HTMLVideoElement, Set<number>>();

    document.addEventListener('timeupdate', (event) => {
      const video = event.target as HTMLVideoElement;
      if (video.tagName === 'VIDEO' && video.duration) {
        const percent = Math.round((video.currentTime / video.duration) * 100);
        
        if (!videoProgressTracked.has(video)) {
          videoProgressTracked.set(video, new Set());
        }

        const tracked = videoProgressTracked.get(video)!;
        const milestones = [25, 50, 75];

        milestones.forEach(milestone => {
          if (percent >= milestone && !tracked.has(milestone)) {
            tracked.add(milestone);
            trackVideoEvent(video, 'progress', { milestone });
          }
        });
      }
    }, true);
  }

  /**
   * Get element type for tracking
   */
  private getElementType(element: HTMLElement): 'cta' | 'link' | 'button' | 'image' | 'nav' {
    // Check for CTA classes or attributes
    if (
      element.classList.contains('cta') ||
      element.classList.contains('btn-primary') ||
      element.getAttribute('data-cta') === 'true'
    ) {
      return 'cta';
    }

    // Check for navigation
    if (element.closest('nav') || element.classList.contains('nav-link')) {
      return 'nav';
    }

    // Check for image links
    if (element.querySelector('img') || element.tagName === 'IMG') {
      return 'image';
    }

    // Check for buttons
    if (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') {
      return 'button';
    }

    // Default to link
    return 'link';
  }

  /**
   * Get element text for tracking
   */
  private getElementText(element: HTMLElement): string {
    // Try aria-label first
    const ariaLabel = element.getAttribute('aria-label');
    if (ariaLabel) return ariaLabel;

    // Try data-label
    const dataLabel = element.getAttribute('data-label');
    if (dataLabel) return dataLabel;

    // Try text content
    const textContent = element.textContent?.trim();
    if (textContent && textContent.length < 100) return textContent;

    // Try alt text for images
    const img = element.querySelector('img');
    if (img?.alt) return img.alt;

    // Fallback
    return element.tagName.toLowerCase();
  }

  /**
   * Check if URL is external
   */
  private isExternalLink(url: string): boolean {
    try {
      const link = new URL(url, window.location.href);
      return link.hostname !== window.location.hostname;
    } catch {
      return false;
    }
  }
}

export default EventTrackingSystem.getInstance();
