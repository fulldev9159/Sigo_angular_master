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

export interface Notificacion {
  id: number;
  proxy_id: number;
  permiso_slug: string;
  mensaje: string;
  metadata: string;
  created_at: Date;
  checked_at?: any;
  model_proxy_id: {
    id: number;
    usuario_orig: number;
    usuario_id: number;
    perfil_id: number;
    superior_proxy_id: number;
    created_at: Date;
    updated_at: Date;
  };
}
