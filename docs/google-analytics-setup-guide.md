# دليل إعداد Google Analytics - خطوة بخطوة 🚀

## 🎯 **لا تقلق! سنعمل الخطوات سوياً**

### **المرحلة الأولى: إعداد Google Analytics (الأساسي)**

#### الخطوة 1: إنشاء حساب Google Analytics
1. **اذهب إلى:** https://analytics.google.com
2. **اضغط "Get started"**
3. **سجل دخول بحساب Gmail**
4. **اضغط "Start measuring"**

#### الخطوة 2: إعداد الحساب
```
Account Name: Pharaonic Pillows
Country: Egypt (أو بلدك)
```

#### الخطوة 3: إعداد الخاصية (Property)
```
Property Name: Pharaonic Pillows Website
Time Zone: (GMT+02:00) Cairo
Currency: Egyptian Pound - EGP
```

#### الخطوة 4: معلومات العمل
```
Industry: Manufacturing
Business Size: Small
Use of Analytics: Measure customer engagement
```

#### الخطوة 5: إعداد Data Stream
```
Platform: Web
Website URL: https://yoursite.com (أو localhost:3000 للتجريب)
Stream Name: Pharaonic Pillows Web
```

#### الخطوة 6: احصل على Measurement ID
- ستحصل على رقم مثل: `G-CN5G831QY0`
- **انسخ هذا الرقم!**

---

## 🎉 **توقف هنا! هذا كافي للبداية**

### **ضع الرقم في موقعك:**
```bash
# في ملف .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-CN5G831QY0
```

### **اختبر الموقع:**
1. شغل الموقع: `npm run dev`
2. اذهب إلى: `http://localhost:3000`
3. اقبل الكوكيز
4. تصفح بعض الصفحات
5. في Google Analytics اذهب إلى "Realtime" وستشوف نفسك!

---

## 🔧 **المرحلة الثانية: Google Analytics API (متقدم - اختياري)**

### **⚠️ هذه الخطوات معقدة - يمكنك تخطيها الآن**

#### لماذا تحتاج API؟
- لجلب البيانات في لوحة التحكم الخاصة بك
- لعمل تقارير مخصصة
- للحصول على بيانات تفصيلية

#### الخطوة 1: Google Cloud Console
1. **اذهب إلى:** https://console.cloud.google.com
2. **اضغط "Select a project"**
3. **اضغط "NEW PROJECT"**
4. **اسم المشروع:** `pharaonic-pillows-analytics`
5. **اضغط "CREATE"**

#### الخطوة 2: تفعيل API
1. **في القائمة الجانبية:** APIs & Services > Library
2. **ابحث عن:** "Google Analytics Reporting API"
3. **اضغط عليه واضغط "ENABLE"**
4. **ابحث عن:** "Google Analytics Data API"
5. **اضغط عليه واضغط "ENABLE"**

#### الخطوة 3: إنشاء Service Account
1. **اذهب إلى:** APIs & Services > Credentials
2. **اضغط "CREATE CREDENTIALS"**
3. **اختر "Service account"**
4. **اسم الحساب:** `pharaonic-analytics`
5. **اضغط "CREATE AND CONTINUE"**
6. **Role:** اختر "Viewer"
7. **اضغط "DONE"**

#### الخطوة 4: إنشاء مفتاح JSON
1. **اضغط على Service Account الذي أنشأته**
2. **اذهب إلى تبويب "KEYS"**
3. **اضغط "ADD KEY" > "Create new key"**
4. **اختر "JSON"**
5. **اضغط "CREATE"**
6. **سيتم تحميل ملف JSON - احتفظ به!**

#### الخطوة 5: ربط Service Account بـ Google Analytics
1. **ارجع إلى Google Analytics**
2. **اذهب إلى Admin (الترس)**
3. **في Property Access Management**
4. **اضغط "+" لإضافة مستخدم**
5. **ضع email الـ Service Account**
6. **اعطه صلاحية "Viewer"**

---

## 🎯 **الطريقة السهلة (بدون API)**

### **استخدم Google Analytics مباشرة:**
1. **اذهب إلى:** https://analytics.google.com
2. **شوف التقارير هناك**
3. **لوحة التحكم في موقعك ستعرض بيانات تجريبية**

### **مميزات هذه الطريقة:**
- ✅ سهلة وسريعة
- ✅ لا تحتاج إعدادات معقدة
- ✅ Google Analytics يعطيك كل التقارير
- ✅ موقعك يعمل بشكل طبيعي

---

## 🚀 **خطة العمل المقترحة:**

### **الآن (5 دقائق):**
1. أنشئ حساب Google Analytics
2. احصل على Measurement ID
3. ضعه في `.env.local`
4. جرب الموقع

### **لاحقاً (عند الحاجة):**
1. اعمل Google Analytics API
2. فعّل البيانات الحقيقية في لوحة التحكم

---

## 🆘 **محتاج مساعدة؟**

### **مشاكل شائعة:**
- **لا أرى بيانات:** انتظر 24-48 ساعة
- **الموقع محلي:** استخدم localhost:3000 في الإعداد
- **مشاكل في الكوكيز:** تأكد من قبول الكوكيز

### **بدائل سهلة:**
- استخدم Google Analytics مباشرة
- اتركه على البيانات التجريبية حالياً
- ركز على تطوير الموقع أولاً

---

## 📞 **تواصل معي إذا احتجت مساعدة في أي خطوة!**