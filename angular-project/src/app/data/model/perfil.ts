import { Permiso } from './permiso';

export interface Perfil {
  created_at: Date;
  descripcion: string;
  eliminable: boolean;
  id: number;
  nombre: string;
  permisos: Permiso[];
  updated_at: Date;
  superior_id: number;
  superior_nombre: string;
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
  superior: number;
  permisos: number[];
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
