export * from './ot';
export * from './login';
export * from './cubicacion';
export * from './perfil';
export * from './permiso';
export * from './accion';
export * from './user';
export * from './tipo-moneda';
export * from './unidad';
export * from './libro-obra';
export * from './notificaciones';
export * from './contrato';
export * from './proveedor';
export * from './region';
export * from './informe-avance';
export * from './sustento-financiero';
export * from './area';
export * from './numero-interno';
export * from './oficina';
export * from './comuna';
export * from './tipo-trabajo';
export * from './plan';
export * from './sitio';
export * from './proyecto';
export * from './servicio';
export * from './unidad-obra';
export * from './materiales';
export * from './archivo';
export * from './agencia';
export * from './actividad';
export * from './rol';

export interface Response<T> {
  data: T;
  status: StatusResponse;
}

export interface ResponseItems<T> {
  data: {
    items: T;
  };
  status: StatusResponse;
}

export interface StatusResponse {
  desc: string;
  code: number;
}

export interface IdNombreType {
  id: number;
  nombre: string;
}

export interface MessageNotifyEffect {
  [i: string]: string;
}

export interface SelectType {
  name: string;
  code: string;
}
