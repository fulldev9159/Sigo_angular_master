export interface Provider {
  id: number;
  nombre: string;
  rut: number;
  dv: string;
  email: string;
  telefono: string;
  direccion: string;
  activo: boolean;
}

export interface Area {
  id: number;
  nombre: string;
  descripcion: string;
  interno: boolean;
}

export interface Higher {
  id: number;
  rut: number;
  dv: string;
  username: string;
  nombres: string;
  apellidos: string;
  celular: string;
  firma: string;
  email: string;
  proveedor_id: number;
  area_id: number;
  prefil_id: number;
  perfil_nombre: string;
  perfil_descripcion: string;
  activo: string;
}

export interface User {
  id: number;
  nombre: string;
  descripcion: string;
  interno: boolean;
}

export interface Form {
  id: number;
  nombre: string;
  descripcion: string;
  interno: boolean;
}

export interface UserDetail {
  perfiles: Perfil[];
  contratos_marco: Contrato[];
}

export interface Perfil {
  id: number;
  nombre: string;
  descripcion: string;
  superior_id: number;
  superior_nombre: string;
  superior_descripcion: string;
  persona_a_cargo_id: number;
  persona_a_cargo_nombre: string;
}

export interface Contrato {
  id: number;
  nombre: string;
  tipo: string;
}
