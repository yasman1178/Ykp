/**
 * Partnership Page
 * Strategic partnerships and collaboration opportunities
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { 
  FaHandshake, 
  FaGlobe, 
  FaRocket, 
  FaUsers,
  FaAward,
  FaChartLine,
  FaLightbulb,
  FaHeart,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaBuilding
} from 'react-icons/fa';

const PartnershipPage: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    partnershipType: '',
    companySize: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      const response = await fetch('/api/partnership-inquiry', {
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
          setSubmitMessage('تم إرسال طلبك بنجاح! سيتواصل معك فريق الشراكات خلال 48 ساعة.');
          setFormData({
            companyName: '',
            contactName: '',
            email: '',
            phone: '',
            website: '',
            partnershipType: '',
            companySize: '',
            message: ''
          });
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      throw new Error('Static fallback');
    } catch (error) {
      const waText = encodeURIComponent(`*طلب شراكة استراتيجية - YKP Supplies*\nالشركة: ${formData.companyName}\nالمسؤول: ${formData.contactName}\nالبريد: ${formData.email}\nالهاتف: ${formData.phone}\nنوع الشراكة: ${formData.partnershipType}\nحجم الشركة: ${formData.companySize}\nملاحظات: ${formData.message}`);
      if (typeof window !== 'undefined') {
        window.open(`https://wa.me/201002406013?text=${waText}`, '_blank');
      }
      setSubmitStatus('success');
      setSubmitMessage('تم تجهيز طلبك وفتح واتساب للتواصل المباشر مع إدارة الشراكات.');
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        website: '',
        partnershipType: '',
        companySize: '',
        message: ''
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Layout
      pageTitle="الشراكات الاستراتيجية | Strategic Partnerships - YKP Supplies"
      metaDescription="انضم إلى شبكة شركائنا الاستراتيجيين. فرص شراكة متنوعة في التوزيع، التصنيع، والتسويق مع مصنع YKP Supplies."
      canonicalUrl="https://www.ykp-eg.com/partnership"
    >
      <div className="min-h-screen bg-gradient-to-br from-papyrus via-desert-sand to-pharaonic-gold">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-hieroglyph-black mb-6 font-pharaonic">
                🤝 الشراكات الاستراتيجية
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                نبني جسور التعاون مع الشركات الرائدة لنشر التراث المصري العريق في جميع أنحاء العالم
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#partnership-form"
                  className="bg-gradient-to-r from-pharaonic-gold to-deep-blue text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  ابدأ الشراكة
                </a>
                <Link
                  href="/wholesale"
                  className="border-2 border-pharaonic-gold text-pharaonic-gold py-3 px-8 rounded-xl font-semibold hover:bg-pharaonic-gold hover:text-white transition-all duration-300"
                >
                  عروض الجملة
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Partnership Types */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-hieroglyph-black mb-4">
                أنواع الشراكات المتاحة
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                نقدم فرص شراكة متنوعة تناسب مختلف أحجام الشركات وتخصصاتها
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaGlobe className="text-4xl text-pharaonic-gold" />,
                  title: "التوزيع الإقليمي",
                  description: "احصل على حقوق التوزيع الحصرية في منطقتك الجغرافية",
                  benefits: ["حصرية إقليمية", "دعم تسويقي", "تدريب الفريق"]
                },
                {
                  icon: <FaBuilding className="text-4xl text-pharaonic-gold" />,
                  title: "الشراكة في التصنيع",
                  description: "تعاون في عمليات الإنتاج والتصنيع المحلي",
                  benefits: ["نقل التكنولوجيا", "تدريب تقني", "ضمان الجودة"]
                },
                {
                  icon: <FaRocket className="text-4xl text-pharaonic-gold" />,
                  title: "الشراكة التسويقية",
                  description: "تعاون في الحملات التسويقية والترويجية",
                  benefits: ["حملات مشتركة", "تبادل العملاء", "تكاليف مشتركة"]
                },
                {
                  icon: <FaLightbulb className="text-4xl text-pharaonic-gold" />,
                  title: "الابتكار والتطوير",
                  description: "شراكة في تطوير منتجات جديدة ومبتكرة",
                  benefits: ["بحث وتطوير", "براءات اختراع", "منتجات حصرية"]
                },
                {
                  icon: <FaUsers className="text-4xl text-pharaonic-gold" />,
                  title: "شراكة الخدمات",
                  description: "تقديم خدمات مكملة لعملائنا المشتركين",
                  benefits: ["خدمات متكاملة", "قاعدة عملاء أوسع", "إيرادات إضافية"]
                },
                {
                  icon: <FaHeart className="text-4xl text-pharaonic-gold" />,
                  title: "الشراكة الاجتماعية",
                  description: "مبادرات اجتماعية لدعم التراث والثقافة المصرية",
                  benefits: ["أثر اجتماعي", "سمعة إيجابية", "مسؤولية مجتمعية"]
                }
              ].map((partnership, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-center mb-4">{partnership.icon}</div>
                  <h3 className="text-xl font-bold text-hieroglyph-black mb-3 text-center">
                    {partnership.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-center">
                    {partnership.description}
                  </p>
                  <ul className="space-y-2">
                    {partnership.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-700">
                        <span className="w-2 h-2 bg-pharaonic-gold rounded-full mr-3"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-hieroglyph-black mb-4">
                قصص نجاح شركائنا
              </h2>
              <p className="text-gray-700">
                شركاء نفخر بإنجازاتهم ونجاحهم معنا
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  company: "مجموعة الفنادق الذهبية",
                  country: "الإمارات العربية المتحدة",
                  achievement: "زيادة رضا النزلاء بنسبة 35%",
                  quote: "الوسائد الفرعونية أضافت لمسة فاخرة لتجربة نزلائنا",
                  growth: "+150%"
                },
                {
                  company: "شركة السفر الملكي",
                  country: "المملكة العربية السعودية",
                  achievement: "توسع في 12 مدينة جديدة",
                  quote: "شراكة استراتيجية ناجحة فتحت لنا أسواق جديدة",
                  growth: "+200%"
                },
                {
                  company: "متاجر الراحة الأوروبية",
                  country: "ألمانيا",
                  achievement: "أصبحت المنتج الأكثر مبيعاً",
                  quote: "جودة استثنائية وتصميم فريد يحبه عملاؤنا",
                  growth: "+120%"
                }
              ].map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-pharaonic-gold to-deep-blue rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaAward className="text-white text-2xl" />
                    </div>
                    <h3 className="font-bold text-hieroglyph-black">{story.company}</h3>
                    <p className="text-sm text-gray-600">{story.country}</p>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-pharaonic-gold mb-2">
                      {story.growth}
                    </div>
                    <p className="text-sm text-gray-600">{story.achievement}</p>
                  </div>
                  
                  <blockquote className="text-center text-gray-700 italic">
                    &quot;{story.quote}&quot;
                  </blockquote>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-hieroglyph-black mb-4">
                  مزايا الشراكة معنا
                </h2>
                <p className="text-gray-700">
                  نقدم دعماً شاملاً لضمان نجاح شراكتنا
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <FaChartLine className="text-2xl text-pharaonic-gold" />,
                    title: "نمو مضمون",
                    description: "خطط نمو مدروسة ومضمونة"
                  },
                  {
                    icon: <FaUsers className="text-2xl text-pharaonic-gold" />,
                    title: "دعم مستمر",
                    description: "فريق دعم متخصص على مدار الساعة"
                  },
                  {
                    icon: <FaAward className="text-2xl text-pharaonic-gold" />,
                    title: "جودة عالمية",
                    description: "منتجات بمعايير جودة عالمية"
                  },
                  {
                    icon: <FaRocket className="text-2xl text-pharaonic-gold" />,
                    title: "ابتكار مستمر",
                    description: "تطوير منتجات جديدة باستمرار"
                  }
                ].map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-3">{benefit.icon}</div>
                    <h3 className="font-bold text-hieroglyph-black mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Partnership Form */}
        <section id="partnership-form" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-hieroglyph-black mb-4">
                  ابدأ رحلة الشراكة معنا
                </h2>
                <p className="text-gray-700">
                  املأ النموذج وسيتواصل معك فريق الشراكات خلال 48 ساعة
                </p>
              </div>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl"
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <span className="text-xl">✅</span>
                      <div>
                        <h4 className="font-semibold text-green-800">تم إرسال الطلب بنجاح!</h4>
                        <p className="text-sm text-green-600">{submitMessage}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <span className="text-xl">❌</span>
                      <div>
                        <h4 className="font-semibold text-red-800">خطأ في الإرسال</h4>
                        <p className="text-sm text-red-600">{submitMessage}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم الشركة *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold"
                    placeholder="اسم شركتك"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم الشخص المسؤول *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold"
                    placeholder="اسمك الكامل"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold"
                    placeholder="email@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold"
                    placeholder="+20 123 456 7890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    موقع الشركة الإلكتروني
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold"
                    placeholder="https://www.company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع الشراكة المطلوبة *
                  </label>
                  <select
                    name="partnershipType"
                    value={formData.partnershipType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold"
                  >
                    <option value="">اختر نوع الشراكة</option>
                    <option value="distribution">التوزيع الإقليمي</option>
                    <option value="manufacturing">الشراكة في التصنيع</option>
                    <option value="marketing">الشراكة التسويقية</option>
                    <option value="innovation">الابتكار والتطوير</option>
                    <option value="services">شراكة الخدمات</option>
                    <option value="social">الشراكة الاجتماعية</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    حجم الشركة
                  </label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold"
                  >
                    <option value="">اختر حجم الشركة</option>
                    <option value="startup">شركة ناشئة (1-10 موظفين)</option>
                    <option value="small">شركة صغيرة (11-50 موظف)</option>
                    <option value="medium">شركة متوسطة (51-200 موظف)</option>
                    <option value="large">شركة كبيرة (201-1000 موظف)</option>
                    <option value="enterprise">مؤسسة كبرى (أكثر من 1000 موظف)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تفاصيل الشراكة المقترحة *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold"
                    placeholder="أخبرنا عن رؤيتك للشراكة وكيف يمكننا التعاون معاً..."
                  />
                </div>

                <div className="md:col-span-2">
                  <motion.button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className={`w-full py-4 px-8 rounded-xl font-semibold transition-all duration-300 ${
                      submitStatus === 'loading'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-pharaonic-gold to-deep-blue hover:shadow-lg transform hover:scale-105'
                    } text-white`}
                    whileHover={submitStatus !== 'loading' ? { scale: 1.02, y: -2 } : {}}
                    whileTap={submitStatus !== 'loading' ? { scale: 0.98 } : {}}
                  >
                    {submitStatus === 'loading' ? (
                      <div className="flex items-center justify-center space-x-2 space-x-reverse">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>جاري الإرسال إلى المصنع...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2 space-x-reverse">
                        <span>📧</span>
                        <span>إرسال طلب الشراكة إلى المصنع</span>
                      </div>
                    )}
                  </motion.button>
                  
                  <div className="text-center text-sm text-gray-500 mt-3">
                    <p>سيتم إرسال طلبك مباشرة إلى: <strong>sales@ykp-eg.com</strong></p>
                    <p>وقت الاستجابة: خلال 48 ساعة</p>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <h2 className="text-2xl font-bold text-hieroglyph-black mb-6">
                🏭 تواصل مع فريق الشراكات في المصنع
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                تواصل مباشرة مع فريق الشراكات في YKP Supplies للحصول على أسرع استجابة
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="flex flex-col items-center p-4 bg-gradient-to-br from-pharaonic-gold/10 to-deep-blue/10 rounded-xl hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <FaEnvelope className="text-3xl text-pharaonic-gold mb-3" />
                  <h3 className="font-semibold text-hieroglyph-black mb-2">إيميل المصنع</h3>
                  <a href="mailto:sales@ykp-eg.com" className="text-pharaonic-gold hover:text-deep-blue transition-colors">
                    sales@ykp-eg.com
                  </a>
                  <p className="text-xs text-gray-500 mt-1 text-center">للشراكات والتعاون</p>
                </motion.div>
                <motion.div 
                  className="flex flex-col items-center p-4 bg-gradient-to-br from-pharaonic-gold/10 to-deep-blue/10 rounded-xl hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <FaPhone className="text-3xl text-pharaonic-gold mb-3" />
                  <h3 className="font-semibold text-hieroglyph-black mb-2">هاتف المصنع</h3>
                  <a href="tel:+201002406013" className="text-pharaonic-gold hover:text-deep-blue transition-colors">
                    +20 100 240 6013
                  </a>
                  <p className="text-xs text-gray-500 mt-1 text-center">للتواصل المباشر</p>
                </motion.div>
                <motion.div 
                  className="flex flex-col items-center p-4 bg-gradient-to-br from-pharaonic-gold/10 to-deep-blue/10 rounded-xl hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <FaWhatsapp className="text-3xl text-pharaonic-gold mb-3" />
                  <h3 className="font-semibold text-hieroglyph-black mb-2">واتساب المصنع</h3>
                  <a href="https://wa.me/201002406013" className="text-pharaonic-gold hover:text-deep-blue transition-colors" target="_blank" rel="noopener noreferrer">
                    +20 100 240 6013
                  </a>
                  <p className="text-xs text-gray-500 mt-1 text-center">رسائل فورية</p>
                </motion.div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-pharaonic-gold/20 to-deep-blue/20 rounded-xl text-center">
                <h4 className="font-semibold text-hieroglyph-black mb-2">🏭 YKP Supplies</h4>
                <p className="text-sm text-gray-600">مصنع الوسائد الفرعونية - القاهرة، مصر</p>
                <p className="text-sm text-gray-600">Egyptian Travel Pillows Manufacturing - Cairo, Egypt</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PartnershipPage;