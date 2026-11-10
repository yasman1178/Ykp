import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { FaGift, FaBriefcase, FaUsers, FaAward, FaBoxes, FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa';

export default function CorporateTravelGiftsPage() {
  const router = useRouter();
  const isRTL = router.locale === 'ar';
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  const useCases = [
    {
      title: 'Executive & VIP Client Gifts',
      desc: 'Leave an unforgettable impression on high-value clients and corporate partners with bespoke memory foam pillows in luxury magnetic rigid boxes.',
      icon: FaBriefcase
    },
    {
      title: 'International Conferences & Summits',
      desc: 'Equip international delegates and keynote speakers with ergonomic travel accessories customized with event dates and insignia.',
      icon: FaUsers
    },
    {
      title: 'Employee Recognition & Wellness',
      desc: 'Support hybrid and traveling team members with orthopedic neck support for long flights, train commutes, and home workstations.',
      icon: FaAward
    },
    {
      title: 'Brand Activation & Promotional Campaigns',
      desc: 'High-perceived-value promotional travel merchandise that stays with customers across millions of airline flight miles.',
      icon: FaGift
    }
  ];

  const customizationPillars = [
    {
      title: 'Subtle Corporate Logo Embroidery',
      desc: 'High-definition computerized embroidery matched to your corporate Pantone guidelines on velvet or athletic mesh covers.'
    },
    {
      title: 'Bespoke Brand Colorways',
      desc: 'Custom-dyed textiles, contrast piping, and colored zipper teeth aligned with your organization’s design standards.'
    },
    {
      title: 'Executive Presentation Packaging',
      desc: 'Custom rigid magnetic gift boxes, branded ribbon pullers, and personalized greeting cards inserted at our factory.'
    }
  ];

  return (
    <Layout
      pageTitle="Custom Travel Gifts for Companies | Corporate Merchandise | YKP Supplies"
      metaDescription="Manufacture premium corporate travel gifts with your company logo and custom luxury packaging. Direct factory pricing in Cairo, Egypt for conferences and employee gifting."
      canonicalUrl="https://www.ykp-eg.com/corporate-travel-gifts"
      ogImage="/images/factory/packaging-export.jpg"
    >
      <div className="bg-[#070C18] border-b border-slate-800 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'هدايا الشركات والفعاليات العالمية' : 'B2B Corporate Gifting & Executive Merchandise'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Custom Travel Gifts for Companies
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Empower your corporate gifting strategy with practical, high-status ergonomic travel products. We manufacture custom-embroidered memory foam travel pillows and branded gift sets directly in Cairo.
            </p>
            <div className="pt-2">
              <Link
                href="/request-a-quote?category=corporate"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-xl shadow-[#D4AF37]/20"
              >
                <span>REQUEST A CUSTOM QUOTE</span>
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Use Cases */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ideal Corporate Applications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3 hover:border-[#D4AF37]/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-lg">
                  <Icon />
                </div>
                <h3 className="text-base font-bold text-white">{uc.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{uc.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customization Options */}
      <div className="bg-[#0A1020] border-t border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Branding & Packaging Customization
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                We handle every detail to ensure your corporate gift represents your organization’s prestige. Minimum orders starting at just 50 units for corporate runs.
              </p>
              <div className="space-y-4">
                {customizationPillars.map((p, idx) => (
                  <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <FaCheck className="text-emerald-400 text-xs" />
                      <span>{p.title}</span>
                    </h4>
                    <p className="text-xs text-slate-400 pl-5">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <img
                  src="/images/factory/packaging-export.jpg"
                  alt="Custom Branded Corporate Packaging at YKP Supplies"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/request-a-quote?category=corporate"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
            >
              <span>REQUEST A CUSTOM CORPORATE QUOTE</span>
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
