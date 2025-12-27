import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface TypewriterHeroProps {
  locale?: string;
}

const TypewriterHero: React.FC<TypewriterHeroProps> = ({ locale = 'en' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isArabic = locale === 'ar';

  const content = isArabic ? {
    title: 'مخدات سفر فرعونية',
    subtitle: 'راحة مصرية في كل رحلة',
    typewriterTexts: [
      'صُنعت بأيدٍ مصرية خبيرة',
      'تصاميم فرعونية أصيلة',
      'راحة ميموري فوم فائقة',
      'هدايا سياحية مصرية فاخرة'
    ],
    description: 'نصنّع مخدات سفر للرقبة بتصميمات فرعونية مصرية تجمع بين الراحة الميموري فوم والدعم المريح للرحلات الطويلة. استمتع بنوم مريح أثناء السفر بالطائرة أو السيارة مع هدايا سياحية مصرية أصيلة من صنع أيدٍ مصرية.',
    cta1: 'تسوّق الآن',
    cta2: 'عن صناعتنا'
  } : {
    title: 'Premium Egyptian Travel Neck Pillows',
    subtitle: 'Pharaonic Inspired Design',
    typewriterTexts: [
      'Expertly Manufactured in Egypt',
      'Authentic Pharaonic Art',
      'Superior Memory Foam Comfort',
      'Unique Egyptian Souvenirs'
    ],
    description: 'Expertly manufactured in Egypt, our memory-foam travel pillows blend Pharaonic art with modern ergonomic comfort. Enjoy better sleep and neck support on every airplane, car, or train journey with a unique Egyptian souvenir made for global travelers.',
    cta1: 'Shop Travel Pillows',
    cta2: 'Explore Egyptian Craftsmanship'
  };

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const currentText = content.typewriterTexts[loopNum % content.typewriterTexts.length];

    const timer = setTimeout(() => {
      if (!isDeleting && currentIndex < currentText.length) {
        setDisplayedText(currentText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (isDeleting && currentIndex > 0) {
        setDisplayedText(currentText.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else if (!isDeleting && currentIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, loopNum, content.typewriterTexts]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Egyptian Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-amber-800"></div>

        {/* Animated Egyptian Hieroglyphs Background */}
        <div className="absolute inset-0 opacity-10">
          {isMounted && ['𓂀', '𓁹', '𓋹', '𓊪', '𓈖', '𓊽', '𓇳', '𓊨', '𓃭', '𓆣'].map((hieroglyph, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl text-amber-400"
              style={{
                left: `${(i * 10) % 100}%`,
                top: `${(i * 15) % 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.1, 0.3, 0.1],
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {hieroglyph}
            </motion.div>
          ))}
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0">
          {isMounted && [...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-30, 30, -30],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {content.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-amber-400 mb-8"
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {content.subtitle}
          </motion.h2>

          {/* Typewriter Effect */}
          <motion.div
            className="min-h-[80px] mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/90 flex items-center justify-center gap-2">
              <span className="text-amber-400">✨</span>
              <span style={{ fontFamily: 'Inter, sans-serif' }}>
                {displayedText}
              </span>
              <motion.span
                className="inline-block w-1 h-8 md:h-10 bg-amber-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-white/90 mb-12 max-w-5xl mx-auto leading-relaxed px-4"
            style={{ fontFamily: 'Inter, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {content.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/products">
              <motion.button
                className="group relative bg-gradient-to-r from-amber-500 to-amber-600 text-white px-12 py-5 rounded-full text-lg font-bold shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(245, 158, 11, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <span>🛍️</span>
                  {content.cta1}
                </span>
              </motion.button>
            </Link>

            <Link href="/about">
              <motion.button
                className="group relative bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-12 py-5 rounded-full text-lg font-bold hover:bg-white hover:text-gray-900 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="flex items-center gap-2">
                  <span>🕌</span>
                  {content.cta2}
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/80"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏭</span>
              <span className="text-sm md:text-base font-medium">
                {isArabic ? 'صُنع في مصر' : 'Made in Egypt'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span className="text-sm md:text-base font-medium">
                {isArabic ? 'جودة معتمدة' : 'Quality Certified'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <span className="text-sm md:text-base font-medium">
                {isArabic ? 'شحن عالمي' : 'Global Shipping'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💯</span>
              <span className="text-sm md:text-base font-medium">
                {isArabic ? 'ضمان سنتين' : '2-Year Warranty'}
              </span>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-white/60 text-sm mb-2">
              {isArabic ? 'اكتشف المزيد' : 'Discover More'}
            </div>
            <motion.div
              className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
              whileHover={{ borderColor: 'rgba(251, 191, 36, 0.8)' }}
            >
              <motion.div
                className="w-1.5 h-3 bg-amber-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TypewriterHero;
