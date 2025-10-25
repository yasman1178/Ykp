# Egyptian Animations System

نظام شامل للرسوم المتحركة المصرية المستوحاة من التراث الفرعوني والتصميم الحديث.

## المكونات الرئيسية

### 1. الرسوم المتحركة الأساسية (EgyptianAnimations.tsx)

```tsx
import { CrystalReveal, PolygonHover, GoldenButton } from './animations';

// تأثير الكشف البلوري للصور
<CrystalReveal>
  <img src="/product.jpg" alt="منتج" />
</CrystalReveal>

// تأثير التمرير المضلع
<PolygonHover>
  <div>محتوى تفاعلي</div>
</PolygonHover>

// زر ذهبي متحرك
<GoldenButton onClick={handleClick}>
  اضغط هنا
</GoldenButton>
```

### 2. رسوم التحميل المصرية (EgyptianLoaders.tsx)

```tsx
import { ScarabLoader, PyramidLoader, HieroglyphWriter } from './animations';

// رسوم الجعران الطائر
<ScarabLoader size="large" />

// رسوم بناء الهرم
<PyramidLoader onComplete={() => console.log('مكتمل!')} />

// كتابة الهيروغليفية
<HieroglyphWriter 
  text="مرحباً بكم في موقعنا" 
  onComplete={() => console.log('انتهت الكتابة')}
/>
```

### 3. انتقالات الصفحات (PageTransitions.tsx)

```tsx
import { RouteTransition, PyramidRevealTransition } from './animations';

// انتقال تلقائي حسب المسار
<RouteTransition>
  <YourPageContent />
</RouteTransition>

// انتقال كشف الهرم
<PyramidRevealTransition>
  <YourPageContent />
</PyramidRevealTransition>
```

### 4. المكونات المتخصصة

```tsx
import { AnimatedProductCard, AnimatedHero } from './animations';

// بطاقة منتج متحركة
<AnimatedProductCard 
  product={productData}
  index={0}
/>

// قسم البطل المتحرك
<AnimatedHero
  title="عنوان رئيسي"
  subtitle="عنوان فرعي"
  ctaText="اضغط هنا"
  ctaAction={() => {}}
/>
```

## التحكم في الرسوم المتحركة

### استخدام المتحكم الرئيسي

```tsx
import { EgyptianAnimationController } from './animations';

function App() {
  return (
    <EgyptianAnimationController initialPreset="standard">
      <YourApp />
    </EgyptianAnimationController>
  );
}
```

### التحكم في التحميل

```tsx
import { usePageLoading } from './animations';

function MyComponent() {
  const { startLoading, stopLoading } = usePageLoading();
  
  const handleAction = async () => {
    startLoading();
    await performAction();
    stopLoading();
  };
}
```

## الأنماط المتاحة

### 1. النمط الأساسي (Minimal)
- رسوم تحميل فقط
- بدون انتقالات صفحات
- بدون تأثيرات التمرير

### 2. النمط القياسي (Standard)
- رسوم تحميل وانتقالات
- تأثيرات التمرير الأساسية
- بدون رسوم التمرير

### 3. النمط المحسن (Enhanced)
- جميع الرسوم المتحركة
- تأثيرات متقدمة
- رسوم التمرير

## إعدادات إمكانية الوصول

النظام يدعم تلقائياً:
- `prefers-reduced-motion` للمستخدمين الذين يفضلون تقليل الحركة
- إعدادات التباين العالي
- التنقل بلوحة المفاتيح

## الاستخدام في المشروع

1. استيراد الأنماط في `globals.css`:
```css
@import './egyptian-animations.css';
```

2. لف التطبيق بالمتحكم:
```tsx
import { EgyptianAnimationController } from './components/animations';

export default function App({ Component, pageProps }) {
  return (
    <EgyptianAnimationController>
      <Component {...pageProps} />
    </EgyptianAnimationController>
  );
}
```

3. استخدام المكونات في الصفحات:
```tsx
import { AnimatedHero, ScrollReveal } from './components/animations';

export default function HomePage() {
  return (
    <div>
      <AnimatedHero title="مرحباً" />
      <ScrollReveal>
        <section>محتوى يظهر عند التمرير</section>
      </ScrollReveal>
    </div>
  );
}
```

## الألوان والمتغيرات المصرية

```css
:root {
  --pharaonic-gold: #D4AF37;
  --deep-blue: #1E3A8A;
  --terracotta: #CD853F;
  --papyrus: #F5E6D3;
}
```

## الخطوط المدعومة

- **Amiri**: للنصوص العربية التراثية
- **Cairo**: للنصوص العربية الحديثة
- **Inter**: للنصوص الإنجليزية
- **Playfair Display**: للعناوين الفاخرة

## أمثلة الاستخدام

راجع ملف `examples/AnimatedHomePage.tsx` لمثال شامل على كيفية استخدام جميع المكونات معاً.