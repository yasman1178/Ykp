import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaPlaneDeparture, 
  FaIndustry, 
  FaWhatsapp, 
  FaArrowRight, 
  FaArrowLeft, 
  FaCheck, 
  FaGlobeAmericas,
  FaAward
} from 'react-icons/fa';
import SEO from '@/components/SEO';
import { getStaticPropsWithTranslations } from '@/lib/translations';
import { ALL_PRODUCTS, COLLECTION_SUMMARIES } from '@/data/products';
import { getProductImageSeo, LUXURY_COLLECTION_MAP } from '@/lib/product-image-seo';

interface HomePageProps {
  translations: any;
  locale: string;
}

export default function HomePage({ translations: t, locale }: HomePageProps) {
  const router = useRouter();
  const isRTL = locale === 'ar';
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  const [activeCollectionTab, setActiveCollectionTab] = useState<'all' | 'b123' | 't' | 'tb' | 'print'>('all');

  // Filter products for the showcase
  const showcaseProducts = activeCollectionTab === 'all'
    ? ALL_PRODUCTS.slice(0, 8)
    : ALL_PRODUCTS.filter(p => p.collection === activeCollectionTab).slice(0, 8);

  const collectionsList = [
    {
      id: 'b123',
      slug: 'royal',
      nameEn: 'Royal Pharaonic Collection',
      nameAr: 'المجموعة الملكية الفرعونية',
      badgeEn: 'Royal Atelier',
      badgeAr: 'إصدار ملكي',
      image: '/prodect/b123/1.webp',
      descEn: 'Masterpieces inspired by King Tutankhamun and Queen Nefertiti with 360° memory foam neck support.',
      descAr: 'روائع مستوحاة من كنوز توت عنخ آمون والملكة نفرتيتي مع دعم طبي متكامل لعضلات الرقبة.'
    },
    {
      id: 't',
      slug: 'sacred',
      nameEn: 'Sacred Symbols & Icons',
      nameAr: 'مجموعة الرموز والمقدسات',
      badgeEn: 'Heritage Icons',
      badgeAr: 'رموز أثرية',
      image: '/prodect/t/1.webp',
      descEn: 'Ancient protective amulets: The Ankh (Key of Life), Sacred Scarab, and Eye of Horus.',
      descAr: 'تمائم الحماية والبركة المصرية القديمة: مفتاح الحياة (عنخ)، الجعران المقدس، وعين حورس.'
    },
    {
      id: 'tb',
      slug: 'heritage',
      nameEn: 'Ancient Hieroglyphs & Papyrus',
      nameAr: 'مجموعة النقوش والبرديات الأثرية',
      badgeEn: 'Papyrus Reliefs',
      badgeAr: 'نقوش المعابد',
      image: '/prodect/tb/2.webp',
      descEn: 'Authentic temple wall inscriptions and sacred cartouches woven in soft textured fabrics.',
      descAr: 'نقوش جدران معابد الأقصر والكرنك والخرطوشة الملكية منسوجة على أقمشة قطنية متينة.'
    },
    {
      id: 'print',
      slug: 'custom',
      nameEn: 'Custom & Corporate OEM',
      nameAr: 'المجموعة المخصصة وتصنيع الفنادق',
      badgeEn: 'Private Label',
      badgeAr: 'علامات تجارية',
      image: '/prodect/Print/master.jpg',
      descEn: 'Bespoke manufacturing and custom embroidery for airlines, luxury resorts, and corporate gifts.',
      descAr: 'تصنيع خاص وتطريز فاخر مخصص لخطوط الطيران، الفنادق العالمية، وكبرى العلامات التجارية.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#07090C] text-slate-100 selection:bg-[#D4AF37] selection:text-black overflow-x-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <SEO
        title={isRTL ? 'YKP Supplies | مصنع مخدات السفر الفرعونية الفاخرة - القاهرة الجديدة' : 'YKP Supplies | Egyptian Pharaonic Travel Pillows Manufacturer New Cairo'}
        description={isRTL
          ? 'المصنع المصري الرائد في ابتكار وتصنيع مخدات السفر الطبية بعبق التراث الفرعوني. رغوة ذاكرة عالية الكثافة، قطن مصري فاخر، وطلبات جملة وتجزئة للتصدير العالمي.'
          : 'Manufacturer of luxury Egyptian Pharaonic memory foam travel pillows. High-density ergonomic support, authentic hieroglyphic artistry, and direct B2B wholesale export worldwide.'}
        canonicalUrl="https://www.ykp-eg.com"
        ogImage="/prodect/b123/1.webp"
      />

      {/* 1. Modern Luxury Hero Section */}
      <section className="relative pt-12 pb-20 md:py-28 overflow-hidden border-b border-amber-900/20 bg-gradient-to-b from-[#0F131A] via-[#0B0D11] to-[#07090C]">
        <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.12)_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Proof & Dual CTAs (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-xs text-[#D4AF37] font-mono tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                {isRTL ? 'مصنع مباشر في القاهرة الجديدة • تصدير عالمي' : 'Direct Manufacturer in New Cairo • Worldwide Export'}
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif leading-[1.15]">
                {isRTL ? (
                  <>
                    مخدات السفر الفرعونية الفاخرة
                    <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B]">
                      راحة الملوك في كل رحلة
                    </span>
                  </>
                ) : (
                  <>
                    Sovereign Pharaonic Comfort
                    <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B]">
                      For The Modern Voyager
                    </span>
                  </>
                )}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {isRTL
                  ? 'نجمع بين أسرار التراث المصري العريق وعلوم الراحة العصرية. رغوة ميموري فوم طبية عالية الكثافة مغطاة بأفخر خامات القطن المصري، صُممت لدعم الرقبة والعمود الفقري في الرحلات الطويلة.'
                  : 'Where 5,000 years of timeless Egyptian artistry meets orthopedic ergonomic science. Engineered with certified high-density memory foam and breathable Egyptian cotton to deliver unbroken rest across time zones.'}
              </p>

              {/* Dual Action Gateway: B2B Wholesale & Retail Direct */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/wholesale"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold text-sm hover:shadow-xl hover:shadow-[#D4AF37]/20 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>{isRTL ? 'اطلب عرض سعر بالجملة (B2B)' : 'Request Wholesale Quote (B2B)'}</span>
                  <Arrow className="group-hover:translate-x-1 transition-transform text-xs" />
                </Link>

                <Link
                  href="/retail"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-[#D4AF37]/50 font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>{isRTL ? 'شراء مخدة للأفراد (تجزئة)' : 'Order Single Piece (Retail)'}</span>
                </Link>
              </div>

              {/* Verified Factory Highlights */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-left">
                <div>
                  <div className="text-white font-mono text-base sm:text-lg font-bold">100%</div>
                  <div className="text-[11px] text-slate-400">{isRTL ? 'ميموري فوم معتمد' : 'Pure Memory Foam'}</div>
                </div>
                <div>
                  <div className="text-white font-mono text-base sm:text-lg font-bold">80+</div>
                  <div className="text-[11px] text-slate-400">{isRTL ? 'نقشاً فرعونياً حصرياً' : 'Heritage Designs'}</div>
                </div>
                <div>
                  <div className="text-white font-mono text-base sm:text-lg font-bold">0%</div>
                  <div className="text-[11px] text-slate-400">{isRTL ? 'وسطاء • أسعار المصنع' : 'Zero Middlemen'}</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Showcase Visual (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-black p-4 border border-amber-900/30 shadow-2xl shadow-black">
                <Image
                  src="/prodect/b123/1.webp"
                  alt="Royal Tutankhamun Memory Foam Travel Pillow by YKP Supplies New Cairo"
                  fill
                  className="object-contain p-4 hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 1024px) 90vw, 40vw"
                />
                
                {/* Product Card Floating Info Bar */}
                <div className="absolute inset-x-4 bottom-4 p-3.5 rounded-2xl bg-black/80 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#D4AF37] tracking-wider block">
                      {isRTL ? 'المجموعة الملكية' : 'Royal Atelier Edition'}
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {isRTL ? 'مخدة توت عنخ آمون الذهبية' : 'Golden Tutankhamun Model'}
                    </span>
                  </div>
                  <Link
                    href="/retail"
                    className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-black font-bold text-xs hover:bg-[#F3E5AB] transition-colors"
                  >
                    {isRTL ? 'طلب فوري' : 'Buy Now'}
                  </Link>
                </div>
              </div>

              {/* Secondary Accent Badge */}
              <div className="hidden sm:flex absolute -top-4 -right-4 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl items-center gap-2 text-xs">
                <FaAward className="text-[#D4AF37] text-base" />
                <span className="text-slate-200 font-medium">{isRTL ? 'قطن مصري ناعم وفاخر' : 'Egyptian Cotton Jacquard'}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Manufacturing Proof & Trust Bar */}
      <section className="py-8 bg-[#090C10] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center justify-center p-3">
              <FaIndustry className="text-[#D4AF37] text-2xl mb-2" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">{isRTL ? 'مصنع مباشر في مصر' : 'Direct Manufacturer'}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{isRTL ? 'القاهرة الجديدة، بدون وسطاء' : 'New Cairo Facility'}</p>
            </div>
            <div className="flex flex-col items-center justify-center p-3">
              <FaShieldAlt className="text-[#D4AF37] text-2xl mb-2" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">{isRTL ? 'ميموري فوم معتمد' : 'CertiPUR Memory Foam'}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{isRTL ? 'كثافة عالية وارتداد صحي' : 'High Resilience Core'}</p>
            </div>
            <div className="flex flex-col items-center justify-center p-3">
              <FaGlobeAmericas className="text-[#D4AF37] text-2xl mb-2" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">{isRTL ? 'شحن وتصدير عالمي' : 'Global B2B Export'}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{isRTL ? 'شحن جوي وبحري وسريع' : 'Door-to-port logistics'}</p>
            </div>
            <div className="flex flex-col items-center justify-center p-3">
              <FaAward className="text-[#D4AF37] text-2xl mb-2" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">{isRTL ? 'تخصيص كامل (OEM)' : 'Custom & Private Label'}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{isRTL ? 'للفنادق وخطوط الطيران' : 'Hotels & Airlines'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 4 Curated Collections */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-2 font-semibold">
              {isRTL ? 'مجموعات مخدات السفر' : 'Curated Master Collections'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif">
              {isRTL ? 'أربع مجموعات تجسد سحر مصر القديمة' : 'Four Expressions of Ancient Egyptian Grandeur'}
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>{isRTL ? 'تصفح الكتالوج بالكامل (80+ مخدة)' : 'Browse Full Catalog (80+ Models)'}</span>
            <Arrow className="text-[10px]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collectionsList.map((col) => (
            <div
              key={col.id}
              className="group rounded-2xl bg-[#0F131A] border border-slate-800 hover:border-[#D4AF37]/50 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/5"
            >
              <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                <Image
                  src={col.image}
                  alt={isRTL ? col.nameAr : col.nameEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-[#D4AF37]">
                  {isRTL ? col.badgeAr : col.badgeEn}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow space-y-3">
                <h3 className="text-base font-bold text-white font-serif group-hover:text-[#D4AF37] transition-colors">
                  {isRTL ? col.nameAr : col.nameEn}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed flex-grow">
                  {isRTL ? col.descAr : col.descEn}
                </p>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    href={`/products/${col.slug}`}
                    className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1"
                  >
                    <span>{isRTL ? 'استكشف المجموعة' : 'Explore'}</span>
                    <Arrow className="text-[10px]" />
                  </Link>
                  <Link
                    href="/wholesale"
                    className="text-[11px] text-[#D4AF37] font-mono hover:underline"
                  >
                    {isRTL ? 'طلب جملة' : 'B2B MOQ'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Interactive Product Showcase Grid with Filter Tabs */}
      <section className="py-20 bg-[#0B0D11] border-t border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block font-semibold">
              {isRTL ? 'المنتجات المميزة' : 'Featured Models Showcase'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif">
              {isRTL ? 'أحدث موديلات مخدات السفر الطبية' : 'Masterpiece Travel Pillows in Stock'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {isRTL ? 'اختر أي مخدة لمشاهدة التفاصيل، أو اطلبها فوراً عبر واتساب كقطعة تجزئة أو كطلبية جملة' : 'Select any model for full cultural specifications, direct retail order, or wholesale quote'}
            </p>

            {/* Filter Tabs */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
              {[
                { id: 'all', labelEn: 'All Models', labelAr: 'جميع الموديلات' },
                { id: 'b123', labelEn: 'Royal Pharaonic', labelAr: 'الملكية (توت ونفرتيتي)' },
                { id: 't', labelEn: 'Sacred Symbols', labelAr: 'الرموز والمقدسات (عنخ)' },
                { id: 'tb', labelEn: 'Ancient Heritage', labelAr: 'البرديات والنقوش' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCollectionTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeCollectionTab === tab.id
                      ? 'bg-[#D4AF37] text-black font-bold shadow-md shadow-[#D4AF37]/20'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {isRTL ? tab.labelAr : tab.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseProducts.map((pillow) => {
              const imageSeo = getProductImageSeo(pillow.primaryImage);
              return (
                <div
                  key={pillow.id}
                  className="rounded-2xl bg-[#0F131A] border border-slate-800 hover:border-slate-700 p-4 flex flex-col transition-all group"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-950 mb-4">
                    <Image
                      src={pillow.primaryImage}
                      alt={imageSeo.altEn}
                      fill
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute top-2 left-2 bg-black/75 px-2 py-0.5 rounded text-[10px] font-mono text-[#D4AF37]">
                      {imageSeo.modelCode}
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow space-y-2">
                    <div className="text-[10px] uppercase font-mono text-slate-500">
                      {isRTL ? imageSeo.collectionNameAr : imageSeo.collectionNameEn}
                    </div>
                    <h4 className="text-sm font-bold text-white font-serif line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                      {isRTL ? imageSeo.titleAr : imageSeo.titleEn}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed flex-grow">
                      {isRTL ? imageSeo.culturalStoryAr : imageSeo.culturalStoryEn}
                    </p>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block">{isRTL ? 'تجزئة' : 'Retail'}</span>
                        <span className="text-white font-mono font-bold">${pillow.pricing.retail.min}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Link
                          href="/retail"
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium"
                        >
                          {isRTL ? 'شراء قطعة' : 'Retail'}
                        </Link>
                        <Link
                          href="/wholesale"
                          className="px-2.5 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#B8860B] text-black text-[11px] font-bold"
                        >
                          {isRTL ? 'جملة' : 'B2B'}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#D4AF37]/50 text-white text-xs font-semibold hover:text-[#D4AF37] transition-all"
            >
              <span>{isRTL ? 'عرض كافة المنتجات والأسعار' : 'View Complete 80+ Product Catalog'}</span>
              <Arrow className="text-xs" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. The Manufacturing Atelier & Material Science */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block font-semibold">
              {isRTL ? 'هندسة الراحة والمواد' : 'Material Engineering & Ergonomics'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif leading-tight">
              {isRTL ? 'لماذا تختار مخدات السفر من مصنع YKP Supplies؟' : 'Anatomy of Orthopedic Egyptian Travel Comfort'}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {isRTL
                ? 'لا نعتمد على الحشوات الرخيصة أو الأقمشة الصناعية الحارة. كل مخدة سفر يتم صبها من رغوة الذاكرة المتكيفة مع الفقرات العنقية، وتغليفها بنسيج قطن مصري ناعم يسمح بالتنفس الطبيعي.'
                : 'Unlike mass-produced cheap polyester rolls, every YKP travel pillow is molded with precision orthopedic memory foam that cradles your neck, relieves shoulder tension, and prevents flight stiffness.'}
            </p>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{isRTL ? 'ميموري فوم متكيف بكثافة 50D' : '50D High-Density Memory Foam'}</h4>
                  <p className="text-[11px] text-slate-400">{isRTL ? 'ارتداد ناعم يتكيف فوراً مع زاوية ميل الرأس' : 'Adapts instantly to head tilt and relieves cervical tension.'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{isRTL ? 'أغطية قطن مصري قابلة للغسيل' : 'Washable Egyptian Cotton Cover'}</h4>
                  <p className="text-[11px] text-slate-400">{isRTL ? 'نسيج ناعم بارد على البشرة مع سحاب مخفي آمن' : 'Breathable, hypoallergenic, with hidden reinforced zipper.'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{isRTL ? 'تغليف هدايا فاخر للرحلات' : 'Luxury Travel & Gift Packaging'}</h4>
                  <p className="text-[11px] text-slate-400">{isRTL ? 'حقيبة حمل مدمجة لحفظ المخدة أثناء التنقل' : 'Includes compact travel pouch with carabiner attachment.'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-4">
              <Image
                src="/prodect/Print/1.jpg"
                alt="Manufacturing travel pillow atelier YKP Supplies New Cairo"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#D4AF37] block">
                    {isRTL ? 'مصنعنا في القاهرة الجديدة' : 'New Cairo Production Facility'}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {isRTL ? 'طاقة إنتاجية تلبي كبرى طلبيات التصدير العالمية' : 'Exporting Authentic Egyptian Heritage to 50+ Global Markets'}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Dual Conversion Final Call to Action */}
      <section className="py-20 bg-gradient-to-t from-[#0F131A] to-[#07090C] border-t border-amber-900/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono font-semibold">
            {isRTL ? 'ابدأ طلبك الآن' : 'Begin Your Order Today'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif">
            {isRTL ? 'جاهز لطلب مخدتك أو بدء توريد تجاري؟' : 'Ready to Elevate Your Travel Experience?'}
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-xs sm:text-sm leading-relaxed">
            {isRTL
              ? 'سواء كنت وكيلاً يبحث عن أسعار جملة وتصنيع مخصص، أو مسافراً يبحث عن قطعة شخصية أصيلة، فريق YKP Supplies في خدمتك.'
              : 'Whether you require B2B commercial export quotes or wish to purchase an authentic individual pillow for your next flight, our Cairo team is at your service.'}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/wholesale"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold text-sm hover:opacity-90 transition-opacity"
            >
              {isRTL ? 'طلب عرض سعر جملة (B2B)' : 'Request Wholesale Quote'}
            </Link>
            <Link
              href="/retail"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 text-white border border-slate-800 hover:border-[#D4AF37] font-semibold text-sm transition-all"
            >
              {isRTL ? 'طلب قطعة شخصية (تجزئة)' : 'Order Single Piece (Retail)'}
            </Link>
            <a
              href="https://wa.me/201002406013"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-600/40 hover:bg-emerald-600/30 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="text-base" />
              <span>{isRTL ? 'واتساب مباشر' : 'Direct WhatsApp'}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return getStaticPropsWithTranslations(locale);
};
