import { ContratoMarco4Cub } from '@data';
import { Area } from './area';

// REQ RESP GET ALL USERS
export interface DataResponseGetAllUser {
  items: User[];
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
  firma_archivo_id: any;
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
  celular: string;
  email: string;
  create_at: Date;
  update_at: Date;
  estado: boolean;
  firma: boolean;
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
  superior_proxy_id: number;
  nombreUser: string;
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

//  AGREGAR PERFIL USUARIO
export interface RequestAgregarPerfilUsusario {
  usuario_id: number;
  perfil_id: number;
  superior_proxy_id: number;
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
  superior_proxy_id: number;
}

export interface RequestActivateUser {
  usuario_id: number;
  values: {
    estado: boolean;
  };
}

export interface RequestUpFirmaUser {
  files: any;
}

export interface ResponseUpFirmaUser {
  repositorio_archivos_ids: number[];
}
export interface RequestAddFirmaUser {
  usuario_id: number;
  values: {
    firma_archivo_id: number;
  };
}
// GET CONTRATOS USER

export interface DataRespGetContratosUser {
  items: ContratosUser[];
}

export interface ContratosUser {
  contrato_id: 3;
  model_contrato_id: {
    aprob_jerarq_inic: boolean;
    costo_max: number;
    estado: boolean;
    fecha_fin: Date;
    fecha_inicio: Date;
    id: number;
    nombre: string;
    tiene_encuesta: boolean;
    tipo_contrato_id: number;
    tipo_moneda_id: number;
    tipo_pago: string;
    validacion_operaciones: boolean;
  };
  model_usuario_id: {
    apellidos: string;
    area_id: number;
    celular: string;
    created_at: Date;
    email: string;
    estado: boolean;
    firma_archivo_id: null;
    id: number;
    nombres: string;
    proveedor_id: number;
    rut: string;
    updated_at: Date;
    username: string;
  };
  usuario_id: 24;
}

export interface DataRespGetPosiblesContratosUser {
  items: PosiblesContratosUser[];
}

export interface PosiblesContratosUser {
  id: number;
  nombre: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  estado: boolean;
  tipo_contrato_id: number;
  costo_max: number;
  tipo_moneda_id: number;
  tipo_pago: string;
  aprob_jerarq_inic: boolean;
  validacion_operaciones: boolean;
  tiene_encuesta: boolean;
}

export interface RequestCreateUser {
  username: string;
  rut: string;
  nombres: string;
  apellidos: string;
  celular: string;
  proveedor_id: number;
  area_id: number;
  email: string;
  estado: boolean;
  contratos_marco: number[];
}

export interface RequestUpdateUser {
  usuario_id: number;
  values: {
    rut: string;
    nombres: string;
    apellidos: string;
    celular: string;
    proveedor_id: number;
    area_id: number;
    email: string;
  };
  contratos_marco: number[];
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
