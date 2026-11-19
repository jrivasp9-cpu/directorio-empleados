import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Escriba su usuario'),
  password: z.string().min(1, 'Escriba su contraseña'),
});

export const empleadoSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'El nombre necesita al menos 2 caracteres'),
  lastName: z
    .string()
    .trim()
    .min(2, 'El apellido necesita al menos 2 caracteres'),
  email: z.string().trim().email('Escriba un correo válido'),
  age: z.string().refine((valor) => {
    const numero = Number(valor);
    return (
      valor.trim() !== '' &&
      Number.isInteger(numero) &&
      numero >= 18 &&
      numero <= 99
    );
  }, 'La edad debe ser un entero entre 18 y 99'),
});

export type LoginValores = z.infer<typeof loginSchema>;
export type EmpleadoValores = z.infer<typeof empleadoSchema>;