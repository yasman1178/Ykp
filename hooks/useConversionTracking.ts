/**
 * Conversion Tracking Hook
 * Easy-to-use hook for tracking conversions in components
 */

import { useCallback } from 'react';
import { useRouter } from 'next/router';
import ConversionTrackingManager, {
  ContactFormSubmission,
  WholesaleInquiry,
  CatalogDownload,
  MicroConversion,
} from '../lib/conversion-tracking';
import { useCookieConsent } from './useCookieConsent';

interface UseConversionTrackingReturn {
  // Form submissions
  trackContactForm: (data: Omit<ContactFormSubmission, 'source_page' | 'referrer'>) => void;
  trackWholesaleInquiry: (data: Omit<WholesaleInquiry, 'source_page' | 'referrer'>) => void;
  
  // Downloads
  trackCatalogDownload: (catalogType: 'full' | 'product_line' | 'collection', downloadSource: string, userEmail?: string) => void;
  
  // Micro-conversions
  trackPhoneClick: (phoneNumber: string) => void;
  trackEmailClick: (email: string) => void;
  
  // Conversion rates
  getConversionRateBySource: (source: string) => number;
  getAllConversionRates: () => Map<string, number>;
}

export const useConversionTracking = (): UseConversionTrackingReturn => {
  const router = useRouter();
  const { preferences } = useCookieConsent();

  // Track contact form submission
  const trackContactForm = useCallback((
    data: Omit<ContactFormSubmission, 'source_page' | 'referrer'>
  ) => {
    if (!preferences.analytics) return;

    const submissionData: ContactFormSubmission = {
      ...data,
      source_page: router.asPath,
      referrer: document.referrer,
      utm_source: router.query.utm_source as string,
      utm_medium: router.query.utm_medium as string,
      utm_campaign: router.query.utm_campaign as string,
    };

    ConversionTrackingManager.trackContactFormSubmission(submissionData);
  }, [preferences.analytics, router]);

  // Track wholesale inquiry
  const trackWholesaleInquiry = useCallback((
    data: Omit<WholesaleInquiry, 'source_page' | 'referrer'>
  ) => {
    if (!preferences.analytics) return;

    const inquiryData: WholesaleInquiry = {
      ...data,
      source_page: router.asPath,
      referrer: document.referrer,
      utm_source: router.query.utm_source as string,
      utm_medium: router.query.utm_medium as string,
      utm_campaign: router.query.utm_campaign as string,
    };

    ConversionTrackingManager.trackWholesaleInquiry(inquiryData);
  }, [preferences.analytics, router]);

  // Track catalog download
  const trackCatalogDownload = useCallback((
    catalogType: 'full' | 'product_line' | 'collection',
    downloadSource: string,
    userEmail?: string
  ) => {
    if (!preferences.analytics) return;

    const downloadData: CatalogDownload = {
      catalog_type: catalogType,
      download_source: downloadSource,
      user_email: userEmail,
      source_page: router.asPath,
    };

    ConversionTrackingManager.trackCatalogDownload(downloadData);
  }, [preferences.analytics, router.asPath]);

  // Track phone click
  const trackPhoneClick = useCallback((phoneNumber: string) => {
    if (!preferences.analytics) return;

    const microConversion: MicroConversion = {
      type: 'phone_click',
      source_page: router.asPath,
      target: phoneNumber,
    };

    ConversionTrackingManager.trackMicroConversion(microConversion);
  }, [preferences.analytics, router.asPath]);

  // Track email click
  const trackEmailClick = useCallback((email: string) => {
    if (!preferences.analytics) return;

    const microConversion: MicroConversion = {
      type: 'email_click',
      source_page: router.asPath,
      target: email,
    };

    ConversionTrackingManager.trackMicroConversion(microConversion);
  }, [preferences.analytics, router.asPath]);

  // Get conversion rate by source
  const getConversionRateBySource = useCallback((source: string) => {
    return ConversionTrackingManager.getConversionRateBySource(source);
  }, []);

  // Get all conversion rates
  const getAllConversionRates = useCallback(() => {
    return ConversionTrackingManager.getAllConversionRates();
  }, []);

  return {
    trackContactForm,
    trackWholesaleInquiry,
    trackCatalogDownload,
    trackPhoneClick,
    trackEmailClick,
    getConversionRateBySource,
    getAllConversionRates,
  };
};

export default useConversionTracking;
