import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearEmpleado } from '@/services/empleadosService';

export function useCrearEmpleado() {
  const clienteConsultas = useQueryClient();

  return useMutation({
    mutationFn: crearEmpleado,
    onSuccess: () => {
      void clienteConsultas.invalidateQueries({ queryKey: ['empleados'] });
    },
  });
}