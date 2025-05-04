# تعليمات تفصيلية للنشر على Vercel

## المتطلبات
1. حساب على Vercel
2. قاعدة بيانات PostgreSQL (يمكن استخدام Neon.tech)
3. مستودع على GitHub

## خطوات النشر على Vercel

### 1. تحضير المشروع
- تأكد من أن لديك ملف `package-vercel.json` في المشروع (سنستخدمه كمرجع)
- تأكد من وجود ملف `vercel.json` في المشروع

### 2. إعداد مشروع جديد في Vercel
1. سجل دخول إلى حسابك على Vercel
2. انقر على "Add New" ثم "Project"
3. اختر المستودع من GitHub
4. في صفحة إعداد المشروع:
   - **Framework Preset**: انقر على "Other"
   - **Build Command**: اكتب `npm run build`
   - **Output Directory**: اكتب `dist`
   - **Install Command**: اترك الإعداد الافتراضي (`npm install`)

### 3. إعداد المتغيرات البيئية
في قسم "Environment Variables"، أضف المتغيرات التالية:

```
DATABASE_URL=postgresql://...  (رابط قاعدة البيانات PostgreSQL)
NODE_ENV=production
SESSION_SECRET=... (كلمة سر عشوائية طويلة)
OPENAI_API_KEY=... (مفتاح API من OpenAI)
PAYPAL_CLIENT_ID=... (معرف عميل PayPal)
PAYPAL_CLIENT_SECRET=... (كلمة سر عميل PayPal)
```

### 4. حل مشكلة 404
إذا واجهت خطأ 404 بعد النشر:

1. **تحقق من ملف `vercel.json`**: تأكد من أن الإعدادات صحيحة كما في المشروع الحالي
2. **تحقق من مسار البناء**: تأكد من أن المخرجات تذهب إلى مجلد `dist`
3. **تعديل قواعد التوجيه**: قد تحتاج إلى تعديل قواعد التوجيه في `vercel.json`

### 5. استخدام قاعدة بيانات متوافقة
- يوصى باستخدام Neon.tech لقاعدة بيانات PostgreSQL
- تأكد من أن CONNECTION_STRING صحيح وأن قاعدة البيانات تقبل اتصالات من Vercel

### 6. التحقق من السجلات
- إذا استمرت المشكلة، تحقق من السجلات في لوحة تحكم Vercel
- انتقل إلى Deployments -> أحدث نشر -> Functions Log

### 7. إعادة النشر
بعد إجراء التغييرات:
1. قم بتحديث المستودع على GitHub
2. سيقوم Vercel تلقائيًا ببدء عملية نشر جديدة
3. يمكنك أيضًا النقر على "Redeploy" في لوحة التحكم