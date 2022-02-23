import { Perfil } from './perfil';

// Login init
export interface RequestLogin {
  username: string;
  password: string;
}

export interface DataRespLogin {
  token: string;
}
// Login end
export interface SessionData {
  token: string;
  usuario_nombre: string;
  usuario_id: number;
  perfiles: Perfil[];
  status: {
    description: string;
    response_code: number;
  };
}
