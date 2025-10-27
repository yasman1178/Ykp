// Enhanced Blog Article Component with SEO and Product Integration
// Comprehensive blog article display with Egyptian-themed CTAs and product suggestions

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogArticle } from '@/data/blog-articles';
import { BlogArticleEnhanced as BlogArticleEnhancedType } from '@/types/blog-enhanced';
import { Product } from '@/types/product';
import { 
  generateBlogCTA, 
  generateBlogInternalLinks, 
  generateRelatedProducts,
  SYMBOL_PRODUCT_MAPPING 
} from '@/lib/blog-seo-integration';
import EgyptianTags from './EgyptianTags';
import EgyptianCTA from './EgyptianCTA';
import BlogShareDialog from './BlogShareDialog';
import BlogInternalLinks from './BlogInternalLinks';

interface BlogArticleEnhancedProps {
  article: BlogArticle;
  showProductIntegration?: boolean;
  showInternalLinks?: boolean;
  showCTASections?: boolean;
}

export default function BlogArticleEnhanced({ 
  article, 
  showProductIntegration = true,
  showInternalLinks = true,
  showCTASections = true
}: BlogArticleEnhancedProps) {
  const [showShareDialog, setShowShareDialog] = useState(false);
  
  const relatedProducts = generateRelatedProducts(article);
  const internalLinks = generateBlogInternalLinks(article);
  const ctaData = generateBlogCTA(article);
  const symbolMapping = SYMBOL_PRODUCT_MAPPING[article.symbol.name as keyof typeof SYMBOL_PRODUCT_MAPPING];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Article Content with Enhanced SEO */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden mb-12"
      >
        {/* Egyptian Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-blue-500 to-amber-500"></div>
        <div className="absolute top-4 right-4 text-2xl text-amber-500/20">𓋹</div>
        <div className="absolute bottom-4 left-4 text-2xl text-blue-500/20">𓂀</div>

        {/* Enhanced Article Content */}
        <div className="prose prose-lg max-w-none egyptian-article-content">
          <div dangerouslySetInnerHTML={{ __html: formatEnhancedContent(article.content, article) }} />
        </div>

        {/* Symbol Information Box with Product Integration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 p-6 bg-gradient-to-r from-amber-50 to-blue-50 rounded-2xl border border-amber-200"
        >
          <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
            <span className="text-2xl ml-3">{getSymbolIcon(article.symbol.name)}</span>
            معلومات الرمز | Symbol Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <strong className="text-amber-700">الاسم العربي:</strong> {article.symbol.arabicName}
            </div>
            <div>
              <strong className="text-amber-700">English Name:</strong> {article.symbol.name}
            </div>
            <div>
              <strong className="text-amber-700">المعنى:</strong> {article.symbol.meaning}
            </div>
            <div>
              <strong className="text-amber-700">الفترة التاريخية:</strong> {article.symbol.historicalPeriod}
            </div>
            <div className="md:col-span-2">
              <strong className="text-amber-700">الأهمية الثقافية:</strong> {article.symbol.culturalSignificance}
            </div>
          </div>
          
          {/* Product Integration in Symbol Box */}
          {showProductIntegration && symbolMapping && (
            <div className="border-t border-amber-200 pt-4">
              <h4 className="font-semibold text-blue-900 mb-2">
                وسائد السفر المستوحاة من هذا الرمز | Travel Pillows Inspired by This Symbol
              </h4>
              <p className="text-gray-700 text-sm mb-3">
                {symbolMapping.description}
              </p>
              <Link
                href={`/products?symbol=${encodeURIComponent(article.symbol.name)}`}
                className="inline-flex items-center text-amber-600 hover:text-blue-600 font-medium transition-colors"
              >
                عرض الوسائد المستوحاة من {article.symbol.arabicName}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </motion.div>

        {/* Internal Links Section */}
        {showInternalLinks && internalLinks.length > 0 && (
          <BlogInternalLinks 
            links={internalLinks}
            title="Related Links"
            arabicTitle="روابط ذات صلة"
            maxLinks={6}
            variant="default"
          />
        )}
      </motion.article>

      {/* Related Products Section */}
      {showProductIntegration && relatedProducts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              وسائد مستوحاة من {article.symbol.arabicName} | {article.symbol.name} Inspired Pillows
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.slice(0, 6).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group egyptian-card"
              >
                <div className="relative h-48 bg-gradient-to-br from-amber-400 to-blue-600 flex items-center justify-center">
                  <div className="text-6xl text-white/80 group-hover:scale-110 transition-transform duration-300">
                    {getSymbolIcon(article.symbol.name)}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-xs font-medium">{product.collection.toUpperCase()}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-amber-600 font-bold">
                      ${product.pricing.retail.min} - ${product.pricing.retail.max}
                    </div>
                    <EgyptianTags 
                      tags={product.tags.slice(0, 2)} 
                      maxTags={2} 
                      variant="default"
                    />
                  </div>
                  
                  <Link
                    href={`/products/${product.collection}/${product.id}`}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-amber-500 to-blue-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-blue-600 transition-all duration-300"
                  >
                    عرض التفاصيل | View Details
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href={`/products?symbol=${encodeURIComponent(article.symbol.name)}`}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-blue-500 text-white font-bold rounded-full hover:from-amber-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              عرض جميع وسائد {article.symbol.arabicName} | View All {article.symbol.name} Pillows
              <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </motion.section>
      )}

      {/* Egyptian-themed CTA Sections */}
      {showCTASections && (
        <>
          {/* Primary CTA - Symbol-specific Products */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mb-8"
          >
            <EgyptianCTA
              arabicTitle={`اكتشف مجموعة وسائد ${article.symbol.arabicName}`}
              title={`Discover Our ${article.symbol.name} Pillow Collection`}
              arabicDescription={`استمتع بالراحة والحماية مع وسائد السفر المصرية المستوحاة من رمز ${article.symbol.arabicName} الخالد`}
              description={`Experience comfort and protection with Egyptian travel pillows inspired by the timeless ${article.symbol.name} symbol`}
              primaryButton={{
                arabicText: ctaData.primary.arabicText,
                text: ctaData.primary.text,
                href: ctaData.primary.href,
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                )
              }}
              secondaryButton={{
                arabicText: ctaData.secondary.arabicText,
                text: ctaData.secondary.text,
                href: ctaData.secondary.href,
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )
              }}
              variant="gradient"
              symbolIcon={getSymbolIcon(article.symbol.name)}
            />
          </motion.div>

          {/* Secondary CTA - Wholesale Opportunities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mb-8"
          >
            <EgyptianCTA
              arabicTitle="فرص الجملة للموزعين الدوليين"
              title="Wholesale Opportunities for International Distributors"
              arabicDescription="انضم إلى شبعة الموزعين العالمية واستفد من الطلب المتزايد على المنتجات المصرية الأصيلة"
              description="Join our global distributor network and benefit from the growing demand for authentic Egyptian cultural products"
              primaryButton={{
                arabicText: ctaData.tertiary?.arabicText || 'فرص الجملة',
                text: ctaData.tertiary?.text || 'Wholesale Info',
                href: ctaData.tertiary?.href || '/wholesale',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              }}
              variant="default"
              symbolIcon="𓋹"
            />
          </motion.div>
        </>
      )}

      {/* Share Dialog */}
      {showShareDialog && (
        <BlogShareDialog
          isOpen={showShareDialog}
          url={`https://pharaonicpillows.com/blog/${article.slug}`}
          title={article.title}
          description={article.description}
          onClose={() => setShowShareDialog(false)}
        />
      )}
    </div>
  );
}

// Helper Functions
function getSymbolIcon(symbolName: string): string {
  const icons: { [key: string]: string } = {
    'Anubis': '𓃥',
    'Royal Scarab': '𓆣',
    'Queen Nefertiti': '𓇳',
    'Great Pyramids': '𓉴',
    'Eye of Horus': '𓂀',
    'Ankh': '𓋹',
    'Sacred Lotus': '𓆸',
    'Great Sphinx': '𓎛',
    'Queen Cleopatra': '𓇯',
    "Pharaoh's Crown": '𓋑'
  };
  return icons[symbolName] || '𓀀';
}

function getLinkIcon(type: string): string {
  const icons: { [key: string]: string } = {
    'product': '🏺',
    'collection': '📦',
    'blog': '📜',
    'page': '🔗'
  };
  return icons[type] || '🔗';
}

function formatEnhancedContent(content: string, article: BlogArticle): string {
  const symbolMapping = SYMBOL_PRODUCT_MAPPING[article.symbol.name as keyof typeof SYMBOL_PRODUCT_MAPPING];
  
  let enhancedContent = content;
  
  // Add product integration section after the first major heading
  if (symbolMapping) {
    const productSection = `
      <div class="bg-gradient-to-r from-amber-50 to-blue-50 p-6 rounded-2xl my-8 border border-amber-200">
        <h3 class="text-xl font-bold text-blue-900 mb-4 flex items-center">
          <span class="text-2xl ml-3">${getSymbolIcon(article.symbol.name)}</span>
          ${article.symbol.name} في وسائد السفر المصرية الحديثة
        </h3>
        <p class="text-gray-700 mb-4">${symbolMapping.description}</p>
        <p class="text-gray-700 mb-4">
          تتميز مجموعة وسائد السفر المصرية الفاخرة لدينا بتصاميم أصيلة مستوحاة من رمز ${article.symbol.arabicName} 
          التي تكرم الأهمية الثقافية لهذا الرمز القديم مع توفير الراحة العصرية للمسافرين اليوم.
        </p>
        <a href="/products?symbol=${encodeURIComponent(article.symbol.name)}" 
           class="inline-flex items-center text-amber-600 hover:text-blue-600 font-medium transition-colors">
          اكتشف وسائد ${article.symbol.arabicName}
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    `;
    
    // Insert after the first paragraph
    const firstParagraphEnd = enhancedContent.indexOf('\n\n');
    if (firstParagraphEnd > -1) {
      enhancedContent = enhancedContent.slice(0, firstParagraphEnd) + productSection + enhancedContent.slice(firstParagraphEnd);
    }
  }
  
  // Convert markdown-style content to HTML with Egyptian styling
  return enhancedContent
    .replace(/## (.*)/g, '<h2 class="text-2xl font-bold text-blue-900 mt-8 mb-4 flex items-center"><span class="text-amber-600 ml-3">𓋹</span>$1</h2>')
    .replace(/### (.*)/g, '<h3 class="text-xl font-semibold text-blue-800 mt-6 mb-3">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-700 font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-blue-700">$1</em>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^/, '<p class="mb-4">')
    .replace(/$/, '</p>')
    .replace(/- (.*)/g, '<li class="mb-2 flex items-start"><span class="text-amber-600 ml-2">•</span>$1</li>')
    .replace(/(<li.*<\/li>)/g, '<ul class="mb-4 mr-4">$1</ul>');
}