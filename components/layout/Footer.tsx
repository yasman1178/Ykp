import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaLinkedin, FaFacebook, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFileAlt } from 'react-icons/fa';

interface FooterProps {
  translations?: any;
  locale?: string;
}

const Footer: React.FC<FooterProps> = ({ locale = 'en' }) => {
  const router = useRouter();
  const currentLocale = router.locale || locale;
  const isRTL = currentLocale === 'ar';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070C18] text-slate-300 border-t border-slate-800" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-800/80">
          
          {/* Brand & Manufacturing Credibility (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-slate-950 font-serif font-black text-xl shadow-md shadow-[#D4AF37]/20">
                𓂀
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-2xl font-bold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
                  YKP Supplies
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono -mt-1">
                  {isRTL ? 'مصنع مخدات السفر المصرية B2B' : 'Egyptian Travel Products Manufacturer'}
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {isRTL
                ? 'المصنع المصري الرائد في تصنيع مخدات السفر الطبية المصنوعة من رغوة الذاكرة عالية الكثافة، والمجموعات التراثية الفرعونية الفاخرة للعلامات التجارية العالمية، الموزعين، وسلاسل الفنادق والمتاحف.'
                : 'Premier Egyptian manufacturer of high-density memory foam travel pillows, custom private-label travel collections, and authentic pharaonic heritage keepsakes for international distributors, retailers, and hospitality brands.'}
            </p>

            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <a
                href="https://www.linkedin.com/in/ykp-eg-483b8a398"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-sm" />
              </a>
              <a
                href="https://www.facebook.com/new.cairo.893792"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="text-sm" />
              </a>
              <a
                href="https://wa.me/201002406013?text=Hello%20YKP%20Supplies%2C%20I%20would%20like%20to%20inquire%20about%20manufacturing%20and%20wholesale"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-sm" />
              </a>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-[#D4AF37] font-mono bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-1.5 rounded-lg">
                <span>🇪🇬 Made in Cairo, Egypt · Export Ready</span>
              </span>
            </div>
          </div>

          {/* Product Lines (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-white font-mono">
              {isRTL ? 'المنتجات والكتالوج' : 'Product Lines'}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products" className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                  {isRTL ? 'جميع المنتجات (كتالوج B2B)' : 'All Products Catalog'}
                </Link>
              </li>
              <li>
                <Link href="/products/tb" className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                  {isRTL ? 'المجموعة الفرعونية التراثية' : 'Egyptian Heritage'}
                </Link>
              </li>
              <li>
                <Link href="/products/b123" className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                  {isRTL ? 'مجموعة ميموري فوم الفاخرة' : 'Premium Collection'}
                </Link>
              </li>
              <li>
                <Link href="/products/t" className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                  {isRTL ? 'المجموعة الكلاسيكية' : 'Classic Collection'}
                </Link>
              </li>
              <li>
                <Link href="/custom-travel-pillows" className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                  {isRTL ? 'منتجات التصنيع المخصص' : 'Custom & OEM Pillows'}
                </Link>
              </li>
              <li>
                <Link href="/products/souvenirs/camel-plush-22cm" className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                  {isRTL ? 'دمية الجمل المحبوب التراثية' : 'The Beloved Camel Plush'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Manufacturing & Capabilities (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-white font-mono">
              {isRTL ? 'المصنع والتصنيع' : 'Manufacturing'}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/manufacturing" className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                  {isRTL ? 'مراحل الإنتاج والتصنيع' : 'Production Process'}
                </Link>
              </li>
              <li>
                <Link href="/factory" className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                  {isRTL ? 'جولة داخل مصنعنا' : 'Inside Our Factory'}
                </Link>
              </li>
              <li>
                <Link href="/quality" className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                  {isRTL ? 'معايير الجودة والمواد' : 'Quality & Testing Lab'}
                </Link>
              </li>
              <li>
                <Link href="/custom-travel-pillows" className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                  {isRTL ? 'العلامة الخاصة (Private Label)' : 'Private Label Solutions'}
                </Link>
              </li>
              <li>
                <Link href="/international-shipping" className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                  {isRTL ? 'الشحن والخدمات اللوجستية' : 'Packaging & Shipping'}
                </Link>
              </li>
            </ul>
          </div>

          {/* B2B Partnerships & Wholesale (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-white font-mono">
              {isRTL ? 'الشراكات والجملة' : 'Partnerships'}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/wholesale-travel-pillows" className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                  {isRTL ? 'أسعار الجملة والكميات' : 'Wholesale Terms & MOQ'}
                </Link>
              </li>
              <li>
                <Link href="/distributor" className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                  {isRTL ? 'كن موزعاً إقليمياً' : 'Become a Distributor'}
                </Link>
              </li>
              <li>
                <Link href="/museum-tourist-gifts" className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                  {isRTL ? 'متاجر المتاحف والمطارات' : 'Museum & Tourist Gifts'}
                </Link>
              </li>
              <li>
                <Link href="/corporate-travel-gifts" className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                  {isRTL ? 'هدايا الشركات والضيافة' : 'Corporate Travel Gifts'}
                </Link>
              </li>
              <li>
                <Link href="/request-a-quote" className="text-[#D4AF37] font-semibold hover:underline">
                  {isRTL ? 'اطلب عرض سعر رسمي (RFQ)' : 'Request a Quote (RFQ)'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Headquarters & Inquiries (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-white font-mono">
              {isRTL ? 'التواصل المباشر' : 'Headquarters'}
            </h3>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-[#D4AF37] mt-0.5 shrink-0" />
                <span>New Cairo, Cairo, Egypt</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-[#D4AF37] shrink-0" />
                <a href="tel:+201002406013" dir="ltr" className="hover:text-white transition-colors">+20 100 240 6013</a>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-[#D4AF37] shrink-0" />
                <a href="mailto:ykpcommerchel@gmail.com" className="hover:text-white transition-colors truncate">
                  sales@ykp-eg.com
                </a>
              </div>
              <div className="pt-2">
                <Link
                  href="/request-a-quote"
                  className="block text-center px-3 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-sm"
                >
                  {isRTL ? 'طلب عرض سعر سريع' : 'Instant RFQ'}
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Navigation Mirror */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {currentYear} YKP Supplies (ykp-eg.com). {isRTL ? 'جميع الحقوق محفوظة. صُنع بفخر في مصر.' : 'All rights reserved. Manufactured with pride in Cairo, Egypt.'}</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/about" className="hover:text-slate-400 transition-colors">
              {isRTL ? 'عن الشركة' : 'About'}
            </Link>
            <Link href="/blog" className="hover:text-slate-400 transition-colors">
              {isRTL ? 'المدونة' : 'Blog'}
            </Link>
            <Link href="/faq" className="hover:text-slate-400 transition-colors">
              {isRTL ? 'الأسئلة الشائعة' : 'FAQ'}
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              {isRTL ? 'اتصل بنا' : 'Contact'}
            </Link>
            <Link href="/sitemap.xml" className="hover:text-slate-400 transition-colors">
              {isRTL ? 'خريطة الموقع' : 'Sitemap'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;