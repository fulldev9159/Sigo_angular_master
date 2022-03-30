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
}

export interface PerfilResponse {
  data: Perfil[];

  status: {
    description: string;
    responseCode: number;
  };
}

export interface CreatePerfilRequest {
  nombre: string;
  descripcion: string;
  permisos: number[];
  rol_id: number;
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

export interface PermissionsGroup {
  module: string;
  permissions: Permiso[];
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
