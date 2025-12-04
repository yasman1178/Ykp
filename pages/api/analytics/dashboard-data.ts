/**
 * Unified Dashboard Data API Endpoint
 * Aggregates data from multiple sources (GA4, Search Console, Vercel, Firebase)
 */

import type { NextApiRequest, NextApiResponse } from 'next';

interface DashboardRequest {
  timeframe?: '7d' | '30d' | '90d';
  sources?: string[]; // ['ga4', 'search_console', 'vercel', 'firebase']
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { timeframe = '7d', sources = 'all' } = req.query;
    const requestedSources = sources === 'all' 
      ? ['ga4', 'search_console', 'vercel', 'firebase']
      : (sources as string).split(',');
    
    const dashboardData: any = {
      summary: {},
      realtime: {},
      topPages: [],
      topProducts: [],
      trafficSources: [],
      conversionFunnel: [],
      searchQueries: [],
      webVitals: {},
      geographic: [],
      dataSources: [],
      timeframe,
      lastUpdated: new Date().toISOString()
    };
    
    // Fetch from GA4
    if (requestedSources.includes('ga4')) {
      try {
        const ga4Response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/analytics/ga4-data?timeframe=${timeframe}`
        );
        const ga4Data = await ga4Response.json();
        
        if (ga4Data.success && ga4Data.data) {
          dashboardData.summary = {
            ...dashboardData.summary,
            totalVisitors: ga4Data.data.summary.totalUsers,
            sessions: ga4Data.data.summary.sessions,
            pageviews: ga4Data.data.summary.pageviews,
            bounceRate: ga4Data.data.summary.bounceRate
          };
          dashboardData.topPages = ga4Data.data.topPages;
          dashboardData.trafficSources = ga4Data.data.trafficSources;
          dashboardData.dataSources.push('google_analytics_4');
        }
      } catch (error) {
        console.error('Error fetching GA4 data:', error);
      }
    }
    
    // Fetch from Search Console
    if (requestedSources.includes('search_console')) {
      try {
        const scResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/analytics/search-console-data?timeframe=${timeframe}`
        );
        const scData = await scResponse.json();
        
        if (scData.success && scData.data) {
          dashboardData.searchQueries = scData.data.topQueries;
          dashboardData.summary.searchClicks = scData.data.summary.totalClicks;
          dashboardData.summary.searchImpressions = scData.data.summary.totalImpressions;
          dashboardData.summary.averagePosition = scData.data.summary.averagePosition;
          dashboardData.dataSources.push('google_search_console');
        }
      } catch (error) {
        console.error('Error fetching Search Console data:', error);
      }
    }
    
    // Fetch from Vercel Analytics
    if (requestedSources.includes('vercel')) {
      try {
        const vercelResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/analytics/vercel-data?timeframe=${timeframe}`
        );
        const vercelData = await vercelResponse.json();
        
        if (vercelData.success && vercelData.data) {
          dashboardData.webVitals = vercelData.data.webVitals;
          dashboardData.pageSpeed = vercelData.data.pageSpeed;
          dashboardData.dataSources.push('vercel_analytics');
        }
      } catch (error) {
        console.error('Error fetching Vercel data:', error);
      }
    }
    
    // Fetch from Firebase
    if (requestedSources.includes('firebase')) {
      try {
        const firebaseResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/analytics/firebase-data?type=dashboard&timeframe=${timeframe}`
        );
        const firebaseData = await firebaseResponse.json();
        
        if (firebaseData.success && firebaseData.data) {
          // Merge Firebase data with existing data
          dashboardData.summary = {
            ...dashboardData.summary,
            ...firebaseData.data.summary,
          };
          
          if (firebaseData.data.topPages && firebaseData.data.topPages.length > 0) {
            dashboardData.topPages = firebaseData.data.topPages;
          }
          
          if (firebaseData.data.topProducts && firebaseData.data.topProducts.length > 0) {
            dashboardData.topProducts = firebaseData.data.topProducts;
          }
          
          dashboardData.dataSources.push('firebase');
        }
      } catch (error) {
        console.error('Error fetching Firebase data:', error);
      }
    }
    
    // If no data sources were successful, use fallback mock data
    if (dashboardData.dataSources.length === 0) {
      dashboardData.summary = {
        totalVisitors: 1250,
        b2bLeads: 23,
        conversionRate: 1.84,
        sessions: 1580,
        pageviews: 4230,
        bounceRate: 42.5,
        searchClicks: 380,
        searchImpressions: 10200,
        averagePosition: 8.3
      };
      
      dashboardData.topPages = [
        { url: '/', views: 1250, uniqueVisitors: 980, avgTimeOnPage: 145, bounceRate: 42.5 },
        { url: '/products', views: 890, uniqueVisitors: 720, avgTimeOnPage: 210, bounceRate: 35.2 },
        { url: '/blog', views: 650, uniqueVisitors: 520, avgTimeOnPage: 320, bounceRate: 28.7 }
      ];
      
      dashboardData.topProducts = [
        { id: 'b123_001', name: 'Premium Anubis Travel Pillow', views: 420, inquiries: 18, conversionRate: 4.3 },
        { id: 't_015', name: 'Classic Scarab Memory Foam', views: 380, inquiries: 15, conversionRate: 3.9 }
      ];
      
      dashboardData.trafficSources = [
        { source: 'Google', medium: 'organic', users: 580, sessions: 720, conversions: 12 },
        { source: 'Direct', medium: '(none)', users: 320, sessions: 380, conversions: 8 },
        { source: 'Facebook', medium: 'social', users: 180, sessions: 220, conversions: 4 }
      ];
      
      dashboardData.conversionFunnel = [
        { stage: 'Landing Page Visit', users: 1250, dropoffRate: 0 },
        { stage: 'Product Page View', users: 890, dropoffRate: 28.8 },
        { stage: 'Contact Form Started', users: 156, dropoffRate: 82.5 },
        { stage: 'Form Submitted', users: 89, dropoffRate: 43.0 },
        { stage: 'Quote Requested', users: 23, dropoffRate: 74.2 }
      ];
      
      dashboardData.searchQueries = [
        { query: 'مخدات سفر تصنيع', clicks: 45, impressions: 1250, ctr: 3.6, position: 8.5 },
        { query: 'egyptian travel pillows', clicks: 38, impressions: 980, ctr: 3.9, position: 7.2 }
      ];
      
      dashboardData.webVitals = {
        lcp: { value: 2.1, rating: 'good', p75: 2.3 },
        fid: { value: 85, rating: 'good', p75: 92 },
        cls: { value: 0.08, rating: 'good', p75: 0.09 }
      };
      
      dashboardData.dataSources.push('mock_data');
    }
    
    return res.status(200).json({
      success: true,
      data: dashboardData,
      message: `Data aggregated from: ${dashboardData.dataSources.join(', ')}`
    });
    
  } catch (error) {
    console.error('Error aggregating dashboard data:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to aggregate dashboard data'
    });
  }
}
