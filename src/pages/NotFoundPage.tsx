import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-semibold">Página no encontrada</h1>
      <p className="text-muted-foreground">La dirección que buscó no existe.</p>
      <Link to="/empleados" className="font-medium underline underline-offset-4">
        Volver al directorio
      </Link>
    </main>
  );
}