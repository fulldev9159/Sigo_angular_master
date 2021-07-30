export interface Cubicacion {
  id: number;
  nombre: string;
  fecha_creacion: Date;
  creador_usuario_id: number;
  creador_username: string;
  creador_usuario_nombre: string;
  region_id: number;
  region_nombre: string;
  contrato_marco_id: number;
  contrato_marco_nombre: string;
  contrato_marco_tipo_id: number;
  contrato_marco_tipo_nombre: string;
  proveedor_id: number;
  proveedor_nombre: string;
  ot_id: number;
  ot_nombre: string;
  asignado: boolean;
  total: number;
}

export interface Lpu {
  lpu_cantidad: number;
  lpu_id: number;
  lpu_nombre: string;
  lpu_precio: number;
  lpu_subtotal: number;
  requiere_evidencia: boolean;
  servicio_id: number;
  tipo_moneda_cod: string;
  tipo_moneda_id: number;
  tipo_servicio_nombre: string;
  tipo_unidad_codigo: number;
  tipo_unidad_nombre: string;
}

export interface CubicacionWithLpu extends Cubicacion {
  lpus: Lpu[];
}

// interface FieldOrder {
//   cubicacion_id: string;
// }

export interface CubicacionesResponse {
  data: {
    items: Cubicacion[];
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

export interface LpusResponse {
  data: {
    items: Lpu[];
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

export interface LpusRequest {
  lpu_id: number;
  cantidad: number;
}

export interface RequestEditCubicacion {
  cubicacion_id: number;
  cubicacion_nombre: string;
  region_id: number;
  // usuario_id: number;
  contrato_marco_id: number;
  proveedor_id: number;
  lpus: LpusRequest[];
}

export interface EditCubicacionResponse {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}
