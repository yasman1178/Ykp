import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { FaCogs, FaPalette, FaTag, FaBoxes, FaCheck, FaArrowRight, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';

export default function CustomPrivateLabelPage() {
  const router = useRouter();
  const isRTL = router.locale === 'ar';
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  const processSteps = [
    {
      step: 'STEP 1',
      title: 'Send Your Idea',
      description: 'Share your design brief, target retail price, preferred materials, dimensions, or 3D CAD files. If you only have a rough sketch or competitor reference, our design team will refine it into a technical manufacturing spec.'
    },
    {
      step: 'STEP 2',
      title: 'Product Development & Prototyping',
      description: 'We develop precision tooling molds, mix custom foam firmness densities (45D to 60D), and prepare computer embroidery files for your logo.'
    },
    {
      step: 'STEP 3',
      title: 'Sample Approval (Golden Sample)',
      description: 'A complete physical pre-production sample is dispatched directly to your headquarters via DHL/FedEx express for testing, ergonomic evaluation, and sign-off.'
    },
    {
      step: 'STEP 4',
      title: 'Bulk Production Run',
      description: 'Upon your written sample approval and deposit, we schedule batch production in our New Cairo plant with strict continuous QC at every step.'
    },
    {
      step: 'STEP 5',
      title: 'Packaging & International Shipping',
      description: 'Products are vacuum-sealed or boxed with your custom UPC barcodes, palletized, and shipped to your designated seaport or airport under FOB, CIF, or EXW terms.'
    }
  ];

  const services = [
    {
      title: 'Custom Silhouette & Ergonomic Design',
      desc: 'Create signature contour pillows: back-flat profiles, high lateral support, chin cradles, or foldable roll designs.',
      icon: FaCogs
    },
    {
      title: 'Custom Brand Colors & Dyes',
      desc: 'Pantone-matched fabric dyeing for velvets, athletic cooling mesh, silky modal, or authentic Egyptian cotton.',
      icon: FaPalette
    },
    {
      title: 'Precision Embroidery & Logo Placement',
      desc: 'Tajima multi-head computerized embroidery, silicone injected micro-badges, or subtle woven side labels.',
      icon: FaTag
    },
    {
      title: 'Private Label & Retail Packaging',
      desc: 'Custom vacuum compression sleeves, branded waterproof carry pouches with carabiners, or luxury magnetic gift boxes.',
      icon: FaBoxes
    }
  ];

  return (
    <Layout
      pageTitle="Create Your Own Travel Pillow Collection | Private Label & OEM | YKP Supplies"
      metaDescription="Custom travel pillow manufacturing and private label solutions made in Cairo, Egypt. From concept design and golden sample approval to container bulk export."
      canonicalUrl="https://www.ykp-eg.com/custom-travel-pillows"
      ogImage="/images/factory/packaging-export.jpg"
    >
      {/* Hero */}
      <div className="bg-[#070C18] border-b border-slate-800 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'حلول العلامات الخاصة وتصنيع المعدات الأصلية' : 'Private Label & OEM Manufacturing'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Create Your Own Travel Pillow Collection
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Launch or expand your brand with direct Egyptian manufacturing. We turn your sketches, logos, and packaging requirements into certified retail-ready products with low MOQs and rapid prototype turnaround.
            </p>
            <div className="pt-2">
              <Link
                href="/request-a-quote?custom=true"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-xl shadow-[#D4AF37]/20"
              >
                <span>START YOUR CUSTOM PROJECT</span>
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Step Process */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
            {isRTL ? 'مراحل العمل من الفكرة إلى الحاوية' : 'Execution Blueprint'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2 text-balance">
            5 Simple Steps to Your Custom Travel Pillow Brand
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {processSteps.map((p, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3 relative flex flex-col justify-between hover:border-[#D4AF37]/40 transition-colors"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-[#D4AF37]/10 text-[#D4AF37] font-mono text-xs font-bold mb-3 border border-[#D4AF37]/20">
                  {p.step}
                </span>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {p.description}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
                Milestone 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customization Services Matrix */}
      <div className="bg-[#0A1020] border-t border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Comprehensive Customization Capabilities
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Every component of your travel pillow can be configured to reflect your brand identity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3 hover:border-[#D4AF37]/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-lg">
                    <Icon />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Golden Sample Guarantee Strip */}
          <div className="mt-14 p-8 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center text-2xl border border-emerald-800/60 shrink-0">
                <FaShieldAlt />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Golden Sample Quality Guarantee</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Mass production only commences after you touch, inspect, and approve the golden production sample.
                </p>
              </div>
            </div>

            <Link
              href="/request-a-quote?type=sample"
              className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c49f30] text-slate-950 font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-colors"
            >
              Order Sample Kit
            </Link>
          </div>

        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-slate-950 border-t border-slate-800 py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Have a Specific Project or Target Launch Date?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Send us your tech pack or ideas. Our Cairo engineering desk will reply with unit economics and tooling costs within 24 hours.
          </p>
          <div className="pt-2">
            <Link
              href="/request-a-quote"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-xl shadow-[#D4AF37]/20"
            >
              <span>START YOUR CUSTOM PROJECT</span>
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
