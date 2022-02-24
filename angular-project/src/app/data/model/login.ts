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
  model_perfil: ModelPerfil;
  perfil_id: number;
  proxy_id: number;
}

export interface ModelPerfil {
  created_at: Date;
  deleted_at: Date;
  descripcion: string;
  eliminable: boolean;
  id: number;
  model_rol: ModelRol;
  nombre: string;
  rol_id: number;
  updated_at: Date;
}

export interface ModelRol {
  id: number;
  nombre: string;
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
}
