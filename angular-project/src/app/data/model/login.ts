import { Perfil } from './perfil';

// Login init
export interface RequestLogin {
  username: string;
  password: string;
}
export interface ResponseLogin {
  status: {
    description: string;
    responseCode: number;
  };
  data: Login;
}
export interface Login {
  token: string;
  usuario_nombre: string;
  usuario_id: number;
  perfiles: Perfil[];
  status: {
    description: string;
    response_code: number;
  };
}
// Login end
