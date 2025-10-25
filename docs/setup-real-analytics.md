# إعداد البيانات الحقيقية - دليل شامل

## 🎯 لماذا البيانات وهمية الآن؟

حالياً الموقع يعرض بيانات وهمية لأن:
- لا يوجد زوار حقيقيون بعد
- لم يتم إعداد Google Analytics API
- الموقع في مرحلة التطوير

## 📊 مصادر البيانات

### 1. البيانات الوهمية (الحالية)
```javascript
// في lib/analytics-dashboard.ts
const totalVisitors = 1250;  // رقم ثابت
const b2bLeads = 23;         // رقم ثابت
```

### 2. البيانات الحقيقية (بعد الإعداد)
- من Google Analytics مباشرة
- من قاعدة بيانات الموقع
- من أحداث المستخدمين الفعلية

## 🔧 خطوات الحصول على بيانات حقيقية

### الخطوة 1: إعداد Google Analytics
1. اذهب إلى [Google Analytics](https://analytics.google.com)
2. أنشئ حساب جديد
3. احصل على Measurement ID (مثل G-CN5G831QY0)
4. ضعه في `.env.local`

### الخطوة 2: إعداد Google Analytics API
1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com)
2. أنشئ مشروع جديد
3. فعّل Google Analytics Reporting API
4. أنشئ Service Account
5. حمّل ملف JSON للمفاتيح

### الخطوة 3: إضافة المتغيرات
```bash
# في .env.local
GA_PROPERTY_ID=123456789
GA_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
GA_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
```

### الخطوة 4: نشر الموقع
- رفع الموقع على الإنترنت
- بدء استقبال زوار حقيقيين
- تجميع البيانات لمدة 24-48 ساعة

## 📈 كيف تعمل البيانات الحقيقية

### تتبع الزائر
```javascript
// عند زيارة الموقع
gtag('event', 'page_view', {
  page_title: 'الصفحة الرئيسية',
  page_location: window.location.href
});
```

### جلب البيانات
```javascript
// من Google Analytics API
const visitors = await analytics.getVisitors();
const pageViews = await analytics.getPageViews();
```

### عرض البيانات
```javascript
// في لوحة التحكم
<div>الزوار: {visitors}</div>
<div>المشاهدات: {pageViews}</div>
```

## 🎭 البيانات الوهمية مفيدة لـ:
- اختبار التصميم
- عرض الوظائف للعملاء
- التطوير والتجريب
- التدريب على النظام

## 📊 البيانات الحقيقية تأتي من:
- زوار الموقع الفعليين
- Google Analytics
- أحداث التفاعل (النقرات، النماذج)
- قاعدة البيانات المحلية

## ⏰ متى ستظهر البيانات الحقيقية؟
- فوراً: عدد الزوار الحاليين
- خلال ساعة: الجلسات والصفحات
- خلال 24 ساعة: التقارير المفصلة
- خلال أسبوع: الاتجاهات والأنماط

## 🔄 التبديل بين البيانات
في لوحة التحكم:
- 📊 **بيانات حقيقية**: من Google Analytics
- 🎭 **بيانات تجريبية**: أرقام وهمية للعرض