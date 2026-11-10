import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaCheckCircle, FaIndustry } from 'react-icons/fa';

export default function ContactPage() {
  const router = useRouter();
  const isRTL = router.locale === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: 'Wholesale Inquiry',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resultData, setResultData] = useState<{ contactId?: string; whatsappUrl?: string } | null>(null);
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setResultData({
          contactId: data.contactId,
          whatsappUrl: data.whatsappUrl
        });
      } else {
        setErrorMsg(data.message || 'Failed to send message. Please contact us via WhatsApp.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or reach our team via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout
      pageTitle="Contact YKP Supplies | Egyptian Travel Pillows Factory Inquiries"
      metaDescription="Contact YKP Supplies in New Cairo, Egypt. Phone, email, WhatsApp, and factory address for wholesale travel pillows, OEM manufacturing, and distributor applications."
      canonicalUrl="https://www.ykp-eg.com/contact"
      ogImage="/images/factory/factory-line.jpg"
    >
      <div className="bg-[#070C18] border-b border-slate-800 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'تواصل مع إدارة المصنع' : 'Factory & Commercial Desk'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Contact YKP Supplies
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Have a manufacturing question, need wholesale price lists, or want to discuss a custom private-label project? Our New Cairo commercial desk is ready to assist you.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Information & Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white tracking-tight">Factory Headquarters</h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <strong className="block text-white">Physical Facility</strong>
                    <span className="text-slate-400">Industrial Manufacturing Zone, New Cairo, Cairo Governorate, Egypt</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <strong className="block text-white">Direct Phone</strong>
                    <a href="tel:+201002406013" dir="ltr" className="text-[#D4AF37] hover:underline">+20 100 240 6013</a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <strong className="block text-white">WhatsApp Direct</strong>
                    <a href="https://wa.me/201002406013" target="_blank" rel="noopener noreferrer" dir="ltr" className="text-emerald-400 hover:underline">
                      +20 100 240 6013 (Instant Chat)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                    <FaEnvelope />
                  </div>
                  <div>
                    <strong className="block text-white">Sales & Export Inquiries</strong>
                    <a href="mailto:sales@ykp-eg.com" className="text-[#D4AF37] hover:underline block">sales@ykp-eg.com</a>
                    <a href="mailto:ykpcommerchel@gmail.com" className="text-slate-400 hover:underline block text-xs">ykpcommerchel@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                    <FaClock />
                  </div>
                  <div>
                    <strong className="block text-white">Commercial Hours</strong>
                    <span className="text-slate-400">Sunday – Thursday: 9:00 AM – 6:00 PM (Cairo Time, GMT+2)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct RFQ Box */}
            <div className="bg-[#0A1020] border border-[#D4AF37]/30 rounded-2xl p-6 text-center space-y-3">
              <span className="text-xs uppercase font-mono text-[#D4AF37] font-bold">Volume Inquiries</span>
              <h3 className="text-base font-bold text-white">Need a Formal Container Quotation?</h3>
              <p className="text-xs text-slate-300">
                Use our dedicated B2B Request a Quote engine with detailed container loading and customization selectors.
              </p>
              <Link
                href="/request-a-quote"
                className="inline-block px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
              >
                Go to Quote Builder →
              </Link>
            </div>
          </div>

          {/* Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Send an Inquiry</h2>

              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
                    <FaCheckCircle />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent Successfully</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Reference ID: <strong>{resultData?.contactId}</strong>. Our export team will get back to you within 24 hours.
                  </p>
                  {resultData?.whatsappUrl && (
                    <div className="pt-2">
                      <a
                        href={resultData.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                      >
                        <FaWhatsapp className="text-base" />
                        <span>Send Message via WhatsApp Direct</span>
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
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
                        placeholder="buyer@company.com"
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company or Store name"
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 555 123 4567"
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Inquiry Nature
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Wholesale Inquiry">Wholesale Supply Order</option>
                        <option value="Custom OEM Project">Custom OEM / Private Label</option>
                        <option value="Distributor Application">Distributor Partnership</option>
                        <option value="Museum Gift Shop Inquiry">Museum & Tourist Retail</option>
                        <option value="General Question">General Factory Question</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Inquiry subject..."
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please detail your quantity needs, target market, or specific questions..."
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-[#D4AF37]/20 disabled:opacity-50"
                  >
                    {submitting ? 'Transmitting...' : 'SEND AN INQUIRY'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      locale,
    },
  };
};
