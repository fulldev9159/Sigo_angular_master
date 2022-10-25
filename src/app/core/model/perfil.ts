import { Rol } from './rol';
import { ModelUsuario, ModelUsuarioSuperior } from './usuario';

export interface ModelPerfil {
  created_at: Date;
  // deleted_at: Date;
  descripcion: string;
  eliminable: boolean;
  id: number;
  nombre: string;
  rol_id: number;
  updated_at: Date;
}

export interface ModelPerfilUserWithRol extends ModelPerfil {
  model_rol_id: Rol;
}

export interface PerfilesUsuario {
  created_at: Date;
  id: number;
  updated_at: Date;
  usuario_id: number;
  usuario_orig: number;
  perfil_id: number;
  perfil_propio: boolean;
  superior_proxy_id: number;

  model_perfil_id: ModelPerfilUserWithRol;
  model_usuario_id: ModelUsuario;
  model_usuario_orig: ModelUsuario;
  model_superior_proxy_id: ModelUsuarioSuperior;
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
