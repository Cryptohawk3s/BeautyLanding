---
phase: 1
title: Инфраструктура и настройка проекта
status: research
created: 2026-05-18
---

# Исследование для Phase 1: Инфраструктура и настройка проекта

## 🎯 Цель исследования

Определить оптимальный технологический стек и подходы к настройке инфраструктуры для начинающего разработчика с учетом:
- Бюджет: $0 (только free tier)
- Срок: 3-5 дней на настройку
- Опыт: начинающий уровень
- Требования: React + Node.js + PostgreSQL

## 📋 Ключевые вопросы

1. Какой инструмент использовать для создания React приложения? (Vite vs CRA vs Next.js)
2. Нужен ли TypeScript для начинающего или лучше JavaScript?
3. Какой хостинг выбрать для frontend и backend с free tier?
4. Как организовать монорепо или использовать отдельные репозитории?
5. Какие инструменты для CI/CD проще всего настроить?

## 🔍 Результаты исследования

### 1. Frontend Setup: Vite vs CRA vs Next.js

**Рекомендация: Vite ✅**

**Причины:**
- **Скорость:** Vite значительно быстрее CRA (HMR за миллисекунды)
- **Современность:** Использует ES modules, поддержка из коробки
- **Простота:** Минимальная конфигурация для старта
- **Размер:** Меньший bundle size
- **CRA устарел:** React команда больше не рекомендует CRA

**Почему не Next.js:**
- Избыточен для простого SPA
- SSR не нужен для редактора лендингов
- Сложнее для начинающего
- Можно мигрировать позже если понадобится

**Команда для старта:**
```bash
npm create vite@latest frontend -- --template react
```

### 2. TypeScript vs JavaScript

**Рекомендация: JavaScript для MVP, TypeScript позже ⚠️**

**Аргументы ЗА JavaScript:**
- Быстрее начать для начинающего
- Меньше времени на изучение типов
- Проще отладка на старте
- Можно мигрировать постепенно

**Аргументы ЗА TypeScript:**
- Меньше багов в продакшене
- Лучший DX (автокомплит, рефакторинг)
- Проще поддерживать код
- Стандарт индустрии

**Компромисс:**
- Начать с JavaScript
- Добавить TypeScript после Phase 2-3
- Использовать JSDoc для базовой типизации

### 3. Hosting: Free Tier Options

#### Frontend Hosting

**Рекомендация: Vercel ✅**

| Сервис | Free Tier | Плюсы | Минусы |
|--------|-----------|-------|--------|
| **Vercel** | 100GB bandwidth, unlimited deploys | Автодеплой из GitHub, отличный DX, быстрый CDN | Ограничения на serverless functions |
| Netlify | 100GB bandwidth, 300 build minutes | Хорошая документация, forms из коробки | Медленнее Vercel |
| Cloudflare Pages | Unlimited bandwidth | Самый быстрый CDN, unlimited | Сложнее настройка |
| GitHub Pages | Unlimited | Бесплатно, просто | Только статика, нет SPA routing |

**Выбор: Vercel**
- Лучший DX для React
- Автодеплой из GitHub
- Отличная документация
- Preview deployments для PR

#### Backend Hosting

**Рекомендация: Railway ✅**

| Сервис | Free Tier | Плюсы | Минусы |
|--------|-----------|-------|--------|
| **Railway** | $5 credit/month | Простая настройка, PostgreSQL included, logs | Кредиты могут закончиться |
| Render | 750 hours/month | Бесплатный PostgreSQL, автодеплой | Засыпает после 15 мин неактивности |
| Fly.io | 3 VMs free | Хорошая производительность | Сложнее настройка |
| Heroku | Eco plan $5/month | Проверенное решение | Больше не бесплатно |

**Выбор: Railway**
- Проще всего для начинающего
- PostgreSQL из коробки
- Не засыпает как Render
- $5/месяц хватит для MVP

**Альтернатива:** Render (если нужно 100% бесплатно, но с засыпанием)

#### Database Hosting

**Рекомендация: Supabase ✅**

| Сервис | Free Tier | Плюсы | Минусы |
|--------|-----------|-------|--------|
| **Supabase** | 500MB, 2 projects | PostgreSQL, auth из коробки, realtime | Ограничение 500MB |
| Neon | 3GB, 10 branches | Serverless PostgreSQL, branching | Новый сервис |
| PlanetScale | 5GB, 1 database | MySQL, branching, scaling | MySQL вместо PostgreSQL |
| Railway | Included | Вместе с backend | Использует кредиты |

**Выбор: Supabase**
- Бесплатный PostgreSQL
- 500MB хватит для MVP
- Можно использовать auth (опционально)
- Отличная документация

### 4. Монорепо vs Отдельные репозитории

**Рекомендация: Монорепо ✅**

**Структура:**
```
BeautyLanding/
├── .planning/          # GSD артефакты
├── frontend/           # React приложение
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/            # Node.js API
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── tsconfig.json (опционально)
├── shared/             # Общие типы (если TypeScript)
├── package.json        # Root package.json
└── README.md
```

**Плюсы монорепо:**
- Один git репозиторий
- Проще синхронизация версий
- Shared код в одном месте
- Проще для начинающего

**Инструменты:**
- **Простой подход:** npm workspaces (встроено в npm 7+)
- **Продвинутый:** Turborepo, Nx (избыточно для MVP)

