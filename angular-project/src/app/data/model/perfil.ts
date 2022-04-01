import { Permiso } from './permiso';

export interface DataRspGetAllPerfiles {
  items: Perfil[];
}

export interface Perfil {
  created_at: Date;
  deleted_at: Date;
  descripcion: string;
  eliminable: boolean;
  id: number;
  model_rol_id: { id: number; nombre: string };
  nombre: string;
  rol_id: number;
  updated_at: Date;
}

export interface ListarPerfil extends Perfil {
  rol: string;
  estado: boolean;
}

// PERMISOS PERFIL
export interface DataRespGetPermisosPerfil {
  items: PermisosPerfil[];
}

export interface PermisosPerfil {
  model_perfil_id: {
    created_at: Date;
    descripcion: string;
    eliminable: boolean;
    id: number;
    nombre: string;
    rol_id: number;
    updated_at: Date;
  };
  model_permiso_id: {
    id: number;
    slug: string;
    nombre_corto: string;
    descripcion: string;
  };
  perfil_id: number;
  permiso_id: number;
}

export interface PermissionsGroup {
  module: string;
  permissions: Permiso[];
}

export interface DataRespGetAllRoles {
  items: Roles[];
}

export interface Roles {
  id: number;
  jerarquia: null;
  nombre: string;
}

export interface DataRespGetPermisosRol {
  items: PermisoRol[];
}

export interface PermisoRol {
  model_permiso_id: {
    id: number;
    slug: string;
    nombre_corto: string;
    descripcion: string;
  };
  model_rol_id: { id: number; nombre: string; jerarquia: null };
  permiso_id: number;
  rol_id: number;
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
////

export interface PerfilResponse {
  data: Perfil[];

  status: {
    description: string;
    responseCode: number;
  };
}

export interface CreatePerfilResponse {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface EditPerfilRequest {
  id: number;
  nombre: string;
  descripcion: string;
  permisos: number[];
  rol_id: number;
}

export interface EditPerfilResponse {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface DeletePerfilResponse {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface RolsResponse {
  data: { items: Rols[] };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface Rols {
  id: number;
  nombre: string;
}
