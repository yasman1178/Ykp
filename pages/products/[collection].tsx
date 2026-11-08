import React, { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaArrowLeft, FaFilter, FaSearch, FaWhatsapp } from 'react-icons/fa';
import SEO from '@/components/SEO';
import { productService } from '@/lib/product-service';
import type { Product, ProductCollection } from '@/types/product';
import { getTranslations } from '@/lib/translations';
import { getProductImageSeo, LUXURY_COLLECTION_MAP } from '@/lib/product-image-seo';

interface CollectionPageProps {
  collection: ProductCollection;
  products: Product[];
  collectionId: string;
  translations: any;
  locale: string;
}

export default function CollectionPage({
  collection,
  products: initialProducts,
  collectionId,
  translations: t,
  locale
}: CollectionPageProps) {
  const isRTL = locale === 'ar';
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');

  const luxuryInfo = (LUXURY_COLLECTION_MAP as any)[collectionId] || {
    nameEn: collection.name,
    nameAr: collection.name,
    badgeEn: 'Heritage Edition',
    badgeAr: 'إصدار أثري',
    taglineEn: collection.description,
    taglineAr: collection.description
  };

  useEffect(() => {
    let filtered = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => {
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

    filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price-low') return a.pricing.retail.min - b.pricing.retail.min;
      if (sortBy === 'price-high') return b.pricing.retail.max - a.pricing.retail.max;
      return 0;
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#07090C] text-slate-100 selection:bg-[#D4AF37] selection:text-black" dir={isRTL ? 'rtl' : 'ltr'}>
      <SEO
        title={`${isRTL ? luxuryInfo.nameAr : luxuryInfo.nameEn} | YKP Supplies`}
        description={isRTL ? luxuryInfo.taglineAr : luxuryInfo.taglineEn}
        canonicalUrl={`https://www.ykp-eg.com/products/${collectionId}`}
        ogImage={products[0]?.primaryImage || '/prodect/b123/1.webp'}
      />

      {/* Collection Hero */}
      <section className="relative pt-12 pb-16 bg-gradient-to-b from-[#11141C] to-[#07090C] border-b border-amber-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-mono">
            <Link href="/" className="hover:text-white transition-colors">{isRTL ? 'الرئيسية' : 'Home'}</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">{isRTL ? 'المجموعات' : 'Collections'}</Link>
            <span>/</span>
            <span className="text-[#D4AF37] font-semibold">{isRTL ? luxuryInfo.nameAr : luxuryInfo.nameEn}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-xs uppercase font-mono tracking-widest text-[#D4AF37] font-semibold mb-3 border border-[#D4AF37]/30 px-3 py-1 rounded-full bg-[#D4AF37]/5">
              {isRTL ? luxuryInfo.badgeAr : luxuryInfo.badgeEn}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight mb-4">
              {isRTL ? luxuryInfo.nameAr : luxuryInfo.nameEn}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {isRTL ? luxuryInfo.taglineAr : luxuryInfo.taglineEn}
            </p>
          </div>

          {/* Quick Dual Action Badges */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs">
            <Link
              href="/wholesale"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold hover:opacity-90 transition-opacity"
            >
              {isRTL ? 'طلب عرض سعر جملة لهذه المجموعة (B2B)' : 'Request Wholesale Quote (B2B)'}
            </Link>
            <Link
              href="/retail"
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white hover:border-[#D4AF37] transition-all"
            >
              {isRTL ? 'شراء قطعة شخصية (تجزئة)' : 'Order Single Piece (Retail)'}
            </Link>
          </div>

        </div>
      </section>

      {/* Collection Search & Filter Bar */}
      <section className="sticky top-20 z-30 bg-[#0B0D11]/95 backdrop-blur-md border-b border-slate-800 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            {isRTL
              ? `عرض ${filteredProducts.length} من أصل ${products.length} مخدة سفر`
              : `Showing ${filteredProducts.length} of ${products.length} models`}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-grow sm:w-64">
              <FaSearch className="absolute top-3 left-3 text-slate-500 text-xs" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRTL ? 'ابحث في هذه المجموعة...' : 'Search this collection...'}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="name">{isRTL ? 'الترتيب: بالاسم' : 'Sort: Name'}</option>
              <option value="price-low">{isRTL ? 'السعر: الأقل' : 'Price: Low'}</option>
              <option value="price-high">{isRTL ? 'السعر: الأعلى' : 'Price: High'}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <h3 className="text-lg font-bold text-white">{isRTL ? 'لا توجد نتائج' : 'No products found'}</h3>
            <p className="text-xs text-slate-400">{isRTL ? 'جرب البحث بكلمة مختلفة.' : 'Try adjusting your search criteria.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const imageSeo = getProductImageSeo(product.primaryImage);
              return (
                <div
                  key={product.id}
                  className="rounded-2xl bg-[#0E1118] border border-slate-800/90 hover:border-[#D4AF37]/50 p-4 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-black group"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-950 mb-3 border border-slate-900">
                    <Image
                      src={product.primaryImage}
                      alt={imageSeo.altEn}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-[#D4AF37]">
                      {imageSeo.modelCode}
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow space-y-2">
                    <h3 className="text-sm font-bold text-white font-serif line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                      {isRTL ? imageSeo.titleAr : imageSeo.titleEn}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed flex-grow">
                      {isRTL ? imageSeo.culturalStoryAr : imageSeo.culturalStoryEn}
                    </p>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block">{isRTL ? 'سعر التجزئة' : 'Retail'}</span>
                        <span className="text-white font-mono font-bold">${product.pricing.retail.min}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Link
                          href="/retail"
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium"
                        >
                          {isRTL ? 'تجزئة' : 'Retail'}
                        </Link>
                        <Link
                          href="/wholesale"
                          className="px-2.5 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#B8860B] text-black text-[11px] font-bold"
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

    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const collections = ['royal', 'sacred', 'heritage', 'b123', 't', 'tb'];

  const paths = collections.map((collection) => ({
    params: { collection }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const collectionId = params?.collection as string;

  const validCollections = ['royal', 'sacred', 'heritage', 'b123', 't', 'tb'];
  if (!validCollections.includes(collectionId)) {
    return {
      notFound: true
    };
  }

  const collection = productService.getCollection(collectionId);
  const products = productService.getProductsByCollection(collectionId);

  if (!collection) {
    return {
      notFound: true
    };
  }

  const translations = getTranslations(context.locale || 'en');

  return {
    props: {
      collection,
      products,
      collectionId,
      translations,
      locale: context.locale || 'en'
    }
  };
};