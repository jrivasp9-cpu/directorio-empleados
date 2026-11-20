import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { obtenerEmpleados } from '@/services/empleadosService';

export function useEmpleados(pagina: number, busqueda: string) {
  return useQuery({
    queryKey: ['empleados', pagina, busqueda],
    queryFn: () => obtenerEmpleados(pagina, busqueda),
    placeholderData: keepPreviousData,
  });
}