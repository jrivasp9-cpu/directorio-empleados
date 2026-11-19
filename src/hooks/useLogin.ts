import { useMutation } from '@tanstack/react-query';
import { iniciarSesionApi } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import type { LoginValores } from '@/utils/schemas';

export function useLogin() {
  const iniciarSesion = useAuthStore((estado) => estado.iniciarSesion);

  return useMutation({
    mutationFn: ({ username, password }: LoginValores) =>
      iniciarSesionApi(username, password),
    onSuccess: (datos) => iniciarSesion(datos),
  });
}