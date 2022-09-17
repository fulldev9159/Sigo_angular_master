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

export interface PlanProyecto {
  id: number;
  nombre: string;
  estado: boolean;
  created_at: Date;
}

export interface Sitio {
  codigo: string;
  comuna: string;
  created_at: Date;
  direccion: string;
  duenno_estructura: string;
  fecha_liberacion: Date;
  fecha_termino: Date;
  geo_lat: number;
  geo_lon: number;
  id: number;
  metas: string;
  nemonico: string;
  nombre: string;
  plan_id: number;
  region_id: number;
  tipo: string;
  vendor: string;
  model_plan_id: { id: number; nombre: string; estado: true; created_at: Date };
  model_region_id: { id: number; nombre: string; codigo: string };
}
