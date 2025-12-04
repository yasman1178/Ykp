# Core Web Vitals Optimization Guide

## Overview

This guide provides comprehensive strategies for measuring and optimizing Core Web Vitals (LCP, FID, CLS) to achieve Google's "Good" thresholds and improve search rankings.

## Core Web Vitals Metrics

### 1. Largest Contentful Paint (LCP)
**Target**: < 2.5 seconds
**Measures**: Loading performance
**What it tracks**: Time until the largest content element is visible

### 2. First Input Delay (FID) / Interaction to Next Paint (INP)
**Target**: < 100ms (FID) / < 200ms (INP)
**Measures**: Interactivity
**What it tracks**: Time from user interaction to browser response

### 3. Cumulative Layout Shift (CLS)
**Target**: < 0.1
**Measures**: Visual stability
**What it tracks**: Unexpected layout shifts during page load

---

## Current Performance Baseline

### Measurement Tools

1. **Google PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Provides lab and field data
   - Specific recommendations

2. **Chrome DevTools Lighthouse**
   - Built into Chrome browser
   - Detailed performance audit
   - Actionable suggestions

3. **Web Vitals Extension**
   - Real-time monitoring
   - Chrome extension
   - Easy to use

4. **Google Search Console**
   - Core Web Vitals report
   - Real user data
   - URL-level insights

### Baseline Measurement Checklist

- [ ] Run Lighthouse audit on homepage
- [ ] Run Lighthouse audit on blog listing page
- [ ] Run Lighthouse audit on 3 article pages
- [ ] Run Lighthouse audit on product pages
- [ ] Check Google Search Console Core Web Vitals report
- [ ] Document current scores for all metrics
- [ ] Identify bottlenecks and issues

---

## LCP Optimization Strategies

### Target: < 2.5 seconds

#### 1. Image Optimization

**Problem**: Large, unoptimized images slow down LCP

**Solutions**:

```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/blog/article-image.jpg"
  alt="Descriptive alt text"
  width={1200}
  height={630}
  priority // For above-fold images
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

**Best Practices**:
- Use WebP format with JPG fallback
- Implement lazy loading for below-fold images
- Use `priority` prop for LCP images
- Compress images to <200KB
- Use responsive images with srcset
- Implement blur placeholders

#### 2. Server Response Time

**Problem**: Slow server response delays content delivery

**Solutions**:

```javascript
// next.config.js
module.exports = {
  // Enable compression
  compress: true,
  
  // Optimize production builds
  productionBrowserSourceMaps: false,
  
  // Enable SWC minification
  swcMinify: true,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }
};
```

**Best Practices**:
- Use CDN for static assets
- Enable HTTP/2 or HTTP/3
- Implement server-side caching
- Optimize database queries
- Use edge functions when possible

#### 3. Resource Loading Optimization

**Problem**: Render-blocking resources delay LCP

**Solutions**:

```html
<!-- Preload critical resources -->
<link rel="preload" href="/fonts/playfair-display.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/critical.css" as="style">

<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Defer non-critical CSS -->
<link rel="stylesheet" href="/non-critical.css" media="print" onload="this.media='all'">
```

**Best Practices**:
- Inline critical CSS
- Defer non-critical CSS
- Preload key resources
- Minimize render-blocking JavaScript
- Use font-display: swap

#### 4. Code Splitting

**Problem**: Large JavaScript bundles slow down page load

**Solutions**:

```typescript
// Dynamic imports for code splitting
import dynamic from 'next/dynamic';

const BlogSearchFilter = dynamic(() => import('@/components/blog/BlogSearchFilter'), {
  loading: () => <div>Loading...</div>,
  ssr: false // Client-side only if not needed for SEO
});

// Route-based code splitting (automatic in Next.js)
// Each page gets its own bundle
```

**Best Practices**:
- Split code by routes
- Lazy load heavy components
- Use dynamic imports
- Minimize third-party scripts
- Tree-shake unused code

---

## FID/INP Optimization Strategies

### Target: < 100ms (FID) / < 200ms (INP)

#### 1. JavaScript Execution Optimization

**Problem**: Long-running JavaScript blocks main thread

**Solutions**:

```typescript
// Break up long tasks
function processLargeDataset(data) {
  const chunkSize = 100;
  let index = 0;
  
  function processChunk() {
    const chunk = data.slice(index, index + chunkSize);
    // Process chunk
    index += chunkSize;
    
    if (index < data.length) {
      // Use setTimeout to yield to main thread
      setTimeout(processChunk, 0);
    }
  }
  
  processChunk();
}

