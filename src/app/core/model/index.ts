export * from './auth';
export * from './perfil';
export * from './rol';
export * from './usuario';
export * from './accion';
export * from './usuario';
export * from './contrato';
export * from './cubicacion';
export * from './proveedor';
export * from './servicio';
export * from './unidad-obra';
export * from './carrito';
export * from './material';
export * from './ot';
export * from './agencia';
export * from './numero_interno';
export interface Response<T> {
  data: T;
  status: StatusResponse;
}

export interface StatusResponse {
  desc: string;
  code: number;
}

export interface Dropdown {
  name: string;
  code: number;
}
