---
phase: 1
title: Инфраструктура и настройка проекта
status: ready
created: 2026-05-18
estimated_hours: 15-20
---

# План Phase 1: Инфраструктура и настройка проекта

## 🎯 Цель фазы

Настроить полное окружение разработки с работающим деплоем на production.

**Критерии успеха:**
- ✅ Frontend и Backend запускаются локально
- ✅ База данных подключена и работает
- ✅ Автодеплой на Vercel и Railway настроен
- ✅ Загрузка файлов в Cloudinary работает

## 📋 Задачи

### Task 1.1: Инициализация монорепо

**Приоритет:** Critical  
**Время:** 1-2 часа  
**Зависимости:** Нет

**Что делать:**

1. Создать структуру монорепо:
```bash
mkdir -p frontend backend shared docs scripts
```

2. Инициализировать root package.json с workspaces:
```json
{
  "name": "beautylanding",
  "version": "0.1.0",
  "private": true,
  "workspaces": [
    "frontend",
    "backend"
  ],
  "scripts": {
    "dev": "npm run dev --workspaces",
    "build": "npm run build --workspaces",
    "test": "npm run test --workspaces"
  }
}
```

3. Создать .gitignore:
```
node_modules/
.env
.env.local
dist/
build/
.DS_Store
*.log
.vercel
.railway
```

4. Создать .editorconfig:
```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
```

5. Создать README.md с инструкциями по запуску

**Acceptance Criteria:**
- [ ] Структура папок создана
- [ ] package.json с workspaces настроен
- [ ] .gitignore создан
- [ ] .editorconfig создан
- [ ] README.md с инструкциями

**Команды:**
```bash
npm init -y
# Отредактировать package.json
touch .gitignore .editorconfig README.md
```

---

### Task 1.2: Настройка Frontend (Vite + React)

**Приоритет:** Critical  
**Время:** 2-3 часа  
**Зависимости:** Task 1.1

**Что делать:**

1. Создать React приложение с Vite:
```bash
cd frontend
npm create vite@latest . -- --template react
```

2. Установить зависимости:
```bash
npm install react-router-dom zustand axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. Настроить Tailwind CSS в `tailwind.config.js`:
```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. Добавить Tailwind в `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. Создать структуру папок:
```
src/
├── components/     # Переиспользуемые компоненты
├── pages/          # Страницы
├── store/          # Zustand stores
├── api/            # API клиент
├── utils/          # Утилиты
└── assets/         # Статические файлы
```

6. Настроить базовый роутинг в `src/App.jsx`:
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

7. Настроить axios в `src/api/client.js`:
```js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
```

**Acceptance Criteria:**
- [ ] Vite проект создан
- [ ] Tailwind CSS настроен и работает
- [ ] React Router настроен
- [ ] Zustand установлен
- [ ] Axios настроен
- [ ] Структура папок создана
- [ ] `npm run dev` запускает приложение

**Команды для проверки:**
```bash
cd frontend
npm run dev
# Открыть http://localhost:5173
```

---

### Task 1.3: Настройка Backend (Node.js + Express)

**Приоритет:** Critical  
**Время:** 2-3 часа  
**Зависимости:** Task 1.1

**Что делать:**

1. Инициализировать Node.js проект:
```bash
cd backend
npm init -y
```

2. Установить зависимости:
```bash
npm install express cors dotenv bcrypt jsonwebtoken multer
npm install -D nodemon
```

3. Создать структуру папок:
```
src/
├── routes/         # API routes
├── controllers/    # Контроллеры
├── middleware/     # Middleware
├── utils/          # Утилиты
└── index.js        # Entry point
```

4. Создать `src/index.js`:
```js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Базовый route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'BeautyLanding API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

5. Добавить scripts в `package.json`:
```json
{
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js"
  }
}
```

6. Создать `.env.example`:
```
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/beautylanding
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Acceptance Criteria:**
- [ ] Express сервер создан
- [ ] CORS настроен
- [ ] Структура папок создана
- [ ] Health check endpoint работает
- [ ] `npm run dev` запускает сервер
- [ ] .env.example создан

**Команды для проверки:**
```bash
cd backend
npm run dev
# Проверить http://localhost:3000/api/health
```

---

### Task 1.4: Настройка Prisma и базы данных

**Приоритет:** Critical  
**Время:** 2-3 часа  
**Зависимости:** Task 1.3

**Что делать:**

1. Установить Prisma:
```bash
cd backend
npm install prisma @prisma/client
npx prisma init
```

2. Создать аккаунт Supabase:
   - Перейти на https://supabase.com
   - Создать новый проект "beautylanding"
   - Скопировать DATABASE_URL из Settings → Database

3. Обновить `.env`:
```
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
```

4. Создать Prisma schema в `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  landings  Landing[]
}

