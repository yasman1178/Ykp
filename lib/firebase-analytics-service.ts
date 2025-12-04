/**
 * Firebase Analytics Service
 * Handles storing and retrieving analytics data from Firestore
 */

import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  Timestamp,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { db } from './firebase-config';

// Collection names
const COLLECTIONS = {
  VISITORS: 'visitors',
  PAGE_VIEWS: 'page_views',
  EVENTS: 'events',
  CONVERSIONS: 'conversions',
  DAILY_STATS: 'daily_stats',
  PRODUCTS: 'product_analytics',
};

export interface VisitorData {
  sessionId: string;
  page: string;
  timestamp: Date;
  userAgent?: string;
  referrer?: string;
  country?: string;
  device?: string;
  event?: string;
}

export interface PageViewData {
  page: string;
  views: number;
  uniqueVisitors: number;
  avgTimeOnPage: number;
  bounceRate: number;
  date: Date;
}

export interface ConversionData {
  type: 'contact_form' | 'wholesale_inquiry' | 'catalog_download';
  page: string;
  timestamp: Date;
  sessionId: string;
  metadata?: any;
}

export interface DailyStats {
  date: string; // YYYY-MM-DD
  totalVisitors: number;
  pageViews: number;
  uniqueVisitors: number;
  conversions: number;
  bounceRate: number;
  avgSessionDuration: number;
}

class FirebaseAnalyticsService {
  /**
   * Track a visitor/page view
   */
  async trackVisitor(data: VisitorData): Promise<void> {
    try {
      await addDoc(collection(db, COLLECTIONS.VISITORS), {
        ...data,
        timestamp: Timestamp.fromDate(data.timestamp),
      });

      // Update daily stats
      await this.updateDailyStats(data.timestamp);
    } catch (error) {
      console.error('Error tracking visitor:', error);
      throw error;
    }
  }

  /**
   * Track a conversion event
   */
  async trackConversion(data: ConversionData): Promise<void> {
    try {
      await addDoc(collection(db, COLLECTIONS.CONVERSIONS), {
        ...data,
        timestamp: Timestamp.fromDate(data.timestamp),
      });

      // Update daily stats
      const dateStr = data.timestamp.toISOString().split('T')[0];
      const statsRef = doc(db, COLLECTIONS.DAILY_STATS, dateStr);
      await updateDoc(statsRef, {
        conversions: increment(1),
      });
    } catch (error) {
      console.error('Error tracking conversion:', error);
      throw error;
    }
  }

  /**
   * Get real-time active visitors (last 5 minutes)
   */
  async getActiveVisitors(): Promise<{
    activeUsers: number;
    activePages: Array<{ page: string; users: number }>;
  }> {
    try {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      
      const q = query(
        collection(db, COLLECTIONS.VISITORS),
        where('timestamp', '>=', Timestamp.fromDate(fiveMinutesAgo)),
        orderBy('timestamp', 'desc')
      );

      const snapshot = await getDocs(q);
      const visitors = snapshot.docs.map(doc => doc.data());

      // Count unique sessions
      const uniqueSessions = new Set(visitors.map((v: any) => v.sessionId));
      
      // Group by page
      const pageActivity: { [key: string]: Set<string> } = {};
      visitors.forEach((v: any) => {
        if (!pageActivity[v.page]) {
          pageActivity[v.page] = new Set();
        }
        pageActivity[v.page].add(v.sessionId);
      });

      const activePages = Object.entries(pageActivity)
        .map(([page, sessions]) => ({
          page,
          users: sessions.size,
        }))
        .sort((a, b) => b.users - a.users)
        .slice(0, 5);

      return {
        activeUsers: uniqueSessions.size,
        activePages,
      };
    } catch (error) {
      console.error('Error getting active visitors:', error);
      return { activeUsers: 0, activePages: [] };
    }
  }

