// Get cubicaciones init
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
export interface Cubicacion {
  asignado: boolean;
  contrato_marco_id: number;
  contrato_marco_nombre: string;
  contrato_marco_tipo_id: number;
  contrato_marco_tipo_nombre: string;
  creador_username: string;
  creador_usuario_id: number;
  creador_usuario_nombre: string;
  fecha_creacion: string;
  id: number;
  nombre: string;
  ot_id: number;
  ot_nombre: string;
  proveedor_id: number;
  proveedor_nombre: string;
  region_id: number;
  region_nombre: string;
  total: number;
  total_tipo_moneda: string;
  status: {
    description: string;
    response_code: number;
  };
}
// Get cubicaciones done

// Get LPUs Cubicacion end
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
  RowID: 2;
  created_at: Date;
  fecha_pagado: Date;
  fecha_solicitado: Date;
  original: boolean;
  porcentaje_pagado: number;
  porcentaje_solicitado: number;
}
// Get LPUs Cubicacion end
export interface CubicacionWithLpu extends Cubicacion {
  lpus: Lpu[];
}
export interface LpusRequest {
  lpu_id: number;
  cantidad: number;
}

// EDIT Cubicacion init
export interface RequestEditCubicacion {
  cubicacion_id: number;
  cubicacion_nombre: string;
  region_id: number;
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
// EDIT Cubicacion end
export interface ResponseDetalleCubicacion {
  data: {
    items: DetalleCubicacion[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface DetalleCubicacion {
  lpu_id: number;
  servicio_id: number;
  lpu_nombre: string;
  lpu_precio: number;
  tipo_moneda_id: number;
  tipo_moneda_cod: string;
  tipo_unidad_codigo: number;
  tipo_unidad_nombre: string;
  lpu_cantidad: number;
  lpu_subtotal: number;
  tipo_servicio_nombre: string;
}

// Autosuggest
export interface ResponseAutoSuggest {
  data: {
    items: string[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface AutoSuggestItem {
  id: number;
  name: string;
}

export interface RequestSaveCubicacion {
  cubicacion_nombre: string;
  region_id: number;
  usuario_id: number;
  contrato_marco_id: number;
  proveedor_id: number;
  // subcontrato_id: number[];
  lpus: LpusRequest[];
}

// Delete Cubicacion init
export interface ResponseDeleteCubicacion {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}
// Delete Cubicacion end
