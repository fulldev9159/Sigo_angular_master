export * from './ot';
export * from './login';
export * from './cubicacion';
export * from './perfil';
export * from './permiso';
export * from './accion';
export * from './user';
export * from './tipo-moneda';
export * from './unidad';
export * from './libro_obra';
export * from './notificaciones';
export * from './contrato';
export * from './proveedor';
export * from './region';
export * from './lpus';
export * from './informe-avance';
export * from './sustento-financiero';
export * from './area';

export interface Response<T> {
  data: T;
  status: StatusResponse;
}

export interface StatusResponse {
  desc: string;
  code: number;
}

export interface MessageNotifyEffect {
  [i: string]: string;
}

export interface SelectType {
  name: string;
  code: string;
}
