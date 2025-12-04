# Google Search Console Integration

This document provides an overview of the Google Search Console integration implemented for the YKP Supplies website.

## Overview

The Search Console integration enables:
- ✅ Automated sitemap submission to Google
- ✅ Search analytics tracking (queries, pages, clicks, impressions)
- ✅ Performance monitoring for Arabic keywords
- ✅ SEO insights and reporting
- ✅ Index status monitoring

## Requirements Addressed

- **Requirement 2.2**: Technical SEO Infrastructure - Automated sitemap submission
- **Requirement 5.1**: Google Search Console Setup - Domain verification and API access
- **Requirement 5.2**: Sitemap submission and monitoring

## Architecture

### Core Components

1. **`lib/search-console-integration.ts`**
   - Main service class for Search Console API
   - Authentication and API client management
   - Methods for sitemap submission, analytics, and monitoring

2. **`pages/api/search-console/submit-sitemap.ts`**
   - API endpoint for automated sitemap submission
   - Can be called manually or via cron job
   - Returns submission status and sitemap details

3. **`docs/google-search-console-setup.md`**
   - Complete setup guide
   - Step-by-step instructions for Google Cloud and Search Console
   - Troubleshooting tips

4. **`lib/examples/search-console-usage.ts`**
   - Usage examples and patterns
   - Sample implementations for common scenarios

## Quick Start

### 1. Setup (One-time)

Follow the detailed guide in `docs/google-search-console-setup.md`:

1. Create Google Cloud project
2. Enable Search Console API
3. Create service account
4. Add service account to Search Console
5. Configure Vercel environment variables

### 2. Environment Variables

Add these to your Vercel project:

```env
GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
NEXT_PUBLIC_SITE_URL=https://ykp-supplies.vercel.app
```

### 3. Test the Integration

#### Via API Endpoint

```bash
curl -X POST https://ykp-supplies.vercel.app/api/search-console/submit-sitemap \
  -H "Content-Type: application/json"
```

#### Via Code

```typescript
import { getSearchConsoleService } from '@/lib/search-console-integration';

const searchConsole = getSearchConsoleService();
await searchConsole.authenticate();

// Submit sitemap
const result = await searchConsole.submitSitemap(
  'https://ykp-supplies.vercel.app/sitemap.xml'
);

console.log(result);
```

## API Reference

### SearchConsoleService Class

#### Authentication

```typescript
await searchConsole.authenticate();
```

Authenticates with Google Search Console API using service account credentials.

#### Submit Sitemap

```typescript
const result = await searchConsole.submitSitemap(sitemapUrl);
// Returns: { success: boolean, message: string, sitemapUrl?: string, error?: string }
```

#### Get Sitemap Status

```typescript
const status = await searchConsole.getSitemapStatus(sitemapUrl);
// Returns: SitemapStatus object with submission details
```

#### Get Top Queries

```typescript
const queries = await searchConsole.getTopQueries(30); // Last 30 days
// Returns: Array of QueryData with clicks, impressions, CTR, position
```

#### Get Top Pages

```typescript
const pages = await searchConsole.getTopPages(30); // Last 30 days
// Returns: Array of PageData with performance metrics
```

#### Get Search Analytics

```typescript
const analytics = await searchConsole.getSearchAnalytics({
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  dimensions: ['query', 'page', 'country', 'device'],
  rowLimit: 100
});
// Returns: Detailed analytics data
```

## API Endpoint

### POST /api/search-console/submit-sitemap

Submit sitemap to Google Search Console.

**Request Body** (optional):
```json
{
  "sitemapUrl": "https://ykp-supplies.vercel.app/sitemap.xml",
  "siteUrl": "https://ykp-supplies.vercel.app"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Sitemap submitted successfully to Google Search Console",
  "sitemapUrl": "https://ykp-supplies.vercel.app/sitemap.xml",
  "sitemapStatus": {
    "path": "https://ykp-supplies.vercel.app/sitemap.xml",
    "lastSubmitted": "2024-01-15T10:30:00.000Z",
    "isPending": false,
    "isSitemapsIndex": false
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Automated Sitemap Submission

### Option 1: Vercel Cron Jobs (Recommended)

Create `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/search-console/submit-sitemap",
      "schedule": "0 0 * * *"
    }
  ]
}
```

### Option 2: External Cron Service

Use [cron-job.org](https://cron-job.org) or similar:
- URL: `https://ykp-supplies.vercel.app/api/search-console/submit-sitemap`
- Method: POST
- Schedule: Daily at midnight

