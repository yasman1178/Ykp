import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FaCompass, FaHome, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function Custom404() {
  const router = useRouter();
  const isRTL = router.locale === 'ar';

  return (
    <>
      <Head>
        <title>{isRTL ? 'الصفحة غير موجودة | YKP Supplies' : 'Page Not Found | YKP Supplies'}</title>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className="min-h-screen bg-[#07090C] text-[#F3EFE6] flex items-center justify-center px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]" />

        <div className="max-w-xl mx-auto text-center relative z-10 py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#0D1218] border border-[#D4AF37]/30 text-[#D4AF37] mb-8 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
            <FaCompass className="w-10 h-10 animate-spin-slow" />
          </div>

          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-3">
            {isRTL ? 'خطأ 404 · المسار مفقود' : 'Error 404 · Lost Route'}
          </p>

          <h1
            className="text-4xl sm:text-5xl font-serif font-medium text-[#F3EFE6] mb-6 tracking-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {isRTL ? 'الصفحة غير موجودة في الأرشيف' : 'This Path Is Not in the Archive'}
          </h1>

          <p className="text-sm sm:text-base text-[#9DA8B6] font-light leading-relaxed mb-10 max-w-md mx-auto">
            {isRTL
              ? 'يبدو أن الصفحة التي تبحث عنها قد تم نقلها أو لم تعد متوفرة. يمكنك استكشاف تشكيلاتنا الفاخرة أو العودة للرئيسية.'
              : 'The page you are looking for may have been relocated or is no longer available. Explore our atelier collections or return home.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#07090C] font-semibold text-sm hover:brightness-110 transition-all shadow-[0_10px_25px_rgba(212,175,55,0.25)]"
            >
              <FaHome className="w-4 h-4" />
              <span>{isRTL ? 'العودة للرئيسية' : 'Return Home'}</span>
            </Link>

            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#0F141C] border border-white/10 text-[#F3EFE6] font-medium text-sm hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-all"
            >
              <span>{isRTL ? 'استكشاف التشكيلات' : 'Explore Collections'}</span>
              {isRTL ? <FaArrowLeft className="w-4 h-4" /> : <FaArrowRight className="w-4 h-4" />}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
