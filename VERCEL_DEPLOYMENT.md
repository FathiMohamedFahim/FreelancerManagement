# تعليمات تفصيلية للنشر على Vercel

## المتطلبات
1. حساب على Vercel
2. قاعدة بيانات PostgreSQL (يُوصى باستخدام Neon.tech)
3. مستودع على GitHub

## خطوات النشر على Vercel

### 1. تحضير المشروع
- تأكد من وجود الملفات التالية في المشروع:
  - `vercel.json` (لتوجيه المسارات)
  - `api/adapter.js` و `api/index.js` (للاستجابة للطلبات عبر Serverless Functions)

### 2. إعداد مشروع جديد في Vercel
1. سجل دخول إلى حسابك على Vercel
2. انقر على "Add New" ثم "Project"
3. اختر المستودع من GitHub
4. في صفحة إعداد المشروع:
   - **Framework Preset**: حدد "Other"
   - **Build Command**: اكتب `npm run build`
   - **Output Directory**: اكتب `dist`
   - **Install Command**: اترك الإعداد الافتراضي (`npm install`)
   - **Root Directory**: اترك الإعداد الافتراضي (/)

### 3. إعداد المتغيرات البيئية
في قسم "Environment Variables"، أضف المتغيرات التالية:

```
DATABASE_URL=postgresql://...  (رابط قاعدة البيانات PostgreSQL)
NODE_ENV=production
SESSION_SECRET=... (كلمة سر عشوائية طويلة)
OPENAI_API_KEY=... (مفتاح API من OpenAI)
PAYPAL_CLIENT_ID=... (معرف عميل PayPal)
PAYPAL_CLIENT_SECRET=... (كلمة سر عميل PayPal)
PORT=8080 (منفذ محدد للخادم)
```

### 4. حل مشكلة 404
إذا واجهت خطأ 404 بعد النشر، اتبع هذه الخطوات:

1. **تحقق من ملف `vercel.json`**:
   - تأكد من تضمين جميع أنواع الملفات في قواعد التوجيه (JS, CSS, SVG, PNG, etc.)
   - تأكد من وجود قاعدة التوجيه "*" التي تعيد توجيه جميع المسارات غير المعروفة إلى `index.html`

2. **تحقق من محتويات مجلد `dist`**:
   - قم بتنزيل نسخة من النشر (من قسم "Sources" في لوحة تحكم Vercel)
   - تأكد من وجود ملف `index.html` في الجذر
   - تأكد من أن ملفات JS و CSS تحتوي على المسارات الصحيحة

3. **تحقق من قواعد CORS**:
   - تأكد من أن النطاقات المسموح بها في `server/index.ts` تتضمن نطاق موقعك على Vercel

4. **تأكد من وجود ملفات api/**:
   - ملف `api/index.js` يوجه الطلبات إلى خادم Express
   - ملف `api/adapter.js` يوفر وظيفة serverless

### 5. استخدام قاعدة بيانات متوافقة
- يُوصى باستخدام Neon.tech لقاعدة بيانات PostgreSQL
- تأكد من إعدادات الأمان للسماح بالوصول من خوادم Vercel
- تأكد من تنفيذ أمر `npm run db:push` لإنشاء الجداول قبل النشر

### 6. التحقق من السجلات والتصحيح
- تحقق من سجلات Function Logs في Vercel:
  - انتقل إلى Deployments -> أحدث نشر -> Functions Log
- راجع سجلات الأخطاء التفصيلية في:
  - انتقل إلى Settings -> Functions -> Logs

### 7. تكوين مخصص لـ Vercel
يمكنك استخدام الملف `vercel.json` لتخصيص سلوك النشر:

```json
{
  "version": 2,
  "framework": null,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.ts"
    },
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/(.*).js",
      "dest": "/$1.js"
    },
    {
      "src": "/(.*).css",
      "dest": "/$1.css"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "outputDirectory": "dist"
}
```

### 8. إعادة النشر
بعد إجراء التغييرات:
1. قم بتحديث المستودع على GitHub
2. سيقوم Vercel تلقائيًا ببدء عملية نشر جديدة
3. يمكنك أيضًا النقر على "Redeploy" في لوحة التحكم

### 9. الفحص النهائي
- تصفح التطبيق المنشور على النطاق الذي وفرته Vercel
- تحقق من أن ملف `index.html` يتم تحميله بشكل صحيح
- تحقق من أن الطلبات API إلى `/api/*` تعمل بشكل صحيح
- تحقق من أن المسارات المختلفة في التطبيق (كتلك المُدارة بواسطة التوجيه على الجانب العميل) تعمل بشكل صحيح