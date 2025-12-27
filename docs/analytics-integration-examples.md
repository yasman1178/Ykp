# Analytics Integration Examples

## Quick Start

### 1. Basic Page Tracking (Already Integrated)

The `usePageTracking` hook is already integrated in `_app.tsx` and automatically tracks:
- Page views on route changes
- Time on page
- Session management
- Performance metrics

No additional setup needed!

### 2. Product Page Integration

```typescript
// pages/products/[id].tsx
import { useEnhancedAnalytics } from '@/hooks/useEnhancedAnalytics';
import { useEffect } from 'react';

export default function ProductPage({ product }) {
  const analytics = useEnhancedAnalytics();

  // Track product view on mount
  useEffect(() => {
    analytics.trackProductView({
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      price: product.price.wholesale,
      currency: 'USD',
      cultural_element: product.culturalElement?.name,
      collection: product.collection,
    });
  }, [product, analytics]);

  return (
    <div>
      <h1>{product.name}</h1>
      
      {/* Track CTA clicks */}
      <button 
        onClick={() => analytics.trackCTAClick('Request Wholesale Quote', '/wholesale')}
      >
        Request Quote
      </button>
      
      {/* Track link clicks */}
      <a 
        href="/catalog.pdf"
        onClick={() => analytics.trackCustomEvent('catalog_view', {
          product_id: product.id,
          product_name: product.name,
        })}
      >
        View Full Catalog
      </a>
    </div>
  );
}
```

### 3. Contact Form Integration

```typescript
// components/ContactForm.tsx
import { useConversionTracking } from '@/hooks/useConversionTracking';
import { useEnhancedAnalytics } from '@/hooks/useEnhancedAnalytics';
import { useState } from 'react';

export default function ContactForm() {
  const { trackContactForm } = useConversionTracking();
  const { trackFormStart, trackFormSubmit } = useEnhancedAnalytics();
  const [formStarted, setFormStarted] = useState(false);

  const handleFocus = () => {
    if (!formStarted) {
      trackFormStart('contact-form', 'Contact Form');
      setFormStarted(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const data = {
      form_type: 'contact' as const,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      country: formData.get('country') as string,
      message: formData.get('message') as string,
    };

    // Submit form to API
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    // Track conversion
    trackContactForm(data);
    trackFormSubmit('contact-form', 'Contact Form');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="name" 
        placeholder="Name"
        onFocus={handleFocus}
        required 
      />
      <input 
        name="email" 
        type="email"
        placeholder="Email"
        onFocus={handleFocus}
        required 
      />
      <input 
        name="company" 
        placeholder="Company"
        onFocus={handleFocus}
      />
      <input 
        name="country" 
        placeholder="Country"
        onFocus={handleFocus}
      />
      <textarea 
        name="message" 
        placeholder="Message"
        onFocus={handleFocus}
        required 
      />
      <button type="submit">Send Message</button>
    </form>
  );
}
```

### 4. Wholesale Inquiry Form

```typescript
// pages/wholesale.tsx
import { useConversionTracking } from '@/hooks/useConversionTracking';

export default function WholesalePage() {
  const { trackWholesaleInquiry } = useConversionTracking();

  const handleSubmit = async (formData) => {
    // Submit to API...
    
    // Track high-value conversion
    trackWholesaleInquiry({
      company_name: formData.company,
      contact_name: formData.name,
      email: formData.email,
      country: formData.country,
      estimated_quantity: parseInt(formData.quantity),
      products_of_interest: formData.products,
      business_type: formData.businessType,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### 5. Catalog Download Tracking

```typescript
// components/CatalogDownload.tsx
import { useConversionTracking } from '@/hooks/useConversionTracking';

