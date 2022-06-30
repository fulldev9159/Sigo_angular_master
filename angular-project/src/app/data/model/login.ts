import { Accion } from './accion';

// LOGIN
export interface RequestLogin {
  username: string;
  password: string;
}

export interface DataRespLogin {
  token: string;
  usuario_id: number;
  usuario_nombre: string;
}

export interface SessionData {
  token: string;
  usuario_nombre: string;
  usuario_id: number;
  nombre_perfil_select: string;
  permisos: string[];
  proxy_id: number;
  multiperfiles: boolean;
}

// GET DATABASE VERSION
export interface DatabaseVersion {
  checksum: number;
  description: string;
  execution_time: number;
  installed_by: string;
  installed_on: Date;
  installed_rank: number;
  script: string;
  success: boolean;
  type: string;
  version: string;
}
