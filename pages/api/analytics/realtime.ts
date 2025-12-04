/**
 * Real-time Analytics API Endpoint
 * Provides real-time visitor and activity data from Firebase
 */

import type { NextApiRequest, NextApiResponse } from 'next';

interface RealtimeData {
  activeUsers: number;
  activePages: Array<{
    page: string;
    users: number;
  }>;
  recentEvents: Array<{
    type: string;
    timestamp: number;
    page: string;
  }>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Try to get real-time data from Firebase
    try {
      const { firebaseAnalytics } = await import('../../../lib/firebase-analytics-service');
      const activeData = await firebaseAnalytics.getActiveVisitors();
      
      const realtimeData: RealtimeData = {
        activeUsers: activeData.activeUsers,
        activePages: activeData.activePages,
        recentEvents: []
      };
      
      return res.status(200).json({
        success: true,
        data: realtimeData,
        source: 'firebase'
      });
    } catch (firebaseError) {
      console.log('Firebase not available, using mock data');
    }
    
    // Fallback to mock data
    const mockData: RealtimeData = {
      activeUsers: Math.floor(Math.random() * 15) + 5,
      activePages: [
        { page: '/products/anubis-pillow', users: Math.floor(Math.random() * 5) + 1 },
        { page: '/blog/pharaonic-symbols', users: Math.floor(Math.random() * 4) + 1 },
        { page: '/', users: Math.floor(Math.random() * 6) + 2 },
        { page: '/products', users: Math.floor(Math.random() * 3) + 1 },
        { page: '/contact', users: Math.floor(Math.random() * 2) + 1 }
      ],
      recentEvents: []
    };
    
    return res.status(200).json({
      success: true,
      data: mockData,
      source: 'mock_data'
    });
    
  } catch (error) {
    console.error('Error fetching realtime data:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch realtime data'
    });
  }
}
