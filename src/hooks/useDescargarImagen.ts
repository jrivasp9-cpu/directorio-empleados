import { useMutation } from '@tanstack/react-query';
import { descargarImagen } from '@/services/empleadosService';
import type { Empleado } from '@/types';
import { descargarArchivo } from '@/utils/descargas';

export function useDescargarImagen() {
  return useMutation({
    mutationFn: (empleado: Empleado) => descargarImagen(empleado.image),
    onSuccess: (imagen, empleado) =>
      descargarArchivo(imagen, `empleado-${empleado.id}.png`),
  });
}