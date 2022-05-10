import { Accion } from './accion';
// GET CUBS
export interface DataRespGetCubicaciones {
  items: Cubs4OT[];
}

export interface Cubs4OT {
  agencia_id: number;
  creador_usuario_nombre: string;
  cubicacion_descripcion: string;
  cubicacion_id: number;
  cubicacion_nombre: string;
  tipo_contrato_marco_nombre: string;
}

// GET PROYECTOS
export interface DataRespGetProyectos {
  items: Proyectos[];
}

export interface Proyectos {
  id: number;
  nombre: string;
  descripcion: string;
  usuario_creador_id: number;
}

// GET ADM CONTRATOS
export interface DataRespGetAdminContrato {
  items: AdminContrato4OT[];
}

export interface AdminContrato4OT {
  id: number;
  nombre: string;
  cantidad_de_trabajo: number;
}

// BUCLE

// GET OFICINA CENTRAL
export interface DataRespGetOficinaCentral {
  items: OficinaCentral[];
}

export interface OficinaCentral {
  agencia_id: number;
  descripcion: string;
  id: number;
  idafac: string;
}

// GET SOLICITAPO POR
export interface DataRespGetSolicitadoPor {
  items: SolicitadoPor[];
}

export interface SolicitadoPor {
  descripcion: string;
  id: number;
}

// GET COMUNA
export interface DataRespGetComuna {
  items: Comuna[];
}

export interface Comuna {
  comuna_id: number;
  comuna_nombre: string;
}

// GET TIPO DE RED
export interface DataRespGetTipoDeRed {
  items: TipoDeRed[];
}

export interface TipoDeRed {
  descripcion: string;
  estado: boolean;
  id: number;
}

// GET TIPO DE TRABAJO
export interface DataRespGetTipoDeTrabajo {
  items: TipoDeTrabajo[];
}

export interface TipoDeTrabajo {
  tipo_trabajo_codigo: string;
  tipo_trabajo_descripcion: string;
  tipo_trabajo_id: number;
}

// GET AREA DE NEGOCIO
export interface DataRespGetAreaDeNegocio {
  items: AreaDeNegocio[];
}

export interface AreaDeNegocio {
  descripcion: string;
  id: number;
}

// MOVIL

// GET PLAN DE PROYECTO
export interface DataRespGetPlanDeProyecto {
  items: PlanDeProyecto[];
}

export interface PlanDeProyecto {
  created_at: Date;
  estado: boolean;
  id: number;
  nombre: string;
}

// GET SITIO
export interface DataRespGetSitio {
  items: Sitio[];
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
  model_plan_id: { id: number; nombre: string; estado: true; created_at: Date };
  model_region_id: { id: number; nombre: string; codigo: string };
  nemonico: string;
  nombre: string;
  plan_id: number;
  region_id: number;
  tipo: string;
  vendor: string;
}
// ////

// GET OTs init

export interface RequestGetOTs {
  filtro_pestania: string;
  filtro_propietario: string;
  filtro_tipo: string;
}

export interface OT {
  id: number;
  nombre: string;
  tipo: string;
  fecha_inicio: string;
  fecha_termino: string;
  contrato_marco_nombre: string;
  proveedor_nombre: string;
  usuario_nombre: string;
  sesion_sce: string;
  estado_otdesc: string;
  etapa_otdesc: string;
  acciones: Accion[];
  acciones_str: string;
  delegacion: string;
  estado_otid: number;
  estado_slug: string;
  etapa_otid: number;
  etapa_slug: string;
  proveedor_id: number;
  subetapa_otdesc: string;
}

interface FieldOrder {
  ot_id: string;
}

export interface ResponseGetOTs {
  data: {
    items: OT[];
  };

  pagination: {
    total_pages: number;
    items_per_page: number;
    field_order: FieldOrder[];
    page: number;
    total_items: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}
// GET OTS end
export interface ApprovalOTResponse {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface ApprovalPagoOTResponse {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface RejectionOTResponse {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface AssignCoordinatorOTResponse {
  data: {
    ot_id: number;
    user_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface CancelOTResponse {
  data: {
    ot_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface AssignWorkerOTResponse {
  data: {
    ot_id: number;
    user_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface FinalizeOTJobsResponse {
  data: {
    ot_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface ApproveOTMinutesGenerationResponse {
  data: {
    ot_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface RejectOTMinutesGenerationResponse {
  data: {
    ot_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface ApproveOTMinutesValidationResponse {
  data: {
    ot_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface RejectOTMinutesValidationResponse {
  data: {
    ot_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface AuthorizePaymentsResponse {
  data: {
    ot_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface RejectPaymentsResponse {
  data: {
    ot_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface DataRspDetalleOT {
  id: number;
  nombre: string;
  tipo: string; // OT/AP
  proyecto_id: number; // o -1, si no aplica
  proyecto_nombre: string; // o vacio, si no aplica
  cubicacion_id: number;
  cubicacion_nombre: string;
  contrato_marco_id: number;
  contrato_marco_nombre: string;
  proveedor_id: number;
  proveedor_nombre: string;
  region_id: number;
  region_nombre: string;
  total: number;
  plan_id: number;
  plan_nombre: string;
  propietario_id: number;
  propietario_nombre: string;
  responsable_id: number;
  responsable_nombre: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  observaciones: string;
  sce_sesion: string;
  created_at: Date;
  total_tipo_moneda: string;
  tipo_estado_ot: {
    id: number;
    slug: string;
    nombre: string;
  };
  tipo_etapa_ot: {
    id: number;
    slug: string;
    nombre: string;
  };
  sitio: {
    id: number;
    codigo: string;
    metas: string;
    nombre: string;
    nemonico: string;
    region_id: number;
    region_nombre: string;
    comuna: string;
    geo_lat: number;
    geo_lon: number;
    direccion: string;
  };
  sustento_financiero: {
    tipo_sustento: string; // CAPEX/OPEX
    capex: {
      // o null, si no aplica o si viene CAPEX provisorio
      id: number;
      pmo_codigo: number;
      lp_codigo: string;
      pep2_codigo: string;
    };
    opex: {
      // o null, si no aplica o si viene OPEX provisorio
      id: number;
      id_opex: string;
      cuenta_sap: number;
      ceco_codigo: string;
    };
    capex_provisorio: {
      // o null, si no aplica o si viene CAPEX real
      id: number;
      pmo_codigo: number;
      lp_codigo: string;
      pep2_codigo: string;
    };
    opex_provisorio: {
      // o null, si no aplica o si viene OPEX real
      id: number;
      id_opex: string;
      cuenta_sap: number;
      ceco_codigo: string;
    };
  };
  tipo_contrato_marco_nombre: string;
  tipo_contrato_marco_id: number;
  tipo_numero_interno_id: number;
  tipo_numero_interno_nombre: string;
  tipo_subetapa_pago: {
    id: number;
    slug: string;
    nombre: string;
  };
}
