import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { getStaticPropsWithTranslations } from '@/lib/translations';
import TestimonialSlider from '@/components/TestimonialSlider';
import ServiceSlider from '@/components/ServiceSlider'; // Assuming this is for features/value propositions
import WorkSlider from '@/components/WorkSlider'; // Assuming this is for collections/products
import Bulb from '@/components/Bulb';
import Circles from '@/components/Circles';
import EgyptianCTA from '@/components/EgyptianCTA';

interface HomePageProps {
  translations: any;
  locale: string;
}

const HomePage: React.FC<HomePageProps> = ({ translations: t, locale }) => {
  const router = useRouter();
  const isRTL = locale === 'ar';
  const baseUrl = 'https://ykp-eg.com';
  const currentUrl = `${baseUrl}${router.asPath}`;

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <Head>
        <title>{t.site.title}</title>
        <meta name="description" content={t.site.description} />
        <meta name="keywords" content={t.keywords} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={t.site.title} />
        <meta property="og:description" content={t.site.description} />
        <meta property="og:image" content={`${baseUrl}/hero.png`} />
        <meta property="og:locale" content={locale === 'ar' ? 'ar_EG' : 'en_US'} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={currentUrl} />
        <meta property="twitter:title" content={t.site.title} />
        <meta property="twitter:description" content={t.site.description} />
        <meta property="twitter:image" content={`${baseUrl}/hero.png`} />

        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />

        {/* Alternate Languages */}
        <link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
        <link rel="alternate" hrefLang="ar" href={`${baseUrl}/ar`} />
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en`} />
      </Head>

      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Egyptian Pharaonic Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-amber-600/60"></div>
          {/* Pattern Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent"></div>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 z-5">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {t.hero.title1}
              <br />
              <motion.span
                className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                {t.hero.title2}
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-base md:text-lg lg:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {t.hero.subtitle}
              <br />
              {t.hero.subtitle2}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Link href="/products/">
              <motion.button
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-amber-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(245, 158, 11, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {t.hero.exploreBtn}
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {t.hero.wholesaleBtn}
              </motion.button>
            </Link>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: '50+', label: t.hero.stats.countries },
              { number: '10K+', label: t.hero.stats.travelers },
              { number: '100%', label: t.hero.stats.heritage },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-white/90 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Collections Cards Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Explore Our Collections
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Discover authentic Egyptian travel pillows across four unique collections
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Print Collection Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Link href="/products?collection=print">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src="/prodect/Print/master.jpg"
                      alt="Print Collection"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-pink-900/40 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        Custom
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Print Collection
                      </h3>
                      <p className="text-white/90 text-sm">Custom Pharaonic Prints</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600 font-medium">5 Products</span>
                      <span className="text-red-600 font-bold text-lg">$28 - $35</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-medium">Custom Prints</span>
                      <span className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">Handmade</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-full font-semibold hover:from-red-700 hover:to-pink-700 transition-all">
                      Explore Collection →
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Premium Collection Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Link href="/products?collection=premium">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src="/prodect/b123/1.webp"
                      alt="Premium Collection"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-blue-900/40 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        Premium
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Premium Collection
                      </h3>
                      <p className="text-white/90 text-sm">Royal Egyptian Heritage</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600 font-medium">23 Products</span>
                      <span className="text-purple-600 font-bold text-lg">$14 - $26</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">Memory Foam</span>
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">Gold Accents</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all">
                      Explore Collection →
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Classic Collection Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Link href="/products?collection=classic">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src="/prodect/t/1.webp"
                      alt="Classic Collection"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-orange-900/40 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        Popular
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Classic Collection
                      </h3>
                      <p className="text-white/90 text-sm">Timeless Egyptian Motifs</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600 font-medium">21 Products</span>
                      <span className="text-amber-600 font-bold text-lg">$35 - $45</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">Traditional</span>
                      <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">Durable</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-full font-semibold hover:from-amber-700 hover:to-orange-700 transition-all">
                      Explore Collection →
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Heritage Collection Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Link href="/products?collection=heritage">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src="/prodect/tb/2.webp"
                      alt="Heritage Collection"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-teal-900/40 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        Heritage
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Heritage Collection
                      </h3>
                      <p className="text-white/90 text-sm">Ancient Symbols Reimagined</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600 font-medium">36 Products</span>
                      <span className="text-green-600 font-bold text-lg">$50 - $65</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Hieroglyphs</span>
                      <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">Authentic</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-full font-semibold hover:from-green-700 hover:to-teal-700 transition-all">
                      Explore Collection →
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100 relative overflow-hidden">
        <Circles />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {t.features.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t.features.subtitle}
          </motion.p>
          <ServiceSlider features={t.features} />
        </div>
        <Bulb />
      </section>

      {/* Collections Section */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <Circles />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {t.collections.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t.collections.subtitle}
          </motion.p>
          <WorkSlider />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {t.testimonials.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t.testimonials.subtitle}
          </motion.p>
          <TestimonialSlider />
        </div>
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
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return getStaticPropsWithTranslations(context);
};

export default HomePage;
