import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaHeart, 
  FaGlobe, 
  FaAward, 
  FaUsers, 
  FaRocket,
  FaHandshake,
  FaStar,
  FaQuoteLeft,
  FaArrowRight
} from 'react-icons/fa';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const AboutPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'الرئيسية', href: '/', icon: '🏠' },
    { label: 'من نحن', href: '/about', icon: 'ℹ️' },
  ];

  const values = [
    {
      icon: <FaHeart className="text-4xl text-pharaonic-gold" />,
      title: 'التراث المصري العريق',
      description: 'نحتفي بالفن المصري القديم في كل تصميم، نربط المسافرين المعاصرين بالكنوز الثقافية الخالدة.',
    },
    {
      icon: <FaAward className="text-4xl text-pharaonic-gold" />,
      title: 'التميز في الجودة',
      description: 'مواد فاخرة وحرفية دقيقة تضمن أن كل وسادة تلبي أعلى معايير الراحة والمتانة.',
    },
    {
      icon: <FaGlobe className="text-4xl text-pharaonic-gold" />,
      title: 'الشراكة العالمية',
      description: 'بناء علاقات دائمة مع الموزعين في جميع أنحاء العالم لنشر راحة السفر المصرية عبر القارات.',
    },
    {
      icon: <FaRocket className="text-4xl text-pharaonic-gold" />,
      title: 'الابتكار المستمر',
      description: 'دمج الحكمة القديمة مع التكنولوجيا الحديثة لإنتاج وسائد سفر تقدم راحة وأهمية ثقافية لا مثيل لها.',
    },
  ];

  const timeline = [
    {
      year: '2018',
      title: 'التأسيس',
      description: 'تأسست الوسائد الفرعونية برؤية لجلب التراث المصري إلى راحة السفر الحديثة.',
      icon: <FaRocket className="text-pharaonic-gold" />
    },
    {
      year: '2019',
      title: 'المجموعة الأولى',
      description: 'إطلاق مجموعة البريميوم (B123) بتصاميم فرعونية أصيلة وتقنية الإسفنج الذكي.',
      icon: <FaStar className="text-pharaonic-gold" />
    },
    {
      year: '2020',
      title: 'التوسع العالمي',
      description: 'بدء التوسع في الأسواق العالمية وإقامة شراكات استراتيجية.',
      icon: <FaGlobe className="text-pharaonic-gold" />
    },
    {
      year: '2021',
      title: 'الاعتراف الدولي',
      description: 'حصلنا على جوائز دولية للتصميم والجودة في معارض السفر العالمية.',
      icon: <FaAward className="text-pharaonic-gold" />
    },
    {
      year: '2022',
      title: 'الابتكار التقني',
      description: 'تطوير تقنيات جديدة في الراحة والتصميم مع الحفاظ على الهوية المصرية.',
      icon: <FaUsers className="text-pharaonic-gold" />
    },
    {
      year: '2024',
      title: 'المستقبل',
      description: 'نواصل رحلتنا لنشر التراث المصري العريق في جميع أنحاء العالم.',
      icon: <FaHandshake className="text-pharaonic-gold" />
    }
  ];

  const testimonials = [
    {
      name: 'أحمد محمد',
      role: 'مسافر دائم',
      quote: 'الوسائد الفرعونية غيرت تجربة سفري تماماً. الراحة والتصميم الجميل يجعلان كل رحلة مميزة.',
      rating: 5
    },
    {
      name: 'سارة علي',
      role: 'مديرة فندق',
      quote: 'نزلاؤنا يحبون الوسائد الفرعونية. إنها تضيف لمسة فاخرة وثقافية لتجربة الإقامة.',
      rating: 5
    },
    {
      name: 'محمد حسن',
      role: 'موزع معتمد',
      quote: 'شراكتي مع الوسائد الفرعونية كانت من أنجح قراراتي التجارية. منتج مميز وفريق رائع.',
      rating: 5
    }
  ];

  const stats = [
    { number: '50+', label: 'دولة حول العالم', icon: <FaGlobe /> },
    { number: '100K+', label: 'عميل راضٍ', icon: <FaUsers /> },
    { number: '15+', label: 'جائزة دولية', icon: <FaAward /> },
    { number: '6', label: 'سنوات من التميز', icon: <FaStar /> }
  ];

  return (
    <>
      <Head>
        <title>من نحن | الوسائد الفرعونية - تراث مصري أصيل</title>
        <meta name="description" content="تعرف على قصة الوسائد الفرعونية، رحلتنا في نشر التراث المصري العريق من خلال وسائد السفر الفاخرة. قيمنا، رؤيتنا، وإنجازاتنا." />
        <meta name="keywords" content="من نحن, الوسائد الفرعونية, التراث المصري, وسائد السفر, about us, pharaonic pillows" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-papyrus via-desert-sand to-pharaonic-gold">
        {/* Breadcrumbs */}
        <div className="pt-8 px-4">
          <div className="max-w-6xl mx-auto">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-hieroglyph-black mb-6 font-pharaonic">
                🏺 من نحن
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                نحن الوسائد الفرعونية، نجمع بين عراقة التراث المصري وحداثة التكنولوجيا لنقدم لك 
                تجربة سفر لا تُنسى مليئة بالراحة والجمال الثقافي
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-pharaonic-gold to-deep-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaHeart className="text-white text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-hieroglyph-black">رسالتنا</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-center">
                  نسعى لنشر جمال التراث المصري العريق في جميع أنحاء العالم من خلال منتجات عالية الجودة 
                  تجمع بين الراحة الحديثة والتصميم الفرعوني الأصيل، لنجعل كل رحلة سفر تجربة ثقافية مميزة.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-deep-blue to-terracotta rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaRocket className="text-white text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-hieroglyph-black">رؤيتنا</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-center">
                  أن نصبح العلامة التجارية الرائدة عالمياً في وسائد السفر المستوحاة من التراث، 
                  ونكون السفراء الثقافيين للحضارة المصرية العريقة في عالم السفر والسياحة.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-hieroglyph-black mb-4">قيمنا الأساسية</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                القيم التي تحرك كل قرار نتخذه وكل منتج نصممه
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-lg font-bold text-hieroglyph-black mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-hieroglyph-black mb-4">إنجازاتنا بالأرقام</h2>
                <p className="text-gray-700">أرقام تعكس ثقة عملائنا وشركائنا حول العالم</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-pharaonic-gold text-3xl mb-2">{stat.icon}</div>
                    <div className="text-4xl font-bold text-hieroglyph-black mb-2">
                      {stat.number}
                    </div>
                    <p className="text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-hieroglyph-black mb-4">رحلتنا عبر الزمن</h2>
              <p className="text-gray-700">من فكرة بسيطة إلى علامة تجارية عالمية</p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pharaonic-gold to-deep-blue rounded-full"></div>

              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-pharaonic-gold flex items-center justify-center shadow-lg z-10">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="text-2xl font-bold text-pharaonic-gold mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-hieroglyph-black mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-hieroglyph-black mb-4">ماذا يقول عملاؤنا</h2>
              <p className="text-gray-700">شهادات حقيقية من عملائنا وشركائنا</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="text-pharaonic-gold text-3xl mb-4">
                    <FaQuoteLeft />
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-hieroglyph-black">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                    <div className="flex text-pharaonic-gold">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <h2 className="text-3xl font-bold text-hieroglyph-black mb-4">
                انضم إلى رحلتنا
              </h2>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                كن جزءاً من قصة نجاحنا واكتشف كيف يمكن للتراث المصري أن يحول تجربة سفرك
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="bg-gradient-to-r from-pharaonic-gold to-deep-blue text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                >
                  تصفح منتجاتنا
                  <FaArrowRight className="mr-2" />
                </Link>
                <Link
                  href="/partnership"
                  className="border-2 border-pharaonic-gold text-pharaonic-gold py-3 px-8 rounded-xl font-semibold hover:bg-pharaonic-gold hover:text-white transition-all duration-300 inline-flex items-center justify-center"
                >
                  كن شريكاً لنا
                  <FaHandshake className="mr-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;