export * from './ot';
export * from './login';
export * from './cubicacion';
export * from './perfil';
export * from './permiso';
export * from './accion';
export * from './user';
export * from './tipo-moneda';
export * from './unidad';
export * from './tipo-numero-interno';
export * from './libro_obra';
export * from './notificaciones';
export * from './contrato';
export * from './proveedor';
export * from './region';
export * from './lpus';
export * from './informe-avance';
export * from './plan-proyecto';
export * from './sitio';
export interface StatusResponse {
  description: string;
  responseCode: number;
}

export interface MessageNotifyEffect {
  [i: string]: string;
}
