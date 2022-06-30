import { Accion } from './accion';
import { ModelPerfil } from './perfil';
import { Rol } from './rol';

export interface PermisoRol {
  model_permiso_id: ModelPermiso;
  model_rol_id: Rol;
  permiso_id: number;
  rol_id: number;
}
export interface ModelPermiso {
  id: number;
  slug: string;
  nombre_corto: string;
  descripcion: string;
}

// PERMISOS PERFIL
export interface PermisosPerfil {
  model_perfil_id: ModelPerfil;
  model_permiso_id: ModelPermiso;
  perfil_id: number;
  permiso_id: number;
}

export interface PermissionsGroup {
  module: string;
  permissions: Permiso[];
}

export interface Permiso {
  permiso_id: number;
  slug: string;
  nombre_corto: string;
  descripcion: string;
}

export interface DataRespGetUsuarioPermisosPerfil {
  permisos: Accion[];
}

export interface PermissionModule extends Permiso {
  module: string;
}
