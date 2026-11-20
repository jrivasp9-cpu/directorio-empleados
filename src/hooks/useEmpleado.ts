import { useQuery } from '@tanstack/react-query';
import { obtenerEmpleado } from '@/services/empleadosService';

export function useEmpleado(id: number) {
  return useQuery({
    queryKey: ['empleado', id],
    queryFn: () => obtenerEmpleado(id),
  });
}