import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { FaLandmark, FaPlane, FaHotel, FaStore, FaShieldAlt, FaAward, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export default function MuseumTouristGiftsPage() {
  const router = useRouter();
  const isRTL = router.locale === 'ar';
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  const targetSectors = [
    {
      title: 'Museum Gift Stores',
      desc: 'Exclusive pharaonic hieroglyphic collections with documented historical provenance from Karnak, Luxor, and the Egyptian Museum in Cairo.',
      icon: FaLandmark
    },
    {
      title: 'Airport & Duty-Free Retailers',
      desc: 'High-turnover impulse souvenir items with premium packaging, barcode tags, and proven international tourist appeal.',
      icon: FaPlane
    },
    {
      title: 'Cultural Heritage Centers',
      desc: 'Educational and artistic keepsakes celebrating authentic Egyptian mythology (Ankh of Life, Eye of Horus, Sacred Scarab).',
      icon: FaStore
    },
    {
      title: 'Luxury Hotels & Nile Cruises',
      desc: 'Turnkey VIP guest arrival gifts and plush mascots that create an indelible memory of Egypt for international travelers.',
      icon: FaHotel
    }
  ];

  const featuredCollections = [
    {
      title: 'Hieroglyphic Temple & Papyrus Travel Pillows',
      image: '/prodect/tb/1.webp',
      desc: 'Orthopedic memory foam covered in rich jacquard fabric woven with authentic ancient Egyptian temple reliefs.'
    },
    {
      title: 'The Beloved Camel — Pharaonic Plush Keepsake',
      image: '/assets/aistudio/1794114379573_df8dd34d.jpg',
      desc: 'Handcrafted Egyptian plush toy with ceremonial embroidered saddle ("I ❤ EGYPT"). Tested child-safe (EN-71).'
    },
    {
      title: 'Royal Pharaoh Gold & Blue Collection',
      image: '/prodect/b123/1.webp',
      desc: 'Regal velvet travel pillows featuring Tutankhamun and Nefertiti royal emblems for premium gift shops.'
    }
  ];

  return (
    <Layout
      pageTitle="Egyptian Travel Gifts for Museums & Tourist Retailers | YKP Supplies"
      metaDescription="Authentic Egyptian-inspired travel pillows, cultural keepsakes, and plush souvenirs manufactured in Cairo for museum gift shops, airport concessions, and tourist retailers."
      canonicalUrl="https://www.ykp-eg.com/museum-tourist-gifts"
      ogImage="/prodect/tb/1.webp"
    >
      <div className="bg-[#070C18] border-b border-slate-800 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'منتجات المتاحف والمتاجر السياحية' : 'Cultural Tourism & Museum Retail'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Egyptian Travel Gifts for Museums & Tourist Retailers
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Elevate your retail gift collection with authentic Egyptian craftsmanship. We manufacture high-margin, culturally documented travel pillows and souvenir keepsakes that travelers cherish.
            </p>
            <div className="pt-2">
              <Link
                href="/request-a-quote?category=museum-tourist-gifts"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-xl shadow-[#D4AF37]/20"
              >
                <span>DISCUSS A CUSTOM COLLECTION</span>
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Target Sectors */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Designed for Proven High-Turnover Retail
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetSectors.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3 hover:border-[#D4AF37]/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-lg">
                  <Icon />
                </div>
                <h3 className="text-base font-bold text-white">{sec.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{sec.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Lines Showcase */}
      <div className="bg-[#0A1020] border-t border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-center mb-12">
            Signature Egyptian Retail Collections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCollections.map((col, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-all shadow-xl">
                <div className="relative h-64 bg-slate-950">
                  <img src={col.image} alt={col.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-base font-bold text-white">{col.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{col.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/request-a-quote?category=museum-tourist-gifts"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
            >
              <span>REQUEST WHOLESALE CATALOG FOR TOURIST RETAIL</span>
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
