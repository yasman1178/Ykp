import { GetStaticProps } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PHARAONIC_SYMBOLS_ARTICLES, BlogArticle, getFeaturedArticles } from '@/data/blog-articles';
import { TARGET_KEYWORDS } from '@/lib/seo-content';
import { SEOHead } from '@/components/SEOHead';
import EgyptianTags from '@/components/EgyptianTags';
import ProgressiveReveal from '@/components/ProgressiveReveal';
import EgyptianCTA from '@/components/EgyptianCTA';

interface BlogIndexProps {
  articles: BlogArticle[];
  featuredArticles: BlogArticle[];
}

export default function BlogIndex({ articles, featuredArticles }: BlogIndexProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Egyptian Pharaonic Symbols Blog - Ancient Wisdom & Travel Pillows',
    description: 'Explore the fascinating world of ancient Egyptian symbols and their meanings. Discover how Pharaonic heritage inspires our premium Egyptian travel pillow designs.',
    url: 'https://pharaonicpillows.com/blog',
    blogPost: featuredArticles.map(article => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description,
      url: `https://pharaonicpillows.com/blog/${article.slug}`,
      datePublished: article.publishDate,
      author: {
        '@type': 'Person',
        name: article.author
      }
    }))
  };

  return (
    <>
      <SEOHead
        seoConfig={{
          title: "Egyptian Pharaonic Symbols Blog | Ancient Wisdom & Travel Pillows",
          description: "Explore fascinating articles about ancient Egyptian symbols: Anubis, Scarab, Nefertiti, Pyramids, Eye of Horus, Ankh, Lotus, Sphinx, Cleopatra, and Pharaoh's Crown. Discover how these symbols inspire our premium Egyptian travel pillow designs.",
          keywords: [
            ...TARGET_KEYWORDS.primary.arabic,
            ...TARGET_KEYWORDS.primary.english,
            'Egyptian symbols blog',
            'Pharaonic heritage articles',
            'ancient Egyptian culture',
            'Egyptian travel pillow blog',
            'رموز فرعونية ومعانيها',
            'مدونة الثقافة المصرية القديمة'
          ],
          openGraph: {
            title: "Egyptian Pharaonic Symbols Blog | Ancient Wisdom & Travel Pillows",
            description: "Explore fascinating articles about ancient Egyptian symbols and discover how they inspire our premium Egyptian travel pillow designs.",
            image: "https://pharaonicpillows.com/blog-og-image.jpg",
            url: "https://pharaonicpillows.com/blog",
            type: "website",
            siteName: "Pharaonic Pillows"
          },
          twitter: {
            card: "summary_large_image",
            title: "Egyptian Pharaonic Symbols Blog | Ancient Wisdom & Travel Pillows",
            description: "Explore fascinating articles about ancient Egyptian symbols and discover how they inspire our premium Egyptian travel pillow designs.",
            image: "https://pharaonicpillows.com/blog-twitter-image.jpg"
          }
        }}
        structuredData={structuredData}
        canonical="https://pharaonicpillows.com/blog"
      />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-blue-50 to-amber-100">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-amber-900/20"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-600 via-blue-600 to-amber-600 bg-clip-text text-transparent mb-6">
                رموز فرعونية خالدة
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-blue-900 mb-8">
                Eternal Pharaonic Symbols
              </h2>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                استكشف عالم الرموز المصرية القديمة الساحر واكتشف كيف تلهم هذه الرموز الخالدة تصاميم وسائد السفر المصرية الفاخرة لدينا
              </p>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto mt-4 leading-relaxed">
                Explore the fascinating world of ancient Egyptian symbols and discover how these timeless emblems inspire our premium Egyptian travel pillow designs
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Articles Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-blue-900 mb-4">
                المقالات المميزة | Featured Articles
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-blue-500 mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <ProgressiveReveal key={article.id} delay={0.1 * index}>
                  <motion.article
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group egyptian-card"
                    whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
                  >
                  <div className="relative h-48 bg-gradient-to-br from-amber-400 to-blue-600 flex items-center justify-center">
                    <div className="text-6xl text-white/80 group-hover:scale-110 transition-transform duration-300">
                      {getSymbolIcon(article.symbol.name)}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-sm font-medium">{article.readingTime} min</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {article.arabicTitle}
                    </h3>
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">
                      {article.title}
                    </h4>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <EgyptianTags 
                      tags={article.tags} 
                      maxTags={2} 
                      variant="default"
                    />
                      <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center text-blue-600 hover:text-amber-600 font-medium transition-colors"
                      >
                        اقرأ المزيد
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  </motion.article>
                </ProgressiveReveal>
              ))}
            </div>
          </div>
        </section>

        {/* All Articles Section */}
        <section className="py-16 px-4 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-blue-900 mb-4">
                جميع المقالات | All Articles
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-blue-500 mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {articles.map((article, index) => (
                <ProgressiveReveal key={article.id} delay={0.1 * index}>
                  <motion.article
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group egyptian-card"
                    whileHover={{ scale: 1.02 }}
                  >
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-400 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                      {getSymbolIcon(article.symbol.name)}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-blue-900 mb-1 group-hover:text-amber-600 transition-colors">
                        {article.arabicTitle}
                      </h3>
                      <h4 className="text-md font-semibold text-gray-700 mb-2">
                        {article.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {article.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                          <span>{article.readingTime} min</span>
                          <span>{article.symbol.historicalPeriod}</span>
                        </div>
                        <Link
                          href={`/blog/${article.slug}`}
                          className="text-blue-600 hover:text-amber-600 font-medium text-sm transition-colors"
                        >
                          اقرأ المقال
                        </Link>
                      </div>
                    </div>
                  </div>
                  </motion.article>
                </ProgressiveReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <EgyptianCTA
          arabicTitle="اكتشف مجموعة الوسائد المصرية الفاخرة"
          title="Discover Our Premium Egyptian Travel Pillow Collection"
          arabicDescription="استمتع بالراحة الفائقة مع وسائد السفر المصرية المصنوعة من الميموري فوم والمستوحاة من الرموز الفرعونية الخالدة"
          description="Experience ultimate comfort with our Egyptian travel pillows made from memory foam and inspired by timeless Pharaonic symbols"
          primaryButton={{
            arabicText: 'تسوق الآن',
            text: 'Shop Now',
            href: '/products',
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            )
          }}
          variant="gradient"
          symbolIcon="𓆣"
        />
      </div>
    </>
  );
}

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

export const getStaticProps: GetStaticProps = async () => {
  const articles = PHARAONIC_SYMBOLS_ARTICLES;
  const featuredArticles = getFeaturedArticles();

  return {
    props: {
      articles,
      featuredArticles,
    },
    revalidate: 86400, // Revalidate once per day
  };
};