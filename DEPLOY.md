# Инструкции по деплою

## ✅ Завершено

- GitHub репозиторий: https://github.com/Cryptohawk3s/BeautyLanding
- Код запушен в main
- vercel.json настроен

## 🚀 Vercel Deploy (Frontend)

1. Перейдите на https://vercel.com/dashboard
2. Нажмите **Add New** → **Project**
3. Import Git Repository → выберите **BeautyLanding**
4. Настройки (должны определиться автоматически из vercel.json):
   - Framework Preset: **Vite**
   - Root Directory: **frontend**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Environment Variables:
   - `VITE_API_URL` = `https://your-backend.railway.app/api` (добавите после Railway)
6. Нажмите **Deploy**

## 🚂 Railway Deploy (Backend)

1. Перейдите на https://railway.app/dashboard
2. Нажмите **New Project** → **Deploy from GitHub repo**
3. Выберите **BeautyLanding**
4. Настройки:
   - Root Directory: **backend**
   - Start Command: `npm start`
5. Environment Variables (добавьте все из backend/.env):
   ```
   PORT=3000
   DATABASE_URL=postgresql://postgres.brwkqtwwcfribgwxejmi:Sambuka4720168!@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
   JWT_SECRET=beautylanding-secret-key-change-in-production-2026
   CLOUDINARY_CLOUD_NAME=dfm2tjvc3
   CLOUDINARY_API_KEY=181377636989298
   CLOUDINARY_API_SECRET=lVxSzjObRdK283G9Z-7wamfjuC4
   ```
6. Deploy

## 🔄 После деплоя

1. Скопируйте URL Railway backend (например: `https://beautylanding-production.up.railway.app`)
2. Обновите в Vercel: `VITE_API_URL` = `https://your-backend-url/api`
3. Redeploy frontend в Vercel

## ✅ Проверка

- Frontend: https://beautylanding.vercel.app
- Backend: https://your-backend.railway.app/api/health
