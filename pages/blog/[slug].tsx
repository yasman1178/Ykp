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

      <div className="min-h-screen bg-white">
        {/* Newspaper-Style Header */}
        <section className="relative py-8 px-4 bg-white border-b-4 border-black">
          <div className="max-w-7xl mx-auto">
            {/* Newspaper Masthead */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center border-b-2 border-black pb-4 mb-6"
            >
              <Link href="/blog">
                <h1 
                  className="text-5xl md:text-6xl font-bold text-black mb-1 tracking-tight cursor-pointer hover:text-amber-700 transition-colors" 
                  style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900 }}
                >
                  THE PHARAONIC TIMES
                </h1>
              </Link>
              <div className="text-sm text-gray-600 uppercase tracking-widest">
                {new Date(article.publishDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </motion.div>

            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs uppercase tracking-wider text-gray-600 mb-6"
            >
              <Link href="/" className="hover:text-amber-700">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/blog" className="hover:text-amber-700">Blog</Link>
              <span className="mx-2">›</span>
              <span className="text-black font-semibold">{article.symbol.name}</span>
            </motion.div>
          </div>
        </section>

        {/* Article Header - Newspaper Style */}
        <section className="py-12 px-4 bg-gray-50 border-b-2 border-gray-300">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category */}
              <div className="text-xs uppercase tracking-widest text-gray-600 mb-4 font-bold">
                {article.symbol.name} • Egyptian Symbols
              </div>

              {/* Main Headline */}
              <h1 
                className="text-5xl md:text-7xl font-bold text-black mb-4 leading-tight" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {article.arabicTitle}
              </h1>

              {/* Subheadline */}
              <h2 className="text-2xl md:text-3xl text-gray-700 mb-6 leading-snug font-semibold">
                {article.title}
              </h2>

              {/* Byline */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700 mb-6 pb-6 border-b border-gray-300">
                <div className="flex items-center gap-2">
                  <span className="font-bold">By</span>
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{article.readingTime} min read</span>
                </div>
                <button
                  onClick={() => setShowShareDialog(true)}
                  className="flex items-center gap-2 hover:text-amber-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>

              {/* Lead Image/Symbol */}
              <div className="relative h-96 bg-gradient-to-br from-gray-100 to-amber-50 flex items-center justify-center border-4 border-black mb-8">
                <div className="text-9xl">{getSymbolIcon(article.symbol.name)}</div>
                <div className="absolute bottom-4 left-4 bg-black text-white px-4 py-2 text-xs uppercase tracking-wider font-bold">
                  {article.symbol.arabicName}
                </div>
              </div>

              {/* Lead Paragraph / Description */}
              <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-8 font-serif border-l-4 border-black pl-6">
                {article.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Article Content - Newspaper Columns */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none newspaper-columns"
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

        <style jsx>{`
          .newspaper-columns {
            font-family: Georgia, serif;
            text-align: justify;
            column-gap: 3rem;
          }
          
          @media (min-width: 768px) {
            .newspaper-columns {
              column-count: 2;
            }
          }
        `}</style>



        {/* Related Articles - Newspaper Style */}
        {relatedArticles.length > 0 && (
          <section className="py-12 px-4 bg-gray-50 border-t-4 border-black">
            <div className="max-w-7xl mx-auto">
              <div className="border-b-4 border-black pb-3 mb-8">
                <h2 className="text-3xl font-bold text-black uppercase tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  More From This Section
                </h2>
                <p className="text-lg text-gray-700 mt-1" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
                  مقالات ذات صلة
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle, index) => (
                  <Link key={relatedArticle.id} href={`/blog/${relatedArticle.slug}`}>
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b-2 border-gray-300 pb-6 hover:bg-white transition-colors duration-300 p-4 -m-4 cursor-pointer group"
                    >
                      {/* Article Image */}
                      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-amber-50 flex items-center justify-center border-2 border-black mb-4">
                        <div className="text-6xl">{getSymbolIcon(relatedArticle.symbol.name)}</div>
                        <div className="absolute top-2 right-2 bg-black text-white px-3 py-1 text-xs font-bold">
                          {relatedArticle.readingTime} MIN
                        </div>
                      </div>

                      {/* Article Content */}
                      <div className="text-xs uppercase tracking-widest text-gray-600 mb-2 font-semibold">
                        {relatedArticle.symbol.name}
                      </div>
                      <h3 
                        className="text-2xl font-bold text-black mb-2 leading-tight group-hover:text-amber-700 transition-colors line-clamp-2" 
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {relatedArticle.arabicTitle}
                      </h3>
                      <h4 className="text-lg font-semibold text-gray-700 mb-3 leading-snug line-clamp-2">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
                        {relatedArticle.description}
                      </p>
                      <div className="text-xs text-gray-500">
                        {new Date(relatedArticle.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </motion.article>
                  </Link>
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