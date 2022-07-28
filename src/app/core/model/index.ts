export * from './auth';
export * from './login';

export interface Response<T> {
  data: T;
  status: StatusResponse;
}

export interface StatusResponse {
  desc: string;
  code: number;
}
