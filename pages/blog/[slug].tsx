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

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-blue-50 to-amber-100">
        {/* Hero Section with Egyptian Styling */}
        <section className="relative py-20 px-4 overflow-hidden">
          {/* Egyptian Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-6xl text-amber-600 animate-pulse">𓀀</div>
            <div className="absolute top-20 right-20 text-4xl text-blue-600 animate-pulse delay-1000">𓂀</div>
            <div className="absolute bottom-20 left-20 text-5xl text-amber-700 animate-pulse delay-2000">𓋹</div>
            <div className="absolute bottom-10 right-10 text-3xl text-blue-700 animate-pulse delay-3000">𓆣</div>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <EgyptianBreadcrumb
              items={[
                { label: 'Home', arabicLabel: 'الرئيسية', href: '/' },
                { label: 'Blog', arabicLabel: 'المدونة', href: '/blog' },
                { label: article.symbol.name, arabicLabel: article.symbol.arabicName }
              ]}
              className="mb-8"
            />

            {/* Article Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              {/* Symbol Icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 to-blue-600 rounded-full text-white text-4xl shadow-2xl">
                  {getSymbolIcon(article.symbol.name)}
                </div>
              </div>

              {/* Arabic Title */}
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-blue-600 to-amber-600 bg-clip-text text-transparent mb-4 font-pharaonic leading-tight">
                {article.arabicTitle}
              </h1>

              {/* English Title */}
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-6">
                {article.title}
              </h2>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{article.readingTime} دقائق قراءة</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(article.publishDate).toLocaleDateString('ar-EG')}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex justify-center mb-8">
                <EgyptianTags 
                  tags={article.tags} 
                  maxTags={4} 
                  variant="gradient"
                />
              </div>

              {/* Share Button */}
              <button
                onClick={() => setShowShareDialog(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-blue-500 text-white font-semibold rounded-full hover:from-amber-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                شارك المقال
              </button>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Article Content with SEO and Product Integration */}
        <section className="py-16 px-4">
          <BlogArticleEnhanced 
            article={article}
            showProductIntegration={true}
            showInternalLinks={true}
            showCTASections={true}
          />
        </section>



        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-blue-900 mb-4">
                  مقالات ذات صلة | Related Articles
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-blue-500 mx-auto"></div>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle, index) => (
                  <motion.article
                    key={relatedArticle.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.6 + (index * 0.1) }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-amber-400 to-blue-600 flex items-center justify-center">
                      <div className="text-6xl text-white/80 group-hover:scale-110 transition-transform duration-300">
                        {getSymbolIcon(relatedArticle.symbol.name)}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-blue-900 mb-2 group-hover:text-amber-600 transition-colors">
                        {relatedArticle.arabicTitle}
                      </h3>
                      <h4 className="text-md font-semibold text-gray-700 mb-3">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {relatedArticle.description}
                      </p>
                      
                      <Link
                        href={`/blog/${relatedArticle.slug}`}
                        className="inline-flex items-center text-blue-600 hover:text-amber-600 font-medium transition-colors"
                      >
                        اقرأ المزيد
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </motion.article>
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