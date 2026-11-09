import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { getStaticPropsWithTranslations } from '@/lib/translations';
import {
  FaTruck,
  FaHandshake,
  FaGlobe,
  FaPercent,
  FaAward,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaChevronRight
} from 'react-icons/fa';
import SEO from '@/components/SEO';
import {
  StaggerContainer,
  StaggerItem,
  CrystalReveal,
  FloatingHieroglyphs,
  EgyptianPulse
} from '@/components/animations/EgyptianAnimations';

interface WholesalePageProps {
  translations: any;
  locale: string;
}

const WholesalePage: React.FC<WholesalePageProps> = ({ translations: t, locale }) => {
  const isRTL = locale === 'ar';
  const router = useRouter();

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    businessType: '',
    estimatedQuantity: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      const response = await fetch('/api/wholesale-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setSubmitStatus('success');
          setSubmitMessage(isRTL
            ? 'تم إرسال طلبك بنجاح! سنتواصل معك خلال 24 ساعة بعرض سعر مخصص.'
            : 'Your inquiry has been sent successfully! We will contact you within 24 hours with a custom quote.');
          setFormData({
            companyName: '',
            contactName: '',
            email: '',
            phone: '',
            country: '',
            businessType: '',
            estimatedQuantity: '',
            message: ''
          });
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      throw new Error('Static fallback');
    } catch (error) {
      const waText = encodeURIComponent(`*طلب عرض سعر بالجملة - YKP Supplies*\nالشركة: ${formData.companyName}\nالمسؤول: ${formData.contactName}\nالبريد: ${formData.email}\nالهاتف: ${formData.phone}\nالدولة: ${formData.country}\nنوع النشاط: ${formData.businessType}\nالكمية التقديرية: ${formData.estimatedQuantity}\nملاحظات: ${formData.message}`);
      if (typeof window !== 'undefined') {
        window.open(`https://wa.me/201002406013?text=${waText}`, '_blank');
      }
      setSubmitStatus('success');
      setSubmitMessage(isRTL
        ? 'تم تجهيز طلبك وفتح واتساب للتواصل المباشر مع إدارة مبيعات الجملة.'
        : 'Your wholesale inquiry has been opened in WhatsApp for direct quotation.');
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        country: '',
        businessType: '',
        estimatedQuantity: '',
        message: ''
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const benefits = [
    {
      icon: <FaPercent />,
      title: isRTL ? 'خصومات تنافسية' : 'Competitive Discounts',
      description: isRTL ? 'خصومات تصل إلى 40% على الطلبات الكبيرة مع هوامش ربح ممتازة.' : 'Bulk discounts up to 40% with excellent profit margins for partners.',
    },
    {
      icon: <FaTruck />,
      title: isRTL ? 'شحن عالمي' : 'Global Shipping',
      description: isRTL ? 'شحن سريع وآمن إلى جميع أنحاء العالم مع تتبع كامل للشحنات.' : 'Fast and secure worldwide shipping with full door-to-door tracking.',
    },
    {
      icon: <FaAward />,
      title: isRTL ? 'جودة فرعونية أصيلة' : 'Authentic Quality',
      description: isRTL ? 'منتجات مصنوعة يدوياً في مصر بأعلى معايير الجودة العالمية.' : 'Handmade products in Egypt with the highest international quality standards.',
    },
  ];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-papyrus-light">
      <SEO
        title={isRTL ? 'عقود التوريد والجملة B2B | YKP Supplies' : 'B2B Wholesale & Private Label Supply | YKP Supplies'}
        description={t.site.description}
        locale={locale}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-hieroglyph-black">
        <div className="absolute inset-0 opacity-20">
          <Image src="/hero.png" alt="Wholesale Hero" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-hieroglyph-black/90" />

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <StaggerContainer>
            <StaggerItem>
              <h1 className="text-5xl md:text-8xl font-black text-white mb-6 shimmer-text italic" style={{ fontFamily: 'Playfair Display, serif' }}>
                {isRTL ? 'الشراكة العالمية' : 'Global Partnership'}
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
                {isRTL
                  ? 'انضم إلى شبكة موزعينا العالمية واجلب سحر التراث المصري إلى سوقك مع أفضل شروط التوريد والجودة.'
                  : 'Join our international distribution network and bring the magic of Egyptian heritage to your market with elite supply terms.'}
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-12 flex justify-center gap-6">
                <EgyptianPulse>
                  <a href="#inquiry-form" className="shimmer-btn text-white px-10 py-5 rounded-full font-bold text-lg shadow-golden">
                    {isRTL ? 'اطلب عرض سعر الآن' : 'Request Wholesale Quote'}
                  </a>
                </EgyptianPulse>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits Content */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => (
              <CrystalReveal key={index} className="glass-panel p-10 rounded-[3rem] border-pharaonic-gold/20 transform hover:-translate-y-4 transition-all duration-500">
                <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center text-white text-3xl mb-8 shadow-large">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-hieroglyph-black mb-4">
                  {benefit.title}
                </h3>
                <p className="text-hieroglyph-light leading-relaxed">
                  {benefit.description}
                </p>
              </CrystalReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Info Section */}
      <section id="inquiry-form" className="py-20 px-4 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pharaonic-gold to-transparent opacity-30" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-10 md:p-16 rounded-[4rem] shadow-huge border-gray-100"
          >
            <h2 className="text-3xl md:text-5xl font-black text-hieroglyph-black mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              {isRTL ? 'نموذج الشراكة' : 'Partnership Form'}
            </h2>

            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 p-6 bg-green-50 rounded-3xl border border-green-100 flex items-center gap-4">
                  <span className="text-2xl text-green-500">✓</span>
                  <p className="text-green-800 font-medium">{submitMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="companyName"
                    placeholder={isRTL ? 'اسم الشركة' : 'Company Name'}
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pharaonic-gold outline-none transition-all"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="contactName"
                    placeholder={isRTL ? 'اسم المسؤول' : 'Contact Person'}
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pharaonic-gold outline-none transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="email"
                  name="email"
                  placeholder={isRTL ? 'البريد الإلكتروني' : 'Email Address'}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pharaonic-gold outline-none transition-all"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder={isRTL ? 'رقم الهاتف' : 'Phone Number'}
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pharaonic-gold outline-none transition-all"
                />
              </div>
              <select
                name="estimatedQuantity"
                value={formData.estimatedQuantity}
                onChange={handleInputChange}
                required
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pharaonic-gold outline-none transition-all appearance-none"
              >
                <option value="">{isRTL ? 'الكمية المتوقعة شهرياً' : 'Monthly Estimated Quantity'}</option>
                <option value="50-100">50 - 100 {isRTL ? 'قطعة' : 'Units'}</option>
                <option value="100-500">100 - 500 {isRTL ? 'قطعة' : 'Units'}</option>
                <option value="500+">500+ {isRTL ? 'قطعة' : 'Units'}</option>
              </select>
              <textarea
                name="message"
                placeholder={isRTL ? 'رسالتك...' : 'Your message...'}
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pharaonic-gold outline-none transition-all"
              />
              <motion.button
                type="submit"
                disabled={submitStatus === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-5 rounded-2xl font-bold text-lg shadow-xl transition-all ${submitStatus === 'loading' ? 'bg-gray-400' : 'bg-gradient-to-r from-hieroglyph-black to-blue-900 text-white shadow-blue-900/20'
                  }`}
              >
                {submitStatus === 'loading' ? (isRTL ? 'جاري الإرسال...' : 'Sending...') : (isRTL ? 'إرسال طلب الانضمام' : 'Send Partnership Request')}
              </motion.button>
            </form>
          </motion.div>

          {/* Info Side */}
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-hieroglyph-black mb-10" style={{ fontFamily: 'Playfair Display, serif' }}>
              {isRTL ? 'دعم المصنع المباشر' : 'Direct Factory Support'}
            </h3>
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-soft flex items-center justify-center text-pharaonic-gold text-2xl group-hover:bg-pharaonic-gold group-hover:text-white transition-all">
                  <FaWhatsapp />
                </div>
                <div>
                  <h4 className="font-bold text-hieroglyph-black text-lg">{isRTL ? 'واتساب المصنع' : 'Factory WhatsApp'}</h4>
                  <p className="text-pharaonic-gold font-bold text-xl">+20 100 240 6013</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-soft flex items-center justify-center text-pharaonic-gold text-2xl group-hover:bg-pharaonic-gold group-hover:text-white transition-all">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-bold text-hieroglyph-black text-lg">{isRTL ? 'بريد المبيعات' : 'Sales Email'}</h4>
                  <p className="text-pharaonic-gold font-bold text-xl">ykp.supplies@gmail.com</p>
                </div>
              </div>
              <div className="mt-12 p-10 glass-panel-dark rounded-[3rem] text-white bg-gradient-to-br from-blue-900 to-hieroglyph-black">
                <h4 className="text-2xl font-black mb-4 shimmer-text italic">{isRTL ? 'مواعيد العمل' : 'Business Hours'}</h4>
                <div className="space-y-4 opacity-70">
                  <div className="flex justify-between">
                    <span>{isRTL ? 'الاثنين - الجمعة' : 'Mon - Fri'}</span>
                    <span className="font-bold text-pharaonic-gold">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isRTL ? 'السبت' : 'Saturday'}</span>
                    <span className="font-bold text-pharaonic-gold">10:00 - 16:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return getStaticPropsWithTranslations(context);
};

export default WholesalePage;