import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import UserList from './pages/UserList'; // 1. Імпортуємо нову сторінку
import AdminLayout from './components/AdminLayout';
import PlantTypes from './pages/PlantTypes';
import UserLayout from './components/UserLayout';
import UserDashboard from './pages/UserDashboard';
import MyPlants from './pages/MyPlants';
import PlantCatalog from './pages/PlantCatalog';
import CareCalendar from './pages/CareCalendar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Публічні маршрути */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Маршрути користувача (захищені Layout-ом) */}
          {/* Ми прибрали path="/" звідси, щоб не конфліктувати з публічним LandingPage */}
          <Route element={<UserLayout />}>
            <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
            <Route path="/my-plants" element={<ProtectedRoute><MyPlants /></ProtectedRoute>} />
            <Route path="/catalog" element={<ProtectedRoute><PlantCatalog /></ProtectedRoute>} />
            <Route path="calendar" element={<CareCalendar />} />
          </Route>

          {/* Захищений адмінський маршрут */}
          <Route path="/admin" element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserList />} />
            <Route path="plant-types" element={<PlantTypes />} />
          </Route>

          {/* 404 сторінка */}
          <Route path="*" element={
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h1>404 - Сторінку не знайдено</h1>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;