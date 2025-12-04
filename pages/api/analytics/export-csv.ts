/**
 * CSV Export API Endpoint
 * Exports analytics data in CSV format
 */

import type { NextApiRequest, NextApiResponse } from 'next';

interface ExportRequest {
  timeframe?: '7d' | '30d' | '90d';
  sections?: string[]; // ['summary', 'pages', 'products', 'traffic', 'queries', 'vitals']
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { timeframe = '7d', sections = 'all' } = req.query;
    const requestedSections = sections === 'all' 
      ? ['summary', 'pages', 'products', 'traffic', 'queries', 'vitals']
      : (sections as string).split(',');
    
    // Fetch dashboard data
    const dashboardResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/analytics/dashboard-data?timeframe=${timeframe}`
    );
    const dashboardResult = await dashboardResponse.json();
    
    if (!dashboardResult.success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch dashboard data'
      });
    }
    
    const data = dashboardResult.data;
    const csvRows: string[] = [];
    
    // Header
    csvRows.push('Pharaonic Pillows Analytics Export');
    csvRows.push(`Date: ${new Date().toISOString().split('T')[0]}`);
    csvRows.push(`Timeframe: ${timeframe}`);
    csvRows.push(`Data Sources: ${data.dataSources.join(', ')}`);
    csvRows.push('');
    
    // Summary metrics
    if (requestedSections.includes('summary')) {
      csvRows.push('SUMMARY METRICS');
      csvRows.push('Metric,Value');
      csvRows.push(`Total Visitors,${data.summary?.totalVisitors || 0}`);
      csvRows.push(`Sessions,${data.summary?.sessions || 0}`);
      csvRows.push(`Pageviews,${data.summary?.pageviews || 0}`);
      csvRows.push(`B2B Leads,${data.summary?.b2bLeads || 0}`);
      csvRows.push(`Conversion Rate,${(data.summary?.conversionRate || 0).toFixed(2)}%`);
      csvRows.push(`Bounce Rate,${(data.summary?.bounceRate || 0).toFixed(1)}%`);
      csvRows.push(`Search Clicks,${data.summary?.searchClicks || 0}`);
      csvRows.push(`Search Impressions,${data.summary?.searchImpressions || 0}`);
      csvRows.push(`Average Position,${(data.summary?.averagePosition || 0).toFixed(1)}`);
      csvRows.push('');
    }
    
    // Top Pages
    if (requestedSections.includes('pages') && data.topPages) {
      csvRows.push('TOP PAGES');
      csvRows.push('URL,Views,Unique Visitors,Avg Time (s),Bounce Rate (%)');
      data.topPages.forEach((page: any) => {
        csvRows.push(`${page.url},${page.views},${page.uniqueVisitors || page.users},${Math.floor(page.avgTimeOnPage || 0)},${(page.bounceRate || 0).toFixed(1)}`);
      });
      csvRows.push('');
    }
    
    // Top Products
    if (requestedSections.includes('products') && data.topProducts) {
      csvRows.push('TOP PRODUCTS');
      csvRows.push('Product ID,Product Name,Views,Inquiries,Conversion Rate (%)');
      data.topProducts.forEach((product: any) => {
        csvRows.push(`${product.id},"${product.name}",${product.views},${product.inquiries},${product.conversionRate.toFixed(1)}`);
      });
      csvRows.push('');
    }
    
    // Traffic Sources
    if (requestedSections.includes('traffic') && data.trafficSources) {
      csvRows.push('TRAFFIC SOURCES');
      csvRows.push('Source,Medium,Users,Sessions,Conversions');
      data.trafficSources.forEach((source: any) => {
        csvRows.push(`${source.source},${source.medium},${source.users},${source.sessions},${source.conversions}`);
      });
      csvRows.push('');
    }
    
    // Search Queries
    if (requestedSections.includes('queries') && data.searchQueries) {
      csvRows.push('SEARCH QUERIES');
      csvRows.push('Query,Clicks,Impressions,CTR (%),Position');
      data.searchQueries.forEach((query: any) => {
        csvRows.push(`"${query.query}",${query.clicks},${query.impressions},${query.ctr.toFixed(1)},${query.position.toFixed(1)}`);
      });
      csvRows.push('');
    }
    
    // Core Web Vitals
    if (requestedSections.includes('vitals') && data.webVitals) {
      csvRows.push('CORE WEB VITALS');
      csvRows.push('Metric,Value,Rating,P75');
      csvRows.push(`LCP,${(data.webVitals.lcp?.value || 0).toFixed(1)}s,${data.webVitals.lcp?.rating || 'N/A'},${(data.webVitals.lcp?.p75 || 0).toFixed(1)}s`);
      csvRows.push(`FID,${(data.webVitals.fid?.value || 0)}ms,${data.webVitals.fid?.rating || 'N/A'},${(data.webVitals.fid?.p75 || 0)}ms`);
      csvRows.push(`CLS,${(data.webVitals.cls?.value || 0).toFixed(3)},${data.webVitals.cls?.rating || 'N/A'},${(data.webVitals.cls?.p75 || 0).toFixed(3)}`);
      if (data.webVitals.ttfb) {
        csvRows.push(`TTFB,${(data.webVitals.ttfb?.value || 0)}ms,${data.webVitals.ttfb?.rating || 'N/A'},${(data.webVitals.ttfb?.p75 || 0)}ms`);
      }
      if (data.webVitals.fcp) {
        csvRows.push(`FCP,${(data.webVitals.fcp?.value || 0).toFixed(1)}s,${data.webVitals.fcp?.rating || 'N/A'},${(data.webVitals.fcp?.p75 || 0).toFixed(1)}s`);
      }
      csvRows.push('');
    }
    
    // Conversion Funnel
    if (data.conversionFunnel) {
      csvRows.push('CONVERSION FUNNEL');
      csvRows.push('Stage,Users,Drop-off Rate (%)');
      data.conversionFunnel.forEach((stage: any) => {
        csvRows.push(`"${stage.stage}",${stage.users},${stage.dropoffRate.toFixed(1)}`);
      });
      csvRows.push('');
    }
    
    // Geographic Distribution
    if (data.geographic) {
      csvRows.push('GEOGRAPHIC DISTRIBUTION');
      csvRows.push('Country,Users,Sessions,Conversions');
      data.geographic.forEach((geo: any) => {
        csvRows.push(`${geo.country},${geo.users},${geo.sessions},${geo.conversions}`);
      });
      csvRows.push('');
    }
    
    // Footer
    csvRows.push('');
    csvRows.push(`Generated: ${new Date().toISOString()}`);
    csvRows.push('Pharaonic Pillows - Egyptian Heritage Travel Pillows');
    
    // Set headers for CSV download
    res.setHeader('Content-Type', 'text/csv;charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="pharaonic-pillows-analytics-${timeframe}-${new Date().toISOString().split('T')[0]}.csv"`);
    
    return res.status(200).send(csvRows.join('\n'));
    
  } catch (error) {
    console.error('Error exporting CSV:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to export CSV'
    });
  }
}
