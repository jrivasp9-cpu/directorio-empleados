import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import DetallePage from '@/pages/DetallePage';
import EmpleadosPage from '@/pages/EmpleadosPage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/empleados" element={<EmpleadosPage />} />
          <Route path="/empleados/:id" element={<DetallePage />} />
        </Route>
        <Route path="/" element={<Navigate to="/empleados" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}