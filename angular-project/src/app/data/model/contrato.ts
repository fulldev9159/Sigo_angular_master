export interface DataRspGetAllContratos {
  items: ContratoMarco[];
}

export interface ContratoMarco {
  estado: boolean;
  aprob_jerarq_inic: boolean;
  costo_max: number;
  fecha_fin: Date;
  fecha_inicio: Date;
  id: number;
  nombre: string;
  model_tipo_contrato_id: {
    id: number;
    nombre: string;
  };
  model_tipo_moneda_id: {
    codigo: string;
    id: number;
    nombre: string;
  };
  tiene_encuesta: boolean;
  tipo_contrato_id: number;
  tipo_moneda_id: number;
  tipo_pago: string;
  validacion_operaciones: boolean;
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

/////
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

export interface ResponseGetContrato4Cub {
  data: {
    items: ContratoMarco4Cub[];
  };

  pagination: {
    total_pages: number;
    items_per_page: number;
    field_order: any[];
    page: number;
    total_items: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface ContratoMarco4Cub {
  id: number;
  nombre: string;
  tipo_contrato_id: string;
  tipo_contrato_nombre: string;
  activo: boolean;
  fecha_inicio: Date;
  fecha_termino: Date;
  tipo_codigo: number;
  tipo_glosa: string;
}
