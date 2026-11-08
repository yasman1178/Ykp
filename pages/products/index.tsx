import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaWhatsapp, FaArrowRight, FaArrowLeft, FaLayerGroup } from 'react-icons/fa';
import SEO from '@/components/SEO';
import { getStaticPropsWithTranslations } from '@/lib/translations';
import { ALL_PRODUCTS, COLLECTION_SUMMARIES } from '@/data/products';
import { getProductImageSeo, LUXURY_COLLECTION_MAP } from '@/lib/product-image-seo';

interface ProductsPageProps {
  translations: any;
  locale: string;
}

export default function ProductsPage({ translations: t, locale }: ProductsPageProps) {
  const router = useRouter();
  const isRTL = locale === 'ar';
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    if (selectedCollection !== 'all') {
      result = result.filter(p => {
        if (selectedCollection === 'royal') return p.collection === 'b123';
        if (selectedCollection === 'sacred') return p.collection === 't';
        if (selectedCollection === 'heritage') return p.collection === 'tb';
        if (selectedCollection === 'custom') return (p.collection as string) === 'print' || p.id.includes('print');
        return (p.collection as string) === selectedCollection;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => {
        const seo = getProductImageSeo(p.primaryImage);
        return (
          p.name.toLowerCase().includes(q) ||
          seo.titleEn.toLowerCase().includes(q) ||
          seo.titleAr.includes(q) ||
          seo.modelCode.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      });
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.pricing.retail.min - b.pricing.retail.min);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.pricing.retail.min - a.pricing.retail.min);
    }

    return result;
  }, [selectedCollection, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#07090C] text-slate-100 selection:bg-[#D4AF37] selection:text-black" dir={isRTL ? 'rtl' : 'ltr'}>
      <SEO
        title={isRTL ? 'كتالوج مخدات السفر الفرعونية (80+ مخدة) | YKP Supplies' : 'Egyptian Pharaonic Travel Pillows Catalog (80+ Models) | YKP Supplies'}
        description={isRTL
          ? 'تصفح الكتالوج الكامل لمخدات السفر الفرعونية المصنعة من رغوة الذاكرة الطبية بمصنعنا في القاهرة الجديدة. متاحة للتوريد بالجملة B2B وللطلب الفردي المباشر.'
          : 'Browse our complete catalog of 80+ Egyptian travel pillows. Memory foam cervical comfort with authentic pharaonic motifs. Available for wholesale B2B export and individual retail.'}
        canonicalUrl="https://www.ykp-eg.com/products"
        ogImage="/prodect/b123/1.webp"
      />

      {/* Catalog Hero Banner */}
      <section className="relative pt-12 pb-14 bg-gradient-to-b from-[#11141C] to-[#07090C] border-b border-amber-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono font-semibold block mb-3">
            {isRTL ? 'كتالوج المنتجات الرسمي 2026' : 'Official Travel Pillow Collection 2026'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight mb-4">
            {isRTL ? 'مخدات السفر الفرعونية: الفخامة والدعم الطبي' : 'Authentic Egyptian Travel Pillows'}
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isRTL
              ? 'أكثر من 80 تصميماً حصرياً مستوحى من كنوز الفراعنة ومعابد الأقصر والكرنك، صُنعت بأعلى معايير الميموري فوم الطبي بمصنعنا في القاهرة الجديدة.'
              : 'Over 80 unique models inspired by Luxor, Karnak, and royal pharaonic treasures. Manufactured with CertiPUR certified memory foam for flights and journeys.'}
          </p>

          {/* Quick Dual Pathways Announcement */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <Link
              href="/wholesale"
              className="px-4 py-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors"
            >
              {isRTL ? '📦 لطلبيات الجملة والتصدير (B2B)' : '📦 Wholesale & OEM B2B Portal'}
            </Link>
            <Link
              href="/retail"
              className="px-4 py-2 rounded-lg bg-emerald-950/40 border border-emerald-600/40 text-emerald-300 hover:bg-emerald-900/30 transition-colors"
            >
              {isRTL ? '🛍️ لشراء قطعة شخصية (تجزئة)' : '🛍️ Buy Single Piece (Retail Fast-Track)'}
            </Link>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar Workspace */}
      <section className="sticky top-20 z-30 bg-[#0B0D11]/95 backdrop-blur-md border-b border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Segmented Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {[
                { id: 'all', labelEn: 'All Models', labelAr: 'الكل' },
                { id: 'royal', labelEn: 'Royal (B123)', labelAr: 'الملكية الفرعونية' },
                { id: 'sacred', labelEn: 'Sacred (T)', labelAr: 'الرموز والمقدسات' },
                { id: 'heritage', labelEn: 'Heritage (TB)', labelAr: 'النقوش والبرديات' },
                { id: 'custom', labelEn: 'Custom / OEM', labelAr: 'المخصصة للفنادق' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCollection(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCollection === tab.id
                      ? 'bg-[#D4AF37] text-black font-bold'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {isRTL ? tab.labelAr : tab.labelEn}
                </button>
              ))}
            </div>

            {/* Search Input & Sort Controls */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-grow sm:w-64">
                <FaSearch className="absolute top-3 left-3 text-slate-500 text-xs" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isRTL ? 'ابحث باسم الرمز، الموديل...' : 'Search model, symbol...'}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="featured">{isRTL ? 'الترتيب: الافتراضي' : 'Sort: Featured'}</option>
                <option value="price-asc">{isRTL ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
                <option value="price-desc">{isRTL ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
              </select>
            </div>

          </div>
        </div>
      </section>

      {/* Product Grid Results */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 text-xs text-slate-400">
          <span>
            {isRTL
              ? `عرض ${filteredProducts.length} من إجمالي ${ALL_PRODUCTS.length} مخدة سفر`
              : `Showing ${filteredProducts.length} of ${ALL_PRODUCTS.length} travel pillows`}
          </span>
          <span className="font-mono text-[#D4AF37]">
            {isRTL ? 'تصنيع محلي في مصر • تصدير مباشر' : 'Made in Egypt • Direct Export'}
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <div className="text-4xl">𓂀</div>
            <h3 className="text-lg font-bold text-white">{isRTL ? 'لم يتم العثور على نتائج مطابقة' : 'No pillows found'}</h3>
            <p className="text-xs text-slate-400">{isRTL ? 'جرب البحث بكلمة أخرى أو اختر مجموعة مختلفة.' : 'Try adjusting your search terms or filter selections.'}</p>
            <button
              onClick={() => { setSelectedCollection('all'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-lg bg-slate-800 text-xs text-white hover:bg-slate-700"
            >
              {isRTL ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((pillow) => {
              const imageSeo = getProductImageSeo(pillow.primaryImage);
              return (
                <div
                  key={pillow.id}
                  className="rounded-2xl bg-[#0E1118] border border-slate-800/90 hover:border-[#D4AF37]/50 p-4 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-black group"
                >
                  {/* Pillow Image Frame */}
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-950 mb-3 border border-slate-900">
                    <Image
                      src={pillow.primaryImage}
                      alt={imageSeo.altEn}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-[#D4AF37]">
                      {imageSeo.modelCode}
                    </div>
                  </div>

                  {/* Pillow Content */}
                  <div className="flex flex-col flex-grow space-y-2">
                    <div className="text-[10px] uppercase font-mono text-slate-500">
                      {isRTL ? imageSeo.collectionNameAr : imageSeo.collectionNameEn}
                    </div>
                    
                    <h3 className="text-sm font-bold text-white font-serif line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                      {isRTL ? imageSeo.titleAr : imageSeo.titleEn}
                    </h3>
                    
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed flex-grow">
                      {isRTL ? imageSeo.culturalStoryAr : imageSeo.culturalStoryEn}
                    </p>

                    {/* Pricing & Actions */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block">{isRTL ? 'سعر التجزئة' : 'Retail'}</span>
                        <span className="text-white font-mono font-bold">${pillow.pricing.retail.min}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Link
                          href="/retail"
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium"
                          title={isRTL ? 'طلب قطعة شخصية' : 'Order single piece'}
                        >
                          {isRTL ? 'تجزئة' : 'Retail'}
                        </Link>
                        <Link
                          href="/wholesale"
                          className="px-2.5 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#B8860B] text-black text-[11px] font-bold"
                          title={isRTL ? 'طلب عرض سعر جملة' : 'Request B2B quote'}
                        >
                          {isRTL ? 'جملة' : 'Quote'}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Bottom B2B Callout */}
      <section className="py-16 bg-[#0B0D11] border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white font-serif">
            {isRTL ? 'هل تحتاج إلى تصنيع خاص بعلامتك التجارية؟' : 'Custom OEM & Private Label Production'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            {isRTL
              ? 'نوفر خيارات تطريز اللوجو الخاص، وتخصيص كثافة الفوم، وتغليف الهدايا لخطوط الطيران والفنادق العالمية بأسعار المصنع المباشرة.'
              : 'We provide full custom embroidery, foam density calibration, and luxury retail gift boxes for international airlines, hospitality chains, and private distributors.'}
          </p>
          <div className="pt-2">
            <Link
              href="/wholesale"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold text-xs hover:opacity-90 transition-opacity"
            >
              <span>{isRTL ? 'طلب استشارة تصنيع وتوريد' : 'Contact OEM Manufacturing Team'}</span>
              <Arrow className="text-xs" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return getStaticPropsWithTranslations(locale);
};