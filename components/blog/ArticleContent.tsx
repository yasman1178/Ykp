// Enhanced Article Content Renderer with SEO Optimization
// Manufacturing-focused content with cultural sensitivity and internal linking

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BlogArticleEnhanced } from '@/types/blog-enhanced';
import { bilingualManager } from '@/lib/bilingual-support';
import { manufacturingSEO } from '@/lib/seo-manufacturing';

interface ArticleContentProps {
  article: BlogArticleEnhanced;
  onReadingProgress?: (progress: number) => void;
  className?: string;
}

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({
  article,
  onReadingProgress,
  className = ''
}) => {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  // Extract table of contents from content
  useEffect(() => {
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const toc: TableOfContentsItem[] = [];
      
      headings.forEach((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        
        toc.push({
          id,
          title: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1))
        });
      });
      
      setTableOfContents(toc);
    }
  }, [article.content]);

  // Track reading progress and active section
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const contentElement = contentRef.current;
      const contentRect = contentElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate reading progress
      const contentHeight = contentElement.offsetHeight;
      const scrolled = Math.max(0, -contentRect.top);
      const progress = Math.min(100, (scrolled / (contentHeight - windowHeight)) * 100);
      
      if (onReadingProgress) {
        onReadingProgress(progress);
      }

      // Find active section
      const headings = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let currentActive = '';
      
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 0) {
          currentActive = heading.id;
        }
      });
      
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onReadingProgress]);

  // Process content with SEO enhancements
  const processContent = (content: string): string => {
    let processedContent = content;
    
    // Add cultural context
    processedContent = bilingualManager.addManufacturingContext(
      processedContent, 
      article.culturalElement.englishName
    );
    
    // Sanitize for cultural sensitivity
    processedContent = bilingualManager.sanitizeForCulturalSensitivity(processedContent);
    
    // Add internal links (simplified version)
    const internalLinks = manufacturingSEO.generateInternalLinks(article, []);
    internalLinks.forEach(link => {
      const regex = new RegExp(`\\b${link.anchor.split(' ')[0]}\\b`, 'gi');
      if (processedContent.match(regex) && !processedContent.includes(`href="${link.url}"`)) {
        processedContent = processedContent.replace(
          regex,
          `<a href="${link.url}" class="text-amber-600 hover:text-amber-700 underline font-medium">${link.anchor.split(' ')[0]}</a>`
        );
      }
    });
    
    return processedContent;
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* Table of Contents - Sticky Sidebar */}
        {tableOfContents.length > 0 && (
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Table of Contents
              </h3>
              
              <nav className="space-y-2">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`
                      block w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200
                      ${item.level === 2 ? 'pl-3' : item.level === 3 ? 'pl-6' : 'pl-9'}
                      ${activeSection === item.id 
                        ? 'bg-amber-100 text-amber-800 font-medium border-l-4 border-amber-500' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>

              {/* Manufacturing Quick Info */}
              <div className="mt-8 p-4 bg-gradient-to-br from-amber-50 to-blue-50 rounded-lg border border-amber-100">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Manufacturing Info</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pillow Types:</span>
                    <span className="font-medium text-gray-900">
                      {article.manufacturingFocus.pillowTypes.length}+
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Materials:</span>
                    <span className="font-medium text-gray-900">
                      {article.manufacturingFocus.materials.length}+
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Markets:</span>
                    <span className="font-medium text-gray-900">
                      {article.manufacturingFocus.targetMarket.length}+
                    </span>
                  </div>
                </div>
                
                <Link href="/wholesale">
                  <button className="w-full mt-4 px-4 py-2 bg-amber-500 text-white text-xs font-medium rounded-lg hover:bg-amber-600 transition-colors duration-300">
                    Get Wholesale Quote
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`${tableOfContents.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
          
          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl mb-12"
          >
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 75vw"
            />
            
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            
            {/* Image Caption */}
            {article.featuredImage.caption && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm text-white p-3 rounded-lg">
                <p className="text-sm">{article.featuredImage.caption}</p>
              </div>
            )}
          </motion.div>

          {/* Article Content */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg max-w-none"
            style={{
              '--tw-prose-body': '#374151',
              '--tw-prose-headings': '#111827',
              '--tw-prose-links': '#D97706',
              '--tw-prose-bold': '#111827',
              '--tw-prose-counters': '#6B7280',
              '--tw-prose-bullets': '#D97706',
              '--tw-prose-hr': '#E5E7EB',
              '--tw-prose-quotes': '#111827',
              '--tw-prose-quote-borders': '#D97706',
              '--tw-prose-captions': '#6B7280',
              '--tw-prose-code': '#111827',
              '--tw-prose-pre-code': '#E5E7EB',
              '--tw-prose-pre-bg': '#1F2937',
              '--tw-prose-th-borders': '#D1D5DB',
              '--tw-prose-td-borders': '#E5E7EB'
            } as React.CSSProperties}
            dangerouslySetInnerHTML={{
              __html: processContent(article.content)
            }}
          />

          {/* Manufacturing Insights Section */}
          {article.manufacturingInsights && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Manufacturing Insights
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Production Process */}
                {article.manufacturingInsights.productionProcess && (
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-3">Production Process</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {article.manufacturingInsights.productionProcess}
                    </p>
                  </div>
                )}

                {/* Quality Features */}
                {article.manufacturingInsights.qualityFeatures && (
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-3">Quality Features</h4>
                    <ul className="space-y-2">
                      {article.manufacturingInsights.qualityFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Business Benefits */}
                {article.manufacturingInsights.businessBenefits && (
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-3">Business Benefits</h4>
                    <ul className="space-y-2">
                      {article.manufacturingInsights.businessBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Wholesale Info */}
                {article.manufacturingInsights.wholesaleInfo && (
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-100">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                      </svg>
                      Wholesale Information
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {article.manufacturingInsights.wholesaleInfo}
                    </p>
                    <Link href="/wholesale">
                      <button className="w-full px-4 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors duration-300">
                        Get Wholesale Pricing
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Article Gallery */}
          {article.gallery && article.gallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {article.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white text-sm">{image.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Topics</h3>
            <div className="flex flex-wrap gap-3">
              {article.tags.map((tag) => (
                <Link key={tag.id} href={`/blog/tag/${tag.slug}`}>
                  <span className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-800 text-sm font-medium rounded-full transition-colors duration-300 cursor-pointer">
                    #{tag.name}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ArticleContent;