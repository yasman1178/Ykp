import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import { FaIndustry, FaGlobeAmericas, FaAward, FaUsers, FaHeart, FaShieldAlt, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export default function AboutPage() {
  const router = useRouter();
  const isRTL = router.locale === 'ar';
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  return (
    <Layout
      pageTitle="About YKP Supplies | Egyptian Travel Pillow Manufacturer in Cairo"
      metaDescription="Learn the story of YKP Supplies: Egyptian manufacturer of high-density memory foam travel pillows and pharaonic heritage keepsakes in New Cairo for global B2B buyers."
      canonicalUrl="https://www.ykp-eg.com/about"
      ogImage="/images/factory/factory-line.jpg"
    >
      {/* Hero */}
      <div className="bg-[#070C18] border-b border-slate-800 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'عن المصنع ورؤيتنا' : 'Our Heritage & Manufacturing Philosophy'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              About YKP Supplies
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              We are an Egyptian manufacturer of ergonomic travel pillows, custom OEM private label travel gear, and authentic pharaonic heritage keepsakes, based in New Cairo.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story & Heritage Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-mono uppercase text-[#D4AF37] font-bold">Our Story</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Egyptian Heritage Meets Modern Travel Comfort
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              YKP Supplies was founded in Cairo with a clear purpose: to bridge 5,000 years of Egyptian textile mastery with modern orthopedic foam engineering. Ancient Egyptians were the world’s earliest pioneers in ergonomics and headrest design, carving ceremonial stone and wooden supports for peaceful alignment.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Today, our New Cairo atelier translates that sacred heritage into modern 50D viscoelastic polyurethane memory foam and velvety Egyptian cotton covers. We serve two distinct strengths: precision commercial travel pillows for global brands and airlines, and authentic museum-grade cultural collections for tourist retail.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl">
              <img
                src="/images/factory/factory-line.jpg"
                alt="Inside YKP Supplies Factory in New Cairo"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Strip */}
      <div className="bg-[#0A1020] border-t border-b border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-lg">
                <FaAward />
              </div>
              <h3 className="text-xl font-bold text-white">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                To engineer and supply the world’s most comfortable, durable, and culturally rich travel products directly from Egypt, empowering global distributors, retailers, and brand owners with direct factory economics and dependable quality.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-lg">
                <FaGlobeAmericas />
              </div>
              <h3 className="text-xl font-bold text-white">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                To establish Egypt as a premier international manufacturing hub for ergonomic travel goods, proving that ancient heritage and modern high-tech foam engineering create unmatched global value.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Manufacturing Approach & Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl">
              <img
                src="/images/factory/quality-lab.jpg"
                alt="YKP Quality Control Testing Laboratory"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
            <span className="text-xs font-mono uppercase text-[#D4AF37] font-bold">Our Engineering Standards</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Rigorous, Ethical, and Direct
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              We operate an ethical, modern manufacturing environment in New Cairo. Our skilled pattern makers, mold operators, and sewing technicians are treated with dignity, receiving fair wages and safe working conditions.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Zero subcontracting to unknown shadow workshops — 100% in-house oversight</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>100% hypoallergenic, non-toxic materials compliant with European safety standards</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Container-optimized vacuum compression to reduce the global carbon footprint of freight</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-8 border-t border-slate-800">
          <Link
            href="/request-a-quote"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-xl shadow-[#D4AF37]/20"
          >
            <span>WORK WITH YKP SUPPLIES</span>
            <Arrow />
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      locale,
    },
  };
};
