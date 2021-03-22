export interface Credential {
  username: string;
  password: string;
}

export interface LoginRequest {
  User: string;
  //   password: string;
}

export interface DataResponseLogin {
  token: string;
  nombre_usuario: string;
  roles_modulos: {
    [nombre: string]: {
      id: number;
      nombre: string;
      modulos: {
        [nombre: string]: {
          // id: number;
          nombre: string;
          privilegio: {
            ver: boolean;
            editar: boolean;
          };
        };
      };
    };
  };
  usuario_id: number;
}

export interface LogoutRequest {
  User: string;
  Token: string;
}

export interface LogoutResponse {
  user: string;
  token: string;
  createdat: string;
  modifiedat: string;
}
