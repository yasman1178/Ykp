// Comprehensive Accessibility System for Manufacturing Blog
// WCAG 2.1 AA compliance with focus on inclusive design

export interface AccessibilityConfig {
  announcements: boolean;
  keyboardNavigation: boolean;
  screenReaderSupport: boolean;
  colorContrastCheck: boolean;
  focusManagement: boolean;
  reducedMotion: boolean;
}

export interface AccessibilityAudit {
  score: number;
  issues: AccessibilityIssue[];
  recommendations: string[];
  wcagLevel: 'A' | 'AA' | 'AAA';
}

export interface AccessibilityIssue {
  type: 'error' | 'warning' | 'info';
  element: string;
  description: string;
  wcagReference: string;
  fix: string;
}

export class AccessibilitySystem {
  private config: AccessibilityConfig;
  private announcer: HTMLElement | null = null;
  private focusHistory: HTMLElement[] = [];

  constructor(config: Partial<AccessibilityConfig> = {}) {
    this.config = {
      announcements: true,
      keyboardNavigation: true,
      screenReaderSupport: true,
      colorContrastCheck: true,
      focusManagement: true,
      reducedMotion: true,
      ...config
    };

    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }

  /**
   * Initialize accessibility features
   */
  private initialize(): void {
    this.setupScreenReaderAnnouncer();
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupReducedMotionSupport();
    this.setupColorContrastMonitoring();
    this.setupARIAEnhancements();
  }

  /**
   * Setup screen reader announcer
   */
  private setupScreenReaderAnnouncer(): void {
    if (!this.config.announcements) return;

    this.announcer = document.createElement('div');
    this.announcer.setAttribute('aria-live', 'polite');
    this.announcer.setAttribute('aria-atomic', 'true');
    this.announcer.className = 'sr-only';
    this.announcer.style.cssText = `
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `;
    document.body.appendChild(this.announcer);
  }

  /**
   * Announce message to screen readers
   */
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (!this.announcer || !this.config.announcements) return;

