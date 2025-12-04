# Canonical URL System Documentation

## Overview

The Canonical URL System ensures proper SEO by preventing duplicate content issues, enforcing consistent URL formats, and providing proper canonical tags across all pages.

## Features

### 1. Automatic Canonical URL Generation
- Generates canonical URLs for all pages
- Enforces consistent URL format (lowercase, no trailing slashes)
- Removes tracking parameters (utm_*, fbclid, gclid, etc.)

### 2. 301 Redirects for Duplicate URLs
- Redirects uppercase URLs to lowercase
- Removes trailing slashes (except root)
- Strips tracking parameters while preserving functional query params

### 3. Canonical Meta Tags
- Automatically added to all pages via SEOHead component
- Includes hreflang tags for multilingual support
- Supports custom canonical URLs when needed

### 4. Sitemap Integration
- All sitemap entries use canonical URLs
- Ensures search engines index the correct URL version

## Implementation

### Middleware (middleware.ts)

The middleware handles automatic redirects for canonical URL enforcement:

```typescript
// Automatically redirects:
// /Products/B123 → /products/b123
// /blog/article/ → /blog/article
// /page?utm_source=google → /page
```

### Components

#### SEOHead Component
Automatically includes canonical tags on all pages:

```tsx
import { SEOHead } from '@/components/SEOHead';

<SEOHead 
  seoConfig={seoConfig}
  canonical="https://pharaonicpillows.com/products/b123"
/>
```

#### CanonicalTag Component
Standalone component for adding canonical tags:

```tsx
import { CanonicalTag } from '@/components/CanonicalTag';

<CanonicalTag 
  canonicalUrl="https://pharaonicpillows.com/custom-page"
  includeHreflang={true}
/>
```

### Utility Functions

#### generateCanonicalUrl()
Generate canonical URL for any path:

```typescript
import { generateCanonicalUrl } from '@/lib/canonical-url';

const canonical = generateCanonicalUrl('/products/b123');
// Returns: https://pharaonicpillows.com/products/b123
```

#### needsCanonicalRedirect()
Check if URL needs redirect:

```typescript
import { needsCanonicalRedirect } from '@/lib/canonical-url';

const { needsRedirect, canonicalPath } = needsCanonicalRedirect(
  '/Products/B123/',
  searchParams
);
// Returns: { needsRedirect: true, canonicalPath: '/products/b123' }
```

#### generateHreflangUrls()
Generate hreflang alternate URLs:

```typescript
import { generateHreflangUrls } from '@/lib/canonical-url';

const hreflangUrls = generateHreflangUrls('/products/b123');
// Returns: [
//   { locale: 'en-US', url: 'https://pharaonicpillows.com/products/b123' },
//   { locale: 'ar-EG', url: 'https://pharaonicpillows.com/products/b123' }
// ]
```

## Configuration

### Default Configuration

```typescript
const DEFAULT_CONFIG = {
  baseUrl: 'https://pharaonicpillows.com',
  enforceTrailingSlash: false,
  enforceLowercase: true,
  removeQueryParams: [
    'utm_source', 'utm_medium', 'utm_campaign', 
    'utm_content', 'utm_term', 'fbclid', 'gclid', 
    'ref', 'source'
  ]
};
```

### Custom Configuration

Override defaults when needed:

```typescript
const canonical = generateCanonicalUrl('/path', {
  enforceTrailingSlash: true,
  locale: 'ar'
});
```

## URL Patterns

### Handled Patterns

1. **Uppercase to Lowercase**
   - `/Products` → `/products`
   - `/BLOG/Article` → `/blog/article`

2. **Trailing Slash Removal**
   - `/products/` → `/products`
   - `/blog/article/` → `/blog/article`

3. **Tracking Parameter Removal**
   - `/page?utm_source=google&id=123` → `/page?id=123`
   - `/product?fbclid=xyz` → `/product`

4. **Pattern-Based Redirects**
   - `/products/collection/product/` → `/products/collection/product`
   - `/blog/article/` → `/blog/article`

## SEO Benefits

### 1. Prevents Duplicate Content
- Search engines see only one canonical version
- Consolidates ranking signals to canonical URL
- Prevents dilution of page authority

### 2. Improves Crawl Efficiency
- Reduces wasted crawl budget on duplicate URLs
- Helps search engines discover content faster
- Ensures proper indexing of all pages

### 3. Better User Experience
- Consistent URLs across the site
- Clean URLs without tracking parameters
- Proper multilingual support with hreflang

### 4. Analytics Accuracy
- Consolidates analytics data to canonical URLs
- Easier to track page performance
- Cleaner reporting without duplicate entries

## Testing

### Test Canonical Redirects

1. **Uppercase URLs**
   ```
   Visit: /Products/B123
   Should redirect to: /products/b123
   ```

2. **Trailing Slashes**
   ```
   Visit: /blog/article/
   Should redirect to: /blog/article
   ```

3. **Tracking Parameters**
   ```
   Visit: /page?utm_source=google
   Should redirect to: /page
   ```

### Verify Canonical Tags

1. View page source
2. Look for `<link rel="canonical" href="..." />`
3. Verify URL is correct canonical format

### Check Sitemap

1. Visit `/sitemap.xml`
2. Verify all URLs are in canonical format
3. Check for duplicate entries

## Troubleshooting

### Issue: Redirect Loop

**Cause**: Conflicting redirect rules

**Solution**: Check middleware.ts for conflicting patterns

### Issue: Canonical Tag Missing

**Cause**: SEOHead component not included

**Solution**: Ensure SEOHead or CanonicalTag component is used on page

### Issue: Wrong Canonical URL

**Cause**: Custom canonical URL override

**Solution**: Check if custom canonical prop is being passed incorrectly

## Best Practices

1. **Always Use Canonical Tags**
   - Include on every page
   - Use SEOHead component for consistency

2. **Test Redirects**
   - Test all URL variations
   - Verify 301 status codes
   - Check redirect chains

3. **Monitor Search Console**
   - Check for duplicate content issues
   - Monitor indexed URLs
   - Review coverage reports

4. **Update Sitemap**
   - Ensure sitemap uses canonical URLs
   - Submit updated sitemap to Search Console
   - Monitor indexing status

## Related Files

- `lib/canonical-url.ts` - Core utility functions
- `middleware.ts` - Redirect handling
- `components/SEOHead.tsx` - Canonical tag component
- `components/CanonicalTag.tsx` - Standalone canonical component
- `pages/sitemap.xml.ts` - Sitemap with canonical URLs
- `public/robots.txt` - Robots directives

## References

- [Google Canonical URLs Guide](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Hreflang Implementation](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [301 Redirects Best Practices](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
