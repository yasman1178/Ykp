/**
 * Google Search Console Integration Module
 * 
 * This module provides authentication and API interaction with Google Search Console
 * for automated sitemap submission, search analytics, and indexing management.
 * 
 * Requirements: 2.2, 5.1, 5.2
 */

import { google } from 'googleapis';
import type { JWT } from 'google-auth-library';

// Types for Search Console API responses
export interface SitemapSubmissionResult {
  success: boolean;
  message: string;
  sitemapUrl?: string;
  error?: string;
}

export interface SitemapStatus {
  path: string;
  lastSubmitted?: string;
  lastDownloaded?: string;
  isPending: boolean;
  isSitemapsIndex: boolean;
  type?: string;
  warnings?: number;
  errors?: number;
  contents?: Array<{
    type: string;
    submitted: number;
    indexed: number;
  }>;
}

export interface SearchAnalyticsParams {
  startDate: string; // Format: YYYY-MM-DD
  endDate: string;   // Format: YYYY-MM-DD
  dimensions?: ('query' | 'page' | 'country' | 'device' | 'date')[];
  rowLimit?: number;
  startRow?: number;
}

export interface SearchAnalyticsRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface SearchAnalyticsData {
  rows: SearchAnalyticsRow[];
  responseAggregationType: string;
}

export interface QueryData {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface PageData {
  url: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface IndexingResult {
  success: boolean;
  message: string;
  urlNotificationMetadata?: any;
  error?: string;
}

export interface IndexStatus {
  url: string;
  status: string;
  lastCrawlTime?: string;
  coverageState?: string;
}

export interface CoverageIssue {
  type: string;
  count: number;
  examples: string[];
}

export interface UsabilityIssue {
  issueType: string;
  severity: string;
  affectedPages: number;
  examples: string[];
}

export interface WebVitalsData {
  lcp: { good: number; needsImprovement: number; poor: number };
  fid: { good: number; needsImprovement: number; poor: number };
  cls: { good: number; needsImprovement: number; poor: number };
}

/**
 * Google Search Console Service Class
 * Handles all interactions with Google Search Console API
 */
export class SearchConsoleService {
  private auth: JWT | null = null;
  private siteUrl: string;
  private searchConsole: any;

  constructor(siteUrl?: string) {
    this.siteUrl = siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://ykp-supplies.vercel.app';
    
    // Ensure site URL has proper format for Search Console
    if (!this.siteUrl.startsWith('sc-domain:') && !this.siteUrl.startsWith('http')) {
      this.siteUrl = `https://${this.siteUrl}`;
    }
  }

