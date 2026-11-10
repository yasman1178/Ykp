import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { getStaticPropsWithTranslations } from '@/lib/translations';
import {
  FaTruck,
  FaAward,
  FaWhatsapp,
  FaCalculator,
  FaFileContract,
  FaIndustry,
  FaCheckCircle,
  FaBoxes,
  FaGlobeAmericas,
  FaShieldAlt,
  FaDownload,
  FaBuilding,
  FaArrowRight,
  FaArrowLeft,
  FaEnvelope,
  FaPhoneAlt
} from 'react-icons/fa';
import SEO from '@/components/SEO';

interface WholesalePageProps {
  translations: any;
  locale: string;
}

export default function WholesalePage({ translations: t, locale }: WholesalePageProps) {
  const isRTL = locale === 'ar';
  const router = useRouter();
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  const [activeTab, setActiveTab] = useState<'pricing' | 'calculator' | 'privatelabel' | 'agreements'>('pricing');

  // Calculator state
  const [calcProduct, setCalcProduct] = useState<'pillow' | 'camel-22' | 'camel-28'>('pillow');
  const [calcQuantity, setCalcQuantity] = useState<number>(200);
  const [calcBranding, setCalcBranding] = useState<'standard' | 'custom-embroidery'>('standard');
  const [calcDestination, setCalcDestination] = useState<'egypt' | 'export'>('egypt');

  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: isRTL ? 'مصر' : 'Egypt',
    businessType: 'hotel',
    customNotes: ''
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Pricing engine logic based on official instructions
  const calculatePricing = () => {
    let unitPrice = 0;
    let moq = 200;

    if (calcProduct === 'pillow') {
      moq = 200;
      if (calcQuantity >= 1000) {
        unitPrice = calcBranding === 'custom-embroidery' ? 6.5 : 5.5; // $5 to $7 range
      } else {
        unitPrice = calcBranding === 'custom-embroidery' ? 13.0 : 12.0; // Starts from $12
      }
    } else if (calcProduct === 'camel-22') {
      moq = 130;
      unitPrice = 3.0; // Official $3
    } else if (calcProduct === 'camel-28') {
      moq = 130;
      unitPrice = 4.0; // Official $4
    }

    const total = Math.round(unitPrice * Math.max(calcQuantity, moq));
    return { unitPrice, total, moq };
  };

  const { unitPrice, total, moq } = calculatePricing();

  const handleProductChange = (prod: 'pillow' | 'camel-22' | 'camel-28') => {
    setCalcProduct(prod);
    if (prod === 'pillow' && calcQuantity < 200) {
      setCalcQuantity(200);
    } else if ((prod === 'camel-22' || prod === 'camel-28') && calcQuantity < 130) {
      setCalcQuantity(130);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    const productName = calcProduct === 'pillow' 
      ? (isRTL ? 'مخدات سفر ميموري فوم فرعونية' : 'Memory Foam Travel Pillows')
      : calcProduct === 'camel-22'
        ? (isRTL ? 'دمية الجمل المحبوب (٢٢ سم)' : 'The Beloved Camel (22 cm)')
        : (isRTL ? 'دمية الجمل المحبوب (٢٨ سم)' : 'The Beloved Camel (28 cm)');

    const inquiryPayload = {
      ...formData,
      product: productName,
      quantity: calcQuantity,
      unitPrice,
      totalEstimate: total,
      branding: calcBranding,
      deliveryDestination: calcDestination,
      deliveryTerm: calcDestination === 'egypt' ? 'Free Doorstep Delivery in Egypt' : 'FOB Cairo / Alexandria'
    };

    // Prepare WhatsApp fallback message
    const waText = isRTL
      ? `*طلب عرض أسعار جملة رسمي - YKP Supplies*
🏢 الشركة: ${formData.companyName}
👤 المسؤول: ${formData.contactName}
✉️ البريد: ${formData.email}
📱 الهاتف: ${formData.phone}
🌍 الدولة: ${formData.country}
🏷️ نوع النشاط: ${formData.businessType}
📦 المنتج: ${productName}
🔢 الكمية: ${calcQuantity} قطعة
💵 التكلفة التقديرية للقطعة: $${unitPrice} USD (الإجمالي: $${total} USD)
🚚 وجهة التسليم: ${calcDestination === 'egypt' ? 'داخل مصر (شحن مجاني شامل حتى باب المشتري)' : 'تصدير دولي (FOB)'}
🎨 نوع التخصيص: ${calcBranding === 'custom-embroidery' ? 'تطريز شعار خاص (Private Label)' : 'تصميم فرعوني قياسي'}
📝 ملاحظات: ${formData.customNotes || 'يرجى إرسال عرض السعر والكتالوج'}`
      : `*Official B2B Wholesale Quote Request - YKP Supplies*
Company: ${formData.companyName}
Contact: ${formData.contactName}
Email: ${formData.email}
Phone: ${formData.phone}
Country: ${formData.country}
Business: ${formData.businessType}
Product: ${productName}
Quantity: ${calcQuantity} pcs
Estimated Unit Price: $${unitPrice} USD (Total: $${total} USD)
Delivery: ${calcDestination === 'egypt' ? 'Free Doorstep Delivery in Egypt' : 'International Export (FOB)'}
Customization: ${calcBranding}
Notes: ${formData.customNotes}`;

    try {
      const response = await fetch('/api/wholesale/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryPayload)
      });

      if (!response.ok) {
        throw new Error('API dispatch failed');
      }

      setSubmitStatus('success');
      setSubmitMessage(isRTL 
        ? 'تم استلام طلبك بنجاح! تم توجيه بياناتك لإدارة مبيعات المصنع وسيتم الرد خلال ساعات.'
        : 'Your quote request has been received! Our factory sales team will respond promptly.');
    } catch (err) {
      // Fallback opens WhatsApp directly
      if (typeof window !== 'undefined') {
        window.open(`https://wa.me/201002406013?text=${encodeURIComponent(waText)}`, '_blank');
      }
      setSubmitStatus('success');
      setSubmitMessage(isRTL 
        ? 'تم فتح واتساب مباشرة مع إدارة مبيعات الجملة لتأكيد طلبك وعرض السعر فوراً.'
        : 'Wholesale inquiry opened directly in WhatsApp with our sales department.');
    }
  };

  return (
    <div className="min-h-screen bg-[#07090C] text-slate-100 selection:bg-[#D4AF37] selection:text-black" dir={isRTL ? 'rtl' : 'ltr'}>
      <SEO
        title={isRTL ? 'توريد مخدات السفر والجمل المحبوب بالجملة | مصنع YKP Supplies' : 'Wholesale Travel Pillows & Plush Souvenirs B2B | YKP Supplies'}
        description={isRTL
          ? 'أسعار الجملة الرسمية لمخدات السفر الطبية الميموري فوم ودمية الجمل المحبوب من مصنع YKP Supplies بالقاهرة الجديدة. شحن مجاني شامل لباب المشتري بجميع محافظات مصر وتصدير عالمي.'
          : 'Official B2B factory wholesale pricing for Egyptian memory foam travel pillows and The Beloved Camel plush toys. Free comprehensive doorstep delivery across Egypt and global FOB export.'}
        canonicalUrl="https://www.ykp-eg.com/wholesale"
        ogImage="/prodect/Print/master.jpg"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden border-b border-amber-900/20 bg-gradient-to-b from-[#0F131A] via-[#0B0D11] to-[#07090C]">
        <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.12)_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-xs text-[#D4AF37] font-mono tracking-wider uppercase">
            <FaIndustry className="text-sm" />
            <span>{isRTL ? 'المصنع المصري المباشر • القاهرة الجديدة' : 'Direct Egyptian Manufacturer • New Cairo'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white max-w-4xl mx-auto leading-tight">
            {isRTL ? (
              <>
                عقود التوريد وتصنيع الجملة
                <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B]">
                  مخدات السفر الفرعونية ودمية الجمل المحبوب
                </span>
              </>
            ) : (
              <>
                B2B Wholesale & Private Label
                <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B]">
                  Egyptian Travel Pillows & Plush Souvenirs
                </span>
              </>
            )}
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl mx-auto leading-relaxed">
            {isRTL
              ? 'مباشرة من خطوط إنتاجنا في القاهرة الجديدة إلى الفنادق، البازارات، المطارات، شركات السياحة والموزعين حول العالم. أسعار شفافة حسب الكميات، شحن مجاني شامل حتى باب المشتري بجميع محافظات مصر، وإمكانية تخصيص كاملة بعلامتك الخاصة.'
              : 'Direct factory supply for hotels, airport boutiques, tourism agencies, and global distributors. Transparent tiered pricing, free comprehensive doorstep delivery across Egypt, and full OEM private labeling.'}
          </p>

          {/* Quick Contact Chips */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-300">
            <a href="https://wa.me/201002406013" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/60 transition-colors">
              <FaWhatsapp className="text-sm" />
              <span>+20 100 240 6013</span>
            </a>
            <a href="mailto:sales@ykp-eg.com" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors">
              <FaEnvelope className="text-sm text-[#D4AF37]" />
              <span>sales@ykp-eg.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="py-4 bg-[#090C10] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-xs">
            <div className="flex items-center justify-center gap-2 text-slate-300">
              <FaTruck className="text-[#D4AF37] text-base" />
              <span className="font-semibold text-white">{isRTL ? 'تسليم مصر للجميع مشمول ومجاني' : 'Free Doorstep Delivery Across Egypt'}</span>
              <span className="text-slate-400">{isRTL ? '(لباب المشتري بكافة المحافظات)' : '(All wholesale orders)'}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-300">
              <FaGlobeAmericas className="text-[#D4AF37] text-base" />
              <span className="font-semibold text-white">{isRTL ? 'تصدير دولي معتمد FOB / CIF' : 'Certified Global Export FOB / CIF'}</span>
              <span className="text-slate-400">{isRTL ? '(شهادة منشأ وفواتير معتمدة)' : '(Port & airport transit)'}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-300">
              <FaShieldAlt className="text-[#D4AF37] text-base" />
              <span className="font-semibold text-white">{isRTL ? 'ضمان مصنعي وجودة خامات 100%' : '100% Factory Quality Guarantee'}</span>
              <span className="text-slate-400">{isRTL ? '(عينات معتمدة قبل الإنتاج)' : '(Golden pre-production samples)'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-800 pb-4">
          {[
            { id: 'pricing', labelEn: '1. Wholesale Price Tiers', labelAr: '١. جداول أسعار الجملة الرسمية', icon: <FaBoxes /> },
            { id: 'calculator', labelEn: '2. Live Quote Calculator', labelAr: '٢. حاسبة الأسعار الفورية وطلب عرض', icon: <FaCalculator /> },
            { id: 'privatelabel', labelEn: '3. Private Label / OEM', labelAr: '٣. تصنيع بعلامة خاصة وتطريز', icon: <FaAward /> },
            { id: 'agreements', labelEn: '4. Commercial Agreements & Terms', labelAr: '٤. الاتفاقيات والشروط التجارية', icon: <FaFileContract /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black shadow-lg shadow-[#D4AF37]/10'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {tab.icon}
              <span>{isRTL ? tab.labelAr : tab.labelEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Areas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* TAB 1: Official Pricing Tables */}
        {activeTab === 'pricing' && (
          <div className="space-y-10">
            
            {/* Header info note */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-200 text-xs flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-[#D4AF37] shrink-0" />
                <span>{isRTL 
                  ? 'الأسعار معتمدة رسمياً بالدولار الأمريكي (USD). تخضع الأسعار لتغير الخامات وسعر الصرف، وتعتمد بالعرض المكتوب. تسليم مصر مشمول ومجاني لباب المشتري.'
                  : 'Official confirmed wholesale pricing in USD. Prices subject to raw material and FX fluctuations, validated by written pro-forma. Free delivery across Egypt.'}</span>
              </div>
              <span className="font-mono text-[11px] text-amber-400 font-bold">{isRTL ? 'صلاحية العرض: 15 يوماً' : 'Quote Validity: 15 Days'}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Product 1: Travel Pillows */}
              <div className="p-6 rounded-2xl bg-[#0F131A] border border-slate-800 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] uppercase tracking-wider font-mono text-[#D4AF37]">
                      {isRTL ? 'مخدات السفر الطبية' : 'Travel Pillows Category'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">
                      MOQ: 200 pcs
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-white mb-2">
                    {isRTL ? 'مخدة السفر ميموري فوم (تصميمات فرعونية)' : 'Memory Foam Travel Pillows (Pharaonic Motifs)'}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {isRTL 
                      ? 'رغوة ذاكرة طبية 50D عالية الارتداد مع غطاء قطن مصري فاخر قابل للغسيل وسحاب مخفي، مع كيس سفر مخصص.'
                      : '50D high-resilience medical-grade memory foam with washable Egyptian cotton jacquard cover, hidden zipper, and pouch.'}
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left rtl:text-right text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-mono">
                          <th className="pb-3">{isRTL ? 'الكمية المطلوبة' : 'Quantity Tier'}</th>
                          <th className="pb-3">{isRTL ? 'سعر القطعة (USD)' : 'Price / Unit (USD)'}</th>
                          <th className="pb-3">{isRTL ? 'ملاحظات المواصفات' : 'Specifications'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        <tr className="hover:bg-slate-900/40">
                          <td className="py-3.5 text-white font-bold">{isRTL ? 'من 200 إلى 999 قطعة' : '200 – 999 pieces'}</td>
                          <td className="py-3.5 text-[#D4AF37] font-bold text-sm">{isRTL ? 'يبدأ من 12$' : 'Starts from $12.00'}</td>
                          <td className="py-3.5 text-slate-400 text-[11px]">{isRTL ? 'تطريز فرعوني فاخر أو شعار خاص' : 'Pharaonic embroidery or custom logo'}</td>
                        </tr>
                        <tr className="bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10">
                          <td className="py-3.5 text-white font-bold">{isRTL ? 'من 1,000 قطعة فأكثر' : '1,000+ pieces'}</td>
                          <td className="py-3.5 text-emerald-400 font-bold text-sm">{isRTL ? 'من 5$ إلى 7$' : '$5.00 – $7.00'}</td>
                          <td className="py-3.5 text-slate-300 text-[11px]">{isRTL ? 'حسب الموديل والتطريز ونوع التغليف' : 'According to embroidery & packaging'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{isRTL ? 'سعر التجزئة بالموقع: 35$ - 85$' : 'Retail Reference: $35 - $85 USD'}</span>
                  <button
                    onClick={() => { setActiveTab('calculator'); setCalcProduct('pillow'); }}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>{isRTL ? 'احسب كميتك' : 'Calculate'}</span>
                    <Arrow className="text-[10px]" />
                  </button>
                </div>
              </div>

              {/* Product 2: The Beloved Camel Plush */}
              <div className="p-6 rounded-2xl bg-[#0F131A] border border-slate-800 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] uppercase tracking-wider font-mono text-[#D4AF37]">
                      {isRTL ? 'الهدايا القطيفة التراثية' : 'Heritage Plush Category'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-[10px] text-emerald-400 border border-emerald-800 font-mono">
                      MOQ: 130 pcs
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-white mb-2">
                    {isRTL ? 'دمية "الجمل المحبوب" القطيفة' : 'The Beloved Camel (Pharaonic Plush Toy)'}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {isRTL 
                      ? 'دمية قطيفة ناعمة بأرجل ثابتة وسرج فرعوني مطرز "I ❤ EGYPT". متوفرة في 4 ألوان: أزرق ملكي، رملي، بنفسجي إمبراطوري، ووردي لوتس.'
                      : 'Super-soft velvet plush with embroidered ceremonial saddle ("I ❤ EGYPT") in 4 colors: Royal Blue, Desert Tan, Imperial Purple, Lotus Pink.'}
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left rtl:text-right text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-mono">
                          <th className="pb-3">{isRTL ? 'المقاس' : 'Size Spec'}</th>
                          <th className="pb-3">{isRTL ? 'سعر الجملة (USD)' : 'Wholesale Price (USD)'}</th>
                          <th className="pb-3">{isRTL ? 'الحد الأدنى (MOQ)' : 'Min. Order (MOQ)'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        <tr className="hover:bg-slate-900/40">
                          <td className="py-3.5 text-white font-bold">{isRTL ? 'قياسي ٢٢ سم' : 'Standard 22 cm'}</td>
                          <td className="py-3.5 text-[#D4AF37] font-bold text-sm">$3.00</td>
                          <td className="py-3.5 text-slate-300 text-[11px]">{isRTL ? '130 قطعة' : '130 pieces'}</td>
                        </tr>
                        <tr className="hover:bg-slate-900/40">
                          <td className="py-3.5 text-white font-bold">{isRTL ? 'كبير فاخر ٢٨ سم' : 'Grand Deluxe 28 cm'}</td>
                          <td className="py-3.5 text-[#D4AF37] font-bold text-sm">$4.00</td>
                          <td className="py-3.5 text-slate-300 text-[11px]">{isRTL ? '130 قطعة' : '130 pieces'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{isRTL ? 'سعر التجزئة بالموقع: 18$ / 380 ج.م' : 'Retail Reference: $18 / 380 EGP'}</span>
                  <button
                    onClick={() => { setActiveTab('calculator'); setCalcProduct('camel-22'); }}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>{isRTL ? 'احسب كميتك' : 'Calculate'}</span>
                    <Arrow className="text-[10px]" />
                  </button>
                </div>
              </div>

            </div>

            {/* Delivery Terms Box */}
            <div className="p-6 rounded-2xl bg-[#0B0D11] border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <FaTruck />
                  <h4>{isRTL ? 'سياسة التسليم داخل جمهورية مصر العربية' : 'Domestic Fulfillment Inside Egypt'}</h4>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {isRTL
                    ? 'التسليم مشمول ومجاني لجميع العملاء لطلبات الجملة حتى باب المشتري في كافة محافظات مصر (القاهرة، الجيزة، الإسكندرية، محافظات الدلتا والقناة، والصعيد، والبحر الأحمر وشرم الشيخ).'
                    : 'Free comprehensive doorstep delivery across all Egyptian governorates for all confirmed wholesale orders (Cairo, Giza, Alexandria, Red Sea resorts, Luxor & Aswan).'}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
                  <FaGlobeAmericas />
                  <h4>{isRTL ? 'سياسة التصدير الدولي (International Export)' : 'International Export Terms'}</h4>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {isRTL
                    ? 'الأسعار المعلنة على أساس FOB ميناء أو مطار القاهرة / الإسكندرية، مع جاهزية كاملة لكافة مستندات التصدير (شهادة المنشأ، الفواتير المعتمدة، وقوائم التعبئة). الشحن الدولي يُسعَّر حسب وجهة المشتري.'
                    : 'Quoted on FOB Cairo Airport / Alexandria Seaport basis. Export documentation (EUR.1, Chamber of Commerce Certificate of Origin, packing lists) provided. CIF freight quoted on demand.'}
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Live Calculator & Quote Request */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 5 Cols: Configurator & Realtime Price */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0F131A] border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <span className="text-xs uppercase font-mono text-[#D4AF37] font-bold">
                  {isRTL ? 'إعداد مواصفات الطلبية' : 'Configure Your Order'}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Instant Tier</span>
              </div>

              {/* Step 1: Select Product */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-200 block">
                  {isRTL ? '١. حدد نوع المنتج:' : '1. Select Product:'}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'pillow', nameEn: 'Memory Foam Travel Pillow', nameAr: 'مخدة سفر ميموري فوم فرعونية (MOQ: 200)' },
                    { id: 'camel-22', nameEn: 'The Beloved Camel (22 cm)', nameAr: 'دمية الجمل المحبوب ٢٢ سم (MOQ: 130)' },
                    { id: 'camel-28', nameEn: 'The Beloved Camel (28 cm)', nameAr: 'دمية الجمل المحبوب ٢٨ سم الفاخر (MOQ: 130)' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleProductChange(p.id as any)}
                      className={`px-3 py-2.5 rounded-xl border text-left rtl:text-right text-xs transition-all ${
                        calcProduct === p.id
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white font-bold'
                          : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {isRTL ? p.nameAr : p.nameEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Quantity */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="font-semibold">{isRTL ? '٢. الكمية التقديرية:' : '2. Estimated Quantity:'}</span>
                  <span className="font-mono text-base font-bold text-[#D4AF37]">{calcQuantity} {isRTL ? 'قطعة' : 'pcs'}</span>
                </div>
                <input
                  type="number"
                  min={moq}
                  step={calcProduct === 'pillow' ? 50 : 10}
                  value={calcQuantity}
                  onChange={(e) => setCalcQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-[#D4AF37]"
                />
                <span className="text-[10px] text-slate-500 font-mono block">
                  {isRTL ? `الحد الأدنى لهذا المنتج: ${moq} قطعة` : `Minimum order quantity for this item: ${moq} pieces`}
                </span>
              </div>

              {/* Step 3: Branding */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-200 block">
                  {isRTL ? '٣. نوع التخصيص والعلامة:' : '3. Customization & Branding:'}
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setCalcBranding('standard')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      calcBranding === 'standard'
                        ? 'border-[#D4AF37] bg-black text-white font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    {isRTL ? 'تصميم فرعوني قياسي' : 'Standard Pharaonic'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcBranding('custom-embroidery')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      calcBranding === 'custom-embroidery'
                        ? 'border-[#D4AF37] bg-black text-white font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    {isRTL ? 'تطريز شعار خاص (OEM)' : 'Custom Embroidery'}
                  </button>
                </div>
              </div>

              {/* Step 4: Destination */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-200 block">
                  {isRTL ? '٤. وجهة التسليم:' : '4. Delivery Destination:'}
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setCalcDestination('egypt')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      calcDestination === 'egypt'
                        ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    {isRTL ? 'داخل مصر (شحن مجاني)' : 'Egypt (Free Delivery)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcDestination('export')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      calcDestination === 'export'
                        ? 'border-[#D4AF37] bg-black text-white font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    {isRTL ? 'تصدير دولي (FOB)' : 'Export (FOB Cairo)'}
                  </button>
                </div>
              </div>

              {/* Calculated Live Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{isRTL ? 'سعر القطعة التقديري:' : 'Estimated Unit Price:'}</span>
                  <span className="font-mono text-[#D4AF37] font-bold text-sm">${unitPrice} USD</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{isRTL ? 'الشحن والتسليم:' : 'Freight & Delivery:'}</span>
                  <span className="text-emerald-400 font-medium">
                    {calcDestination === 'egypt' 
                      ? (isRTL ? 'مجاني لباب المشتري' : 'Free Doorstep') 
                      : (isRTL ? 'FOB موانئ مصر' : 'FOB Cairo/Alex')}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="text-xs font-bold text-white">{isRTL ? 'الإجمالي التقديري:' : 'Total Estimate:'}</span>
                  <span className="font-mono text-xl font-bold text-white">${total.toLocaleString()} USD</span>
                </div>
              </div>

            </div>

            {/* Right 7 Cols: Inquiry Submission Form */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0F131A] border border-slate-800 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white font-serif">
                  {isRTL ? 'إرسال طلب عرض سعر رسمي وتأكيد العينة' : 'Submit Official Wholesale Inquiry'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isRTL ? 'أدخل بيانات منشأتك وسيتواصل معك فريق مبيعات المصنع لإرسال البروفا والفاتورة المبدئية.' : 'Provide your business details to receive formal pro-forma and sample approval schedule.'}
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs flex items-start gap-2">
                  <FaCheckCircle className="text-base shrink-0 mt-0.5 text-emerald-400" />
                  <div>
                    <div className="font-bold">{submitMessage}</div>
                    <div className="text-[11px] mt-1 text-emerald-400">
                      {isRTL ? 'للتواصل الفوري السريع، تواصل معنا عبر واتساب +20 100 240 6013' : 'For urgent orders, connect directly on WhatsApp +20 100 240 6013'}
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium block">
                      {isRTL ? 'اسم الشركة / الفندق / المتجر:' : 'Company / Hotel / Shop Name:'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder={isRTL ? 'مثال: شركة النيل للفنادق والمنتجعات' : 'e.g. Nile Hospitality Group'}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium block">
                      {isRTL ? 'اسم المسؤول للتواصل:' : 'Contact Person:'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder={isRTL ? 'الاسم الثلاثي' : 'Full Name'}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium block">
                      {isRTL ? 'البريد الإلكتروني التجاري:' : 'Corporate Email:'} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="procurement@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium block">
                      {isRTL ? 'رقم الهاتف / الواتساب:' : 'WhatsApp / Mobile Phone:'} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+20 10X XXX XXXX"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium block">
                      {isRTL ? 'الدولة / المحافظة:' : 'Country / Region:'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder={isRTL ? 'مصر، السعودية، الإمارات، ألمانيا...' : 'Egypt, UAE, Germany...'}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium block">
                      {isRTL ? 'نوع النشاط التجاري:' : 'Business Sector:'}
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="hotel">{isRTL ? 'فندق / منتجع سياحي (ضيافة VIP)' : 'Hotel / Luxury Resort'}</option>
                      <option value="tourism-agency">{isRTL ? 'شركة سياحة ورحلات طيران' : 'Tour Operator / Airline'}</option>
                      <option value="bazaar-retail">{isRTL ? 'بازار سياحي / متجر هدايا وتذكارات' : 'Bazaar / Souvenir Shop'}</option>
                      <option value="airport-dutyfree">{isRTL ? 'متجر مطارات / سوق حرة' : 'Airport Duty Free'}</option>
                      <option value="international-distributor">{isRTL ? 'موزع وتاجر جملة دولي' : 'International Distributor'}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium block">
                    {isRTL ? 'مواصفات إضافية أو تفاصيل التخصيص والتغليف:' : 'Additional Specifications & Requirements:'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.customNotes}
                    onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                    placeholder={isRTL ? 'اذكر أي متطلبات بخصوص ألوان القماش، مقاسات خاصة، أو مواعيد التسليم المطلوبة...' : 'Details on Pantone colors, sample requirements, target delivery dates...'}
                    className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:opacity-90 text-black font-bold text-sm transition-all shadow-lg shadow-[#D4AF37]/10 flex items-center justify-center gap-2"
                >
                  <FaCalculator />
                  <span>
                    {submitStatus === 'loading'
                      ? (isRTL ? 'جاري إرسال الطلب...' : 'Submitting Request...')
                      : (isRTL ? 'إرسال طلب عرض السعر الرسمي الآن' : 'Request Official Written Quotation')}
                  </span>
                </button>
              </form>
            </div>

          </div>
        )}

        {/* TAB 3: Private Label / OEM */}
        {activeTab === 'privatelabel' && (
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-[#0F131A] border border-slate-800 space-y-4">
              <span className="text-xs font-mono uppercase text-[#D4AF37] font-semibold block">
                {isRTL ? 'التصنيع بعلامتك الخاصة (OEM / Private Label)' : 'Contract Manufacturing & OEM Private Label'}
              </span>
              <h3 className="text-2xl font-bold font-serif text-white">
                {isRTL ? 'أنت تملك العلامة التجارية، ونحن نتكفل بالصناعة والتطريز والتغليف' : 'Your Brand Identity, Our Precision Egyptian Manufacturing'}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
                {isRTL
                  ? 'نوفر حلول تصنيع متكاملة لخطوط الطيران، وسلاسل الفنادق والمنتجعات العالمية، وعلامات الهدايا السياحية. نقوم بتحويل شعارك إلى تطريز متقن على أقمشة القطن المصري الفاخر، مع توفير علب وعبوات مخصصة بالكامل.'
                  : 'Turnkey private label manufacturing for airlines, luxury resorts, and lifestyle retail brands. High-precision vector logo embroidery on premium Egyptian cotton covers with bespoke retail packaging.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
              <div className="p-5 rounded-2xl bg-[#0B0D11] border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center font-bold font-mono">1</div>
                <h4 className="font-bold text-white text-sm">{isRTL ? 'إرسال الشعار والملفات' : 'Vector Logo Submission'}</h4>
                <p className="text-slate-400 leading-relaxed">{isRTL ? 'ملفات متجهة (AI / SVG / PDF) مع أكواد ألوان Pantone المعتمدة لديك.' : 'Submit vector logo files (AI/SVG/PDF) and approved Pantone color references.'}</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B0D11] border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center font-bold font-mono">2</div>
                <h4 className="font-bold text-white text-sm">{isRTL ? 'البروفا الرقمية والعينة' : 'Digital Proof & Sample'}</h4>
                <p className="text-slate-400 leading-relaxed">{isRTL ? 'إرسال بروفا ثلاثية الأبعاد خلال يومي عمل، وتصنيع عينة حقيقية للاعتماد قبل الإنتاج.' : '3D digital mockup within 48 hours, followed by a physical pre-production sample.'}</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B0D11] border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center font-bold font-mono">3</div>
                <h4 className="font-bold text-white text-sm">{isRTL ? 'الإنتاج الكمي الصارم' : 'Production & Quality Audit'}</h4>
                <p className="text-slate-400 leading-relaxed">{isRTL ? 'إنتاج كمي خلال 14 إلى 21 يوم عمل مع فحص جودة صارم لكل قطعة قبل التعبئة.' : 'Mass production in 14-21 business days with rigorous piece-by-piece inspection.'}</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B0D11] border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center font-bold font-mono">4</div>
                <h4 className="font-bold text-white text-sm">{isRTL ? 'التسليم والتصدير' : 'Fulfillment & Export'}</h4>
                <p className="text-slate-400 leading-relaxed">{isRTL ? 'شحن مجاني وشامل حتى باب منشأتك بمصر، أو شحن FOB / CIF لجميع موانئ ومطارات العالم.' : 'Free doorstep delivery across Egypt or FOB/CIF shipment to global ports.'}</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/20 to-[#0F131A] border border-amber-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-white text-base">{isRTL ? 'جاهز لبدء تصنيع علامتك الخاصة؟' : 'Ready to Launch Your Private Label Line?'}</h4>
                <p className="text-xs text-slate-400 mt-1">{isRTL ? 'تواصل مباشرة مع مهندس تطوير المنتجات عبر واتساب' : 'Direct contact with product engineering team on WhatsApp'}</p>
              </div>
              <a
                href="https://wa.me/201002406013?text=%D8%B7%D9%84%D8%A8%20%D8%AA%D8%B5%D9%86%D9%8A%D8%B9%20%D8%A8%D8%B9%D9%84%D8%A7%D9%85%D8%A9%20%D8%AE%D8%A7%D8%B5%D8%A9%20Private%20Label"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shrink-0"
              >
                <FaWhatsapp className="text-base" />
                <span>{isRTL ? 'محادثة واتساب مخصصة للتصنيع' : 'WhatsApp Private Label Desk'}</span>
              </a>
            </div>
          </div>
        )}

        {/* TAB 4: Agreements & Legal Templates */}
        {activeTab === 'agreements' && (
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-[#0F131A] border border-slate-800 space-y-3">
              <span className="text-xs font-mono uppercase text-[#D4AF37] font-semibold block">
                {isRTL ? 'الشفافية التعاقدية والتجارية' : 'Contractual & Legal Governance'}
              </span>
              <h3 className="text-xl font-bold font-serif text-white">
                {isRTL ? 'نماذج وقوالب الاتفاقيات المعتمدة للتعامل التجاري' : 'Standard Commercial Supply & Distribution Agreements'}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-3xl">
                {isRTL
                  ? 'يلتزم مصنع YKP Supplies بأعلى درجات الانضباط القانوني والتجاري. فيما يلي ملخص بنود الاتفاقيات المعتمدة التي تنظم العلاقة بين المورّد (المصنع) والمشتري (التاجر / الفندق / الموزع).'
                  : 'YKP Supplies adheres to transparent commercial governance under Egyptian Commercial Law and international trading standards.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              
              {/* Agreement 1: Wholesale Supply */}
              <div className="p-5 rounded-2xl bg-[#0B0D11] border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
                  <FaFileContract />
                  <h4>{isRTL ? '١. اتفاقية التوريد بالجملة (Wholesale Agreement)' : '1. Wholesale Supply Agreement'}</h4>
                </div>
                <ul className="space-y-2 text-slate-300 list-disc list-inside leading-relaxed">
                  <li><strong>موضوع العقد:</strong> توريد مخدات السفر الطبية أو دمى الجمل المحبوب بالكميات المحددة بأمر الشراء.</li>
                  <li><strong>الحد الأدنى:</strong> 200 قطعة للمخدات / 130 قطعة لدمى الجمل.</li>
                  <li><strong>شروط السداد:</strong> 50% عربون عند التأكيد واعتماد العينة، والباقي قبل الشحن والتسليم.</li>
                  <li><strong>التسليم:</strong> مشمول ومجاني لباب المشتري داخل مصر، و FOB للتصدير الخارجي.</li>
                  <li><strong>الفحص والاستبدال:</strong> فحص الشحنة خلال 7 أيام من الاستلام مع استبدال العيوب المصنعية المثبتة فوراً.</li>
                </ul>
              </div>

              {/* Agreement 2: Private Label / OEM */}
              <div className="p-5 rounded-2xl bg-[#0B0D11] border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
                  <FaAward />
                  <h4>{isRTL ? '٢. اتفاقية التصنيع بعلامة خاصة (Private Label)' : '2. Private Label / OEM Agreement'}</h4>
                </div>
                <ul className="space-y-2 text-slate-300 list-disc list-inside leading-relaxed">
                  <li><strong>الملكية الفكرية:</strong> العلامة التجارية والشعار ملك خالص للمشتري، بينما تظل التصميمات الفرعونية الأصلية ملكاً لمصنع YKP.</li>
                  <li><strong>اعتماد العينة:</strong> إنتاج عينة ما قبل الإنتاج واعتمادها كتابياً قبل تشغيل خطوط الإنتاج الكمي.</li>
                  <li><strong>التسامح في الكميات:</strong> تسامح صناعي دولي معتمد بنسبة ±5% في الكمية النهائية للتشغيلة.</li>
                  <li><strong>اتفاقية السرية (NDA):</strong> حماية كاملة للتصاميم والشعارات وقوائم الأسعار لمدة 3 سنوات.</li>
                </ul>
              </div>

              {/* Agreement 3: Distribution */}
              <div className="p-5 rounded-2xl bg-[#0B0D11] border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
                  <FaGlobeAmericas />
                  <h4>{isRTL ? '٣. اتفاقية موزع معتمد (Distribution Agreement)' : '3. Distribution Agreement'}</h4>
                </div>
                <ul className="space-y-2 text-slate-300 list-disc list-inside leading-relaxed">
                  <li><strong>التعيين الجغرافي:</strong> تعيين الموزع (حصرياً أو غير حصري) في دولة أو منطقة محددة لمدد تعاقدية سنوية.</li>
                  <li><strong>الحد الأدنى السنوي للمشتريات (Target):</strong> يحدد بناءً على حجم السوق المستهدف لتفعيل الحصرية.</li>
                  <li><strong>التسويق والدعم:</strong> تزويد الموزع بكافة المواد التسويقية وصور المنتجات عالية الدقة مجاناً.</li>
                  <li><strong>الامتثال المحلي:</strong> يلتزم الموزع بإجراءات التسجيل والمواصفات القياسية المطلوبة في دولته.</li>
                </ul>
              </div>

              {/* Agreement 4: Retail Terms */}
              <div className="p-5 rounded-2xl bg-[#0B0D11] border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
                  <FaShieldAlt />
                  <h4>{isRTL ? '٤. شروط وضمانات التجزئة للموقع' : '4. Retail Terms of Sale'}</h4>
                </div>
                <ul className="space-y-2 text-slate-300 list-disc list-inside leading-relaxed">
                  <li><strong>الاستبدال والاسترجاع:</strong> خلال 14 يوماً من تاريخ الاستلام للمنتج غير المستخدم وبعبوته الأصلية.</li>
                  <li><strong>عيوب التصنيع:</strong> تُستبدل مجاناً على نفقة المصنع.</li>
                  <li><strong>المنتجات المخصصة:</strong> لا تُسترجع إلا في حالة وجود عيب مصنعي مثبت لمخالفتها للعينة المعتمدة.</li>
                  <li><strong>سرية البيانات:</strong> حماية تامة لبيانات العملاء وعدم مشاركتها مع أي أطراف خارجية.</li>
                </ul>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return getStaticPropsWithTranslations(locale);
};