**Настройка npm workspaces:**
```json
{
  "name": "beautylanding",
  "private": true,
  "workspaces": [
    "frontend",
    "backend"
  ]
}
```

### 5. CI/CD Setup

**Рекомендация: GitHub Actions ✅**

**Почему:**
- Бесплатно для публичных репозиториев
- 2000 минут/месяц для приватных
- Интеграция с GitHub
- Простые YAML конфиги

**Базовый workflow:**
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      # Vercel автодеплой из GitHub
  
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      # Railway автодеплой из GitHub
```

**Альтернативы:**
- Vercel/Railway встроенный CI (проще, но меньше контроля)
- GitLab CI (если используете GitLab)

### 6. File Storage: Cloudinary

**Рекомендация: Cloudinary ✅**

**Free Tier:**
- 25 GB storage
- 25 GB bandwidth/month
- Автоматическая оптимизация
- Трансформации изображений

**Альтернативы:**
- AWS S3 (сложнее настройка)
- Supabase Storage (5GB free)
- Uploadcare (3GB free)

**Выбор: Cloudinary**
- Самый щедрый free tier
- Простая интеграция
- Автооптимизация изображений
- Отличная документация

### 7. Environment Variables Management

**Рекомендация: .env файлы + Vercel/Railway UI**

**Локальная разработка:**
```bash
# .env.local (не коммитить!)
DATABASE_URL=postgresql://...
CLOUDINARY_API_KEY=...
JWT_SECRET=...
```

**Production:**
- Vercel: через UI или CLI
- Railway: через UI
- Никогда не коммитить секреты в git

**Инструменты:**
- dotenv (Node.js)
- Vite env variables (import.meta.env)

### 8. Code Quality Tools

**Рекомендация для MVP:**

**Обязательно:**
- ✅ Prettier — форматирование кода
- ✅ ESLint — базовые правила
- ✅ .editorconfig — консистентность

**Опционально (можно добавить позже):**
- Husky + lint-staged (pre-commit hooks)
- Commitlint (conventional commits)
- Jest (тестирование)

**Конфигурация:**
```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

## 📦 Итоговый стек для Phase 1

### Frontend
- **Build tool:** Vite
- **Framework:** React 18
- **Styling:** Tailwind CSS
- **State:** Zustand
- **Routing:** React Router v6
- **Forms:** React Hook Form
- **HTTP:** Axios
- **Hosting:** Vercel

### Backend
- **Runtime:** Node.js 20 LTS
- **Framework:** Express.js
- **Language:** JavaScript (TypeScript позже)
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Auth:** JWT + bcrypt
- **File Upload:** Multer + Cloudinary
- **Hosting:** Railway

### DevOps
- **Version Control:** Git + GitHub
- **CI/CD:** GitHub Actions (или встроенный Vercel/Railway)
- **Monitoring:** Sentry (free tier)
- **Analytics:** Google Analytics 4

### Development Tools
- **Package Manager:** npm (встроенные workspaces)
- **Code Quality:** Prettier + ESLint
- **Environment:** dotenv

## ⚠️ Потенциальные проблемы и решения

### 1. Railway кредиты закончились
**Решение:** Мигрировать на Render (бесплатно, но засыпает)

### 2. Supabase 500MB недостаточно
**Решение:** Оптимизация изображений, хранение в Cloudinary, не в БД

### 3. Сложности с Prisma
**Решение:** Использовать Prisma Studio для визуализации, хорошая документация

### 4. CORS ошибки
**Решение:** Правильная настройка CORS middleware в Express

### 5. Environment variables не работают
**Решение:** Проверить .env.local, перезапустить dev server

## 📚 Ресурсы для изучения

### Официальная документация
- Vite: https://vitejs.dev
- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Prisma: https://www.prisma.io/docs
- Vercel: https://vercel.com/docs
- Railway: https://docs.railway.app

### Туториалы
- Vite + React setup: https://vitejs.dev/guide/
- Prisma quickstart: https://www.prisma.io/docs/getting-started
- Express.js guide: https://expressjs.com/en/starter/installing.html

### Видео (опционально)
- "Vite in 100 Seconds" — Fireship
- "Prisma in 100 Seconds" — Fireship

## ✅ Чек-лист для Phase 1

### Локальная разработка
- [ ] Node.js 20 установлен
- [ ] npm workspaces настроены
- [ ] Frontend запускается (npm run dev)
- [ ] Backend запускается (npm run dev)
- [ ] База данных подключена
- [ ] Prettier и ESLint работают

### Деплой
- [ ] GitHub репозиторий создан
- [ ] Vercel проект создан и подключен
- [ ] Railway проект создан и подключен
- [ ] Supabase проект создан
- [ ] Cloudinary аккаунт создан
- [ ] Environment variables настроены
- [ ] Автодеплой работает

### Тестирование
- [ ] Frontend открывается по URL
- [ ] Backend API отвечает
- [ ] База данных доступна
- [ ] Загрузка файлов работает

## 🎯 Оценка времени

**Оптимистичная:** 9 часов (3 дня по 3 часа)  
**Реалистичная:** 15 часов (3-4 дня по 3-5 часов)  
**Пессимистичная:** 25 часов (5 дней по 5 часов)

**Рекомендация:** Заложить 15-20 часов с учетом обучения

---

**Статус:** Исследование завершено  
**Следующий шаг:** Создать детальный PLAN.md на основе этого исследования
