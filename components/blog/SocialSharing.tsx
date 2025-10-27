// Social Sharing and Engagement Features
// Manufacturing-focused sharing with business networking platforms

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogArticleEnhanced } from '@/types/blog-enhanced';

interface SocialSharingProps {
  article: BlogArticleEnhanced;
  currentUrl: string;
  onShare?: (platform: string) => void;
  className?: string;
}

interface SharePlatform {
  name: string;
  icon: React.ReactNode;
  color: string;
  shareUrl: (url: string, title: string, description: string) => string;
  businessFocused?: boolean;
}

export const SocialSharing: React.FC<SocialSharingProps> = ({
  article,
  currentUrl,
  onShare,
  className = ''
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareCount, setShareCount] = useState(article.shareCount);
  const [copied, setCopied] = useState(false);

  const sharePlatforms: SharePlatform[] = [
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: 'bg-blue-600 hover:bg-blue-700',
      shareUrl: (url, title, description) => 
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`,
      businessFocused: true
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      color: 'bg-sky-500 hover:bg-sky-600',
      shareUrl: (url, title) => 
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&hashtags=EgyptianManufacturing,PillowManufacturer,Wholesale`
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: 'bg-blue-700 hover:bg-blue-800',
      shareUrl: (url) => 
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      color: 'bg-green-600 hover:bg-green-700',
      shareUrl: (url, title) => 
        `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`
    },
    {
      name: 'Telegram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      color: 'bg-blue-500 hover:bg-blue-600',
      shareUrl: (url, title) => 
        `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    }
  ];

  const handleShare = async (platform: SharePlatform) => {
    const shareUrl = platform.shareUrl(currentUrl, article.title, article.description);
    
    // Track share event
    if (onShare) {
      onShare(platform.name);
    }
    
    // Increment share count
    setShareCount(prev => prev + 1);
    
    // Open share window
    if (platform.name === 'WhatsApp' || platform.name === 'Telegram') {
      window.open(shareUrl, '_blank');
    } else {
      window.open(
        shareUrl,
        'share-dialog',
        'width=600,height=400,scrollbars=yes,resizable=yes'
      );
    }
    
    setShowShareMenu(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      if (onShare) {
        onShare('clipboard');
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const generateBusinessShareText = () => {
    return `Discover insights on ${article.culturalElement.englishName} in Egyptian pillow manufacturing. Learn about authentic cultural designs, premium materials, and wholesale opportunities. #EgyptianManufacturing #PillowManufacturer #Wholesale`;
  };

  return (
    <div className={`${className}`}>
      
      {/* Main Share Button */}
      <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center space-x-4">
          <div className="text-2xl">
            {article.culturalElement.iconCode === 'anubis-jackal-head' && '𓃥'}
            {article.culturalElement.iconCode === 'wadjet-eye-symbol' && '𓂀'}
            {article.culturalElement.iconCode === 'ankh-symbol' && '☥'}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Share This Manufacturing Insight</h3>
            <p className="text-sm text-gray-600">
              Help others discover authentic Egyptian pillow manufacturing
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">{shareCount}</div>
            <div className="text-xs text-gray-500">shares</div>
          </div>
          
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Share Menu */}
      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
          >
            <h4 className="font-semibold text-gray-900 mb-4">Choose Platform</h4>
            
            {/* Business-Focused Platforms */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
                Business Networks
              </h5>
              <div className="grid grid-cols-1 gap-3">
                {sharePlatforms.filter(platform => platform.businessFocused).map((platform) => (
                  <motion.button
                    key={platform.name}
                    onClick={() => handleShare(platform)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between p-4 ${platform.color} text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg`}
                  >
                    <div className="flex items-center space-x-3">
                      {platform.icon}
                      <span className="font-medium">Share on {platform.name}</span>
                    </div>
                    <div className="text-xs opacity-75">
                      Perfect for B2B networking
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Social Platforms */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                </svg>
                Social Media
              </h5>
              <div className="grid grid-cols-2 gap-3">
                {sharePlatforms.filter(platform => !platform.businessFocused).map((platform) => (
                  <motion.button
                    key={platform.name}
                    onClick={() => handleShare(platform)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-center p-3 ${platform.color} text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg space-x-2`}
                  >
                    {platform.icon}
                    <span className="font-medium text-sm">{platform.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Copy Link */}
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={copyToClipboard}
                className={`w-full flex items-center justify-center p-3 rounded-lg transition-all duration-300 space-x-2 ${
                  copied 
                    ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-2 border-gray-200'
                }`}
              >
                {copied ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">Copy Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Manufacturing Context */}
            <div className="mt-4 p-4 bg-gradient-to-br from-amber-50 to-blue-50 rounded-lg border border-amber-100">
              <h5 className="font-medium text-gray-900 mb-2">Business Sharing Tip</h5>
              <p className="text-sm text-gray-600 leading-relaxed">
                When sharing on business platforms, highlight the manufacturing insights, 
                wholesale opportunities, and cultural authenticity aspects to attract potential B2B partners.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Newsletter Signup CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white text-center"
      >
        <h3 className="text-xl font-bold mb-2">
          Get More Manufacturing Insights
        </h3>
        <p className="text-gray-300 mb-6">
          Subscribe to our newsletter for the latest articles on Egyptian cultural heritage, 
          manufacturing processes, and wholesale opportunities.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your business email"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors duration-300">
            Subscribe
          </button>
        </div>
        
        <p className="text-xs text-gray-400 mt-4">
          Join 500+ manufacturers and wholesalers. No spam, unsubscribe anytime.
        </p>
      </motion.div>
    </div>
  );
};

export default SocialSharing;