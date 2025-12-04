/**
 * Conversion Tracking System
 * Track all conversion events with source attribution and lead quality scoring
 */

import EnhancedAnalyticsManager, { ConversionData } from './analytics-enhanced';

// ============================================================================
// Type Definitions
// ============================================================================

export interface ContactFormSubmission {
  form_type: 'contact' | 'wholesale' | 'partnership' | 'distributor';
  name?: string;
  email?: string;
  company?: string;
  country?: string;
  message?: string;
  source_page: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface WholesaleInquiry {
  company_name?: string;
  contact_name?: string;
  email?: string;
  country?: string;
  estimated_quantity?: number;
  products_of_interest?: string[];
  business_type?: string;
  source_page: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface CatalogDownload {
  catalog_type: 'full' | 'product_line' | 'collection';
  download_source: string;
  user_email?: string;
  source_page: string;
}

export interface MicroConversion {
  type: 'phone_click' | 'email_click';
  source_page: string;
  target?: string;
}

export interface ConversionAttribution {
  source: string;
  medium: string;
  campaign?: string;
  referrer?: string;
  landing_page?: string;
  session_id?: string;
}

// ============================================================================
// Conversion Tracking Manager
// ============================================================================

class ConversionTrackingManager {
  private static instance: ConversionTrackingManager;
  private conversionsBySource: Map<string, number> = new Map();
  private sessionStartTime: number = Date.now();

  private constructor() {
    this.loadConversionData();
  }

  public static getInstance(): ConversionTrackingManager {
    if (!ConversionTrackingManager.instance) {
      ConversionTrackingManager.instance = new ConversionTrackingManager();
    }
    return ConversionTrackingManager.instance;
  }

  /**
   * Track contact form submission
   */
  trackContactFormSubmission(data: ContactFormSubmission): void {
    const attribution = this.getAttribution(data);
    const leadQuality = this.calculateContactFormLeadQuality(data);

    const conversionData: ConversionData = {
      conversion_type: 'contact_form',
      value: leadQuality,
      currency: 'USD',
      source: attribution.source,
      medium: attribution.medium,
      campaign: attribution.campaign,
      lead_quality: leadQuality,
      metadata: {
        form_type: data.form_type,
        has_company: !!data.company,
        has_country: !!data.country,
        message_length: data.message?.length || 0,
        source_page: data.source_page,
        session_duration: this.getSessionDuration(),
      },
    };

    EnhancedAnalyticsManager.trackConversion(conversionData);
    this.incrementConversionCount(attribution.source);

    // Track as lead generation event
    EnhancedAnalyticsManager.trackEvent('generate_lead', {
      lead_type: 'contact_form',
      form_type: data.form_type,
      lead_quality: leadQuality,
      source: attribution.source,
      medium: attribution.medium,
    });

    // Store conversion data locally
    this.storeConversion('contact_form', conversionData);
  }

  /**
   * Track wholesale inquiry submission
   */
  trackWholesaleInquiry(data: WholesaleInquiry): void {
    const attribution = this.getAttribution(data);
    const leadQuality = this.calculateWholesaleLeadQuality(data);

    const conversionData: ConversionData = {
      conversion_type: 'wholesale_inquiry',
      value: leadQuality * 2, // Wholesale inquiries are more valuable
      currency: 'USD',
      source: attribution.source,
      medium: attribution.medium,
      campaign: attribution.campaign,
      lead_quality: leadQuality,
      metadata: {
        has_company: !!data.company_name,
        has_country: !!data.country,
        estimated_quantity: data.estimated_quantity,
        products_count: data.products_of_interest?.length || 0,
        business_type: data.business_type,
        source_page: data.source_page,
        session_duration: this.getSessionDuration(),
      },
    };

    EnhancedAnalyticsManager.trackConversion(conversionData);
    this.incrementConversionCount(attribution.source);

    // Track as high-value lead
    EnhancedAnalyticsManager.trackEvent('generate_lead', {
      lead_type: 'wholesale_inquiry',
      lead_quality: leadQuality,
      estimated_quantity: data.estimated_quantity,
      source: attribution.source,
      medium: attribution.medium,
      value: leadQuality * 2,
    });

    // Track as high-value conversion if quality is high
    if (leadQuality >= 8) {
      EnhancedAnalyticsManager.trackEvent('high_value_lead', {
        lead_type: 'wholesale_inquiry',
        lead_quality: leadQuality,
        estimated_quantity: data.estimated_quantity,
        source: attribution.source,
      });
    }

    this.storeConversion('wholesale_inquiry', conversionData);
  }

  /**
   * Track catalog download
   */
  trackCatalogDownload(data: CatalogDownload): void {
    const attribution = this.getAttribution({ source_page: data.source_page });

    const conversionData: ConversionData = {
      conversion_type: 'catalog_download',
      value: 2,
      currency: 'USD',
      source: attribution.source,
      medium: attribution.medium,
      campaign: attribution.campaign,
      metadata: {
        catalog_type: data.catalog_type,
        download_source: data.download_source,
        has_email: !!data.user_email,
        source_page: data.source_page,
      },
    };

    EnhancedAnalyticsManager.trackConversion(conversionData);
    this.incrementConversionCount(attribution.source);

    // Track as file download
    EnhancedAnalyticsManager.trackEvent('file_download', {
      file_name: `catalog_${data.catalog_type}`,
      file_extension: 'pdf',
      download_source: data.download_source,
      source: attribution.source,
    });

    this.storeConversion('catalog_download', conversionData);
  }

  /**
   * Track micro-conversions (phone, email, social clicks)
   */
  trackMicroConversion(data: MicroConversion): void {
    const attribution = this.getAttribution({ source_page: data.source_page });

    const conversionData: ConversionData = {
      conversion_type: data.type,
      value: 0.5,
      currency: 'USD',
      source: attribution.source,
      medium: attribution.medium,
      campaign: attribution.campaign,
      metadata: {
        target: data.target,
        source_page: data.source_page,
      },
    };

    EnhancedAnalyticsManager.trackConversion(conversionData);
    this.incrementConversionCount(attribution.source);

    // Track specific micro-conversion event
    EnhancedAnalyticsManager.trackEvent('micro_conversion', {
      conversion_type: data.type,
      target: data.target,
      source: attribution.source,
    });

    this.storeConversion(data.type, conversionData);
  }

  /**
   * Get conversion rate by source
   */
  getConversionRateBySource(source: string): number {
    const conversions = this.conversionsBySource.get(source) || 0;
    const sessions = this.getSessionsBySource(source);
    
    return sessions > 0 ? (conversions / sessions) * 100 : 0;
  }

  /**
   * Get all conversion rates
   */
  getAllConversionRates(): Map<string, number> {
    const rates = new Map<string, number>();
    
    this.conversionsBySource.forEach((conversions, source) => {
      rates.set(source, this.getConversionRateBySource(source));
    });

    return rates;
  }

  /**
   * Calculate lead quality for contact forms (1-10 scale)
   */
  private calculateContactFormLeadQuality(data: ContactFormSubmission): number {
    let score = 5; // Base score

    // Form type scoring
    if (data.form_type === 'wholesale') score += 2;
    if (data.form_type === 'partnership') score += 2;
    if (data.form_type === 'distributor') score += 2;

    // Data completeness
    if (data.company) score += 1;
    if (data.country) score += 1;
    if (data.message && data.message.length > 50) score += 1;

    // Source quality
    if (data.utm_campaign) score += 0.5;
    if (data.referrer && !data.referrer.includes(window.location.hostname)) score += 0.5;

    return Math.min(Math.round(score), 10);
  }

  /**
   * Calculate lead quality for wholesale inquiries (1-10 scale)
   */
  private calculateWholesaleLeadQuality(data: WholesaleInquiry): number {
    let score = 6; // Higher base score for wholesale

    // Quantity scoring
    if (data.estimated_quantity) {
      if (data.estimated_quantity >= 1000) score += 3;
      else if (data.estimated_quantity >= 500) score += 2;
      else if (data.estimated_quantity >= 100) score += 1;
    }

    // Data completeness
    if (data.company_name) score += 1;
    if (data.country) score += 1;
    if (data.business_type) score += 0.5;

    // Product interest
    if (data.products_of_interest && data.products_of_interest.length > 1) {
      score += 1;
    }

    return Math.min(Math.round(score), 10);
  }

  /**
   * Get attribution data from URL parameters and referrer
   */
  private getAttribution(data: { 
    source_page: string;
    referrer?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  }): ConversionAttribution {
    // Try to get UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = data.utm_source || urlParams.get('utm_source');
    const utmMedium = data.utm_medium || urlParams.get('utm_medium');
    const utmCampaign = data.utm_campaign || urlParams.get('utm_campaign');

    // Determine source
    let source = utmSource || 'direct';
    let medium = utmMedium || 'none';

    // If no UTM, try to determine from referrer
    if (!utmSource && data.referrer) {
      const referrerUrl = new URL(data.referrer);
      const referrerHostname = referrerUrl.hostname;

      if (referrerHostname.includes('google')) {
        source = 'google';
        medium = 'organic';
      } else if (referrerHostname.includes('facebook')) {
        source = 'facebook';
        medium = 'social';
      } else if (referrerHostname.includes('linkedin')) {
        source = 'linkedin';
        medium = 'social';
      } else if (referrerHostname.includes('instagram')) {
        source = 'instagram';
        medium = 'social';
      } else if (referrerHostname !== window.location.hostname) {
        source = referrerHostname;
        medium = 'referral';
      }
    }

    return {
      source,
      medium,
      campaign: utmCampaign || undefined,
      referrer: data.referrer || document.referrer,
      landing_page: this.getLandingPage(),
      session_id: EnhancedAnalyticsManager.getSessionId(),
    };
  }

  /**
   * Get landing page from session storage
   */
  private getLandingPage(): string {
    if (typeof window === 'undefined') return '/';

    let landingPage = sessionStorage.getItem('landing_page');
    
    if (!landingPage) {
      landingPage = window.location.pathname;
      sessionStorage.setItem('landing_page', landingPage);
    }

    return landingPage || '/';
  }

  /**
   * Get session duration in seconds
   */
  private getSessionDuration(): number {
    return Math.round((Date.now() - this.sessionStartTime) / 1000);
  }

  /**
   * Increment conversion count for source
   */
  private incrementConversionCount(source: string): void {
    const current = this.conversionsBySource.get(source) || 0;
    this.conversionsBySource.set(source, current + 1);
    this.saveConversionData();
  }

  /**
   * Get sessions by source (placeholder - would need actual session tracking)
   */
  private getSessionsBySource(source: string): number {
    // This would need to be implemented with actual session tracking
    // For now, return a placeholder value
    return 100;
  }

  /**
   * Store conversion data in localStorage
   */
  private storeConversion(type: string, data: ConversionData): void {
    if (typeof window === 'undefined') return;

    try {
      const conversions = JSON.parse(localStorage.getItem('conversions') || '[]');
      conversions.push({
        type,
        data,
        timestamp: new Date().toISOString(),
      });

      // Keep only last 100 conversions
      if (conversions.length > 100) {
        conversions.shift();
      }

      localStorage.setItem('conversions', JSON.stringify(conversions));
    } catch (e) {
      console.error('Failed to store conversion:', e);
    }
  }

  /**
   * Load conversion data from localStorage
   */
  private loadConversionData(): void {
    if (typeof window === 'undefined') return;

    try {
      const data = localStorage.getItem('conversion_counts');
      if (data) {
        const parsed = JSON.parse(data);
        this.conversionsBySource = new Map(Object.entries(parsed));
      }
    } catch (e) {
      console.error('Failed to load conversion data:', e);
    }
  }

  /**
   * Save conversion data to localStorage
   */
  private saveConversionData(): void {
    if (typeof window === 'undefined') return;

    try {
      const data = Object.fromEntries(this.conversionsBySource);
      localStorage.setItem('conversion_counts', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save conversion data:', e);
    }
  }
}

export default ConversionTrackingManager.getInstance();
