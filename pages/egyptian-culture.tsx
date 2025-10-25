/**
 * Egyptian Culture Page
 * Comprehensive guide to ancient Egyptian culture and heritage
 */

import React from 'react';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { SEOHead } from '@/components/SEOHead';

const EgyptianCulturePage: React.FC = () => {
  return (
    <>
      <SEOHead
        seoConfig={{
          title: "الثقافة المصرية القديمة | Egyptian Culture - Ancient Heritage",
          description: "اكتشف الثقافة المصرية القديمة وتراثها العريق. تعرف على الحضارة الفرعونية وكيف تؤثر على تصاميم وسائد السفر المصرية الحديثة.",
          keywords: [
            'الثقافة المصرية',
            'التراث المصري',
            'الحضارة الفرعونية',
            'egyptian culture',
            'ancient egypt',
            'pharaonic heritage'
          ],
          openGraph: {
            title: "الثقافة المصرية القديمة | Egyptian Culture",
            description: "اكتشف الثقافة المصرية القديمة وتراثها العريق",
            image: "/egyptian-culture-og.jpg",
            url: "/egyptian-culture",
            type: "website",
            siteName: "Pharaonic Pillows"
          },
          twitter: {
            card: "summary_large_image",
            title: "الثقافة المصرية القديمة | Egyptian Culture",
            description: "اكتشف الثقافة المصرية القديمة وتراثها العريق",
            image: "/egyptian-culture-og.jpg"
          }
        }}
        canonical="/egyptian-culture"
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
                🏺 الثقافة المصرية القديمة
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                اكتشف عظمة الحضارة الفرعونية وكيف يستمر تراثها في  ام تصاميمنا الحديثة
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              
              {/* Ancient Wisdom */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-hieroglyph-black mb-4 flex items-center">
                  📜 الحكمة المصرية القديمة
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  لآلاف السنين، كانت مصر القديمة منارة للحضارة والمعرفة. من بناء الأهرامات العظيمة 
                  إلى تطوير نظام الكتابة الهيروغليفية، أسس المصريون القدماء تقاليد من الإبداع والحرفية 
                  التي نستلهم منها في تصميم وسائد السفر الفاخرة.
                </p>
              </motion.div>

              {/* Sacred Symbols */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-hieroglyph-black mb-4 flex items-center">
                  🔱 الرموز المقدسة
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  كل رمز فرعوني يحمل معنى عميقاً ويروي قصة من التراث المصري العريق:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-pharaonic-gold mr-2">•</span>
                    أنوبيس - حارس الآخرة والحماية الأبدية
                  </li>
                  <li className="flex items-center">
                    <span className="text-pharaonic-gold mr-2">•</span>
                    عين حورس - رمز الحماية والقوة ال ية
                  </li>
                  <li className="flex items-center">
                    <span className="text-pharaonic-gold mr-2">•</span>
                    الجعران المقدس - رمز التجديد والولادة الجديدة
                  </li>
                </ul>
              </motion.div>

              {/* Modern Heritage */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-hieroglyph-black mb-4 flex items-center">
                  ✨ التراث في العصر الحديث
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  نحن في &quot;الوسائد الفرعونية&quot; نؤمن بأن التراث المصري العظيم يجب أن يستمر في الحياة. 
                  لذلك نصمم وسائد السفر بعناية فائقة، مستلهمين من الفن والرموز الفرعونية، 
                  لنقدم لك راحة حديثة بلمسة تراثية أصيلة.
                </p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-hieroglyph-black mb-4">
                🎨 اكتشف مجموعتنا المستوحاة من التراث
              </h2>
              <p className="text-gray-700 mb-6">
                تصفح وسائد السفر المصممة بعناية والمستوحاة من الرموز الفرعونية العريقة
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="bg-gradient-to-r from-pharaonic-gold to-deep-blue text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  تصفح المنتجات
                </Link>
                <Link
                  href="/pharaonic-symbols"
                  className="border-2 border-pharaonic-gold text-pharaonic-gold py-3 px-8 rounded-xl font-semibold hover:bg-pharaonic-gold hover:text-white transition-all duration-300"
                >
                  الرموز الفرعونية
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EgyptianCulturePage;