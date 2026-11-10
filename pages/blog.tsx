import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { FaSearch, FaArrowRight, FaArrowLeft, FaBookOpen } from 'react-icons/fa';
import { B2B_ARTICLES, B2BArticle } from '@/data/b2b-12-articles';

export default function BlogListingPage() {
  const router = useRouter();
  const isRTL = router.locale === 'ar';
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Manufacturing', 'Wholesale', 'Private Label', 'Travel Industry', 'Egyptian Heritage'];

  const filteredArticles = useMemo(() => {
    let result = [...B2B_ARTICLES];

    if (activeCategory !== 'All') {
      result = result.filter((a) => a.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  return (
    <Layout
      pageTitle="Travel Pillow Manufacturing & Wholesale Blog | YKP Supplies"
      metaDescription="Industry guides, manufacturing walkthroughs, wholesale strategies, and private label insights from Egyptian travel pillow manufacturer YKP Supplies."
      canonicalUrl="https://www.ykp-eg.com/blog"
    >
      <div className="bg-[#070C18] border-b border-slate-800 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'المركز المعرفي للصناعة والتصدير' : 'B2B Knowledge & Industry Insights'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Travel Pillow Manufacturing & Wholesale Insights
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Explore in-depth engineering analyses, wholesale sourcing strategies, export shipping procedures, and market trends written by our Cairo manufacturing team.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Category Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 sticky top-20 z-30 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search guides and topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
            />
            <FaSearch className="absolute left-3 top-3 text-slate-500 text-xs" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#D4AF37] text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <article
              key={art.slug}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="relative h-52 bg-slate-950 overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 rounded bg-[#0B132B]/90 text-[10px] font-mono font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                    <span>{art.date}</span>
                    <span>·</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h2 className="text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                    <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                  </h2>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {art.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${art.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:underline"
                >
                  <span>Read Complete Guide</span>
                  <Arrow className="text-[10px]" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom B2B Inquiry Banner */}
      <div className="bg-[#070C18] border-t border-slate-800 py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Have a Specific Sourcing Question for Our Engineers?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Reach our Cairo manufacturing desk for custom advice on foam formulations, container cube utilization, and private label execution.
          </p>
          <div className="pt-2">
            <Link
              href="/request-a-quote"
              className="inline-block px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
            >
              REQUEST A WHOLESALE QUOTE
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
