import { Accion } from './accion';
import { ModelTipoContrato, ModelContratoMarco } from './contrato';
import { DetalleCubicacion } from './cubicacion';
import { ModelProxy, ModelUsuario, UsuarioInvolucrado } from './user';
import { NumeroInterno } from './numero_interno';
import { ModelOficinaCentral } from './oficina';
import { ModelComuna } from './comuna';
import { ModelTipoTrabajo } from './tipo_trabajo';
import { ModelPlan } from './plan';
import { ModelSitio } from './sitio';
// GET OTS
export interface RequestGetOTs {
  filtro_pestania: string;
  filtro_propietario: string;
  filtro_tipo: number;
}

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

// DETALLE OT
export interface DataRespGetDetalleOT {
  numeros_interno: NumeroInterno[]; // FIJO;
  ot: {
    id: number; // BASE
    nombre: string; // BASE
    contrato_marco_id: number; // BASE
    model_contrato_marco_id: ModelContratoMarco; // BASE
    cubicacion_id: number; // BASE
    model_cubicacion_id: DetalleCubicacion; // BASE
    fecha_fin: Date; // BASE
    fecha_inicio: Date; // BASE
    proyecto_id: number; // BASE
    observaciones: string; // BASE
    created_at: Date; // BASE
    model_propietario_usuario_id: ModelUsuario; // BASE
    model_responsable_proxy_id: ModelProxy; // BASE
    model_tipo_estado_ot_id: { id: number; slug: string; nombre: string }; // BASE
    model_tipo_etapa_ot_id: { id: number; slug: string; nombre: string }; // BASE
    propietario_usuario_id: number; // BASE
    responsable_proxy_id: number; // BASE
    sce_session: string; // BASE
    tipo_estado_ot_id: number; // BASE
    tipo_etapa_ot_id: number; // BASE
    aceptacion_inicial_id: number;

    // BUCLE
    oficina_central_id: number;
    model_oficina_central_id: ModelOficinaCentral;
    solicitante_id: number;
    model_solicitante_id: { id: number; descripcion: string }; // BUCLE
    direccion: string;
    altura: string;
    piso: string;
    departamento: string;
    comuna_id: number;
    model_comuna_id: ModelComuna;
    tipo_red_id: number;
    model_tipo_red_id: { id: number; descripcion: string; estado: boolean }; // BUCLE
    tipo_trabajo_id: number;
    model_tipo_trabajo_id: ModelTipoTrabajo;
    tiene_boleta_garantia: boolean;
    tiene_permisos: boolean;
    area_negocio: string;
    nombre_proyectista: string;

    // ORDINARIO
    carta_adjudicacion: string;
    fecha_adjudicacion: Date;
    numero_pedido: string;
    materia: null;

    // MOVIL
    plan_id: number;
    model_plan_id: ModelPlan;
    sitio_plan_id: number;
    model_sitio_plan_id: ModelSitio;

    // SUSTENTO FINANCIERO
    tipo_sustento: string;
    pmo_codigo: number;
    lp: string;
    pep2: string;
    id_opex: string;
    ceco: string;
    cuenta_sap: string;
    es_sustento_provisorio: boolean;
  };
  usuarios_involucrados: UsuarioInvolucrado[];
}

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

// FIJO

// NUMERO INTERNO
export interface DataRespGetTipoNumeroInterno {
  items: TipoNumeroInterno[];
}

export interface TipoNumeroInterno {
  id: number;
  nombre: string;
}

// NUMERO INTERNO HAS OT
export interface DataRespGetNumeroInternoHasOT {
  items: NumeroInternoHasOT[];
}

export interface NumeroInternoHasOT {
  id: number;
  ot_id: number;
  numero_interno: string;
  tipo_numero_interno_id: number;
}

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
  numero_pedido: string;
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
  // id: number;
  ot_datos: CreateOTOrdinario;
}
export interface RequestCreateOTMovil {
  // id: number;
  ot_datos: CreateOTMovil;
}

