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
  nombre_usuario:string;
  roles_modules: RolesSectionResponse[];
}

export interface RolesSectionResponse {
  id: number;
  nombre: string;
  modulos: ModuloSectionResponse[];
}

export interface ModuloSectionResponse {
  id:number,
  nombre: string;
  // privilegio: PrivilegiosSectionResponse;
}

// export interface PrivilegiosSectionResponse {
//   ver: boolean;
//   editar: boolean;
// }
export interface StatusSectionResponse {
  responseCode: number;
  description: string;
}
