import { isAxiosError } from 'axios';

export function getErrorMessage(error: unknown): string {
  if (!isAxiosError(error)) {
    return 'Ocurrió un error inesperado.';
  }

  if (!error.response) {
    return 'Sin conexión con el servidor. Verifique su internet.';
  }

  const estado = error.response.status;

  if (estado === 400) {
    return 'Los datos enviados no son válidos.';
  }
  if (estado === 401) {
    return 'Su sesión expiró. Inicie sesión de nuevo.';
  }
  if (estado === 403) {
    return 'No tiene permiso para realizar esta acción.';
  }
  if (estado === 404) {
    return 'No se encontró el recurso solicitado.';
  }
  if (estado === 429) {
    return 'Demasiadas solicitudes. Espere un momento.';
  }
  if (estado >= 500) {
    return 'Error del servidor. Intente más tarde.';
  }

  return 'Ocurrió un error inesperado.';
}