// Use Web Workers for heavy computations
const worker = new Worker('/worker.js');
worker.postMessage(heavyData);
worker.onmessage = (e) => {
  // Handle result
};
```

**Best Practices**:
- Break up long tasks (>50ms)
- Use requestIdleCallback for non-critical work
- Defer non-essential JavaScript
- Use Web Workers for heavy computations
- Minimize main thread work

#### 2. Third-Party Script Optimization

**Problem**: Third-party scripts block interactivity

**Solutions**:

```html
<!-- Defer third-party scripts -->
<script src="https://analytics.example.com/script.js" defer></script>

<!-- Use async for independent scripts -->
<script src="https://ads.example.com/script.js" async></script>

<!-- Load scripts after page load -->
<script>
  window.addEventListener('load', () => {
    const script = document.createElement('script');
    script.src = 'https://widget.example.com/script.js';
    document.body.appendChild(script);
  });
</script>
```

**Best Practices**:
- Audit all third-party scripts
- Remove unnecessary scripts
- Defer or async load scripts
- Use facade patterns for heavy widgets
- Self-host critical scripts

#### 3. Event Handler Optimization

**Problem**: Heavy event handlers delay interactions

**Solutions**:

```typescript
// Debounce expensive operations
import { debounce } from 'lodash';

const handleSearch = debounce((query: string) => {
  // Expensive search operation
  performSearch(query);
}, 300);

// Use passive event listeners
element.addEventListener('scroll', handleScroll, { passive: true });

// Optimize React re-renders
const MemoizedComponent = React.memo(ExpensiveComponent);

// Use useMemo and useCallback
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
```

**Best Practices**:
- Debounce/throttle frequent events
- Use passive event listeners
- Optimize React re-renders
- Minimize DOM manipulations
- Use event delegation

---

## CLS Optimization Strategies

### Target: < 0.1

#### 1. Image and Media Dimensions

**Problem**: Images without dimensions cause layout shifts

**Solutions**:

```typescript
// Always specify width and height
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  layout="responsive"
/>

// For CSS backgrounds, use aspect-ratio
.hero-image {
  aspect-ratio: 16 / 9;
  background-image: url('/hero.jpg');
  background-size: cover;
}

// Reserve space for dynamic content
.ad-container {
  min-height: 250px; // Reserve space for ad
}
```

**Best Practices**:
- Always set width and height attributes
- Use aspect-ratio CSS property
- Reserve space for ads and embeds
- Use skeleton screens
- Avoid inserting content above existing content

#### 2. Font Loading Optimization

**Problem**: Font swaps cause layout shifts

**Solutions**:

```css
/* Use font-display: swap */
@font-face {
  font-family: 'Playfair Display';
  src: url('/fonts/playfair-display.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
  font-style: normal;
}

/* Preload critical fonts */
<link rel="preload" href="/fonts/playfair-display.woff2" as="font" type="font/woff2" crossorigin>

/* Use system fonts as fallback */
body {
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
}
```

**Best Practices**:
- Use font-display: swap
- Preload critical fonts
- Use system font fallbacks
- Subset fonts to reduce size
- Consider variable fonts

#### 3. Dynamic Content Handling

**Problem**: Dynamically inserted content causes shifts

**Solutions**:

```typescript
// Reserve space for dynamic content
const [isLoading, setIsLoading] = useState(true);

return (
  <div style={{ minHeight: isLoading ? '400px' : 'auto' }}>
    {isLoading ? (
      <Skeleton height={400} />
    ) : (
      <DynamicContent />
    )}
  </div>
);

// Use CSS transforms instead of changing layout properties
// Bad: changes layout
element.style.top = '100px';

// Good: doesn't affect layout
element.style.transform = 'translateY(100px)';
```

**Best Practices**:
- Reserve space for dynamic content
- Use skeleton screens
- Avoid inserting content above fold
- Use CSS transforms for animations
- Load critical content first

#### 4. Animation Optimization

**Problem**: Animations that affect layout cause CLS

**Solutions**:

```css
/* Use transform and opacity for animations */
.animated-element {
  /* Bad: causes layout shift */
  /* animation: slide 0.3s ease; */
  
  /* Good: doesn't affect layout */
  animation: slideTransform 0.3s ease;
}

@keyframes slideTransform {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Use will-change for complex animations */
.complex-animation {
  will-change: transform, opacity;
}
```

**Best Practices**:
- Use transform and opacity only
- Avoid animating layout properties
- Use will-change sparingly
- Remove will-change after animation
- Use CSS animations over JavaScript

---

## Implementation Checklist

### Phase 1: Measurement (Week 1)

- [ ] Install Web Vitals library
- [ ] Set up performance monitoring
- [ ] Run Lighthouse audits on all key pages
- [ ] Document baseline metrics
- [ ] Identify top 3 issues per metric
- [ ] Create performance budget

### Phase 2: LCP Optimization (Week 2)

- [ ] Optimize all images (WebP, compression)
- [ ] Implement Next.js Image component
- [ ] Add image dimensions
- [ ] Preload critical resources
- [ ] Inline critical CSS
- [ ] Enable CDN for static assets
- [ ] Optimize server response time
- [ ] Implement code splitting

### Phase 3: FID/INP Optimization (Week 3)

- [ ] Audit and optimize JavaScript
- [ ] Break up long tasks
- [ ] Defer non-critical scripts
- [ ] Optimize third-party scripts
- [ ] Implement debouncing/throttling
- [ ] Use passive event listeners
- [ ] Optimize React re-renders
- [ ] Minimize main thread work

### Phase 4: CLS Optimization (Week 4)

- [ ] Add dimensions to all images
- [ ] Optimize font loading
- [ ] Reserve space for dynamic content
- [ ] Use skeleton screens
- [ ] Fix animation issues
- [ ] Test on various devices
- [ ] Validate with Lighthouse
- [ ] Monitor real user data

### Phase 5: Monitoring (Ongoing)

- [ ] Set up continuous monitoring
- [ ] Track metrics in Google Search Console
- [ ] Monitor real user data
- [ ] Set up alerts for regressions
- [ ] Regular performance audits
- [ ] Optimize based on data

---

## Performance Monitoring Implementation

### Web Vitals Library

```typescript
// lib/web-vitals-tracking.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Send to your analytics service
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }
}