  /**
   * Authenticate with Google Search Console API using service account
   * Requires environment variables:
   * - GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL
   * - GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY
   */
  async authenticate(): Promise<void> {
    try {
      const clientEmail = process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL;
      const privateKey = process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY;

      if (!clientEmail || !privateKey) {
        throw new Error(
          'Missing Google Search Console credentials. Please set GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL and GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY environment variables.'
        );
      }

      // Replace escaped newlines in private key
      const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

      this.auth = new google.auth.JWT({
        email: clientEmail,
        key: formattedPrivateKey,
        scopes: [
          'https://www.googleapis.com/auth/webmasters',
          'https://www.googleapis.com/auth/webmasters.readonly',
        ],
      });

      // Initialize Search Console API client
      this.searchConsole = google.webmasters({ version: 'v3', auth: this.auth });

      // Test authentication
      await this.auth.authorize();
      
      console.log('✅ Successfully authenticated with Google Search Console');
    } catch (error) {
      console.error('❌ Failed to authenticate with Google Search Console:', error);
      throw new Error(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Ensure authentication before making API calls
   */
  private async ensureAuthenticated(): Promise<void> {
    if (!this.auth) {
      await this.authenticate();
    }
  }

  /**
   * Submit sitemap to Google Search Console
   * @param sitemapUrl - Full URL to the sitemap (e.g., https://example.com/sitemap.xml)
   */
  async submitSitemap(sitemapUrl: string): Promise<SitemapSubmissionResult> {
    try {
      await this.ensureAuthenticated();

      // Validate sitemap URL
      if (!sitemapUrl.startsWith('http')) {
        throw new Error('Sitemap URL must be a full URL starting with http:// or https://');
      }

      await this.searchConsole.sitemaps.submit({
        siteUrl: this.siteUrl,
        feedpath: sitemapUrl,
      });

      console.log(`✅ Successfully submitted sitemap: ${sitemapUrl}`);

      return {
        success: true,
        message: 'Sitemap submitted successfully',
        sitemapUrl,
      };
    } catch (error) {
      console.error('❌ Failed to submit sitemap:', error);
      
      return {
        success: false,
        message: 'Failed to submit sitemap',
        sitemapUrl,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get sitemap status from Google Search Console
   * @param sitemapUrl - Full URL to the sitemap
   */
  async getSitemapStatus(sitemapUrl: string): Promise<SitemapStatus | null> {
    try {
      await this.ensureAuthenticated();

      const response = await this.searchConsole.sitemaps.get({
        siteUrl: this.siteUrl,
        feedpath: sitemapUrl,
      });

      const data = response.data;

      return {
        path: data.path,
        lastSubmitted: data.lastSubmitted,
        lastDownloaded: data.lastDownloaded,
        isPending: data.isPending || false,
        isSitemapsIndex: data.isSitemapsIndex || false,
        type: data.type,
        warnings: data.warnings,
        errors: data.errors,
        contents: data.contents,
      };
    } catch (error) {
      console.error('❌ Failed to get sitemap status:', error);
      return null;
    }
  }

  /**
   * Get search analytics data from Google Search Console
   * @param params - Query parameters for search analytics
   */
  async getSearchAnalytics(params: SearchAnalyticsParams): Promise<SearchAnalyticsData | null> {
    try {
      await this.ensureAuthenticated();

      const response = await this.searchConsole.searchanalytics.query({
        siteUrl: this.siteUrl,
        requestBody: {
          startDate: params.startDate,
          endDate: params.endDate,
          dimensions: params.dimensions || ['query'],
          rowLimit: params.rowLimit || 1000,
          startRow: params.startRow || 0,
        },
      });

      return response.data;
    } catch (error) {
      console.error('❌ Failed to get search analytics:', error);
      return null;
    }
  }

  /**
   * Get top search queries with performance metrics
   * @param dateRange - Date range for the query (days)
   */
  async getTopQueries(dateRange: number = 30): Promise<QueryData[]> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - dateRange);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const data = await this.getSearchAnalytics({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      dimensions: ['query'],
      rowLimit: 100,
    });

    if (!data || !data.rows) {
      return [];
    }

    return data.rows.map(row => ({
      query: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    }));
  }

  /**
   * Get top pages with performance metrics
   * @param dateRange - Date range for the query (days)
   */
  async getTopPages(dateRange: number = 30): Promise<PageData[]> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - dateRange);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const data = await this.getSearchAnalytics({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      dimensions: ['page'],
      rowLimit: 100,
    });

    if (!data || !data.rows) {
      return [];
    }

    return data.rows.map(row => ({
      url: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    }));
  }

  /**
   * Request indexing for a specific URL
   * Note: This requires the Indexing API to be enabled separately
   * @param url - URL to request indexing for
   */
  async requestIndexing(url: string): Promise<IndexingResult> {
    try {
      await this.ensureAuthenticated();

      // Note: The Indexing API is separate from Search Console API
      // and requires additional setup. This is a placeholder implementation.
      
      console.warn('⚠️ Indexing API requires separate setup and is not included in Search Console API');

      return {
        success: false,
        message: 'Indexing API not configured. Please enable Google Indexing API separately.',
      };
    } catch (error) {
      console.error('❌ Failed to request indexing:', error);
      
      return {
        success: false,
        message: 'Failed to request indexing',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get index status for a specific URL
   * @param url - URL to check index status
   */
  async getIndexStatus(url: string): Promise<IndexStatus | null> {
    try {
      await this.ensureAuthenticated();

      const response = await this.searchConsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl: this.siteUrl,
        },
      });

      const data = response.data.inspectionResult;

      return {
        url,
        status: data.indexStatusResult?.verdict || 'unknown',
        lastCrawlTime: data.indexStatusResult?.lastCrawlTime,
        coverageState: data.indexStatusResult?.coverageState,
      };
    } catch (error) {
      console.error('❌ Failed to get index status:', error);
      return null;
    }
  }

  /**
   * Get coverage issues from Search Console
   * Note: This is a simplified implementation
   */
  async getCoverageIssues(): Promise<CoverageIssue[]> {
    try {
      await this.ensureAuthenticated();

      // This would require more complex implementation with the actual API
      console.warn('⚠️ Coverage issues API requires additional implementation');

      return [];
    } catch (error) {
      console.error('❌ Failed to get coverage issues:', error);
      return [];
    }
  }

  /**
   * Get mobile usability issues
   * Note: This is a simplified implementation
   */
  async getMobileUsabilityIssues(): Promise<UsabilityIssue[]> {
    try {
      await this.ensureAuthenticated();

      // This would require more complex implementation with the actual API
      console.warn('⚠️ Mobile usability issues API requires additional implementation');

      return [];
    } catch (error) {
      console.error('❌ Failed to get mobile usability issues:', error);
      return [];
    }
  }

  /**
   * Get Core Web Vitals data
   * Note: This is a simplified implementation
   */
  async getCoreWebVitals(): Promise<WebVitalsData | null> {
    try {
      await this.ensureAuthenticated();

      // This would require more complex implementation with the actual API
      console.warn('⚠️ Core Web Vitals API requires additional implementation');

      return null;
    } catch (error) {
      console.error('❌ Failed to get Core Web Vitals:', error);
      return null;
    }
  }
}

/**
 * Create a singleton instance of SearchConsoleService
 */
let searchConsoleInstance: SearchConsoleService | null = null;

export function getSearchConsoleService(siteUrl?: string): SearchConsoleService {
  if (!searchConsoleInstance) {
    searchConsoleInstance = new SearchConsoleService(siteUrl);
  }
  return searchConsoleInstance;
}
