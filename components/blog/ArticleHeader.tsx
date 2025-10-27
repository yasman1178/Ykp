// Enhanced Article Header with Manufacturing Focus
// Comprehensive header with cultural context and business information

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BlogArticleEnhanced } from '@/types/blog-enhanced';
import { bilingualManager } from '@/lib/bilingual-support';

interface ArticleHeaderProps {
  article: BlogArticleEnhanced;
  readingProgress?: number;
  className?: string;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  article,
  readingProgress = 0,
  className = ''
}) => {
  const culturalTerm = bilingualManager.getCulturalTerm(article.culturalElement.englishName);
  
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

  const getManufacturingBadgeColor = (relevance: string) => {
    switch (relevance) {
      case 'high': return 'bg-green-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <header className={`relative bg-gradient-to-br from-amber-50 via-blue-50 to-amber-100 ${className}`}>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 to-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Egyptian Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.3'%3E%3Cpath d='M30 30l15-15v30l-15-15zm-15 0l15 15v-30l-15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }} 
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
        >
          <Link href="/" className="hover:text-amber-600 transition-colors duration-200">
            Home
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/blog" className="hover:text-amber-600 transition-colors duration-200">
            Manufacturing Blog
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link 
            href={`/blog/category/${article.category.slug}`}
            className="hover:text-amber-600 transition-colors duration-200"
          >
            {article.category.name.split(' & ')[0]}
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-400 truncate">
            {article.title.length > 30 ? `${article.title.substring(0, 30)}...` : article.title}
          </span>
        </motion.nav>

        {/* Article Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          {/* Featured Badge */}
          {article.featured && (
            <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium rounded-full">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              FEATURED
            </span>
          )}

          {/* Manufacturing Priority Badge */}
          <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${getManufacturingBadgeColor(article.category.manufacturingRelevance)}`}>
            <div className="w-2 h-2 bg-white rounded-full mr-2" />
            {article.category.manufacturingRelevance.toUpperCase()} PRIORITY
          </span>

          {/* Cultural Symbol Badge */}
          <span className="inline-flex items-center px-3 py-1 bg-white/80 backdrop-blur-sm text-amber-700 text-xs font-medium rounded-full border border-amber-200">
            <span className="text-lg mr-1">
              {getCulturalIcon(article.culturalElement.iconCode)}
            </span>
            {article.culturalElement.englishName}
          </span>

          {/* Reading Time */}
          <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {article.readingTime} min read
          </span>
        </motion.div>

        {/* Cultural Context */}
        {culturalTerm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-sm rounded-lg p-4 mb-8 border border-amber-100"
          >
            <div className="flex items-start space-x-4">
              <div className="text-3xl text-amber-600">
                {getCulturalIcon(article.culturalElement.iconCode)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {culturalTerm.english}
                  </h3>
                  <span className="font-arabic text-lg text-amber-600">
                    {culturalTerm.arabic}
                  </span>
                  <span className="text-sm text-gray-500 italic">
                    ({culturalTerm.pronunciation})
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {culturalTerm.meaning}. {culturalTerm.culturalContext}
                </p>
                {culturalTerm.manufacturingRelevance && (
                  <p className="text-sm text-blue-600 mt-2 font-medium">
                    Manufacturing Context: {culturalTerm.manufacturingRelevance}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-900 mb-6"
        >
          {article.title}
        </motion.h1>

        {/* Article Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl"
        >
          {article.description}
        </motion.p>

        {/* Manufacturing Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-100">
            <div className="text-2xl font-bold text-amber-600 mb-1">
              {article.manufacturingFocus.pillowTypes.length}+
            </div>
            <div className="text-xs text-gray-600">Pillow Types</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-100">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {article.manufacturingFocus.materials.length}+
            </div>
            <div className="text-xs text-gray-600">Premium Materials</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-100">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {article.manufacturingFocus.certifications.length}+
            </div>
            <div className="text-xs text-gray-600">Certifications</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-100">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {(article.conversionRate! * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-gray-600">Conversion Rate</div>
          </div>
        </motion.div>

        {/* Author and Article Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-gray-100"
        >
          {/* Author Info */}
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {article.author.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {article.author.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                {article.author.credentials}
              </p>
              <div className="flex flex-wrap gap-2">
                {article.author.expertise.slice(0, 3).map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Article Stats */}
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                {new Date(article.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{article.viewCount.toLocaleString()} views</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span>{article.shareCount} shares</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-600 font-medium">
                {(article.engagementScore * 100).toFixed(0)}% engagement
              </span>
            </div>
          </div>
        </motion.div>

        {/* Manufacturing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 bg-gradient-to-r from-amber-500 to-blue-600 rounded-lg p-6 text-white text-center"
        >
          <h3 className="text-lg font-bold mb-2">
            Interested in {article.culturalElement.englishName} Pillow Manufacturing?
          </h3>
          <p className="text-sm opacity-90 mb-4">
            Get wholesale pricing and manufacturing details for authentic Egyptian-themed pillows.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/wholesale">
              <button className="px-6 py-2 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Request Quote
              </button>
            </Link>
            <Link href="/manufacturing">
              <button className="px-6 py-2 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
                View Process
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-8 text-white">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="currentColor" />
        </svg>
      </div>
    </header>
  );
};

export default ArticleHeader;