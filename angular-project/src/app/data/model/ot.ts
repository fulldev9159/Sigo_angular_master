import { Accion } from './accion';

// GET OTS
export interface RequestGetOTs {
  filtro_pestania: string;
  filtro_propietario: string;
  filtro_tipo: number;
}
export interface DataRespGetOTs {
  items: OT[];
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
  numeros_interno: {
    // FIJO
    id: number;
    model_tipo_numero_interno_id: { id: number; nombre: string };
    numero_interno: string;
    ot_id: number;
    tipo_numero_interno_id: number;
  }[];
  ot: {
    id: number; // BASE
    nombre: string; // BASE
    contrato_marco_id: number; // BASE
    model_contrato_marco_id: {
      // BASE
      aprob_jerarq_inic: boolean;
      costo_max: number;
      estado: boolean;
      fecha_fin: Date;
      fecha_inicio: Date;
      id: number;
      nombre: string;
      tiene_encuesta: boolean;
      tipo_contrato_id: number;
      tipo_moneda_id: number;
      tipo_pago: string;
      validacion_operaciones: boolean;
      model_tipo_contrato_id: {
        id: number;
        nombre: string;
      };
    };
    cubicacion_id: number; // BASE
    model_cubicacion_id: {
      // BASE
      agencia_id: number;
      altura_desde: string;
      altura_hasta: string;
      cmarco_has_proveedor_id: number;
      codigo_acuerdo: string;
      contrato_id: number;
      created_at: Date;
      descripcion: string;
      direccion_desde: string;
      direccion_hasta: string;
      id: number;
      nombre: string;
      proveedor_id: number;
      tipo_cubicacion_id: number;
      updated_at: Date;
      usuario_creador_id: number;
    };
    fecha_fin: Date; // BASE
    fecha_inicio: Date; // BASE
    proyecto_id: number; // BASE
    observaciones: string; // BASE
    created_at: Date; // BASE
    model_propietario_usuario_id: {
      // BASE
      apellidos: string;
      area_id: number;
      celular: string;
      created_at: Date;
      email: string;
      estado: boolean;
      firma_archivo_id: number;
      id: number;
      nombres: string;
      proveedor_id: number;
      rut: string;
      updated_at: Date;
      username: string;
    };
    model_responsable_proxy_id: {
      // BASE
      created_at: Date;
      id: number;
      model_usuario_id: {
        apellidos: string;
        area_id: number;
        celular: string;
        created_at: Date;
        email: string;
        estado: true;
        firma_archivo_id: null;
        id: number;
        nombres: string;
        proveedor_id: number;
        rut: string;
        updated_at: Date;
        username: string;
      };
      perfil_id: number;
      superior_proxy_id: number;
      updated_at: Date;
      usuario_id: number;
      usuario_orig: number;
    };
    model_tipo_estado_ot_id: { id: number; slug: string; nombre: string }; // BASE
    model_tipo_etapa_ot_id: { id: number; slug: string; nombre: string }; // BASE
    propietario_usuario_id: number; // BASE
    responsable_proxy_id: number; // BASE
    sce_session: string; // BASE
    tipo_estado_ot_id: number; // BASE
    tipo_etapa_ot_id: number; // BASE
    aceptacion_inicial_id: number;

    // BUCLE
    oficina_central_id: number; // BUCLE
    model_oficina_central_id: {
      // BUCLE
      id: number;
      descripcion: string;
      agencia_id: number;
      idafac: string;
    };
    solicitante_id: number; // BUCLE
    model_solicitante_id: { id: number; descripcion: string }; // BUCLE
    direccion: string; // BUCLE
    altura: string; // BUCLE
    piso: string; // BUCLE
    departamento: string; // BUCLE
    comuna_id: number; // BUCLE
    model_comuna_id: {
      // BUCLE
      id: number;
      region_id: number;
      codigo: number;
      nombre: string;
    };
    tipo_red_id: number; // BUCLE
    model_tipo_red_id: { id: number; descripcion: string; estado: boolean }; // BUCLE
    tipo_trabajo_id: number; // BUCLE
    model_tipo_trabajo_id: {
      // BUCLE
      id: number;
      codigo: string;
      descripcion: string;
      estado: boolean;
      tipo_cubicacion_id: number;
    };
    tiene_boleta_garantia: boolean; // BUCLE
    tiene_permisos: boolean; // BUCLE
    area_negocio: string; // BUCLE
    nombre_proyectista: string; // BUCLE

    // ORDINARIO
    carta_adjudicacion: string; // ORDINARIO
    fecha_adjudicacion: Date; // ORDINARIO
    numero_pedido: string; // ORDINARIO
    materia: null; // ORDINARIO

    // MOVIL
    plan_id: number; // MOVIL
    model_plan_id: {
      id: number;
      nombre: string;
      estado: boolean;
      created_at: Date;
    };
    sitio_plan_id: number; // MOVIL
    model_sitio_plan_id: {
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
    };
    // SUSTENTO FINANCIERO
    tipo_sustento: string; // SUSTENTO FINANCIERO
    pmo_codigo: number; // SUSTENTO FINANCIERO
    lp: string; // SUSTENTO FINANCIERO
    pep2: string; // SUSTENTO FINANCIERO
    id_opex: string; // SUSTENTO FINANCIERO
    ceco: string; // SUSTENTO FINANCIERO
    cuenta_sap: string; // SUSTENTO FINANCIERO
    es_sustento_provisorio: boolean; // SUSTENTO FINANCIERO
  };
  usuarios_involucrados: {
    // EXTRA
    concepto: string;
    id: number;
    model_proxy_id: {
      created_at: Date;
      id: number;
      model_usuario_id: {
        apellidos: string;
        area_id: number;
        celular: string;
        created_at: Date;
        email: string;
        estado: boolean;
        firma_archivo_id: number;
        id: number;
        nombres: string;
        proveedor_id: number;
        rut: string;
        updated_at: Date;
        username: string;
      };
      perfil_id: number;
      superior_proxy_id: number;
      updated_at: Date;
      usuario_id: number;
      usuario_orig: number;
    };
    ot_id: number;
    proxy_id: number;
  }[];
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
export interface RequestAceptarRechazarInicialOT {
  ot_id: number;
  values: {
    estado: string; // ACEPTADO O RECHAZADO
    observacion?: string;
    tipo?: number;
  };
}

export interface DataRespPosiblesTrabajadores {
  items: string;
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
