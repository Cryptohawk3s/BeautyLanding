# BeautyLanding

> Конструктор лендингов для косметологов и бьюти-мастеров

## 🎯 О проекте

BeautyLanding — это простой инструмент для создания профессиональных лендингов без технических знаний. Специально разработан для косметологов, мастеров инъекционной косметологии и других бьюти-специалистов.

## ✨ Возможности

- 🎨 3 готовых шаблона для бьюти-индустрии
- ✏️ Простой редактор контента
- 📱 Автоматическая мобильная адаптация
- 📸 Галерея работ "До/После"
- 📝 Форма записи с интеграцией WhatsApp/Telegram
- 💾 Экспорт в HTML
- 🌐 Публикация на поддомене

## 🛠 Технологический стек

### Frontend

- React 18
- Vite
- Tailwind CSS
- Zustand (state management)
- React Router v6

### Backend

- Node.js 20
- Express.js
- PostgreSQL (Supabase)
- Prisma ORM
- Cloudinary (хранение изображений)

### Hosting

- Frontend: Vercel
- Backend: Railway
- Database: Supabase

## 🚀 Локальная разработка

### Требования

- Node.js 20+
- npm 9+
- Git

### Установка

```bash
# Клонировать репозиторий
git clone https://github.com/aleksejgromov/BeautyLanding.git
cd BeautyLanding

# Установить зависимости
npm install
```

### Настройка окружения

1. Создать `.env` файлы в `frontend/` и `backend/`:

**backend/.env:**

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/beautylanding
JWT_SECRET=your-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**frontend/.env:**

```env
VITE_API_URL=http://localhost:3000/api
```

2. Применить миграции базы данных:

```bash
cd backend
npx prisma migrate dev
```

### Запуск

**Frontend:**

```bash
cd frontend
npm run dev
```

Откроется на http://localhost:5173

**Backend:**

```bash
cd backend
npm run dev
```

Запустится на http://localhost:3000

## 📁 Структура проекта

```
BeautyLanding/
├── .planning/          # GSD артефакты планирования
├── frontend/           # React приложение
│   ├── src/
│   │   ├── components/ # Переиспользуемые компоненты
│   │   ├── pages/      # Страницы
│   │   ├── store/      # Zustand stores
│   │   ├── api/        # API клиент
│   │   └── utils/      # Утилиты
│   └── package.json
├── backend/            # Node.js API
│   ├── src/
│   │   ├── routes/     # API routes
│   │   ├── controllers/# Контроллеры
│   │   ├── middleware/ # Middleware
│   │   └── utils/      # Утилиты
│   ├── prisma/         # Prisma schema и миграции
│   └── package.json
├── shared/             # Общие типы и утилиты
├── docs/               # Документация
└── package.json        # Root package.json с workspaces
```

## 🌐 Production URLs

- **Frontend:** https://beautylanding.vercel.app
- **Backend API:** https://beautylanding-api.railway.app
- **Документация API:** https://beautylanding-api.railway.app/api/docs

## 🧪 Тестирование

```bash
# Запустить все тесты
npm test

# Запустить тесты с покрытием
npm run test:coverage
```

## 📝 Скрипты

```bash
# Форматирование кода
npm run format

# Проверка форматирования
npm run format:check

# Сборка для production
npm run build

# Запуск в dev режиме
npm run dev
```

## 🤝 Участие в разработке

1. Fork репозитория
2. Создать feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменений (`git commit -m 'feat: add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Открыть Pull Request

## 📄 Лицензия

MIT License - см. файл [LICENSE](LICENSE)

## 👤 Автор

**Aleksej Gromov**

- GitHub: [@aleksejgromov](https://github.com/aleksejgromov)

## 🙏 Благодарности

- Проект создан с использованием [GSD (Get Shit Done)](https://github.com/anthropics/gsd) workflow
- Powered by Claude AI

---

**Версия:** 0.1.0  
**Статус:** В разработке (MVP)  
**Дата создания:** 2026-05-18
