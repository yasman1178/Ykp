/**
 * Simple authentication system for admin pages
 * Basic password protection for analytics dashboard
 */

export interface AuthConfig {
  adminPassword: string;
  sessionDuration: number; // in milliseconds
}

const AUTH_CONFIG: AuthConfig = {
  adminPassword: process.env.ADMIN_PASSWORD || 'pharaonic2024!',
  sessionDuration: 24 * 60 * 60 * 1000, // 24 hours
};

class AuthManager {
  private static instance: AuthManager;
  private isAuthenticated = false;
  private authTimestamp: number | null = null;

  private constructor() {
    this.loadAuthState();
  }

  public static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  /**
   * Authenticate user with password
   */
  authenticate(password: string): boolean {
    // Basic rate limiting - prevent brute force attacks
    const now = Date.now();
    const lastAttempt = this.getLastFailedAttempt();
    const attemptCount = this.getFailedAttemptCount();
    
    // If too many failed attempts, require waiting period
    if (attemptCount >= 5 && now - lastAttempt < 5 * 60 * 1000) { // 5 minutes
      return false;
    }
    
    if (password === AUTH_CONFIG.adminPassword) {
      this.isAuthenticated = true;
      this.authTimestamp = Date.now();
      this.clearFailedAttempts();
      this.saveAuthState();
      return true;
    } else {
      this.recordFailedAttempt();
      return false;
    }
  }

  /**
   * Check if user is currently authenticated
   */
  isUserAuthenticated(): boolean {
    if (!this.isAuthenticated || !this.authTimestamp) {
      return false;
    }

    // Check if session has expired
    const now = Date.now();
    const sessionAge = now - this.authTimestamp;
    
    if (sessionAge > AUTH_CONFIG.sessionDuration) {
      this.logout();
      return false;
    }

    return true;
  }

  /**
   * Logout user
   */
  logout(): void {
    this.isAuthenticated = false;
    this.authTimestamp = null;
    this.clearAuthState();
  }

  /**
   * Get remaining session time in minutes
   */
  getSessionTimeRemaining(): number {
    if (!this.authTimestamp) return 0;
    
    const now = Date.now();
    const sessionAge = now - this.authTimestamp;
    const remaining = AUTH_CONFIG.sessionDuration - sessionAge;
    
    return Math.max(0, Math.floor(remaining / (60 * 1000)));
  }

  /**
   * Save authentication state to localStorage
   */
  private saveAuthState(): void {
    if (typeof window === 'undefined') return;
    
    const authData = {
      isAuthenticated: this.isAuthenticated,
      timestamp: this.authTimestamp,
    };
    
    localStorage.setItem('pharaonic_admin_auth', JSON.stringify(authData));
  }

  /**
   * Load authentication state from localStorage
   */
  private loadAuthState(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem('pharaonic_admin_auth');
      if (stored) {
        const authData = JSON.parse(stored);
        this.isAuthenticated = authData.isAuthenticated || false;
        this.authTimestamp = authData.timestamp || null;
      }
    } catch (error) {
      console.error('Failed to load auth state:', error);
      this.clearAuthState();
    }
  }

  /**
   * Clear authentication state from localStorage
   */
  private clearAuthState(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('pharaonic_admin_auth');
  }

  /**
   * Record failed login attempt
   */
  private recordFailedAttempt(): void {
    if (typeof window === 'undefined') return;
    
    const attempts = this.getFailedAttemptCount() + 1;
    const timestamp = Date.now();
    
    localStorage.setItem('pharaonic_failed_attempts', JSON.stringify({
      count: attempts,
      lastAttempt: timestamp,
    }));
  }

  /**
   * Get failed attempt count
   */
  private getFailedAttemptCount(): number {
    if (typeof window === 'undefined') return 0;
    
    try {
      const stored = localStorage.getItem('pharaonic_failed_attempts');
      if (stored) {
        const data = JSON.parse(stored);
        return data.count || 0;
      }
    } catch (error) {
      console.error('Failed to get attempt count:', error);
    }
    return 0;
  }

  /**
   * Get last failed attempt timestamp
   */
  private getLastFailedAttempt(): number {
    if (typeof window === 'undefined') return 0;
    
    try {
      const stored = localStorage.getItem('pharaonic_failed_attempts');
      if (stored) {
        const data = JSON.parse(stored);
        return data.lastAttempt || 0;
      }
    } catch (error) {
      console.error('Failed to get last attempt:', error);
    }
    return 0;
  }

  /**
   * Clear failed attempts
   */
  private clearFailedAttempts(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('pharaonic_failed_attempts');
  }

  /**
   * Check if user is currently rate limited
   */
  isRateLimited(): boolean {
    const now = Date.now();
    const lastAttempt = this.getLastFailedAttempt();
    const attemptCount = this.getFailedAttemptCount();
    
    return attemptCount >= 5 && now - lastAttempt < 5 * 60 * 1000;
  }

  /**
   * Get remaining rate limit time in minutes
   */
  getRateLimitTimeRemaining(): number {
    if (!this.isRateLimited()) return 0;
    
    const now = Date.now();
    const lastAttempt = this.getLastFailedAttempt();
    const remaining = 5 * 60 * 1000 - (now - lastAttempt);
    
    return Math.ceil(remaining / (60 * 1000));
  }
}

export default AuthManager.getInstance();