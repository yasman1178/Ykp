/**
 * Google Analytics Component
 * Loads Google Analytics 4 script with enhanced measurement configuration
 */

import Script from 'next/script';

interface GoogleAnalyticsProps {
    measurementId: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId }) => {
    return (
        <>
            {/* Google Analytics 4 Script */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics-config" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // Enhanced GA4 configuration
          gtag('config', '${measurementId}', {
            // Basic settings
            send_page_view: false,
            anonymize_ip: true,
            cookie_flags: 'SameSite=Lax;Secure',
            
            // Enhanced measurement
            allow_google_signals: true,
            allow_ad_personalization_signals: false,
            
            // Custom dimensions mapping
            custom_map: {
              'dimension1': 'egyptian_theme',
              'dimension2': 'user_language',
              'dimension3': 'pharaonic_symbol',
              'dimension4': 'product_category',
              'dimension5': 'lead_type',
              'dimension6': 'cultural_element',
              'dimension7': 'collection',
              'dimension8': 'device_category',
              'dimension9': 'user_type',
              'dimension10': 'lead_quality'
            }
          });
          
          // Enhanced e-commerce
          gtag('set', 'allow_enhanced_conversions', true);
        `}
            </Script>
        </>
    );
};

export default GoogleAnalytics;