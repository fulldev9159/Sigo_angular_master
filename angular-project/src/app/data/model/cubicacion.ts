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

export interface RespDataTipoCubicacion4Cub {
  items: TipoCubicacion4Cub[];
}

export interface TipoCubicacion4Cub {
  descripcion: string;
  id: number;
}

export interface RespDataActividad4Cub {
  items: Actividad4Cub[];
}

export interface Actividad4Cub {
  codigo: string;
  descripcion: string;
  id: number;
}

export interface RespDataTipoServicioEspecialidad4Cub {
  items: TipoServicioEspecialidad4Cub[];
}

//  GET SERVICIOS 4 CUB
export interface RequestGetServicios4Cub {
  agencia_id: number;
  cmarco_has_prov_id: number;
  tipo_servicio_id: number;
}

export interface RespDataGetServicios4Cub {
  items: Servicios4Cub[];
}

export interface Servicios4Cub {
  codigo: string;
  descripcion: string;
  id: number;
  puntos_baremos: number;
  requiere_evidencia: boolean;
  unidad_codigo: string;
  unidad_desripcion: string;
  unidad_id: number;
}

//   GET UNIDADES DE OBREA 4 CUB
export interface RequestGetUnidadObra4Cub {
  servicio_cod: string;
  actividad_id: number;
}

export interface RespDataGetUnidadObra4Cub {
  items: UnidadObra4Cub[];
}

export interface UnidadObra4Cub {
  actividad_id: number;
  clave: string;
  id: number;
  model_actividad_id: { id: number; codigo: string; descripcion: string };
  model_servicio_cod: {
    cantidad_default: number;
    codigo: string;
    codigo_alcance: string;
    descripcion: string;
    es_pack_basico: boolean;
    estado: boolean;
    fecha_fin: Date;
    fecha_inicio: Date;
    id: number;
    puntos_baremos: number;
    requiere_evidencia: boolean;
    tipo_servicio_id: number;
    unidad_id: number;
  };
  model_unidad_obra_cod: {
    codigo: string;
    descripcion: string;
    unidad_id: number;
  };
  servicio_cod: string;
  unidad_obra_cod: string;
}

//  GET DATOS SERVICIOS 4 CUB
export interface RequestGetDatosServicio4Cub {
  agencia_id: number;
  cmarco_has_proveedor_id: number;
  servicio_id: number;
  tipo_servicio_id: number;
}

export interface RespDataGetDatosServicio4Cub {
  items: DatosServicio4Cub[];
}

export interface DatosServicio4Cub {
  precio_agencia: number;
  precio_proveedor: number;
  servicio_baremos: number;
  servicio_codigo: string;
  servicio_id: number;
  servicio_nombre: string;
  servicio_precio_final: number;
  servicio_precio_final_clp: null;
  servicio_tipo: number;
  servicio_unidad_id: number;
  tipo_moneda_id: number;
}

//  GET DATOS UNIDAD OBRA 4 CUB
export interface RequestGetDatosUnidadObra4Cub {
  cantidad: number;
  uo_codigo: string;
}

export interface RespDataGetDatosUnidadObra4Cub {
  items: DatosUnidadObra4Cub[];
}

export interface DatosUnidadObra4Cub {
  material_cantidad: number;
  material_codigo: string;
  material_nombre: string;
  material_origen: string;
  material_tipo_moneda_id: number;
  material_unidad_id: number;
  material_valor: number;
  precio_material: number;
  precio_material_clp: null;
  uo_codigo: string;
  uo_nombre: string;
  uo_precio_total_clp: number;
  uo_unidad_id: number;
}

export interface Carrito {
  precio_agencia: number;
  precio_proveedor: number;
  servicio_baremos: number;
  servicio_codigo: string;
  servicio_id: number;
  servicio_nombre: string;
  servicio_precio_final: number;
  servicio_precio_final_clp: null;
  servicio_tipo: number;
  servicio_unidad_id: number;
  tipo_moneda_id: number;
  unidades_obras: DatosUnidadObra4Cub[];
}
//  ///
export interface TipoServicioEspecialidad4Cub {
  codigo: string;
  contrato_marco_id: number;
  descripcion: string;
  estado: boolean;
  id: number;
  model_contrato_marco_id: {
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
  };
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
