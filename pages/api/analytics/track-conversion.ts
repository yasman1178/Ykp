/**
 * Track Conversion API Endpoint
 * Records conversion events to Firebase
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
    const { type, page, sessionId, metadata } = req.body;

    if (!type || !page || !sessionId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: type, page, and sessionId'
      });
    }

    // Validate conversion type
    const validTypes = ['contact_form', 'wholesale_inquiry', 'catalog_download'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        error: `Invalid conversion type. Must be one of: ${validTypes.join(', ')}`
      });
    }

    // Try to save to Firebase
    try {
      const { firebaseAnalytics } = await import('../../../lib/firebase-analytics-service');
      
      await firebaseAnalytics.trackConversion({
        type,
        page,
        sessionId,
        timestamp: new Date(),
        metadata,
      });

      return res.status(200).json({
        success: true,
        message: 'Conversion tracked successfully',
        source: 'firebase'
      });
    } catch (firebaseError) {
      console.error('Firebase tracking error:', firebaseError);
      
      // Fallback: just acknowledge the request
      return res.status(200).json({
        success: true,
        message: 'Conversion tracking acknowledged (Firebase not configured)',
        source: 'mock'
      });
    }
    
  } catch (error) {
    console.error('Error tracking conversion:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to track conversion'
    });
  }
}
