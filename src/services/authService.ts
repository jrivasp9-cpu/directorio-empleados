import { publicApi } from './publicApi';
import type { RespuestaLogin, RespuestaRefresh } from '@/types';

export async function iniciarSesionApi(
  username: string,
  password: string,
): Promise<RespuestaLogin> {
  const { data } = await publicApi.post<RespuestaLogin>('/auth/login', {
    username,
    password,
    expiresInMins: 1,
  });
  return data;
}

export async function renovarTokenApi(
  refreshToken: string,
): Promise<RespuestaRefresh> {
  const { data } = await publicApi.post<RespuestaRefresh>('/auth/refresh', {
    refreshToken,
    expiresInMins: 1,
  });
  return data;
}