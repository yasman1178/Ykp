import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { FaCalendarAlt, FaClock, FaUser, FaArrowRight, FaArrowLeft, FaQuestionCircle, FaBoxes } from 'react-icons/fa';
import { B2B_ARTICLES, B2BArticle } from '@/data/b2b-12-articles';
import { PHARAONIC_SYMBOLS_ARTICLES } from '@/data/blog-articles';

interface UnifiedArticle {
  slug: string;
  title: string;
  category: string;
  description: string;
  readTime: string;
  date: string;
  image: string;
  author: string;
  content: string;
  faqs?: { q: string; a: string }[];
}

interface ArticlePageProps {
  article: UnifiedArticle;
  relatedArticles: UnifiedArticle[];
}

export default function ArticleDetailPage({ article, relatedArticles }: ArticlePageProps) {
  const router = useRouter();
  const isRTL = router.locale === 'ar';
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  if (router.isFallback) {
    return <div className="p-20 text-center text-white">Loading article...</div>;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ykp-eg.com';
  const canonicalUrl = `${siteUrl}/blog/${article.slug}`;

  return (
    <Layout
      pageTitle={`${article.title} | YKP Supplies B2B Insights`}
      metaDescription={article.description}
      canonicalUrl={canonicalUrl}
      ogImage={article.image}
    >
      {/* Schema.org Article Structured Data */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": article.title,
              "description": article.description,
              "image": article.image.startsWith('http') ? article.image : `${siteUrl}${article.image}`,
              "datePublished": "2026-03-01T08:00:00+02:00",
              "dateModified": "2026-03-01T08:00:00+02:00",
              "author": {
                "@type": "Organization",
                "name": article.author || "YKP Supplies"
              },
              "publisher": {
                "@type": "Organization",
                "name": "YKP Supplies",
                "logo": {
                  "@type": "ImageObject",
                  "url": `${siteUrl}/logo.png`
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": canonicalUrl
              }
            })
          }}
        />
        {article.faqs && article.faqs.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": article.faqs.map(f => ({
                  "@type": "Question",
                  "name": f.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f.a
                  }
                }))
              })
            }}
          />
        )}
      </Head>

      {/* Breadcrumb Header */}
      <div className="py-4 border-b border-slate-800 bg-[#070C18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Link href="/" className="hover:text-white transition-colors">{isRTL ? 'الرئيسية' : 'Home'}</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">{isRTL ? 'المدونة' : 'Blog'}</Link>
            <span>/</span>
            <span className="text-[#D4AF37] font-semibold truncate max-w-sm">{article.category}</span>
          </nav>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Article Meta */}
        <div className="space-y-4 mb-8">
          <span className="inline-block px-3 py-1 rounded bg-[#D4AF37]/10 text-[#D4AF37] font-mono text-xs font-bold border border-[#D4AF37]/20">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2 border-b border-slate-800 pb-6">
            <span className="flex items-center gap-1.5"><FaUser className="text-[#D4AF37]" /> {article.author}</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-[#D4AF37]" /> {article.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><FaClock className="text-[#D4AF37]" /> {article.readTime}</span>
          </div>
        </div>

        {/* Featured Banner */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mb-12 relative aspect-[16/9] bg-slate-950">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Prose Content */}
        <div
          className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6 [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:tracking-tight [&>h2]:pt-6 [&>h2]:border-t [&>h2]:border-slate-800/80 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-white [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul>li]:text-slate-300"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Embedded FAQs */}
        {article.faqs && article.faqs.length > 0 && (
          <div className="mt-14 pt-10 border-t border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FaQuestionCircle className="text-[#D4AF37]" />
              <span>Frequently Asked Questions</span>
            </h3>
            <div className="space-y-4">
              {article.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <h4 className="text-sm font-semibold text-white">{faq.q}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contextual B2B Conversion Box */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0F1D40] to-slate-900 border border-[#D4AF37]/30 shadow-2xl space-y-4">
          <span className="text-xs font-mono uppercase text-[#D4AF37] font-semibold tracking-wider">
            Direct Manufacturer Procurement
          </span>
          <h3 className="text-2xl font-bold text-white">
            Looking for a Reliable Travel Pillow Manufacturer?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            YKP Supplies manufactures certified 50D memory foam travel pillows, custom OEM private label lines, and authentic Egyptian heritage retail gifts directly from New Cairo with direct export to global seaports.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/request-a-quote"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md shadow-[#D4AF37]/20"
            >
              REQUEST A WHOLESALE QUOTE
            </Link>
            <Link
              href="/wholesale-travel-pillows"
              className="text-xs font-semibold text-slate-300 hover:text-white underline underline-offset-4"
            >
              Inspect Wholesale Terms & MOQs →
            </Link>
          </div>
        </div>

        {/* Related Articles Strip */}
        {relatedArticles && relatedArticles.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6">Related Industry Guides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-[#D4AF37]/40 p-4 transition-all block group"
                >
                  <span className="text-[10px] font-mono uppercase text-[#D4AF37] block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="text-xs font-bold text-white line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                    {rel.title}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono mt-2 block">Read Guide →</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const b2bPaths = B2B_ARTICLES.map((a) => ({
    params: { slug: a.slug }
  }));

  const legacyPaths = PHARAONIC_SYMBOLS_ARTICLES.map((a) => ({
    params: { slug: a.slug }
  }));

  return {
    paths: [...b2bPaths, ...legacyPaths],
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  // 1. Check in B2B articles
  const b2bArt = B2B_ARTICLES.find((a) => a.slug === slug);
  if (b2bArt) {
    const related = B2B_ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);
    return {
      props: {
        article: b2bArt,
        relatedArticles: related
      }
    };
  }

  // 2. Check in legacy articles
  const legacyArt = PHARAONIC_SYMBOLS_ARTICLES.find((a) => a.slug === slug);
  if (legacyArt) {
    const adapted: UnifiedArticle = {
      slug: legacyArt.slug,
      title: legacyArt.title,
      category: legacyArt.category || 'Egyptian Heritage',
      description: legacyArt.description || '',
      readTime: `${legacyArt.readingTime || 5} min read`,
      date: legacyArt.publishDate || '2026',
      image: '/prodect/tb/1.webp',
      author: typeof legacyArt.author === 'string' ? legacyArt.author : 'YKP Supplies Heritage Desk',
      content: legacyArt.content,
      faqs: legacyArt.faqs?.map((f) => ({ q: f.question, a: f.answer })) || []
    };

    const related = PHARAONIC_SYMBOLS_ARTICLES.filter((a) => a.slug !== slug)
      .slice(0, 3)
      .map((a) => ({
        slug: a.slug,
        title: a.title,
        category: a.category || 'Egyptian Heritage',
        description: a.description || '',
        readTime: `${a.readingTime || 5} min read`,
        date: a.publishDate || '2026',
        image: '/prodect/tb/1.webp',
        author: typeof a.author === 'string' ? a.author : 'YKP Supplies',
        content: a.content
      }));

    return {
      props: {
        article: adapted,
        relatedArticles: related
      }
    };
  }

  return { notFound: true };
};