export interface RequestCreateOTBucle {
  // id: number;
  ot_datos: CreateOTBucle;
}

export interface RequestCreateOTFijo {
  // id: number;
  ot_datos: CreateOTBase;
  ot_numero_interno: {
    tipo_numero_interno_id: number;
    numero_interno: string[];
  };
}

// GET MOTIVOS DE RECHAZO
export interface DataRespGetMotivoRechazo {
  items: MotivoRechazo[];
}

export interface MotivoRechazo {
  id: number;
  motivo: string;
  tipo: string;
}

// ACEPTAR O RECHAZAR
export interface RequestAceptarRechazarOT {
  ot_id: number;
  values: {
    estado: string; // ACEPTADO O RECHAZADO
    observacion?: string;
    tipo?: number;
  };
}

export interface DataRespPosiblesTrabajadores {
  items: PosibleTrabajador[];
}

export interface PosibleTrabajador {
  id: number;
  nombre: string;
}

// GET DETALLE INFORME DE AVANCE
export interface DetalleInformeAvanceModelMaterial {
  codigo: string;
  descripcion: string;
  unidad_id: number;
  origen: string;
  tipo_moneda_id: number;
  valor: number;
  codigo_sap: any;
}

export interface DetalleInformeAvanceMaterial {
  id: number;
  material_cod: string;
  informe_has_uob_id: number;
  cantidad: number;
  unidad_id: number;
  tipo_moneda_id: number;
  valor: number;
  codigo_sap: string;
  origen: string;
  factor_conversion: number;

  model_unidad_id: DetalleInformeAvanceModelUnidad;
  model_tipo_moneda_id: DetalleInformeAvanceModelTipoMoneda;
  model_material_cod: DetalleInformeAvanceModelMaterial;
}

export interface DetalleInformeAvanceModelUnidadObraCod {
  codigo: string;
  descripcion: string;
  unidad_id: number;
}

export interface DetalleInformeAvanceUob {
  id: number;
  informe_has_servicio_id: number;
  unidad_obra_cod: string;
  cantidad: number;
  unidad_id: number;
  clave: string;

  model_unidad_obra_cod: DetalleInformeAvanceModelUnidadObraCod;
  model_unidad_id: DetalleInformeAvanceModelUnidad;
  many_informe_has_material: DetalleInformeAvanceMaterial[];
}

export interface DetalleInformeAvanceModelServicio {
  id: number;
  tipo_servicio_id: number;
  unidad_id: number;
  descripcion: string;
  codigo: string;
  estado: boolean;
  es_pack_basico: boolean;
  cantidad_default: number;
  codigo_alcance: string;
  puntos_baremos: number;
  fecha_inicio: string;
  fecha_fin: string;
  requiere_evidencia: boolean;
}

export interface DetalleInformeAvanceModelUnidad {
  id: number;
  codigo: string;
  descripcion: string;
  estado: boolean;
}

export interface DetalleInformeAvanceModelTipoMoneda {
  id: number;
  codigo: string;
  nombre: string;
}

export interface DetalleInformeAvanceServicio {
  id: number;
  informe_avance_id: number;
  servicio_id: number;
  actividad_id: number;
  tipo_servicio_id: number;
  cantidad: number; // USAR
  unidad_id: number;
  puntos_baremos: number;
  prov_has_serv_monto: number;
  monto_tipo_moneda_id: number;
  factor_conversion_monto: number;
  prov_has_serv_precio: number;
  precio_tipo_moneda_id: number;
  factor_conversion_precio: number;
  adicional_aceptacion_estado: string;
  adicional_aceptacion_usuario_id: number;
  adicional_aceptacion_fecha: Date;
  adicional_causas_rechazo_id: number;
  adicional_rechazo_observacion: string;
  requiere_evidencia: boolean;
  evidencia_id: number;

