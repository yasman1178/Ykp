/**
 * Analytics Tracking API
 * Records visitor activities and cookie consents
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import SimpleDatabase from '../../../lib/simple-database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, data } = req.body;

    // Get visitor info from request
    const userAgent = req.headers['user-agent'] || '';
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
               req.connection.remoteAddress || 
               'unknown';

    switch (type) {
      case 'visitor':
        const visitorId = SimpleDatabase.recordVisitor({
          ip,
          userAgent,
          country: data.country || 'Unknown',
          city: data.city || 'Unknown',
          referrer: data.referrer || '',
          language: data.language || 'en',
          theme: data.theme || 'gold',
          sessionId: data.sessionId,
        });

        return res.status(200).json({
          success: true,
          visitorId,
          message: 'Visitor recorded successfully',
        });

      case 'activity':
        SimpleDatabase.recordActivity({
          visitorId: data.visitorId,
          sessionId: data.sessionId,
          type: data.activityType,
          page: data.page,
          data: data.additionalData || {},
        });

        return res.status(200).json({
          success: true,
          message: 'Activity recorded successfully',
        });

      case 'consent':
        SimpleDatabase.recordConsent({
          visitorId: data.visitorId,
          sessionId: data.sessionId,
          essential: data.essential,
          analytics: data.analytics,
          marketing: data.marketing,
          preferences: data.preferences,
          consentVersion: data.consentVersion || '1.0',
          userAgent,
          ip,
        });

        return res.status(200).json({
          success: true,
          message: 'Consent recorded successfully',
        });

      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid tracking type',
        });
    }
  } catch (error) {
    console.warn('Analytics tracking handled gracefully:', (error as Error).message);
    return res.status(200).json({
      success: true,
      fallback: true,
      message: 'Analytics tracking handled gracefully',
    });
  }
}

/**
 * API Usage Examples:
 * 
 * // Record new visitor
 * POST /api/analytics/track
 * {
 *   "type": "visitor",
 *   "data": {
 *     "sessionId": "session_123",
 *     "language": "ar",
 *     "theme": "gold",
 *     "country": "Egypt",
 *     "referrer": "https://google.com"
 *   }
 * }
 * 
 * // Record activity
 * POST /api/analytics/track
 * {
 *   "type": "activity",
 *   "data": {
 *     "visitorId": "visitor_123",
 *     "sessionId": "session_123",
 *     "activityType": "page_view",
 *     "page": "/products/b123",
 *     "additionalData": { "productId": "b123_001" }
 *   }
 * }
 * 
 * // Record consent
 * POST /api/analytics/track
 * {
 *   "type": "consent",
 *   "data": {
 *     "visitorId": "visitor_123",
 *     "sessionId": "session_123",
 *     "essential": true,
 *     "analytics": true,
 *     "marketing": false,
 *     "preferences": true
 *   }
 * }
 */