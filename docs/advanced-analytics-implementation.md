# Advanced Analytics Implementation Guide

## Overview

This document describes the comprehensive analytics tracking system implemented for the Egyptian Pharaonic Pillows website. The system includes Google Analytics 4 integration, event tracking, conversion tracking, and performance monitoring.

## Components Implemented

### 1. Enhanced Analytics System (`lib/analytics-enhanced.ts`)

**Purpose**: Core GA4 integration with enhanced measurement and custom dimensions.

**Features**:
- Enhanced GA4 configuration with custom dimensions
- Page view tracking with performance metrics
- Product view tracking with e-commerce data
- Conversion tracking with attribution
- Scroll depth tracking (25%, 50%, 75%, 100%)
- Click event tracking
- Form interaction tracking
- Performance metrics tracking
- Automatic Core Web Vitals measurement (LCP, FID, CLS)

**Custom Dimensions**:
1. `egyptian_theme` - Theme preference (gold, etc.)
2. `user_language` - User language (en, ar)
3. `pharaonic_symbol` - Cultural element engaged with
4. `product_category` - Product category viewed
5. `lead_type` - Type of lead generated
6. `cultural_element` - Specific cultural element
7. `collection` - Product collection
8. `device_category` - Device type (mobile, tablet, desktop)
9. `user_type` - New or returning user
10. `lead_quality` - Lead quality score (1-10)

### 2. Event Tracking System (`lib/event-tracking-system.ts`)

**Purpose**: Automatic tracking of user interactions without manual instrumentation.

**Features**:
- **Scroll Tracking**: Automatically tracks scroll depth at 25%, 50%, 75%, and 100%
- **Click Tracking**: Tracks all CTA, link, button, and image clicks
- **Form Tracking**: Tracks form start, field interactions, and submissions
- **Performance Tracking**: Collects page load metrics and Core Web Vitals
- **Video Tracking**: Tracks video play, pause, complete, and progress milestones
- **External Link Tracking**: Identifies and tracks outbound clicks
- **Phone/Email Click Detection**: Automatically detects and tracks contact interactions

### 3. Conversion Tracking System (`lib/conversion-tracking.ts`)

**Purpose**: Track all conversion events with source attribution and lead quality scoring.

**Conversion Types**:
1. **Contact Form Submissions**
   - Lead quality scoring (1-10)
   - Source attribution (UTM parameters, referrer)
   - Form type tracking (contact, wholesale, partnership, distributor)

2. **Wholesale Inquiries**
   - Enhanced lead quality scoring based on quantity and completeness
   - High-value lead identification (score >= 8)
   - Product interest tracking

3. **Catalog Downloads**
   - Download source tracking
   - Catalog type tracking (full, product_line, collection)

4. **Micro-Conversions**
   - Phone number clicks
   - Email address clicks
   - Value: 0.5 points each

**Lead Quality Scoring**:
- Base score varies by conversion type
- Bonus points for data completeness (company, country, etc.)
- Quantity-based scoring for wholesale inquiries
- UTM campaign presence adds to score

### 4. Performance Monitoring System (`lib/performance-monitoring.ts`)

**Purpose**: Monitor website performance and identify degradation.

**Metrics Tracked**:

**Core Web Vitals**:
- **LCP** (Largest Contentful Paint): Target < 2.5s
- **FID** (First Input Delay): Target < 100ms
- **CLS** (Cumulative Layout Shift): Target < 0.1
- **TTFB** (Time to First Byte): Target < 800ms
- **FCP** (First Contentful Paint): Target < 1.8s

**Page Load Metrics**:
- Total page load time
- DOM content loaded time
- DOM interactive time
- Resource load time

**API Performance**:
- Response time tracking
- Status code monitoring
- Success/failure tracking
- Slow API alerts (> 2000ms)

**Performance Alerts**:
- Automatic threshold checking
- Warning alerts for "needs improvement" metrics
- Critical alerts for "poor" metrics
- Alert history tracking (last 50 alerts)

## Hooks for Easy Integration

