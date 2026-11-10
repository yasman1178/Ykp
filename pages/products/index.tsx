import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import { FaSearch, FaFilter, FaArrowRight, FaArrowLeft, FaCheck, FaBoxes } from 'react-icons/fa';
import { ALL_PRODUCTS } from '@/data/products';
import { getProductImageSeo } from '@/lib/product-image-seo';

export default function ProductsCatalogPage() {
  const router = useRouter();
  const isRTL = router.locale === 'ar';
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [customizableOnly, setCustomizableOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    if (selectedCollection !== 'all') {
      result = result.filter((p) => {
        if (selectedCollection === 'heritage') return p.collection === 'tb';
        if (selectedCollection === 'premium') return p.collection === 'b123';
        if (selectedCollection === 'classic') return p.collection === 't';
        if (selectedCollection === 'custom') return (p.collection as string) === 'print' || p.id.includes('print');
        if (selectedCollection === 'souvenirs') return p.collection === 'souvenirs';
        return (p.collection as string) === selectedCollection;
      });
    }

    if (selectedMaterial !== 'all') {
      result = result.filter((p) => {
        const mat = (p.specifications?.materials?.core || '').toLowerCase();
        if (selectedMaterial === 'memory-foam') return mat.includes('memory') || mat.includes('viscoelastic');
        if (selectedMaterial === 'polyfill') return mat.includes('polyfill') || mat.includes('cotton');
        return true;
      });
    }

    if (customizableOnly) {
      result = result.filter((p) => (p as any).collection === 'print' || p.id.includes('camel') || p.id.includes('print') || (p.specifications as any)?.warranty);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const seo = getProductImageSeo(p.primaryImage);
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          seo.modelCode.toLowerCase().includes(q) ||
          (p.sku && p.sku.toLowerCase().includes(q))
        );
      });
    }

    return result;
  }, [selectedCollection, selectedMaterial, customizableOnly, searchQuery]);

  return (
    <Layout
      pageTitle="Travel Pillow Collections | Wholesale & Custom Manufacturing | YKP Supplies"
      metaDescription="Explore premium travel pillows and Egyptian-inspired travel products available for wholesale, distribution and custom manufacturing. Proudly made in Cairo, Egypt."
      canonicalUrl="https://www.ykp-eg.com/products"
    >
      {/* Header Banner */}
      <div className="bg-[#070C18] border-b border-slate-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'كتالوج المصنع B2B' : 'Manufacturer Wholesale Catalog'}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-2 text-balance">
              Travel Pillow Collections
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
              «Explore premium travel pillows and Egyptian-inspired travel products available for wholesale, distribution and custom manufacturing.»
            </p>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900/90 border-b border-slate-800 sticky top-20 z-30 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <input
                type="text"
                placeholder={isRTL ? 'ابحث برمز الموديل أو الكلمة...' : 'Search model code or keyword...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
              <FaSearch className="absolute left-3 top-3 text-slate-500 text-xs" />
            </div>

            {/* Collection Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {[
                { id: 'all', label: isRTL ? 'الكل' : 'All Collections' },
                { id: 'heritage', label: isRTL ? 'التراث الفرعوني' : 'Egyptian Heritage' },
                { id: 'premium', label: isRTL ? 'ميموري فوم فاخر' : 'Premium 50D' },
                { id: 'classic', label: isRTL ? 'كلاسيك' : 'Classic' },
                { id: 'souvenirs', label: isRTL ? 'الجمل المحبوب' : 'Beloved Camel' },
                { id: 'custom', label: isRTL ? 'تصنيع خاص' : 'Custom OEM' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCollection(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCollection === tab.id
                      ? 'bg-[#D4AF37] text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Material & Customizable Toggles */}
            <div className="flex items-center gap-3">
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="all">All Materials</option>
                <option value="memory-foam">Molded Memory Foam</option>
                <option value="polyfill">Soft Polyfill Plush</option>
              </select>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={customizableOnly}
                  onChange={(e) => setCustomizableOnly(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-[#D4AF37] focus:ring-0"
                />
                <span>Customizable</span>
              </label>
            </div>

          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Showing {filteredProducts.length} verified B2B models</span>
          <span>MOQ: 50 – 130 units · Export pallets</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const seo = getProductImageSeo(product.primaryImage);
            const moq = (product.price as any)?.minimumOrderQuantity || (product.pricing as any)?.wholesale?.[0]?.minQuantity || 50;
            const modelCode = seo.modelCode || product.sku || product.id.toUpperCase();

            return (
              <div
                key={product.id}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="relative h-60 bg-slate-950 overflow-hidden">
                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950/90 text-[#D4AF37] border border-[#D4AF37]/30">
                        {modelCode}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {product.shortDescription || product.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/80">
                      <span>MOQ: <strong className="text-white">{moq} pcs</strong></span>
                      <span className="text-emerald-400">Export Ready</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 space-y-2">
                  <Link
                    href={`/request-a-quote?product=${encodeURIComponent(product.name + ' (' + modelCode + ')')}`}
                    className="block text-center w-full py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs hover:brightness-110 transition-all uppercase tracking-wider"
                  >
                    REQUEST WHOLESALE PRICE
                  </Link>

                  <Link
                    href={`/products/${product.collection || 'catalog'}/${product.id}`}
                    className="block text-center w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                  >
                    View Specifications →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 space-y-4">
            <FaBoxes className="mx-auto text-4xl text-slate-600" />
            <h3 className="text-lg font-bold text-white">No products matched your criteria</h3>
            <p className="text-xs text-slate-400">Try clearing your filters or search terms</p>
            <button
              onClick={() => {
                setSelectedCollection('all');
                setSelectedMaterial('all');
                setCustomizableOnly(false);
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#D4AF37] text-slate-950 font-semibold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Bottom B2B Callout */}
      <div className="bg-[#070C18] border-t border-slate-800 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Need a Custom Mold, Private Label Packaging, or Full Container Order?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Our New Cairo facility supports complete OEM/ODM production runs, custom embroidery patterns, and direct sea/air freight documentation.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/request-a-quote"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
            >
              Request Custom Project Quote
            </Link>
            <Link
              href="/manufacturing"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
            >
              Inspect Manufacturing Process
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      locale,
    },
  };
};