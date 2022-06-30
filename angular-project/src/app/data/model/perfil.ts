import { ModelSuperir, ModelUsuarioLogin } from './user';

export interface ModelPerfil {
  created_at: Date;
  deleted_at: Date;
  descripcion: string;
  eliminable: boolean;
  id: number;
  nombre: string;
  rol_id: number;
  updated_at: Date;
}

export interface DataResGetPerfilesUser {
  perfiles: PerfilesUser[];
}

export interface PerfilesUser {
  created_at: Date;
  id: number;
  model_perfil_id: ModelPerfil;
  model_usuario_id: ModelUsuarioLogin;
  model_usuario_orig: ModelUsuarioLogin;

  model_superior_proxy_id: ModelSuperir;
  updated_at: Date;
  usuario_id: number;
  usuario_orig: number;

  perfil_id: number;
  perfil_propio: boolean;
  superior_proxy_id: number;
}

export interface Perfil extends ModelPerfil {
  model_rol_id: { id: number; nombre: string };
}

export interface ListarPerfil extends Perfil {
  rol: string;
  estado: boolean;
}

export interface RequestCreatePerfil {
  nombre: string;
  descripcion: string;
  permisos: number[];
  eliminable: boolean;
  rol_id: number;
}

export interface RequestUpdatePerfil {
  id: number;
  values: RequestCreatePerfil;
}
