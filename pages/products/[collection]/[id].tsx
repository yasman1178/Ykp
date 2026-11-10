import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '@/components/layout/Layout';
import { FaWhatsapp, FaShieldAlt, FaIndustry, FaCheck, FaBoxes, FaTruck, FaQuestionCircle } from 'react-icons/fa';
import { getTranslations } from '@/lib/translations';
import { getProductImageSeo, LUXURY_COLLECTION_MAP } from '@/lib/product-image-seo';

interface ProductPageProps {
  product: {
    id: string;
    modelCode: string;
    image: string;
    name: string;
    nameAr: string;
    price: string;
    unitPriceNum: number;
    description: string;
    descriptionAr: string;
    culturalStory: string;
    culturalStoryAr: string;
    collection: string;
    collectionName: string;
    collectionNameAr: string;
    symbol: string;
    symbolAr: string;
    features: string[];
    specifications: {
      material: string;
      filling: string;
      dimensions: string;
      weight: string;
      colors: string;
      customization: string;
      moq: string;
      care: string;
      warranty: string;
      barcode?: string;
    };
    gallery: string[];
  };
  relatedProducts: Array<{
    id: string;
    name: string;
    price: string;
    image: string;
    collection: string;
  }>;
  translations: any;
  locale: string;
}

export default function ProductDetailPage({
  product,
  relatedProducts,
  translations: t,
  locale
}: ProductPageProps) {
  const isRTL = locale === 'ar';
  const [selectedImage, setSelectedImage] = useState(0);

  const title = isRTL ? product.nameAr : product.name;
  const description = isRTL ? product.descriptionAr : product.description;
  const collectionTitle = isRTL ? product.collectionNameAr : product.collectionName;

  const currentGalleryImg = product.gallery[selectedImage] || product.image;
  const imageSeo = getProductImageSeo(currentGalleryImg);

  const handleWhatsAppInquiry = () => {
    const text = isRTL
      ? `مرحباً مصنع YKP Supplies، أود الاستفسار عن أسعار الجملة لموديل:\n- الموديل: ${product.nameAr} (${product.modelCode})\n- الكتالوج: https://www.ykp-eg.com/products/${product.collection}/${product.id}`
      : `Hello YKP Supplies, I would like to inquire about wholesale pricing and lead time for:\n- Model: ${product.name} (${product.modelCode})\n- Link: https://www.ykp-eg.com/products/${product.collection}/${product.id}`;
    window.open(`https://wa.me/201002406013?text=${encodeURIComponent(text)}`, '_blank');
  };

  const faqs = [
    {
      q: 'What is the Minimum Order Quantity (MOQ) for this model?',
      a: `Standard MOQ for this model is ${product.specifications.moq}. Mixed container orders with other YKP collections are accepted.`
    },
    {
      q: 'Can we add our brand logo and custom packaging?',
      a: 'Yes, full private-label customization is supported: woven tags, custom zipper pullers, embroidered logos, and branded gift or retail boxes.'
    },
    {
      q: 'What are the production lead times and shipping options?',
      a: 'Standard production is 2 to 4 weeks depending on batch volume. We dispatch sea freight via Alexandria and air cargo via Cairo Airport.'
    }
  ];

  return (
    <Layout
      pageTitle={`${title} (${product.modelCode}) | Wholesale Manufacturer YKP Supplies`}
      metaDescription={description}
      canonicalUrl={`https://www.ykp-eg.com/products/${product.collection}/${product.id}`}
      ogImage={product.image}
    >
      {/* Breadcrumb Navigation */}
      <div className="py-4 border-b border-slate-800 bg-[#070C18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Link href="/" className="hover:text-white transition-colors">{isRTL ? 'الرئيسية' : 'Home'}</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">{isRTL ? 'المجموعات' : 'Collections'}</Link>
            <span>/</span>
            <Link href={`/products/${product.collection}`} className="hover:text-white transition-colors">
              {collectionTitle}
            </Link>
            <span>/</span>
            <span className="text-[#D4AF37] font-semibold truncate max-w-xs">{product.modelCode}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Gallery Showcase (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 p-6 flex items-center justify-center shadow-2xl">
              <Image
                src={currentGalleryImg}
                alt={imageSeo.altEn || product.name}
                fill
                className="object-contain p-4"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 bg-black/80 px-2.5 py-1 rounded text-xs font-mono text-[#D4AF37] border border-[#D4AF37]/30">
                {product.modelCode}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-3">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden bg-slate-950 border transition-all ${
                    selectedImage === idx
                      ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 scale-105'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} detail view ${idx + 1}`}
                    fill
                    className="object-contain p-1"
                    sizes="20vw"
                  />
                </button>
              ))}
            </div>

            {/* Quick Factory Specs */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 grid grid-cols-3 gap-3 text-center text-xs">
              <div>
                <FaIndustry className="text-[#D4AF37] mx-auto text-base mb-1" />
                <span className="text-slate-300 font-medium block">Direct Factory</span>
                <span className="text-[10px] text-slate-500">Cairo, Egypt</span>
              </div>
              <div>
                <FaShieldAlt className="text-[#D4AF37] mx-auto text-base mb-1" />
                <span className="text-slate-300 font-medium block">50D Memory Foam</span>
                <span className="text-[10px] text-slate-500">Certified Core</span>
              </div>
              <div>
                <FaTruck className="text-[#D4AF37] mx-auto text-base mb-1" />
                <span className="text-slate-300 font-medium block">Global Freight</span>
                <span className="text-[10px] text-slate-500">FCL / LCL Ports</span>
              </div>
            </div>
          </div>

          {/* Product Specifications & Order Engine (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] font-semibold">
                  {collectionTitle}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs font-mono text-slate-400">SKU: {product.modelCode}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {title}
              </h1>

              <div className="pt-2 flex items-center gap-3">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                  MOQ: {product.specifications.moq}
                </span>
                <span className="text-xs text-slate-400">
                  Wholesale volume discounts available for distributors
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="text-sm text-slate-300 leading-relaxed space-y-3">
              <p>{description}</p>
              {product.culturalStory && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <span className="text-[#D4AF37]">𓂀</span>
                    <span>Cultural Motif & Design Story</span>
                  </h4>
                  <p>{product.culturalStory}</p>
                </div>
              )}
            </div>

            {/* Specifications Matrix */}
            <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
              <h3 className="text-xs uppercase font-mono tracking-wider text-white font-bold">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">Core Filling</span>
                  <span className="text-slate-200 font-medium">{product.specifications.filling}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Outer Cover</span>
                  <span className="text-slate-200 font-medium">{product.specifications.material}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Dimensions</span>
                  <span className="text-slate-200 font-mono">{product.specifications.dimensions}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Net Weight</span>
                  <span className="text-slate-200 font-mono">{product.specifications.weight}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Customization</span>
                  <span className="text-slate-200 font-medium">{product.specifications.customization}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Warranty</span>
                  <span className="text-slate-200 font-medium">{product.specifications.warranty}</span>
                </div>
              </div>
            </div>

            {/* CTAs (Primary: REQUEST WHOLESALE PRICE, Secondary: CUSTOMIZE THIS PRODUCT) */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-[#D4AF37]/30 space-y-4">
              <h3 className="text-sm font-bold text-white">Commercial Wholesale Inquiries</h3>
              <p className="text-xs text-slate-300">
                Contact our New Cairo sales department for tiered container pricing, pallet packing lists, and export freight quotes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href={`/request-a-quote?product=${encodeURIComponent(product.name + ' [' + product.modelCode + ']')}`}
                  className="flex-1 py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider text-center hover:brightness-110 transition-all shadow-lg shadow-[#D4AF37]/15"
                >
                  REQUEST WHOLESALE PRICE
                </Link>

                <Link
                  href={`/custom-travel-pillows?model=${encodeURIComponent(product.modelCode)}`}
                  className="flex-1 py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider text-center border border-slate-700 transition-colors"
                >
                  CUSTOMIZE THIS PRODUCT
                </Link>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:underline"
                >
                  <FaWhatsapp />
                  <span>Direct Inquiry via WhatsApp (+20 100 240 6013)</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Additional Section: Packaging & FAQ */}
        <div className="mt-16 pt-12 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <FaBoxes className="text-[#D4AF37]" />
              <span>Packaging & Export Logistics</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <FaCheck className="text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>Vacuum Shrink Compression:</strong> Available to maximize container load capacity by up to 60%.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheck className="text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>Retail Presentation:</strong> Color box with PVC window or branded drawstring carry pouch with hangtag.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheck className="text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>Master Cartons:</strong> Standard 5-ply double-wall corrugated export master cartons with pallet straps.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <FaQuestionCircle className="text-[#D4AF37]" />
              <span>Frequently Asked Questions</span>
            </h3>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  <h4 className="font-semibold text-white">{f.q}</h4>
                  <p className="text-slate-400 mt-1">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6">
              Related Travel Pillows in this Collection
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.collection}/${rel.id}`}
                  className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-all p-3 group"
                >
                  <div className="relative aspect-square bg-slate-950 rounded-lg overflow-hidden mb-3">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                    {rel.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">Request Quote</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const b123Paths = Array.from({ length: 23 }, (_, i) => ({
    params: { collection: 'b123', id: `b123-${(i + 1).toString().padStart(3, '0')}` }
  }));
  const tPaths = Array.from({ length: 21 }, (_, i) => ({
    params: { collection: 't', id: `t-${(i + 1).toString().padStart(3, '0')}` }
  }));
  const tbPaths = Array.from({ length: 36 }, (_, i) => ({
    params: { collection: 'tb', id: `tb-${(i + 1).toString().padStart(3, '0')}` }
  }));
  const customPaths = Array.from({ length: 5 }, (_, i) => ({
    params: { collection: 'print', id: `print-${(i + 1).toString().padStart(3, '0')}` }
  }));

  const souvenirPaths = [
    { params: { collection: 'souvenirs', id: 'camel-plush-22cm' } },
    { params: { collection: 'souvenirs', id: 'camel-plush-28cm' } }
  ];

  const allPaths = [...b123Paths, ...tPaths, ...tbPaths, ...customPaths, ...souvenirPaths];

  return {
    paths: allPaths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { collection, id } = context.params as { collection: string; id: string };

  if (collection === 'souvenirs') {
    const is28 = id.includes('28');
    const camelProduct = {
      id,
      modelCode: is28 ? 'YKP-CAMEL-28' : 'YKP-CAMEL-22',
      image: is28
        ? '/assets/aistudio/file_000000000604820aa5649d2a0b525298_e93a9b68.png'
        : '/assets/aistudio/1794114379573_df8dd34d.jpg',
      name: is28
        ? 'The Beloved Camel - Grand Pharaonic Deluxe Plush (28 cm)'
        : 'The Beloved Camel - Egyptian Pharaonic Plush Toy (22 cm)',
      nameAr: is28
        ? 'الجمل المحبوب - دمية قطيفة فرعونية فاخرة (28 سم)'
        : 'الجمل المحبوب - دمية قطيفة فرعونية أصيلة (22 سم)',
      price: is28 ? '$28' : '$22',
      unitPriceNum: is28 ? 28 : 22,
      description: is28
        ? 'Grand Deluxe 28 cm Egyptian pharaonic plush camel with opulent embroidered ceremonial saddle, fluffy plush mane, and reinforced standing legs. Perfect for luxury hotels, VIP suites, and collector displays.'
        : 'Authentic Egyptian handcrafted plush camel with embroidered pharaonic saddle ("I ❤ EGYPT") and ancient protective motifs. Designed with ultra-soft velvet and child-safe materials in New Cairo.',
      descriptionAr: is28
        ? 'دمية جمل فرعونية فاخرة مقاس 28 سم مع سرج احتفالي ملكي مطرز بالذهب وأرجل معززة للوقوف.'
        : 'دمية جمل فرعونية أصلية مقاس 22 سم مع سرج فرعوني مطرز فخم ومخمل فائق النعومة.',
      culturalStory: 'Camels have symbolized resilience, hospitality, and endurance across Egyptian history.',
      culturalStoryAr: 'يرمز الجمل في التراث المصري للتحمل والضيافة الكريمة ومغامرات الصحراء الخالدة.',
      collection: 'souvenirs',
      collectionName: 'Pharaonic Heritage Souvenirs',
      collectionNameAr: 'مجموعة التذكارات الفرعونية',
      symbol: 'Pharaonic Camel & Ankh',
      symbolAr: 'سرج الهودج ومفتاح الحياة',
      features: ['Child Safe EN-71', 'Ultra-Soft Velvet', 'Embroidered Saddle', 'Custom Hotel Branding Available'],
      specifications: {
        material: 'Ultra-Soft Velvet Plush',
        filling: 'Hypoallergenic Virgin PP Cotton',
        dimensions: is28 ? '28 x 18 x 28 cm' : '22 x 14 x 22 cm',
        weight: is28 ? '380g' : '240g',
        colors: 'Royal Blue, Desert Gold, Imperial Purple, Lotus Pink',
        customization: 'Logo embroidery on saddle for 50+ units',
        moq: '130 units',
        care: 'Hand wash 30°C / Surface damp sponge wipe',
        warranty: '1-Year Stitching & Integrity Guarantee'
      },
      gallery: [
        is28
          ? '/assets/aistudio/file_000000000604820aa5649d2a0b525298_e93a9b68.png'
          : '/assets/aistudio/1794114379573_df8dd34d.jpg',
        '/assets/aistudio/1794122038268_02f24669.jpg',
        '/assets/aistudio/file_00000000bdd4820a898fb93da354784f_9e2791fa.png'
      ]
    };

    const relatedProducts = [
      {
        id: is28 ? 'camel-plush-22cm' : 'camel-plush-28cm',
        name: is28 ? 'The Beloved Camel (22 cm)' : 'The Beloved Camel Grand (28 cm)',
        price: is28 ? '$22' : '$28',
        image: is28 ? '/assets/aistudio/1794114379573_df8dd34d.jpg' : '/assets/aistudio/file_000000000604820aa5649d2a0b525298_e93a9b68.png',
        collection: 'souvenirs'
      }
    ];

    const translations = getTranslations(context.locale || 'en');
    return {
      props: {
        product: camelProduct,
        relatedProducts,
        translations,
        locale: context.locale || 'en'
      }
    };
  }

  const productNum = parseInt(id.split('-')[1] || '1', 10);
  const isPremium = collection === 'royal' || collection === 'premium' || id.startsWith('b123');
  const isClassic = collection === 'sacred' || collection === 'classic' || id.startsWith('t-');
  const isCustom = collection === 'custom' || collection === 'print' || id.startsWith('print');

  const imgFolder = isPremium ? 'b123' : isClassic ? 't' : isCustom ? 'Print' : 'tb';
  const imgExt = isCustom ? 'jpg' : 'webp';
  const mainImg = `/prodect/${imgFolder}/${productNum}.${imgExt}`;

  const imageSeo = getProductImageSeo(mainImg);
  const priceNum = isPremium ? 75 : isClassic ? 35 : isCustom ? 45 : 45;

  const product = {
    id,
    modelCode: imageSeo.modelCode || id.toUpperCase(),
    image: mainImg,
    name: imageSeo.titleEn,
    nameAr: imageSeo.titleAr,
    price: `$${priceNum}`,
    unitPriceNum: priceNum,
    description: imageSeo.seoDescriptionEn,
    descriptionAr: imageSeo.seoDescriptionAr,
    culturalStory: imageSeo.culturalStoryEn,
    culturalStoryAr: imageSeo.culturalStoryAr,
    collection,
    collectionName: imageSeo.collectionNameEn,
    collectionNameAr: imageSeo.collectionNameAr,
    symbol: imageSeo.symbol,
    symbolAr: imageSeo.symbolAr,
    features: [
      'High-Density 50D Viscoelastic Memory Foam',
      'Breathable Removable Velvet/Cotton Cover',
      'Authentic Hieroglyphic Embroidery',
      'Smooth Concealed Nylon Zipper'
    ],
    specifications: {
      material: imageSeo.materialEn || 'Egyptian Velvet & Cotton Blend',
      filling: 'High-Density 50D Viscoelastic Polyurethane Memory Foam',
      dimensions: imageSeo.dimensions || '30 x 28 x 12 cm',
      weight: imageSeo.weight || '380g',
      colors: 'Royal Blue, Desert Sand, Deep Black, Lotus Terracotta',
      customization: 'Custom embroidery, woven labels, silicone pullers',
      moq: '50 - 100 units',
      care: 'Removable cover machine washable at 30°C',
      warranty: '2-Year Manufacturing Guarantee'
    },
    gallery: [
      mainImg,
      `/prodect/${imgFolder}/${productNum > 1 ? productNum - 1 : 2}.${imgExt}`,
      `/prodect/${imgFolder}/${productNum < 5 ? productNum + 1 : 1}.${imgExt}`,
    ]
  };

  const relatedProducts = [1, 2, 3, 4].map((offset) => {
    const relNum = ((productNum + offset) % 20) + 1;
    const relImg = `/prodect/${imgFolder}/${relNum}.${imgExt}`;
    const relSeo = getProductImageSeo(relImg);
    return {
      id: `${id.split('-')[0]}-${relNum.toString().padStart(3, '0')}`,
      name: relSeo.titleEn,
      price: `$${priceNum}`,
      image: relImg,
      collection
    };
  });

  const translations = getTranslations(context.locale || 'en');

  return {
    props: {
      product,
      relatedProducts,
      translations,
      locale: context.locale || 'en'
    }
  };
};