  model_servicio_id: DetalleInformeAvanceModelServicio;
  model_unidad_id: DetalleInformeAvanceModelUnidad;
  model_monto_tipo_moneda_id: DetalleInformeAvanceModelTipoMoneda;
  model_precio_tipo_moneda_id: DetalleInformeAvanceModelTipoMoneda;
  many_informe_has_uob: DetalleInformeAvanceUob[];
}

export interface DetalleInformeAvance {
  id: number;
  ot_id: number;
  observacion: string;
  envio_usuario_id: number;
  envio_fecha: Date;
  aprobacion_usuario_id: number;
  aprobacion_estado: string;
  aprobacion_fecha: Date;
  created_at: Date;

  many_informe_has_servicio: DetalleInformeAvanceServicio[];
}

// CATEGORIAS ARCHIVO
export interface DataRespGetCategoriaArchivo {
  items: {
    id: number;
    nombre: string;
  }[];
}

// LIBRO DE OBRAS
export interface ReqCreateRegistroLibroObra {
  ot_id: number;
  usuario_id: number;
  observaciones: string;
  archivos?: number[];
}

// ARCHIVO
export interface DataRespSubirArchivo {
  repositorio_archivos_ids: number[];
}

export interface DataRespGetLibroDeObras {
  items: any[];
}

// ////
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

// export interface DataRspDetalleOT {
//   id: number;
//   nombre: string;
//   tipo: string; // OT/AP
//   proyecto_id: number; // o -1, si no aplica
//   proyecto_nombre: string; // o vacio, si no aplica
//   cubicacion_id: number;
//   cubicacion_nombre: string;
//   contrato_marco_id: number;
//   contrato_marco_nombre: string;
//   proveedor_id: number;
//   proveedor_nombre: string;
//   region_id: number;
//   region_nombre: string;
//   total: number;
//   plan_id: number;
//   plan_nombre: string;
//   propietario_id: number;
//   propietario_nombre: string;
//   responsable_id: number;
//   responsable_nombre: string;
//   fecha_inicio: Date;
//   fecha_fin: Date;
//   observaciones: string;
//   sce_sesion: string;
//   created_at: Date;
//   total_tipo_moneda: string;
//   tipo_estado_ot: {
//     id: number;
//     slug: string;
//     nombre: string;
//   };
//   tipo_etapa_ot: {
//     id: number;
//     slug: string;
//     nombre: string;
//   };
//   sitio: {
//     id: number;
//     codigo: string;
//     metas: string;
//     nombre: string;
//     nemonico: string;
//     region_id: number;
//     region_nombre: string;
//     comuna: string;
//     geo_lat: number;
//     geo_lon: number;
//     direccion: string;
//   };
//   sustento_financiero: {
//     tipo_sustento: string; // CAPEX/OPEX
//     capex: {
//       // o null, si no aplica o si viene CAPEX provisorio
//       id: number;
//       pmo_codigo: number;
//       lp_codigo: string;
//       pep2_codigo: string;
//     };
//     opex: {
//       // o null, si no aplica o si viene OPEX provisorio
//       id: number;
//       id_opex: string;
//       cuenta_sap: number;
//       ceco_codigo: string;
//     };
//     capex_provisorio: {
//       // o null, si no aplica o si viene CAPEX real
//       id: number;
//       pmo_codigo: number;
//       lp_codigo: string;
//       pep2_codigo: string;
//     };
//     opex_provisorio: {
//       // o null, si no aplica o si viene OPEX real
//       id: number;
//       id_opex: string;
//       cuenta_sap: number;
//       ceco_codigo: string;
//     };
//   };
//   tipo_contrato_marco_nombre: string;
//   tipo_contrato_marco_id: number;
//   tipo_numero_interno_id: number;
//   tipo_numero_interno_nombre: string;
//   tipo_subetapa_pago: {
//     id: number;
//     slug: string;
//     nombre: string;
//   };
// }
