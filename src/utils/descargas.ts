import type { Empleado } from '@/types';

export function descargarArchivo(contenido: Blob, nombre: string): void {
  const url = URL.createObjectURL(contenido);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = nombre;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function construirFicha(empleado: Empleado): string {
  return [
    `Empleado: ${empleado.firstName} ${empleado.lastName}`,
    `Cargo: ${empleado.company.title}`,
    `Departamento: ${empleado.company.department}`,
    `Correo: ${empleado.email}`,
    `Teléfono: ${empleado.phone}`,
    `Edad: ${empleado.age}`,
    `Dirección: ${empleado.address.address}, ${empleado.address.city}, ${empleado.address.state}`,
  ].join('\n');
}