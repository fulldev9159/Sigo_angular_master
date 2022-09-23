import { ModelProveedor } from './proveedor';
import { Area } from './area';

export interface ModelUsuario {
  apellidos: string;
  area_id: number;
  celular: string;
  created_at: Date;
  email: string;
  estado: boolean;
  firma_archivo_id: number;
  id: number;
  nombres: string;
  proveedor_id: number;
  rut: string;
  updated_at: Date;
  username: string;
}

export interface ModelProxy {
  created_at: Date;
  id: number;
  model_usuario_id: ModelUsuario;
  perfil_id: number;
  superior_proxy_id: number;
  updated_at: Date;
  usuario_id: number;
  usuario_orig: number;
}

export interface UsuarioInvolucrado {
  concepto: string;
  id: number;
  model_proxy_id: ModelProxy;
  ot_id: number;
  proxy_id: number;
}
export interface User extends ModelUsuario {
  model_area_id: Area;
  model_proveedor_id: ModelProveedor;
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
  nombre: string;
  superior: string;
  superior_proxy_id: number;
  nombreUser: string;
}

// REQ RESP POSIBLES SUPERIORES
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
  guia_subgrupo_id: number;
  delegated_auth: boolean;
  password?: string;
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

export interface ModelUsuarioLogin {
  apellidos: string;
  area_id: number;
  celular: string;
  created_at: Date;
  deleted_at: null;
  email: string;
  estado: boolean;
  id: number;
  model_area_id: null;
  model_proveedor_id: null;
  nombres: string;
  proveedor_id: number;
  rut: string;
  updated_at: Date;
  username: string;
}

// tslint:disable-next-line
export interface ModelSuperir extends ModelProxy {}
