import { Accion } from './accion';

export interface Login {
  token: string;
  usuario_id: number;
  usuario_nombre: string;
}

export interface SessionData extends Login {
  nombre_perfil_select?: string;
  permisos?: Accion[];
  perfil_proxy_id?: number;
  multiperfiles?: boolean;
  rol?: string;
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
