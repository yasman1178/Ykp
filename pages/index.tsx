import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import { 
  FaArrowRight, 
  FaArrowLeft, 
  FaCheck, 
  FaGlobeAmericas, 
  FaIndustry, 
  FaAward, 
  FaBoxes, 
  FaShieldAlt,
  FaCogs,
  FaPlane,
  FaHotel,
  FaStore,
  FaLandmark,
  FaGift,
  FaLaptop,
  FaWhatsapp
} from 'react-icons/fa';
import { ALL_PRODUCTS, COLLECTION_SUMMARIES, CAMEL_PRODUCTS } from '@/data/products';

export default function HomePage() {
  const router = useRouter();
  const isRTL = router.locale === 'ar';
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  const [activeCollectionTab, setActiveCollectionTab] = useState<'all' | 'tb' | 'b123' | 't' | 'souvenirs'>('all');

  const collections = [
    {
      id: 'tb',
      name: isRTL ? 'المجموعة الفرعونية التراثية' : 'Egyptian Heritage Collection',
      tagline: isRTL ? 'نقوش أثرية وبرديات مقدسة' : 'Sacred Inscriptions & Hieroglyphic Art',
      description: isRTL
        ? 'تصاميم فرعونية موثقة تاريخياً مستوحاة من معابد الكرنك والأقصر، مصنعة برغوة الذاكرة عالية المرونة وأقمشة الجاكار الفاخرة.'
        : 'Authentic temple wall carvings, royal cartouches, and sacred papyrus motifs engineered with high-density viscoelastic foam for cultural tourism and museum retail.',
      image: '/prodect/tb/1.webp',
      link: '/products/tb',
      badge: 'Bestseller'
    },
    {
      id: 'b123',
      name: isRTL ? 'مجموعة رغوة الذاكرة الفاخرة' : 'Premium Collection',
      tagline: isRTL ? 'راحة ملكية للرحلات الطويلة' : 'First-Class Ergonomic Memory Foam',
      description: isRTL
        ? 'وسائد سفر مصبوبة بدقة بتقنية رغوة الذاكرة 50D لتوفير دعم 360 درجة للفقرات العنقية مع أغطية مخملية فخمة قابلة للغسل.'
        : 'Engineered 50D viscoelastic molded core providing true 360-degree cervical flight stabilization with plush Egyptian velvet and removable washable covers.',
      image: '/prodect/b123/1.webp',
      link: '/products/b123',
      badge: 'Export Grade'
    },
    {
      id: 't',
      name: isRTL ? 'المجموعة الكلاسيكية' : 'Classic Collection',
      tagline: isRTL ? 'رموز الحماية والخلود' : 'Ergonomic Travel Essentials',
      description: isRTL
        ? 'مزيج مثالي بين الراحة الطبية اليومية والرموز المصرية الخالدة (عنخ، عين حورس، الجعران المقدس) بأسعار جملة تنافسية.'
        : 'Timeless sacred symbols (Ankh, Eye of Horus, Scarab) paired with orthopedic contouring for high-turnover retail and airport travel stores.',
      image: '/prodect/t/1.webp',
      link: '/products/t',
      badge: 'High Volume'
    },
    {
      id: 'custom',
      name: isRTL ? 'مجموعة التصنيع المخصص والعلامات الخاصة' : 'Custom & Private Label Collection',
      tagline: isRTL ? 'تصنيع حسب الطلب لماركتك' : 'OEM / ODM Tailored Manufacturing',
      description: isRTL
        ? 'تصنيع متكامل وفق هويتك التجارية: اختيار كثافة الفوم، تطريز الشعار، ألوان مخصصة، وعلب عرض فاخرة للفنادق وخطوط الطيران.'
        : 'Complete bespoke manufacturing for private labels, corporate gifting, and luxury airlines. Custom foam densities, embroidered logos, and retail packaging.',
      image: '/prodect/Print/master.jpg',
      link: '/custom-travel-pillows',
      badge: 'Bespoke OEM'
    }
  ];

  const clientSectors = [
    {
      title: isRTL ? 'الموزعون الدوليون' : 'Distributors & Importers',
      description: isRTL ? 'شحنات حاويات منتظمة مع مرونة في التعبئة والتخصيص.' : 'Reliable FCL/LCL ocean container shipments with flexible incoterms and volume tiering.',
      icon: FaGlobeAmericas
    },
    {
      title: isRTL ? 'سلاسل التجزئة والمتاجر' : 'Retail Stores & Chains',
      description: isRTL ? 'منتجات جاهزة للرفوف مع كود باركود وتغليف عرض أنيق.' : 'Shelf-ready retail packaging, UPC barcodes, and point-of-sale display options.',
      icon: FaStore
    },
    {
      title: isRTL ? 'متاجر التجارة الإلكترونية' : 'Online Stores & Amazon Brands',
      description: isRTL ? 'تغليف مدمج عالي الكفاءة يقلل من تكلفة الشحن FBA.' : 'High-density vacuum shrink packaging engineered to minimize FBA volumetric weight.',
      icon: FaLaptop
    },
    {
      title: isRTL ? 'متاجر المطارات ومحطات السفر' : 'Airport Retailers & Travel Plazas',
      description: isRTL ? 'منتجات سريعة الدوران تجذب المسافرين الدوليين فوراً.' : 'Fast-moving impulse merchandise optimized for duty-free and terminal transit stores.',
      icon: FaPlane
    },
    {
      title: isRTL ? 'متاجر المتاحف والمواقع الأثرية' : 'Museum Stores & Cultural Shops',
      description: isRTL ? 'تصاميم فرعونية أصيلة مع توثيق ثقافي للتراث المصري.' : 'Authentic Pharaonic iconography backed by genuine cultural heritage and provenance.',
      icon: FaLandmark
    },
    {
      title: isRTL ? 'الفنادق ومنتجعات الضيافة' : 'Hotels & Tourism Companies',
      description: isRTL ? 'هدايا غرف وترحيب فاخرة تخلد تجربة النزلاء في مصر.' : 'VIP guest amenities, turndown keepsakes, and branded excursion travel gear.',
      icon: FaHotel
    },
    {
      title: isRTL ? 'هدايا الشركات والفعاليات' : 'Corporate Brands & Conferences',
      description: isRTL ? 'هدايا فاخرة بشعار شركتك للمؤتمرات وكبار العملاء.' : 'Executive travel accessories customized with subtle corporate embroidery and premium gift boxes.',
      icon: FaGift
    },
    {
      title: isRTL ? 'خطوط الطيران والنقل الفاخر' : 'Airlines & Premium Transit',
      description: isRTL ? 'وسائد مريحة لدرجة رجال الأعمال مع شهادات معتمدة.' : 'Comfort-certified cushions for business class flights and VIP charter fleets.',
      icon: FaAward
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: isRTL ? 'تطوير وتصميم المنتج' : 'Product Development',
      desc: isRTL ? 'دراسة متطلبات العميل، الهندسة المريحة، ورسم النماذج الأولية.' : 'CAD ergonomic modeling, density calculation, and custom silhouette prototyping.'
    },
    {
      step: '02',
      title: isRTL ? 'انتقاء واختبار المواد' : 'Material Selection',
      desc: isRTL ? 'رغوة ذاكرة نقية وأقمشة قطيفة ومخملية مصرية مضادة للحساسية.' : 'Viscoelastic polyurethanes, OEKO-TEX certified Egyptian velvets, and durable zippers.'
    },
    {
      step: '03',
      title: isRTL ? 'التصنيع والصب الميكانيكي' : 'Precision Manufacturing',
      desc: isRTL ? 'صب قوالب الرغوة، القص الدقيق، وتطريز الشعارات بماكينات متطورة.' : 'Automated injection molding, CNC cutting, and high-precision multi-head embroidery.'
    },
    {
      step: '04',
      title: isRTL ? 'مراقبة واختبار الجودة' : 'Quality Control',
      desc: isRTL ? 'فحص ارتداد الرغوة، متانة الخياطة، وسلامة السحابات قبل التعبئة.' : 'Rigorous rebound resilience testing, seam tensile verification, and 100% visual inspection.'
    },
    {
      step: '05',
      title: isRTL ? 'التعبئة والتغليف المخصص' : 'Custom Packaging',
      desc: isRTL ? 'شفط الهواء الفراغي لتوفير الحجم، أو علب هدايا فاخرة ببطاقات الماركة.' : 'Volume-saving vacuum compression or branded luxury rigid boxes with custom barcode tags.'
    },
    {
      step: '06',
      title: isRTL ? 'الشحن والتصدير الدولي' : 'Global Export Shipping',
      desc: isRTL ? 'إصدار شهادات المنشأ وشحن الحاويات بحراً وجواً إلى جميع قارات العالم.' : 'Container loading, EUR.1 / Certificate of Origin issuance, and freight handling via Alexandria & Cairo.'
    }
  ];

  return (
    <Layout
      pageTitle="Egyptian Travel Pillow Manufacturer for Global Brands & Distributors | YKP Supplies"
      metaDescription="YKP Supplies is a premier Egyptian manufacturer of memory foam travel pillows, custom OEM private label collections, and pharaonic heritage gifts in Cairo for global distributors and retailers."
      canonicalUrl="https://www.ykp-eg.com"
      ogImage="/images/factory/factory-line.jpg"
    >
      {/* ========================================================
          SECTION 1 — HERO
          ======================================================== */}
      <section className="relative bg-[#070C18] border-b border-slate-800 overflow-hidden pt-12 pb-20 lg:py-24">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span>{isRTL ? 'مصنع مصري معتمد للتصدير العالمي' : 'Direct Manufacturer in Cairo · B2B Export Ready'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
                {isRTL
                  ? 'المصنع المصري لمخدات السفر للعلامات التجارية والموزعين عالمياً'
                  : 'Egyptian Travel Pillow Manufacturer for Global Brands & Distributors'}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                {isRTL
                  ? '«مخدات سفر فاخرة، تصاميم مخصصة، وحلول التصنيع للعلامات الخاصة (Private Label) — صُنعت بفخر في مصر.»'
                  : '«Premium travel pillows, custom designs and private label manufacturing solutions — proudly made in Egypt.»'}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/request-a-quote"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-sm sm:text-base hover:brightness-110 transition-all shadow-xl shadow-[#D4AF37]/20 whitespace-nowrap"
                >
                  <span>{isRTL ? 'اطلب عرض سعر جملة وتصنيع' : 'REQUEST A WHOLESALE QUOTE'}</span>
                  <Arrow />
                </Link>

                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base border border-slate-700 hover:border-slate-600 transition-colors whitespace-nowrap"
                >
                  <span>{isRTL ? 'استكشف كتالوج المنتجات' : 'EXPLORE PRODUCTS'}</span>
                </Link>
              </div>

              {/* Verified Trust Strip */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-slate-400 text-xs font-mono">
                <div>
                  <span className="block text-white font-bold text-base sm:text-lg">50D Foam</span>
                  <span>Molded Resilience</span>
                </div>
                <div>
                  <span className="block text-white font-bold text-base sm:text-lg">FCL & LCL</span>
                  <span>Container Shipping</span>
                </div>
                <div>
                  <span className="block text-white font-bold text-base sm:text-lg">100% OEM</span>
                  <span>Custom Branding</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Showcase Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group">
                <img
                  src="/images/factory/factory-line.jpg"
                  alt="Egyptian Travel Pillow Manufacturing Line in New Cairo"
                  className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Visual Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-6 flex flex-col justify-end">
                  <div className="inline-block bg-[#0B132B]/90 backdrop-blur-md border border-[#D4AF37]/30 rounded-xl p-4 space-y-1">
                    <span className="text-[11px] font-mono uppercase text-[#D4AF37] font-semibold">
                      {isRTL ? 'المصنع في القاهرة الجديدة' : 'New Cairo Production Facility'}
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      {isRTL ? 'خطوط صب وتطريز رغوة الذاكرة الطبية' : 'Orthopedic Memory Foam & Precision Embroidery Lines'}
                    </h3>
                    <p className="text-xs text-slate-300">
                      Direct export access to Europe, GCC, and North America.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2 — WHY YKP (4 Value Propositions)
          ======================================================== */}
      <section className="py-16 sm:py-20 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'ميزتنا التنافسية' : 'Competitive Manufacturing Advantage'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2 text-balance">
              {isRTL ? 'لماذا يختار الشركاء الدوليون مصنع YKP؟' : 'Why Global Buyers Choose YKP Supplies'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Value 1: Made in Egypt */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 hover:border-[#D4AF37]/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-xl">
                🇪🇬
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                MADE IN EGYPT
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Authentic Egyptian manufacturing and design expertise. Competitive freight routes to Europe, the Gulf, and the Americas with preferential tariff agreements.
              </p>
            </div>

            {/* Value 2: Premium Materials */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 hover:border-[#D4AF37]/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-xl">
                <FaAward />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                PREMIUM MATERIALS
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Comfort-focused materials selected for quality and durability. High-density viscoelastic memory foam, breathable hypoallergenic textiles, and robust silent zippers.
              </p>
            </div>

            {/* Value 3: Custom Manufacturing */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 hover:border-[#D4AF37]/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-xl">
                <FaCogs />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                CUSTOM MANUFACTURING
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Create products with your own design, branding and packaging. Full private-label support from concept sample approval to mass factory execution.
              </p>
            </div>

            {/* Value 4: Global Partnerships */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 hover:border-[#D4AF37]/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-xl">
                <FaGlobeAmericas />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                GLOBAL PARTNERSHIPS
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Supporting international distributors, retailers, museum shops, and brands with scalable production capacity, clear lead times, and transparent pricing.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3 — PRODUCT COLLECTIONS (4 Major Categories)
          ======================================================== */}
      <section className="py-16 sm:py-24 bg-[#0A1020] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
                {isRTL ? 'الكتالوج التجاري للمصنع' : 'Wholesale Product Collections'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-1 text-balance">
                {isRTL ? 'مجموعات مخدات السفر والتراث المصري' : 'Engineered for Comfort. Inspired by Heritage.'}
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:underline"
            >
              <span>{isRTL ? 'مشاهدة الكتالوج كاملاً' : 'View Complete 80+ Product Catalog'}</span>
              <Arrow />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((col) => (
              <div
                key={col.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all flex flex-col group shadow-lg"
              >
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-950">
                  <img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#0B132B]/90 text-[#D4AF37] border border-[#D4AF37]/30">
                      {col.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {col.name}
                    </h3>
                    <p className="text-xs font-mono text-[#D4AF37]">
                      {col.tagline}
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {col.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <Link
                      href={col.link}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-[#D4AF37] hover:text-slate-950 text-white font-semibold text-xs tracking-wider uppercase transition-all"
                    >
                      <span>EXPLORE COLLECTION</span>
                      <Arrow />
                    </Link>

                    <Link
                      href={`/request-a-quote?product=${encodeURIComponent(col.name)}`}
                      className="text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      Request Quote →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Highlight: The Beloved Camel Plush Showcase */}
          <div className="mt-12 bg-gradient-to-r from-slate-900 via-[#0F1D40] to-slate-900 border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-block text-[11px] font-mono uppercase text-[#D4AF37] tracking-widest font-semibold bg-[#D4AF37]/10 px-3 py-1 rounded">
                  {isRTL ? 'منتج حصري لسلاسل الفنادق والمتاحف' : 'Authentic Pharaonic Souvenir & Hotel Mascot'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  The Beloved Camel — Handcrafted Egyptian Plush Toy
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                  Super-soft velvet plush toy with embroidered pharaonic ceremonial saddle (&quot;I ❤ EGYPT&quot;) and ancient protective motifs. Available in 22 cm (travel companion) and 28 cm (deluxe keepsake). Tested for child safety (EN-71) and ideal for luxury hotel turndown amenities, cultural gift shops, and tourism retail.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/products/souvenirs/camel-plush-22cm"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md shadow-[#D4AF37]/20"
                  >
                    View Beloved Camel Specs
                  </Link>
                  <Link
                    href="/museum-tourist-gifts"
                    className="text-xs font-semibold text-slate-300 hover:text-white underline underline-offset-4"
                  >
                    Explore Museum & Tourist Gift Collections →
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 flex items-center justify-center">
                <div className="relative w-64 h-64 rounded-xl overflow-hidden border border-slate-700 shadow-xl">
                  <img
                    src="/assets/aistudio/1794114379573_df8dd34d.jpg"
                    alt="The Beloved Camel in Royal Egyptian Blue"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4 — WHO WE WORK WITH (8 Visual Cards)
          ======================================================== */}
      <section className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'قطاعات العملاء والشركاء' : 'B2B Client Sectors'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2 text-balance">
              {isRTL ? 'من نخدم عبر العالم' : 'Who We Manufacture For'}
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              We empower global commerce with direct manufacturer agility, tailored packaging, and strict quality assurance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientSectors.map((sector, idx) => {
              const Icon = sector.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-3 hover:border-[#D4AF37]/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-lg">
                    <Icon />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {sector.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {sector.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/distributor"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:underline"
            >
              <span>Explore Distributor Program & Commercial Terms</span>
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5 — MANUFACTURING PROCESS (Visual Timeline)
          ======================================================== */}
      <section className="py-16 sm:py-24 bg-[#070C18] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'معايير الإنتاج والجودة' : 'Manufacturing Precision'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2 text-balance">
              {isRTL ? 'مراحل التصنيع خطوة بخطوة' : 'Our End-to-End Manufacturing Process'}
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              From raw polyurethane synthesis to international sea freight dispatch.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            {processSteps.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3 relative flex flex-col justify-between hover:border-[#D4AF37]/40 transition-colors"
              >
                <div>
                  <div className="text-2xl font-mono font-black text-[#D4AF37]/40 mb-2">
                    {item.step}
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800/60 text-[10px] text-slate-500 font-mono">
                  Phase {idx + 1}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/manufacturing"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider border border-slate-700 transition-colors"
            >
              <span>EXPLORE OUR MANUFACTURING</span>
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 6 — CUSTOM & PRIVATE LABEL (Heading + 4 Pillars)
          ======================================================== */}
      <section className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
                {isRTL ? 'حلول العلامة التجارية الخاصة' : 'Private Label & OEM Solutions'}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
                Your Brand. Your Design. Our Manufacturing.
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Launch or expand your travel product collection without capital investment in machinery. We produce to your exact technical specifications with full IP protection and rapid prototyping.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-1">
                  <h4 className="text-sm font-bold text-white">Custom Designs</h4>
                  <p className="text-xs text-slate-400">Tailored contour molds, ergonomic contours, and unique travel pillow dimensions.</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-1">
                  <h4 className="text-sm font-bold text-white">Private Label</h4>
                  <p className="text-xs text-slate-400">Your brand name, custom woven care labels, and silicone zipper pullers.</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-1">
                  <h4 className="text-sm font-bold text-white">Logo Customization</h4>
                  <p className="text-xs text-slate-400">High-definition computerized embroidery, screen printing, or embossed badges.</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-1">
                  <h4 className="text-sm font-bold text-white">Packaging Customization</h4>
                  <p className="text-xs text-slate-400">Vacuum-sealed travel pouches, branded drawstring bags, or magnetic gift boxes.</p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/custom-travel-pillows"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-[#D4AF37]/20"
                >
                  <span>START YOUR CUSTOM PROJECT</span>
                  <Arrow />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl relative">
                <img
                  src="/images/factory/packaging-export.jpg"
                  alt="Custom Packaging and Export Pallets at YKP Supplies"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-6 flex items-end">
                  <p className="text-xs text-white bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700">
                    Custom Packaging & Palletized Export Logistics at New Cairo Facility
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7 — TRUST & PROOF (Verified Information Only)
          ======================================================== */}
      <section className="py-16 sm:py-24 bg-[#070C18] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'المصداقية وضمان الجودة' : 'Verified Capabilities & Quality Control'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2 text-balance">
              {isRTL ? 'معايير المصنع وضمان الجودة' : 'Engineered for International Compliance'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
              <img
                src="/images/factory/quality-lab.jpg"
                alt="YKP Quality Control Testing Laboratory"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-2">
                <h3 className="text-base font-bold text-white">In-House QC Testing</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every batch of viscoelastic memory foam undergoes rebound tests and seam load inspection to ensure lasting cervical comfort under repeated air travel use.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
              <img
                src="/images/factory/factory-line.jpg"
                alt="New Cairo Factory Area"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-2">
                <h3 className="text-base font-bold text-white">New Cairo Facility</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Located in the New Cairo industrial zone with modern molding stations, hygienic dust-free cutting zones, and dedicated export staging bays.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
              <img
                src="/images/factory/packaging-export.jpg"
                alt="Export Logistics and Freight"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-2">
                <h3 className="text-base font-bold text-white">Direct Export Experience</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Complete documentation handling including EUR.1, Certificate of Origin, and customs-compliant export manifests via Alexandria port and Cairo airport.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 8 — FINAL CTA (Heading + Button)
          ======================================================== */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-950 via-[#0B1530] to-slate-950 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
            {isRTL ? 'ابدأ شراكتك التجارية اليوم' : 'Ready to Source from Cairo?'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            Looking for a Reliable Travel Product Manufacturer?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Partner with YKP Supplies for direct manufacturer wholesale pricing, custom OEM development, and dependable international shipping.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/request-a-quote"
              className="w-full sm:w-auto px-9 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-base hover:brightness-110 transition-all shadow-xl shadow-[#D4AF37]/25"
            >
              REQUEST A QUOTE
            </Link>

            <a
              href="https://wa.me/201002406013?text=Hello%20YKP%20Supplies%2C%20I%20would%20like%20to%20discuss%20a%20manufacturing%20inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-700 font-bold text-base transition-colors"
            >
              <FaWhatsapp className="text-xl" />
              <span>Contact via WhatsApp</span>
            </a>
          </div>

          <div className="pt-8 text-xs text-slate-400 font-mono">
            <span>Direct Sales: +20 100 240 6013</span>
            <span className="mx-3">·</span>
            <span>Email: sales@ykp-eg.com</span>
            <span className="mx-3">·</span>
            <span>New Cairo, Egypt</span>
          </div>
        </div>
      </section>
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