model Landing {
  id         String   @id @default(uuid())
  userId     String
  templateId String
  data       Json
  published  Boolean  @default(false)
  subdomain  String?  @unique
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Template {
  id          String   @id @default(uuid())
  name        String
  description String
  preview     String
  data        Json
  createdAt   DateTime @default(now())
}
```

5. Создать и применить миграцию:
```bash
npx prisma migrate dev --name init
```

6. Сгенерировать Prisma Client:
```bash
npx prisma generate
```

7. Создать `src/db.js`:
```js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;
```

8. Добавить тестовый endpoint в `src/index.js`:
```js
const prisma = require('./db');

app.get('/api/users/count', async (req, res) => {
  const count = await prisma.user.count();
  res.json({ count });
});
```

**Acceptance Criteria:**
- [ ] Prisma установлен
- [ ] Supabase проект создан
- [ ] DATABASE_URL настроен
- [ ] Schema создан
- [ ] Миграция применена
- [ ] Prisma Client работает
- [ ] Тестовый endpoint возвращает данные

**Команды для проверки:**
```bash
npx prisma studio
# Открывается Prisma Studio для просмотра БД
curl http://localhost:3000/api/users/count
```

---

### Task 1.5: Настройка Cloudinary

**Приоритет:** High  
**Время:** 1-2 часа  
**Зависимости:** Task 1.3

**Что делать:**

1. Создать аккаунт Cloudinary:
   - Перейти на https://cloudinary.com
   - Зарегистрироваться (free tier)
   - Скопировать Cloud Name, API Key, API Secret

2. Установить Cloudinary SDK:
```bash
cd backend
npm install cloudinary
```

3. Создать `src/utils/cloudinary.js`:
```js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
```

4. Создать upload endpoint в `src/routes/upload.js`:
```js
const express = require('express');
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'beautylanding',
    });
    
    res.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

5. Подключить route в `src/index.js`:
```js
const uploadRoutes = require('./routes/upload');
app.use('/api', uploadRoutes);
```

6. Обновить `.env`:
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Acceptance Criteria:**
- [ ] Cloudinary аккаунт создан
- [ ] SDK установлен и настроен
- [ ] Upload endpoint работает
- [ ] Файлы загружаются в Cloudinary
- [ ] URL возвращается в ответе

**Команды для проверки:**
```bash
curl -X POST -F "image=@test.jpg" http://localhost:3000/api/upload
```

---

### Task 1.6: Настройка Prettier и ESLint

**Приоритет:** Medium  
**Время:** 1 час  
**Зависимости:** Task 1.2, Task 1.3

**Что делать:**

1. Установить Prettier (root):
```bash
npm install -D prettier
```

2. Создать `.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

3. Создать `.prettierignore`:
```
node_modules
dist
build
.next
coverage
```

4. Установить ESLint для frontend:
```bash
cd frontend
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks
npx eslint --init
```

5. Добавить scripts в root `package.json`:
```json
{
  "scripts": {
    "format": "prettier --write \"**/*.{js,jsx,json,md}\"",
    "format:check": "prettier --check \"**/*.{js,jsx,json,md}\""
  }
}
```

**Acceptance Criteria:**
- [ ] Prettier установлен
- [ ] .prettierrc создан
- [ ] ESLint настроен для frontend
- [ ] `npm run format` форматирует код
- [ ] Нет ошибок форматирования

**Команды для проверки:**
```bash
npm run format:check
npm run format
```

---

### Task 1.7: Деплой на Vercel (Frontend)

**Приоритет:** High  
**Время:** 1-2 часа  
**Зависимости:** Task 1.2

**Что делать:**

1. Создать GitHub репозиторий:
```bash
git remote add origin https://github.com/aleksejgromov/BeautyLanding.git
git push -u origin main
```

2. Создать аккаунт Vercel:
   - Перейти на https://vercel.com
   - Войти через GitHub
   - Импортировать BeautyLanding репозиторий

3. Настроить проект:
   - Root Directory: `frontend`
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. Добавить Environment Variables:
```
VITE_API_URL=https://beautylanding-api.railway.app/api
```

5. Деплой:
   - Нажать "Deploy"
   - Дождаться завершения
   - Проверить URL

6. Настроить автодеплой:
   - Vercel автоматически деплоит при push в main
   - Preview deployments для PR

**Acceptance Criteria:**
- [ ] GitHub репозиторий создан
- [ ] Vercel проект создан
- [ ] Frontend задеплоен
- [ ] URL работает
- [ ] Автодеплой настроен

**URL для проверки:**
```
https://beautylanding.vercel.app
```

---

### Task 1.8: Деплой на Railway (Backend)

**Приоритет:** High  
**Время:** 1-2 часа  
**Зависимости:** Task 1.3, Task 1.4

**Что делать:**

1. Создать аккаунт Railway:
   - Перейти на https://railway.app
   - Войти через GitHub
   - Создать новый проект

2. Добавить PostgreSQL:
   - New → Database → PostgreSQL
   - Скопировать DATABASE_URL

3. Добавить Backend сервис:
   - New → GitHub Repo → BeautyLanding
   - Root Directory: `backend`
   - Start Command: `npm start`

4. Настроить Environment Variables:
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
PORT=3000
```

