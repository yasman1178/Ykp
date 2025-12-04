/**
 * Example Usage: Google Search Console Integration
 * 
 * This file demonstrates how to use the Search Console integration
 * in various scenarios throughout the application.
 * 
 * Requirements: 2.2, 5.1, 5.2
 */

import { getSearchConsoleService } from '../search-console-integration';

/**
 * Example 1: Submit sitemap programmatically
 */
export async function exampleSubmitSitemap() {
  try {
    const searchConsole = getSearchConsoleService();
    
    // Authenticate
    await searchConsole.authenticate();
    
    // Submit sitemap
    const result = await searchConsole.submitSitemap(
      'https://ykp-supplies.vercel.app/sitemap.xml'
    );
    
    if (result.success) {
      console.log('✅ Sitemap submitted successfully');
      
      // Get sitemap status
      const status = await searchConsole.getSitemapStatus(result.sitemapUrl!);
      console.log('Sitemap status:', status);
    } else {
      console.error('❌ Failed to submit sitemap:', result.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * Example 2: Get top search queries
 */
export async function exampleGetTopQueries() {
  try {
    const searchConsole = getSearchConsoleService();
    await searchConsole.authenticate();
    
    // Get top queries for last 30 days
    const queries = await searchConsole.getTopQueries(30);
    
    console.log('Top 10 Search Queries:');
    queries.slice(0, 10).forEach((query, index) => {
      console.log(`${index + 1}. "${query.query}"`);
      console.log(`   Clicks: ${query.clicks}, Impressions: ${query.impressions}`);
      console.log(`   CTR: ${(query.ctr * 100).toFixed(2)}%, Position: ${query.position.toFixed(1)}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * Example 3: Get top performing pages
 */
export async function exampleGetTopPages() {
  try {
    const searchConsole = getSearchConsoleService();
    await searchConsole.authenticate();
    
    // Get top pages for last 30 days
    const pages = await searchConsole.getTopPages(30);
    
    console.log('Top 10 Pages:');
    pages.slice(0, 10).forEach((page, index) => {
      console.log(`${index + 1}. ${page.url}`);
      console.log(`   Clicks: ${page.clicks}, Impressions: ${page.impressions}`);
      console.log(`   CTR: ${(page.ctr * 100).toFixed(2)}%, Position: ${page.position.toFixed(1)}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * Example 4: Get detailed search analytics
 */
export async function exampleGetSearchAnalytics() {
  try {
    const searchConsole = getSearchConsoleService();
    await searchConsole.authenticate();
    
    // Get analytics for specific date range with multiple dimensions
    const analytics = await searchConsole.getSearchAnalytics({
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      dimensions: ['query', 'page', 'country', 'device'],
      rowLimit: 100,
    });
    
    if (analytics && analytics.rows) {
      console.log(`Total rows: ${analytics.rows.length}`);
      
      // Analyze by device
      const deviceStats = analytics.rows.reduce((acc, row) => {
        const device = row.keys[3]; // device is 4th dimension
        if (!acc[device]) {
          acc[device] = { clicks: 0, impressions: 0 };
        }
        acc[device].clicks += row.clicks;
        acc[device].impressions += row.impressions;
        return acc;
      }, {} as Record<string, { clicks: number; impressions: number }>);
      
      console.log('Device breakdown:', deviceStats);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * Example 5: Monitor Arabic keyword performance
 */
export async function exampleMonitorArabicKeywords() {
  try {
    const searchConsole = getSearchConsoleService();
    await searchConsole.authenticate();
    
    // Target Arabic keywords
    const targetKeywords = [
      'مخدات سفر تصنيع',
      'مخدات سفر',
      'تصنيع مخدات',
      'مخدات فرعونية',
    ];
    
    // Get all queries
    const queries = await searchConsole.getTopQueries(30);
    
    // Filter for Arabic keywords
    const arabicQueries = queries.filter(q => 
      targetKeywords.some(keyword => q.query.includes(keyword))
    );
    
    console.log('Arabic Keyword Performance:');
    arabicQueries.forEach(query => {
      console.log(`\n"${query.query}"`);
      console.log(`  Position: ${query.position.toFixed(1)}`);
      console.log(`  Clicks: ${query.clicks}`);
      console.log(`  Impressions: ${query.impressions}`);
      console.log(`  CTR: ${(query.ctr * 100).toFixed(2)}%`);
    });
    
    // Calculate average position for target keywords
    if (arabicQueries.length > 0) {
      const avgPosition = arabicQueries.reduce((sum, q) => sum + q.position, 0) / arabicQueries.length;
      console.log(`\nAverage position for Arabic keywords: ${avgPosition.toFixed(1)}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * Example 6: Daily sitemap submission (for cron job)
 */
export async function dailySitemapSubmission() {
  try {
    console.log('🕐 Starting daily sitemap submission...');
    
    const searchConsole = getSearchConsoleService();
    await searchConsole.authenticate();
    
    const sitemapUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ykp-supplies.vercel.app'}/sitemap.xml`;
    
    // Submit sitemap
    const result = await searchConsole.submitSitemap(sitemapUrl);
    
    if (result.success) {
      console.log('✅ Daily sitemap submission successful');
      
      // Log status
      const status = await searchConsole.getSitemapStatus(sitemapUrl);
      if (status) {
        console.log(`Last submitted: ${status.lastSubmitted}`);
        console.log(`Errors: ${status.errors || 0}, Warnings: ${status.warnings || 0}`);
      }
    } else {
      console.error('❌ Daily sitemap submission failed:', result.error);
      // Here you could send an alert email or notification
    }
  } catch (error) {
    console.error('❌ Daily sitemap submission error:', error);
    // Here you could send an alert email or notification
  }
}

/**
 * Example 7: Generate SEO performance report
 */
export async function generateSEOReport(days: number = 30) {
  try {
    const searchConsole = getSearchConsoleService();
    await searchConsole.authenticate();
    
    const [queries, pages] = await Promise.all([
      searchConsole.getTopQueries(days),
      searchConsole.getTopPages(days),
    ]);
    
    // Calculate totals
    const totalClicks = queries.reduce((sum, q) => sum + q.clicks, 0);
    const totalImpressions = queries.reduce((sum, q) => sum + q.impressions, 0);
    const avgCTR = totalClicks / totalImpressions;
    const avgPosition = queries.reduce((sum, q) => sum + q.position, 0) / queries.length;
    
    const report = {
      period: `Last ${days} days`,
      summary: {
        totalClicks,
        totalImpressions,
        averageCTR: (avgCTR * 100).toFixed(2) + '%',
        averagePosition: avgPosition.toFixed(1),
      },
      topQueries: queries.slice(0, 10).map(q => ({
        query: q.query,
        clicks: q.clicks,
        impressions: q.impressions,
        ctr: (q.ctr * 100).toFixed(2) + '%',
        position: q.position.toFixed(1),
      })),
      topPages: pages.slice(0, 10).map(p => ({
        url: p.url,
        clicks: p.clicks,
        impressions: p.impressions,
        ctr: (p.ctr * 100).toFixed(2) + '%',
        position: p.position.toFixed(1),
      })),
    };
    
    console.log('SEO Performance Report:');
    console.log(JSON.stringify(report, null, 2));
    
    return report;
  } catch (error) {
    console.error('Error generating report:', error);
    return null;
  }
}

// Export all examples
export const examples = {
  submitSitemap: exampleSubmitSitemap,
  getTopQueries: exampleGetTopQueries,
  getTopPages: exampleGetTopPages,
  getSearchAnalytics: exampleGetSearchAnalytics,
  monitorArabicKeywords: exampleMonitorArabicKeywords,
  dailySitemapSubmission,
  generateSEOReport,
};
