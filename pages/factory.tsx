import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { FaIndustry, FaCheckCircle, FaMapMarkerAlt, FaUsers, FaShieldAlt, FaBoxes, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export default function FactoryTourPage() {
  const router = useRouter();
  const isRTL = router.locale === 'ar';
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  const facilityAreas = [
    {
      title: 'Polyurethane Molding & Foaming Bay',
      description: 'Precision temperature-stabilized mold tooling presses where high-density 50D viscoelastic polyurethane is cast into ergonomic cervical profiles with minimal surface bubbling and zero pungent odors.',
      image: '/images/factory/factory-line.jpg',
      specs: ['50D High Density Molding', 'Consistent Rebound Index', 'Zero Heavy Chemical Fillers']
    },
    {
      title: 'Quality Testing & Inspection Laboratory',
      description: 'Equipped with pneumatic compression testers, tensile measurement jigs, and seam fatigue instruments. Every production batch is certified before release.',
      image: '/images/factory/quality-lab.jpg',
      specs: ['Indentation Force Deflection (IFD)', 'Zipper Pull & Seam Load', 'Colorfastness to Perspiration']
    },
    {
      title: 'Precision Embroidery & Textile Sewing Atelier',
      description: 'Skilled Egyptian seamstresses work alongside computerized Tajima multi-head embroidery machines, producing authentic pharaonic motifs, custom brand logos, and reinforced French seams.',
      image: '/images/factory/factory-line.jpg',
      specs: ['Computerized Multi-Head Tajima', 'Reinforced Overlock Stitching', 'OEKO-TEX Certified Fabrics']
    },
    {
      title: 'Vacuum Packaging & Export Palletizing Bay',
      description: 'High-power compression machinery rolls or compresses pillows for maximum container volume efficiency. Strapped wooden pallets are staged for direct transit to Egyptian seaports.',
      image: '/images/factory/packaging-export.jpg',
      specs: ['Up to 60% Volume Reduction', 'FCL/LCL Container Load Planning', 'Full Export Customs Documentation']
    }
  ];

  return (
    <Layout
      pageTitle="Inside YKP Manufacturing | New Cairo Factory Tour | YKP Supplies"
      metaDescription="Take a virtual tour inside YKP Supplies travel pillow manufacturing facility in New Cairo, Egypt. Explore our molding lines, sewing atelier, quality testing lab, and packaging bays."
      canonicalUrl="https://www.ykp-eg.com/factory"
      ogImage="/images/factory/factory-line.jpg"
    >
      <div className="bg-[#070C18] border-b border-slate-800 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'جولة حقيقية داخل المصنع' : 'Transparent Manufacturing Facility'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Inside YKP Manufacturing
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Located in the industrial manufacturing zone of New Cairo, Egypt. We invite international buyers, brand directors, and procurement executives to explore our production floor, testing labs, and export staging facilities.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <FaMapMarkerAlt className="text-[#D4AF37]" />
                <span>New Cairo, Egypt</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <FaIndustry className="text-[#D4AF37]" />
                <span>Direct Manufacturer</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <FaUsers className="text-[#D4AF37]" />
                <span>Skilled Egyptian Workforce</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Facility Areas Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Production Departments & Quality Infrastructure
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Every square meter of our plant is dedicated to consistent quality, worker safety, and export excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {facilityAreas.map((area, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 sm:h-72 bg-slate-950 overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 rounded bg-slate-950/80 text-xs font-mono text-[#D4AF37] border border-[#D4AF37]/30">
                      Dept {idx + 1}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-3">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {area.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                  {area.specs.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      <FaCheckCircle className="text-emerald-400 text-[10px]" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Factory Visit Invitation & CTA */}
      <div className="bg-[#070C18] border-t border-slate-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
            {isRTL ? 'زيارات المصنع والتدقيق التجاري' : 'In-Person & Virtual Audits'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Plan a Visit to Our Cairo Production Facility
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Visiting Egypt for business or sourcing? Our commercial engineering team welcomes international partners to inspect our production lines, review fabric swatches, and finalize custom contracts.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
            >
              Schedule a Factory Visit
            </Link>
            <Link
              href="/request-a-quote"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700 transition-colors"
            >
              Request Sample Kit →
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
