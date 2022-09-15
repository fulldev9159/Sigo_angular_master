import { ModelAgencia } from './agencia';

// OFICINAS CENTRALES
export interface OficinaCentral {
  id: number;
  descripcion: string;
  agencia_id: number;
  idafac: string;
  model_agencia_id: ModelAgencia;
}

// GET SOLICITAPO POR
export interface SolicitadoPor {
  descripcion: string;
  id: number;
}

// GET COMUNAS
export interface Comuna {
  comuna_id: number;
  comuna_nombre: string;
}
