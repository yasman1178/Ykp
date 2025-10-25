/**
 * API endpoint for analytics reports
 * Handles report generation and delivery
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import AutomatedReporting from '../../../lib/automated-reporting';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, format = 'json' } = req.query;

    switch (type) {
      case 'weekly':
        const weeklyReport = await AutomatedReporting.generateWeeklyReport();
        return res.status(200).json({
          success: true,
          data: weeklyReport,
          generatedAt: new Date().toISOString(),
        });

      case 'monthly':
        const monthlyReport = await AutomatedReporting.generateMonthlyB2BReport();
        return res.status(200).json({
          success: true,
          data: monthlyReport,
          generatedAt: new Date().toISOString(),
        });

      case 'quarterly':
        const quarterlyReport = await AutomatedReporting.generateQuarterlyHeritageReport();
        return res.status(200).json({
          success: true,
          data: quarterlyReport,
          generatedAt: new Date().toISOString(),
        });

      case 'core-web-vitals':
        const coreWebVitals = await AutomatedReporting.generateCoreWebVitalsReport();
        return res.status(200).json({
          success: true,
          data: coreWebVitals,
          generatedAt: new Date().toISOString(),
        });

      case 'seo':
        const seoMetrics = await AutomatedReporting.generateSEOMetricsReport();
        return res.status(200).json({
          success: true,
          data: seoMetrics,
          generatedAt: new Date().toISOString(),
        });

      case 'dashboard':
        const useRealData = req.query.real === 'true';
        const dashboard = await AutomatedReporting.generateManagementDashboard(useRealData);
        return res.status(200).json({
          success: true,
          data: dashboard,
          dataSource: useRealData ? 'google_analytics' : 'mock_data',
          generatedAt: new Date().toISOString(),
        });

      case 'alerts':
        if (req.method === 'POST') {
          await AutomatedReporting.checkAndSendAlerts();
          return res.status(200).json({
            success: true,
            message: 'Alerts checked and processed',
            timestamp: new Date().toISOString(),
          });
        }
        break;

      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid report type. Available types: weekly, monthly, quarterly, core-web-vitals, seo, dashboard, alerts',
        });
    }
  } catch (error) {
    console.error('Analytics report error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate report',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error',
    });
  }
}

/**
 * API Usage Examples:
 * 
 * GET /api/analytics/reports?type=weekly
 * GET /api/analytics/reports?type=monthly
 * GET /api/analytics/reports?type=quarterly
 * GET /api/analytics/reports?type=core-web-vitals
 * GET /api/analytics/reports?type=seo
 * GET /api/analytics/reports?type=dashboard
 * POST /api/analytics/reports?type=alerts
 */