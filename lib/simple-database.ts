/**
 * Simple File-Based Database for Pharaonic Pillows Analytics
 * Stores visitor data, cookie consents, and user activities
 */

import fs from 'fs';
import path from 'path';

// Database file paths
const DB_DIR = path.join(process.cwd(), 'data');
const VISITORS_DB = path.join(DB_DIR, 'visitors.json');
const ACTIVITIES_DB = path.join(DB_DIR, 'activities.json');
const CONSENTS_DB = path.join(DB_DIR, 'consents.json');

// Data interfaces
export interface VisitorRecord {
  id: string;
  timestamp: string;
  ip?: string;
  userAgent?: string;
  country?: string;
  city?: string;
  referrer?: string;
  language: string;
  theme: string;
  sessionId: string;
}

export interface ActivityRecord {
  id: string;
  visitorId: string;
  sessionId: string;
  timestamp: string;
  type: 'page_view' | 'product_view' | 'blog_view' | 'contact_form' | 'download' | 'search';
  page: string;
  data?: Record<string, any>;
}

export interface ConsentRecord {
  id: string;
  visitorId: string;
  sessionId: string;
  timestamp: string;
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  consentVersion: string;
  userAgent?: string;
  ip?: string;
}

export interface DatabaseStats {
  totalVisitors: number;
  totalActivities: number;
  totalConsents: number;
  analyticsConsents: number;
  marketingConsents: number;
  preferencesConsents: number;
  topPages: Array<{ page: string; views: number }>;
  topCountries: Array<{ country: string; visitors: number }>;
  recentActivities: ActivityRecord[];
}

class SimpleDatabase {
  private static instance: SimpleDatabase;

  private constructor() {
    this.ensureDirectoryExists();
  }

  public static getInstance(): SimpleDatabase {
    if (!SimpleDatabase.instance) {
      SimpleDatabase.instance = new SimpleDatabase();
    }
    return SimpleDatabase.instance;
  }

  /**
   * Ensure database directory and files exist
   */
  private ensureDirectoryExists(): void {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }

