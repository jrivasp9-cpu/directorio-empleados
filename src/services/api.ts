import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/authStore';
import { API_URL } from '@/utils/constants';
import { renovarTokenApi } from './authService';

interface PeticionReintentable extends InternalAxiosRequestConfig {
  reintentada?: boolean;
}

export const api = axios.create({ baseURL: API_URL });

let renovacionEnCurso: Promise<string> | null = null;

function renovarAccessToken(refreshToken: string): Promise<string> {
  if (!renovacionEnCurso) {
    renovacionEnCurso = renovarTokenApi(refreshToken)
      .then((datos) => {
        useAuthStore
          .getState()
          .actualizarTokens(datos.accessToken, datos.refreshToken);
        return datos.accessToken;
      })
      .finally(() => {
        renovacionEnCurso = null;
      });
  }
  return renovacionEnCurso;
}

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (respuesta) => respuesta,
  async (error: AxiosError) => {
    const original = error.config as PeticionReintentable | undefined;

    if (error.response?.status !== 401 || !original || original.reintentada) {
      return Promise.reject(error);
    }

    const { refreshToken, cerrarSesion } = useAuthStore.getState();

    if (!refreshToken) {
      cerrarSesion();
      return Promise.reject(error);
    }

    original.reintentada = true;

    try {
      const nuevoToken = await renovarAccessToken(refreshToken);
      original.headers.Authorization = `Bearer ${nuevoToken}`;
      return api(original);
    } catch {
      cerrarSesion();
      return Promise.reject(error);
    }
  },
);