export default function CatalogDownload() {
  const { trackCatalogDownload } = useConversionTracking();

  const handleDownload = (catalogType: 'full' | 'product_line' | 'collection') => {
    // Trigger download
    window.open(`/catalogs/${catalogType}.pdf`, '_blank');
    
    // Track conversion
    trackCatalogDownload(catalogType, 'download_button');
  };

  return (
    <div>
      <button onClick={() => handleDownload('full')}>
        Download Full Catalog
      </button>
      <button onClick={() => handleDownload('product_line')}>
        Download Product Line Catalog
      </button>
      <button onClick={() => handleDownload('collection')}>
        Download Collection Catalog
      </button>
    </div>
  );
}
```

### 6. Phone & Email Click Tracking

```typescript
// components/ContactInfo.tsx
import { useConversionTracking } from '@/hooks/useConversionTracking';

export default function ContactInfo() {
  const { trackPhoneClick, trackEmailClick } = useConversionTracking();

  return (
    <div>
      <a 
        href="tel:+201234567890"
        onClick={() => trackPhoneClick('+201234567890')}
      >
        📞 +20 123 456 7890
      </a>
      
      <a 
        href="mailto:info@ykp-eg.com"
        onClick={() => trackEmailClick('info@ykp-eg.com')}
      >
        ✉️ info@ykp-eg.com
      </a>
    </div>
  );
}
```

### 7. Blog Article Tracking

```typescript
// pages/blog/[slug].tsx
import { useEnhancedAnalytics } from '@/hooks/useEnhancedAnalytics';
import { useEffect } from 'react';

export default function BlogArticle({ article }) {
  const analytics = useEnhancedAnalytics();

  useEffect(() => {
    // Track article view
    analytics.trackCustomEvent('blog_view', {
      article_id: article.id,
      article_title: article.title,
      pharaonic_symbol: article.symbol,
      category: article.category,
    });
  }, [article, analytics]);

  const handleRelatedProductClick = (productId: string) => {
    analytics.trackCustomEvent('blog_to_product', {
      article_id: article.id,
      product_id: productId,
      pharaonic_symbol: article.symbol,
    });
  };

  return (
    <article>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
      
      <div className="related-products">
        {article.relatedProducts.map(product => (
          <a 
            key={product.id}
            href={`/products/${product.id}`}
            onClick={() => handleRelatedProductClick(product.id)}
          >
            {product.name}
          </a>
        ))}
      </div>
    </article>
  );
}
```

### 8. Performance Monitoring Dashboard

```typescript
// pages/admin/performance.tsx
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';

