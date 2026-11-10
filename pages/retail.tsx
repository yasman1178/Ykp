import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaShieldAlt, FaTruck, FaUndo, FaStar, FaCheck, FaPhoneAlt, FaRegPaperPlane } from 'react-icons/fa';
import SEO from '@/components/SEO';
import Layout from '@/components/layout/Layout';
import { getTranslations } from '@/lib/translations';
import { ALL_PRODUCTS, COLLECTION_SUMMARIES } from '@/data/products';
import { getProductImageSeo } from '@/lib/product-image-seo';

interface RetailPageProps {
  translations: any;
  locale: string;
}

export default function RetailPage({ translations: t, locale }: RetailPageProps) {
  const isRTL = locale === 'ar';
  const featuredPillows = ALL_PRODUCTS.slice(0, 18);

  const [selectedProductId, setSelectedProductId] = useState<string>(featuredPillows[0]?.id || 'b123-001');
  const [quantity, setQuantity] = useState<number>(1);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeProduct = featuredPillows.find(p => p.id === selectedProductId) || featuredPillows[0];
  const activeImageSeo = getProductImageSeo(activeProduct?.primaryImage || '/prodect/b123/1.webp');

  const unitPrice = activeProduct?.pricing?.retail?.min || 55;
  const totalPrice = unitPrice * quantity;

  // Generate WhatsApp Direct Link
  const handleWhatsAppOrder = () => {
    const productName = isRTL ? activeImageSeo.titleAr : activeImageSeo.titleEn;
    const msg = isRTL
      ? `مرحباً مصنع YKP Supplies، أود طلب قطعة تجزئة:\n- المنتج: ${productName} (${activeImageSeo.modelCode})\n- الكمية: ${quantity}\n- السعر التقريبي: $${totalPrice}\n- الاسم: ${customerName || 'عميل'}\n- المدينة: ${city || 'مصر'}\n- الهاتف: ${phone || ''}`
      : `Hello YKP Supplies, I would like to order a retail travel pillow:\n- Product: ${productName} (${activeImageSeo.modelCode})\n- Quantity: ${quantity}\n- Est. Price: $${totalPrice}\n- Name: ${customerName || 'Customer'}\n- Location: ${city || 'Egypt'}\n- Phone: ${phone || ''}`;
    
    const waUrl = `https://wa.me/201002406013?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/retail-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone,
          city,
          address,
          selectedProduct: `${activeImageSeo.titleEn} (${activeImageSeo.modelCode})`,
          quantity,
          notes
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setOrderSuccess(data.orderId || 'RET-SUCCESS');
          return;
        }
      }
      throw new Error('Static fallback');
    } catch (err: any) {
      const waText = encodeURIComponent(`*طلب تجزئة جديد - YKP Supplies*\nالعميل: ${customerName}\nالهاتف: ${phone}\nالمدينة/العنوان: ${city} - ${address}\nالمنتج: ${activeImageSeo.titleEn} (${activeImageSeo.modelCode})\nالكمية: ${quantity}\nملاحظات: ${notes || 'لا يوجد'}`);
      if (typeof window !== 'undefined') {
        window.open(`https://wa.me/201002406013?text=${waText}`, '_blank');
      }
      setOrderSuccess(`WA-${Date.now().toString().slice(-6)}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout
      pageTitle={isRTL ? 'طلب مخدات السفر الفرعونية للأفراد والتجزئة | YKP Supplies' : 'Retail Direct Travel Pillows - Authentic Egyptian Memory Foam | YKP Supplies'}
      metaDescription={isRTL
        ? 'اقتنِ مخدة السفر الفرعونية الفاخرة للاستخدام الشخصي أو كهدية تذكارية راقية. ميموري فوم طبي عالي الكثافة، قطن مصري فاخر، وشحن مباشر لجميع المحافظات وحول العالم.'
        : 'Order authentic Egyptian Pharaonic memory foam travel pillows directly for personal travel or luxury gifts. Worldwide express shipping & direct manufacturer guarantee from New Cairo.'}
      canonicalUrl="https://www.ykp-eg.com/retail"
    >
      <div className="bg-[#0B0D11] text-slate-100 selection:bg-[#D4AF37] selection:text-black" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Hero Header */}
      <section className="relative pt-12 pb-16 border-b border-amber-900/20 overflow-hidden bg-gradient-to-b from-[#131720] to-[#0B0D11]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.08)_0%,_transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-3 border border-[#D4AF37]/30 px-3 py-1 rounded-full bg-[#D4AF37]/5">
            {isRTL ? 'البيع المباشر للأفراد والتجزئة' : 'Retail & Personal Travel Inquiries'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-serif">
            {isRTL ? 'مخدتك الفرعونية الفاخرة لرحلة لا تُنسى' : 'Your Sovereign Pharaonic Travel Companion'}
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            {isRTL
              ? 'صُممت بدقة متناهية بمصنعنا في القاهرة الجديدة. راحة الميموري فوم الطبي مع عظمة الرموز المصرية القديمة لدعم رقبتك في كل رحلة جوية وبرية.'
              : 'Direct from our New Cairo manufacturing atelier. High-density ergonomic memory foam with authentic hieroglyphic artistry for unmatched cervical travel support.'}
          </p>

          {/* Quick Trust Highlights */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <FaShieldAlt className="text-[#D4AF37] text-xl shrink-0" />
              <div>
                <div className="text-xs font-semibold text-white">{isRTL ? 'ميموري فوم طبي 100%' : '100% Memory Foam'}</div>
                <div className="text-[11px] text-slate-400">{isRTL ? 'كثافة عالية وارتداد مريح' : 'High density support'}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <FaTruck className="text-[#D4AF37] text-xl shrink-0" />
              <div>
                <div className="text-xs font-semibold text-white">{isRTL ? 'شحن فوري ومباشر' : 'Express Delivery'}</div>
                <div className="text-[11px] text-slate-400">{isRTL ? 'لجميع المدن والدول' : 'Domestic & Global'}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <FaUndo className="text-[#D4AF37] text-xl shrink-0" />
              <div>
                <div className="text-xs font-semibold text-white">{isRTL ? 'ضمان استبدال 14 يوم' : '14-Day Guarantee'}</div>
                <div className="text-[11px] text-slate-400">{isRTL ? 'جودة تصنيع مضمونة' : 'Defect-free guarantee'}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <FaWhatsapp className="text-emerald-400 text-xl shrink-0" />
              <div>
                <div className="text-xs font-semibold text-white">{isRTL ? 'طلب سريع بواتساب' : 'WhatsApp Fast-Track'}</div>
                <div className="text-[11px] text-slate-400">{isRTL ? 'تأكيد فوري بنقرة واحدة' : 'Instant confirmation'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Order Workspace */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Product Selector Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#11141B] rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  {isRTL ? '1. اختر الموديل الفرعوني المفضل' : '1. Select Your Preferred Pharaonic Model'}
                </h2>
                <span className="text-xs text-slate-400">
                  {featuredPillows.length} {isRTL ? 'موديلاً متاحاً' : 'Models Available'}
                </span>
              </div>

              {/* Grid of Pillow Thumbnails */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-h-[360px] overflow-y-auto pr-1">
                {featuredPillows.map((pillow) => {
                  const isSelected = pillow.id === selectedProductId;
                  const itemSeo = getProductImageSeo(pillow.primaryImage);
                  return (
                    <button
                      key={pillow.id}
                      onClick={() => setSelectedProductId(pillow.id)}
                      className={`relative rounded-xl overflow-hidden aspect-square border text-left transition-all ${
                        isSelected
                          ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/40 scale-105 shadow-lg shadow-[#D4AF37]/10'
                          : 'border-slate-800 hover:border-slate-600 bg-slate-900/60 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={pillow.primaryImage}
                        alt={itemSeo.altEn}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 30vw, 15vw"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-1 text-[10px] text-center font-mono text-amber-300 truncate">
                        {itemSeo.modelCode}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Product Showcase Detail */}
              <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 relative aspect-square rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <Image
                    src={activeProduct.primaryImage}
                    alt={activeImageSeo.altEn}
                    fill
                    className="object-contain p-2"
                    priority
                  />
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-mono text-[#D4AF37]">
                    {activeImageSeo.modelCode}
                  </div>
                </div>

                <div className="sm:col-span-7 space-y-3">
                  <div className="text-xs uppercase tracking-wider text-[#D4AF37] font-medium">
                    {isRTL ? activeImageSeo.collectionNameAr : activeImageSeo.collectionNameEn}
                  </div>
                  <h3 className="text-xl font-bold text-white font-serif">
                    {isRTL ? activeImageSeo.titleAr : activeImageSeo.titleEn}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isRTL ? activeImageSeo.culturalStoryAr : activeImageSeo.culturalStoryEn}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-2">
                    <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                      <span className="text-slate-500 block text-[10px] uppercase">{isRTL ? 'الخامة' : 'Material'}</span>
                      <span className="text-slate-200 font-medium">{isRTL ? 'ميموري فوم + قطن مصري' : 'Memory Foam + Cotton'}</span>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                      <span className="text-slate-500 block text-[10px] uppercase">{isRTL ? 'المقاس' : 'Dimensions'}</span>
                      <span className="text-slate-200 font-mono">{activeImageSeo.dimensions.split('(')[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cultural Story & Manufacturing Authenticity */}
            <div className="bg-[#11141B] rounded-2xl p-6 border border-slate-800 text-sm space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>𓂀</span>
                {isRTL ? 'سر الصنعة المصرية الأصيلة' : 'Authentic Egyptian Craftsmanship'}
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                {isRTL
                  ? 'كل مخدة يتم تشكيلها من رغوة الذاكرة المرنة التي تتكيف مع حرارة الجسم وشكل الرقبة، ومغطاة بنسيج مخملي قطني يسمح بمرور الهواء ليمنع التعرق أثناء الرحلات الطويلة، مع سحاب خفي قابل للفك والغسيل بسهولة.'
                  : 'Every pillow is sculpted with high-resilience memory foam that conforms smoothly to your neck contours, paired with breathable Egyptian cotton-velvet to prevent heat build-up on long flights. Equipped with a hidden, washable zipper.'}
              </p>
            </div>
          </div>

          {/* Right: Checkout & Direct Order Form (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#11141B] rounded-2xl p-6 border border-amber-900/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none" />

              <h2 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
                <span>{isRTL ? '2. إتمام الطلب السريع' : '2. Instant Order Checkout'}</span>
                <span className="text-[#D4AF37] font-mono text-xl">${totalPrice}</span>
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                {isRTL ? 'ادفع عند الاستلام أو أكد طلبك مباشرة عبر واتساب' : 'Cash on delivery or instant order dispatch via WhatsApp'}
              </p>

              {/* Quantity Selector */}
              <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-center justify-between mb-5">
                <span className="text-xs text-slate-300 font-medium">{isRTL ? 'الكمية المطلوبة:' : 'Quantity:'}</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="font-mono text-white text-base font-semibold px-2">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Fast WhatsApp CTA Button */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 transition-all mb-6"
              >
                <FaWhatsapp className="text-lg" />
                <span>{isRTL ? 'اطلب فوراً عبر واتساب (تأكيد فوري)' : 'Order Instantly via WhatsApp'}</span>
              </button>

              <div className="relative flex py-2 items-center mb-6">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink mx-4 text-slate-500 text-xs uppercase">{isRTL ? 'أو سجل بياناتك للشحن' : 'Or Fill Delivery Details'}</span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              {/* Direct Form */}
              {orderSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-500/40 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-black mx-auto flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <h4 className="text-base font-bold text-white">{isRTL ? 'تم استلام طلبك بنجاح!' : 'Order Received!'}</h4>
                  <p className="text-xs text-slate-300">
                    {isRTL
                      ? `رقم الطلب: ${orderSuccess}. سيتواصل معك فريق خدمة العملاء لتأكيد موعد التوصيل.`
                      : `Order reference: ${orderSuccess}. Our fulfillment team will contact you shortly to confirm delivery.`}
                  </p>
                  <button
                    onClick={() => setOrderSuccess(null)}
                    className="mt-3 text-xs text-[#D4AF37] underline"
                  >
                    {isRTL ? 'طلب مخدة أخرى' : 'Order another pillow'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
                  {errorMsg && (
                    <div className="p-2.5 rounded bg-rose-900/40 border border-rose-500 text-rose-200 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-slate-400 mb-1">{isRTL ? 'الاسم بالكامل *' : 'Full Name *'}</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={isRTL ? 'مثال: أحمد محمود' : 'e.g. John Smith'}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">{isRTL ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp *'}</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="010XXXXXXXX"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">{isRTL ? 'المدينة / المحافظة *' : 'City / Region *'}</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder={isRTL ? 'القاهرة، الإسكندرية...' : 'Cairo, Dubai, London...'}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">{isRTL ? 'عنوان التوصيل بالتفصيل *' : 'Delivery Address *'}</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={isRTL ? 'اسم الشارع، رقم العقار، الشقة' : 'Street name, building number, apartment'}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">{isRTL ? 'ملاحظات إضافية (اختياري)' : 'Order Notes (Optional)'}</label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={isRTL ? 'تغليف هدية، موعد مفضل للتسليم...' : 'Gift wrap request, delivery preferences...'}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold text-sm hover:opacity-95 transition-opacity disabled:opacity-50"
                  >
                    {submitting
                      ? (isRTL ? 'جاري الإرسال...' : 'Submitting Order...')
                      : (isRTL ? `تأكيد الطلب ($${totalPrice})` : `Confirm Order ($${totalPrice})`)}
                  </button>
                </form>
              )}

              {/* B2B Wholesale Redirect Callout */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
                <p className="text-[11px] text-slate-400">
                  {isRTL ? 'هل تمثل شركة أو متجراً وتبحث عن كميات وأسعار جملة؟' : 'Looking for commercial wholesale or custom branded orders?'}
                </p>
                <Link
                  href="/wholesale"
                  className="inline-block mt-1 text-xs text-[#D4AF37] hover:underline font-semibold"
                >
                  {isRTL ? 'انتقل إلى بوابة طلبات الجملة B2B ←' : 'Go to B2B Wholesale Portal →'}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const translations = getTranslations(locale);
  return {
    props: {
      translations,
      locale,
    },
  };
};
