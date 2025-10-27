// Product Showcase Components for Manufacturing Blog
// Intelligent product displays with Egyptian styling and conversion optimization

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogArticleEnhanced } from '@/types/blog-enhanced';
import { Product, RecommendationResult, productRecommendationEngine } from '@/lib/product-recommendation-engine-simple';

interface ProductShowcaseProps {
  article: BlogArticleEnhanced;
  maxProducts?: number;
  layout?: 'grid' | 'carousel' | 'inline' | 'sidebar';
  showPricing?: boolean;
  onProductClick?: (productId: string, source: string) => void;
  className?: string;
}

interface ProductCardProps {
  product: Product;
  recommendation: RecommendationResult;
  compact?: boolean;
  showPricing?: boolean;
  onProductClick?: (productId: string, source: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  recommendation,
  compact = false,
  showPricing = true,
  onProductClick
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleProductClick = () => {
    if (onProductClick) {
      onProductClick(product.id, 'product-showcase');
    }
  };

  const getCulturalIcon = (name: string) => {
    const iconMap: { [key: string]: string } = {
      'Anubis': '𓃥',
      'Eye of Horus': '𓂀',
      'Ankh': '☥',
      'Scarab': '𓆣',
      'Pyramid': '𓉴',
      'Nefertiti': '𓈖'
    };
    return iconMap[name] || '𓊖';
  };

  const getRecommendationBadge = (type: RecommendationResult['recommendationType']) => {
    const badges = {
      'cultural_match': { text: 'Perfect Match', color: 'bg-green-500' },
      'material_similarity': { text: 'Similar Materials', color: 'bg-blue-500' },
      'user_behavior': { text: 'Recommended', color: 'bg-purple-500' },
      'trending': { text: 'Trending', color: 'bg-red-500' },
      'manufacturing_focus': { text: 'Manufacturing Focus', color: 'bg-amber-500' }
    };
    return badges[type] || { text: 'Recommended', color: 'bg-gray-500' };
  };

  const badge = getRecommendationBadge(recommendation.recommendationType);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer ${
        compact ? 'p-4' : 'p-6'
      }`}
      onClick={handleProductClick}
    >
      {/* Recommendation Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-flex items-center px-3 py-1 ${badge.color} text-white text-xs font-medium rounded-full`}>
          {badge.text}
        </span>
        <div className="flex items-center space-x-1">
          <span className="text-lg">{getCulturalIcon(product.culturalElement.name)}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.analytics.averageRating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.analytics.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Product Image */}
      <div className={`relative ${compact ? 'aspect-[4/3]' : 'aspect-[16/10]'} mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-amber-50 to-blue-50`}>
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl text-amber-600">
              {getCulturalIcon(product.culturalElement.name)}
            </div>
          </div>
        )}
        
        <Image
          src={product.images.primary}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-105' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
          sizes={compact ? '(max-width: 768px) 100vw, 33vw' : '(max-width: 768px) 100vw, 50vw'}
        />

        {/* Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
            >
              <div className="text-white text-center">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-sm font-medium">View Details</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Manufacturing Badge */}
        {product.manufacturing.exportReady && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Export Ready
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <h3 className={`font-bold text-gray-900 line-clamp-2 ${compact ? 'text-sm' : 'text-lg'}`}>
            {product.name}
          </h3>
          <p className={`text-gray-600 line-clamp-2 ${compact ? 'text-xs' : 'text-sm'}`}>
            {product.description}
          </p>
        </div>

        {/* Cultural Context */}
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span className="font-arabic text-sm text-amber-600">
            {product.culturalElement.arabicName}
          </span>
          <span>•</span>
          <span>{product.culturalElement.significance}</span>
        </div>

        {/* Materials */}
        <div className="flex flex-wrap gap-1">
          {product.specifications.material.slice(0, 3).map((material, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
              {material}
            </span>
          ))}
          {product.specifications.material.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
              +{product.specifications.material.length - 3} more
            </span>
          )}
        </div>

        {/* Pricing */}
        {showPricing && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div>
              <div className="flex items-center space-x-2">
                <span className={`font-bold text-amber-600 ${compact ? 'text-sm' : 'text-lg'}`}>
                  ${product.price.wholesale}
                </span>
                <span className="text-xs text-gray-500">wholesale</span>
              </div>
              <div className="text-xs text-gray-500">
                Min. {product.price.minimumOrder} units
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Retail</div>
              <div className="text-sm font-medium text-gray-700">
                ${product.price.retail}
              </div>
            </div>
          </div>
        )}

        {/* Recommendation Reasons */}
        {!compact && recommendation.reasons.length > 0 && (
          <div className="pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-600 mb-2">Why recommended:</div>
            <ul className="space-y-1">
              {recommendation.reasons.slice(0, 2).map((reason, index) => (
                <li key={index} className="flex items-start text-xs text-gray-600">
                  <svg className="w-3 h-3 mr-1 mt-0.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Button */}
        <div className="pt-3">
          <button className={`w-full bg-gradient-to-r from-amber-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 ${
            compact ? 'py-2 text-sm' : 'py-3'
          }`}>
            Get Wholesale Quote
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  article,
  maxProducts = 3,
  layout = 'grid',
  showPricing = true,
  onProductClick,
  className = ''
}) => {
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Generate product recommendations
    const context = { article };
    const productRecommendations = productRecommendationEngine.generateRecommendations(
      context,
      maxProducts
    );
    
    setRecommendations(productRecommendations);
    setLoading(false);
  }, [article, maxProducts]);

  const handleProductClick = (productId: string, source: string) => {
    if (onProductClick) {
      onProductClick(productId, source);
    }
    
    // Track product click
    console.log('Product clicked:', productId, 'Source:', source, 'Article:', article.slug);
  };

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className={`grid ${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {[...Array(maxProducts)].map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-2xl h-96"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  const renderGridLayout = () => (
    <div className={`grid grid-cols-1 ${maxProducts > 1 ? 'md:grid-cols-2' : ''} ${maxProducts > 2 ? 'lg:grid-cols-3' : ''} gap-6`}>
      {recommendations.map((recommendation) => (
        <ProductCard
          key={recommendation.product.id}
          product={recommendation.product}
          recommendation={recommendation}
          showPricing={showPricing}
          onProductClick={handleProductClick}
        />
      ))}
    </div>
  );

  const renderCarouselLayout = () => (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {recommendations.map((recommendation) => (
            <div key={recommendation.product.id} className="w-full flex-shrink-0">
              <ProductCard
                product={recommendation.product}
                recommendation={recommendation}
                showPricing={showPricing}
                onProductClick={handleProductClick}
              />
            </div>
          ))}
        </div>
      </div>
      
      {recommendations.length > 1 && (
        <>
          <button
            onClick={() => setCurrentSlide(prev => prev > 0 ? prev - 1 : recommendations.length - 1)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => setCurrentSlide(prev => prev < recommendations.length - 1 ? prev + 1 : 0)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="flex justify-center mt-4 space-x-2">
            {recommendations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  currentSlide === index ? 'bg-amber-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );

  const renderInlineLayout = () => (
    <div className="bg-gradient-to-br from-amber-50 to-blue-50 rounded-2xl p-6 border border-amber-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Recommended {article.culturalElement.englishName} Products
          </h3>
          <p className="text-gray-600 mb-4">
            Authentic Egyptian-themed pillows inspired by the cultural elements discussed in this article.
          </p>
          <div className="space-y-2">
            {recommendations.slice(0, 2).map((recommendation) => (
              <div key={recommendation.product.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                <div className="text-2xl">
                  {recommendation.product.culturalElement.name === 'Anubis' && '𓃥'}
                  {recommendation.product.culturalElement.name === 'Eye of Horus' && '𓂀'}
                  {recommendation.product.culturalElement.name === 'Ankh' && '☥'}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{recommendation.product.name}</div>
                  <div className="text-sm text-gray-600">From ${recommendation.product.price.wholesale}</div>
                </div>
                <button
                  onClick={() => handleProductClick(recommendation.product.id, 'inline-showcase')}
                  className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors duration-200"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {recommendations[0] && (
          <div>
            <ProductCard
              product={recommendations[0].product}
              recommendation={recommendations[0]}
              compact={true}
              showPricing={showPricing}
              onProductClick={handleProductClick}
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderSidebarLayout = () => (
    <div className="space-y-4">
      {recommendations.map((recommendation) => (
        <ProductCard
          key={recommendation.product.id}
          product={recommendation.product}
          recommendation={recommendation}
          compact={true}
          showPricing={showPricing}
          onProductClick={handleProductClick}
        />
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${className}`}
    >
      {/* Section Header */}
      {layout !== 'inline' && (
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center">
            <span className="text-3xl mr-3">
              {article.culturalElement.iconCode === 'anubis-jackal-head' && '𓃥'}
              {article.culturalElement.iconCode === 'wadjet-eye-symbol' && '𓂀'}
              {article.culturalElement.iconCode === 'ankh-symbol' && '☥'}
            </span>
            Recommended {article.culturalElement.englishName} Products
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Authentic Egyptian-themed pillows that perfectly complement the cultural insights from this article. 
            Premium manufacturing with wholesale pricing available.
          </p>
        </div>
      )}

      {/* Product Display */}
      {layout === 'grid' && renderGridLayout()}
      {layout === 'carousel' && renderCarouselLayout()}
      {layout === 'inline' && renderInlineLayout()}
      {layout === 'sidebar' && renderSidebarLayout()}

      {/* Bottom CTA */}
      {layout !== 'sidebar' && (
        <div className="mt-8 text-center">
          <Link href="/products">
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 space-x-2">
              <span>View All Products</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default ProductShowcase;