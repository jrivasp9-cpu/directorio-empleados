import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';

export default function Encabezado() {
  const usuario = useAuthStore((estado) => estado.usuario);
  const cerrarSesion = useAuthStore((estado) => estado.cerrarSesion);
  const clienteConsultas = useQueryClient();
  const navigate = useNavigate();

  const salir = () => {
    cerrarSesion();
    clienteConsultas.clear();
    navigate('/login', { replace: true });
  };

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <h1 className="text-xl font-semibold sm:text-2xl">
          Directorio de empleados
        </h1>
        <div className="flex items-center gap-3">
          {usuario && (
            <span className="text-sm text-muted-foreground">
              {`${usuario.firstName} ${usuario.lastName}`}
            </span>
          )}
          <Button variant="outline" onClick={salir}>
            Cerrar sesión
          </Button>
        </div>
      </div>
    </header>
  );
}