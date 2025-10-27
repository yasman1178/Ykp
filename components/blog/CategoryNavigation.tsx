// Category Navigation with Egyptian Symbol Icons
// Manufacturing-focused categories with cultural authenticity

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogCategory } from '@/types/blog-enhanced';

interface CategoryNavigationProps {
  categories: BlogCategory[];
  activeCategory?: string;
  onCategorySelect?: (categoryId: string) => void;
  className?: string;
}

// Egyptian symbol icons mapping
const EGYPTIAN_ICONS = {
  'ancient-figures-manufacturing': '𓃥', // Anubis
  'protection-symbols-manufacturing': '𓂀', // Eye of Horus
  'royal-heritage-manufacturing': '𓈖', // Nefertiti crown
  'sacred-symbols-manufacturing': '☥', // Ankh
  'monuments-manufacturing': '𓉴', // Pyramid
  'cultural-heritage-manufacturing': '𓊖', // Egyptian cartouche
  'manufacturing-processes': '⚙️', // Manufacturing gear
  'wholesale-business': '📦', // Wholesale box
  'export-markets': '🌍', // Global export
  'quality-standards': '✓' // Quality check
};

const CATEGORY_GRADIENTS = {
  'ancient-figures-manufacturing': 'from-amber-500 to-orange-600',
  'protection-symbols-manufacturing': 'from-blue-500 to-indigo-600',
  'royal-heritage-manufacturing': 'from-purple-500 to-pink-600',
  'sacred-symbols-manufacturing': 'from-green-500 to-teal-600',
  'monuments-manufacturing': 'from-yellow-500 to-amber-600',
  'cultural-heritage-manufacturing': 'from-red-500 to-rose-600',
  'manufacturing-processes': 'from-gray-500 to-slate-600',
  'wholesale-business': 'from-cyan-500 to-blue-600',
  'export-markets': 'from-emerald-500 to-green-600',
  'quality-standards': 'from-violet-500 to-purple-600'
};

export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  categories,
  activeCategory,
  onCategorySelect,
  className = ''
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  return (
    <section className={`py-12 bg-gradient-to-br from-gray-50 to-blue-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Explore Our Manufacturing Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Discover authentic Egyptian cultural heritage through our premium pillow manufacturing insights. 
            From ancient symbols to modern production techniques.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const isActive = activeCategory === category.id;
            const isHovered = hoveredCategory === category.id;
            const icon = EGYPTIAN_ICONS[category.id as keyof typeof EGYPTIAN_ICONS] || '𓊖';
            const gradient = CATEGORY_GRADIENTS[category.id as keyof typeof CATEGORY_GRADIENTS] || 'from-gray-500 to-slate-600';

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link href={`/blog/category/${category.slug}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      relative group cursor-pointer rounded-2xl p-6 h-full
                      transition-all duration-300 transform
                      ${isActive 
                        ? 'bg-white shadow-xl ring-2 ring-amber-400' 
                        : 'bg-white hover:shadow-lg shadow-md'
                      }
                    `}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {/* Background Gradient Overlay */}
                    <div className={`
                      absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 
                      transition-opacity duration-300 bg-gradient-to-br ${gradient}
                    `} />

                    {/* Icon */}
                    <div className="relative z-10 mb-4">
                      <div className={`
                        w-16 h-16 mx-auto rounded-xl flex items-center justify-center
                        text-2xl font-bold text-white transition-all duration-300
                        bg-gradient-to-br ${gradient}
                        ${isHovered ? 'scale-110 rotate-3' : ''}
                      `}>
                        {icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center space-y-3">
                      <h3 className="font-semibold text-gray-900 text-sm lg:text-base leading-tight">
                        {category.name}
                      </h3>
                      
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                        {category.description}
                      </p>

                      {/* Article Count Badge */}
                      <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                        <span className="font-medium">{category.articleCount}</span>
                        <span className="ml-1">articles</span>
                      </div>

                      {/* Manufacturing Relevance Indicator */}
                      <div className="flex justify-center">
                        <div className={`
                          flex items-center space-x-1 text-xs
                          ${category.manufacturingRelevance === 'high' ? 'text-green-600' : 
                            category.manufacturingRelevance === 'medium' ? 'text-yellow-600' : 'text-gray-500'}
                        `}>
                          <div className={`
                            w-2 h-2 rounded-full
                            ${category.manufacturingRelevance === 'high' ? 'bg-green-500' : 
                              category.manufacturingRelevance === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'}
                          `} />
                          <span className="capitalize">{category.manufacturingRelevance} Priority</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Arrow */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: isHovered ? 1 : 0, 
                        x: isHovered ? 0 : -10 
                      }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1/2 right-4 transform -translate-y-1/2"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Manufacturing Focus Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-amber-500 to-blue-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            Premium Egyptian Pillow Manufacturing
          </h3>
          <p className="text-lg opacity-90 mb-6 max-w-3xl mx-auto">
            Combining authentic Egyptian cultural heritage with modern manufacturing excellence. 
            Wholesale pricing, international shipping, and quality certifications available.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/wholesale">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Request Wholesale Pricing
              </motion.button>
            </Link>
            <Link href="/manufacturing">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                View Manufacturing Process
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600">15+</div>
            <div className="text-sm text-gray-600">Cultural Symbols</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">10K+</div>
            <div className="text-sm text-gray-600">Monthly Production</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">25+</div>
            <div className="text-sm text-gray-600">Export Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">ISO</div>
            <div className="text-sm text-gray-600">Certified Quality</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryNavigation;