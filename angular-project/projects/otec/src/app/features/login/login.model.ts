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
  roles: RolesSectionResponse[];
}

export interface RolesSectionResponse {
  id: number;
  nombre: string;
  accesos: ModuloSectionResponse[];
}

export interface ModuloSectionResponse {
  modulo: string;
  privilegio: PrivilegiosSectionResponse;
}

export interface PrivilegiosSectionResponse {
  ver: boolean;
  editar: boolean;
}
export interface StatusSectionResponse {
  responseCode: number;
  description: string;
}
