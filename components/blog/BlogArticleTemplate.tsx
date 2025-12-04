import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiClock, FiUser, FiCalendar, FiShare2, FiBookmark } from 'react-icons/fi';
import ReadingProgress from '@/components/ReadingProgress';

interface BlogArticle {
  id: string;
  title: string;
  arabicTitle?: string;
  slug: string;
  description: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  publishDate: string;
  readingTime: number;
  category: string;
  tags: string[];
  featuredImage?: {
    url: string;
    alt: string;
    caption?: string;
  };
  symbol?: {
    name: string;
    arabicName?: string;
    icon: string;
  };
}

interface InternalLink {
  text: string;
  url: string;
  type: 'product' | 'article' | 'category' | 'page';
}

interface FAQItem {
  question: string;
  arabicQuestion?: string;
  answer: string;
  arabicAnswer?: string;
}

interface BlogArticleTemplateProps {
  article: BlogArticle;
  internalLinks?: InternalLink[];
  faqItems?: FAQItem[];
  relatedArticles?: BlogArticle[];
  showTableOfContents?: boolean;
  showSocialShare?: boolean;
}

export default function BlogArticleTemplate({
  article,
  internalLinks = [],
  faqItems = [],
  relatedArticles = [],
  showTableOfContents = true,
  showSocialShare = true
}: BlogArticleTemplateProps) {
  const [activeSection, setActiveSection] = useState('');
  const [tableOfContents, setTableOfContents] = useState<{ id: string; text: string; level: number }[]>([]);

  // Extract headings for table of contents
  useEffect(() => {
    const content = document.querySelector('.article-content');
    if (!content) return;

    const headings = content.querySelectorAll('h2, h3');
    const toc = Array.from(headings).map((heading, index) => ({
      id: heading.id || `section-${index}`,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.substring(1))
    }));

    setTableOfContents(toc);

    // Set IDs for headings if not present
    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `section-${index}`;
      }
    });
  }, [article.content]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('.article-content h2, .article-content h3');
      let current = '';

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          current = heading.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Reading Progress Bar */}
      <ReadingProgress />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Table of Contents - Sidebar */}
          {showTableOfContents && tableOfContents.length > 0 && (
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-4">
                  Table of Contents | جدول المحتويات
                </h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`
                        block text-sm transition-colors
                        ${item.level === 3 ? 'pl-4' : ''}
                        ${activeSection === item.id
                          ? 'text-amber-600 font-semibold'
                          : 'text-gray-600 hover:text-gray-900'
                        }
                      `}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Main Article Content */}
          <article className="lg:col-span-9">
            {/* Article Header */}
            <header className="mb-8 pb-8 border-b-2 border-gray-200">
              {/* Category Badge */}
              <div className="mb-4">
                <Link
                  href={`/blog?category=${article.category}`}
                  className="inline-block px-4 py-1 bg-amber-100 text-amber-800 text-sm font-semibold uppercase tracking-wider hover:bg-amber-200 transition-colors"
                >
                  {article.category}
                </Link>
              </div>

              {/* Main Title (H1) */}
              {article.arabicTitle && (
                <h1
                  className="text-4xl md:text-5xl font-bold text-black mb-4 leading-tight"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                  dir="rtl"
                  lang="ar"
                >
                  {article.arabicTitle}
                </h1>
              )}
              <h1
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {article.title}
              </h1>

              {/* Article Metadata */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FiUser className="w-4 h-4" />
                  <span>{article.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  <time dateTime={article.publishDate}>
                    {new Date(article.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock className="w-4 h-4" />
                  <span>{article.readingTime} min read</span>
                </div>
              </div>

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${tag}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Social Share Buttons */}
              {showSocialShare && (
                <div className="flex items-center gap-4 mt-6">
                  <span className="text-sm font-semibold text-gray-700">Share:</span>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Share article"
                  >
                    <FiShare2 className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Bookmark article"
                  >
                    <FiBookmark className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              )}
            </header>

            {/* Featured Image */}
            {article.featuredImage && (
              <figure className="mb-8">
                <div className="relative h-96 bg-gradient-to-br from-amber-100 to-blue-100 flex items-center justify-center border-4 border-black">
                  {article.symbol && (
                    <div className="text-9xl">{article.symbol.icon}</div>
                  )}
                </div>
                {article.featuredImage.caption && (
                  <figcaption className="mt-2 text-sm text-gray-600 text-center italic">
                    {article.featuredImage.caption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Article Content */}
            <div
              className="article-content prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: formatArticleContent(article.content) }}
            />

            {/* Internal Links Section */}
            {internalLinks.length > 0 && (
              <InternalLinksSection links={internalLinks} />
            )}

            {/* FAQ Section */}
            {faqItems.length > 0 && (
              <FAQSection items={faqItems} />
            )}

            {/* Author Bio */}
            {article.author.bio && (
              <AuthorBio author={article.author} />
            )}

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <RelatedArticlesSection articles={relatedArticles} />
            )}
          </article>
        </div>
      </div>
    </div>
  );
}

// Internal Links Section Component
function InternalLinksSection({ links }: { links: InternalLink[] }) {
  return (
    <section className="my-12 p-6 bg-gradient-to-r from-amber-50 to-blue-50 rounded-2xl border border-amber-200">
      <h3 className="text-xl font-bold text-blue-900 mb-4">
        Related Links | روابط ذات صلة
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <span className="text-2xl">{getLinkIcon(link.type)}</span>
            <span className="text-gray-700 hover:text-amber-600 transition-colors">
              {link.text}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// FAQ Section Component
function FAQSection({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold text-black mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
        Frequently Asked Questions | الأسئلة الشائعة
      </h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border-2 border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex justify-between items-center"
            >
              <span>{item.question}</span>
              <svg
                className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50 border-t-2 border-gray-200">
                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                {item.arabicAnswer && (
                  <p className="text-gray-700 leading-relaxed mt-3" dir="rtl" lang="ar">
                    {item.arabicAnswer}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Author Bio Component
function AuthorBio({ author }: { author: { name: string; avatar?: string; bio?: string } }) {
  return (
    <section className="my-12 p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">About the Author | عن الكاتب</h3>
      <div className="flex items-start gap-4">
        {author.avatar && (
          <img
            src={author.avatar}
            alt={author.name}
            className="w-16 h-16 rounded-full border-2 border-amber-500"
          />
        )}
        <div>
          <h4 className="font-bold text-gray-900 mb-2">{author.name}</h4>
          <p className="text-gray-700 text-sm leading-relaxed">{author.bio}</p>
        </div>
      </div>
    </section>
  );
}

// Related Articles Component
function RelatedArticlesSection({ articles }: { articles: BlogArticle[] }) {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold text-black mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
        Related Articles | مقالات ذات صلة
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <Link key={article.id} href={`/blog/${article.slug}`}>
            <motion.article
              whileHover={{ y: -5 }}
              className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-amber-500 transition-colors"
            >
              <div className="h-48 bg-gradient-to-br from-gray-100 to-amber-50 flex items-center justify-center">
                {article.symbol && (
                  <div className="text-6xl">{article.symbol.icon}</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {article.description}
                </p>
                <div className="mt-3 text-xs text-gray-500">
                  {article.readingTime} min read
                </div>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Helper Functions
function formatArticleContent(content: string): string {
  return content
    .replace(/## (.*)/g, '<h2 id="$1" class="text-3xl font-bold text-black mt-8 mb-4">$1</h2>')
    .replace(/### (.*)/g, '<h3 id="$1" class="text-2xl font-semibold text-gray-900 mt-6 mb-3">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">')
    .replace(/^/, '<p class="mb-4 text-gray-700 leading-relaxed">')
    .replace(/$/, '</p>');
}

function getLinkIcon(type: string): string {
  const icons: { [key: string]: string } = {
    product: '🏺',
    article: '📜',
    category: '📦',
    page: '🔗'
  };
  return icons[type] || '🔗';
}
