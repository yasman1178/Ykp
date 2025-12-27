import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { getStaticPropsWithTranslations } from '@/lib/translations';
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
import SEO from '@/components/SEO';
import {
  StaggerContainer,
  StaggerItem,
  FloatingHieroglyphs,
  CrystalReveal,
  FloatingCard
} from '@/components/animations/EgyptianAnimations';

interface AboutPageProps {
  translations: any;
  locale: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ translations: t, locale }) => {
  const router = useRouter();
  const isRTL = locale === 'ar';

  const breadcrumbItems = [
    { label: isRTL ? 'الرئيسية' : 'Home', href: '/', icon: '🏠' },
    { label: isRTL ? 'من نحن' : 'About Us', href: '/about', icon: 'ℹ️' },
  ];

  const values = [
    {
      icon: <FaHeart className="text-4xl text-pharaonic-gold" />,
      title: isRTL ? 'التراث المصري العريق' : 'Ancient Egyptian Heritage',
      description: isRTL ? 'نحتفي بالفن المصري القديم في كل تصميم، نربط المسافرين المعاصرين بالكنوز الثقافية الخالدة.' : 'We celebrate ancient Egyptian art in every design, connecting modern travelers with timeless cultural treasures.',
    },
    {
      icon: <FaAward className="text-4xl text-pharaonic-gold" />,
      title: isRTL ? 'التميز في الجودة' : 'Quality Excellence',
      description: isRTL ? 'مواد فاخرة وحرفية دقيقة تضمن أن كل وسادة تلبي أعلى معايير الراحة والمتانة.' : 'Premium materials and meticulous craftsmanship ensure every pillow meets the highest standards of comfort and durability.',
    },
    {
      icon: <FaGlobe className="text-4xl text-pharaonic-gold" />,
      title: isRTL ? 'الشراكة العالمية' : 'Global Partnership',
      description: isRTL ? 'بناء علاقات دائمة مع الموزعين في جميع أنحاء العالم لنشر راحة السفر المصرية عبر القارات.' : 'Building lasting relationships with distributors worldwide to spread Egyptian travel comfort across continents.',
    },
    {
      icon: <FaRocket className="text-4xl text-pharaonic-gold" />,
      title: isRTL ? 'الابتكار المستمر' : 'Continuous Innovation',
      description: isRTL ? 'دمج الحكمة القديمة مع التكنولوجيا الحديثة لإنتاج وسائد سفر تقدم راحة وأهمية ثقافية لا مثيل لها.' : 'Merging ancient wisdom with modern technology to produce travel pillows that offer unparalleled comfort and cultural significance.',
    },
  ];

  const stats = [
    { number: '50+', label: isRTL ? 'دولة حول العالم' : 'Countries Worldwide', icon: <FaGlobe /> },
    { number: '100K+', label: isRTL ? 'عميل راضٍ' : 'Satisfied Customers', icon: <FaUsers /> },
    { number: '15+', label: isRTL ? 'جائزة دولية' : 'International Awards', icon: <FaAward /> },
    { number: '6', label: isRTL ? 'سنوات من التميز' : 'Years of Excellence', icon: <FaStar /> }
  ];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-papyrus-light">
      <SEO
        title={isRTL ? "من نحن | الوسائد الفرعونية" : "About Us | Pharaonic Pillows"}
        description={t.site.description}
        locale={locale}
      />

      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <FloatingHieroglyphs className="absolute top-20 left-10 text-9xl">𓂀</FloatingHieroglyphs>
          <FloatingHieroglyphs className="absolute bottom-40 right-10 text-9xl">𓋹</FloatingHieroglyphs>
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <StaggerContainer>
              <StaggerItem>
                <div className="mb-8">
                  <Breadcrumbs items={breadcrumbItems} />
                </div>
              </StaggerItem>
              <StaggerItem>
                <h1 className="text-5xl md:text-7xl font-black text-hieroglyph-black mb-6 shimmer-text italic" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {isRTL ? '🏺 قصة التراث والراحة' : '🏺 A Story of Heritage & Comfort'}
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="text-xl md:text-2xl text-hieroglyph-light max-w-3xl mx-auto leading-relaxed font-light">
                  {isRTL
                    ? 'نحن الوسائد الفرعونية، نجمع بين عراقة التراث المصري وحداثة التكنولوجيا لنقدم لك تجربة سفر لا تُنسى مليئة بالراحة والجمال الثقافي.'
                    : 'We are Pharaonic Pillows, combining the depth of Egyptian heritage with modern technology to offer you an unforgettable travel experience full of comfort and cultural beauty.'}
                </p>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Mission & Vision - Crystal Reveal Cards */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <CrystalReveal className="glass-panel p-12 rounded-[3rem] border border-pharaonic-gold/20 shadow-golden">
              <div className="w-20 h-20 bg-gradient-gold rounded-3xl flex items-center justify-center mb-8 shadow-large">
                <FaHeart className="text-white text-3xl" />
              </div>
              <h2 className="text-3xl font-bold text-hieroglyph-black mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                {isRTL ? 'رسالتنا' : 'Our Mission'}
              </h2>
              <p className="text-lg text-hieroglyph-light leading-relaxed">
                {isRTL
                  ? 'نسعى لنشر جمال التراث المصري العريق في جميع أنحاء العالم من خلال منتجات عالية الجودة تجمع بين الراحة الحديثة والتصميم الفرعوني الأصيل.'
                  : 'We strive to spread the beauty of ancient Egyptian heritage worldwide through high-quality products that combine modern comfort with authentic Pharaonic design.'}
              </p>
            </CrystalReveal>

            <CrystalReveal className="glass-panel-dark p-12 rounded-[3rem] border border-white/10 shadow-floating">
              <div className="w-20 h-20 bg-gradient-royal rounded-3xl flex items-center justify-center mb-8 shadow-large">
                <FaRocket className="text-white text-3xl" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                {isRTL ? 'رؤيتنا' : 'Our Vision'}
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                {isRTL
                  ? 'أن نصبح العلامة التجارية الرائدة عالمياً في وسائد السفر المستوحاة من التراث، ونكون السفراء الثقافيين للحضارة المصرية العريقة.'
                  : 'To become the leading global brand in heritage-inspired travel pillows, serving as cultural ambassadors for the ancient Egyptian civilization.'}
              </p>
            </CrystalReveal>
          </div>
        </section>

        {/* Stats Grid - Premium Glass Tiles */}
        <section className="py-20 px-4 bg-hieroglyph-black relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-8 glass-panel border-white/5 rounded-3xl group hover:border-pharaonic-gold/30 transition-all duration-500">
                  <div className="text-pharaonic-gold text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-black shimmer-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/40 text-xs uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values - Interactive Hover Cards */}
        <section className="py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black text-hieroglyph-black mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                {isRTL ? 'قيمنا الأساسية' : 'Our Core Values'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <FloatingCard key={index} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 hover:border-pharaonic-gold/40 transition-all duration-500">
                  <div className="mb-6">{value.icon}</div>
                  <h3 className="text-2xl font-bold text-hieroglyph-black mb-4">
                    {value.title}
                  </h3>
                  <p className="text-hieroglyph-light leading-relaxed text-sm">
                    {value.description}
                  </p>
                </FloatingCard>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action - Immersive Gradient */}
        <section className="py-32 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative glass-panel-dark rounded-[4rem] p-16 text-center overflow-hidden border border-white/10 bg-gradient-hero shadow-huge group">
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <Image src="/hero.png" alt="CTA BG" fill className="object-cover" />
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {isRTL ? 'انضم إلى رحلتنا العريقة' : 'Join Our Eternal Journey'}
                </h2>
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                  <Link href="/products" className="w-full sm:w-auto">
                    <motion.button className="shimmer-btn text-white px-10 py-5 rounded-full text-xl font-bold shadow-golden hover:shadow-golden-hover transition-all duration-300 w-full">
                      {isRTL ? 'تصفح منتجاتنا' : 'Browse Products'}
                    </motion.button>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <motion.button className="glass-panel text-white border-white/30 px-10 py-5 rounded-full text-xl font-semibold hover:bg-white hover:text-hieroglyph-black transition-all duration-300 w-full">
                      {isRTL ? 'كن شريكاً لنا' : 'Become a Partner'}
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return getStaticPropsWithTranslations(context);
};

export default AboutPage;
