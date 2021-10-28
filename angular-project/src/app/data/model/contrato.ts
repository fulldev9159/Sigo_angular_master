export interface ResponseGetContrato {
  data: {
    items: ContratoMarco[];
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

export interface ContratoMarco {
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
