import { Accion } from './accion';

// CREATE OT
export interface CreateOTBase {
  adm_contrato_proxy_id: number;
  proyecto_id: number;
  nombre: string;
  cubicacion_id: number;
  observaciones: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  tipo_sustento: string;
  es_sustento_provisorio: boolean;
  pmo_codigo: number;
  id_opex: string;
  lp: string;
  cuenta_sap: number;
  pep2: string;
  ceco: string;
}

export interface CreateOTOrdinario extends CreateOTBase {
  carta_adjudicacion: string;
  fecha_adjudicacion: Date;
  //numero_pedido: string;
  materia: string;
}
export interface CreateOTMovil extends CreateOTBase {
  plan_id: number;
  sitio_plan_id: number;
}

export interface CreateOTBucle extends CreateOTBase {
  oficina_central_id: number;
  solicitante_id: number;
  direccion: string;
  altura: string;
  piso: string;
  departamento: string;
  comuna_id: number;
  tipo_red_id: number;
  tipo_trabajo_id: number;
  tiene_boleta_garantia: boolean;
  tiene_permisos: boolean;
  area_negocio: string;
  nombre_proyectista: string;
}

export interface RequestCreateOTOrdinario {
  ot_datos: CreateOTOrdinario;
  ot_numero_interno: {
    tipo_numero_interno_id: number;
    numero_interno: string[];
  };
}
export interface RequestCreateOTMovil {
  ot_datos: CreateOTMovil;
}

export interface RequestCreateOTBucle {
  ot_datos: CreateOTBucle;
  ot_numero_interno: {
    tipo_numero_interno_id: number;
    numero_interno: string[];
  };
}

export interface RequestCreateOTFijo {
  ot_datos: CreateOTBase;
  ot_numero_interno: {
    tipo_numero_interno_id: number;
    numero_interno: string[];
  };
}

// FILTROS OT
export interface RequestBandejaOT {
  filtro_pestania: string;
  filtro_propietario: string;
  filtro_tipo: number;
}
// BANDEJA OT
export interface OT {
  contrato_marco_nombre: string;
  delegacion: string;
  estado_otdesc: string;
  estado_otid: number;
  estado_slug: string;
  etapa_otdesc: string;
  etapa_otid: number;
  etapa_slug: string;
  fecha_inicio: string;
  fecha_termino: string;
  id: number;
  nombre: string;
  proveedor_id: number;
  proveedor_nombre: string;
  sce_session: string;
  tipo_cubicacion_id: number;
  usuario_nombre: string;
  acciones: Accion[];
}

// GET SOLICITAPO POR
export interface SolicitadoPor {
  descripcion: string;
  id: number;
}

// GET TIPO DE RED
export interface TipoDeRed {
  descripcion: string;
  estado: boolean;
  id: number;
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
