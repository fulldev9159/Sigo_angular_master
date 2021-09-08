export interface Provider {
  id: number;
  nombre: string;
  rut: number;
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

export interface Form {
  id: number;
  username: string;
  nombres: string;
  apellidos: string;
  rut: string;
  firma: string;
  celular: string;
  email: string;
  proveedor_id: number;
  area_id: number;
  perfiles: PerfilFormUser[];
  contratos_marco: number[];
  activo: boolean;
}

export interface Contract {
  id: number;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  tipo_codigo: number;
  tipo_glosa: string;
  activo: boolean;
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

export interface PerfilFormUser {
  perfil_id: number;
  persona_a_cargo_id: number;
}

export interface ActivateUserResponse {
  id: number;
}
