/**
 * Wholesale Page
 * B2B wholesale opportunities and bulk orders
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { SEOHead } from '@/components/SEOHead';
import { 
  FaTruck, 
  FaHandshake, 
  FaGlobe, 
  FaPercent,
  FaUsers,
  FaAward,
  FaEnvelope,
  FaPhone,
  FaWhatsapp
} from 'react-icons/fa';

const WholesalePage: React.FC = () => {
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
      const response = await fetch('/api/wholesale-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setSubmitMessage('تم إرسال طلبك بنجاح! سنتواصل معك خلال 24 ساعة بعرض سعر مخصص.');
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
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(result.message || 'Failed to send inquiry');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('عذراً، حدث خطأ في إرسال طلبك. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.');
      console.error('Form submission error:', error);
    }
  };

  return (
    <>
      <SEOHead
        seoConfig={{
          title: "الجملة والتوزيع | Wholesale - Pharaonic Pillows",
          description: "انضم إلى شبكة موزعي الوسائد الفرعونية. عروض خاصة للجملة، خصومات تنافسية، وشحن عالمي لتجار التجزئة والموزعين.",
          keywords: [
            'الجملة',
            'التوزيع',
            'وسائد السفر بالجملة',
            'wholesale travel pillows',
            'bulk orders',
            'distributor opportunities'
          ],
          openGraph: {
            title: "الجملة والتوزيع | Wholesale - Pharaonic Pillows",
            description: "انضم إلى شبكة موزعي الوسائد الفرعونية. عروض خاصة للجملة وخصومات تنافسية",
            image: "/wholesale-og.jpg",
            url: "/wholesale",
            type: "website",
            siteName: "Pharaonic Pillows"
          },
          twitter: {
            card: "summary_large_image",
            title: "الجملة والتوزيع | Wholesale - Pharaonic Pillows",
            description: "انضم إلى شبكة موزعي الوسائد الفرعونية. عروض خاصة للجملة وخصومات تنافسية",
            image: "/wholesale-og.jpg"
          }
        }}
        canonical="/wholesale"
      />

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
                🏺 الجملة والتوزيع
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                انضم إلى شبكة موزعي الوسائد الفرعونية واستفد من عروض الجملة الحصرية والدعم التجاري المتميز
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#wholesale-form"
                  className="bg-gradient-to-r from-pharaonic-gold to-deep-blue text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  طلب عرض سعر
                </a>
                <Link
                  href="/products"
                  className="border-2 border-pharaonic-gold text-pharaonic-gold py-3 px-8 rounded-xl font-semibold hover:bg-pharaonic-gold hover:text-white transition-all duration-300"
                >
                  تصفح المنتجات
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-hieroglyph-black mb-4">
                لماذا تختار الوسائد الفرعونية للجملة؟
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                نقدم أفضل الشروط التجارية والدعم الكامل لشركائنا في جميع أنحاء العالم
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaPercent className="text-3xl text-pharaonic-gold" />,
                  title: "خصومات تنافسية",
                  description: "خصومات تصل إلى 40% على الطلبات الكبيرة مع هوامش ربح ممتازة"
                },
                {
                  icon: <FaTruck className="text-3xl text-pharaonic-gold" />,
                  title: "شحن عالمي",
                  description: "شحن سريع وآمن إلى جميع أنحاء العالم مع تتبع الشحنات"
                },
                {
                  icon: <FaAward className="text-3xl text-pharaonic-gold" />,
                  title: "جودة مضمونة",
                  description: "منتجات عالية الجودة مع ضمان الاستبدال والإرجاع"
                },
                {
                  icon: <FaUsers className="text-3xl text-pharaonic-gold" />,
                  title: "دعم تسويقي",
                  description: "مواد تسويقية مجانية وحملات ترويجية لدعم مبيعاتك"
                },
                {
                  icon: <FaHandshake className="text-3xl text-pharaonic-gold" />,
                  title: "شراكة طويلة الأمد",
                  description: "علاقات تجارية مستدامة مع دعم مستمر لنمو أعمالك"
                },
                {
                  icon: <FaGlobe className="text-3xl text-pharaonic-gold" />,
                  title: "حصرية إقليمية",
                  description: "إمكانية الحصول على حقوق التوزيع الحصرية في منطقتك"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-hieroglyph-black mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-hieroglyph-black mb-4">
                مستويات الخصم حسب الكمية
              </h2>
              <p className="text-gray-700">
                كلما زادت الكمية، زاد الخصم والربح
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  tier: "البرونزي",
                  quantity: "50 - 199 قطعة",
                  discount: "15%",
                  color: "from-amber-600 to-amber-800"
                },
                {
                  tier: "الفضي",
                  quantity: "200 - 499 قطعة",
                  discount: "25%",
                  color: "from-gray-400 to-gray-600",
                  popular: true
                },
                {
                  tier: "الذهبي",
                  quantity: "500+ قطعة",
                  discount: "40%",
                  color: "from-pharaonic-gold to-deep-blue"
                }
              ].map((tier, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl p-6 shadow-lg text-center ${
                    tier.popular ? 'ring-4 ring-pharaonic-gold' : ''
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-pharaonic-gold text-white px-4 py-1 rounded-full text-sm font-bold">
                        الأكثر شعبية
                      </span>
                    </div>
                  )}
                  
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center`}>
                    <FaAward className="text-white text-2xl" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-hieroglyph-black mb-2">
                    {tier.tier}
                  </h3>
                  <p className="text-gray-600 mb-4">{tier.quantity}</p>
                  <div className="text-4xl font-bold text-pharaonic-gold mb-4">
                    {tier.discount}
                  </div>
                  <p className="text-sm text-gray-500">خصم على السعر الأساسي</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="wholesale-form" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-hieroglyph-black mb-4">
                  طلب عرض سعر للجملة
                </h2>
                <p className="text-gray-700">
                  املأ النموذج وسنتواصل معك خلال 24 ساعة بعرض سعر مخصص
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
                    البلد *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold"
                    placeholder="مصر"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع النشاط التجاري
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold"
                  >
                    <option value="">اختر نوع النشاط</option>
                    <option value="retailer">تاجر تجزئة</option>
                    <option value="distributor">موزع</option>
                    <option value="online-store">متجر إلكتروني</option>
                    <option value="hotel-chain">سلسلة فنادق</option>
                    <option value="travel-agency">وكالة سفر</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الكمية المتوقعة شهرياً
                  </label>
                  <select
                    name="estimatedQuantity"
                    value={formData.estimatedQuantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold"
                  >
                    <option value="">اختر الكمية المتوقعة</option>
                    <option value="50-100">50 - 100 قطعة</option>
                    <option value="100-200">100 - 200 قطعة</option>
                    <option value="200-500">200 - 500 قطعة</option>
                    <option value="500-1000">500 - 1000 قطعة</option>
                    <option value="1000+">أكثر من 1000 قطعة</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رسالة إضافية
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold"
                    placeholder="أخبرنا المزيد عن احتياجاتك..."
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
                        <span>إرسال طلب العرض إلى المصنع</span>
                      </div>
                    )}
                  </motion.button>
                  
                  <div className="text-center text-sm text-gray-500 mt-3">
                    <p>سيتم إرسال طلبك مباشرة إلى: <strong>ykp.supplies@gmail.com</strong></p>
                    <p>وقت الاستجابة: خلال 24 ساعة</p>
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
                🏭 تواصل مع المصنع مباشرة
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                تواصل مباشرة مع فريق التصنيع في YKP Supplies للحصول على أسرع استجابة
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="flex flex-col items-center p-4 bg-gradient-to-br from-pharaonic-gold/10 to-deep-blue/10 rounded-xl hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <FaEnvelope className="text-3xl text-pharaonic-gold mb-3" />
                  <h3 className="font-semibold text-hieroglyph-black mb-2">إيميل المصنع</h3>
                  <a href="mailto:ykp.supplies@gmail.com" className="text-pharaonic-gold hover:text-deep-blue transition-colors">
                    ykp.supplies@gmail.com
                  </a>
                  <p className="text-xs text-gray-500 mt-1 text-center">للاستفسارات والطلبات</p>
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
    </>
  );
};

export default WholesalePage;