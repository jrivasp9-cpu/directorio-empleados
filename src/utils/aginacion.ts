import { POR_PAGINA } from './constants';

export function leerPagina(valor: string | null): number {
  if (valor !== null && /^[1-9]\d*$/.test(valor)) {
    return Number(valor);
  }
  return 1;
}

export function calcularSkip(pagina: number): number {
  return (pagina - 1) * POR_PAGINA;
}

export function totalPaginas(total: number): number {
  return Math.max(1, Math.ceil(total / POR_PAGINA));
}