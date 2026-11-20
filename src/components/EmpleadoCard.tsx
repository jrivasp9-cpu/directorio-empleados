import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { Empleado } from '@/types';

interface EmpleadoCardProps {
  empleado: Empleado;
  eliminando: boolean;
  onEliminar: (empleado: Empleado) => void;
}

export default function EmpleadoCard({
  empleado,
  eliminando,
  onEliminar,
}: EmpleadoCardProps) {
  const nombre = `${empleado.firstName} ${empleado.lastName}`;

  return (
    <article className="flex min-w-0 flex-col gap-3 rounded-lg border bg-card p-4 shadow-sm">
      <img
        src={empleado.image}
        alt={`Fotografía de ${nombre}`}
        width={96}
        height={96}
        className="size-24 rounded-full bg-muted object-cover"
      />
      <div className="min-w-0 space-y-1">
        <h2 className="text-lg font-semibold">{nombre}</h2>
        <p className="text-sm">{empleado.company.department}</p>
        <p className="text-sm text-muted-foreground">{empleado.company.title}</p>
        <p className="break-all text-sm text-muted-foreground">
          {empleado.email}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
        <Link
          to={`/empleados/${empleado.id}`}
          className="text-sm font-medium underline underline-offset-4"
        >
          Ver detalle
        </Link>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          aria-label={`Eliminar ${nombre}`}
          disabled={eliminando}
          onClick={() => onEliminar(empleado)}
        >
          Eliminar
        </Button>
      </div>
    </article>
  );
}