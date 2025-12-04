/**
 * API Endpoint: Submit Sitemap to Google Search Console
 * 
 * POST /api/search-console/submit-sitemap
 * 
 * This endpoint handles automated sitemap submission to Google Search Console.
 * It can be called manually or via a cron job for regular submissions.
 * 
 * Requirements: 2.2, 5.1, 5.2
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSearchConsoleService } from '@/lib/search-console-integration';

interface SubmitSitemapRequest {
  sitemapUrl?: string;
  siteUrl?: string;
}

interface SubmitSitemapResponse {
  success: boolean;
  message: string;
  sitemapUrl?: string;
  sitemapStatus?: any;
  error?: string;
  timestamp?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubmitSitemapResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use POST.',
    });
  }

  try {
    // Get sitemap URL from request body or use default
    const { sitemapUrl, siteUrl }: SubmitSitemapRequest = req.body;
    
    const defaultSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ykp-supplies.vercel.app';
    const finalSitemapUrl = sitemapUrl || `${defaultSiteUrl}/sitemap.xml`;
    
    // Validate sitemap URL format
    if (!finalSitemapUrl.startsWith('http')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid sitemap URL. Must start with http:// or https://',
        error: 'Invalid URL format',
      });
    }

    // Check if Search Console credentials are configured
    if (!process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL || 
        !process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY) {
      return res.status(500).json({
        success: false,
        message: 'Google Search Console credentials not configured',
        error: 'Missing GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL or GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY environment variables',
      });
    }

    // Initialize Search Console service
    const searchConsole = getSearchConsoleService(siteUrl || defaultSiteUrl);

    // Authenticate with Google Search Console
    await searchConsole.authenticate();

    // Submit sitemap
    const submissionResult = await searchConsole.submitSitemap(finalSitemapUrl);

    if (!submissionResult.success) {
      return res.status(500).json({
        success: false,
        message: submissionResult.message,
        error: submissionResult.error,
        sitemapUrl: finalSitemapUrl,
      });
    }

    // Get sitemap status after submission
    const sitemapStatus = await searchConsole.getSitemapStatus(finalSitemapUrl);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Sitemap submitted successfully to Google Search Console',
      sitemapUrl: finalSitemapUrl,
      sitemapStatus: sitemapStatus || undefined,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Sitemap submission error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to submit sitemap to Google Search Console',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
}
