import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RespuestaLogin, Sesion } from '@/types';

interface AuthState extends Sesion {
  iniciarSesion: (datos: RespuestaLogin) => void;
  actualizarTokens: (accessToken: string, refreshToken: string) => void;
  cerrarSesion: () => void;
}

const sesionVacia: Sesion = {
  usuario: null,
  accessToken: null,
  refreshToken: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...sesionVacia,
      iniciarSesion: (datos) =>
        set({
          usuario: {
            id: datos.id,
            username: datos.username,
            email: datos.email,
            firstName: datos.firstName,
            lastName: datos.lastName,
            image: datos.image,
          },
          accessToken: datos.accessToken,
          refreshToken: datos.refreshToken,
        }),
      actualizarTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      cerrarSesion: () => set(sesionVacia),
    }),
    {
      name: 'auth-storage',
      partialize: ({ usuario, accessToken, refreshToken }) => ({
        usuario,
        accessToken,
        refreshToken,
      }),
    },
  ),
);