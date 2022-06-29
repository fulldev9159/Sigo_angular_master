export interface ModelTipoContrato {
  id: number;
  nombre: string;
}

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
  model_tipo_contrato_id: ModelTipoContrato;
}
export interface ContratoMarco extends ModelContratoMarco {
  model_tipo_moneda_id: {
    codigo: string;
    id: number;
    nombre: string;
  };
}

export interface TableListContratosMarcos
  extends Omit<
    ContratoMarco,
    'aprob_jerarq_inic' | 'tiene_encuesta' | 'validacion_operaciones'
  > {
  aprob_jerarq_inic: string;
  tiene_encuesta: string;
  validacion_operaciones: string;
  tipo_contrato: string;
  tipo_moneda: string;
}

export interface ReqEditContrato {
  contrato_marco_id: number;
  values: ValuesEditContrato;
}

export interface ValuesEditContrato {
  nombre: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  activo: boolean;
  tipo_contrato_id: number;
  costo_max: number;
  tipo_moneda_id: number;
  tipo_pago: number;
  aprob_jerarq_inic: boolean;
  validacion_operaciones: boolean;
  tiene_encuesta: boolean;
}

export interface ReqActivarContrato {
  contrato_marco_id: number;
  values: {
    estado: boolean;
  };
}
