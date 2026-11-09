import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { getStaticPropsWithTranslations } from '@/lib/translations';
import SEO from '@/components/SEO';
import {
    FloatingHieroglyphs,
    CrystalReveal,
    StaggerContainer,
    StaggerItem,
    EgyptianPulse
} from '../components/animations/EgyptianAnimations';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

interface ContactForm {
    name: string;
    email: string;
    subject: string;
    inquiryType: string;
    message: string;
}

interface ContactPageProps {
    translations: any;
    locale: string;
}

const ContactPage: React.FC<ContactPageProps> = ({ translations: t, locale }) => {
    const isRTL = locale === 'ar';
    const router = useRouter();
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [submitMessage, setSubmitMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactForm>();

    const onSubmit = async (data: ContactForm) => {
        setSubmitStatus('loading');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    setSubmitStatus('success');
                    setSubmitMessage(isRTL
                        ? 'شكراً لك! تم إرسال رسالتك بنجاح. سنرد عليك خلال 24 ساعة.'
                        : 'Thank you! Your message has been sent successfully. We will respond within 24 hours.');
                    reset();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
            }
            throw new Error('Fallback to direct WhatsApp');
        } catch (error) {
            // Static hosting fallback: open WhatsApp directly with prefilled message
            const waText = encodeURIComponent(`*طلب تواصل جديد - YKP Supplies*\nالاسم: ${data.name}\nالبريد: ${data.email}\nالنوع: ${data.inquiryType || 'عام'}\nالموضوع: ${data.subject}\nالرسالة: ${data.message}`);
            if (typeof window !== 'undefined') {
                window.open(`https://wa.me/201002406013?text=${waText}`, '_blank');
            }
            setSubmitStatus('success');
            setSubmitMessage(isRTL
                ? 'شكراً لك! تم فتح واتساب للتواصل المباشر مع فريق المبيعات.'
                : 'Thank you! WhatsApp opened for instant connection with our team.');
            reset();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const contactInfo = [
        {
            icon: <FaEnvelope />,
            title: isRTL ? 'البريد الإلكتروني' : 'Email Us',
            details: ['ykp.supplies@gmail.com'],
            description: isRTL ? 'تواصل مباشر مع فريق التصنيع' : 'Direct communication with our team',
        },
        {
            icon: <FaPhone />,
            title: isRTL ? 'اتصل بنا' : 'Call Us',
            details: ['+20 100 240 6013'],
            description: isRTL ? 'تحدث مع خبراء الإنتاج لدينا' : 'Speak with our production experts',
        },
        {
            icon: <FaMapMarkerAlt />,
            title: isRTL ? 'مقرنا' : 'Our Location',
            details: [isRTL ? 'القاهرة، مصر' : 'Cairo, Egypt'],
            description: isRTL ? 'مركز التصنيع والتوزيع الرئيسي' : 'Main manufacturing & distribution hub',
        },
    ];

    return (
        <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-papyrus-light">
            <SEO
                title={isRTL ? 'اتصل بنا | YKP Supplies' : 'Contact Us | YKP Supplies'}
                description={t.site.description}
                locale={locale}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-hieroglyph-black text-white">
                <div className="absolute inset-0 pointer-events-none">
                    <FloatingHieroglyphs className="opacity-10" />
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <StaggerContainer>
                        <StaggerItem>
                            <h1 className="text-5xl md:text-8xl font-black mb-6 shimmer-text italic" style={{ fontFamily: 'Playfair Display, serif' }}>
                                {isRTL ? 'تواصل معنا' : 'Get In Touch'}
                            </h1>
                        </StaggerItem>
                        <StaggerItem>
                            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-light">
                                {isRTL
                                    ? 'نحن هنا للإجابة على جميع استفساراتكم المتعلقة بالجملة والتصنيع الخاص.'
                                    : 'We are here to answer all your inquiries regarding wholesale and custom manufacturing.'}
                            </p>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            {/* Info Cards */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    {contactInfo.map((info, index) => (
                        <CrystalReveal key={index} className="glass-panel p-10 rounded-[3rem] text-center border-pharaonic-gold/20 transform hover:-translate-y-4 transition-all duration-500">
                            <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-8 shadow-large">
                                {info.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-hieroglyph-black mb-4">{info.title}</h3>
                            {info.details.map((detail, i) => (
                                <p key={i} className="text-pharaonic-gold font-bold text-lg mb-2">{detail}</p>
                            ))}
                            <p className="text-hieroglyph-light opacity-60 text-sm">{info.description}</p>
                        </CrystalReveal>
                    ))}
                </div>
            </section>

            {/* Form Section */}
            <section className="py-20 px-4 bg-white relative">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel p-10 md:p-16 rounded-[4rem] shadow-huge border-gray-100"
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-hieroglyph-black mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                            {isRTL ? 'أرسل لنا رسالة' : 'Send a Message'}
                        </h2>

                        <AnimatePresence>
                            {submitStatus !== 'idle' && submitStatus !== 'loading' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`mb-8 p-6 rounded-3xl border flex items-center gap-4 ${submitStatus === 'success' ? 'bg-green-50 border-green-100 text-green-800' : 'bg-red-50 border-red-100 text-red-800'
                                        }`}
                                >
                                    <span>{submitStatus === 'success' ? '✓' : '✗'}</span>
                                    <p className="font-medium">{submitMessage}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    {...register('name', { required: true })}
                                    placeholder={isRTL ? 'الاسم الكامل' : 'Full Name'}
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pharaonic-gold outline-none transition-all"
                                />
                                <input
                                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                                    placeholder={isRTL ? 'البريد الإلكتروني' : 'Email Address'}
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pharaonic-gold outline-none transition-all"
                                />
                            </div>
                            <input
                                {...register('subject', { required: true })}
                                placeholder={isRTL ? 'الموضوع' : 'Subject'}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pharaonic-gold outline-none transition-all"
                            />
                            <textarea
                                {...register('message', { required: true })}
                                placeholder={isRTL ? 'رسالتك...' : 'Your message...'}
                                rows={5}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pharaonic-gold outline-none transition-all"
                            />

                            <motion.button
                                type="submit"
                                disabled={submitStatus === 'loading'}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full py-5 rounded-3xl font-bold text-lg shadow-xl shadow-blue-900/20 text-white transition-all ${submitStatus === 'loading' ? 'bg-gray-400' : 'bg-gradient-to-r from-hieroglyph-black to-blue-900'
                                    }`}
                            >
                                {submitStatus === 'loading' ? (isRTL ? 'جاري الإرسال...' : 'Sending...') : (isRTL ? 'إرسال الرسالة' : 'Send Message')}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    return getStaticPropsWithTranslations(context);
};

export default ContactPage;