### 1. `useEnhancedAnalytics`

Comprehensive analytics hook with all tracking functions.

```typescript
import { useEnhancedAnalytics } from '@/hooks/useEnhancedAnalytics';

const MyComponent = () => {
  const analytics = useEnhancedAnalytics();

  // Track page view
  analytics.trackPageView();

  // Track product view
  analytics.trackProductView({
    item_id: 'product-123',
    item_name: 'Travel Pillow',
    item_category: 'b123',
    price: 25.99,
    cultural_element: 'Ankh Symbol',
  });

  // Track CTA click
  analytics.trackCTAClick('Request Quote', '/contact');

  // Track form submission
  analytics.trackFormSubmit('contact-form', 'Contact Form');
};
```

### 2. `useConversionTracking`

Specialized hook for conversion tracking.

```typescript
import { useConversionTracking } from '@/hooks/useConversionTracking';

const ContactForm = () => {
  const { trackContactForm } = useConversionTracking();

  const handleSubmit = (formData) => {
    trackContactForm({
      form_type: 'contact',
      name: formData.name,
      email: formData.email,
      company: formData.company,
      country: formData.country,
      message: formData.message,
    });
  };
};
```

### 3. `usePerformanceMonitoring`

Access to performance metrics and alerts.

```typescript
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';

const PerformanceDashboard = () => {
  const { webVitals, apiMetrics, alerts } = usePerformanceMonitoring();

  return (
    <div>
      <h2>Core Web Vitals</h2>
      <p>LCP: {webVitals.lcp}ms</p>
      <p>FID: {webVitals.fid}ms</p>
      <p>CLS: {webVitals.cls}</p>
      
      <h2>Performance Alerts</h2>
      {alerts.map(alert => (
        <div key={alert.timestamp}>
          {alert.severity}: {alert.message}
        </div>
      ))}
    </div>
  );
};
```

### 4. `usePageTracking`

Automatic page view tracking (already integrated in `_app.tsx`).

```typescript
import { usePageTracking } from '@/hooks/usePageTracking';

// In _app.tsx
export default function App({ Component, pageProps }: AppProps) {
  usePageTracking(); // Automatically tracks all page views
  
  return <Component {...pageProps} />;
}
```

## Google Analytics 4 Configuration

### Enhanced Measurement Settings

The GA4 configuration includes:
- Automatic page view tracking (disabled - we track manually)
- Enhanced e-commerce tracking
- Custom dimensions for Egyptian B2B context
- IP anonymization
- Secure cookie flags
- Google Signals (for cross-device tracking)

### Custom Events

All events are tracked with:
- `session_id`: Unique session identifier
- `timestamp`: ISO 8601 timestamp
- Custom parameters specific to event type

### E-commerce Events

Product views are tracked using GA4 e-commerce format:
```javascript
gtag('event', 'view_item', {
  currency: 'USD',
  value: 25.99,
  items: [{
    item_id: 'product-123',
    item_name: 'Travel Pillow',
    item_category: 'b123',
    price: 25.99,
    quantity: 1
  }]
});
```

## Performance Thresholds

### Core Web Vitals
- **LCP**: Good < 2.5s, Poor > 4s
- **FID**: Good < 100ms, Poor > 300ms
- **CLS**: Good < 0.1, Poor > 0.25
- **TTFB**: Good < 800ms, Poor > 1.8s
- **FCP**: Good < 1.8s, Poor > 3s

### Page Load
- **Good**: < 3s
- **Poor**: > 5s

### API Response
- **Good**: < 500ms
- **Poor**: > 2s

## Integration Examples

### Product Page

```typescript
import { useEnhancedAnalytics } from '@/hooks/useEnhancedAnalytics';
import { useEffect } from 'react';

const ProductPage = ({ product }) => {
  const analytics = useEnhancedAnalytics();

  useEffect(() => {
    // Track product view
    analytics.trackProductView({
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      price: product.price.wholesale,
      cultural_element: product.culturalElement.name,
      collection: product.collection,
    });
  }, [product]);

  return (
    <div>
      <h1>{product.name}</h1>
      <button onClick={() => analytics.trackCTAClick('Request Quote', '/contact')}>
        Request Quote
      </button>
    </div>
  );
};
```

