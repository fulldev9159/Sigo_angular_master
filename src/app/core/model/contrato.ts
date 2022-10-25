import { ModelUsuario } from './usuario';

export interface ModelContratoMarco {
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
}

export interface ContratoMarconWithTipoContratoModel
  extends ModelContratoMarco {
  model_tipo_contrato_id: { id: number; nombre: string };
}

// AGENCIAS DE UN CONTRATO
export interface AgenciaContrato {
  id: number;
  nombre: string;
}

// ACTIVIDADES DE UN CONTRATO/PROVEEDOR
export interface ActividadContratoProveedor {
  actividad_id: number;
  descripcion: string;
}

// TIPO DE SERVICIO DE UN CONTRATO
export interface TipoServicioContrato {
  descripcion: string;
  id: number;
}

// GET CONTRATOS USER
//// export interface ContratosUser {
////   contrato_id: 3;
////   model_contrato_id: ModelContratoMarco;
////   model_usuario_id: ModelUsuario;
////   usuario_id: 24;
//// }

// GET POSIBLES CONTRATOS USER
// tslint:disable-next-line
export interface PosiblesContratosUser extends ModelContratoMarco {}
