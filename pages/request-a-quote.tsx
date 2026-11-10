import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import { FaShieldAlt, FaClock, FaCheckCircle, FaWhatsapp, FaBoxes, FaGlobeAmericas, FaAward } from 'react-icons/fa';

export default function RequestAQuotePage() {
  const router = useRouter();
  const isRTL = router.locale === 'ar';
  const preselectedProduct = typeof router.query.product === 'string' ? router.query.product : '';

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    country: '',
    email: '',
    phone: '',
    website: '',
    productType: preselectedProduct || 'Egyptian Heritage Collection',
    estimatedQuantity: '100-250 units',
    customDesign: 'no',
    privateLabel: 'no',
    targetMarket: 'Retail & Online Stores',
    additionalDetails: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resultData, setResultData] = useState<{ leadId?: string; whatsappUrl?: string } | null>(null);
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
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          sourcePage: '/request-a-quote'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setResultData({
          leadId: data.leadId,
          whatsappUrl: data.whatsappUrl
        });
      } else {
        setErrorMsg(data.message || 'Unable to submit quote. Please try again or reach us via WhatsApp.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or reach our team on WhatsApp (+20 100 240 6013).');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout
      pageTitle={isRTL ? 'طلب عرض سعر جملة وتصنيع | YKP Supplies' : 'Request a Wholesale Quote & Custom Manufacturing | YKP Supplies'}
      metaDescription={isRTL ? 'اطلب عرض سعر رسمي لمنتجات ومخدات السفر من مصنع YKP Supplies في القاهرة. أسعار المصنع المباشرة، تصنيع مخصص، وعلامات تجارية خاصة.' : 'Request an official B2B wholesale quotation for travel pillows directly from YKP Supplies in Cairo, Egypt. Factory pricing, custom OEM specs, and private labeling.'}
      canonicalUrl="https://www.ykp-eg.com/request-a-quote"
    >
      <div className="bg-slate-900 border-b border-slate-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              {isRTL ? 'بوابة طلب عروض الأسعار والتصدير' : 'B2B Procurement & Quotations'}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-2 text-balance">
              {isRTL ? 'طلب عرض أسعار الجملة والتصنيع' : 'Request an Official B2B Wholesale Quote'}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
              {isRTL
                ? 'تواصل مباشرة مع فريق التصدير بمصنعنا في القاهرة للحصول على أسعار المصنع، حسابات الشحن، ومواصفات الحاويات والعلامة الخاصة.'
                : 'Direct factory pricing from our manufacturing facility in New Cairo. Complete container load planning, private label customization, and dedicated export support.'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-10 shadow-xl">
              {submitted ? (
                <div className="text-center py-10 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
                    <FaCheckCircle />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {isRTL ? 'تم استلام طلبك بنجاح' : 'Quote Request Received'}
                    </h2>
                    <p className="text-slate-300 text-sm mt-2 max-w-md mx-auto">
                      {isRTL
                        ? `تم تسجيل طلبك برقم مرجعي: ${resultData?.leadId}. سيقوم مدير التصدير بمراجعة طلبك وإرسال عرض السعر والمواصفات الفنية خلال 24 ساعة.`
                        : `Your inquiry has been logged under Reference ID ${resultData?.leadId}. Our export team will evaluate your project and email your quotation within 24 hours.`}
                    </p>
                  </div>

                  {resultData?.whatsappUrl && (
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={resultData.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all"
                      >
                        <FaWhatsapp className="text-lg" />
                        <span>{isRTL ? 'إرسال التفاصيل مباشرة عبر واتساب' : 'Speed up via WhatsApp Direct'}</span>
                      </a>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setResultData(null);
                        }}
                        className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-semibold transition-colors"
                      >
                        {isRTL ? 'إرسال استفسار آخر' : 'Submit Another Inquiry'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-sm">
                      {errorMsg}
                    </div>
                  )}

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-3 mb-5">
                      {isRTL ? '١. معلومات الشركة والتواصل' : '1. Contact & Company Details'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          {isRTL ? 'الاسم الكامل *' : 'Full Name *'}
                        </label>
                        <input
                          type="text"
                          required
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder={isRTL ? 'مثال: محمد أحمد' : 'e.g. David Vance'}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          {isRTL ? 'اسم الشركة / المؤسسة *' : 'Company Name *'}
                        </label>
                        <input
                          type="text"
                          required
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder={isRTL ? 'شركة توريدات السفر' : 'Global Travel Retail Ltd'}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          {isRTL ? 'الدولة / سوق التوزيع *' : 'Country / Market *'}
                        </label>
                        <input
                          type="text"
                          required
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          placeholder={isRTL ? 'مصر، السعودية، ألمانيا...' : 'United States, UK, UAE, Germany...'}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          {isRTL ? 'البريد الإلكتروني للعمل *' : 'Business Email *'}
                        </label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="procurement@company.com"
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          {isRTL ? 'الهاتف / واتساب' : 'Phone / WhatsApp'}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 555 123 4567"
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          {isRTL ? 'الموقع الإلكتروني' : 'Company Website'}
                        </label>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="https://company.com"
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-3 mb-5">
                      {isRTL ? '٢. تفاصيل الطلب والمنتجات' : '2. Product & Project Specifications'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          {isRTL ? 'المجموعة المستهدفة' : 'Target Product Line'}
                        </label>
                        <select
                          name="productType"
                          value={formData.productType}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="Egyptian Heritage Collection">Egyptian Heritage Travel Pillows</option>
                          <option value="Premium Memory Foam Collection">Premium High-Density Memory Foam</option>
                          <option value="Classic Ergonomic Collection">Classic Neck Pillows</option>
                          <option value="Custom OEM / Private Label">Bespoke OEM / Private Label Manufacturing</option>
                          <option value="The Beloved Camel Plush">The Beloved Camel (Pharaonic Plush Toy 22cm/28cm)</option>
                          <option value="Full Wholesale Catalog">Full Mixed Container Order</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          {isRTL ? 'الكمية التقديرية' : 'Estimated Order Quantity'}
                        </label>
                        <select
                          name="estimatedQuantity"
                          value={formData.estimatedQuantity}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="50-100 units (Sample / Trial)">50 - 100 units (Trial / Sample run)</option>
                          <option value="100-250 units">100 - 250 units (Standard MOQ)</option>
                          <option value="250-500 units">250 - 500 units</option>
                          <option value="500-1000 units">500 - 1,000 units</option>
                          <option value="1000-5000 units (Full Container)">1,000 - 5,000 units (Volume export)</option>
                          <option value="5000+ units">5,000+ units (Recurring manufacturing contract)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          {isRTL ? 'هل تحتاج تصميماً مخصصاً؟' : 'Custom Design Required?'}
                        </label>
                        <select
                          name="customDesign"
                          value={formData.customDesign}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="no">No, standard YKP models</option>
                          <option value="yes">Yes, custom fabric / embroidery pattern</option>
                          <option value="not-sure">To be evaluated with sample</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          {isRTL ? 'هل تحتاج علامة خاصة (Private Label)؟' : 'Private Label Packaging Required?'}
                        </label>
                        <select
                          name="privateLabel"
                          value={formData.privateLabel}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="no">Standard YKP export packaging</option>
                          <option value="yes">Yes, custom branding, woven label & retail box</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          {isRTL ? 'قناة التوزيع / السوق المستهدف' : 'Distribution Channel / Target Market'}
                        </label>
                        <select
                          name="targetMarket"
                          value={formData.targetMarket}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="Retail & Online Stores">Retail Chains & E-Commerce Brands</option>
                          <option value="International Importer / Distributor">International Importer & Wholesale Distributor</option>
                          <option value="Airport Retail & Travel Concession">Airport Retailers & Travel Plazas</option>
                          <option value="Museum Shop & Cultural Heritage">Museum Gift Stores & Cultural Centers</option>
                          <option value="Hospitality & Hotels">Hotels, Resorts & Tourism Agencies</option>
                          <option value="Corporate Gifts & Events">Corporate Gifting & VIP Executive Merchandise</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          {isRTL ? 'ملاحظات إضافية ومواصفات مطلوبة' : 'Additional Project Details / Port of Destination'}
                        </label>
                        <textarea
                          rows={4}
                          name="additionalDetails"
                          value={formData.additionalDetails}
                          onChange={handleChange}
                          placeholder={isRTL ? 'أدخل أي مواصفات خاصة، ميناء الوصول المطلوب، أو التواريخ المستهدفة للتسليم...' : 'Enter target delivery dates, destination seaport/airport, custom branding notes, or sample requests...'}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-base hover:brightness-110 transition-all shadow-lg shadow-[#D4AF37]/20 disabled:opacity-50"
                    >
                      {submitting
                        ? (isRTL ? 'جاري إرسال الطلب...' : 'Transmitting Quote Request...')
                        : (isRTL ? 'إرسال طلب عرض السعر الرسمي (RFQ)' : 'REQUEST YOUR OFFICIAL WHOLESALE QUOTE')}
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-3">
                      {isRTL ? 'نحترم خصوصيتك. لن تتم مشاركة بياناتك أبداً.' : 'Commercial inquiries strictly safeguarded under factory B2B confidentiality.'}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Value Props & Trust Sidebar (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {isRTL ? 'لماذا تختار مصنع YKP؟' : 'Why International Buyers Partner with YKP'}
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                    <FaAward />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Direct Manufacturer Pricing</h4>
                    <p className="text-slate-400 text-xs mt-1">Zero trading agents or middleman markups. Direct production slots in New Cairo with transparent container economics.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                    <FaBoxes />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Custom OEM & Private Label</h4>
                    <p className="text-slate-400 text-xs mt-1">From branded woven tags and silicone zippers to full luxury retail display boxes tailored to your brand standards.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                    <FaGlobeAmericas />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Global Export Logistics</h4>
                    <p className="text-slate-400 text-xs mt-1">Shipments handled via Alexandria, Port Said, and Cairo Cargo Airport under FOB, CIF, or EXW incoterms with full EUR.1 and Certificate of Origin documentation.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                    <FaClock />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">24-Hour Quotation Turnaround</h4>
                    <p className="text-slate-400 text-xs mt-1">Our commercial engineering team responds promptly with technical drawings, packing lists, and volume pricing.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-700/60">
                <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-3">
                  {isRTL ? 'تواصل فوري مع المصنع' : 'Direct Factory Contact'}
                </h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <p><strong>WhatsApp:</strong> <a href="https://wa.me/201002406013" className="text-[#D4AF37] hover:underline" dir="ltr">+20 100 240 6013</a></p>
                  <p><strong>Email:</strong> <a href="mailto:sales@ykp-eg.com" className="text-[#D4AF37] hover:underline">sales@ykp-eg.com</a></p>
                  <p><strong>Facility:</strong> Industrial Zone, New Cairo, Egypt</p>
                </div>
              </div>
            </div>

            {/* Visual Callout */}
            <div className="rounded-2xl overflow-hidden border border-slate-700/60 relative group">
              <img
                src="/images/factory/factory-line.jpg"
                alt="YKP Manufacturing Production Line"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex items-end">
                <p className="text-xs text-white font-medium">New Cairo Production Line · High-Density Memory Foam</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
