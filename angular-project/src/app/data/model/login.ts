import { Accion } from './accion';
import { Perfil } from './perfil';

// Login init
export interface RequestLogin {
  username: string;
  password: string;
}

export interface DataRespLogin {
  token: string;
  usuario_id: number;
  usuario_nombre: string;
}
// Login end

// Get Perfiles User init
export interface DataResGetPerfilesUser {
  perfiles: PerfilesUser[];
}

export interface PerfilesUser {
  created_at: Date;
  id: number;
  model_perfil_id: ModelPerfil;
  model_usuario_id: ModelUsuario;
  model_usuario_orig: ModelUsuarioOrigen;

  model_superior_proxy_id: ModelSuperir;
  updated_at: Date;
  usuario_id: number;
  usuario_orig: number;

  perfil_id: number;
  perfil_propio: boolean;
  superior_proxy_id: number;
}

export interface ModelPerfil {
  created_at: Date;
  deleted_at: Date;
  descripcion: string;
  eliminable: boolean;
  id: number;
  // model_rol_id: ModelRol;
  nombre: string;
  rol_id: number;
  updated_at: Date;
}

// export interface ModelRol {
//   id: number;
//   nombre: string;
// }

export interface ModelUsuario {
  apellidos: string;
  area_id: number;
  celular: string;
  created_at: Date;
  deleted_at: null;
  email: string;
  estado: boolean;
  id: number;
  model_area_id: null;
  model_proveedor_id: null;
  nombres: string;
  proveedor_id: number;
  rut: string;
  updated_at: Date;
  username: string;
}
export interface ModelSuperir {
  created_at: Date;
  id: 17;
  model_usuario_id: ModelUsuario;
  perfil_id: number;
  superior_proxy_id: number;
  updated_at: Date;
  usuario_id: number;
  usuario_orig: number;
}

export interface ModelUsuarioOrigen {
  apellidos: string;
  area_id: number;
  celular: string;
  created_at: Date;
  deleted_at: null;
  email: string;
  estado: boolean;
  id: number;
  model_area_id: null;
  model_proveedor_id: null;
  nombres: string;
  proveedor_id: number;
  rut: string;
  updated_at: Date;
  username: string;
}
// Get Perfiles User end

// Get Permisos perfil init
export interface DataRespGetUsuarioPermisosPerfil {
  permisos: Accion[];
}

// Get permisos perfil end

export interface SessionData {
  token: string;
  usuario_nombre: string;
  usuario_id: number;
  nombre_perfil_select: string;
  permisos: string[];
  proxy_id: number;
  multiperfiles: boolean;
}
