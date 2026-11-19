export interface Empresa {
  department: string;
  title: string;
}

export interface Direccion {
  address: string;
  city: string;
  state: string;
}

export interface Empleado {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  image: string;
  company: Empresa;
  address: Direccion;
}

export interface RespuestaEmpleados {
  users: Empleado[];
  total: number;
  skip: number;
  limit: number;
}

export interface UsuarioSesion {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

export interface RespuestaLogin extends UsuarioSesion {
  accessToken: string;
  refreshToken: string;
}

export interface RespuestaRefresh {
  accessToken: string;
  refreshToken: string;
}

export interface Sesion {
  usuario: UsuarioSesion | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface DatosNuevoEmpleado {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  image: File | null;
}