import { Perfil } from './perfil';

export interface Login {
  token: string;
  usuario_nombre: string;
  usuario_id: number;
  perfiles: Perfil[];
}

export interface LoginResponse {
  status: {
    description: string;
    response_code: number;
  };
  data: Login;
}
