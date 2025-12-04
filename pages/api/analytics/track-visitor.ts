/**
 * Track Visitor API Endpoint
 * Records visitor page views and events to Firebase
 */

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { sessionId, page, event, userAgent, referrer, country, device } = req.body;

    if (!sessionId || !page) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: sessionId and page'
      });
    }

    // Try to save to Firebase
    try {
      const { firebaseAnalytics } = await import('../../../lib/firebase-analytics-service');
      
      await firebaseAnalytics.trackVisitor({
        sessionId,
        page,
        timestamp: new Date(),
        userAgent,
        referrer,
        country,
        device,
        event,
      });

      return res.status(200).json({
        success: true,
        message: 'Visitor tracked successfully',
        source: 'firebase'
      });
    } catch (firebaseError) {
      console.error('Firebase tracking error:', firebaseError);
      
      // Fallback: just acknowledge the request
      return res.status(200).json({
        success: true,
        message: 'Visitor tracking acknowledged (Firebase not configured)',
        source: 'mock'
      });
    }
    
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to track visitor'
    });
  }
}
