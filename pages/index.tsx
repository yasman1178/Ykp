import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { getStaticPropsWithTranslations } from '@/lib/translations';
import ServiceSlider from '@/components/ServiceSlider'; // Assuming this is for features/value propositions
import WorkSlider from '@/components/WorkSlider'; // Assuming this is for collections/products
import Bulb from '@/components/Bulb';
import Circles from '@/components/Circles';
import EgyptianCTA from '@/components/EgyptianCTA';
import SEO from '@/components/SEO';
import ParticlesContainer from '@/components/ParticlesContainer';
import {
  StaggerContainer,
  StaggerItem,
  FloatingHieroglyphs,
  CrystalReveal,
  EgyptianPulse
} from '@/components/animations/EgyptianAnimations';

interface HomePageProps {
  translations: any;
  locale: string;
}

const HomePage: React.FC<HomePageProps> = ({ translations: t, locale }) => {
  const router = useRouter();
  const isRTL = locale === 'ar';
  const baseUrl = 'https://ykp-eg.com';
  const currentUrl = `${baseUrl}${router.asPath}`;

  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <SEO
        translations={t}
        locale={locale}
        keywords={t.keywords}
      />

      {/* Hero Section with Immersive Atmosphere */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-site-dark">
        {/* Background Image with Parallax-like Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Egyptian Pharaonic Background"
            fill
            className="object-cover object-center opacity-40 scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-hieroglyph-black via-deep-blue/40 to-amber-900/40"></div>
          <div className="absolute inset-0 glass-panel opacity-20"></div>
        </div>

        {/* Immersive Particles */}
        <div className="absolute inset-0 z-10">
          <ParticlesContainer />
        </div>

        {/* Floating Atmospheric Hieroglyphs */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {isMounted && ['𓂀', '𓁹', '𓋹', '𓊪', '𓈖', '𓊽', '𓇳', '𓊨'].map((h, i) => (
            <FloatingHieroglyphs
              key={i}
              className="absolute text-white/5 text-6xl"
              style={{
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 90}%`,
                animationDelay: `${i * 0.7}s`
              }}
            >
              {h}
            </FloatingHieroglyphs>
          ))}
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <StaggerContainer className="flex flex-col items-center">
            <StaggerItem>
              <motion.div
                className="inline-block px-6 py-2 rounded-full border border-pharaonic-gold/30 gold-panel mb-6 backdrop-blur-md"
              >
                <span className="shimmer-text font-semibold tracking-widest uppercase text-sm">
                  {t.nav.wholesale} Available Worldwide
                </span>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <h1
                className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {t.hero.title1}
                <br />
                <span className="shimmer-text">
                  {t.hero.title2}
                </span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p
                className="text-lg md:text-2xl text-white/80 mb-10 max-w-4xl mx-auto leading-relaxed font-light"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {t.hero.subtitle}
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
                <Link href="/products/" className="relative group">
                  <motion.button
                    className="shimmer-btn text-white px-12 py-5 rounded-full text-xl font-bold shadow-golden hover:shadow-golden-hover transition-all duration-500 min-w-[240px]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t.hero.exploreBtn}
                  </motion.button>
                  <div className="absolute -inset-1 bg-pharaonic-gold blur-lg opacity-20 group-hover:opacity-40 transition duration-500 rounded-full"></div>
                </Link>

                <Link href="/contact">
                  <motion.button
                    className="glass-panel text-white border border-white/20 px-12 py-5 rounded-full text-xl font-semibold hover:bg-white hover:text-hieroglyph-black transition-all duration-500 min-w-[240px]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t.hero.wholesaleBtn}
                  </motion.button>
                </Link>
              </div>
            </StaggerItem>

            <StaggerItem>
              {/* Hero Stats with Premium Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                {[
                  { number: '50+', label: t.hero.stats.countries, icon: '🌍' },
                  { number: '10K+', label: t.hero.stats.travelers, icon: '✈️' },
                  { number: '100%', label: t.hero.stats.heritage, icon: '🏺' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="glass-panel-dark rounded-3xl p-8 border border-white/10 relative overflow-hidden group"
                    whileHover={{ y: -10 }}
                  >
                    <div className="absolute top-0 right-0 p-4 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">
                      {stat.icon}
                    </div>
                    <div className="text-4xl md:text-5xl font-black shimmer-text mb-3">
                      {stat.number}
                    </div>
                    <div className="text-white/60 font-medium tracking-wide uppercase text-xs">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Elegant Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-white/30 uppercase tracking-[0.3em] text-[10px]">Discover</span>
          <EgyptianPulse>
            <div className="w-[1px] h-20 bg-gradient-to-b from-pharaonic-gold to-transparent"></div>
          </EgyptianPulse>
        </motion.div>
      </section>

      {/* Collections Cards Section with Stagger Reveal */}
      <section className="py-32 bg-gradient-to-b from-papyrus-light to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-t from-transparent to-black/5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer>
            <StaggerItem>
              <div className="text-center mb-24">
                <h2
                  className="text-5xl md:text-7xl font-black text-hieroglyph-black mb-8 shimmer-text"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {t.collections.title}
                </h2>
                <div className="w-24 h-1 bg-pharaonic-gold mx-auto mb-8"></div>
                <p
                  className="text-xl md:text-2xl text-hieroglyph-light max-w-4xl mx-auto font-light leading-relaxed px-4"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {t.collections.subtitle}
                </p>
              </div>
            </StaggerItem>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                {
                  id: 'print',
                  title: t.collections.print.title,
                  desc: t.collections.print.description,
                  img: '/prodect/Print/master.jpg',
                  features: t.collections.print.features,
                  badge: 'Custom',
                  color: 'from-red-600 to-pink-600'
                },
                {
                  id: 'premium',
                  title: t.collections.premium.title,
                  desc: t.collections.premium.description,
                  img: '/prodect/b123/1.webp',
                  features: t.collections.premium.features,
                  badge: 'Royal',
                  color: 'from-purple-600 to-blue-600'
                },
                {
                  id: 'classic',
                  title: t.collections.classic.title,
                  desc: t.collections.classic.description,
                  img: '/prodect/t/1.webp',
                  features: t.collections.classic.features,
                  badge: 'Timeless',
                  color: 'from-amber-600 to-orange-600'
                },
                {
                  id: 'heritage',
                  title: t.collections.heritage.title,
                  desc: t.collections.heritage.description,
                  img: '/prodect/tb/2.webp',
                  features: t.collections.heritage.features,
                  badge: 'Sacred',
                  color: 'from-green-600 to-teal-600'
                },
              ].map((col, idx) => (
                <StaggerItem key={idx}>
                  <Link href={`/products?collection=${col.id}`} className="group block h-full">
                    <div className="egyptian-card bg-white rounded-[2rem] shadow-2xl overflow-hidden h-full flex flex-col border border-gray-100 hover:border-pharaonic-gold/50 transition-all duration-500">
                      <div className="relative h-72 overflow-hidden">
                        <Image
                          src={col.img}
                          alt={col.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-egyptian"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${col.color} opacity-40 group-hover:opacity-60 transition-opacity`}></div>
                        <div className="absolute top-6 right-6">
                          <span className={`${idx % 2 === 0 ? 'bg-pharaonic-gold' : 'bg-deep-blue'} text-white px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-xl`}>
                            {col.badge}
                          </span>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="text-3xl font-bold text-white mb-2 text-shadow-premium" style={{ fontFamily: 'Playfair Display, serif' }}>
                            {col.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow italic">
                          &quot;{col.desc}&quot;
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {col.features.map((feature: string, fIdx: number) => (
                            <span key={fIdx} className="bg-papyrus-light text-hieroglyph-black px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter border border-desert-sand-dark/20">
                              {feature}
                            </span>
                          ))}
                        </div>
                        <motion.button
                          className={`w-full py-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 border-2 border-hieroglyph-black hover:bg-hieroglyph-black hover:text-white flex items-center justify-center gap-3`}
                          whileHover={{ gap: '1rem' }}
                        >
                          {t.collections.exploreBtn} <span>→</span>
                        </motion.button>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Features Section with Luxury Feel */}
      <section className="py-32 bg-hieroglyph-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Circles />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <StaggerContainer>
            <StaggerItem>
              <div className="text-center mb-20">
                <h2
                  className="text-4xl md:text-6xl font-black text-white mb-6 shimmer-text italic"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {t.features.title}
                </h2>
                <p
                  className="text-xl text-white/60 max-w-2xl mx-auto font-light"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {t.features.subtitle}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="glass-panel p-1 rounded-[3rem] overflow-hidden shadow-floating">
                <ServiceSlider features={t.features} />
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
        <Bulb />
      </section>

      {/* Trust Badges / Certifications Section (Placeholder) */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-8"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {t.trust.title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
          >
            {/* Replace with actual trust badges/certification logos */}
            <Image src="/logo.png" alt="Certified Quality" width={120} height={120} className="grayscale hover:grayscale-0 transition-all duration-300" />
            <Image src="/logo.png" alt="Egyptian Made" width={120} height={120} className="grayscale hover:grayscale-0 transition-all duration-300" />
            <Image src="/logo.png" alt="Memory Foam Certified" width={120} height={120} className="grayscale hover:grayscale-0 transition-all duration-300" />
            {/* Add more as needed */}
          </motion.div>
        </div>
      </section>

      {/* Wholesale CTA Section */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <EgyptianCTA
            arabicTitle={t.cta.title}
            title={t.cta.title}
            arabicDescription={t.cta.subtitle}
            description={t.cta.subtitle}
            primaryButton={{
              arabicText: t.cta.quoteBtn,
              text: t.cta.quoteBtn,
              href: "/wholesale",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )
            }}
            secondaryButton={{
              arabicText: t.cta.partnerBtn,
              text: t.cta.partnerBtn,
              href: "/partnership",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )
            }}
            variant="gradient"
            symbolIcon="𓋹" // Ankh symbol for partnership
          />
        </div>
      </section>
    </div >
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return getStaticPropsWithTranslations(context);
};

export default HomePage;
