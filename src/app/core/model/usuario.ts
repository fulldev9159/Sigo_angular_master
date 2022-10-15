import { ModelContratoMarco } from './contrato';

export interface ModelUsuario {
  apellidos: string;
  area_id: number;
  celular: string;
  created_at: Date;
  email: string;
  estado: boolean;
  firma_archivo_id: number;
  id: number;
  nombres: string;
  proveedor_id: number;
  rut: string;
  updated_at: Date;
  username: string;
  eliminable: boolean;
  guia_subgrupo_id?: number; // 69 TODO: ACTUALIZAR EL MOCK
  delegated_auth?: boolean; // 69 TODO: ACTUALIZAR EL MOCK
  password?: string; // 69 TODO: ACTUALIZAR EL MOCK
}

// USUARIO PROXY
export interface ModelProxyUsuarios {
  created_at: Date;
  id: number;
  model_usuario_id: ModelUsuario;
  perfil_id: number;
  superior_proxy_id: number;
  updated_at: Date;
  usuario_id: number;
  usuario_orig: number;
}

export interface ModelUsuarioSuperior extends ModelProxyUsuarios {
  model_usuario_id: ModelUsuario;
}

// CONTRATOS USUARIO
export interface ContratosUser {
  contrato_id: number;
  model_contrato_id?: ModelContratoMarco;
  model_usuario_id?: ModelUsuario;
  usuario_id?: number;
}