export function initWebVitals() {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}
```

### Usage in _app.tsx

```typescript
// pages/_app.tsx
import { useEffect } from 'react';
import { initWebVitals } from '@/lib/web-vitals-tracking';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initWebVitals();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
```

---

## Performance Budget

### Target Metrics

| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| LCP | < 2.5s | 2.5-4.0s | > 4.0s |
| FID | < 100ms | 100-300ms | > 300ms |
| CLS | < 0.1 | 0.1-0.25 | > 0.25 |
| FCP | < 1.8s | 1.8-3.0s | > 3.0s |
| TTFB | < 600ms | 600-1800ms | > 1800ms |

### Bundle Size Budget

| Resource | Budget | Current | Status |
|----------|--------|---------|--------|
| JavaScript | < 200KB | TBD | 🔍 |
| CSS | < 50KB | TBD | 🔍 |
| Images | < 500KB | TBD | 🔍 |
| Fonts | < 100KB | TBD | 🔍 |
| Total | < 1MB | TBD | 🔍 |

---

## Testing and Validation

### Testing Checklist

- [ ] Test on desktop (Chrome, Firefox, Safari)
- [ ] Test on mobile (iOS Safari, Chrome Android)
- [ ] Test on slow 3G connection
- [ ] Test with CPU throttling
- [ ] Test with cache disabled
- [ ] Test with different screen sizes
- [ ] Validate with Lighthouse
- [ ] Validate with PageSpeed Insights
- [ ] Check Google Search Console

### Validation Tools

1. **Lighthouse CI**
   - Automated testing in CI/CD
   - Performance regression detection
   - Budget enforcement

2. **WebPageTest**
   - Detailed waterfall analysis
   - Multiple location testing
   - Connection speed simulation

3. **Chrome DevTools**
   - Performance profiling
   - Network analysis
   - Coverage analysis

---

## Success Metrics

### Primary KPIs (90-day targets)

- **LCP**: < 2.5s on 75% of page loads
- **FID**: < 100ms on 75% of page loads
- **CLS**: < 0.1 on 75% of page loads
- **Overall "Good" Rating**: 90%+ of URLs

### Secondary KPIs

- **Lighthouse Score**: > 90
- **Page Load Time**: < 3s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 200KB (JS)

### Business Impact

- **Bounce Rate**: -15%
- **Session Duration**: +20%
- **Pages per Session**: +15%
- **Conversion Rate**: +10%

---

## Common Issues and Solutions

### Issue 1: Large LCP due to hero image

**Solution**:
- Use Next.js Image with priority
- Optimize image size and format
- Preload the image
- Use blur placeholder

### Issue 2: High FID from third-party scripts

**Solution**:
- Defer non-critical scripts
- Use facade pattern for widgets
- Load scripts after user interaction
- Consider removing unnecessary scripts

### Issue 3: CLS from web fonts

**Solution**:
- Use font-display: swap
- Preload critical fonts
- Use system font fallbacks
- Subset fonts

### Issue 4: Slow server response time

**Solution**:
- Enable caching
- Use CDN
- Optimize database queries
- Implement edge functions

---

## Next Steps

1. **Measure Current Performance**
   - Run audits on all key pages
   - Document baseline metrics
   - Identify bottlenecks

2. **Implement Optimizations**
   - Follow phase-by-phase checklist
   - Test after each change
   - Monitor improvements

3. **Continuous Monitoring**
   - Set up automated monitoring
   - Track real user data
   - Regular performance audits

4. **Iterate and Improve**
   - Analyze performance data
   - Identify new opportunities
   - Implement further optimizations
