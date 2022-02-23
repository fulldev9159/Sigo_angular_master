import { Perfil } from './perfil';

// Login init
export interface RequestLogin {
  username: string;
  password: string;
}

export interface DataRespLogin {
  token: string;
  usuario_id: number;
  usuario_nombre: string;
}
// Login end

export interface perfil {
  hola: string;
}
export interface SessionData {
  token: string;
  usuario_nombre: string;
  usuario_id: number;
  perfiles: Perfil[];
  proxy_id: number;
}
