export interface Credential {
  username: string;
  password: string;
}

export interface AuthLoginResponse {
  data: DataSectionResponse;
  status: StatusSectionResponse;
}

export interface DataSectionResponse {
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
          privilegio: PrivilegiosSectionResponse;
        };
      };
    };
  };
}

export interface RolesModuleSectionResponse {
  [nombre: string]: {
    id: number;
    nombre: string;
    modulos: {
      [nombre: string]: {
        // id: number;
        nombre: string;
        privilegio: PrivilegiosSectionResponse;
      };
    };
  };
}
export interface ModuloSectionResponse {
  [nombre: string]: {
    // id: number;
    nombre: string;
    privilegio: PrivilegiosSectionResponse;
  };
}
export interface PrivilegiosSectionResponse {
  ver: boolean;
  editar: boolean;
}
export interface StatusSectionResponse {
  responseCode: number;
  description: string;
}
