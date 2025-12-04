/**
 * Google Search Console Data API Endpoint
 * Fetches search performance data for dashboard
 */

import type { NextApiRequest, NextApiResponse } from 'next';

interface SearchConsoleQuery {
  timeframe?: '7d' | '30d' | '90d';
  limit?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { timeframe = '7d', limit = 10 } = req.query as Partial<SearchConsoleQuery>;
    
    // Check if Search Console is configured
    const siteUrl = process.env.SEARCH_CONSOLE_SITE_URL;
    
    if (!siteUrl) {
      return res.status(200).json({
        success: true,
        data: null,
        source: 'not_configured',
        message: 'Search Console not configured. Set SEARCH_CONSOLE_SITE_URL environment variable.'
      });
    }
    
    // Try to use the search console integration library
    try {
      const { getSearchConsoleService } = await import('../../../lib/search-console-integration');
      const searchConsoleService = getSearchConsoleService(siteUrl);
      
      if (searchConsoleService) {
        const days = parseInt(timeframe.replace('d', ''));
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        
        const analyticsData = await searchConsoleService.getSearchAnalytics({
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          dimensions: ['query', 'page'],
          rowLimit: limit as number
        });
        
        return res.status(200).json({
          success: true,
          data: analyticsData,
          source: 'google_search_console',
          timeframe
        });
      }
    } catch (integrationError) {
      console.log('Search Console integration not available, using mock data');
    }
    
    // Fallback to mock data
    const mockSearchData = {
      topQueries: [
        { query: 'مخدات سفر تصنيع', clicks: 45, impressions: 1250, ctr: 3.6, position: 8.5 },
        { query: 'egyptian travel pillows', clicks: 38, impressions: 980, ctr: 3.9, position: 7.2 },
        { query: 'pharaonic pillows wholesale', clicks: 32, impressions: 850, ctr: 3.8, position: 9.1 },
        { query: 'travel pillow manufacturer egypt', clicks: 28, impressions: 720, ctr: 3.9, position: 6.8 },
        { query: 'مخدات فرعونية', clicks: 25, impressions: 680, ctr: 3.7, position: 10.2 }
      ],
      topPages: [
        { page: '/', clicks: 120, impressions: 3200, ctr: 3.8, position: 8.2 },
        { page: '/products', clicks: 95, impressions: 2500, ctr: 3.8, position: 7.5 },
        { page: '/products/anubis-pillow', clicks: 68, impressions: 1800, ctr: 3.8, position: 9.1 },
        { page: '/blog/pharaonic-symbols', clicks: 52, impressions: 1400, ctr: 3.7, position: 8.8 },
        { page: '/wholesale', clicks: 45, impressions: 1200, ctr: 3.8, position: 7.9 }
      ],
      summary: {
        totalClicks: 380,
        totalImpressions: 10200,
        averageCTR: 3.7,
        averagePosition: 8.3
      },
      timeframe,
      lastUpdated: new Date().toISOString()
    };
    
    return res.status(200).json({
      success: true,
      data: mockSearchData,
      source: 'mock_data',
      message: 'Using mock data. Configure Search Console API for real data.'
    });
    
  } catch (error) {
    console.error('Error fetching Search Console data:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch Search Console data'
    });
  }
}
