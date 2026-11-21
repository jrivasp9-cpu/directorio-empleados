import { useState } from 'react';
import toast from 'react-hot-toast';
import FormularioEmpleado from '@/components/FormularioEmpleado';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCrearEmpleado } from '@/hooks/useCrearEmpleado';
import type { DatosNuevoEmpleado } from '@/types';
import { getErrorMessage } from '@/utils/getErrorMessage';

export default function NuevoEmpleado() {
  const [abierto, setAbierto] = useState(false);
  const crear = useCrearEmpleado();

  const guardar = (datos: DatosNuevoEmpleado) => {
    crear.mutate(datos, {
      onSuccess: () => {
        toast.success('Empleado creado (la API lo simula y no lo guarda).');
        setAbierto(false);
      },
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  };

  const cambiarEstado = (valor: boolean) => {
    if (!crear.isPending) {
      setAbierto(valor);
    }
  };

  return (
    <>
      <Button onClick={() => setAbierto(true)}>Nuevo empleado</Button>
      <Dialog open={abierto} onOpenChange={cambiarEstado}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo empleado</DialogTitle>
            <DialogDescription>
              Complete los datos del empleado.
            </DialogDescription>
          </DialogHeader>
          <FormularioEmpleado
            guardando={crear.isPending}
            onGuardar={guardar}
            onCancelar={() => setAbierto(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}