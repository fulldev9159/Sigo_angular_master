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