5. Добавить `railway.json` в backend:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

6. Деплой:
   - Railway автоматически деплоит
   - Получить public URL
   - Проверить health endpoint

7. Применить Prisma миграции:
```bash
railway run npx prisma migrate deploy
```

**Acceptance Criteria:**
- [ ] Railway проект создан
- [ ] PostgreSQL добавлен
- [ ] Backend задеплоен
- [ ] Environment variables настроены
- [ ] Миграции применены
- [ ] API отвечает

**URL для проверки:**
```
https://beautylanding-api.railway.app/api/health
```

---

### Task 1.9: Настройка CORS для production

**Приоритет:** High  
**Время:** 30 минут  
**Зависимости:** Task 1.7, Task 1.8

**Что делать:**

1. Обновить CORS в `backend/src/index.js`:
```js
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173',
  'https://beautylanding.vercel.app',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
```

2. Обновить API URL в frontend `.env`:
```
VITE_API_URL=https://beautylanding-api.railway.app/api
```

3. Обновить в Vercel Environment Variables

4. Протестировать:
   - Открыть frontend на Vercel
   - Проверить что API запросы работают
   - Проверить в DevTools Network tab

**Acceptance Criteria:**
- [ ] CORS настроен для production
- [ ] Frontend может делать запросы к API
- [ ] Нет CORS ошибок в консоли

---

### Task 1.10: Финальное тестирование и документация

**Приоритет:** Medium  
**Время:** 1-2 часа  
**Зависимости:** Все предыдущие

**Что делать:**

1. Обновить README.md:
```markdown
# BeautyLanding

Конструктор лендингов для косметологов

## Локальная разработка

### Требования
- Node.js 20+
- npm 9+

### Установка
\`\`\`bash
git clone https://github.com/aleksejgromov/BeautyLanding.git
cd BeautyLanding
npm install
\`\`\`

### Настройка
1. Скопировать `.env.example` в `.env`
2. Заполнить переменные окружения

### Запуск
\`\`\`bash
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev
\`\`\`

## Production URLs
- Frontend: https://beautylanding.vercel.app
- Backend: https://beautylanding-api.railway.app
```

2. Создать CONTRIBUTING.md с правилами

3. Протестировать весь flow:
   - [ ] Frontend запускается локально
   - [ ] Backend запускается локально
   - [ ] База данных подключена
   - [ ] Загрузка файлов работает
   - [ ] Frontend на Vercel работает
   - [ ] Backend на Railway работает
   - [ ] API запросы проходят

4. Создать чек-лист в `.planning/phases/1-infrastructure/CHECKLIST.md`

5. Сделать коммит:
```bash
git add .
git commit -m "feat(phase-1): настройка инфраструктуры завершена"
git push
```

**Acceptance Criteria:**
- [ ] README.md обновлен
- [ ] Все компоненты работают локально
- [ ] Все компоненты работают на production
- [ ] Документация актуальна
- [ ] Коммит создан

---

## 📊 Прогресс

- [ ] Task 1.1: Инициализация монорепо
- [ ] Task 1.2: Настройка Frontend
- [ ] Task 1.3: Настройка Backend
- [ ] Task 1.4: Настройка Prisma
- [ ] Task 1.5: Настройка Cloudinary
- [ ] Task 1.6: Prettier и ESLint
- [ ] Task 1.7: Деплой на Vercel
- [ ] Task 1.8: Деплой на Railway
- [ ] Task 1.9: CORS для production
- [ ] Task 1.10: Тестирование и документация

**Завершено:** 0 / 10 задач

## ⏱ Оценка времени

| Задача | Оценка | Факт |
|--------|--------|------|
| 1.1 | 1-2ч | - |
| 1.2 | 2-3ч | - |
| 1.3 | 2-3ч | - |
| 1.4 | 2-3ч | - |
| 1.5 | 1-2ч | - |
| 1.6 | 1ч | - |
| 1.7 | 1-2ч | - |
| 1.8 | 1-2ч | - |
| 1.9 | 0.5ч | - |
| 1.10 | 1-2ч | - |
| **Итого** | **13-21ч** | **-** |

## 🎯 Следующие шаги

После завершения Phase 1:
1. Обновить STATE.md
2. Сделать коммит с результатами
3. Запустить `/gsd-plan-phase 2` для планирования следующей фазы
4. Начать Phase 2: Аутентификация и базовый UI

---

**Статус:** Готов к выполнению  
**Создан:** 2026-05-18  
**Следующее действие:** Запустить `/gsd-execute-phase` для начала выполнения
