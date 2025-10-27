// Modern Article Grid with Manufacturing Focus
// Responsive grid layout with lazy loading and Egyptian cultural elements

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BlogArticleEnhanced } from '@/types/blog-enhanced';
import { bilingualManager } from '@/lib/bilingual-support';

interface ArticleGridProps {
  articles: BlogArticleEnhanced[];
  loading?: boolean;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  className?: string;
}

interface ArticleCardProps {
  article: BlogArticleEnhanced;
  index: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const culturalTerm = bilingualManager.getCulturalTerm(article.culturalElement.englishName);

  const getManufacturingBadgeColor = (relevance: string) => {
    switch (relevance) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
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
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <Link href={`/blog/${article.slug}`}>
        <div className="cursor-pointer">
          
          {/* Image Section */}
          <div className="relative aspect-[16/10] overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
            )}
            
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Cultural Symbol Badge */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
              <span className="text-xl text-amber-600">
                {getCulturalIcon(article.culturalElement.iconCode)}
              </span>
            </div>

            {/* Manufacturing Relevance Badge */}
            <div className={`absolute top-4 right-4 ${getManufacturingBadgeColor(article.category.manufacturingRelevance)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
              {article.category.manufacturingRelevance.toUpperCase()} PRIORITY
            </div>

            {/* Reading Time */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
              {article.readingTime} min read
            </div>

            {/* Featured Badge */}
            {article.featured && (
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                FEATURED
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            
            {/* Category and Cultural Context */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {article.category.name.split(' & ')[0]}
              </span>
              
              {culturalTerm && (
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span className="font-arabic text-sm text-amber-600">
                    {culturalTerm.arabic}
                  </span>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
              {article.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>

            {/* Manufacturing Highlights */}
            <div className="flex flex-wrap gap-2">
              {article.manufacturingFocus.pillowTypes.slice(0, 2).map((type, idx) => (
                <span key={idx} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                  {type}
                </span>
              ))}
              {article.manufacturingFocus.pillowTypes.length > 2 && (
                <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                  +{article.manufacturingFocus.pillowTypes.length - 2} more
                </span>
              )}
            </div>

            {/* Author and Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {article.author.name.split(',')[0]}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(article.publishDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{article.viewCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>{article.shareCount}</span>
                </div>
              </div>
            </div>

            {/* Manufacturing CTA */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Manufacturing Insights Available</span>
                <div className="flex items-center space-x-1 text-amber-600 group-hover:text-amber-700">
                  <span className="font-medium">Read More</span>
                  <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  loading = false,
  showLoadMore = false,
  onLoadMore,
  className = ''
}) => {
  const [visibleArticles, setVisibleArticles] = useState(6);

  const handleLoadMore = () => {
    if (onLoadMore) {
      onLoadMore();
    } else {
      setVisibleArticles(prev => prev + 6);
    }
  };

  const displayedArticles = articles.slice(0, visibleArticles);
  const hasMoreArticles = articles.length > visibleArticles;

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Manufacturing Insights & Cultural Heritage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Explore our comprehensive collection of articles covering Egyptian cultural symbols, 
            premium pillow manufacturing processes, and wholesale business insights.
          </motion.p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                <div className="aspect-[16/10] bg-gray-200 animate-pulse" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-16" />
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {(hasMoreArticles || showLoadMore) && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 space-x-2"
            >
              <span>Load More Articles</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </motion.div>
        )}

        {/* No Articles Message */}
        {articles.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="text-6xl text-gray-300 mb-4">𓊖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Articles Found</h3>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t find any articles matching your criteria. Try adjusting your filters or search terms.
            </p>
            <Link href="/blog">
              <button className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors duration-300">
                View All Articles
              </button>
            </Link>
          </motion.div>
        )}

        {/* Manufacturing CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            Ready to Start Your Wholesale Journey?
          </h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Discover our premium Egyptian pillow manufacturing capabilities. 
            Competitive wholesale pricing, authentic cultural designs, and international shipping available.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/wholesale">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors duration-300"
              >
                Get Wholesale Pricing
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Contact Manufacturing Team
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticleGrid;