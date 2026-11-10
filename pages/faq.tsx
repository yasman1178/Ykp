import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { FaChevronDown, FaQuestionCircle, FaArrowRight, FaArrowLeft, FaWhatsapp } from 'react-icons/fa';

export default function FAQPage() {
  const router = useRouter();
  const isRTL = router.locale === 'ar';
  const Arrow = isRTL ? FaArrowLeft : FaArrowRight;

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is your Minimum Order Quantity (MOQ)?',
      a: 'For standard catalog models, our wholesale MOQ starts at 50 to 100 units per colorway or model. For custom OEM designs or bespoke private label retail packaging, MOQ is typically 100 to 250 units. We also accommodate mixed-model container orders to support diversified retail launches.'
    },
    {
      q: 'Do you offer custom designs and OEM manufacturing?',
      a: 'Yes, full custom manufacturing is a core pillar of our Cairo plant. We can develop proprietary contour foam silhouettes, adjust memory foam firmness densities (45D to 60D), and execute custom client embroidery or jacquard weaves from your tech pack or CAD files.'
    },
    {
      q: 'Do you offer private label branding?',
      a: 'Yes. We provide complete turnkey private labeling: custom woven side tags, branded silicone zipper pullers, customized barcode hangtags, and luxury printed retail packaging (magnetic rigid boxes, vacuum compression roll wraps, or waterproof drawstring travel pouches).'
    },
    {
      q: 'Can I order pre-production samples before placing a bulk order?',
      a: 'Absolutely. We encourage all commercial buyers to test our golden production samples before committing to container production. Physical samples are prepared and dispatched via DHL or FedEx Express within 5 to 7 business days.'
    },
    {
      q: 'Do you ship internationally and which Incoterms do you support?',
      a: 'Yes, we export globally. We regularly support FOB Alexandria or Port Said, CIF destination seaport, and EXW Cairo factory. Shipments are handled as full container loads (20ft / 40ft HQ) or palletized LCL via sea and air cargo.'
    },
    {
      q: 'How long does bulk production take?',
      a: 'Standard manufacturing lead time is 2 to 4 weeks depending on the order quantity and packaging complexity. Repeat container orders benefit from pre-scheduled manufacturing capacity slots.'
    },
    {
      q: 'What materials do you use in manufacturing?',
      a: 'We use high-purity, hypoallergenic viscoelastic polyurethane memory foam (50D standard density) formulated without toxic fillers or chemical odors. Outer covers are made from breathable Egyptian cotton velvets, silky modal blends, or athletic cooling meshes with OEKO-TEX compliant dyes.'
    }
  ];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ykp-eg.com';

  return (
    <Layout
      pageTitle="Frequently Asked Questions (FAQ) | Travel Pillow Manufacturing | YKP Supplies"
      metaDescription="Find answers to common questions about wholesale travel pillows, MOQs, private label OEM manufacturing, sample ordering, and international shipping from Cairo, Egypt."
      canonicalUrl={`${siteUrl}/faq`}
    >
      {/* Schema.org FAQPage */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a
                }
              }))
            })
          }}
        />
      </Head>

      <div className="bg-[#070C18] border-b border-slate-800 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'الأسئلة الشائعة وإجابات المصنع' : 'Buyer FAQ & Procurement Guide'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Frequently Asked Questions
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Clear, transparent answers regarding our manufacturing minimums, private-label capabilities, production lead times, and global shipping terms.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-12">
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 text-white hover:text-[#D4AF37] transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg leading-snug">{faq.q}</span>
                  <FaChevronDown
                    className={`text-xs text-[#D4AF37] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="bg-[#0A1020] border border-slate-800 rounded-2xl p-8 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Have a Question Not Listed Here?</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Our New Cairo sales and engineering desk is on hand to answer technical inquiries, review CAD files, or calculate custom container packing lists.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/request-a-quote"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
            >
              Request a Custom Quote
            </Link>
            <a
              href="https://wa.me/201002406013"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-xs border border-slate-700 transition-colors inline-flex items-center gap-2"
            >
              <FaWhatsapp />
              <span>Ask via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
