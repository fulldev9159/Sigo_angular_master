import { Accion } from './accion';
import { ModelTipoContrato, ModelContratoMarco } from './contrato';
import { DetalleCubicacion } from './cubicacion';
import { ModelProxy, ModelUsuario, UsuarioInvolucrado } from './user';
import { NumeroInterno } from './numero-interno';
import { ModelOficinaCentral } from './oficina';
import { ModelComuna } from './comuna';
import { ModelTipoTrabajo } from './tipo-trabajo';
import { ModelPlan } from './plan';
import { ModelSitio } from './sitio';
import { IdNombreType } from '.';

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
    // BASE
    id: number;
    nombre: string;
    contrato_marco_id: number;
    model_contrato_marco_id: ModelContratoMarco;
    cubicacion_id: number;
    model_cubicacion_id: DetalleCubicacion;
    fecha_fin: Date;
    fecha_inicio: Date;
    proyecto_id: number;
    observaciones: string;
    created_at: Date;
    model_propietario_usuario_id: ModelUsuario;
    model_responsable_proxy_id: ModelProxy;
    model_tipo_estado_ot_id: { id: number; slug: string; nombre: string };
    model_tipo_etapa_ot_id: { id: number; slug: string; nombre: string };
    propietario_usuario_id: number;
    responsable_proxy_id: number;
    sce_session: string;
    tipo_estado_ot_id: number;
    tipo_etapa_ot_id: number;
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

// GET ADM CONTRATOS
export interface AdminContrato4OT {
  id: number;
  nombre: string;
  cantidad_de_trabajo: number;
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
  ot_datos: CreateOTOrdinario;
}
export interface RequestCreateOTMovil {
  ot_datos: CreateOTMovil;
}

export interface RequestCreateOTBucle {
  ot_datos: CreateOTBucle;
}

export interface RequestCreateOTFijo {
  ot_datos: CreateOTBase;
  ot_numero_interno: {
    tipo_numero_interno_id: number;
    numero_interno: string[];
  };
}

// GET MOTIVOS DE RECHAZO
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

// GET POSIBLE SUPERVISOR DE TRABAJOS
// tslint:disable-next-line
export interface PosibleTrabajador extends IdNombreType {}

// ACEPTAR/RECHAZAR ADICIONALES
export interface RequestAceptarRechazarAdicionales {
  ot_id: number;
  adicionales_aceptados?: number[];
  adicionales_rechazadas?: {
    row_id: number;
    causas_rechazo_id: number;
    observacion: string;
  };
}

export interface RequestAprobarRechazarOperaciones {
  ot_id: number; // a partir de la ot se obtiene el id de la aceptacion
  estado: string; // APROBAR o RECHAZAR
  tipo_rechazo_id?: number; //
  observacion?: string;
}

export interface RequestValidateActa {
  ot_id: number;
  tipo_pago: string;
  observacion: string;
  estado: string;
  detalle: {
    servicio: {
      rowid: number;
      cantidad: number;
      porcentaje: number;
    }[];
    unidad_obra: {
      rowid: number;
      cantidad: number;
      porcentaje: number;
    }[];
  };
}

export interface RequestAdicionales {
  ot_id: number;
  adicionales_solicitados?: {
    nuevo: {
      servicio_id: number;
      actividad_id: number;
      tipo_servicio_id: number;
      cantidad: number;
      unidad_obra: {
        uob_codigo: string;
        cantidad: number;
      }[];
    }[];
    actualizar?: {
      servicio: {
        rowid: number;
        cantidad: number;
      }[];
      unidad_obra: {
        rowid: number;
        cantidad: number;
      }[];
      agregar_uob_a_servicio?: {
        servicio_rowid: number;
        uob_codigo: string;
        uob_cantidad: number;
      }[];
    };
  };
}
