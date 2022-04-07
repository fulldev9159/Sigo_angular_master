export interface RespDataGetAgencias4Cub {
  items: Agencias4Cub[];
}

export interface Agencias4Cub {
  id: number;
  nombre: string;
}

export interface RespDataProveedor4Cub {
  items: Proveedores4Cub[];
}

export interface Proveedores4Cub {
  cmarco_has_proveedor_id: number;
  codigo_acuerdo: string;
  id: number;
  nombre: string;
}
// Get cubicaciones init
export interface ResponseGetCubicaciones {
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
}
// Get cubicaciones done

// Get LPUs Cubicacion end
export interface ResponseGetLpus {
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

// GET Detalle Cubicación init
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
// GET Detalle Cubicación end

// GET Autosuggest init
export interface ResponseAutoSuggest {
  data: {
    items: string[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}
// GET Autosuggest end

// EDIT Cubicacion init
export interface LpusEditSave {
  lpu_id: number;
  cantidad: number;
}
export interface RequestEditCubicacion {
  cubicacion_id: number;
  cubicacion_nombre: string;
  region_id: number;
  contrato_marco_id: number;
  proveedor_id: number;
  lpus: LpusEditSave[];
}
export interface ResponseEditCubicacion {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}
// EDIT Cubicacion end

// SAVE cubicacion init
export interface RequestSaveCubicacion {
  cubicacion_nombre: string;
  region_id: number;
  usuario_id: number;
  contrato_marco_id: number;
  proveedor_id: number;
  lpus: LpusEditSave[];
}
// SAVE cubicacion end

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

export interface AutoSuggestItem {
  id: number;
  name: string;
}

export interface CubicacionWithLpu extends Cubicacion {
  lpus: Lpu[];
}