  /**
   * Get analytics data for a date range
   */
  async getAnalyticsData(startDate: Date, endDate: Date): Promise<any> {
    try {
      const q = query(
        collection(db, COLLECTIONS.VISITORS),
        where('timestamp', '>=', Timestamp.fromDate(startDate)),
        where('timestamp', '<=', Timestamp.fromDate(endDate)),
        orderBy('timestamp', 'desc')
      );

      const snapshot = await getDocs(q);
      const visitors = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Process data
      const uniqueVisitors = new Set(visitors.map((v: any) => v.sessionId)).size;
      const pageViews = visitors.length;

      // Top pages
      const pageCounts: { [key: string]: number } = {};
      visitors.forEach((v: any) => {
        pageCounts[v.page] = (pageCounts[v.page] || 0) + 1;
      });

      const topPages = Object.entries(pageCounts)
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

      return {
        totalVisitors: uniqueVisitors,
        pageViews,
        topPages,
        visitors,
      };
    } catch (error) {
      console.error('Error getting analytics data:', error);
      throw error;
    }
  }

  /**
   * Get conversions for a date range
   */
  async getConversions(startDate: Date, endDate: Date): Promise<ConversionData[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.CONVERSIONS),
        where('timestamp', '>=', Timestamp.fromDate(startDate)),
        where('timestamp', '<=', Timestamp.fromDate(endDate)),
        orderBy('timestamp', 'desc')
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        ...(doc.data() as any),
        timestamp: doc.data().timestamp.toDate(),
      }));
    } catch (error) {
      console.error('Error getting conversions:', error);
      return [];
    }
  }

  /**
   * Update daily statistics
   */
  private async updateDailyStats(date: Date): Promise<void> {
    try {
      const dateStr = date.toISOString().split('T')[0];
      const statsRef = doc(db, COLLECTIONS.DAILY_STATS, dateStr);

      const statsDoc = await getDoc(statsRef);

      if (statsDoc.exists()) {
        // Update existing stats
        await updateDoc(statsRef, {
          pageViews: increment(1),
          totalVisitors: increment(1),
        });
      } else {
        // Create new stats document
        await setDoc(statsRef, {
          date: dateStr,
          totalVisitors: 1,
          pageViews: 1,
          uniqueVisitors: 1,
          conversions: 0,
          bounceRate: 0,
          avgSessionDuration: 0,
        });
      }
    } catch (error) {
      console.error('Error updating daily stats:', error);
    }
  }

  /**
   * Get daily stats for a date range
   */
  async getDailyStats(startDate: Date, endDate: Date): Promise<DailyStats[]> {
    try {
      const stats: DailyStats[] = [];
      const currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const statsRef = doc(db, COLLECTIONS.DAILY_STATS, dateStr);
        const statsDoc = await getDoc(statsRef);

        if (statsDoc.exists()) {
          stats.push(statsDoc.data() as DailyStats);
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      return stats;
    } catch (error) {
      console.error('Error getting daily stats:', error);
      return [];
    }
  }

  /**
   * Track product view
   */
  async trackProductView(productId: string, productName: string): Promise<void> {
    try {
      const productRef = doc(db, COLLECTIONS.PRODUCTS, productId);
      const productDoc = await getDoc(productRef);

      if (productDoc.exists()) {
        await updateDoc(productRef, {
          views: increment(1),
          lastViewed: Timestamp.now(),
        });
      } else {
        await setDoc(productRef, {
          productId,
          productName,
          views: 1,
          inquiries: 0,
          lastViewed: Timestamp.now(),
        });
      }
    } catch (error) {
      console.error('Error tracking product view:', error);
    }
  }

  /**
   * Track product inquiry
   */
  async trackProductInquiry(productId: string): Promise<void> {
    try {
      const productRef = doc(db, COLLECTIONS.PRODUCTS, productId);
      await updateDoc(productRef, {
        inquiries: increment(1),
      });
    } catch (error) {
      console.error('Error tracking product inquiry:', error);
    }
  }

  /**
   * Get top products
   */
  async getTopProducts(limitCount: number = 10): Promise<any[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.PRODUCTS),
        orderBy('views', 'desc'),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error getting top products:', error);
      return [];
    }
  }
}

// Export singleton instance
export const firebaseAnalytics = new FirebaseAnalyticsService();
export default firebaseAnalytics;
