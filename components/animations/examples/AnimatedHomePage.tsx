/**
 * Example: Animated Home Page with Egyptian animations
 * Demonstrates usage of all animation components
 */

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  AnimatedHero,
  AnimatedSectionHeader,
  AnimatedProductGrid,
  StaggerContainer,
  StaggerItem,
  FloatingCard,
  GoldenButton,
  ScrollReveal,
  usePageLoading
} from '../index';

// Sample product data
const sampleProducts = [
  {
    id: '1',
    name: 'مخدة سفر أنوبيس',
    category: 'Premium Collection',
    image: '/prodect/b123/1.webp',
    description: 'مخدة سفر فاخرة مستوحاة من   الموت المصري أنوبيس',
    pharaonicSymbols: ['أنوبيس', 'الجعران']
  },
  {
    id: '2',
    name: 'مخدة عين حورس',
    category: 'Classic Collection',
    image: '/prodect/t/1.webp',
    description: 'مخدة مريحة برمز عين حورس للحماية والقوة',
    pharaonicSymbols: ['عين حورس']
  },
  {
    id: '3',
    name: 'مخدة الهرم الذهبي',
    category: 'Heritage Collection',
    image: '/prodect/tb/1.webp',
    description: 'تصميم هرمي كلاسيكي يرمز للخلود والعظمة',
    pharaonicSymbols: ['الهرم', 'الذهب']
  }
];

export const AnimatedHomePage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { startLoading, stopLoading } = usePageLoading();

  useEffect(() => {
    // Simulate page loading
    startLoading();
    const timer = setTimeout(() => {
      stopLoading();
      setIsLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [startLoading, stopLoading]);

  const handleCTAClick = () => {
    console.log('CTA clicked - navigate to products');
  };

  if (!isLoaded) {
    return null; // Loading handled by EgyptianAnimationController
  }

  return (
    <div className="animated-home-page">
      {/* Hero Section with Egyptian animations */}
      <AnimatedHero
        title="مخدات السفر الفرعونية"
        subtitle="تراث مصري أصيل"
        description="اكتشف مجموعتنا الفريدة من مخدات السفر المصنوعة من الميموري فوم والمستوحاة من الحضارة الفرعونية العريقة"
        ctaText="استكشف المنتجات"
        ctaAction={handleCTAClick}
        backgroundImage="/bg-explosion.png"
        className="home-hero"
      />

      {/* Features Section */}
      <ScrollReveal direction="up" delay={0.2}>
        <section className="features-section py-20">
          <div className="container mx-auto px-4">
            <AnimatedSectionHeader
              title="لماذا تختار مخداتنا الفرعونية؟"
              subtitle="الجودة والتراث"
              description="نجمع بين الحرفية المصرية التقليدية والتكنولوجيا الحديثة"
            />

            <StaggerContainer className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <StaggerItem>
                <FloatingCard className="feature-card p-6 text-center">
                  <div className="feature-icon text-4xl mb-4">🏺</div>
                  <h3 className="feature-title text-xl font-bold mb-2">تراث أصيل</h3>
                  <p className="feature-description">
                    تصاميم مستوحاة من الرموز الفرعونية الأصيلة
                  </p>
                </FloatingCard>
              </StaggerItem>

              <StaggerItem>
                <FloatingCard className="feature-card p-6 text-center">
                  <div className="feature-icon text-4xl mb-4">🛏️</div>
                  <h3 className="feature-title text-xl font-bold mb-2">راحة فائقة</h3>
                  <p className="feature-description">
                    مصنوعة من الميموري فوم عالي الجودة
                  </p>
                </FloatingCard>
              </StaggerItem>

              <StaggerItem>
                <FloatingCard className="feature-card p-6 text-center">
                  <div className="feature-icon text-4xl mb-4">🌍</div>
                  <h3 className="feature-title text-xl font-bold mb-2">توزيع عالمي</h3>
                  <p className="feature-description">
                    نرحب بالشراكات الدولية والتوزيع بالجملة
                  </p>
                </FloatingCard>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>
      </ScrollReveal>

      {/* Products Section */}
      <ScrollReveal direction="up" delay={0.4}>
        <section className="products-section py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <AnimatedSectionHeader
              title="مجموعاتنا المميزة"
              subtitle="منتجات مختارة"
              description="اكتشف تشكيلة واسعة من المخدات المستوحاة من الحضارة المصرية"
            />

            <div className="mt-12">
              <AnimatedProductGrid 
                products={sampleProducts}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              />
            </div>

            <div className="text-center mt-12">
              <GoldenButton className="view-all-btn">
                عرض جميع المنتجات
              </GoldenButton>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* About Section */}
      <ScrollReveal direction="left" delay={0.6}>
        <section className="about-section py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="about-content">
                <AnimatedSectionHeader
                  title="حرفية مصرية أصيلة"
                  subtitle="من قلب مصر"
                  description="نحن شركة مصرية متخصصة في تصنيع مخدات السفر الفاخرة المستوحاة من التراث الفرعوني"
                  alignment="left"
                />

                <StaggerContainer className="about-features mt-8">
                  <StaggerItem>
                    <div className="feature-item flex items-center mb-4">
                      <span className="feature-bullet text-2xl mr-4">𓂀</span>
                      <span>تصنيع محلي بجودة عالمية</span>
                    </div>
                  </StaggerItem>
                  
                  <StaggerItem>
                    <div className="feature-item flex items-center mb-4">
                      <span className="feature-bullet text-2xl mr-4">𓅃</span>
                      <span>مواد خام عالية الجودة</span>
                    </div>
                  </StaggerItem>
                  
                  <StaggerItem>
                    <div className="feature-item flex items-center mb-4">
                      <span className="feature-bullet text-2xl mr-4">𓋹</span>
                      <span>تصاميم فرعونية أصيلة</span>
                    </div>
                  </StaggerItem>
                </StaggerContainer>

                <div className="mt-8">
                  <GoldenButton className="learn-more-btn">
                    اعرف المزيد عنا
                  </GoldenButton>
                </div>
              </div>

              <div className="about-image">
                <FloatingCard className="image-container">
                  <Image
                    src="/pillowindex.png"
                    alt="Egyptian Pillows"
                    width={500}
                    height={350}
                    className="w-full h-auto rounded-lg"
                  />
                </FloatingCard>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal direction="up" delay={0.8}>
        <section className="cta-section py-20 bg-gradient-to-r from-blue-900 to-yellow-600">
          <div className="container mx-auto px-4 text-center">
            <AnimatedSectionHeader
              title="ابدأ شراكتك معنا اليوم"
              subtitle="للموزعين والشركاء"
              description="انضم إلى شبكة موزعينا العالمية واستفد من منتجاتنا الفريدة"
              className="text-white"
            />

            <div className="mt-8">
              <GoldenButton className="partnership-btn text-lg px-8 py-4">
                طلب شراكة
              </GoldenButton>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};