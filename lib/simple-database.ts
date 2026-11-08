/**
 * Simple In-Memory & File-Fallback Database for Analytics
 * Fully resilient to serverless (Vercel / Lambda) read-only filesystems (EROFS safe)
 */

import fs from 'fs';
import path from 'path';
import os from 'os';

// Determine writable directory (use /tmp in serverless or fallback)
const IS_SERVERLESS = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
const DB_DIR = IS_SERVERLESS
  ? path.join(os.tmpdir(), 'pharaonic-data')
  : path.join(process.cwd(), 'data');

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

  // In-memory persistent caches for serverless lifecycle
  private visitorsMemory: VisitorRecord[] = [];
  private activitiesMemory: ActivityRecord[] = [];
  private consentsMemory: ConsentRecord[] = [];
  private isFilesystemWritable: boolean = true;

  private constructor() {
    this.ensureDirectoryExists();
    this.loadInitialData();
  }

  public static getInstance(): SimpleDatabase {
    if (!SimpleDatabase.instance) {
      SimpleDatabase.instance = new SimpleDatabase();
    }
    return SimpleDatabase.instance;
  }

  /**
   * Ensure database directory and files exist with graceful fallback
   */
  private ensureDirectoryExists(): void {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      this.isFilesystemWritable = true;
    } catch {
      // Read-only filesystem in serverless environments (Vercel/Lambda)
      this.isFilesystemWritable = false;
    }
  }

  /**
   * Pre-load data from files into memory on startup
   */
  private loadInitialData(): void {
    try {
      if (this.isFilesystemWritable && fs.existsSync(VISITORS_DB)) {
        const raw = fs.readFileSync(VISITORS_DB, 'utf8');
        this.visitorsMemory = JSON.parse(raw);
      }
    } catch {
      // Memory defaults to empty array
    }

    try {
      if (this.isFilesystemWritable && fs.existsSync(ACTIVITIES_DB)) {
        const raw = fs.readFileSync(ACTIVITIES_DB, 'utf8');
        this.activitiesMemory = JSON.parse(raw);
      }
    } catch {
      // Memory defaults to empty array
    }

    try {
      if (this.isFilesystemWritable && fs.existsSync(CONSENTS_DB)) {
        const raw = fs.readFileSync(CONSENTS_DB, 'utf8');
        this.consentsMemory = JSON.parse(raw);
      }
    } catch {
      // Memory defaults to empty array
    }
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  /**
   * Write data to disk safely without throwing EROFS
   */
  private safeWriteData<T>(filePath: string, data: T[]): void {
    if (!this.isFilesystemWritable) return;
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch {
      // Mark filesystem as unwritable and continue purely in memory
      this.isFilesystemWritable = false;
    }
  }

  /**
   * Record new visitor
   */
  recordVisitor(visitorData: Omit<VisitorRecord, 'id' | 'timestamp'>): string {
    const id = this.generateId();
    const visitor: VisitorRecord = {
      id,
      timestamp: new Date().toISOString(),
      ...visitorData,
    };

    this.visitorsMemory.push(visitor);
    if (this.visitorsMemory.length > 5000) {
      this.visitorsMemory.splice(0, this.visitorsMemory.length - 5000);
    }

    this.safeWriteData(VISITORS_DB, this.visitorsMemory);
    return id;
  }

  /**
   * Record user activity
   */
  recordActivity(activityData: Omit<ActivityRecord, 'id' | 'timestamp'>): void {
    const activity: ActivityRecord = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      ...activityData,
    };

    this.activitiesMemory.push(activity);
    if (this.activitiesMemory.length > 10000) {
      this.activitiesMemory.splice(0, this.activitiesMemory.length - 10000);
    }

    this.safeWriteData(ACTIVITIES_DB, this.activitiesMemory);
  }

  /**
   * Record cookie consent
   */
  recordConsent(consentData: Omit<ConsentRecord, 'id' | 'timestamp'>): void {
    const consent: ConsentRecord = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      ...consentData,
    };

    this.consentsMemory.push(consent);
    if (this.consentsMemory.length > 5000) {
      this.consentsMemory.splice(0, this.consentsMemory.length - 5000);
    }

    this.safeWriteData(CONSENTS_DB, this.consentsMemory);
  }

  /**
   * Get database statistics
   */
  getStats(days: number = 7): DatabaseStats {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffTimestamp = cutoffDate.toISOString();

    const visitors = this.visitorsMemory.filter(v => v.timestamp >= cutoffTimestamp);
    const activities = this.activitiesMemory.filter(a => a.timestamp >= cutoffTimestamp);
    const consents = this.consentsMemory.filter(c => c.timestamp >= cutoffTimestamp);

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
        .slice(-20)
        .reverse(),
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
    return {
      visitor: this.visitorsMemory.find(v => v.id === visitorId) || null,
      activities: this.activitiesMemory.filter(a => a.visitorId === visitorId),
      consents: this.consentsMemory.filter(c => c.visitorId === visitorId),
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
    const total = this.consentsMemory.length;
    const acceptedAll = this.consentsMemory.filter(c => 
      c.analytics && c.marketing && c.preferences
    ).length;
    
    const rejectedAll = this.consentsMemory.filter(c => 
      !c.analytics && !c.marketing && !c.preferences
    ).length;
    
    const customized = total - acceptedAll - rejectedAll;
    
    const analyticsConsents = this.consentsMemory.filter(c => c.analytics).length;
    const marketingConsents = this.consentsMemory.filter(c => c.marketing).length;
    const preferencesConsents = this.consentsMemory.filter(c => c.preferences).length;

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

    this.visitorsMemory = this.visitorsMemory.filter(v => v.timestamp >= cutoffTimestamp);
    this.activitiesMemory = this.activitiesMemory.filter(a => a.timestamp >= cutoffTimestamp);
    this.safeWriteData(VISITORS_DB, this.visitorsMemory);
    this.safeWriteData(ACTIVITIES_DB, this.activitiesMemory);
  }
}

export default SimpleDatabase.getInstance();