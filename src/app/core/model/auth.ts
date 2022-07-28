import { Login } from './login';

export interface SessionData extends Login {
  nombre_perfil_select?: string;
  permisos?: string[];
  perfil_proxy_id?: number;
  multiperfiles?: boolean;
  rol?: string;
}
