import { ContratoMarco4Cub } from '@data';
import { Area } from './area';

//
export interface DataResponseGetAllUser {
  usuarios: User[];
}
export interface User {
  apellidos: string;
  area_id: number;
  celular: string;
  created_at: string;
  deleted_at: null;
  email: string;
  estado: boolean;
  id: number;
  model_area_id: {
    id: number;
    nombre: string;
  };
  model_proveedor_id: {
    id: number;
    nombre: string;
  };
  nombres: string;
  proveedor_id: number;
  rut: string;
  updated_at: string;
  username: string;

  // activo: boolean;
  // firma: string;
  // proveedor_nombre: string;
  // area_nombre: string;
}

// GET USER

export interface UsersResponse {
  data: {
    items: User[];
  };

  pagination: {
    total_pages: number;
    items_per_page: number;
    field_order: {
      [index: string]: string;
    }[];
    page: number;
    total_items: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface UserWithDetail extends User {
  contratos_marco: ContratoMarco4Cub[];
  perfiles: PerfilUser[];
}

// CREATE/ EDIT
export interface CreateUserRequest {
  username: string;
  nombres: string;
  apellidos: string;
  rut: string;
  firma: string;
  celular: string;
  email: string;
  proveedor_id: number;
  area_id: number;
  perfiles: PerfilFormUser[];
  contratos_marco: number[];
  superior_id: any;
}

export interface EditUserRequest extends CreateUserRequest {
  id: number;
}

export interface CreateUserResponse {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface EditUserResponse {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

// DETALLE USUARIO
export interface DetalleUsuarioResponse {
  data: DetalleUsuario;

  status: {
    description: string;
    responseCode: number;
  };
}

export interface DetalleUsuario {
  contratos_marco: ContratoMarco4Cub[];
  perfiles: PerfilUser[];
}

// DELETE
export interface DeleteResponse {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

// ACTIVACION
export interface ActivacionResponse {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

// DATOS
export interface PerfilFormUser {
  perfil_id: number;
  persona_a_cargo_id: number;
}
export interface PerfilUser {
  id: number;
  descripcion: string;
  nombre: string;
  persona_a_cargo_id: number;
  persona_a_cargo_nombre: string;
  superior_descripcion: string;
  superior_id: number;
}

export interface AreaResponse {
  data: {
    items: Area[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface ContratoResponse {
  data: {
    items: Contrato[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}
export interface Contrato {
  id: number;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  tipo_codigo: number;
  tipo_glosa: string;
  activo: boolean;
}

export interface ResponsePosiblesSuperiores {
  data: {
    items: PosiblesSuperiores[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}
export interface PosiblesSuperiores {
  id: number;
  username: string;
  rut: string;
  nombres: string;
  apellidos: string;
}
