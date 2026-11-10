import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { FaShieldAlt, FaFlask, FaCheckCircle, FaBoxes, FaSyncAlt, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export default function QualityCommitmentPage() {
  const router = useRouter();
  const isRTL = router.locale === 'ar';
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  const qualityPillars = [
    {
      title: '1. Material Selection & Verification',
      desc: 'We use high-purity viscoelastic polyurethane formulated for steady rebound resilience across varying cockpit and cabin temperatures. Fabrics are selected for high Martindale rub counts, breathability, and gentle skin contact.',
      icon: FaFlask
    },
    {
      title: '2. Precision Production Standards',
      desc: 'Molds are calibrated for uniform density distribution with zero internal voiding or hardening. Automated Tajima embroidery ensures logo stitch density is crisp and durable.',
      icon: FaShieldAlt
    },
    {
      title: '3. Multi-Stage In-House Inspection',
      desc: '100% of finished foam cores undergo manual and mechanical load testing. Every zipper closure is cycled 5 times before packaging to ensure effortless passenger use.',
      icon: FaCheckCircle
    },
    {
      title: '4. Packaging Integrity Inspection',
      desc: 'Cartons are inspected for drop endurance and humidity resistance. Barcodes, master carton shipping marks, and pallet wrapping tension are verified prior to container loading.',
      icon: FaBoxes
    },
    {
      title: '5. Continuous Feedback & Iteration',
      desc: 'We track return rates and buyer feedback across every shipment batch, refining foam chemistry and stitch patterns for ongoing product excellence.',
      icon: FaSyncAlt
    }
  ];

  return (
    <Layout
      pageTitle="Our Commitment to Quality | Travel Pillow Quality Standards | YKP Supplies"
      metaDescription="Learn about YKP Supplies quality standards, material selection, testing protocols, and packaging inspection for wholesale and OEM travel pillows."
      canonicalUrl="https://www.ykp-eg.com/quality"
      ogImage="/images/factory/quality-lab.jpg"
    >
      <div className="bg-[#070C18] border-b border-slate-800 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'معايير واختبارات الجودة' : 'Testing Standards & Integrity'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Our Commitment to Quality
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              At YKP Supplies, product quality is our primary brand currency. We enforce stringent, multi-stage inspection procedures across raw chemicals, molded foam cores, textile stitching, and international export packing.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {qualityPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 hover:border-[#D4AF37]/50 transition-colors shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-xl">
                  <Icon />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Real Lab Visual */}
        <div className="bg-[#0A1020] border border-slate-800 rounded-2xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase font-mono tracking-wider text-[#D4AF37] font-bold">
                In-House Testing Facility
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Mechanical Rebound & Tensile Verification
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Before any batch is palletized, random samples from the molding bay are compressed in pneumatic jigs to guarantee that the pillow retains its original shape, cervical curve, and orthopedic height after thousands of compression cycles.
              </p>
              <div className="pt-2">
                <Link
                  href="/request-a-quote?type=spec-sheet"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:underline"
                >
                  <span>Request Full Technical Specification Sheets</span>
                  <Arrow />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-slate-700 shadow-xl">
                <img
                  src="/images/factory/quality-lab.jpg"
                  alt="Quality Laboratory at YKP Supplies"
                  className="w-full h-72 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/request-a-quote"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-xl shadow-[#D4AF37]/20"
          >
            <span>REQUEST A SAMPLE FOR QUALITY INSPECTION</span>
            <Arrow />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
