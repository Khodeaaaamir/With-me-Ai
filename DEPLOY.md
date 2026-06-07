# راهنمای آپلود روی Vercel

## ساختار پروژه
withme-site/
├── index.html       ← سایت اصلی
├── vercel.json      ← تنظیمات Vercel
└── api/
    └── chat.js      ← backend چت‌بات (API Key اینجاست)

---

## مرحله ۱ — GitHub
1. برو به github.com → ثبت‌نام کن
2. روی "New repository" کلیک کن
3. اسم: withme-ai → Create repository
4. فایل‌های زیر رو آپلود کن:
   - index.html
   - vercel.json
   - پوشه api (با chat.js داخلش)

## مرحله ۲ — Vercel
1. برو به vercel.com → Sign up with GitHub
2. روی "Add New Project" کلیک کن
3. repo withme-ai رو انتخاب کن → Import
4. روی Deploy کلیک کن

## مرحله ۳ — API Key (مهم!)
1. توی Vercel → Settings → Environment Variables
2. اضافه کن:
   - Name:  ANTHROPIC_API_KEY
   - Value: sk-ant-... (کلیدت از console.anthropic.com)
3. روی Save کلیک کن
4. برگرد به Deployments → Redeploy

## تمام!
سایتت روی آدرسی مثل withme-ai.vercel.app زنده میشه
دوستات بدون نیاز به API Key می‌تونن چت کنن.

---

## API Key رایگان چطور بگیری؟
1. برو console.anthropic.com
2. ثبت‌نام کن
3. API Keys → Create Key
4. کلید رو کپی کن و توی Vercel وارد کن
