import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PHARAONIC_SYMBOLS_ARTICLES, BlogArticle } from '@/data/blog-articles';
import { SEOHead } from '@/components/SEOHead';
import BlogShareDialog from '@/components/BlogShareDialog';
import ReadingProgress from '@/components/ReadingProgress';
import EgyptianLoader from '@/components/EgyptianLoader';
import EgyptianBreadcrumb from '@/components/EgyptianBreadcrumb';
import EgyptianTags from '@/components/EgyptianTags';
import EgyptianCTA from '@/components/EgyptianCTA';
import BlogArticleEnhanced from '@/components/BlogArticleEnhanced';
import { generateOGImageUrl, generateTwitterImageUrl } from '@/lib/og-image-generator';
import { 
  generateBlogSEOMeta, 
  generateBlogStructuredData,
  generateRelatedProducts 
} from '@/lib/blog-seo-integration';
import { useState } from 'react';

interface BlogArticlePageProps {
  article: BlogArticle;
  relatedArticles: BlogArticle[];
}

export default function BlogArticlePage({ article, relatedArticles }: BlogArticlePageProps) {
  const router = useRouter();
  const [showShareDialog, setShowShareDialog] = useState(false);

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-blue-50 to-amber-100 flex items-center justify-center">
        <EgyptianLoader 
          type="hieroglyph" 
          size="lg" 
          message="جاري تحميل المقال... Loading Article..."
        />
      </div>
    );
  }

  // Generate enhanced SEO meta data
  const seoMeta = generateBlogSEOMeta(article);
  const structuredData = generateBlogStructuredData(article);
  const relatedProducts = generateRelatedProducts(article);

  // Generate Egyptian-themed OG images
  const ogImageUrl = generateOGImageUrl({
    title: article.title,
    arabicTitle: article.arabicTitle,
    symbolIcon: getSymbolIcon(article.symbol.name),
    authorName: article.author,
    readingTime: article.readingTime,
    category: 'Egyptian Symbols'
  });

  const twitterImageUrl = generateTwitterImageUrl({
    title: article.title,
    arabicTitle: article.arabicTitle,
    symbolIcon: getSymbolIcon(article.symbol.name),
    authorName: article.author,
    readingTime: article.readingTime,
    category: 'Egyptian Symbols'
  });

  return (
    <>
      <SEOHead
        seoConfig={{
          title: seoMeta.title,
          description: seoMeta.description,
          keywords: seoMeta.keywords,
          openGraph: {
            ...seoMeta.openGraph,
            image: `https://pharaonicpillows.com${ogImageUrl}`,
          },
          twitter: {
            ...seoMeta.twitter,
            image: `https://pharaonicpillows.com${twitterImageUrl}`
          }
        }}
        structuredData={structuredData}
        canonical={`https://pharaonicpillows.com/blog/${article.slug}`}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
        {/* Enhanced Hero Section */}
        <section className="relative py-16 md:py-24 px-4 overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-amber-800">
          {/* Animated Egyptian Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-7xl text-amber-400 animate-float">𓀀</div>
            <div className="absolute top-32 right-16 text-5xl text-blue-300 animate-float-delayed">𓂀</div>
            <div className="absolute bottom-24 left-1/4 text-6xl text-amber-300 animate-float-slow">𓋹</div>
            <div className="absolute bottom-16 right-1/4 text-4xl text-blue-400 animate-float">𓆣</div>
            <div className="absolute top-1/2 left-1/2 text-8xl text-white/5 animate-float-slow">𓁹</div>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Breadcrumb Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <EgyptianBreadcrumb
                items={[
                  { label: 'Home', arabicLabel: 'الرئيسية', href: '/' },
                  { label: 'Blog', arabicLabel: 'المدونة', href: '/blog' },
                  { label: article.symbol.name, arabicLabel: article.symbol.arabicName }
                ]}
                className="mb-10"
              />
            </motion.div>

            {/* Article Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              {/* Symbol Icon with Glow Effect */}
              <motion.div 
                className="mb-8"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
              >
                <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-amber-400 via-amber-500 to-blue-600 rounded-3xl text-white text-5xl shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-blue-600 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
                  <span className="relative z-10">{getSymbolIcon(article.symbol.name)}</span>
                </div>
              </motion.div>

              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-2 mb-6"
              >
                <span className="text-white/90 text-sm font-semibold">رموز فرعونية | Egyptian Symbols</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-3 leading-tight px-4" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {article.arabicTitle}
              </motion.h1>

              {/* Subtitle - English */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl text-white/80 mb-8 px-4 max-w-3xl mx-auto"
              >
                {article.title}
              </motion.p>

              {/* Article Meta */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-wrap items-center justify-center gap-6 text-white mb-8"
              >
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{article.readingTime} دقائق قراءة</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">{new Date(article.publishDate).toLocaleDateString('ar-EG')}</span>
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex justify-center mb-8"
              >
                <EgyptianTags 
                  tags={article.tags} 
                  maxTags={4} 
                  variant="gradient"
                />
              </motion.div>

              {/* Share Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowShareDialog(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-amber-50 transition-all duration-300 shadow-2xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>شارك المقال</span>
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Article Content with SEO and Product Integration */}
        <section className="py-16 px-4 -mt-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100"
            >
              <BlogArticleEnhanced 
                article={article}
                showProductIntegration={true}
                showInternalLinks={true}
                showCTASections={true}
              />
            </motion.div>
          </div>
        </section>



        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="py-20 px-4 bg-gradient-to-br from-white via-amber-50/20 to-blue-50/20">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">
                  📚 اقرأ المزيد
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  مقالات ذات صلة
                </h2>
                <p className="text-xl text-gray-600 mb-6">Related Articles</p>
                <div className="w-24 h-1.5 bg-gradient-to-r from-amber-500 via-blue-500 to-amber-500 mx-auto rounded-full"></div>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {relatedArticles.map((relatedArticle, index) => (
                  <motion.div
                    key={relatedArticle.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                  >
                    <Link href={`/blog/${relatedArticle.slug}`}>
                      <motion.article
                        className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer h-full flex flex-col border border-gray-100"
                        whileHover={{ y: -12, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Image/Icon Section */}
                        <div className="relative h-56 bg-gradient-to-br from-amber-400 via-amber-500 to-blue-600 flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
                          <motion.div 
                            className="text-7xl text-white/90 relative z-10"
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            {getSymbolIcon(relatedArticle.symbol.name)}
                          </motion.div>
                          
                          {/* Reading Time Badge */}
                          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-gray-700 text-sm font-semibold">{relatedArticle.readingTime} دقائق</span>
                            </div>
                          </div>

                          {/* Decorative Corner */}
                          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-tr-full"></div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                            {relatedArticle.arabicTitle}
                          </h3>
                          <h4 className="text-lg font-semibold text-gray-600 mb-3 leading-snug">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed flex-1">
                            {relatedArticle.description}
                          </p>
                          
                          {/* Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-medium">
                              {relatedArticle.symbol.historicalPeriod}
                            </span>
                            <div className="inline-flex items-center text-amber-600 group-hover:text-blue-600 font-semibold transition-colors">
                              <span className="text-sm">اقرأ المزيد</span>
                              <motion.svg 
                                className="w-5 h-5 ml-2" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </motion.svg>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}


      </div>

      {/* Reading Progress Bar */}
      <ReadingProgress />

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
    </>
  );
}

// Helper functions
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

function getProductName(productId: string): string {
  const productNames: { [key: string]: string } = {
    'b123-anubis-guardian': 'وسادة حارس أنوبيس الفاخرة',
    'b123-afterlife-journey': 'وسادة رحلة الآخرة',
    't-jackal-protector': 'وسادة حامي ابن آوى',
    'b123-royal-scarab': 'وسادة الجعران الملكي',
    'b123-golden-beetle': 'وسادة الخنفساء الذهبية',
    't-protection-scarab': 'وسادة جعران الحماية'
  };
  return productNames[productId] || 'وسادة فرعونية فاخرة';
}

function formatArticleContent(content: string): string {
  // Convert markdown-style content to HTML with Egyptian styling
  return content
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = PHARAONIC_SYMBOLS_ARTICLES.map((article) => ({
    params: { slug: article.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const article = PHARAONIC_SYMBOLS_ARTICLES.find((article) => article.slug === slug);

  if (!article) {
    return {
      notFound: true,
    };
  }

  // Get related articles (same category or similar tags)
  const relatedArticles = PHARAONIC_SYMBOLS_ARTICLES
    .filter((a) => a.id !== article.id)
    .filter((a) => a.tags.some(tag => article.tags.includes(tag)))
    .slice(0, 3);

  return {
    props: {
      article,
      relatedArticles,
    },
    revalidate: 86400, // Revalidate once per day
  };
};