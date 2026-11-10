import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { FaShip, FaPlane, FaFileContract, FaBoxes, FaClock, FaCheck, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export default function InternationalShippingPage() {
  const router = useRouter();
  const isRTL = router.locale === 'ar';
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  const exportSteps = [
    {
      step: '01',
      title: 'Order Confirmation & Deposit',
      desc: 'Proforma invoice is issued specifying unit price, carton packing counts, total cubic meters (CBM), and agreed Incoterms (FOB, CIF, or EXW).'
    },
    {
      step: '02',
      title: 'Batch Production & Milestone Updates',
      desc: 'Standard manufacturing lead time is 2 to 4 weeks depending on batch volume. Weekly photo/video updates are provided by your export manager.'
    },
    {
      step: '03',
      title: 'Pre-Shipment Inspection & Packing',
      desc: 'Vacuum compression, master carton sealing, pallet banding, and barcode verification in our export staging area.'
    },
    {
      step: '04',
      title: 'Customs Clearance & Port Dispatch',
      desc: 'Containers are loaded directly at our New Cairo factory and trucked under customs bond to Alexandria or Port Said container terminals.'
    },
    {
      step: '05',
      title: 'Document Transmittal & Arrival',
      desc: 'Original documents (Bill of Lading, Commercial Invoice, Packing List, Certificate of Origin, EUR.1) are dispatched via DHL express or telex released.'
    }
  ];

  return (
    <Layout
      pageTitle="International Shipping & Export Documentation | YKP Supplies"
      metaDescription="Learn about international shipping procedures, lead times, vacuum packing, ocean/air freight options, and customs documentation from Cairo, Egypt."
      canonicalUrl="https://www.ykp-eg.com/international-shipping"
      ogImage="/images/factory/custom_packaging_export_1794309475969.jpg"
    >
      <div className="bg-[#070C18] border-b border-slate-800 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'اللوجستيات والشحن الدولي' : 'Global Logistics & Supply Chain'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              International Shipping & Export from Egypt
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Egypt’s strategic geographic bridge between Europe, the Arab world, and the Americas makes sourcing from Cairo fast and cost-effective. Learn about our freight options, volume optimization, and customs documentation.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        
        {/* Ocean vs Air Freight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-xl">
              <FaShip />
            </div>
            <h2 className="text-xl font-bold text-white">Ocean Freight (FCL & LCL)</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Ideal for container-scale wholesale and recurring distributor restocking. Handled via Alexandria Seaport and Port Said along the Suez Canal.
            </p>
            <ul className="space-y-2 text-xs text-slate-400 font-mono">
              <li>• Mediterranean & Southern Europe: 7 – 12 Days</li>
              <li>• Northern & Western Europe: 14 – 18 Days</li>
              <li>• North America East Coast: 18 – 24 Days</li>
              <li>• Arabian Gulf / GCC: 10 – 16 Days</li>
            </ul>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-xl">
              <FaPlane />
            </div>
            <h2 className="text-xl font-bold text-white">Air Cargo & Express Freight</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Ideal for initial pre-production samples, urgent airline restocking, or seasonal high-demand replenishment. Handled via Cairo Cargo Airport (CAI).
            </p>
            <ul className="space-y-2 text-xs text-slate-400 font-mono">
              <li>• Europe & Middle East: 2 – 3 Days Transit</li>
              <li>• North America: 3 – 5 Days Transit</li>
              <li>• Courier samples: Handled via DHL / FedEx door-to-door</li>
            </ul>
          </div>
        </div>

        {/* 5-Step Export Protocol */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Our 5-Step Export Protocol
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {exportSteps.map((step, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
                <span className="text-xs font-mono font-bold text-[#D4AF37]">{step.step}</span>
                <h3 className="text-sm font-bold text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Export Documentation */}
        <div className="bg-[#0A1020] border border-slate-800 rounded-2xl p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Customs Compliance & Documentation
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                YKP Supplies provides all required international export certificates to ensure seamless customs clearance in your home country:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <FaCheck className="text-emerald-400" />
                  <span>EUR.1 Movement Certificate (Duty-free Europe)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-emerald-400" />
                  <span>Official Egyptian Certificate of Origin</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-emerald-400" />
                  <span>Ocean Bill of Lading (B/L) / Airway Bill (AWB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-emerald-400" />
                  <span>Customs Packing List with CBM & Gross Weights</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 text-center">
              <Link
                href="/request-a-quote?type=shipping"
                className="inline-block w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
              >
                REQUEST FREIGHT ESTIMATE
              </Link>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