## Usage Examples

### Example 1: Monitor Arabic Keywords

```typescript
import { getSearchConsoleService } from '@/lib/search-console-integration';

const searchConsole = getSearchConsoleService();
await searchConsole.authenticate();

const queries = await searchConsole.getTopQueries(30);

// Filter for Arabic keywords
const arabicKeywords = queries.filter(q => 
  q.query.includes('مخدات سفر تصنيع')
);

console.log('Arabic keyword performance:', arabicKeywords);
```

### Example 2: Generate SEO Report

```typescript
import { generateSEOReport } from '@/lib/examples/search-console-usage';

const report = await generateSEOReport(30); // Last 30 days
console.log(report);
```

### Example 3: Daily Monitoring

```typescript
import { dailySitemapSubmission } from '@/lib/examples/search-console-usage';

// Run daily via cron
await dailySitemapSubmission();
```

## Integration with Analytics Dashboard

The Search Console data can be integrated into the analytics dashboard:

```typescript
// In your dashboard component
import { getSearchConsoleService } from '@/lib/search-console-integration';

export async function getServerSideProps() {
  const searchConsole = getSearchConsoleService();
  await searchConsole.authenticate();
  
  const [queries, pages] = await Promise.all([
    searchConsole.getTopQueries(7),
    searchConsole.getTopPages(7)
  ]);
  
  return {
    props: {
      searchQueries: queries,
      topPages: pages
    }
  };
}
```

## Monitoring and Alerts

### Check Sitemap Status

```typescript
const status = await searchConsole.getSitemapStatus(
  'https://ykp-supplies.vercel.app/sitemap.xml'
);

if (status.errors && status.errors > 0) {
  // Send alert
  console.error(`Sitemap has ${status.errors} errors`);
}
```

### Monitor Ranking Changes

```typescript
const queries = await searchConsole.getTopQueries(7);

// Check if target keywords are ranking
const targetKeyword = queries.find(q => q.query === 'مخدات سفر تصنيع');

if (targetKeyword && targetKeyword.position > 10) {
  // Alert: Keyword dropped out of top 10
  console.warn(`Target keyword position: ${targetKeyword.position}`);
}
```

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Verify environment variables are set correctly
   - Check private key format (must include BEGIN/END markers)
   - Ensure service account has Owner permission in Search Console

2. **Sitemap Submission Failed**
   - Verify sitemap URL is accessible
   - Check site is verified in Search Console
   - Ensure service account is added as user

3. **No Data Returned**
   - Wait 24-48 hours after initial setup
   - Verify site has search traffic
   - Check date range parameters

### Debug Mode

Enable detailed logging:

```typescript
const searchConsole = getSearchConsoleService();
await searchConsole.authenticate();

// All methods log to console automatically
const result = await searchConsole.submitSitemap(sitemapUrl);
```

## Security Considerations

- ✅ Service account credentials stored in Vercel environment variables
- ✅ Private key never exposed in client-side code
- ✅ API endpoint can be protected with authentication if needed
- ✅ Rate limiting handled by Google API
- ✅ Minimal permissions (only Search Console access)

## Performance

- API calls are made server-side only
- Results can be cached in Firebase/database
- Recommended: Cache search analytics for 1 hour
- Sitemap submission: Once per day is sufficient

## Next Steps

1. ✅ Complete Google Cloud and Search Console setup
2. ✅ Configure Vercel environment variables
3. ✅ Test sitemap submission
4. ✅ Set up automated daily submissions
5. ⏳ Implement search analytics dashboard (Task 5)
6. ⏳ Add Arabic keyword monitoring (Task 2)
7. ⏳ Create SEO performance reports

## Resources

- [Google Search Console API Documentation](https://developers.google.com/webmaster-tools/search-console-api-original)
- [Setup Guide](./docs/google-search-console-setup.md)
- [Usage Examples](./lib/examples/search-console-usage.ts)

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review Vercel logs for error messages
3. Verify Search Console setup in Google Console
4. Contact the development team

---

**Status**: ✅ Implemented
**Last Updated**: December 2024
**Requirements**: 2.2, 5.1, 5.2
