/**
 * Analytics Tracker (Lightweight client-side stub)
 * Internal tracking is disabled in favor of Google Search Console & Google Analytics 4.
 */

class AnalyticsTracker {
    private static instance: AnalyticsTracker;
    private visitorId: string | null = null;
    private sessionId: string;
    private isInitialized = true;

    private constructor() {
        this.sessionId = this.generateSessionId();
    }

    public static getInstance(): AnalyticsTracker {
        if (!AnalyticsTracker.instance) {
            AnalyticsTracker.instance = new AnalyticsTracker();
        }
        return AnalyticsTracker.instance;
    }

    private generateSessionId(): string {
        return 'session_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    async initializeVisitor(_userData?: {
        language?: string;
        theme?: string;
        country?: string;
        referrer?: string;
    }): Promise<void> {
        // Disabled internal tracking
        this.isInitialized = true;
        this.visitorId = 'anon_' + this.sessionId;
    }

    loadExistingVisitor(): void {
        if (typeof window === 'undefined') return;
        this.visitorId = 'anon_' + this.sessionId;
        this.isInitialized = true;
    }

    async trackPageView(_page: string, _title?: string): Promise<void> {
        // Handled by Google Analytics 4
    }

    async trackProductView(_productId: string, _productName: string, _category: string): Promise<void> {
        // Handled by Google Analytics 4
    }

    async trackBlogView(_articleId: string, _title: string, _symbol?: string): Promise<void> {
        // Handled by Google Analytics 4
    }

    async trackContactForm(_formType: string, _data?: Record<string, any>): Promise<void> {
        // Handled by Google Analytics 4
    }

    async trackCookieConsent(_consents: {
        essential: boolean;
        analytics: boolean;
        marketing: boolean;
        preferences: boolean;
    }): Promise<void> {
        // Handled by Google Analytics 4
    }

    getIds(): { visitorId: string | null; sessionId: string } {
        return {
            visitorId: this.visitorId,
            sessionId: this.sessionId,
        };
    }

    isReady(): boolean {
        return true;
    }
}

export default AnalyticsTracker.getInstance();