export * from './auth';
export * from './perfil';
export * from './rol';
export * from './usuario';
export * from './accion';
export * from './usuario';
export * from './contrato';

export interface Response<T> {
  data: T;
  status: StatusResponse;
}

export interface StatusResponse {
  desc: string;
  code: number;
}
