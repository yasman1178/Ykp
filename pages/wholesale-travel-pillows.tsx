import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { FaBoxes, FaTruck, FaGlobeAmericas, FaShieldAlt, FaFileDownload, FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa';

export default function WholesaleTravelPillowsPage() {
  const router = useRouter();
  const isRTL = router.locale === 'ar';
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  const wholesaleTiers = [
    {
      name: 'Trial / Sample Order',
      volume: '50 – 100 units',
      discount: 'Standard Wholesale Base',
      leadTime: '7 – 10 Business Days',
      bestFor: 'New boutique retailers & sample market validation'
    },
    {
      name: 'Commercial Wholesale',
      volume: '100 – 500 units',
      discount: 'Volume Tier 1 (15-20% off base)',
      leadTime: '2 – 3 Weeks',
      bestFor: 'Airport shops, museum concessions & regional distributors'
    },
    {
      name: 'Container Volume (FCL)',
      volume: '1,000 – 5,000+ units',
      discount: 'Direct Factory Export Contract',
      leadTime: '3 – 4 Weeks',
      bestFor: 'Large international importers & retail chain supply contracts'
    }
  ];

  return (
    <Layout
      pageTitle="Wholesale Travel Pillows from Egypt | Factory B2B Prices | YKP Supplies"
      metaDescription="Source wholesale travel pillows directly from Egyptian manufacturer YKP Supplies in Cairo. Competitive container pricing, certified 50D memory foam, and international export shipping."
      canonicalUrl="https://www.ykp-eg.com/wholesale-travel-pillows"
      ogImage="/images/factory/custom_packaging_export_1794309475969.jpg"
    >
      <div className="bg-[#070C18] border-b border-slate-800 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'توريدات ومبيعات الجملة والتصدير' : 'Direct B2B Procurement'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Wholesale Travel Pillows from Egypt
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Direct factory procurement for international importers, distributors, retail chains, and e-commerce brands. High-density viscoelastic memory foam with authentic Egyptian craftsmanship.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/request-a-quote?type=wholesale"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-xl shadow-[#D4AF37]/20"
              >
                REQUEST WHOLESALE INFORMATION
              </Link>
              <Link
                href="/products"
                className="px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
              >
                Browse Full Catalog →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Target Customers Strip */}
      <div className="border-b border-slate-800 bg-slate-900/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-mono uppercase text-slate-400 block mb-3">Engineered for Wholesale Channels:</span>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-200">
            {['Importers & Freight Forwarders', 'Regional Distributors', 'Airport & Duty-Free Retailers', 'E-Commerce & Amazon FBA Brands', 'Museum & Cultural Gift Shops', 'Luxury Hotel Chains'].map((item, i) => (
              <span key={i} className="px-3.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Wholesale Specifications Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        
        {/* Why Buy from YKP */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-8">
            Why Source Travel Pillows from YKP Supplies?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-white">Direct Cairo Factory Pricing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                By producing directly in New Cairo, we eliminate distributor margins and trading house commissions, passing maximum profitability to your retail margin.
              </p>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-white">Vacuum Packing Volume Savings</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our high-compression packing reduces volumetric freight weight by up to 60%, allowing you to fit significantly more units inside 20ft and 40ft HQ ocean containers.
              </p>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-white">Egyptian Free-Trade Access</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Benefit from Egypt’s trade agreements (EUR.1 for European duty-free access, GAFTA for Arab nations, and COMESA for African distribution).
              </p>
            </div>
          </div>
        </div>

        {/* Wholesale Tiers & MOQs */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-8">
            Wholesale Order Tiers & Minimum Order Quantities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wholesaleTiers.map((tier, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 hover:border-[#D4AF37]/50 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase text-[#D4AF37] font-bold">Tier 0{idx + 1}</span>
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                    MOQ: <strong className="text-white">{tier.volume}</strong>
                  </div>
                  <p className="text-xs text-slate-400">{tier.bestFor}</p>
                </div>
                <div className="pt-4 border-t border-slate-800 text-xs text-slate-300 space-y-1">
                  <div>Lead Time: <strong className="text-white">{tier.leadTime}</strong></div>
                  <div>Pricing: <strong className="text-emerald-400">{tier.discount}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping & Freight Options */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                International Export Shipping & Container Planning
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We handle full container loads (20ft / 40ft HQ) and palletized LCL shipments under standard Incoterms (FOB Alexandria / Port Said, CIF destination port, or EXW Cairo factory). All shipments include verified Certificate of Origin, packing lists, and fumigation certificates where mandated.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-[#D4AF37]">
                <span>• Ocean Freight: 14–22 Days to Europe</span>
                <span>• Air Cargo: 2–4 Days Worldwide</span>
              </div>
            </div>

            <div className="lg:col-span-4 text-center">
              <Link
                href="/request-a-quote?type=wholesale"
                className="inline-block w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
              >
                REQUEST WHOLESALE INFORMATION
              </Link>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
