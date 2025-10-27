// Reading Experience Enhancements
// Progress tracking, print mode, and accessibility features

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReadingEnhancementsProps {
  readingProgress: number;
  estimatedReadTime: number;
  onPrintMode?: () => void;
  onFontSizeChange?: (size: 'small' | 'medium' | 'large') => void;
  className?: string;
}

export const ReadingEnhancements: React.FC<ReadingEnhancementsProps> = ({
  readingProgress,
  estimatedReadTime,
  onPrintMode,
  onFontSizeChange,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [showControls, setShowControls] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(estimatedReadTime);

  // Show/hide floating controls based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate remaining reading time
  useEffect(() => {
    const remaining = Math.max(0, estimatedReadTime - (estimatedReadTime * readingProgress / 100));
    setTimeRemaining(Math.ceil(remaining));
  }, [readingProgress, estimatedReadTime]);

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    setFontSize(size);
    if (onFontSizeChange) {
      onFontSizeChange(size);
    }
    
    // Apply font size to article content
    const articleContent = document.querySelector('.prose');
    if (articleContent) {
      articleContent.classList.remove('text-sm', 'text-base', 'text-lg');
      switch (size) {
        case 'small':
          articleContent.classList.add('text-sm');
          break;
        case 'large':
          articleContent.classList.add('text-lg');
          break;
        default:
          articleContent.classList.add('text-base');
      }
    }
  };

  const handlePrint = () => {
    if (onPrintMode) {
      onPrintMode();
    }
    window.print();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shareArticle = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      {/* Reading Progress Bar - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 to-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Floating Reading Controls */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-40 ${className}`}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 space-y-4 max-w-xs">
              
              {/* Reading Progress Circle */}
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="#E5E7EB"
                      strokeWidth="4"
                      fill="none"
                    />
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 175.93" }}
                      animate={{ strokeDasharray: `${(readingProgress / 100) * 175.93} 175.93` }}
                      transition={{ duration: 0.3 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#2563EB" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-900">
                      {Math.round(readingProgress)}%
                    </span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-600">
                  {timeRemaining > 0 ? `${timeRemaining} min left` : 'Complete!'}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="space-y-2">
                
                {/* Font Size Controls */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Font Size</span>
                  <div className="flex space-x-1">
                    {(['small', 'medium', 'large'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => handleFontSizeChange(size)}
                        className={`
                          w-6 h-6 rounded-full text-xs font-bold transition-colors duration-200
                          ${fontSize === size 
                            ? 'bg-amber-500 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }
                        `}
                      >
                        {size === 'small' ? 'S' : size === 'medium' ? 'M' : 'L'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handlePrint}
                    className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                    title="Print Article"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={shareArticle}
                    className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                    title="Share Article"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                </div>

                <button
                  onClick={scrollToTop}
                  className="w-full flex items-center justify-center p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors duration-200"
                  title="Back to Top"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span className="text-xs">Top</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          .print-only {
            display: block !important;
          }
          
          body {
            font-size: 12pt;
            line-height: 1.5;
            color: black;
            background: white;
          }
          
          .prose {
            max-width: none;
            font-size: 12pt;
          }
          
          .prose h1 {
            font-size: 18pt;
            margin-bottom: 12pt;
          }
          
          .prose h2 {
            font-size: 16pt;
            margin-bottom: 10pt;
          }
          
          .prose h3 {
            font-size: 14pt;
            margin-bottom: 8pt;
          }
          
          .prose p {
            margin-bottom: 8pt;
          }
          
          .prose img {
            max-width: 100%;
            height: auto;
            page-break-inside: avoid;
          }
          
          .prose blockquote {
            border-left: 3px solid #ccc;
            padding-left: 12pt;
            margin: 12pt 0;
            font-style: italic;
          }
          
          .prose ul, .prose ol {
            margin: 8pt 0;
            padding-left: 20pt;
          }
          
          .prose li {
            margin-bottom: 4pt;
          }
          
          .prose table {
            border-collapse: collapse;
            width: 100%;
            margin: 12pt 0;
          }
          
          .prose th, .prose td {
            border: 1px solid #ccc;
            padding: 6pt;
            text-align: left;
          }
          
          .prose th {
            background-color: #f5f5f5;
            font-weight: bold;
          }
          
          /* Page breaks */
          .prose h1, .prose h2 {
            page-break-after: avoid;
          }
          
          .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
            page-break-inside: avoid;
          }
          
          .prose img, .prose figure, .prose table {
            page-break-inside: avoid;
          }
          
          /* Print header */
          @page {
            margin: 1in;
            @top-center {
              content: "Egyptian Pillow Manufacturing - " attr(title);
              font-size: 10pt;
              color: #666;
            }
            @bottom-center {
              content: "Page " counter(page) " of " counter(pages);
              font-size: 10pt;
              color: #666;
            }
          }
        }
      `}</style>
    </>
  );
};

export default ReadingEnhancements;