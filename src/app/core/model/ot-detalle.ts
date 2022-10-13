import { DetalleComuna } from './comuna';
import { ModelContratoMarco } from './contrato';
import {
  DetalleCubicacion,
  DetalleCubicacionWithContratoModel,
} from './cubicacion';
import { NumeroInterno } from './numero_interno';
import { OficinaCentral } from './oficina-central';
import { PlanProyecto, Sitio } from './ot';
import { DetalleTipoDeTrabajo } from './tipo-trabajo';
import { ModelProxyUsuarios, ModelUsuario } from './usuario';

export interface UsuarioInvolucrado {
  concepto: string;
  id: number;
  model_proxy_id: ModelProxyUsuarios;
  ot_id: number;
  proxy_id: number;
}

export interface DetalleOT {
  numeros_interno?: NumeroInterno[]; // FIJO;
  ot: InfoOT;
  // FLUJO OT
  pdf_inicial: {
    concepto: string;
    categoria_id: number;
    categoria_nombre: string;
    extension: string;
    nombre_original: string;
    size: number;
    human_size: string;
    url: string;
    created_at: Date;
  };
  usuarios_involucrados: UsuarioInvolucrado[];
}

export interface InfoOT {
  // BASE
  id: number;
  nombre: string;
  cubicacion_id: number;
  model_cubicacion_id: DetalleCubicacionWithContratoModel;
  fecha_fin: Date;
  fecha_inicio: Date;
  proyecto_id: number;
  flg_quiebre: boolean;
  observaciones: string;
  created_at: Date;
  model_propietario_usuario_id: ModelUsuario;
  model_responsable_proxy_id: ModelProxyUsuarios;
  model_tipo_estado_ot_id: { id: number; slug: string; nombre: string };
  model_tipo_etapa_ot_id: { id: number; slug: string; nombre: string };
  propietario_usuario_id: number;
  responsable_proxy_id: number;
  sce_session: string;
  tipo_estado_ot_id: number;
  tipo_etapa_ot_id: number;
  aceptacion_inicial_id: number;

  // BUCLE
  oficina_central_id?: number;
  model_oficina_central_id?: OficinaCentral;
  solicitante_id?: number;
  model_solicitante_id?: { id: number; descripcion: string }; // BUCLE
  direccion?: string;
  altura?: string;
  piso?: string;
  departamento?: string;
  comuna_id?: number;
  model_comuna_id?: DetalleComuna;
  tipo_red_id?: number;
  model_tipo_red_id?: { id: number; descripcion: string; estado: boolean }; // BUCLE
  tipo_trabajo_id?: number;
  model_tipo_trabajo_id?: DetalleTipoDeTrabajo;
  tiene_boleta_garantia?: boolean;
  tiene_permisos?: boolean;
  area_negocio?: string;
  nombre_proyectista?: string;

  // ORDINARIO
  carta_adjudicacion?: string;
  fecha_adjudicacion?: Date;
  numero_pedido?: string;
  materia?: null;

  // MOVIL
  plan_id?: number;
  model_plan_id?: PlanProyecto;
  sitio_plan_id?: number;
  model_sitio_plan_id?: Sitio;

  // SUSTENTO FINANCIERO
  tipo_sustento: string;
  pmo_codigo: number;
  lp: string;
  pep2: string;
  id_opex: string;
  ceco: string;
  cuenta_sap: string;
  es_sustento_provisorio: boolean;

  // FLUJO OT
  model_aceptacion_inicial_id: {
    id: number;
    ot_id: number;
    supervisor_usuario_id: number;
    jefe_area_usuario_id: number;
    supervisor_aceptacion_estado: string;
    jefe_area_aceptacion_estado: string;
    supervisor_aceptacion_fecha: Date;
    jefe_area_aceptacion_fecha: Date;
    causas_rechazo_id: number;
    observacion: string;
  };
}
