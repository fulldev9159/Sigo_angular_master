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
  model_usuarioproxy_id: ModelUsuarioProxy;
  perfil_id: number;
  perfil_propio: boolean;
  proxy_id: number;
}

export interface ModelUsuarioProxy {
  estado: boolean;
  id: number;
  model_perfil_id: ModelPerfil;
  model_superior_id: ModelSuperir;
  model_usuario_id: null;
  model_usuario_orig: null;
  perfil_id: number;
  superior_id: number;
  usuario_id: number;
  usuario_orig: number;
}

export interface ModelPerfil {
  created_at: Date;
  deleted_at: Date;
  descripcion: string;
  eliminable: boolean;
  id: number;
  model_rol_id: ModelRol;
  nombre: string;
  rol_id: number;
  updated_at: Date;
}

export interface ModelRol {
  id: number;
  nombre: string;
}

export interface ModelSuperir {
  apellidos: string;
  area_id: number;
  celular: string;
  created_at: Date;
  deleted_at: Date;
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
export interface DataRespGetPermisosPerfil {
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
