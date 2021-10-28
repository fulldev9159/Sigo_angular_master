import { ContratoMarco } from '@data';

// GET USER
export interface User {
  id: number;
  username: string;
  rut: string;
  nombres: string;
  apellidos: string;
  celular: string;
  activo: boolean;
  firma: string;
  proveedor_id: number;
  area_id: number;
  email: string;
  created_at: string;
  updated_at: string;
  proveedor_nombre: string;
  area_nombre: string;
}

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
  contratos_marco: ContratoMarco[];
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
  contratos_marco: ContratoMarco[];
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

export interface Area {
  id: number;
  nombre: string;
  descripcion: string;
  interno: boolean;
}

export interface ProveedorResponse {
  data: {
    items: Proveedor[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}
export interface Proveedor {
  id: number;
  nombre: string;
  rut: number;
  email: string;
  telefono: string;
  direccion: string;
  activo: boolean;
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
