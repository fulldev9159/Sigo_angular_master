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

export interface DataRspGetAllContratos {
  contrato_marcos: ContratoMarco[];
}

export interface ContratoMarco {
  activo: boolean;
  aprob_jerarq_inic: boolean;
  costo_max: number;
  fecha_fin: Date;
  fecha_inicio: Date;
  id: number;
  nombre: string;
  tiene_encuesta: boolean;
  tipo_contrato: number;
  tipo_moneda_id: number;
  tipo_pago: string;
  validacion_operaciones: boolean;
}

export interface TableListContratosMarcos
  extends Omit<
    ContratoMarco,
    'activo' | 'aprob_jerarq_inic' | 'tiene_encuesta' | 'validacion_operaciones'
  > {
  activo: string;
  aprob_jerarq_inic: string;
  tiene_encuesta: string;
  validacion_operaciones: string;
}