export default function PerformanceDashboard() {
  const { webVitals, apiMetrics, alerts, clearAlerts } = usePerformanceMonitoring();

  const getVitalRating = (metric: string, value: number | null) => {
    if (!value) return 'unknown';
    
    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
    };
    
    const threshold = thresholds[metric];
    if (!threshold) return 'unknown';
    
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  return (
    <div className="performance-dashboard">
      <h1>Performance Monitoring</h1>
      
      <section>
        <h2>Core Web Vitals</h2>
        <div className="metrics">
          <div className={`metric ${getVitalRating('lcp', webVitals.lcp)}`}>
            <h3>LCP</h3>
            <p>{webVitals.lcp ? `${webVitals.lcp.toFixed(0)}ms` : 'N/A'}</p>
          </div>
          
          <div className={`metric ${getVitalRating('fid', webVitals.fid)}`}>
            <h3>FID</h3>
            <p>{webVitals.fid ? `${webVitals.fid.toFixed(0)}ms` : 'N/A'}</p>
          </div>
          
          <div className={`metric ${getVitalRating('cls', webVitals.cls)}`}>
            <h3>CLS</h3>
            <p>{webVitals.cls ? webVitals.cls.toFixed(3) : 'N/A'}</p>
          </div>
        </div>
      </section>
      
      <section>
        <h2>Recent API Calls</h2>
        <table>
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Method</th>
              <th>Response Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {apiMetrics.slice(-10).map((metric, i) => (
              <tr key={i}>
                <td>{metric.endpoint}</td>
                <td>{metric.method}</td>
                <td>{metric.response_time.toFixed(0)}ms</td>
                <td>{metric.status_code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      
      <section>
        <h2>Performance Alerts</h2>
        <button onClick={clearAlerts}>Clear Alerts</button>
        <div className="alerts">
          {alerts.map((alert, i) => (
            <div key={i} className={`alert ${alert.severity}`}>
              <strong>{alert.type.toUpperCase()}</strong>: {alert.message}
              <br />
              <small>Value: {alert.value.toFixed(2)} | Threshold: {alert.threshold}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

### 9. Custom Event Tracking

```typescript
// Any component
import { useEnhancedAnalytics } from '@/hooks/useEnhancedAnalytics';

export default function MyComponent() {
  const analytics = useEnhancedAnalytics();

  const handleCustomAction = () => {
    analytics.trackCustomEvent('custom_action', {
      action_type: 'special_interaction',
      value: 10,
      metadata: {
        source: 'homepage',
        user_segment: 'wholesale',
      },
    });
  };

  return (
    <button onClick={handleCustomAction}>
      Special Action
    </button>
  );
}
```

### 10. User Properties

```typescript
// Set user properties for segmentation
import { useEnhancedAnalytics } from '@/hooks/useEnhancedAnalytics';
import { useEffect } from 'react';

export default function App() {
  const analytics = useEnhancedAnalytics();

  useEffect(() => {
    // Set user properties
    analytics.setUserProperties({
      user_language: 'ar',
      user_country: 'EG',
      user_type: 'returning',
      preferred_theme: 'gold',
      device_category: 'desktop',
    });
  }, [analytics]);

  return <div>App Content</div>;
}
```

## Testing Your Integration

### 1. Enable GA4 Debug Mode

Add to your `.env.local`:
```
NEXT_PUBLIC_GA_DEBUG=true
```

### 2. Check Browser Console

Look for analytics events in the console (development mode only).

### 3. Use GA4 DebugView

1. Go to Google Analytics 4
2. Navigate to Configure → DebugView
3. Interact with your site
4. See events in real-time

### 4. Check Local Storage

Open browser DevTools → Application → Local Storage:
- `conversions`: Recent conversion events
- `conversion_counts`: Conversion counts by source

## Common Patterns

### Track Button Clicks

```typescript
<button onClick={() => analytics.trackCTAClick('Button Text', '/destination')}>
  Click Me
</button>
```

### Track Link Clicks

```typescript
<a 
  href="/page"
  onClick={() => analytics.trackLinkClick('Link Text', '/page')}
>
  Link
</a>
```

### Track Form Interactions

```typescript
<form onSubmit={handleSubmit}>
  <input onFocus={() => analytics.trackFormStart('form-id', 'Form Name')} />
  <button type="submit">Submit</button>
</form>
```

### Track Conversions

```typescript
const { trackContactForm } = useConversionTracking();

trackContactForm({
  form_type: 'contact',
  name: 'John Doe',
  email: 'john@example.com',
  company: 'ACME Corp',
  country: 'Egypt',
  message: 'Interested in wholesale',
});
```

## Best Practices

1. **Always check cookie consent** - Tracking only works if user has consented
2. **Use descriptive event names** - Make events easy to understand in GA4
3. **Include relevant metadata** - Add context to help with analysis
4. **Track user journey** - Connect related events with session_id
5. **Monitor performance** - Keep an eye on Core Web Vitals
6. **Test in DebugView** - Verify events before deploying
7. **Document custom events** - Keep track of what you're measuring

## Troubleshooting

### Events not showing in GA4?
- Check cookie consent is granted
- Verify GA_MEASUREMENT_ID is set
- Check browser console for errors
- Enable debug mode

### Performance metrics not tracking?
- Check browser supports PerformanceObserver
- Verify analytics consent is granted
- Check console for initialization errors

### Conversions not tracking?
- Verify form submission triggers tracking
- Check localStorage for conversion data
- Verify UTM parameters are present
- Check GA4 for conversion events
