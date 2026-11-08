// Advanced CTA Components for Manufacturing Blog
// A/B testing ready CTAs with conversion optimization and Egyptian theming

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogArticleEnhanced } from '@/types/blog-enhanced';
import { Product, RecommendationResult } from '@/lib/product-recommendation-engine-simple';
import { ProductRecommendation } from '@/types/blog-enhanced';

interface CTAComponentProps {
  article: BlogArticleEnhanced;
  recommendations?: RecommendationResult[];
  variant?: 'primary' | 'secondary' | 'inline' | 'floating' | 'sidebar';
  onCTAClick?: (ctaType: string, productId?: string) => void;
  className?: string;
}

interface CTAVariant {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonColor: string;
  icon: React.ReactNode;
  urgency?: string;
}

// CTA variants for A/B testing
const CTA_VARIANTS: { [key: string]: CTAVariant[] } = {
  wholesale: [
    {
      id: 'wholesale-direct',
      title: 'Get Wholesale Pricing Now',
      description: 'Access exclusive manufacturer pricing for bulk orders. Minimum 100 units.',
      buttonText: 'Request Quote',
      buttonColor: 'bg-amber-500 hover:bg-amber-600',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      urgency: 'Limited time: 15% off first order'
    },
    {
      id: 'wholesale-catalog',
      title: 'Download Wholesale Catalog',
      description: 'Complete product catalog with pricing, specifications, and minimum orders.',
      buttonText: 'Get Catalog',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ],
  manufacturing: [
    {
      id: 'factory-tour',
      title: 'Schedule Factory Tour',
      description: 'Visit our ISO-certified manufacturing facility in Egypt. See quality firsthand.',
      buttonText: 'Book Tour',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 'custom-manufacturing',
      title: 'Custom Manufacturing Solutions',
      description: 'Tailored production for your specific requirements. OEM/ODM services available.',
      buttonText: 'Discuss Project',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ],
  contact: [
    {
      id: 'expert-consultation',
      title: 'Speak with Manufacturing Expert',
      description: 'Get personalized advice on materials, production, and market opportunities.',
      buttonText: 'Schedule Call',
      buttonColor: 'bg-indigo-600 hover:bg-indigo-700',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    }
  ]
};

export const PrimaryCTA: React.FC<CTAComponentProps> = ({
  article,
  recommendations = [],
  onCTAClick,
  className = ''
}) => {
  const [selectedVariant, setSelectedVariant] = useState<CTAVariant>(CTA_VARIANTS.wholesale[0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // A/B testing logic - randomly select variant
    const variants = CTA_VARIANTS.wholesale;
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    setSelectedVariant(randomVariant);
    
    // Animate in after component mount
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  const handleCTAClick = () => {
    if (onCTAClick) {
      onCTAClick(selectedVariant.id);
    }
    
    // Track conversion
    console.log('CTA clicked:', selectedVariant.id, 'Article:', article.slug);
  };

  const getCulturalIcon = (iconCode: string) => {
    const iconMap: { [key: string]: string } = {
      'anubis-jackal-head': '𓃥',
      'wadjet-eye-symbol': '𓂀',
      'ankh-symbol': '☥',
      'scarab-beetle': '𓆣',
      'pyramid-symbol': '𓉴',
      'nefertiti-crown': '𓈖'
    };
    return iconMap[iconCode] || '𓊖';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
      transition={{ duration: 0.8 }}
      className={`bg-gradient-to-br from-amber-50 via-blue-50 to-amber-100 rounded-2xl p-8 border border-amber-200 ${className}`}
    >
      {/* Egyptian Pattern Background */}
      <div className="absolute inset-0 opacity-5 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-repeat" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.3'%3E%3Cpath d='M20 20l10-10v20l-10-10zm-10 0l10 10v-20l-10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '40px 40px'
             }} 
        />
      </div>

      <div className="relative">
        {/* Cultural Symbol Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="text-4xl text-amber-600 mr-4">
            {getCulturalIcon(article.culturalElement.iconCode)}
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {selectedVariant.title}
            </h3>
            <p className="text-sm text-gray-600">
              Authentic {article.culturalElement.englishName} Manufacturing
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-center mb-6 leading-relaxed">
          {selectedVariant.description}
        </p>

        {/* Manufacturing Highlights */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-xl font-bold text-amber-600">
              {article.manufacturingFocus.materials.length}+
            </div>
            <div className="text-xs text-gray-600">Premium Materials</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">ISO</div>
            <div className="text-xs text-gray-600">Certified Quality</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">25+</div>
            <div className="text-xs text-gray-600">Export Countries</div>
          </div>
        </div>

        {/* Urgency Message */}
        {selectedVariant.urgency && (
          <div className="bg-red-100 border border-red-200 rounded-lg p-3 mb-6 text-center">
            <p className="text-red-800 text-sm font-medium">
              ⚡ {selectedVariant.urgency}
            </p>
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center">
          <motion.button
            onClick={handleCTAClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center px-8 py-4 ${selectedVariant.buttonColor} text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 space-x-2`}
          >
            {selectedVariant.icon}
            <span>{selectedVariant.buttonText}</span>
          </motion.button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 flex items-center justify-center space-x-6 text-xs text-gray-500">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free Consultation
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure & Confidential
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Quality Guaranteed
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const InlineCTA: React.FC<CTAComponentProps> = ({
  article,
  recommendations = [],
  onCTAClick,
  className = ''
}) => {
  const handleCTAClick = (ctaType: string) => {
    if (onCTAClick) {
      onCTAClick(ctaType);
    }
  };

  return (
    <div className={`bg-gradient-to-r from-amber-500 to-blue-600 rounded-lg p-6 my-8 ${className}`}>
      <div className="flex flex-col md:flex-row items-center justify-between text-white">
        <div className="mb-4 md:mb-0 md:mr-6">
          <h4 className="text-lg font-bold mb-2">
            Interested in {article.culturalElement.englishName} Pillow Manufacturing?
          </h4>
          <p className="text-sm opacity-90">
            Get wholesale pricing and custom manufacturing options for authentic Egyptian designs.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleCTAClick('inline-wholesale')}
            className="px-6 py-2 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Get Pricing
          </button>
          <button
            onClick={() => handleCTAClick('inline-contact')}
            className="px-6 py-2 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
          >
            Contact Expert
          </button>
        </div>
      </div>
    </div>
  );
};

export const SidebarCTA: React.FC<CTAComponentProps> = ({
  article,
  recommendations = [],
  onCTAClick,
  className = ''
}) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsSticky(scrolled > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = (ctaType: string) => {
    if (onCTAClick) {
      onCTAClick(ctaType);
    }
  };

  return (
    <div className={`${isSticky ? 'sticky top-24' : ''} ${className}`}>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="text-center mb-4">
          <div className="text-3xl mb-2">
            {article.culturalElement.iconCode === 'anubis-jackal-head' && '𓃥'}
            {article.culturalElement.iconCode === 'wadjet-eye-symbol' && '𓂀'}
            {article.culturalElement.iconCode === 'ankh-symbol' && '☥'}
          </div>
          <h4 className="font-bold text-gray-900 mb-2">
            {article.culturalElement.englishName} Manufacturing
          </h4>
          <p className="text-sm text-gray-600">
            Premium quality, authentic designs
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handleCTAClick('sidebar-wholesale')}
            className="w-full px-4 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors duration-300"
          >
            Get Wholesale Quote
          </button>
          
          <button
            onClick={() => handleCTAClick('sidebar-catalog')}
            className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Download Catalog
          </button>
          
          <button
            onClick={() => handleCTAClick('sidebar-contact')}
            className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300"
          >
            Contact Expert
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center space-y-1">
            <div>✓ ISO 9001 Certified</div>
            <div>✓ Export Ready</div>
            <div>✓ Custom Manufacturing</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FloatingCTA: React.FC<CTAComponentProps> = ({
  article,
  onCTAClick,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = (ctaType: string) => {
    if (onCTAClick) {
      onCTAClick(ctaType);
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className={`fixed bottom-6 right-6 z-50 ${className}`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {isExpanded ? (
          <div className="p-6 w-80">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-900">
                {article.culturalElement.englishName} Manufacturing
              </h4>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Get wholesale pricing for authentic Egyptian pillow designs.
            </p>
            
            <div className="space-y-2">
              <button
                onClick={() => handleCTAClick('floating-wholesale')}
                className="w-full px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors duration-300 text-sm"
              >
                Get Quote
              </button>
              <button
                onClick={() => handleCTAClick('floating-contact')}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300 text-sm"
              >
                Contact Us
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center px-6 py-4 bg-gradient-to-r from-amber-500 to-blue-600 text-white font-semibold hover:shadow-lg transition-all duration-300"
          >
            <span className="text-2xl mr-3">
              {article.culturalElement.iconCode === 'anubis-jackal-head' && '𓃥'}
              {article.culturalElement.iconCode === 'wadjet-eye-symbol' && '𓂀'}
              {article.culturalElement.iconCode === 'ankh-symbol' && '☥'}
            </span>
            <span>Get Quote</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

const CTAComponents = {
  PrimaryCTA,
  InlineCTA,
  SidebarCTA,
  FloatingCTA
};

export default CTAComponents;