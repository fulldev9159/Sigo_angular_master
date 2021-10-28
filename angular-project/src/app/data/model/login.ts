import { Perfil } from './perfil';

// Login init
export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse {
  status: {
    description: string;
    response_code: number;
  };
  data: Login;
}
export interface Login {
  token: string;
  usuario_nombre: string;
  usuario_id: number;
  perfiles: Perfil[];
}

// Login done
