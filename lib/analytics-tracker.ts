/**
 * Analytics Tracker for Local Database
 * Tracks visitor activities and sends to local database
 */

class AnalyticsTracker {
    private static instance: AnalyticsTracker;
    private visitorId: string | null = null;
    private sessionId: string;
    private isInitialized = false;

    private constructor() {
        this.sessionId = this.generateSessionId();
    }

    public static getInstance(): AnalyticsTracker {
        if (!AnalyticsTracker.instance) {
            AnalyticsTracker.instance = new AnalyticsTracker();
        }
        return AnalyticsTracker.instance;
    }

    /**
     * Generate unique session ID
     */
    private generateSessionId(): string {
        return 'session_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * Initialize visitor tracking
     */
    async initializeVisitor(userData?: {
        language?: string;
        theme?: string;
        country?: string;
        referrer?: string;
    }): Promise<void> {
        if (this.isInitialized || typeof window === 'undefined') return;

        try {
            const response = await fetch('/api/analytics/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'visitor',
                    data: {
                        sessionId: this.sessionId,
                        language: userData?.language || navigator.language || 'en',
                        theme: userData?.theme || 'gold',
                        country: userData?.country || 'Unknown',
                        referrer: userData?.referrer || document.referrer,
                    },
                }),
            });

            const result = await response.json();
            if (result.success) {
                this.visitorId = result.visitorId;
                this.isInitialized = true;

                // Store in localStorage for session persistence
                if (this.visitorId) {
                    localStorage.setItem('pharaonic_visitor_id', this.visitorId);
                    localStorage.setItem('pharaonic_session_id', this.sessionId);
                }
            }
        } catch (error) {
            console.error('Failed to initialize visitor tracking:', error);
        }
    }

    /**
     * Load existing visitor ID from localStorage
     */
    loadExistingVisitor(): void {
        if (typeof window === 'undefined') return;

        const storedVisitorId = localStorage.getItem('pharaonic_visitor_id');
        const storedSessionId = localStorage.getItem('pharaonic_session_id');

        if (storedVisitorId && storedSessionId) {
            this.visitorId = storedVisitorId;
            this.sessionId = storedSessionId;
            this.isInitialized = true;
        }
    }

    /**
     * Track page view
     */
    async trackPageView(page: string, title?: string): Promise<void> {
        if (!this.visitorId) return;

        try {
            await fetch('/api/analytics/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'activity',
                    data: {
                        visitorId: this.visitorId,
                        sessionId: this.sessionId,
                        activityType: 'page_view',
                        page,
                        additionalData: {
                            title: title || document.title,
                            timestamp: new Date().toISOString(),
                        },
                    },
                }),
            });
        } catch (error) {
            console.error('Failed to track page view:', error);
        }
    }

    /**
     * Track product view
     */
    async trackProductView(productId: string, productName: string, category: string): Promise<void> {
        if (!this.visitorId) return;

        try {
            await fetch('/api/analytics/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'activity',
                    data: {
                        visitorId: this.visitorId,
                        sessionId: this.sessionId,
                        activityType: 'product_view',
                        page: window.location.pathname,
                        additionalData: {
                            productId,
                            productName,
                            category,
                            timestamp: new Date().toISOString(),
                        },
                    },
                }),
            });
        } catch (error) {
            console.error('Failed to track product view:', error);
        }
    }

    /**
     * Track blog view
     */
    async trackBlogView(articleId: string, title: string, symbol?: string): Promise<void> {
        if (!this.visitorId) return;

        try {
            await fetch('/api/analytics/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'activity',
                    data: {
                        visitorId: this.visitorId,
                        sessionId: this.sessionId,
                        activityType: 'blog_view',
                        page: window.location.pathname,
                        additionalData: {
                            articleId,
                            title,
                            pharaonicSymbol: symbol,
                            timestamp: new Date().toISOString(),
                        },
                    },
                }),
            });
        } catch (error) {
            console.error('Failed to track blog view:', error);
        }
    }

    /**
     * Track contact form submission
     */
    async trackContactForm(formType: string, data?: Record<string, any>): Promise<void> {
        if (!this.visitorId) return;

        try {
            await fetch('/api/analytics/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'activity',
                    data: {
                        visitorId: this.visitorId,
                        sessionId: this.sessionId,
                        activityType: 'contact_form',
                        page: window.location.pathname,
                        additionalData: {
                            formType,
                            ...data,
                            timestamp: new Date().toISOString(),
                        },
                    },
                }),
            });
        } catch (error) {
            console.error('Failed to track contact form:', error);
        }
    }

    /**
     * Track cookie consent
     */
    async trackCookieConsent(consents: {
        essential: boolean;
        analytics: boolean;
        marketing: boolean;
        preferences: boolean;
    }): Promise<void> {
        if (!this.visitorId) return;

        try {
            await fetch('/api/analytics/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'consent',
                    data: {
                        visitorId: this.visitorId,
                        sessionId: this.sessionId,
                        essential: consents.essential,
                        analytics: consents.analytics,
                        marketing: consents.marketing,
                        preferences: consents.preferences,
                        consentVersion: '1.0',
                    },
                }),
            });
        } catch (error) {
            console.error('Failed to track cookie consent:', error);
        }
    }

    /**
     * Get visitor and session IDs
     */
    getIds(): { visitorId: string | null; sessionId: string } {
        return {
            visitorId: this.visitorId,
            sessionId: this.sessionId,
        };
    }

    /**
     * Check if tracker is initialized
     */
    isReady(): boolean {
        return this.isInitialized && this.visitorId !== null;
    }
}

export default AnalyticsTracker.getInstance();