import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export default function ProtectedRoute() {
  const autenticado = useAuthStore((estado) => Boolean(estado.accessToken));

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}