import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FloatingHieroglyphs, CrystalReveal } from '../components/animations/EgyptianAnimations';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  inquiryType: string;
  message: string;
}

const ContactPage: React.FC = () => {
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

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitStatus('success');
                setSubmitMessage('Thank you! Your message has been sent successfully. We will respond within 24 hours.');
                reset();
                // Scroll to top to show success message
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            setSubmitStatus('error');
            setSubmitMessage('Sorry, there was an error sending your message. Please try again or contact us directly.');
            console.error('Form submission error:', error);
        }
    };

    const contactInfo = [
        {
            icon: '📧',
            title: 'Email Factory',
            details: ['ykp.supplies@gmail.com'],
            description: 'Direct communication with our manufacturing team',
        },
        {
            icon: '📞',
            title: 'Call Factory',
            details: ['+20 100 240 6013'],
            description: 'Speak directly with our production specialists',
        },
        {
            icon: '🏭',
            title: 'Manufacturing Hub',
            details: ['YKP Supplies', 'Cairo, Egypt'],
            description: 'Our main production facility and headquarters',
        },
        {
            icon: '🌍',
            title: 'Global Reach',
            details: ['50+ Countries', '200+ Partners'],
            description: 'Worldwide manufacturing and distribution network',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Head>
                <title>Contact YKP Supplies - Direct Manufacturing & Wholesale Inquiries</title>
                <meta
                    name="description"
                    content="Contact YKP Supplies directly for manufacturing quotes, wholesale pricing, and partnership opportunities. Get in touch with our Egyptian travel pillow factory."
                />
            </Head>

            {/* Enhanced Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
                <div className="absolute inset-0 bg-black/30"></div>
                
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white/20 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                scale: [1, 2, 1],
                                opacity: [0.2, 0.8, 0.2],
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>

                {/* Floating Egyptian Hieroglyphs */}
                <div className="absolute inset-0 pointer-events-none">
                    {['𓂀', '𓁹', '𓋹', '𓊪', '𓈖', '𓊽', '𓇳', '𓊨', '𓈗', '𓊃'].map((hieroglyph, i) => (
                        <FloatingHieroglyphs
                            key={i}
                            className="absolute text-white/10 text-4xl font-bold"
                            style={{
                                left: `${5 + (i * 9)}%`,
                                top: `${15 + (i % 4) * 20}%`,
                                animationDelay: `${i * 0.3}s`
                            }}
                        >
                            {hieroglyph}
                        </FloatingHieroglyphs>
                    ))}
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white"
                    >
                        <motion.div
                            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold mb-8"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            🏭 Direct from Manufacturer
                        </motion.div>

                        <motion.h1 
                            className="text-4xl md:text-6xl font-bold mb-6"
                            style={{ fontFamily: 'Playfair Display, serif' }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Let&apos;s Connect
                        </motion.h1>

                        <motion.p 
                            className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Ready to bring Egyptian heritage travel comfort to your market? 
                            Get direct manufacturing quotes and wholesale pricing from YKP Supplies.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap justify-center gap-4 mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            {['Manufacturing Quotes', 'Wholesale Pricing', 'Global Shipping', 'Quality Guaranteed'].map((feature, index) => (
                                <span 
                                    key={index}
                                    className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium border border-white/20"
                                >
                                    {feature}
                                </span>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                        >
                            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
                                <span className="text-2xl">📞</span>
                                <div className="text-left">
                                    <div className="text-sm opacity-80">Call Direct</div>
                                    <div className="font-semibold">+20 100 240 6013</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
                                <span className="text-2xl">📧</span>
                                <div className="text-left">
                                    <div className="text-sm opacity-80">Email Direct</div>
                                    <div className="font-semibold">ykp.supplies@gmail.com</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Enhanced Contact Info Cards */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                            Get in Touch with Our Factory
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Direct communication with YKP Supplies manufacturing team for wholesale inquiries, custom orders, and partnership opportunities.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group"
                            >
                                <CrystalReveal>
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 h-full p-6 text-center transform-gpu">
                                        <motion.div 
                                            className="text-4xl mb-4"
                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {info.icon}
                                        </motion.div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                                            {info.title}
                                        </h3>
                                        <div className="mb-3">
                                            {info.details.map((detail, idx) => (
                                                <div key={idx} className="font-semibold text-base bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                                    {detail}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                                            {info.description}
                                        </p>
                                        
                                        <motion.div 
                                            className="h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 mt-4 rounded-full"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                                        />
                                    </div>
                                </CrystalReveal>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Contact Form Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-6 border border-gray-100">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        Send Direct Message to Factory
                                    </h2>
                                    <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        Fill out the form below and we&apos;ll send your message directly to our manufacturing team. 
                                        You&apos;ll receive a response within 24 hours.
                                    </p>
                                </div>

                                {/* Status Messages */}
                                <AnimatePresence>
                                    {submitStatus === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -20, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <span className="text-xl">✅</span>
                                                <div>
                                                    <h4 className="font-semibold text-green-800">Message Sent Successfully!</h4>
                                                    <p className="text-xs text-green-600">{submitMessage}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -20, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <span className="text-xl">❌</span>
                                                <div>
                                                    <h4 className="font-semibold text-red-800">Error Sending Message</h4>
                                                    <p className="text-xs text-red-600">{submitMessage}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                Full Name *
                                            </label>
                                            <input
                                                {...register('name', { required: 'Name is required' })}
                                                className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 bg-white focus:outline-none transition-all duration-300 hover:border-gray-300 text-sm"
                                                placeholder="Your full name"
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                {...register('email', { 
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'Invalid email address'
                                                    }
                                                })}
                                                className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 bg-white focus:outline-none transition-all duration-300 hover:border-gray-300 text-sm"
                                                placeholder="your.email@company.com"
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Subject *
                                        </label>
                                        <input
                                            {...register('subject', { required: 'Subject is required' })}
                                            className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 bg-white focus:outline-none transition-all duration-300 hover:border-gray-300 text-sm"
                                            placeholder="Brief description of your inquiry"
                                        />
                                        {errors.subject && (
                                            <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Inquiry Type
                                        </label>
                                        <select
                                            {...register('inquiryType')}
                                            className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 bg-white focus:outline-none transition-all duration-300 hover:border-gray-300 text-sm"
                                        >
                                            <option value="">Select inquiry type</option>
                                            <option value="Manufacturing Quote">Manufacturing Quote</option>
                                            <option value="Wholesale Pricing">Wholesale Pricing</option>
                                            <option value="Partnership Opportunity">Partnership Opportunity</option>
                                            <option value="Custom Manufacturing">Custom Manufacturing</option>
                                            <option value="Bulk Orders">Bulk Orders</option>
                                            <option value="General Inquiry">General Inquiry</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Message *
                                        </label>
                                        <textarea
                                            {...register('message', { required: 'Message is required' })}
                                            rows={5}
                                            className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 bg-white focus:outline-none transition-all duration-300 hover:border-gray-300 resize-vertical text-sm"
                                            placeholder="Please provide details about your inquiry, including quantities, specifications, or any specific requirements..."
                                        />
                                        {errors.message && (
                                            <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                                        )}
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={submitStatus === 'loading'}
                                        className={`w-full py-3 px-6 rounded-xl font-semibold text-base transition-all duration-300 ${
                                            submitStatus === 'loading'
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:shadow-xl'
                                        } text-white`}
                                        whileHover={submitStatus !== 'loading' ? { scale: 1.02, y: -2 } : {}}
                                        whileTap={submitStatus !== 'loading' ? { scale: 0.98 } : {}}
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        {submitStatus === 'loading' ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Sending to Factory...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center space-x-2">
                                                <span>📧</span>
                                                <span>Send Message to Factory</span>
                                            </div>
                                        )}
                                    </motion.button>

                                    <div className="text-center text-xs text-gray-500">
                                        <p>Your message will be sent directly to: <strong>ykp.supplies@gmail.com</strong></p>
                                        <p>Response time: Within 24 hours</p>
                                    </div>
                                </form>
                            </div>
                        </motion.div>

                        {/* Enhanced Additional Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    🏭 Why Choose YKP Supplies?
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { icon: '🎨', text: 'Authentic Egyptian designs with modern comfort' },
                                        { icon: '🏭', text: 'Direct from manufacturer - No middlemen' },
                                        { icon: '💰', text: 'Competitive wholesale pricing' },
                                        { icon: '🌍', text: 'Global shipping to 50+ countries' },
                                        { icon: '⚡', text: 'Fast production and delivery' },
                                        { icon: '✅', text: 'Quality guarantee on all products' },
                                    ].map((benefit, index) => (
                                        <motion.div 
                                            key={index} 
                                            className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm"
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            <span className="text-xl">{benefit.icon}</span>
                                            <span className="text-gray-700 font-medium text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                                                {benefit.text}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <h4 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    🕒 Factory Business Hours
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                                        <span className="font-medium text-gray-700 text-sm">Monday - Friday:</span>
                                        <span className="font-semibold text-purple-600 text-sm">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                                        <span className="font-medium text-gray-700 text-sm">Saturday:</span>
                                        <span className="font-semibold text-purple-600 text-sm">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                                        <span className="font-medium text-gray-700 text-sm">Sunday:</span>
                                        <span className="font-semibold text-gray-500 text-sm">Closed</span>
                                    </div>
                                    <div className="text-center text-xs text-gray-500 mt-3">
                                        <p>⏰ All times in Cairo Time (GMT+2)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <h4 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    🔗 Quick Access
                                </h4>
                                <div className="space-y-2">
                                    {[
                                        { href: '/products', text: 'Product Catalog', icon: '📦' },
                                        { href: '/services', text: 'Manufacturing Services', icon: '🏭' },
                                        { href: '/about', text: 'About Our Factory', icon: '🏢' },
                                        { href: '/blog', text: 'Egyptian Heritage Blog', icon: '📚' },
                                    ].map((link, index) => (
                                        <Link key={index} href={link.href}>
                                            <motion.div 
                                                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-purple-50 hover:border-purple-200 border border-transparent transition-all duration-300 cursor-pointer"
                                                whileHover={{ x: 5, scale: 1.02 }}
                                            >
                                                <span className="text-lg">{link.icon}</span>
                                                <span className="text-gray-700 hover:text-purple-600 font-medium text-sm transition-colors">
                                                    {link.text}
                                                </span>
                                                <span className="ml-auto text-purple-400 text-sm">→</span>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
                                <h4 className="text-lg font-bold text-red-800 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    🚨 Urgent Inquiries
                                </h4>
                                <p className="text-red-700 mb-3 text-xs">
                                    For urgent manufacturing requests or time-sensitive orders:
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-red-600">📞</span>
                                        <a href="tel:+201002406013" className="text-red-800 font-semibold hover:text-red-600 text-sm">
                                            +20 100 240 6013
                                        </a>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-red-600">📧</span>
                                        <a href="mailto:ykp.supplies@gmail.com" className="text-red-800 font-semibold hover:text-red-600 text-sm">
                                            ykp.supplies@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                
                <div className="absolute inset-0 pointer-events-none">
                    {['𓂀', '𓁹', '𓋹', '𓊪', '𓈖'].map((hieroglyph, i) => (
                        <FloatingHieroglyphs
                            key={i}
                            className="absolute text-white/5 text-4xl font-bold"
                            style={{
                                left: `${10 + (i * 20)}%`,
                                top: `${20 + (i % 2) * 40}%`,
                                animationDelay: `${i * 0.8}s`
                            }}
                        >
                            {hieroglyph}
                        </FloatingHieroglyphs>
                    ))}
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-white"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                            Ready to Start Manufacturing?
                        </h2>
                        <p className="text-lg text-white/80 mb-6 max-w-3xl mx-auto">
                            Join 200+ partners worldwide who trust YKP Supplies for premium Egyptian travel pillows. 
                            Get your custom quote today.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <motion.a
                                href="tel:+201002406013"
                                className="bg-white text-purple-900 px-6 py-3 rounded-full font-semibold text-base hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>📞</span>
                                <span>Call Factory Now</span>
                            </motion.a>
                            <motion.a
                                href="mailto:ykp.supplies@gmail.com"
                                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold text-base hover:bg-white hover:text-purple-900 transition-all duration-300 flex items-center space-x-2"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>📧</span>
                                <span>Email Direct</span>
                            </motion.a>
                        </div>

                        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {[
                                { number: '50+', label: 'Countries Served' },
                                { number: '200+', label: 'Global Partners' },
                                { number: '24h', label: 'Response Time' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-center"
                                >
                                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                        {stat.number}
                                    </div>
                                    <div className="text-white/80 font-medium text-sm">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;