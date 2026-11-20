import { CAMPOS_EMPLEADO, POR_PAGINA } from '@/utils/constants';
import { calcularSkip } from '@/utils/paginacion';
import type { DatosNuevoEmpleado, Empleado, RespuestaEmpleados } from '@/types';
import { api } from './api';
import { publicApi } from './publicApi';

export async function obtenerEmpleados(
  pagina: number,
  busqueda: string,
): Promise<RespuestaEmpleados> {
  const ruta = busqueda ? '/auth/users/search' : '/auth/users';
  const { data } = await api.get<RespuestaEmpleados>(ruta, {
    params: {
      q: busqueda || undefined,
      limit: POR_PAGINA,
      skip: calcularSkip(pagina),
      select: CAMPOS_EMPLEADO,
    },
  });
  return data;
}

export async function obtenerEmpleado(id: number): Promise<Empleado> {
  const { data } = await api.get<Empleado>(`/auth/users/${id}`, {
    params: { select: CAMPOS_EMPLEADO },
  });
  return data;
}

export async function crearEmpleado(datos: DatosNuevoEmpleado): Promise<void> {
  const formulario = new FormData();
  formulario.append('firstName', datos.firstName);
  formulario.append('lastName', datos.lastName);
  formulario.append('email', datos.email);
  formulario.append('age', String(datos.age));
  if (datos.image) {
    formulario.append('image', datos.image);
  }
  await api.post('/users/add', formulario);
}

export async function eliminarEmpleado(id: number): Promise<void> {
  await api.delete(`/users/${id}`);
}

export async function descargarImagen(url: string): Promise<Blob> {
  const { data } = await publicApi.get<Blob>(url, { responseType: 'blob' });
  return data;
}