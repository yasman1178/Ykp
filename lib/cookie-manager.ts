/**
 * Cookie Management System for Pharaonic Pillows Website
 * Handles GDPR-compliant cookie consent and user preferences
 */

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface UserPreferences {
  language: 'en' | 'ar';
  theme: 'gold' | 'blue' | 'terracotta';
  cookieConsent: CookiePreferences;
  consentTimestamp: string;
  consentVersion: string;
}

const COOKIE_NAMES = {
  CONSENT: 'pharaonic_cookie_consent',
  PREFERENCES: 'pharaonic_user_preferences',
  ANALYTICS: 'pharaonic_analytics',
} as const;

const CONSENT_VERSION = '1.0';

class CookieManager {
  private static instance: CookieManager;

  private constructor() {}

  public static getInstance(): CookieManager {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager();
    }
    return CookieManager.instance;
  }

  /**
   * Set a cookie with Egyptian-themed naming
   */
  setCookie(name: string, value: string, days: number = 365): void {
    if (typeof window === 'undefined') return;
    
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }

  /**
   * Get a cookie value
   */
  getCookie(name: string): string | null {
    if (typeof window === 'undefined') return null;
    
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  }

  /**
   * Delete a cookie
   */
  deleteCookie(name: string): void {
    if (typeof window === 'undefined') return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }

  /**
   * Check if user has given consent
   */
  hasConsent(): boolean {
    const consent = this.getCookie(COOKIE_NAMES.CONSENT);
    return consent === 'true';
  }

  /**
   * Get user's cookie preferences
   */
  getCookiePreferences(): CookiePreferences {
    const defaultPreferences: CookiePreferences = {
      essential: true, // Always true for website functionality
      analytics: false,
      marketing: false,
      preferences: false,
    };

    const stored = this.getCookie(COOKIE_NAMES.PREFERENCES);
    if (!stored) return defaultPreferences;

    try {
      const parsed = JSON.parse(stored);
      return { ...defaultPreferences, ...parsed };
    } catch {
      return defaultPreferences;
    }
  }

  /**
   * Set user's cookie preferences
   */
  setCookiePreferences(preferences: CookiePreferences): void {
    this.setCookie(COOKIE_NAMES.PREFERENCES, JSON.stringify(preferences));
    this.setCookie(COOKIE_NAMES.CONSENT, 'true');
    
    // Clean up cookies based on preferences
    if (!preferences.analytics) {
      this.deleteCookie('_ga');
      this.deleteCookie('_ga_*');
      this.deleteCookie('_gid');
      this.deleteCookie('_gat');
    }
    
    if (!preferences.marketing) {
      this.deleteCookie('_fbp');
      this.deleteCookie('_fbc');
    }
  }

  /**
   * Get user preferences including language and theme
   */
  getUserPreferences(): UserPreferences {
    const defaultPreferences: UserPreferences = {
      language: 'en',
      theme: 'gold',
      cookieConsent: this.getCookiePreferences(),
      consentTimestamp: new Date().toISOString(),
      consentVersion: CONSENT_VERSION,
    };

    const stored = this.getCookie('pharaonic_user_prefs');
    if (!stored) return defaultPreferences;

    try {
      const parsed = JSON.parse(stored);
      return { ...defaultPreferences, ...parsed };
    } catch {
      return defaultPreferences;
    }
  }

  /**
   * Set user preferences
   */
  setUserPreferences(preferences: Partial<UserPreferences>): void {
    const current = this.getUserPreferences();
    const updated = {
      ...current,
      ...preferences,
      consentTimestamp: new Date().toISOString(),
      consentVersion: CONSENT_VERSION,
    };
    
    this.setCookie('pharaonic_user_prefs', JSON.stringify(updated));
  }

  /**
   * Check if consent needs to be updated (version change)
   */
  needsConsentUpdate(): boolean {
    const preferences = this.getUserPreferences();
    return preferences.consentVersion !== CONSENT_VERSION;
  }

  /**
   * Initialize analytics based on consent
   */
  initializeAnalytics(): void {
    const preferences = this.getCookiePreferences();
    
    if (preferences.analytics && typeof window !== 'undefined') {
      // Initialize Google Analytics
      this.loadGoogleAnalytics();
    }
  }

  /**
   * Load Google Analytics script
   */
  private loadGoogleAnalytics(): void {
    if (typeof window === 'undefined') return;
    
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!GA_MEASUREMENT_ID) return;

    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=Lax;Secure',
    });

    // Make gtag available globally
    (window as any).gtag = gtag;
  }

  /**
   * Track custom events for Egyptian website
   */
  trackEvent(eventName: string, parameters?: Record<string, any>): void {
    const preferences = this.getCookiePreferences();
    if (!preferences.analytics || typeof window === 'undefined') return;

    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, {
        custom_parameter: 'pharaonic_pillows',
        ...parameters,
      });
    }
  }

  /**
   * Track page views
   */
  trackPageView(url: string, title?: string): void {
    const preferences = this.getCookiePreferences();
    if (!preferences.analytics || typeof window === 'undefined') return;

    if ((window as any).gtag) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_location: url,
        page_title: title,
      });
    }
  }
}

export default CookieManager.getInstance();

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}