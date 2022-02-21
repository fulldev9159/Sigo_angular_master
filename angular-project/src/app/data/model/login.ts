import { Perfil } from './perfil';

// Login init
export interface RequestLogin {
  username: string;
  password: string;
}
export interface ResponseLogin {
  status: {
    desc: string;
    code: number;
  };
  data: Login;
}
export interface Login {
  token: string;
  usuario_nombre: string;
  usuario_id: number;
  perfiles: Perfil[];
  status: {
    desc: string;
    code: number;
  };
}
// Login end
