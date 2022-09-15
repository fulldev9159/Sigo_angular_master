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

// GET TIPO DE RED
export interface TipoDeRed {
  descripcion: string;
  estado: boolean;
  id: number;
}

// GET TIPO DE TRABAJO
export interface TipoDeTrabajo {
  tipo_trabajo_codigo: string;
  tipo_trabajo_descripcion: string;
  tipo_trabajo_id: number;
}

// GET AREA DE NEGOCIO
export interface AreaDeNegocio {
  descripcion: string;
  id: number;
}
