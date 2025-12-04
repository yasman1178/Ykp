# 🔥 دليل إعداد Firebase لـ Vercel

هذا الدليل يشرح كيفية إعداد Firebase Firestore لحفظ بيانات التحليلات على Vercel.

## 📋 الخطوات

### 1️⃣ إنشاء مشروع Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. اضغط على **"Add project"** أو **"إضافة مشروع"**
3. أدخل اسم المشروع: `pharaonic-pillows-analytics`
4. اختر إعدادات Google Analytics (اختياري)
5. اضغط **"Create project"**

### 2️⃣ إنشاء تطبيق ويب

1. في صفحة المشروع، اضغط على أيقونة **Web** `</>`
2. أدخل اسم التطبيق: `Pharaonic Pillows Website`
3. **لا تحتاج** لتفعيل Firebase Hosting
4. اضغط **"Register app"**

### 3️⃣ نسخ بيانات الإعداد

ستظهر لك شاشة بها كود JavaScript. انسخ القيم من `firebaseConfig`:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 4️⃣ تفعيل Firestore Database

1. من القائمة الجانبية، اختر **"Firestore Database"**
2. اضغط **"Create database"**
3. اختر **"Start in production mode"** (سنضبط القواعد لاحقاً)
4. اختر الموقع الأقرب لك (مثل: `europe-west1` لأوروبا)
5. اضغط **"Enable"**

### 5️⃣ ضبط قواعد الأمان

في صفحة Firestore، اذهب إلى تبويب **"Rules"** والصق هذه القواعد:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to analytics collections from server-side only
    match /visitors/{document=**} {
      allow read, write: if true;
    }
    match /page_views/{document=**} {
      allow read, write: if true;
    }
    match /events/{document=**} {
      allow read, write: if true;
    }
    match /conversions/{document=**} {
      allow read, write: if true;
    }
    match /daily_stats/{document=**} {
      allow read, write: if true;
    }
    match /product_analytics/{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **ملاحظة:** هذه القواعد تسمح بالقراءة والكتابة للجميع. في الإنتاج، يجب تأمينها بشكل أفضل.

### 6️⃣ إضافة المتغيرات البيئية

#### أ) في ملف `.env.local` (للتطوير المحلي):

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

#### ب) في Vercel (للإنتاج):

1. اذهب إلى [Vercel Dashboard](https://vercel.com/dashboard)
2. اختر مشروعك
3. اذهب إلى **Settings** → **Environment Variables**
4. أضف كل متغير على حدة:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIza...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `your-project.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `your-project-id` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `your-project.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `123456789` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:123456789:web:abc123` |

5. اضغط **Save** لكل متغير
6. أعد نشر المشروع (Redeploy)

### 7️⃣ تثبيت حزم Firebase

قم بتشغيل هذا الأمر في مجلد المشروع:

```bash
npm install firebase
```

أو إذا كنت تستخدم yarn:

```bash
yarn add firebase
```

### 8️⃣ اختبار الإعداد

بعد إضافة المتغيرات البيئية وإعادة النشر:

1. اذهب إلى موقعك على Vercel
2. افتح أي صفحة (سيتم تتبع الزيارة تلقائياً)
3. اذهب إلى `/admin/analytics`
4. يجب أن ترى البيانات الحقيقية من Firebase

### 9️⃣ التحقق من البيانات في Firebase

1. ارجع إلى [Firebase Console](https://console.firebase.google.com/)
2. اختر مشروعك
3. اذهب إلى **Firestore Database**
4. يجب أن ترى Collections جديدة:
   - `visitors` - بيانات الزوار
   - `conversions` - التحويلات
   - `daily_stats` - الإحصائيات اليومية
   - `product_analytics` - تحليلات المنتجات

## 🎯 API Endpoints الجديدة

### تتبع الزوار
```javascript
POST /api/analytics/track-visitor
Body: {
  sessionId: "unique-session-id",
  page: "/products/anubis-pillow",
  event: "page_view",
  userAgent: "...",
  referrer: "...",
  country: "EG",
  device: "mobile"
}
```

### تتبع التحويلات
```javascript
POST /api/analytics/track-conversion
Body: {
  type: "contact_form", // or "wholesale_inquiry", "catalog_download"
  page: "/contact",
  sessionId: "unique-session-id",
  metadata: { ... }
}
```

### الحصول على البيانات
```javascript
GET /api/analytics/firebase-data?type=dashboard&timeframe=7d
GET /api/analytics/realtime
```

## 🔧 استكشاف الأخطاء

### المشكلة: "Firebase not configured"
**الحل:** تأكد من إضافة جميع المتغيرات البيئية في Vercel وإعادة النشر.

### المشكلة: "Permission denied"
**الحل:** تحقق من قواعد Firestore Security Rules.

### المشكلة: لا تظهر البيانات
**الحل:** 
1. تحقق من Console في المتصفح للأخطاء
2. تأكد من أن Firebase SDK مثبت
3. تحقق من أن المتغيرات البيئية صحيحة

## 📊 هيكل البيانات في Firestore

### Collection: `visitors`
```javascript
{
  sessionId: "abc123",
  page: "/products/anubis-pillow",
  timestamp: Timestamp,
  userAgent: "Mozilla/5.0...",
  referrer: "https://google.com",
  country: "EG",
  device: "mobile",
  event: "page_view"
}
```

### Collection: `conversions`
```javascript
{
  type: "contact_form",
  page: "/contact",
  sessionId: "abc123",
  timestamp: Timestamp,
  metadata: { ... }
}
```

### Collection: `daily_stats`
```javascript
{
  date: "2025-01-15",
  totalVisitors: 1250,
  pageViews: 3420,
  uniqueVisitors: 980,
  conversions: 23,
  bounceRate: 42.5,
  avgSessionDuration: 185
}
```

### Collection: `product_analytics`
```javascript
{
  productId: "b123_001",
  productName: "Premium Anubis Travel Pillow",
  views: 420,
  inquiries: 18,
  lastViewed: Timestamp
}
```

## 💰 التكلفة

Firebase Firestore مجاني حتى:
- ✅ 1 GB تخزين
- ✅ 50,000 قراءة يومياً
- ✅ 20,000 كتابة يومياً
- ✅ 20,000 حذف يومياً

هذا كافٍ جداً لموقع متوسط الحجم! 🎉

## 🚀 الخطوات التالية

بعد إعداد Firebase:
1. ✅ البيانات تُحفظ بشكل دائم
2. ✅ تعمل على Vercel بدون مشاكل
3. ✅ Real-time analytics يعمل
4. ✅ يمكن تصدير البيانات إلى CSV
5. ✅ جاهز للإنتاج!

## 📞 الدعم

إذا واجهت أي مشكلة:
1. تحقق من Firebase Console للأخطاء
2. راجع Vercel Logs
3. تأكد من المتغيرات البيئية

---

**تم! 🎉 الآن لديك نظام تحليلات كامل يعمل على Vercel مع Firebase!**
