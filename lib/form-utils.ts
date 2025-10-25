import { UseFormReturn } from 'react-hook-form';

// Form submission utilities
export const handleFormSubmission = async <T>(
  data: T,
  endpoint: string,
  onSuccess?: (response: any) => void,
  onError?: (error: any) => void
) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    onSuccess?.(result);
    return result;
  } catch (error) {
    console.error('Form submission error:', error);
    onError?.(error);
    throw error;
  }
};

// Form field error styling
export const getFieldErrorClass = (
  form: UseFormReturn<any>,
  fieldName: string,
  baseClass: string = 'egyptian-input'
): string => {
  const hasError = form.formState.errors[fieldName];
  return hasError 
    ? `${baseClass} border-red-500 focus:border-red-500` 
    : baseClass;
};

// Egyptian-themed form validation messages
export const EGYPTIAN_ERROR_MESSAGES = {
  required: 'This field is required like the sacred scrolls of ancient Egypt',
  email: 'Please provide a valid email address worthy of Pharaonic correspondence',
  minLength: (min: number) => `This field must contain at least ${min} characters, as detailed as hieroglyphic inscriptions`,
  maxLength: (max: number) => `This field must not exceed ${max} characters, keeping it as concise as ancient wisdom`,
  phone: 'Please provide a valid phone number for royal communication',
  url: 'Please provide a valid website URL, as precise as pyramid measurements',
  number: 'Please enter a valid number, as accurate as Egyptian mathematics',
};

// Form success messages
export const FORM_SUCCESS_MESSAGES = {
  wholesale: 'Your wholesale inquiry has been received! Our team will contact you within 24 hours to discuss partnership opportunities.',
  partnership: 'Thank you for your partnership interest! We will review your application and respond within 48 hours.',
  contact: 'Your message has been sent successfully! We appreciate your interest in our Pharaonic pillows.',
  newsletter: 'Welcome to our newsletter! You will receive updates about our latest Egyptian-inspired products.',
};

// Form loading states
export const FORM_LOADING_MESSAGES = {
  submitting: 'Sending your message across the digital Nile...',
  processing: 'Processing your request with Pharaonic precision...',
  validating: 'Validating information like ancient scribes...',
};

// Utility function to format form data for email
export const formatFormDataForEmail = (data: any, formType: string): string => {
  const formatters: Record<string, (data: any) => string> = {
    wholesale: (data) => `
      Wholesale Inquiry Details:
      
      Company Information:
      - Company Name: ${data.companyName}
      - Contact Person: ${data.contactPerson}
      - Email: ${data.email}
      - Phone: ${data.phone}
      - Country: ${data.country}
      
      Business Details:
      - Business Type: ${data.businessType}
      - Target Markets: ${data.targetMarkets.join(', ')}
      - Estimated Quantity: ${data.estimatedQuantity}
      - Products of Interest: ${data.productsOfInterest.join(', ')}
      
      Message:
      ${data.message}
    `,
    
    partnership: (data) => `
      Partnership Inquiry Details:
      
      Company Profile:
      - Name: ${data.companyProfile.name}
      - Website: ${data.companyProfile.website || 'Not provided'}
      - Year Established: ${data.companyProfile.yearEstablished}
      - Employee Count: ${data.companyProfile.employeeCount}
      - Annual Revenue: ${data.companyProfile.annualRevenue || 'Not disclosed'}
      
      Distribution Capabilities:
      - Regions: ${data.distributionCapabilities.regions.join(', ')}
      - Channels: ${data.distributionCapabilities.distributionChannels.join(', ')}
      - Warehouse Capacity: ${data.distributionCapabilities.warehouseCapacity}
      - Logistics Partners: ${data.distributionCapabilities.logisticsPartners || 'Not specified'}
      
      Market Experience:
      ${data.marketExperience}
      
      Proposed Collaboration:
      ${data.proposedCollaboration}
      
      Contact Information:
      - Primary Contact: ${data.contactInfo.primaryContact}
      - Email: ${data.contactInfo.email}
      - Phone: ${data.contactInfo.phone}
      - Address: ${data.contactInfo.address}
    `,
    
    contact: (data) => `
      Contact Form Submission:
      
      - Name: ${data.name}
      - Email: ${data.email}
      - Subject: ${data.subject}
      - Inquiry Type: ${data.inquiryType}
      
      Message:
      ${data.message}
    `
  };

  return formatters[formType]?.(data) || JSON.stringify(data, null, 2);
};