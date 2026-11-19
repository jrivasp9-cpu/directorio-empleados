export const API_URL: string =
  import.meta.env.VITE_API_URL || 'https://dummyjson.com';

export const POR_PAGINA = 8;

export const CAMPOS_EMPLEADO =
  'firstName,lastName,email,phone,age,image,company,address';

export const TAMANO_MAXIMO_IMAGEN = 1024 * 1024;

export const TIPOS_IMAGEN = ['image/jpeg', 'image/png'];