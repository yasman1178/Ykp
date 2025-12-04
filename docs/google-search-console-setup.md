# Google Search Console Integration Setup Guide

This guide walks you through setting up Google Search Console integration for automated sitemap submission and search analytics tracking.

## Prerequisites

- Google Cloud Platform account
- Google Search Console account
- Website verified in Google Search Console
- Access to Vercel environment variables

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `ykp-supplies-search-console`
4. Click "Create"

## Step 2: Enable Search Console API

1. In your Google Cloud project, go to "APIs & Services" → "Library"
2. Search for "Google Search Console API"
3. Click on it and press "Enable"
4. Wait for the API to be enabled (may take a few minutes)

## Step 3: Create Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Fill in the details:
   - **Service account name**: `search-console-service`
   - **Service account ID**: `search-console-service` (auto-generated)
   - **Description**: `Service account for Search Console API access`
4. Click "Create and Continue"
5. Skip the optional steps (Grant access & Grant users access)
6. Click "Done"

## Step 4: Generate Service Account Key

1. In the "Credentials" page, find your service account under "Service Accounts"
2. Click on the service account email
3. Go to the "Keys" tab
4. Click "Add Key" → "Create new key"
5. Select "JSON" format
6. Click "Create"
7. A JSON file will be downloaded - **keep this file secure!**

## Step 5: Extract Credentials from JSON

Open the downloaded JSON file. You'll need two values:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "search-console-service@your-project.iam.gserviceaccount.com",
  ...
}
```

Extract:
- `client_email` → This is your `GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL`
- `private_key` → This is your `GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY`

## Step 6: Add Service Account to Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property (e.g., `https://ykp-supplies.vercel.app`)
3. Click "Settings" (gear icon) in the left sidebar
4. Click "Users and permissions"
5. Click "Add user"
6. Enter the service account email: `search-console-service@your-project.iam.gserviceaccount.com`
7. Select permission level: **Owner** (required for sitemap submission)
8. Click "Add"

## Step 7: Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add the following variables:

### GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL
- **Value**: The `client_email` from your JSON file
- **Example**: `search-console-service@your-project.iam.gserviceaccount.com`
- **Environments**: Production, Preview, Development

### GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY
- **Value**: The `private_key` from your JSON file
- **Important**: Copy the entire key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- **Note**: Keep the `\n` characters as-is (they represent newlines)
- **Environments**: Production, Preview, Development

### NEXT_PUBLIC_SITE_URL
- **Value**: Your verified Search Console property URL
- **Example**: `https://ykp-supplies.vercel.app`
- **Environments**: Production, Preview, Development

## Step 8: Test the Integration

### Option 1: Using the API Endpoint

Make a POST request to test sitemap submission:

```bash
curl -X POST https://your-domain.vercel.app/api/search-console/submit-sitemap \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Option 2: Using the Browser Console

```javascript
fetch('/api/search-console/submit-sitemap', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({})
})
  .then(res => res.json())
  .then(data => console.log(data));
```

### Expected Response

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

## Step 9: Verify in Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property
3. Click "Sitemaps" in the left sidebar
4. You should see your sitemap listed with status "Success"

## Automated Sitemap Submission

### Option 1: Vercel Cron Jobs (Recommended)

Create a file `vercel.json` in your project root:

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

This will submit your sitemap daily at midnight UTC.

### Option 2: External Cron Service

Use a service like [cron-job.org](https://cron-job.org) or [EasyCron](https://www.easycron.com):

1. Create a new cron job
2. Set URL: `https://your-domain.vercel.app/api/search-console/submit-sitemap`
3. Set method: POST
4. Set schedule: Daily at midnight
5. Add header: `Content-Type: application/json`

## Troubleshooting

### Error: "Missing Google Search Console credentials"

**Solution**: Verify that environment variables are set correctly in Vercel:
- Check variable names (no typos)
- Ensure variables are set for the correct environment
- Redeploy after adding variables

### Error: "Authentication failed"

**Solution**: 
- Verify the private key is copied correctly (including BEGIN/END markers)
- Check that `\n` characters are preserved in the private key
- Ensure the service account has "Owner" permission in Search Console

### Error: "Failed to submit sitemap"

**Solution**:
- Verify your sitemap URL is accessible: `https://your-domain.vercel.app/sitemap.xml`
- Check that the site is verified in Search Console
- Ensure the service account email is added as a user in Search Console

### Error: "Method not allowed"

**Solution**: Use POST method, not GET:
```bash
curl -X POST https://your-domain.vercel.app/api/search-console/submit-sitemap
```

## API Usage Examples

### Submit Custom Sitemap URL

```javascript
fetch('/api/search-console/submit-sitemap', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    sitemapUrl: 'https://your-domain.vercel.app/custom-sitemap.xml'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

### Submit for Different Site

```javascript
fetch('/api/search-console/submit-sitemap', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    siteUrl: 'https://another-domain.com',
    sitemapUrl: 'https://another-domain.com/sitemap.xml'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## Using the Search Console Service Directly

You can also use the `SearchConsoleService` class directly in your code:

```typescript
import { getSearchConsoleService } from '@/lib/search-console-integration';

// Get top search queries
const searchConsole = getSearchConsoleService();
await searchConsole.authenticate();

const topQueries = await searchConsole.getTopQueries(30); // Last 30 days
console.log('Top queries:', topQueries);

// Get top pages
const topPages = await searchConsole.getTopPages(30);
console.log('Top pages:', topPages);

// Get search analytics
const analytics = await searchConsole.getSearchAnalytics({
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  dimensions: ['query', 'page'],
  rowLimit: 100
});
console.log('Analytics:', analytics);
```

## Security Best Practices

1. **Never commit credentials**: Keep the JSON key file out of version control
2. **Use environment variables**: Store credentials only in Vercel environment variables
3. **Restrict API access**: Only enable necessary APIs in Google Cloud
4. **Monitor usage**: Check Google Cloud Console for unusual API activity
5. **Rotate keys**: Periodically create new service account keys and delete old ones
6. **Limit permissions**: Use the minimum required permissions (Owner for sitemap submission)

## Next Steps

After successful setup:

1. ✅ Monitor sitemap submission in Search Console
2. ✅ Set up automated daily submissions
3. ✅ Implement search analytics tracking
4. ✅ Create analytics dashboard with Search Console data
5. ✅ Monitor indexing status and coverage issues

## Support

For issues or questions:
- Check the [Google Search Console API documentation](https://developers.google.com/webmaster-tools/search-console-api-original)
- Review Vercel logs for error messages
- Contact the development team

---

**Last Updated**: December 2024
**Requirements**: 2.2, 5.1, 5.2
