import { TAMANO_MAXIMO_IMAGEN, TIPOS_IMAGEN } from './constants';

export function validarImagen(archivo: File): string | null {
  if (!TIPOS_IMAGEN.includes(archivo.type)) {
    return 'Solo se permiten imágenes JPG o PNG.';
  }
  if (archivo.size > TAMANO_MAXIMO_IMAGEN) {
    return 'La imagen supera 1 MB.';
  }
  return null;
}