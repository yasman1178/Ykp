/**
 * Web Vitals Tracking Library
 * Monitors and reports Core Web Vitals metrics to analytics
 */

import { onCLS, onINP, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

// Analytics endpoint configuration
const ANALYTICS_ENDPOINT = '/api/analytics/web-vitals';

/**
 * Send metric to analytics service (internal endpoint disabled)
 */
function sendToAnalytics(_metric: Metric) {
  // Internal endpoint disabled; metrics sent to Google Analytics 4 via sendToGoogleAnalytics
}

/**
 * Send metric to Google Analytics 4
 */
function sendToGoogleAnalytics(metric: Metric) {
  if (typeof window.gtag === 'undefined') return;

  // Convert CLS value to a more readable format (multiply by 1000)
  const value = metric.name === 'CLS' 
    ? Math.round(metric.value * 1000) 
    : Math.round(metric.value);

  window.gtag('event', metric.name, {
    value,
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta,
    metric_rating: metric.rating,
    event_category: 'Web Vitals',
    event_label: metric.id,
    non_interaction: true,
  });
}

/**
 * Log metric to console (development only)
 */
function logMetric(metric: Metric) {
  if (process.env.NODE_ENV === 'development') {
    const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
    console.log(`${emoji} ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id
    });
  }
}

/**
 * Handle metric reporting
 */
function handleMetric(metric: Metric) {
  // Log in development
  logMetric(metric);

  // Send to analytics
  sendToAnalytics(metric);

  // Send to Google Analytics
  sendToGoogleAnalytics(metric);
}

/**
 * Initialize Web Vitals tracking
 * Call this once when the app loads
 */
export function initWebVitals() {
  try {
    onCLS(handleMetric);
    onINP(handleMetric);
    onFCP(handleMetric);
    onLCP(handleMetric);
    onTTFB(handleMetric);
  } catch (error) {
    console.error('Error initializing Web Vitals:', error);
  }
}

/**
 * Get performance rating based on thresholds
 */
export function getPerformanceRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 600, poor: 1800 }
  };

  const threshold = thresholds[metric as keyof typeof thresholds];
  if (!threshold) return 'needs-improvement';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Format metric value for display
 */
export function formatMetricValue(metric: string, value: number): string {
  if (metric === 'CLS') {
    return value.toFixed(3);
  }
  if (metric === 'TTFB' || metric === 'FCP' || metric === 'LCP') {
    return `${(value / 1000).toFixed(2)}s`;
  }
  if (metric === 'FID') {
    return `${Math.round(value)}ms`;
  }
  return value.toString();
}

/**
 * Performance monitoring hook for React
 * Note: Import React in your component to use this hook
 */
// Removed hook - use initWebVitals() directly in useEffect instead

/**
 * Export for Next.js reportWebVitals
 */
export function reportWebVitals(metric: Metric) {
  handleMetric(metric);
}

// All functions are already exported above
