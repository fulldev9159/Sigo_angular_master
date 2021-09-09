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
