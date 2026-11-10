/**
 * Email configuration utility
 * Validates and provides email configuration for the application
 */

export interface EmailConfig {
  gmailUser: string;
  gmailAppPassword: string;
  contactEmail: string;
}

/**
 * Get email configuration from environment variables
 * @returns Email configuration object
 * @throws Error if required environment variables are missing
 */
export function getEmailConfig(): EmailConfig {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const contactEmail = process.env.CONTACT_EMAIL || 'sales@ykp-eg.com';

  if (!gmailUser) {
    throw new Error('GMAIL_USER environment variable is not set. Please check your .env.local file.');
  }

  if (!gmailAppPassword) {
    throw new Error('GMAIL_APP_PASSWORD environment variable is not set. Please check your .env.local file.');
  }

  // Basic validation of email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(gmailUser)) {
    throw new Error('GMAIL_USER is not a valid email address format.');
  }

  return {
    gmailUser,
    gmailAppPassword,
    contactEmail
  };
}

/**
 * Validate email configuration
 * @returns true if configuration is valid, false otherwise
 */
export function isEmailConfigValid(): boolean {
  try {
    getEmailConfig();
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
}