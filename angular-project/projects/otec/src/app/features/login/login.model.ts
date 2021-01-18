import { Interface } from "readline";

export interface Credential {
  username: string;
  password: string;
}

export interface AuthLoginResponse{
  data:dataSectionResponse,
  status:statusSectionResponse
}

export interface dataSectionResponse{
   token:string,
   roles:rolesSectionResponse[]
}

export interface rolesSectionResponse{
  id:number,
  nombre:string,
  accesos: ModuloSectionResponse[]
}

export interface ModuloSectionResponse{
  modulo: string
  privilegio: PrivilegiosSectionResponse
}

export interface PrivilegiosSectionResponse{
  ver:boolean,
  editar:boolean
}
export interface statusSectionResponse{
  responseCode:number,
  description:string
}