import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Временная главная страница
function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          BeautyLanding
        </h1>
        <p className="text-lg text-gray-600">
          Конструктор лендингов для косметологов
        </p>
        <p className="text-sm text-gray-400 mt-4">
          Frontend настроен успешно ✅
        </p>
      </div>
    </div>
  );
}

export default App;