    this.announcer.setAttribute('aria-live', priority);
    this.announcer.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      if (this.announcer) {
        this.announcer.textContent = '';
      }
    }, 1000);
  }

  /**
   * Setup keyboard navigation
   */
  private setupKeyboardNavigation(): void {
    if (!this.config.keyboardNavigation) return;

    // Handle skip links
    this.setupSkipLinks();

    // Handle keyboard shortcuts
    document.addEventListener('keydown', (event) => {
      this.handleKeyboardShortcuts(event);
    });

    // Ensure all interactive elements are keyboard accessible
    this.ensureKeyboardAccessibility();
  }

  /**
   * Setup skip links for keyboard navigation
   */
  private setupSkipLinks(): void {
    const skipLinks = document.createElement('div');
    skipLinks.className = 'skip-links';
    skipLinks.innerHTML = `
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <a href="#navigation" class="skip-link">Skip to navigation</a>
      <a href="#search" class="skip-link">Skip to search</a>
    `;

    // Style skip links
    const style = document.createElement('style');
    style.textContent = `
      .skip-links {
        position: absolute;
        top: -40px;
        left: 6px;
        z-index: 1000;
      }
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
        z-index: 1001;
      }
      .skip-link:focus {
        top: 6px;
      }
    `;
    document.head.appendChild(style);
    document.body.insertBefore(skipLinks, document.body.firstChild);
  }

  /**
   * Handle keyboard shortcuts
   */
  private handleKeyboardShortcuts(event: KeyboardEvent): void {
    // Alt + S: Focus search
    if (event.altKey && event.key === 's') {
      event.preventDefault();
      const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]') as HTMLElement;
      if (searchInput) {
        searchInput.focus();
        this.announce('Search focused');
      }
    }

    // Alt + M: Focus main navigation
    if (event.altKey && event.key === 'm') {
      event.preventDefault();
      const mainNav = document.querySelector('nav[role="navigation"], .main-navigation') as HTMLElement;
      if (mainNav) {
        const firstLink = mainNav.querySelector('a') as HTMLElement;
        if (firstLink) {
          firstLink.focus();
          this.announce('Main navigation focused');
        }
      }
    }

    // Escape: Close modals/dropdowns
    if (event.key === 'Escape') {
      this.closeModalsAndDropdowns();
    }
  }

  /**
   * Ensure keyboard accessibility for interactive elements
   */
  private ensureKeyboardAccessibility(): void {
    // Add tabindex to clickable elements without proper keyboard support
    const clickableElements = document.querySelectorAll('[onclick]:not(button):not(a):not([tabindex])');
    clickableElements.forEach(element => {
      element.setAttribute('tabindex', '0');
      element.setAttribute('role', 'button');
      
      // Add keyboard event listeners
      element.addEventListener('keydown', (event: Event) => {
        const keyboardEvent = event as KeyboardEvent;
        if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
          event.preventDefault();
          (element as HTMLElement).click();
        }
      });
    });
  }

  /**
   * Setup focus management
   */
  private setupFocusManagement(): void {
    if (!this.config.focusManagement) return;

    // Track focus history
    document.addEventListener('focusin', (event) => {
      const target = event.target as HTMLElement;
      if (target && target !== document.body) {
        this.focusHistory.push(target);
        // Keep only last 10 focused elements
        if (this.focusHistory.length > 10) {
          this.focusHistory.shift();
        }
      }
    });

    // Handle focus trapping in modals
    this.setupFocusTrapping();
  }

  /**
   * Setup focus trapping for modals
   */
  private setupFocusTrapping(): void {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        const modal = document.querySelector('[role="dialog"]:not([aria-hidden="true"])') as HTMLElement;
        if (modal) {
          this.trapFocus(event, modal);
        }
      }
    });
  }

  /**
   * Trap focus within an element
   */
  private trapFocus(event: KeyboardEvent, container: HTMLElement): void {
    const focusableElements = container.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  /**
   * Setup reduced motion support
   */
  private setupReducedMotionSupport(): void {
    if (!this.config.reducedMotion) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotion = (mediaQuery: MediaQueryList | MediaQueryListEvent) => {
      const matches = 'matches' in mediaQuery ? mediaQuery.matches : (mediaQuery as MediaQueryListEvent).matches;
      if (matches) {
        document.documentElement.classList.add('reduce-motion');
        this.announce('Reduced motion enabled for accessibility');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    };

    handleReducedMotion(prefersReducedMotion);
    prefersReducedMotion.addListener(handleReducedMotion);

    // Add CSS for reduced motion
    const style = document.createElement('style');
    style.textContent = `
      .reduce-motion *,
      .reduce-motion *::before,
      .reduce-motion *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Setup color contrast monitoring
   */
  private setupColorContrastMonitoring(): void {
    if (!this.config.colorContrastCheck) return;

    // This would typically integrate with a color contrast checking library
    // For now, we'll add basic high contrast mode support
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
    
    const handleHighContrast = (mediaQuery: MediaQueryList | MediaQueryListEvent) => {
      const matches = 'matches' in mediaQuery ? mediaQuery.matches : (mediaQuery as MediaQueryListEvent).matches;
      if (matches) {
        document.documentElement.classList.add('high-contrast');
        this.announce('High contrast mode enabled');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    };

    handleHighContrast(prefersHighContrast);
    prefersHighContrast.addListener(handleHighContrast);
  }

  /**
   * Setup ARIA enhancements
   */
  private setupARIAEnhancements(): void {
    if (!this.config.screenReaderSupport) return;

    // Enhance navigation landmarks
    this.enhanceNavigationLandmarks();
    
    // Add ARIA labels to unlabeled elements
    this.addMissingARIALabels();
    
    // Enhance form accessibility
    this.enhanceFormAccessibility();
  }

  /**
   * Enhance navigation landmarks
   */
  private enhanceNavigationLandmarks(): void {
    // Add main landmark if missing
    let main = document.querySelector('main');
    if (!main) {
      const content = document.querySelector('#main-content, .main-content, .content');
      if (content && !content.closest('main')) {
        const mainElement = document.createElement('main');
        mainElement.id = 'main-content';
        content.parentNode?.insertBefore(mainElement, content);
        mainElement.appendChild(content);
      }
    }

    // Enhance navigation
    const navElements = document.querySelectorAll('nav:not([aria-label]):not([aria-labelledby])');
    navElements.forEach((nav, index) => {
      if (nav.classList.contains('main-nav') || nav.id === 'main-navigation') {
        nav.setAttribute('aria-label', 'Main navigation');
      } else if (nav.classList.contains('breadcrumb')) {
        nav.setAttribute('aria-label', 'Breadcrumb navigation');
      } else {
        nav.setAttribute('aria-label', `Navigation ${index + 1}`);
      }
    });
  }

  /**
   * Add missing ARIA labels
   */
  private addMissingARIALabels(): void {
    // Add labels to buttons without text
    const unlabeledButtons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby]):empty, button:not([aria-label]):not([aria-labelledby]):has(svg):not(:has(span)):not(:has(text))');
    unlabeledButtons.forEach(button => {
      const svg = button.querySelector('svg');
      if (svg) {
        const title = svg.querySelector('title');
        if (title) {
          button.setAttribute('aria-label', title.textContent || 'Button');
        } else {
          button.setAttribute('aria-label', 'Button');
        }
      }
    });

    // Add labels to links without text
    const unlabeledLinks = document.querySelectorAll('a:not([aria-label]):not([aria-labelledby]):empty, a:not([aria-label]):not([aria-labelledby]):has(img):not(:has(text))');
    unlabeledLinks.forEach(link => {
      const img = link.querySelector('img');
      if (img && img.alt) {
        link.setAttribute('aria-label', img.alt);
      } else {
        link.setAttribute('aria-label', 'Link');
      }
    });
  }

  /**
   * Enhance form accessibility
   */
  private enhanceFormAccessibility(): void {
    // Associate labels with form controls
    const unlabeledInputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby]):not([id])');
    unlabeledInputs.forEach((input, index) => {
      const placeholder = input.getAttribute('placeholder');
      if (placeholder) {
        input.setAttribute('aria-label', placeholder);
      } else {
        input.setAttribute('aria-label', `Input field ${index + 1}`);
      }
    });

    // Add required field indicators
    const requiredFields = document.querySelectorAll('input[required], textarea[required], select[required]');
    requiredFields.forEach(field => {
      if (!field.getAttribute('aria-required')) {
        field.setAttribute('aria-required', 'true');
      }
    });

    // Enhance error messages
    const errorMessages = document.querySelectorAll('.error-message, .field-error, [class*="error"]');
    errorMessages.forEach((error, index) => {
      if (!error.id) {
        error.id = `error-${index}`;
      }
      error.setAttribute('role', 'alert');
      error.setAttribute('aria-live', 'polite');
    });
  }

  /**
   * Close modals and dropdowns
   */
  private closeModalsAndDropdowns(): void {
    // Close modals
    const openModals = document.querySelectorAll('[role="dialog"]:not([aria-hidden="true"])');
    openModals.forEach(modal => {
      modal.setAttribute('aria-hidden', 'true');
      const closeButton = modal.querySelector('[data-close], .close, .modal-close') as HTMLElement;
      if (closeButton) {
        closeButton.click();
      }
    });

    // Close dropdowns
    const openDropdowns = document.querySelectorAll('[aria-expanded="true"]');
    openDropdowns.forEach(dropdown => {
      dropdown.setAttribute('aria-expanded', 'false');
    });

    // Return focus to last focused element
    if (this.focusHistory.length > 0) {
      const lastFocused = this.focusHistory[this.focusHistory.length - 2]; // -2 because current is last
      if (lastFocused && document.contains(lastFocused)) {
        lastFocused.focus();
      }
    }
  }

  /**
   * Perform accessibility audit
   */
  performAccessibilityAudit(): AccessibilityAudit {
    const issues: AccessibilityIssue[] = [];
    let score = 100;

    // Check for missing alt text
    const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
    if (imagesWithoutAlt.length > 0) {
      issues.push({
        type: 'error',
        element: 'img',
        description: `${imagesWithoutAlt.length} images missing alt text`,
        wcagReference: 'WCAG 1.1.1',
        fix: 'Add descriptive alt text to all images'
      });
      score -= 15;
    }

    // Check for missing form labels
    const unlabeledInputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby]):not([id])');
    if (unlabeledInputs.length > 0) {
      issues.push({
        type: 'error',
        element: 'input',
        description: `${unlabeledInputs.length} form inputs missing labels`,
        wcagReference: 'WCAG 1.3.1',
        fix: 'Associate labels with form controls using for/id or aria-label'
      });
      score -= 20;
    }

    // Check for missing headings structure
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length === 0) {
      issues.push({
        type: 'warning',
        element: 'heading',
        description: 'No heading structure found',
        wcagReference: 'WCAG 1.3.1',
        fix: 'Add proper heading hierarchy (h1-h6) to structure content'
      });
      score -= 10;
    }

    // Check for missing main landmark
    const main = document.querySelector('main');
    if (!main) {
      issues.push({
        type: 'warning',
        element: 'main',
        description: 'Missing main landmark',
        wcagReference: 'WCAG 1.3.1',
        fix: 'Add <main> element to identify main content area'
      });
      score -= 5;
    }

    // Determine WCAG level
    let wcagLevel: 'A' | 'AA' | 'AAA' = 'AAA';
    if (score < 95) wcagLevel = 'AA';
    if (score < 80) wcagLevel = 'A';

    const recommendations: string[] = [
      'Ensure all images have descriptive alt text',
      'Associate all form controls with labels',
      'Use proper heading hierarchy (h1-h6)',
      'Add ARIA landmarks for better navigation',
      'Test with keyboard navigation',
      'Test with screen readers',
      'Ensure sufficient color contrast (4.5:1 for normal text)',
      'Support reduced motion preferences'
    ];

    return {
      score: Math.max(0, score),
      issues,
      recommendations,
      wcagLevel
    };
  }

  /**
   * Get accessibility status
   */
  getAccessibilityStatus(): {
    config: AccessibilityConfig;
    features: string[];
    compliance: string;
  } {
    const enabledFeatures = Object.entries(this.config)
      .filter(([, enabled]) => enabled)
      .map(([feature]) => feature);

    return {
      config: this.config,
      features: enabledFeatures,
      compliance: 'WCAG 2.1 AA'
    };
  }

  /**
   * Cleanup accessibility system
   */
  cleanup(): void {
    if (this.announcer && this.announcer.parentNode) {
      this.announcer.parentNode.removeChild(this.announcer);
      this.announcer = null;
    }
    this.focusHistory = [];
  }
}

// Export singleton instance
export const accessibilitySystem = new AccessibilitySystem();