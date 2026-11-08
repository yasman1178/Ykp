import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaWhatsapp, 
  FaHotel, 
  FaSuitcaseRolling, 
  FaCheckCircle, 
  FaAward, 
  FaShieldAlt, 
  FaBaby, 
  FaGift, 
  FaGlobeEurope, 
  FaArrowRight, 
  FaArrowLeft,
  FaCalculator,
  FaTag
} from 'react-icons/fa';

interface BelovedCamelShowcaseProps {
  locale?: string;
}

export default function BelovedCamelShowcase({ locale = 'en' }: BelovedCamelShowcaseProps) {
  const isRTL = locale === 'ar';
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  // State management
  const [selectedSize, setSelectedSize] = useState<'22cm' | '28cm'>('22cm');
  const [selectedColor, setSelectedColor] = useState<string>('royal-blue');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [orderMode, setOrderMode] = useState<'retail' | 'b2b'>('retail');

  // B2B customizer state
  const [b2bQuantity, setB2bQuantity] = useState<number>(100);
  const [brandingLocation, setBrandingLocation] = useState<'saddle' | 'collar' | 'both'>('saddle');
  const [companyName, setCompanyName] = useState<string>('');
  const [customPackaging, setCustomPackaging] = useState<boolean>(true);

  // Gallery images from user uploads
  const galleryImages = [
    {
      src: '/assets/aistudio/1794114379573_df8dd34d.jpg',
      altEn: 'The Beloved Camel in Royal Egyptian Blue with I Love Egypt Pharaonic Saddle',
      altAr: 'الجمل المحبوب باللون الأزرق الملكي وسرج فرعوني مطرز I Love Egypt',
      titleEn: 'Royal Blue Edition (22cm & 28cm)',
      titleAr: 'الإصدار الأزرق الملكي (٢٢ سم و٢٨ سم)'
    },
    {
      src: '/assets/aistudio/1794122038268_02f24669.jpg',
      altEn: 'Four Pharaonic Plush Camels in Desert Tan, Imperial Purple, Lotus Pink and Camel Beige',
      altAr: 'تشكيلة ألوان الجمل الفرعوني: البني الصحراوي، البنفسجي، الوردي، والبيج الكلاسيكي',
      titleEn: 'Heritage Color Palette',
      titleAr: 'ألوان تراثية متعددة'
    },
    {
      src: '/assets/aistudio/file_000000000604820aa5649d2a0b525298_e93a9b68.png',
      altEn: 'The Beloved Camel Plush Toy Arabic Campaign - Super Soft and Kid Safe',
      altAr: 'حملة الجمل المحبوب - صديق صغير بمغامرات كبيرة ناعم ومريح هدية مثالية',
      titleEn: 'Arabic Heritage Poster',
      titleAr: 'بوستر الجمل المحبوب الترويجي'
    },
    {
      src: '/assets/aistudio/file_00000000bdd4820a898fb93da354784f_9e2791fa.png',
      altEn: 'The Beloved Camel Global Campaign for Kids and Tourism Souvenirs',
      altAr: 'الحملة العالمية للجمل المحبوب - مغامرات أثرية وهدايا سياحية للأطفال',
      titleEn: 'International Edition Poster',
      titleAr: 'البوستر الدولي المعتمد'
    }
  ];

  // Colors available
  const colorOptions = [
    { id: 'royal-blue', nameEn: 'Royal Sky Blue', nameAr: 'أزرق ملكي مصري', hex: '#6BA4DE' },
    { id: 'desert-tan', nameEn: 'Desert Camel Tan', nameAr: 'بني صحراوي أصيل', hex: '#C28448' },
    { id: 'imperial-purple', nameEn: 'Imperial Pharaoh Purple', nameAr: 'بنفسجي فرعوني فاخر', hex: '#872368' },
    { id: 'lotus-pink', nameEn: 'Lotus Blossom Pink', nameAr: 'وردي زهرة اللوتس', hex: '#E58EB0' },
  ];

  // Pricing calculations
  const basePriceRetail = selectedSize === '22cm' ? 18 : 26; // USD
  const basePriceWholesale = selectedSize === '22cm' ? 12 : 18; // USD base

  // B2B discount tiers
  const getB2bDiscount = (qty: number) => {
    if (qty >= 500) return 40;
    if (qty >= 250) return 35;
    if (qty >= 100) return 25;
    if (qty >= 50) return 15;
    return 0;
  };

  const discountPercent = getB2bDiscount(b2bQuantity);
  const unitPriceWholesale = +(basePriceWholesale * (1 - discountPercent / 100)).toFixed(2);
  const totalB2bPrice = Math.round(unitPriceWholesale * b2bQuantity);

  // Generate WhatsApp dynamic links
  const whatsappNumber = '201002406013';

  const retailMessage = isRTL
    ? `مرحباً مصنع YKP Supplies، أود طلب "الجمل المحبوب" التراثي الفرعوني:
- المقاس: ${selectedSize === '22cm' ? '٢٢ سم (الصغير)' : '٢٨ سم (الكبير)'}
- اللون: ${colorOptions.find(c => c.id === selectedColor)?.nameAr}
- السعر: $${basePriceRetail}
يرجى تأكيد التوصيل والتكلفة داخل مصر / التصدير.`
    : `Hello YKP Supplies, I would like to order "The Beloved Camel" Pharaonic plush:
- Size: ${selectedSize}
- Color: ${colorOptions.find(c => c.id === selectedColor)?.nameEn}
- Price: $${basePriceRetail} USD
Please confirm stock availability and shipping.`;

  const b2bMessage = isRTL
    ? `طلب عرض أسعار B2B - الجمل المحبوب (تخصيص فنادق وشركات سياحة):
- اسم المنشأة / الفندق: ${companyName || 'مؤسسة سياحية'}
- المقاس المطلوب: ${selectedSize === '22cm' ? '٢٢ سم' : '٢٨ سم'}
- الكمية: ${b2bQuantity} قطعة
- نوع التطريز المطلوب: ${brandingLocation === 'saddle' ? 'شعار الفندق على السرج' : brandingLocation === 'collar' ? 'شريط الرقبة' : 'تطريز مزدوج على السرج والشريط'}
- التغليف المخصص: ${customPackaging ? 'نعم (علب هدايا فاخرة)' : 'تغليف قياسي'}
- التكلفة التقريبية: $${unitPriceWholesale} للقطعة (الإجمالي: $${totalB2bPrice})
نرجو إرسال بروفا وتأكيد جدول التوريد.`
    : `B2B Custom Quotation Request - The Beloved Camel for Hospitality & Tourism:
- Company/Hotel: ${companyName || 'Tourism Partner'}
- Size: ${selectedSize}
- Quantity: ${b2bQuantity} units
- Branding: ${brandingLocation} custom embroidery
- Custom Packaging: ${customPackaging ? 'Yes (Deluxe Gift Box)' : 'Standard'}
- Estimated Unit Price: $${unitPriceWholesale} USD (Total: $${totalB2bPrice} USD)
Please send digital mockup and delivery schedule.`;

  const retailWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(retailMessage)}`;
  const b2bWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(b2bMessage)}`;

  return (
    <section className="py-20 bg-gradient-to-b from-[#090C10] via-[#0D1117] to-[#07090C] border-y border-amber-900/30 relative overflow-hidden" id="beloved-camel">
      
      {/* Background Pharaonic Decorative Ambient Rings */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono tracking-wider uppercase">
            <span>𓃥</span>
            <span>{isRTL ? 'إصدار جديد وحصري' : 'New Heritage Release'}</span>
            <span>𓆣</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight">
            {isRTL ? 'الجمل المحبوب (The Beloved Camel)' : 'The Beloved Camel Collection'}
          </h2>
          
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            {isRTL 
              ? 'صديق صغير .. بمغامرات كبيرة! دمية قطيفة فرعونية فاخرة صُنعت بأيدي مصرية ماهرة، تجمع بين نعومة الدمى الفاخرة وعظمة التراث المصري للأطفال، الفنادق، ومحبي الهدايا التذكارية الأصيلة.'
              : 'A Little Friend... with Big Adventures! Handcrafted in Cairo with ultra-soft plush velvet and authentic embroidered pharaonic saddles. Designed for individual collectors, luxury hotels, and bespoke tourism hospitality.'}
          </p>

          {/* Target Audience Mode Switcher (Retail B2C vs Corporate B2B) */}
          <div className="pt-2 flex items-center justify-center">
            <div className="inline-flex p-1 rounded-2xl bg-black/60 border border-slate-800 backdrop-blur-md shadow-lg">
              <button
                onClick={() => setOrderMode('retail')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  orderMode === 'retail'
                    ? 'bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/20 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FaGift className="text-sm" />
                <span>{isRTL ? 'للأفراد والهدايا (تجزئة)' : 'Retail & Gift Buyers'}</span>
              </button>

              <button
                onClick={() => setOrderMode('b2b')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  orderMode === 'b2b'
                    ? 'bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/20 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FaHotel className="text-sm" />
                <span>{isRTL ? 'للفنادق وشركات السياحة (تخصيص B2B)' : 'Hotels & Tour Operators (B2B)'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Showcase Grid: Left Gallery + Right Customization/Details Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Image Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Main Featured Image Card */}
            <div className="relative aspect-square rounded-3xl bg-[#0F131A] border border-slate-800 overflow-hidden shadow-2xl group">
              <Image
                src={galleryImages[activeImageIndex].src}
                alt={isRTL ? galleryImages[activeImageIndex].altAr : galleryImages[activeImageIndex].altEn}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />

              {/* Size Badge Overlay */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-[#D4AF37] flex items-center gap-1.5 shadow-lg">
                <FaAward className="text-sm" />
                <span>{selectedSize === '22cm' ? (isRTL ? 'مقاس ٢٢ سم (الصغير)' : 'Standard 22 cm') : (isRTL ? 'مقاس ٢٨ سم (الكبير الفاخر)' : 'Deluxe Grand 28 cm')}</span>
              </div>

              {/* Made in Egypt Watermark */}
              <div className="absolute bottom-4 right-4 bg-black/85 backdrop-blur-md border border-slate-700 px-3 py-1 rounded-lg text-[11px] font-sans text-white/90">
                🇪🇬 {isRTL ? 'صناعة مصرية ١٠٠٪' : '100% Made in Egypt'}
              </div>
            </div>

            {/* Thumbnail Carousel */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#D4AF37] scale-95 shadow-md shadow-[#D4AF37]/30'
                      : 'border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-600'
                  }`}
                  aria-label={isRTL ? img.titleAr : img.titleEn}
                >
                  <Image
                    src={img.src}
                    alt={isRTL ? img.altAr : img.altEn}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </button>
              ))}
            </div>

            {/* Quality & Safety Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <FaShieldAlt className="text-[#D4AF37] mx-auto text-lg mb-1" />
                <span className="text-[11px] font-bold text-white block">{isRTL ? 'آمن للأطفال' : 'Child Safe'}</span>
                <span className="text-[10px] text-slate-400 block">{isRTL ? 'خامات معتمدة' : 'Non-toxic velvet'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <FaBaby className="text-[#D4AF37] mx-auto text-lg mb-1" />
                <span className="text-[11px] font-bold text-white block">{isRTL ? 'فائق النعومة' : 'Super Soft'}</span>
                <span className="text-[10px] text-slate-400 block">{isRTL ? 'مخمل قطيفة راقٍ' : 'Premium plush'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <FaGlobeEurope className="text-[#D4AF37] mx-auto text-lg mb-1" />
                <span className="text-[11px] font-bold text-white block">{isRTL ? 'تصدير عالمي' : 'Export Ready'}</span>
                <span className="text-[10px] text-slate-400 block">{isRTL ? 'أوروبا والخليج' : 'EU & Gulf specs'}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Specifications, Size Switcher & Customizer (7 cols) */}
          <div className="lg:col-span-7 bg-[#0F131A] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            
            {/* Header Title & Pricing Row */}
            <div className="border-b border-slate-800/80 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#D4AF37] font-semibold tracking-wider">
                  {isRTL ? 'هدايا وتذكارات فرعونية أصلية' : 'Authentic Pharaonic Souvenir Keepsake'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif mt-1">
                  {isRTL ? 'الجمل المحبوب - قطيفة بتصميم فرعوني' : 'The Beloved Camel - Pharaonic Plush Toy'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isRTL ? 'رمز الصبر والترحال المصري بسرج مطرز بنقوش الأهرامات وتطريز أثري' : 'Symbol of Egyptian journey & resilience with handcrafted embroidered saddle'}
                </p>
              </div>

              {/* Price display */}
              <div className="bg-slate-950/80 border border-amber-900/30 px-5 py-3 rounded-2xl text-right sm:text-center shrink-0">
                {orderMode === 'retail' ? (
                  <>
                    <span className="text-[11px] text-slate-400 block">{isRTL ? 'سعر التجزئة المباشر' : 'Retail Price'}</span>
                    <span className="text-2xl font-bold font-mono text-[#D4AF37]">${basePriceRetail} <span className="text-xs text-slate-400">USD</span></span>
                    <span className="text-[10px] text-slate-400 block">{isRTL ? `يعادل ~${selectedSize === '22cm' ? '380' : '550'} ج.م` : `approx. ${selectedSize === '22cm' ? '380' : '550'} EGP`}</span>
                  </>
                ) : (
                  <>
                    <span className="text-[11px] text-slate-400 block">{isRTL ? 'سعر الجملة للقطعة (خصم ' + discountPercent + '%)' : `B2B Price (-${discountPercent}%)`}</span>
                    <span className="text-2xl font-bold font-mono text-[#D4AF37]">${unitPriceWholesale} <span className="text-xs text-slate-400">USD</span></span>
                    <span className="text-[10px] text-emerald-400 block font-medium">{isRTL ? 'للكميات والمؤسسات' : 'B2B Corporate Tier'}</span>
                  </>
                )}
              </div>
            </div>

            {/* 1. Size Selection: 22 cm vs 28 cm */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider block">
                {isRTL ? '١. اختر مقاس الجمل:' : '1. Select Camel Size:'}
              </label>

              <div className="grid grid-cols-2 gap-4">
                {/* 22cm Option */}
                <button
                  type="button"
                  onClick={() => setSelectedSize('22cm')}
                  className={`p-4 rounded-2xl border text-left rtl:text-right transition-all flex flex-col justify-between ${
                    selectedSize === '22cm'
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="font-bold text-base text-white font-serif">{isRTL ? 'مقاس ٢٢ سم (الصغير)' : 'Standard 22 cm'}</span>
                    {selectedSize === '22cm' && <FaCheckCircle className="text-[#D4AF37]" />}
                  </div>
                  <p className="text-xs text-slate-400">
                    {isRTL ? 'المقاس الكلاسيكي المحبوب: مناسب لأيدي الأطفال، وحقائب السفر، والتوزيعات السياحية الترحيبية.' : 'Compact & lightweight: perfect for kids, travel carry-on, and room welcome amenities.'}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-[#D4AF37] font-mono font-medium">
                    {orderMode === 'retail' ? '$18 USD / 380 EGP' : '$7.50 - $10.50 USD (Wholesale)'}
                  </div>
                </button>

                {/* 28cm Option */}
                <button
                  type="button"
                  onClick={() => setSelectedSize('28cm')}
                  className={`p-4 rounded-2xl border text-left rtl:text-right transition-all flex flex-col justify-between ${
                    selectedSize === '28cm'
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="font-bold text-base text-white font-serif">{isRTL ? 'مقاس ٢٨ سم (الكبير الفاخر)' : 'Grand Deluxe 28 cm'}</span>
                    {selectedSize === '28cm' && <FaCheckCircle className="text-[#D4AF37]" />}
                  </div>
                  <p className="text-xs text-slate-400">
                    {isRTL ? 'المقاس الكبير الفخم: أرجل مدعمة للوقوف، سرج عريض بنقوش فرعونية غنية، ومثالي للأجنحة الفندقية VIP.' : 'Large grand plush with reinforced standing stance, deluxe pharaonic harness, and luxury suite decor.'}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-[#D4AF37] font-mono font-medium">
                    {orderMode === 'retail' ? '$26 USD / 550 EGP' : '$11.50 - $15.50 USD (Wholesale)'}
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Color Variant Selection */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider block">
                {isRTL ? '٢. اختر اللون المفضل:' : '2. Select Color Palette:'}
              </label>

              <div className="flex flex-wrap items-center gap-3">
                {colorOptions.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs transition-all ${
                      selectedColor === c.id
                        ? 'border-[#D4AF37] bg-black text-white font-bold shadow-md shadow-[#D4AF37]/20'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: c.hex }} />
                    <span>{isRTL ? c.nameAr : c.nameEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mode-Specific Settings */}
            {orderMode === 'retail' ? (
              /* Retail Direct Purchase Box */
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>{isRTL ? 'التوصيل والشحن:' : 'Fulfillment:'}</span>
                  <span className="text-emerald-400 font-medium">{isRTL ? 'متوفر للشحن الفوري في مصر ولجميع الدول' : 'In Stock - Worldwide Delivery'}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>{isRTL ? 'التغليف:' : 'Packaging:'}</span>
                  <span className="text-slate-200">{isRTL ? 'كيس هدايا تراثي أنيق مع بطاقة تعريف فرعونية' : 'Heritage souvenir bag with pharaonic gift tag'}</span>
                </div>

                <a
                  href={retailWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7569] text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.01]"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>{isRTL ? 'اطلب الآن عبر واتساب (توصيل فوري)' : 'Order Now via WhatsApp (Instant Dispatch)'}</span>
                </a>
              </div>
            ) : (
              /* B2B Hotel & Tour Agency Customizer Module */
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/30 space-y-5">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-[#D4AF37]">
                    <FaCalculator />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {isRTL ? 'حاسبة طلبيات الفنادق وشركات السياحة' : 'Hospitality B2B Customizer & Quote Calculator'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">MOQ: 50 pcs</span>
                </div>

                {/* Company Name Input */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 block">
                    {isRTL ? 'اسم الفندق أو شركة السياحة:' : 'Hotel or Travel Agency Name:'}
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={isRTL ? 'مثال: منتجع شتيجنبرجر الغردقة / ترافكو ترافيل' : 'e.g. Steigenberger Resort / Travco Travel'}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Quantity Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>{isRTL ? 'الكمية المطلوبة:' : 'Order Quantity:'}</span>
                    <span className="font-mono text-base font-bold text-[#D4AF37]">{b2bQuantity} {isRTL ? 'قطعة' : 'units'}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="25"
                    value={b2bQuantity}
                    onChange={(e) => setB2bQuantity(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>50 pcs (-15%)</span>
                    <span>100 pcs (-25%)</span>
                    <span>250 pcs (-35%)</span>
                    <span>500+ pcs (-40%)</span>
                  </div>
                </div>

                {/* Custom Branding Selection */}
                <div className="space-y-2">
                  <label className="text-xs text-slate-300 block">
                    {isRTL ? 'موقع تطريز شعار منشأتكم:' : 'Custom Logo Branding Placement:'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'saddle', labelEn: 'On Saddle', labelAr: 'على السرج الفرعوني' },
                      { id: 'collar', labelEn: 'Collar Band', labelAr: 'شريط الرقبة' },
                      { id: 'both', labelEn: 'Dual (Both)', labelAr: 'تطريز مزدوج' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setBrandingLocation(opt.id as any)}
                        className={`p-2 rounded-xl text-[11px] font-medium border transition-all ${
                          brandingLocation === opt.id
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {isRTL ? opt.labelAr : opt.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Packaging Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={customPackaging}
                    onChange={(e) => setCustomPackaging(e.target.checked)}
                    className="w-4 h-4 rounded text-[#D4AF37] bg-slate-900 border-slate-700 focus:ring-[#D4AF37]"
                  />
                  <span className="text-xs text-slate-300">
                    {isRTL ? 'إضافة علب هدايا فاخرة مخصصة للفندق (Deluxe Room Amenities Box)' : 'Include luxury custom hotel gift packaging with ribbon'}
                  </span>
                </label>

                {/* Quote Summary Box */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block">{isRTL ? 'الإجمالي التقديري للطلبية:' : 'Estimated Order Total:'}</span>
                    <span className="text-xl font-bold font-mono text-white">${totalB2bPrice} <span className="text-xs text-[#D4AF37]">USD</span></span>
                  </div>
                  <div className="text-right rtl:text-left">
                    <span className="text-emerald-400 font-mono font-bold block">-${discountPercent}% {isRTL ? 'خصم تجاري' : 'Discount'}</span>
                    <span className="text-[10px] text-slate-400">{isRTL ? 'مدة التصنيع: ٢ - ٣ أسابيع' : 'Lead time: 2-3 weeks'}</span>
                  </div>
                </div>

                {/* Submit / WhatsApp B2B CTA */}
                <a
                  href={b2bWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#dfba40] hover:to-[#c6910e] text-black font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 transition-all hover:scale-[1.01]"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>{isRTL ? 'إرسال طلب التخصيص وعرض السعر الفوري عبر واتساب' : 'Send Custom B2B Quote Request via WhatsApp'}</span>
                </a>
              </div>
            )}

            {/* Trust and Certifications Footnote */}
            <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <FaCheckCircle className="text-[#D4AF37]" />
                {isRTL ? 'فحص جودة شامل لكل قطعة' : '100% Quality Inspected'}
              </span>
              <span className="flex items-center gap-1.5">
                <FaSuitcaseRolling className="text-[#D4AF37]" />
                {isRTL ? 'شحن مباشر للفنادق والمطارات' : 'Direct Hotel & Airport Delivery'}
              </span>
              <span className="flex items-center gap-1.5">
                <FaAward className="text-[#D4AF37]" />
                {isRTL ? 'شهادة أصالة التراث المصري' : 'Egyptian Heritage Authenticity'}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
