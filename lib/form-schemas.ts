import { z } from 'zod';

// Wholesale Inquiry Form Schema
export const wholesaleInquirySchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  contactPerson: z.string().min(2, 'Contact person name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  country: z.string().min(2, 'Country is required'),
  businessType: z.enum(['distributor', 'retailer', 'manufacturer'], {
    message: 'Please select a business type'
  }),
  targetMarkets: z.array(z.string()).min(1, 'Please select at least one target market'),
  estimatedQuantity: z.number().min(1, 'Estimated quantity must be at least 1'),
  productsOfInterest: z.array(z.string()).min(1, 'Please select at least one product'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Partnership Inquiry Form Schema
export const partnershipInquirySchema = z.object({
  companyProfile: z.object({
    name: z.string().min(2, 'Company name is required'),
    website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
    yearEstablished: z.number().min(1900, 'Please enter a valid year'),
    employeeCount: z.string().min(1, 'Employee count is required'),
    annualRevenue: z.string().optional(),
  }),
  distributionCapabilities: z.object({
    regions: z.array(z.string()).min(1, 'Please select at least one region'),
    distributionChannels: z.array(z.string()).min(1, 'Please select distribution channels'),
    warehouseCapacity: z.string().min(1, 'Warehouse capacity information is required'),
    logisticsPartners: z.string().optional(),
  }),
  marketExperience: z.string().min(50, 'Please provide detailed market experience (minimum 50 characters)'),
  proposedCollaboration: z.string().min(50, 'Please describe your proposed collaboration (minimum 50 characters)'),
  contactInfo: z.object({
    primaryContact: z.string().min(2, 'Primary contact name is required'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    address: z.string().min(10, 'Complete address is required'),
  }),
});

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  inquiryType: z.enum(['general', 'wholesale', 'partnership', 'support'], {
    message: 'Please select an inquiry type'
  }),
});

// Newsletter Subscription Schema
export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  preferences: z.object({
    productUpdates: z.boolean().default(true),
    blogArticles: z.boolean().default(true),
    promotions: z.boolean().default(false),
  }),
});

// Export types for TypeScript
export type WholesaleInquiryForm = z.infer<typeof wholesaleInquirySchema>;
export type PartnershipInquiryForm = z.infer<typeof partnershipInquirySchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;
export type NewsletterForm = z.infer<typeof newsletterSchema>;

// Form field configurations
export const BUSINESS_TYPES = [
  { value: 'distributor', label: 'Distributor' },
  { value: 'retailer', label: 'Retailer' },
  { value: 'manufacturer', label: 'Manufacturer' },
] as const;

export const TARGET_MARKETS = [
  'North America',
  'Europe',
  'Middle East',
  'Asia Pacific',
  'Africa',
  'South America',
  'Australia & Oceania',
];

export const PRODUCT_CATEGORIES = [
  { value: 'b123', label: 'Premium Collection (B123)' },
  { value: 't', label: 'Classic Collection (T)' },
  { value: 'tb', label: 'Heritage Collection (TB)' },
];

export const DISTRIBUTION_CHANNELS = [
  'Retail Stores',
  'Online Marketplaces',
  'Direct to Consumer',
  'B2B Sales',
  'Travel Agencies',
  'Hotels & Hospitality',
  'Airport Shops',
];

export const INQUIRY_TYPES = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'wholesale', label: 'Wholesale Information' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'support', label: 'Customer Support' },
] as const;