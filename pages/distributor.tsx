/**
 * Distributor Page
 * Distributor program and opportunities
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEOHead } from '@/components/SEOHead';
import { 
  FaTruck, 
  FaChartLine, 
  FaUsers,
  FaAward,
  FaMapMarkedAlt,
  FaDollarSign,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaDownload,
  FaCheckCircle
} from 'react-icons/fa';

const DistributorPage: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    experience: '',
    currentBrands: '',
    salesChannels: '',
    estimatedSales: '',
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
      const response = await fetch('/api/distributor-inquiry', {
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
          setSubmitMessage('تم إرسال طلبك بنجاح! سيتواصل معك فريق إدارة الموزعين خلال 72 ساعة.');
          setFormData({
            companyName: '',
            contactName: '',
            email: '',
            phone: '',
            country: '',
            city: '',
            experience: '',
            currentBrands: '',
            salesChannels: '',
            estimatedSales: '',
            message: ''
          });
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      throw new Error('Static fallback');
    } catch (error) {
      const waText = encodeURIComponent(`*طلب انضمام لبرنامج الموزعين - YKP Supplies*\nالشركة: ${formData.companyName}\nالمسؤول: ${formData.contactName}\nالبريد: ${formData.email}\nالهاتف: ${formData.phone}\nالدولة/المدينة: ${formData.country} / ${formData.city}\nالخبرة: ${formData.experience}\nقنوات البيع: ${formData.salesChannels}\nالمبيعات التقديرية: ${formData.estimatedSales}\nملاحظات: ${formData.message}`);
      if (typeof window !== 'undefined') {
        window.open(`https://wa.me/201002406013?text=${waText}`, '_blank');
      }
      setSubmitStatus('success');
      setSubmitMessage('تم تجهيز طلبك وفتح واتساب للتواصل المباشر مع إدارة الموزعين.');
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        experience: '',
        currentBrands: '',
        salesChannels: '',
        estimatedSales: '',
        message: ''
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEOHead
        seoConfig={{
          title: "برنامج الموزعين | Distributor Program - Pharaonic Pillows",
          description: "انضم إلى برنامج الموزعين المعتمدين للوسائد الفرعونية. فرص توزيع حصرية، دعم تسويقي، وهوامش ربح ممتازة.",
          keywords: [
            'برنامج الموزعين',
            'موزع معتمد',
            'فرص التوزيع',
            'distributor program',
            'authorized distributor',
            'distribution opportunities'
          ],
          openGraph: {
            title: "برنامج الموزعين | Distributor Program - Pharaonic Pillows",
            description: "انضم إلى برنامج الموزعين المعتمدين للوسائد الفرعونية. فرص توزيع حصرية ودعم تسويقي",
            image: "/distributor-og.jpg",
            url: "/distributor",
            type: "website",
            siteName: "Pharaonic Pillows"
          },
          twitter: {
            card: "summary_large_image",
            title: "برنامج الموزعين | Distributor Program - Pharaonic Pillows",
            description: "انضم إلى برنامج الموزعين المعتمدين للوسائد الفرعونية. فرص توزيع حصرية ودعم تسويقي",
            image: "/distributor-og.jpg"
          }
        }}
        canonical="/distributor"
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
                🚚 برنامج الموزعين المعتمدين
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                كن جزءاً من شبكة الموزعين المعتمدين واحصل على حقوق التوزيع الحصرية في منطقتك
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#distributor-form"
                  className="bg-gradient-to-r from-pharaonic-gold to-deep-blue text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  تقدم الآن
                </a>
                <button className="border-2 border-pharaonic-gold text-pharaonic-gold py-3 px-8 rounded-xl font-semibold hover:bg-pharaonic-gold hover:text-white transition-all duration-300 flex items-center justify-center">
                  <FaDownload className="mr-2" />
                  دليل الموزع
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Program Benefits */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-hieroglyph-black mb-4">
                مزايا برنامج الموزعين
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                نقدم دعماً شاملاً وحوافز مميزة لضمان نجاح شراكتنا
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaMapMarkedAlt className="text-3xl text-pharaonic-gold" />,
                  title: "حصرية إقليمية",
                  description: "احصل على حقوق التوزيع الحصرية في منطقتك الجغرافية المحددة"
                },
                {
                  icon: <FaDollarSign className="text-3xl text-pharaonic-gold" />,
                  title: "هوامش ربح عالية",
                  description: "هوامش ربح تنافسية تصل إلى 50% مع خصومات إضافية للكميات الكبيرة"
                },
                {
                  icon: <FaTruck className="text-3xl text-pharaonic-gold" />,
                  title: "دعم لوجستي",
                  description: "نظام شحن وتوزيع متطور مع تتبع الشحنات وضمان التسليم"
                },
                {
                  icon: <FaUsers className="text-3xl text-pharaonic-gold" />,
                  title: "تدريب الفريق",
                  description: "برامج تدريبية شاملة لفريق المبيعات والدعم الفني"
                },
                {
                  icon: <FaChartLine className="text-3xl text-pharaonic-gold" />,
                  title: "دعم تسويقي",
                  description: "حملات تسويقية مشتركة ومواد ترويجية مجانية"
                },
                {
                  icon: <FaAward className="text-3xl text-pharaonic-gold" />,
                  title: "شهادة معتمدة",
                  description: "شهادة موزع معتمد وحقوق استخدام العلامة التجارية"
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

        {/* Requirements */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-hieroglyph-black mb-6">
                  متطلبات الانضمام للبرنامج
                </h2>
                <ul className="space-y-4">
                  {[
                    "خبرة لا تقل عن 3 سنوات في مجال التوزيع",
                    "شبكة توزيع قائمة في المنطقة المستهدفة",
                    "رأس مال كافي للاستثمار الأولي",
                    "فريق مبيعات مدرب ومؤهل",
                    "مستودع مناسب لتخزين المنتجات",
                    "نظام إدارة المخزون والمبيعات",
                    "التزام بمعايير الجودة والخدمة",
                    "خطة تسويقية للمنطقة المستهدفة"
                  ].map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheckCircle className="text-pharaonic-gold mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Support Package */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-hieroglyph-black mb-6">
                  حزمة الدعم المقدمة
                </h2>
                <ul className="space-y-4">
                  {[
                    "دليل شامل للموزع المعتمد",
                    "تدريب مكثف لمدة أسبوعين",
                    "مواد تسويقية وترويجية مجانية",
                    "نظام إدارة الطلبات الإلكتروني",
                    "دعم فني على مدار الساعة",
                    "زيارات دورية من فريق الدعم",
                    "تحديثات منتظمة للمنتجات",
                    "برامج تحفيزية ومكافآت الأداء"
                  ].map((support, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheckCircle className="text-pharaonic-gold mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{support}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-hieroglyph-black mb-4">
                إنجازات شبكة الموزعين
              </h2>
              <p className="text-gray-700">
                أرقام تعكس نجاح برنامج الموزعين المعتمدين
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  number: "50+",
                  label: "موزع معتمد",
                  description: "في 25 دولة حول العالم"
                },
                {
                  number: "95%",
                  label: "معدل الرضا",
                  description: "من الموزعين المعتمدين"
                },
                {
                  number: "200%",
                  label: "نمو المبيعات",
                  description: "متوسط نمو الموزعين سنوياً"
                },
                {
                  number: "24/7",
                  label: "دعم مستمر",
                  description: "خدمة عملاء على مدار الساعة"
                }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center"
                >
                  <div className="text-4xl font-bold text-pharaonic-gold mb-2">
                    {metric.number}
                  </div>
                  <h3 className="text-lg font-semibold text-hieroglyph-black mb-2">
                    {metric.label}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {metric.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="distributor-form" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-hieroglyph-black mb-4">
                  طلب الانضمام لبرنامج الموزعين
                </h2>
                <p className="text-gray-700">
                  املأ النموذج وسيتواصل معك فريق التوزيع خلال 72 ساعة
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
                    المدينة *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold"
                    placeholder="القاهرة"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    سنوات الخبرة في التوزيع *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold"
                  >
                    <option value="">اختر سنوات الخبرة</option>
                    <option value="1-3">1-3 سنوات</option>
                    <option value="3-5">3-5 سنوات</option>
                    <option value="5-10">5-10 سنوات</option>
                    <option value="10+">أكثر من 10 سنوات</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    المبيعات المتوقعة شهرياً
                  </label>
                  <select
                    name="estimatedSales"
                    value={formData.estimatedSales}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold"
                  >
                    <option value="">اختر المبيعات المتوقعة</option>
                    <option value="100-500">100 - 500 قطعة</option>
                    <option value="500-1000">500 - 1000 قطعة</option>
                    <option value="1000-2000">1000 - 2000 قطعة</option>
                    <option value="2000+">أكثر من 2000 قطعة</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العلامات التجارية الحالية
                  </label>
                  <input
                    type="text"
                    name="currentBrands"
                    value={formData.currentBrands}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold"
                    placeholder="اذكر العلامات التجارية التي توزعها حالياً"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    قنوات التوزيع المتاحة
                  </label>
                  <input
                    type="text"
                    name="salesChannels"
                    value={formData.salesChannels}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold"
                    placeholder="متاجر التجزئة، المتاجر الإلكترونية، الفنادق، إلخ"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    خطة التوزيع والتسويق *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold"
                    placeholder="أخبرنا عن خطتك لتوزيع وتسويق منتجاتنا في منطقتك..."
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
                        <span>إرسال طلب الانضمام إلى المصنع</span>
                      </div>
                    )}
                  </motion.button>
                  
                  <div className="text-center text-sm text-gray-500 mt-3">
                    <p>سيتم إرسال طلبك مباشرة إلى: <strong>ykp.supplies@gmail.com</strong></p>
                    <p>وقت الاستجابة: خلال 72 ساعة</p>
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
                🏭 تواصل مع فريق إدارة الموزعين في المصنع
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                تواصل مباشرة مع فريق إدارة الموزعين في YKP Supplies للحصول على أسرع استجابة
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
                  <p className="text-xs text-gray-500 mt-1 text-center">لطلبات التوزيع</p>
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

export default DistributorPage;