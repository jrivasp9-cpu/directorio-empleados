import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useDescargarImagen } from '@/hooks/useDescargarImagen';
import { useEmpleado } from '@/hooks/useEmpleado';
import { construirFicha, descargarArchivo } from '@/utils/descargas';
import { getErrorMessage } from '@/utils/getErrorMessage';

interface DatoProps {
  etiqueta: string;
  valor: string;
}

function Dato({ etiqueta, valor }: DatoProps) {
  return (
    <p>
      <span className="font-medium">{etiqueta}</span> <span>{valor}</span>
    </p>
  );
}

export default function DetallePage() {
  const { id } = useParams();
  const consulta = useEmpleado(Number(id));
  const imagen = useDescargarImagen();
  const empleado = consulta.data;

  const bajarImagen = () => {
    if (!empleado) {
      return;
    }
    imagen.mutate(empleado, {
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  };

  const bajarFicha = () => {
    if (!empleado) {
      return;
    }
    const ficha = new Blob([construirFicha(empleado)], { type: 'text/plain' });
    descargarArchivo(ficha, `empleado-${empleado.id}.txt`);
  };

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-6">
      <Link to="/empleados" className="text-sm font-medium underline underline-offset-4">
        ← Volver al listado
      </Link>

      {consulta.isPending && <p>Cargando…</p>}

      {consulta.isError && (
        <Alert variant="destructive">
          <AlertDescription>{getErrorMessage(consulta.error)}</AlertDescription>
        </Alert>
      )}

      {empleado && (
        <article className="space-y-6">
          <h1 className="text-3xl font-semibold">
            {`${empleado.firstName} ${empleado.lastName}`}
          </h1>
          <div className="flex flex-col gap-6 sm:flex-row">
            <img
              src={empleado.image}
              alt={`Fotografía de ${empleado.firstName} ${empleado.lastName}`}
              width={160}
              height={160}
              className="size-40 rounded-lg bg-muted object-cover"
            />
            <div className="min-w-0 space-y-2">
              <Dato etiqueta="Departamento:" valor={empleado.company.department} />
              <Dato etiqueta="Cargo:" valor={empleado.company.title} />
              <Dato etiqueta="Correo:" valor={empleado.email} />
              <Dato etiqueta="Teléfono:" valor={empleado.phone} />
              <Dato etiqueta="Edad:" valor={String(empleado.age)} />
              <Dato
                etiqueta="Dirección:"
                valor={`${empleado.address.address}, ${empleado.address.city}, ${empleado.address.state}`}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={bajarImagen} disabled={imagen.isPending}>
              Descargar imagen
            </Button>
            <Button variant="outline" onClick={bajarFicha}>
              Descargar ficha
            </Button>
          </div>
        </article>
      )}
    </main>
  );
}