### Contact Form

```typescript
import { useConversionTracking } from '@/hooks/useConversionTracking';

const ContactForm = () => {
  const { trackContactForm, trackFormStart } = useConversionTracking();

  const handleFocus = () => {
    trackFormStart('contact-form', 'Contact Form');
  };

  const handleSubmit = async (data) => {
    // Submit form...
    
    // Track conversion
    trackContactForm({
      form_type: 'contact',
      name: data.name,
      email: data.email,
      company: data.company,
      country: data.country,
      message: data.message,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onFocus={handleFocus} />
      {/* ... */}
    </form>
  );
};
```

### Phone/Email Links

```typescript
import { useConversionTracking } from '@/hooks/useConversionTracking';

const ContactInfo = () => {
  const { trackPhoneClick, trackEmailClick } = useConversionTracking();

  return (
    <div>
      <a 
        href="tel:+201234567890"
        onClick={() => trackPhoneClick('+201234567890')}
      >
        Call Us
      </a>
      
      <a 
        href="mailto:info@example.com"
        onClick={() => trackEmailClick('info@example.com')}
      >
        Email Us
      </a>
    </div>
  );
};
```

## Data Flow

```
User Interaction
    ↓
Event Tracking System (automatic)
    ↓
Enhanced Analytics Manager
    ↓
Google Analytics 4
    ↓
GA4 Dashboard / Reports
```

## Privacy & Compliance

- IP anonymization enabled
- Cookie consent integration via `useCookieConsent` hook
- No tracking without user consent
- Secure cookie flags (SameSite=Lax;Secure)
- No ad personalization signals

## Testing

### GA4 DebugView

1. Enable debug mode:
```javascript
gtag('config', 'GA_MEASUREMENT_ID', {
  debug_mode: true
});
```

2. Open GA4 DebugView in Google Analytics
3. Interact with the website
4. Verify events appear in real-time

### Console Logging

In development mode, performance alerts are logged to console:
```
[Performance Alert] Poor LCP: 4500ms
```

### Local Storage

Conversion data is stored in localStorage for debugging:
- `conversions`: Last 100 conversions
- `conversion_counts`: Conversion counts by source

## Maintenance

### Adding New Events

1. Define event in `lib/analytics-enhanced.ts`
2. Add tracking method to `EnhancedAnalyticsManager`
3. Expose via `useEnhancedAnalytics` hook
4. Document in this guide

### Updating Thresholds

Edit thresholds in `lib/performance-monitoring.ts`:
```typescript
private readonly THRESHOLDS = {
  lcp: { good: 2500, poor: 4000 },
  // ...
};
```

### Custom Dimensions

To add new custom dimensions:
1. Update GA4 property settings
2. Add to `custom_map` in `components/GoogleAnalytics.tsx`
3. Update type definitions in `lib/analytics-enhanced.ts`

## Troubleshooting

### Events Not Appearing in GA4

1. Check cookie consent is granted
2. Verify GA_MEASUREMENT_ID is set
3. Check browser console for errors
4. Enable debug mode and check DebugView

### Performance Alerts Not Working

1. Verify browser supports PerformanceObserver
2. Check console for initialization errors
3. Ensure analytics consent is granted

### Conversion Tracking Issues

1. Verify UTM parameters are present
2. Check localStorage for conversion data
3. Verify form submission triggers tracking
4. Check GA4 for conversion events

## Next Steps

1. Set up GA4 custom reports for Egyptian B2B metrics
2. Create conversion funnels in GA4
3. Set up automated alerts for performance degradation
4. Integrate with analytics dashboard component
5. A/B test different CTAs and track performance

## Support

For issues or questions:
1. Check browser console for errors
2. Review GA4 DebugView
3. Check localStorage for tracking data
4. Review this documentation
