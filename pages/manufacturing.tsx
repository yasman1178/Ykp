import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { FaCogs, FaFlask, FaIndustry, FaCheckCircle, FaBoxes, FaShip, FaArrowRight, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';

export default function ManufacturingPage() {
  const router = useRouter();
  const isRTL = router.locale === 'ar';
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  const manufacturingStages = [
    {
      title: '1. Product Development & Ergonomic Prototyping',
      subtitle: 'From Concept Silhouette to Production CAD',
      description: 'Our engineering process begins with anatomical neck support analysis. We sculpt 3D digital prototypes and CNC mold masters tailored to specific flight passenger postures, testing cervical alignment, lateral head stabilization, and pressure distribution.',
      details: [
        'CAD 3D mold prototyping and physical sampling within 7 business days',
        'Dual-density zoning options (firmer base with plush outer layer)',
        'Custom chin-support contours and back-flat profiles for airline seats'
      ],
      icon: FaCogs
    },
    {
      title: '2. Raw Material Selection & Formulation',
      subtitle: 'High-Density Viscoelastic Foam & Certified Textiles',
      description: 'We formulate high-grade viscoelastic polyurethane foam with tailored 45D to 60D densities. Foam cores are paired with breathable Egyptian cotton velvets, silky modal blends, and thermal-regulating phase-change cooling fabrics.',
      details: [
        'Pure viscoelastic polyurethane without heavy filler powders or chemical odors',
        'Hypoallergenic, dust-mite resistant, and certified non-toxic cores',
        'OEKO-TEX standard compliant outer textiles with anti-pilling finishes'
      ],
      icon: FaFlask
    },
    {
      title: '3. Precision Production & Automated Embroidery',
      subtitle: 'Modern Cleanroom Molding & Skilled Sewing Lines',
      description: 'Our New Cairo facility combines automated precision metering injection machines with skilled Egyptian textile seamstresses. Automated multi-head Tajima embroidery stations stitch intricate logos and pharaonic patterns with surgical precision.',
      details: [
        'Precision temperature-controlled aluminum mold presses',
        'High-speed computerized multi-needle embroidery lines',
        'Reinforced double-stitch French seams for lifetime structural durability'
      ],
      icon: FaIndustry
    },
    {
      title: '4. Rigorous Quality Control Protocols',
      subtitle: 'Standardized In-House Laboratory Inspection',
      description: 'Quality is not left to chance. Every production run undergoes standardized mechanical and manual testing before transfer to packaging, ensuring zero defective units reach international containers.',
      details: [
        'Indentation Force Deflection (IFD) and 10,000-cycle rebound resilience testing',
        'Zipper tensile endurance testing and seam pull strength verification',
        'Colorfastness under sweat and friction testing for airport transit conditions'
      ],
      icon: FaCheckCircle
    },
    {
      title: '5. Customized Packaging & Volume Optimization',
      subtitle: 'Protecting Product Integrity & Cutting Freight Costs',
      description: 'Packaging is engineered for both retail consumer appeal and international freight logistics. We offer high-vacuum shrink-packing that reduces shipping volume by up to 60%, drastically cutting your landed container costs.',
      details: [
        'Vacuum roll-packing and shrink-wrapping for maximum container cube utilization',
        'Retail-ready luxury rigid boxes with transparent viewing windows',
        'Compact travel carry pouches with carabiner clips and branded drawstrings'
      ],
      icon: FaBoxes
    },
    {
      title: '6. Bulk Production & International Export Handling',
      subtitle: 'Dependable Lead Times & Egyptian Free-Trade Advantages',
      description: 'Our factory handles container-scale orders with predictable scheduling. Egypt’s strategic geographic position between Europe, Africa, and Asia allows expedited ocean freight transit times via Port Said and Alexandria seaports.',
      details: [
        'Scalable bulk volume capability with transparent weekly production milestones',
        'Preferential trade agreements (EUR.1, GAFTA/Arab League, COMESA)',
        'Full export documentation: Bill of Lading, Certificate of Origin, and Customs Packing Lists'
      ],
      icon: FaShip
    }
  ];

  return (
    <Layout
      pageTitle="Travel Pillow Manufacturing in Egypt | Precision OEM Facility | YKP Supplies"
      metaDescription="Discover YKP Supplies travel pillow manufacturing facility in New Cairo, Egypt. Viscoelastic memory foam formulation, automated embroidery, quality testing, and global export shipping."
      canonicalUrl="https://www.ykp-eg.com/manufacturing"
      ogImage="/images/factory/factory-line.jpg"
    >
      {/* Hero Header */}
      <div className="bg-[#070C18] border-b border-slate-800 py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'الهندسة والتصنيع في القاهرة' : 'Industrial Engineering & Export'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Travel Pillow Manufacturing in Egypt
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Explore our state-of-the-art production facility in New Cairo. We unite ergonomic viscoelastic science with authentic Egyptian textile craftsmanship to supply global brands, airlines, and international retail chains.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/request-a-quote"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-[#D4AF37]/20"
              >
                DISCUSS YOUR MANUFACTURING PROJECT
              </Link>
              <Link
                href="/factory"
                className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-semibold text-xs tracking-wider transition-colors"
              >
                Take Virtual Factory Tour →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Production Visual Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900">
            <img
              src="/images/factory/factory-line.jpg"
              alt="Molding & Sewing Lines at YKP Factory"
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xs font-mono font-bold text-[#D4AF37] uppercase">Molding & Assembly</h4>
              <p className="text-xs text-slate-300 mt-1">High-density polyurethane injection & precision sewing</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900">
            <img
              src="/images/factory/quality-lab.jpg"
              alt="Quality Control Testing Laboratory"
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xs font-mono font-bold text-[#D4AF37] uppercase">QC Testing Lab</h4>
              <p className="text-xs text-slate-300 mt-1">IFD compression recovery & tensile seam testing</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900">
            <img
              src="/images/factory/packaging-export.jpg"
              alt="Export Logistics & Palletizing"
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xs font-mono font-bold text-[#D4AF37] uppercase">Export Staging</h4>
              <p className="text-xs text-slate-300 mt-1">Vacuum shrink-packing & global palletizing</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Step In-Depth Walkthrough */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-16">
          {manufacturingStages.map((stage, idx) => {
            const Icon = stage.icon;
            const isEven = idx % 2 === 1;

            return (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 sm:p-10 shadow-lg"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-2xl shrink-0 mt-1 border border-[#D4AF37]/20">
                    <Icon />
                  </div>
                  <div className="space-y-3 flex-1">
                    <span className="text-xs uppercase font-mono tracking-wider text-[#D4AF37] font-semibold">
                      {stage.subtitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {stage.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
                      {stage.description}
                    </p>

                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {stage.details.map((d, dIdx) => (
                        <div key={dIdx} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                          <span className="text-emerald-400 font-bold mr-1">✓</span>
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Production Capacity & Materials Table */}
      <div className="bg-[#070C18] border-t border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Materials & Engineering Specifications
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              All materials adhere to European safety and eco-compatibility standards.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800">
              <thead className="bg-slate-900 text-slate-200 uppercase font-mono font-semibold">
                <tr>
                  <th className="p-4 border-b border-slate-800">Component</th>
                  <th className="p-4 border-b border-slate-800">Standard Specifications</th>
                  <th className="p-4 border-b border-slate-800">Custom OEM Options</th>
                  <th className="p-4 border-b border-slate-800">Testing & Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-4 font-semibold text-white">Memory Foam Core</td>
                  <td className="p-4">Pure 50D Viscoelastic Polyurethane</td>
                  <td className="p-4">45D - 60D, Gel-infused, Bamboo charcoal, Dual-zone</td>
                  <td className="p-4 font-mono text-emerald-400">CertiPUR / Non-Toxic</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Outer Removable Cover</td>
                  <td className="p-4">Egyptian Cotton Velvet (280 GSM)</td>
                  <td className="p-4">Modal, Spandex athletic mesh, Silk satin, Jacquard</td>
                  <td className="p-4 font-mono text-emerald-400">OEKO-TEX Standard 100</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Zipper & Enclosure</td>
                  <td className="p-4">Concealed nylon coil zipper</td>
                  <td className="p-4">Custom engraved metal pullers, silicone sliders</td>
                  <td className="p-4 font-mono text-emerald-400">10,000 Cycle Pull Test</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Logo & Branding</td>
                  <td className="p-4">YKP Supplies Authentic Label</td>
                  <td className="p-4">Woven side tags, Tajima embroidery, Rubber badges</td>
                  <td className="p-4 font-mono text-emerald-400">Fade & Wash Resistant</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Export Packaging</td>
                  <td className="p-4">OPP polybag + 5-ply export carton</td>
                  <td className="p-4">Vacuum shrink rolls, Printed rigid gift box, Drawstring pouch</td>
                  <td className="p-4 font-mono text-emerald-400">Drop & Compression Tested</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Final Action Strip */}
      <div className="bg-slate-950 border-t border-slate-800 py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Discuss Your Manufacturing Project?
          </h2>
          <p className="text-sm text-slate-300">
            Submit your CAD requirements, sample requests, or target annual quantities for a detailed engineering proposal.
          </p>
          <div className="pt-2">
            <Link
              href="/request-a-quote"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-xl shadow-[#D4AF37]/20"
            >
              <span>DISCUSS YOUR MANUFACTURING PROJECT</span>
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
