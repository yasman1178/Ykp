import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaFacebook, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

interface FooterProps {
  translations?: any;
  locale?: string;
}

const Footer: React.FC<FooterProps> = ({ locale = 'en' }) => {
  const isRTL = locale === 'ar';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07090C] text-slate-300 border-t border-amber-900/20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Company Brand Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-black font-serif font-black text-xl shadow-md shadow-[#D4AF37]/20">
                𓂀
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
                YKP Supplies
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {isRTL
                ? 'المصنع المصري الرائد في ابتكار وتصنيع مخدات السفر الطبية بعبق التراث الفرعوني. نجمع بين أصالة القطن المصري ورغوة الذاكرة عالية الكثافة لراحة تدوم عبر القارات.'
                : 'Premier Egyptian manufacturer of orthopedic travel pillows inspired by pharaonic heritage. We unite authentic Egyptian cotton with high-density viscoelastic memory foam for flight comfort across continents.'}
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
                href="https://wa.me/201002406013"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-sm" />
              </a>
            </div>
          </div>

          {/* Collections Column (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37] font-mono">
              {isRTL ? 'المجموعات الفرعونية' : 'Collections'}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products/royal" className="text-slate-400 hover:text-white transition-colors">
                  {isRTL ? 'المجموعة الملكية الفرعونية' : 'Royal Pharaonic Collection'}
                </Link>
              </li>
              <li>
                <Link href="/products/sacred" className="text-slate-400 hover:text-white transition-colors">
                  {isRTL ? 'مجموعة الرموز والمقدسات (عنخ وحورس)' : 'Sacred Symbols (Ankh & Horus)'}
                </Link>
              </li>
              <li>
                <Link href="/products/heritage" className="text-slate-400 hover:text-white transition-colors">
                  {isRTL ? 'مجموعة النقوش والبرديات الأثرية' : 'Ancient Heritage & Hieroglyphs'}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-400 hover:text-white transition-colors">
                  {isRTL ? 'جميع الموديلات (80+ مخدة)' : 'All Pillow Models (80+ Catalog)'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Commerce & Channels (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37] font-mono">
              {isRTL ? 'قنوات الطلب' : 'Ordering Channels'}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/wholesale" className="text-slate-400 hover:text-white transition-colors">
                  {isRTL ? 'طلبات الجملة والتصدير' : 'B2B Wholesale Inquiries'}
                </Link>
              </li>
              <li>
                <Link href="/retail" className="text-slate-400 hover:text-white transition-colors">
                  {isRTL ? 'شراء للأفراد (تجزئة)' : 'Direct Retail Orders'}
                </Link>
              </li>
              <li>
                <Link href="/distributor" className="text-slate-400 hover:text-white transition-colors">
                  {isRTL ? 'بوابة الوكلاء والموزعين' : 'Distributor Portal'}
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="text-slate-400 hover:text-white transition-colors">
                  {isRTL ? 'برنامج الشراكة وتصنيع الفنادق' : 'OEM / Hotel Hospitality'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Factory Contact & Location (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37] font-mono">
              {isRTL ? 'بيانات المصنع والتواصل' : 'Atelier & Factory'}
            </h3>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-[#D4AF37] mt-0.5 shrink-0" />
                <span>{isRTL ? 'القاهرة الجديدة، جمهورية مصر العربية' : 'New Cairo, Egypt'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaPhoneAlt className="text-[#D4AF37] shrink-0" />
                <span dir="ltr">+20 100 240 6013</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaEnvelope className="text-[#D4AF37] shrink-0" />
                <span>deliveryeg1@gmail.com</span>
              </div>
              <div className="pt-2">
                <span className="inline-block text-[11px] text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded">
                  {isRTL ? 'مصنع مباشر • أسعار جملة حقيقية' : 'Direct Manufacturer • Authentic Export'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {currentYear} YKP Supplies. {isRTL ? 'جميع الحقوق محفوظة. صُنعت بعناية في مصر.' : 'All rights reserved. Crafted with care in Egypt.'}</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-400 transition-colors">
              {isRTL ? 'عن المصنع' : 'About'}
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