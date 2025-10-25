/**
 * Database Analytics API
 * Provides real analytics data from local database
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import SimpleDatabase from '../../../lib/simple-database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, days = '7', visitorId } = req.query;

    switch (type) {
      case 'stats':
        const stats = SimpleDatabase.getStats(parseInt(days as string));
        return res.status(200).json({
          success: true,
          data: stats,
          period: `${days} days`,
          generatedAt: new Date().toISOString(),
        });

      case 'consent-stats':
        const consentStats = SimpleDatabase.getConsentStats();
        return res.status(200).json({
          success: true,
          data: consentStats,
          generatedAt: new Date().toISOString(),
        });

      case 'visitor-details':
        if (!visitorId) {
          return res.status(400).json({
            success: false,
            message: 'Visitor ID is required',
          });
        }

        const visitorDetails = SimpleDatabase.getVisitorDetails(visitorId as string);
        return res.status(200).json({
          success: true,
          data: visitorDetails,
          generatedAt: new Date().toISOString(),
        });

      case 'dashboard':
        const dashboardStats = SimpleDatabase.getStats(parseInt(days as string));
        const consentData = SimpleDatabase.getConsentStats();
        
        // Transform data for dashboard
        const dashboardData = {
          summary: {
            totalVisitors: dashboardStats.totalVisitors,
            b2bLeads: Math.floor(dashboardStats.totalActivities * 0.05), // Estimate leads
            conversionRate: dashboardStats.totalVisitors > 0 
              ? (Math.floor(dashboardStats.totalActivities * 0.05) / dashboardStats.totalVisitors) * 100 
              : 0,
            analyticsConsentRate: consentData.analyticsRate,
            marketingConsentRate: consentData.marketingRate,
          },
          activities: {
            totalActivities: dashboardStats.totalActivities,
            topPages: dashboardStats.topPages,
            recentActivities: dashboardStats.recentActivities,
          },
          visitors: {
            totalVisitors: dashboardStats.totalVisitors,
            topCountries: dashboardStats.topCountries,
          },
          consents: {
            total: consentData.total,
            acceptedAll: consentData.acceptedAll,
            rejectedAll: consentData.rejectedAll,
            customized: consentData.customized,
            analyticsRate: consentData.analyticsRate,
            marketingRate: consentData.marketingRate,
            preferencesRate: consentData.preferencesRate,
          },
          dataSource: 'local_database',
        };

        return res.status(200).json({
          success: true,
          data: dashboardData,
          period: `${days} days`,
          generatedAt: new Date().toISOString(),
        });

      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid request type. Available types: stats, consent-stats, visitor-details, dashboard',
        });
    }
  } catch (error) {
    console.error('Database analytics error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics data',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error',
    });
  }
}

/**
 * API Usage Examples:
 * 
 * GET /api/analytics/database?type=stats&days=7
 * GET /api/analytics/database?type=consent-stats
 * GET /api/analytics/database?type=visitor-details&visitorId=visitor_123
 * GET /api/analytics/database?type=dashboard&days=30
 */