import { useMutation, useQueryClient } from '@tanstack/react-query';
import { eliminarEmpleado } from '@/services/empleadosService';

export function useEliminarEmpleado() {
  const clienteConsultas = useQueryClient();

  return useMutation({
    mutationFn: eliminarEmpleado,
    onSuccess: () => {
      void clienteConsultas.invalidateQueries({ queryKey: ['empleados'] });
    },
  });
}