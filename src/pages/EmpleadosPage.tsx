import type { FormEvent, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import EmpleadoCard from '@/components/EmpleadoCard';
import Encabezado from '@/components/Encabezado';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEliminarEmpleado } from '@/hooks/useEliminarEmpleado';
import { useEmpleados } from '@/hooks/useEmpleados';
import type { Empleado } from '@/types';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { leerPagina, totalPaginas } from '@/utils/paginacion';
import NuevoEmpleado from '@/components/NuevoEmpleado';

export default function EmpleadosPage() {
  const [parametros, setParametros] = useSearchParams();
  const pagina = leerPagina(parametros.get('page'));
  const busqueda = (parametros.get('q') ?? '').trim();
  const consulta = useEmpleados(pagina, busqueda);
  const eliminar = useEliminarEmpleado();

  const total = consulta.data?.total ?? 0;
  const paginas = totalPaginas(total);
  const empleados = consulta.data?.users ?? [];

  const buscar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const texto = String(new FormData(evento.currentTarget).get('q') ?? '').trim();
    setParametros(texto ? { q: texto } : {});
  };

  const irAPagina = (destino: number) => {
    const siguiente = new URLSearchParams(parametros);
    if (destino > 1) {
      siguiente.set('page', String(destino));
    } else {
      siguiente.delete('page');
    }
    setParametros(siguiente);
  };

  const eliminarEmpleado = (empleado: Empleado) => {
    const nombre = `${empleado.firstName} ${empleado.lastName}`;
    if (!window.confirm(`¿Eliminar a ${nombre}? La API simula la baja.`)) {
      return;
    }
    eliminar.mutate(empleado.id, {
      onSuccess: () => toast.success('Empleado eliminado (simulado).'),
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  };

  let contenido: ReactNode;

  if (consulta.isPending) {
    contenido = <p>Cargando…</p>;
  } else if (consulta.isError) {
    contenido = (
      <Alert variant="destructive" className="mx-auto max-w-xl">
        <AlertDescription>
          <p>{getErrorMessage(consulta.error)}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => consulta.refetch()}
          >
            Reintentar
          </Button>
        </AlertDescription>
      </Alert>
    );
  } else {
    contenido = (
      <>
        {busqueda && !consulta.isPlaceholderData && (
          <p className="text-sm text-muted-foreground">
            {total === 0
              ? 'No hay resultados para la búsqueda.'
              : `${total} resultados`}
          </p>
        )}

        {empleados.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {empleados.map((empleado) => (
              <EmpleadoCard
                key={empleado.id}
                empleado={empleado}
                eliminando={eliminar.isPending}
                onEliminar={eliminarEmpleado}
              />
            ))}
          </div>
        )}

        {paginas > 1 && (
          <nav
            aria-label="Paginación"
            className="flex items-center justify-center gap-3"
          >
            <Button
              variant="outline"
              disabled={pagina <= 1}
              onClick={() => irAPagina(pagina - 1)}
            >
              Anterior
            </Button>
            <span className="text-sm">{`Página ${pagina} de ${paginas}`}</span>
            <Button
              variant="outline"
              disabled={pagina >= paginas}
              onClick={() => irAPagina(pagina + 1)}
            >
              Siguiente
            </Button>
          </nav>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Encabezado />
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <form
            key={busqueda}
            onSubmit={buscar}
            className="flex w-full max-w-md items-end gap-2"
          >
            <div className="flex-1 space-y-2">
              <Label htmlFor="busqueda">Buscar</Label>
              <Input id="busqueda" name="q" defaultValue={busqueda} />
            </div>
            <Button type="submit">Buscar</Button>
          </form>
          <NuevoEmpleado />
        </div>
        {contenido}
      </main>
    </div>
  );
}