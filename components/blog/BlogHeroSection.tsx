// Modern Blog Hero Section with Egyptian Theme
// Features latest article with manufacturing focus and cultural authenticity

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BlogArticleEnhanced } from '@/types/blog-enhanced';
import { bilingualManager } from '@/lib/bilingual-support';

interface BlogHeroSectionProps {
  featuredArticle: BlogArticleEnhanced;
  className?: string;
}

export const BlogHeroSection: React.FC<BlogHeroSectionProps> = ({
  featuredArticle,
  className = ''
}) => {
  const culturalTerm = bilingualManager.getCulturalTerm(featuredArticle.culturalElement.englishName);

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-amber-50 via-blue-50 to-amber-100 ${className}`}>
      {/* Egyptian Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.3'%3E%3Cpath d='M30 30l15-15v30l-15-15zm-15 0l15 15v-30l-15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }} 
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Manufacturing Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-blue-100 rounded-full border border-amber-200">
              <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 animate-pulse" />
              <span className="text-sm font-medium text-gray-700">
                Egyptian Pillow Manufacturing Excellence
              </span>
            </div>

            {/* Cultural Context */}
            {culturalTerm && (
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <span className="font-arabic text-lg text-amber-600">
                  {culturalTerm.arabic}
                </span>
                <span className="text-gray-400">•</span>
                <span className="italic">
                  Pronounced: {culturalTerm.pronunciation}
                </span>
              </div>
            )}

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-amber-600 via-blue-600 to-amber-700 bg-clip-text text-transparent">
                  {featuredArticle.title.split(' - ')[0]}
                </span>
                {featuredArticle.title.includes(' - ') && (
                  <span className="block text-2xl lg:text-3xl xl:text-4xl text-gray-700 mt-2 font-medium">
                    {featuredArticle.title.split(' - ')[1]}
                  </span>
                )}
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
              {featuredArticle.excerpt}
            </p>

            {/* Manufacturing Highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-amber-100">
                <div className="text-2xl font-bold text-amber-600">
                  {featuredArticle.manufacturingFocus.pillowTypes.length}+
                </div>
                <div className="text-sm text-gray-600">Pillow Types</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">
                  {featuredArticle.manufacturingFocus.materials.length}+
                </div>
                <div className="text-sm text-gray-600">Premium Materials</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/blog/${featuredArticle.slug}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Read Manufacturing Insights</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </Link>
              
              <Link href="/wholesale">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Wholesale Inquiry</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </motion.button>
              </Link>
            </div>

            {/* Article Meta */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{featuredArticle.author.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{featuredArticle.readingTime} min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{featuredArticle.viewCount.toLocaleString()} views</span>
              </div>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={featuredArticle.featuredImage.url}
                alt={featuredArticle.featuredImage.alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Image Overlay with Cultural Symbol */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              
              {/* Cultural Symbol Overlay */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                <div className="w-8 h-8 text-amber-600 flex items-center justify-center font-bold text-lg">
                  {featuredArticle.culturalElement.iconCode === 'anubis-jackal-head' && '𓃥'}
                  {featuredArticle.culturalElement.iconCode === 'wadjet-eye-symbol' && '𓂀'}
                  {featuredArticle.culturalElement.iconCode === 'ankh-symbol' && '☥'}
                </div>
              </div>

              {/* Manufacturing Badge on Image */}
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-amber-500/90 to-blue-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                Premium Manufacturing
              </div>
            </div>

            {/* Floating Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100"
            >
              <div className="text-2xl font-bold text-green-600">
                {(featuredArticle.conversionRate! * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-600">Conversion Rate</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100"
            >
              <div className="text-2xl font-bold text-blue-600">
                {featuredArticle.shareCount}
              </div>
              <div className="text-xs text-gray-600">Shares</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-12 text-white">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
};

export default BlogHeroSection;