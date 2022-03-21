import { ContratoMarco4Cub } from '@data';
import { Area } from './area';

// REQ RESP GET ALL USERS
export interface DataResponseGetAllUser {
  usuario_all: User[];
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
  model_area_id: Area;
  model_proveedor_id: {
    created_at: Date;
    deleted_at: Date;
    direccion: string;
    dv: string;
    email: string;
    estado: boolean;
    id: number;
    interno: boolean;
    model_tipo_proveedor_id: null;
    nombre: string;
    numero_contrato: number;
    razon_social: string;
    representante_legal: string;
    rut: number;
    telefono: string;
    tipo_proveedor_id: number;
    updated_at: Date;
    vigencia_garantia: number;
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

// LIST USERS
export interface TableUserData {
  id: number;
  username: string;
  rut: string;
  nombres: string;
  apellidos: string;
  empresa: string;
  area: string;
  estado: boolean;
}

// LIST PERFILES USER
export interface ListPerfilesUserType {
  id: number;
  perfil_propio: string;
  proxy_id: number;
  descripcion: string;
  // rol: string;
  nombre: string;
  superior: string;
  superior_id: number;
}

// REQ RESP POSIBLES SUPERIORES
export interface DataGetPosiblesSuperiores {
  items: PosiblesSuperiores[];
}

export interface PosiblesSuperiores {
  perfil_id: number;
  perfil_nombre: string;
  proxy_id: number;
  usuario_nombre: string;
}

export interface RequestAgregarPerfilUsusario {
  usuario_id: number;
  perfil_id: number;
  superior_id: number;
}

export interface DataRspAgregarPerfilUsuario {
  usuarioproxy_id: number;
}

// UPDATE SUPERIOR PERFIL USUARIO
export interface RequestUpdatePerfilUsusario {
  usuarioproxy_id: number;
  values: ValuesReqUpdatePerfilUsuario;
}
export interface ValuesReqUpdatePerfilUsuario {
  superior_id: number;
}
///
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
