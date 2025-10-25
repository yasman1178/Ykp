# Cookie Management and Analytics System

This document explains how to set up and use the cookie management and analytics system for the Pharaonic Pillows website.

## Overview

The system includes:
- GDPR-compliant cookie consent management
- Google Analytics 4 integration
- Comprehensive visitor analytics and reporting
- Automated reporting system with alerts
- Egyptian-themed UI components

## Setup Instructions

### 1. Environment Variables

Add the following to your `.env.local` file:

```bash
# Google Analytics Configuration
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Google Analytics 4 Measurement ID.

### 2. Google Analytics Setup

1. Create a Google Analytics 4 property
2. Get your Measurement ID from the property settings
3. Add the Measurement ID to your environment variables

### 3. Cookie Consent Banner

The cookie consent banner is automatically included in the main app layout (`pages/_app.tsx`). It will:
- Show automatically for new visitors
- Allow users to customize their cookie preferences
- Store preferences in browser cookies
- Initialize analytics only when consent is given

## Usage

### Using the Analytics Hook

```typescript
import { useAnalytics } from '../hooks/useAnalytics';

const MyComponent = () => {
  const {
    trackPageView,
    trackProductView,
    trackB2BLead,
    trackConversion
  } = useAnalytics();

  // Track product view
  const handleProductView = (productId: string, name: string, category: 'b123' | 't' | 'tb') => {
    trackProductView(productId, name, category);
  };

  // Track B2B lead
  const handleLeadSubmission = (leadData: B2BLeadData) => {
    trackB2BLead(leadData);
  };

  return (
    // Your component JSX
  );
};
```

### Cookie Management

```typescript
import CookieManager from '../lib/cookie-manager';

// Check if user has given consent
const hasConsent = CookieManager.hasConsent();

// Get user preferences
const preferences = CookieManager.getCookiePreferences();

// Set user preferences
CookieManager.setCookiePreferences({
  essential: true,
  analytics: true,
  marketing: false,
  preferences: true
});

// Track custom events
CookieManager.trackEvent('custom_event', {
  category: 'User Interaction',
  label: 'Button Click'
});
```

### Accessing Reports

Reports can be accessed via API endpoints:

```bash
# Weekly report
GET /api/analytics/reports?type=weekly

# Monthly B2B report
GET /api/analytics/reports?type=monthly

# Quarterly heritage report
GET /api/analytics/reports?type=quarterly

# Core Web Vitals
GET /api/analytics/reports?type=core-web-vitals

# SEO metrics
GET /api/analytics/reports?type=seo

# Management dashboard
GET /api/analytics/reports?type=dashboard

# Trigger alerts check
POST /api/analytics/reports?type=alerts
```

### Analytics Dashboard

Access the analytics dashboard at `/admin/analytics` to view:
- Real-time visitor metrics
- B2B lead performance
- Product engagement data
- Blog article performance
- Core Web Vitals scores
- Automated alerts

## Features

### Cookie Consent Banner
- Egyptian-themed design with Pharaonic colors
- GDPR compliant with granular consent options
- Smooth animations and responsive design
- Persistent user preferences storage

### Analytics Tracking
- Page views with Egyptian theme context
- Product engagement (views, inquiries, conversions)
- Blog article performance and symbol-to-product conversions
- B2B lead quality scoring
- User journey tracking
- Scroll depth and time on page metrics

### Automated Reporting
- Weekly visitor behavior reports
- Monthly B2B lead quality reports
- Quarterly Egyptian heritage content performance
- Core Web Vitals monitoring
- SEO metrics tracking
- Automated alerts for high-value activities

### Dashboard Features
- Real-time metrics display
- Interactive charts and visualizations
- Report download functionality
- Alert notifications
- Performance monitoring

## Customization

### Adding Custom Events

```typescript
// Track custom Egyptian heritage engagement
trackHeritageEngagement('Anubis', 'symbol_interaction');

// Track user journey milestones
trackUserJourney('wholesale_inquiry_started', {
  product_category: 'b123',
  estimated_quantity: 500
});
```

### Custom Alert Conditions

Modify `lib/automated-reporting.ts` to add custom alert conditions:

```typescript
{
  name: 'Custom Alert',
  condition: 'your_custom_condition',
  threshold: 100,
  recipients: ['admin@pharaonicpillows.com'],
  enabled: true
}
```

## Privacy Compliance

The system is designed to be GDPR compliant:
- Explicit consent required for non-essential cookies
- Granular consent options
- Easy preference management
- Data anonymization for analytics
- Secure cookie handling with SameSite=Lax

## Troubleshooting

### Analytics Not Working
1. Check that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
2. Verify user has given analytics consent
3. Check browser console for errors
4. Ensure gtag script is loaded

### Cookie Banner Not Showing
1. Clear browser cookies and localStorage
2. Check if consent was already given
3. Verify component is included in `_app.tsx`

### Reports Not Generating
1. Check API endpoint responses
2. Verify analytics data is being collected
3. Check server logs for errors
4. Ensure proper permissions for report generation

## Security Features

### Admin Dashboard Protection
- Password-based authentication
- 24-hour session duration
- Automatic logout on session expiry
- Rate limiting (5 failed attempts = 5 minute lockout)
- Security headers via middleware
- No caching of admin pages

### Default Credentials
- **Development Password**: `pharaonic2024!`
- **Production**: Set `ADMIN_PASSWORD` in `.env.local`

### Rate Limiting
- Maximum 5 failed login attempts
- 5-minute lockout period after exceeding limit
- Automatic reset after successful login

## Support

For technical support or questions about the analytics system, contact the development team or refer to the project documentation.