      // Initialize empty files if they don't exist
      if (!fs.existsSync(VISITORS_DB)) {
        fs.writeFileSync(VISITORS_DB, JSON.stringify([]));
      }
      if (!fs.existsSync(ACTIVITIES_DB)) {
        fs.writeFileSync(ACTIVITIES_DB, JSON.stringify([]));
      }
      if (!fs.existsSync(CONSENTS_DB)) {
        fs.writeFileSync(CONSENTS_DB, JSON.stringify([]));
      }
    } catch (error) {
      console.error('Error creating database directory:', error);
    }
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Read data from file
   */
  private readData<T>(filePath: string): T[] {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error);
      return [];
    }
  }

  /**
   * Write data to file
   */
  private writeData<T>(filePath: string, data: T[]): void {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error writing ${filePath}:`, error);
    }
  }

  /**
   * Record new visitor
   */
  recordVisitor(visitorData: Omit<VisitorRecord, 'id' | 'timestamp'>): string {
    const visitors = this.readData<VisitorRecord>(VISITORS_DB);
    const id = this.generateId();
    
    const visitor: VisitorRecord = {
      id,
      timestamp: new Date().toISOString(),
      ...visitorData,
    };

    visitors.push(visitor);
    this.writeData(VISITORS_DB, visitors);
    
    return id;
  }

  /**
   * Record user activity
   */
  recordActivity(activityData: Omit<ActivityRecord, 'id' | 'timestamp'>): void {
    const activities = this.readData<ActivityRecord>(ACTIVITIES_DB);
    
    const activity: ActivityRecord = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      ...activityData,
    };

    activities.push(activity);
    
    // Keep only last 10000 activities to prevent file from getting too large
    if (activities.length > 10000) {
      activities.splice(0, activities.length - 10000);
    }
    
    this.writeData(ACTIVITIES_DB, activities);
  }

  /**
   * Record cookie consent
   */
  recordConsent(consentData: Omit<ConsentRecord, 'id' | 'timestamp'>): void {
    const consents = this.readData<ConsentRecord>(CONSENTS_DB);
    
    const consent: ConsentRecord = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      ...consentData,
    };

    consents.push(consent);
    this.writeData(CONSENTS_DB, consents);
  }

  /**
   * Get database statistics
   */
  getStats(days: number = 7): DatabaseStats {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffTimestamp = cutoffDate.toISOString();

    const visitors = this.readData<VisitorRecord>(VISITORS_DB)
      .filter(v => v.timestamp >= cutoffTimestamp);
    
    const activities = this.readData<ActivityRecord>(ACTIVITIES_DB)
      .filter(a => a.timestamp >= cutoffTimestamp);
    
    const consents = this.readData<ConsentRecord>(CONSENTS_DB)
      .filter(c => c.timestamp >= cutoffTimestamp);

    // Calculate top pages
    const pageViews: Record<string, number> = {};
    activities
      .filter(a => a.type === 'page_view')
      .forEach(a => {
        pageViews[a.page] = (pageViews[a.page] || 0) + 1;
      });

    const topPages = Object.entries(pageViews)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Calculate top countries
    const countryVisitors: Record<string, number> = {};
    visitors.forEach(v => {
      if (v.country) {
        countryVisitors[v.country] = (countryVisitors[v.country] || 0) + 1;
      }
    });

    const topCountries = Object.entries(countryVisitors)
      .map(([country, visitors]) => ({ country, visitors }))
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 10);

    return {
      totalVisitors: visitors.length,
      totalActivities: activities.length,
      totalConsents: consents.length,
      analyticsConsents: consents.filter(c => c.analytics).length,
      marketingConsents: consents.filter(c => c.marketing).length,
      preferencesConsents: consents.filter(c => c.preferences).length,
      topPages,
      topCountries,
      recentActivities: activities
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 20),
    };
  }

  /**
   * Get visitor details
   */
  getVisitorDetails(visitorId: string): {
    visitor: VisitorRecord | null;
    activities: ActivityRecord[];
    consents: ConsentRecord[];
  } {
    const visitors = this.readData<VisitorRecord>(VISITORS_DB);
    const activities = this.readData<ActivityRecord>(ACTIVITIES_DB);
    const consents = this.readData<ConsentRecord>(CONSENTS_DB);

    return {
      visitor: visitors.find(v => v.id === visitorId) || null,
      activities: activities.filter(a => a.visitorId === visitorId),
      consents: consents.filter(c => c.visitorId === visitorId),
    };
  }

  /**
   * Get consent statistics
   */
  getConsentStats(): {
    total: number;
    acceptedAll: number;
    rejectedAll: number;
    customized: number;
    analyticsRate: number;
    marketingRate: number;
    preferencesRate: number;
  } {
    const consents = this.readData<ConsentRecord>(CONSENTS_DB);
    
    const total = consents.length;
    const acceptedAll = consents.filter(c => 
      c.analytics && c.marketing && c.preferences
    ).length;
    
    const rejectedAll = consents.filter(c => 
      !c.analytics && !c.marketing && !c.preferences
    ).length;
    
    const customized = total - acceptedAll - rejectedAll;
    
    const analyticsConsents = consents.filter(c => c.analytics).length;
    const marketingConsents = consents.filter(c => c.marketing).length;
    const preferencesConsents = consents.filter(c => c.preferences).length;

    return {
      total,
      acceptedAll,
      rejectedAll,
      customized,
      analyticsRate: total > 0 ? (analyticsConsents / total) * 100 : 0,
      marketingRate: total > 0 ? (marketingConsents / total) * 100 : 0,
      preferencesRate: total > 0 ? (preferencesConsents / total) * 100 : 0,
    };
  }

  /**
   * Clean old data (keep only last 30 days)
   */
  cleanOldData(): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30);
    const cutoffTimestamp = cutoffDate.toISOString();

    // Clean visitors
    const visitors = this.readData<VisitorRecord>(VISITORS_DB)
      .filter(v => v.timestamp >= cutoffTimestamp);
    this.writeData(VISITORS_DB, visitors);

    // Clean activities
    const activities = this.readData<ActivityRecord>(ACTIVITIES_DB)
      .filter(a => a.timestamp >= cutoffTimestamp);
    this.writeData(ACTIVITIES_DB, activities);

    // Clean consents (keep all for compliance)
    // Consents are kept for legal compliance
  }
}

export default SimpleDatabase.getInstance();