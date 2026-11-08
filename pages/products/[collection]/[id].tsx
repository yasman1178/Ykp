import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaShieldAlt, FaTruck, FaUndo, FaIndustry, FaCheck, FaPhoneAlt } from 'react-icons/fa';
import SEO from '@/components/SEO';
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
      dimensions: string;
      weight: string;
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
  const [quantity, setQuantity] = useState(1);

  const title = isRTL ? product.nameAr : product.name;
  const description = isRTL ? product.descriptionAr : product.description;
  const collectionTitle = isRTL ? product.collectionNameAr : product.collectionName;

  const currentGalleryImg = product.gallery[selectedImage] || product.image;
  const imageSeo = getProductImageSeo(currentGalleryImg);

  const handleWhatsAppOrder = () => {
    const text = isRTL
      ? `مرحباً مصنع YKP Supplies، أود الاستفسار وطلب مخدة السفر:\n- الموديل: ${product.nameAr} (${product.modelCode})\n- الكمية: ${quantity}\n- السعر التقريبي: $${product.unitPriceNum * quantity}\n- الرابط: https://www.ykp-eg.com/products/${product.collection}/${product.id}`
      : `Hello YKP Supplies, I would like to order this travel pillow:\n- Model: ${product.name} (${product.modelCode})\n- Quantity: ${quantity}\n- Approx: $${product.unitPriceNum * quantity}\n- Link: https://www.ykp-eg.com/products/${product.collection}/${product.id}`;
    window.open(`https://wa.me/201002406013?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#07090C] text-slate-100 selection:bg-[#D4AF37] selection:text-black" dir={isRTL ? 'rtl' : 'ltr'}>
      <SEO
        title={`${title} | YKP Supplies`}
        description={description}
        canonicalUrl={`https://www.ykp-eg.com/products/${product.collection}/${product.id}`}
        ogImage={product.image}
        ogType="product"
      />

      {/* JSON-LD Schema */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              'name': product.name,
              'description': product.description,
              'image': [product.image, ...product.gallery],
              'sku': product.modelCode,
              'brand': {
                '@type': 'Brand',
                'name': 'YKP Supplies'
              },
              'manufacturer': {
                '@type': 'Organization',
                'name': 'YKP Supplies',
                'url': 'https://www.ykp-eg.com'
              },
              'offers': {
                '@type': 'Offer',
                'price': product.unitPriceNum.toString(),
                'priceCurrency': 'USD',
                'availability': 'https://schema.org/InStock',
                'seller': {
                  '@type': 'Organization',
                  'name': 'YKP Supplies'
                }
              }
            })
          }}
        />
      </Head>

      {/* Breadcrumb Navigation */}
      <section className="py-4 border-b border-slate-800 bg-[#0B0D11]">
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
            <span className="text-[#D4AF37] font-semibold truncate max-w-xs">{title}</span>
          </nav>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Gallery Showcase (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 p-6 flex items-center justify-center shadow-2xl">
              <Image
                src={currentGalleryImg}
                alt={imageSeo.altEn}
                fill
                className="object-contain p-4"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 bg-black/80 px-2.5 py-1 rounded text-xs font-mono text-[#D4AF37]">
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
                    alt={`${product.name} gallery image ${idx + 1}`}
                    fill
                    className="object-contain p-1"
                    sizes="20vw"
                  />
                </button>
              ))}
            </div>

            {/* Trust Highlights */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 grid grid-cols-3 gap-3 text-center text-xs">
              <div>
                <FaIndustry className="text-[#D4AF37] mx-auto text-base mb-1" />
                <span className="text-slate-300 font-medium block">{isRTL ? 'تصنيع محلي مباشر' : 'Direct Manufacturer'}</span>
                <span className="text-[10px] text-slate-500">{isRTL ? 'القاهرة الجديدة' : 'New Cairo Facility'}</span>
              </div>
              <div>
                <FaShieldAlt className="text-[#D4AF37] mx-auto text-base mb-1" />
                <span className="text-slate-300 font-medium block">{isRTL ? 'ميموري فوم 50D' : '50D Memory Foam'}</span>
                <span className="text-[10px] text-slate-500">{isRTL ? 'راحة طبية معتمدة' : 'Orthopedic Core'}</span>
              </div>
              <div>
                <FaTruck className="text-[#D4AF37] mx-auto text-base mb-1" />
                <span className="text-slate-300 font-medium block">{isRTL ? 'شحن لجميع الدول' : 'Global Export'}</span>
                <span className="text-[10px] text-slate-500">{isRTL ? 'شحن فوري وسريع' : 'Air & Sea Freight'}</span>
              </div>
            </div>
          </div>

          {/* Product Specifications & Order Engine (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] font-semibold block">
                {collectionTitle}
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold text-white font-serif tracking-tight">
                {title}
              </h1>
              <div className="flex items-center gap-3 pt-2">
                <span className="text-2xl font-bold font-mono text-[#D4AF37]">{product.price}</span>
                <span className="text-xs text-slate-400">
                  {isRTL ? '(سعر التجزئة المقترح • خصم كميات للجملة)' : '(Suggested retail • Wholesale discounts available)'}
                </span>
              </div>
            </div>

            {/* Description & Cultural Significance */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 text-xs leading-relaxed text-slate-300">
              <h3 className="text-sm font-bold text-white font-serif flex items-center gap-2">
                <span>𓂀</span>
                {isRTL ? 'الرمز الفرعوني وقصة التصميم' : 'Egyptian Cultural Symbolism'}
              </h3>
              <p>{isRTL ? product.culturalStoryAr : product.culturalStory}</p>
              <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-slate-400">
                <span className="text-slate-500">{isRTL ? 'الرمز الأثري:' : 'Symbol:'}</span>
                <span className="text-slate-200 font-medium">{isRTL ? product.symbolAr : product.symbol}</span>
              </div>
            </div>

            {/* Key Technical Specifications */}
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2 text-xs">
              <h3 className="text-sm font-bold text-white mb-2">{isRTL ? 'المواصفات الفنية' : 'Product Specifications'}</h3>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div>
                  <span className="text-slate-500 block text-[10px]">{isRTL ? 'الحشوة' : 'Core Material'}</span>
                  <span>{product.specifications.material}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">{isRTL ? 'الأبعاد' : 'Dimensions'}</span>
                  <span className="font-mono">{product.specifications.dimensions}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">{isRTL ? 'الوزن' : 'Weight'}</span>
                  <span className="font-mono">{product.specifications.weight}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">{isRTL ? 'العناية' : 'Care'}</span>
                  <span>{product.specifications.care}</span>
                </div>
              </div>
            </div>

            {/* Dual Ordering Actions (Wholesale & Retail) */}
            <div className="p-6 rounded-2xl bg-[#0E1118] border border-amber-900/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">{isRTL ? 'الكمية المطلوبة:' : 'Quantity:'}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="font-mono text-white text-sm font-bold px-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 transition-all"
                >
                  <FaWhatsapp className="text-base" />
                  <span>{isRTL ? 'طلب سريع للأفراد عبر واتساب' : 'Fast Retail Order via WhatsApp'}</span>
                </button>

                <Link
                  href={`/wholesale?product=${product.id}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold text-xs flex items-center justify-center hover:opacity-95 transition-opacity"
                >
                  <span>{isRTL ? 'طلب عرض سعر جملة (B2B)' : 'Request Wholesale Quote'}</span>
                </Link>
              </div>

              <div className="text-center pt-2">
                <Link
                  href="/retail"
                  className="text-xs text-slate-400 hover:text-[#D4AF37] underline"
                >
                  {isRTL ? 'أو افتح صفحة نموذج التجزئة الكامل ←' : 'Or open full retail delivery form →'}
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="py-16 border-t border-slate-800 bg-[#0B0D11]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif mb-8">
              {isRTL ? 'موديلات أخرى مقترحة من نفس المجموعة' : 'Complementary Heritage Designs'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.collection}/${rel.id}`}
                  className="group rounded-xl bg-slate-900/70 border border-slate-800 hover:border-[#D4AF37]/50 p-3 transition-all"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-950 mb-3">
                    <Image
                      src={rel.image}
                      alt={rel.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform"
                      sizes="25vw"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-white font-serif line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                    {rel.name}
                  </h4>
                  <span className="text-xs font-mono text-[#D4AF37] font-semibold mt-1 block">
                    {rel.price}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { collection: string; id: string } }[] = [];
  const collections = ['royal', 'sacred', 'heritage', 'custom', 'premium', 'classic', 'print'];

  collections.forEach(collection => {
    const isPremium = collection === 'royal' || collection === 'premium';
    const isClassic = collection === 'sacred' || collection === 'classic';
    const isCustom = collection === 'custom' || collection === 'print';
    const count = isPremium ? 23 : isClassic ? 21 : isCustom ? 5 : 36;

    for (let i = 1; i <= count; i++) {
      const id = isPremium ? `b123-${i.toString().padStart(3, '0')}` :
        isClassic ? `t-${i.toString().padStart(3, '0')}` :
          isCustom ? `print-${i.toString().padStart(3, '0')}` :
            `tb-${i.toString().padStart(3, '0')}`;
      paths.push({
        params: { collection, id }
      });
    }
  });

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const collection = (params?.collection as string) || 'royal';
  const id = (params?.id as string) || 'b123-001';

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
    modelCode: imageSeo.modelCode,
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
      'High-Density Ergonomic Memory Foam',
      'Breathable Egyptian Cotton Cover',
      'Authentic Hieroglyphic Embroidery',
      'Washable Zippered Enclosure'
    ],
    specifications: {
      material: imageSeo.materialEn,
      dimensions: imageSeo.dimensions,
      weight: imageSeo.weight,
      care: 'Machine washable cover (gentle cycle)',
      warranty: '2-Year Manufacturer Defect Guarantee'
    },
    gallery: [
      mainImg,
      `/prodect/${imgFolder}/${productNum > 1 ? productNum - 1 : 2}.${imgExt}`,
      `/prodect/${imgFolder}/${productNum < 5 ? productNum + 1 : 1}.${imgExt}`,
    ]
  };

  // 4 Related Products
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