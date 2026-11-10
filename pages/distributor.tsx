import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { FaGlobeAmericas, FaAward, FaCogs, FaHandshake, FaMapMarkedAlt, FaCheckCircle, FaWhatsapp } from 'react-icons/fa';

export default function DistributorPage() {
  const router = useRouter();
  const isRTL = router.locale === 'ar';

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    country: '',
    email: '',
    phone: '',
    website: '',
    businessType: 'Wholesale Distributor',
    yearsInBusiness: '3-5 years',
    salesChannels: 'Retail Stores & Airport Concessions',
    estimatedOrderQuantity: '500 - 1,000 units / month',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resultData, setResultData] = useState<{ applicationId?: string; whatsappUrl?: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/distributor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setResultData({
          applicationId: data.applicationId,
          whatsappUrl: data.whatsappUrl
        });
      } else {
        setErrorMsg(data.message || 'Failed to submit application. Please contact us directly.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or reach our team directly via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const benefits = [
    {
      title: 'Wholesale Opportunities',
      desc: 'Exclusive manufacturer-direct tiered pricing with aggressive volume discounts that maximize your regional margin.',
      icon: FaAward
    },
    {
      title: 'Marketing Support',
      desc: 'Access high-resolution product photography, 3D renders, physical point-of-sale display stands, and localized catalogs.',
      icon: FaGlobeAmericas
    },
    {
      title: 'Product Customization',
      desc: 'Customized packaging, localized language care tags, barcode labeling, and unique color combinations for your regional market.',
      icon: FaCogs
    },
    {
      title: 'Long-Term Partnerships',
      desc: 'Guaranteed production line slots during peak travel seasons and dedicated account managers at our Cairo headquarters.',
      icon: FaHandshake
    },
    {
      title: 'Territory Opportunities',
      desc: 'Regional exclusivity opportunities for proven distributors achieving agreed container volume thresholds.',
      icon: FaMapMarkedAlt
    }
  ];

  return (
    <Layout
      pageTitle="Become a YKP Distributor | International B2B Partnership Program"
      metaDescription="Apply to become an authorized international distributor of YKP travel pillows. Direct factory pricing, marketing support, and regional territory opportunities."
      canonicalUrl="https://www.ykp-eg.com/distributor"
      ogImage="/images/factory/factory-line.jpg"
    >
      <div className="bg-[#070C18] border-b border-slate-800 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'برنامج الشراكة والتوزيع الإقليمي' : 'Global Partnership Program'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Become a YKP Distributor
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Expand your portfolio with Egypt’s leading travel pillow manufacturer. We are actively expanding our global distribution network across Europe, the Gulf, North America, and Asia.
            </p>
          </div>
        </div>
      </div>

      {/* Program Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Distributor Partner Benefits
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Designed to build profitable, long-term commercial relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3 hover:border-[#D4AF37]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-lg">
                  <Icon />
                </div>
                <h3 className="text-base font-bold text-white">{b.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Application Form */}
      <div className="bg-[#0A1020] border-t border-slate-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="mb-8 border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-bold text-white">Distributor Application Form</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Please complete the form below. Our commercial distribution team will review your business profile within 72 hours.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
                  <FaCheckCircle />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Application Received</h3>
                  <p className="text-slate-300 text-sm mt-2 max-w-md mx-auto">
                    Application ID: <strong>{resultData?.applicationId}</strong>. Our director of international distribution will contact you with terms and catalog materials.
                  </p>
                </div>
                {resultData?.whatsappUrl && (
                  <div className="pt-2">
                    <a
                      href={resultData.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                    >
                      <FaWhatsapp className="text-base" />
                      <span>Speed up Application on WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Contact executive name"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Distributor legal entity"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Country / Target Territory *
                    </label>
                    <input
                      type="text"
                      required
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country or region of distribution"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="distribution@company.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 555 123 4567"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://distributor.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Business Type
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Wholesale Distributor">Wholesale Distributor</option>
                      <option value="Importer / Trading House">Importer / Trading House</option>
                      <option value="Retail Chain Buyer">Retail Chain Buyer</option>
                      <option value="Airport Concessionaire">Airport Concessionaire</option>
                      <option value="Online Retailer / Marketplace">Online Retailer / Marketplace</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Years in Business
                    </label>
                    <select
                      name="yearsInBusiness"
                      value={formData.yearsInBusiness}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="1-2 years">1 - 2 years</option>
                      <option value="3-5 years">3 - 5 years</option>
                      <option value="5-10 years">5 - 10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Primary Sales Channels
                    </label>
                    <input
                      type="text"
                      name="salesChannels"
                      value={formData.salesChannels}
                      onChange={handleChange}
                      placeholder="e.g. 45 airport stores, travel retail web store, department store concessions"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Estimated Order Quantity / Annual Volume
                    </label>
                    <input
                      type="text"
                      name="estimatedOrderQuantity"
                      value={formData.estimatedOrderQuantity}
                      onChange={handleChange}
                      placeholder="e.g. 1,000 units initial order / 10,000 units annual forecast"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Message / Distribution Plan Overview
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your current distribution network, key retailer accounts, and which YKP collections you plan to launch with..."
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-[#D4AF37]/20 disabled:opacity-50"
                >
                  {submitting ? 'Transmitting Application...' : 'APPLY TO BECOME A DISTRIBUTOR'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}