export interface RespDataGetAllCubs {
  items: Cubicacion[];
}

export interface Cubicacion {
  agencia_codigo: string;
  agencia_estado: boolean;
  agencia_id: number;
  agencia_nombre: string;
  agencia_region_id: number;
  agencia_region_nombre: string;
  altura_desde: string;
  altura_hasta: string;
  asignado: number;
  cmarco_has_proveedor_id: number;
  codigo_acuerdo: string;
  contrato_id: number;
  contrato_marco_nombre: string;
  contrato_marco_tipo_id: number;
  contrato_marco_tipo_nombre: string;
  creador_username: string;
  creador_usuario_id: number;
  creador_usuario_nombre: string;
  cubicacion_descripcion: string;
  cubicacion_fecha_creacion: Date;
  cubicacion_id: number;
  cubicacion_nombre: string;
  direccion_desde: string;
  direccion_hasta: string;
  ot_id: number;
  ot_nombre: string;
  proveedor_id: number;
  proveedor_nombre: string;
  tipo_cubicacion_descripcion: string;
  tipo_cubicacion_id: number;
  total: number;
  total_tipo_moneda: string;
}

export interface RespDataGetDetalleCubs {
  data_cubicacion: DataDetalleCubicacion[];
  servicios: ServiciosDetalle[];
}

export interface DataDetalleCubicacion {
  agencia_id: number;
  altura_desde: string;
  altura_hasta: string;
  cmarco_has_proveedor_id: number;
  codigo_acuerdo: string;
  contrato_id: number;
  created_at: Date;
  descripcion: string;
  direccion_desde: string;
  direccion_hasta: string;
  id: number;
  nombre: string;
  proveedor_id: number;
  tipo_cubicacion_id: number;
  updated_at: Date;
  usuario_creador_id: number;
}

export interface ServiciosDetalle {
  data_servicio: {
    actividad_desc: string;
    actividad_id: number;
    agencia_preciario_monto: number;
    cub_has_srv_id: number;
    factor_conversion_monto: number;
    factor_conversion_precio: number;
    monto_tipo_moneda_cod: string;
    monto_tipo_moneda_id: number;
    precio_tipo_moneda_cod: string;
    precio_tipo_moneda_id: number;
    prov_has_serv_precio: number;
    puntos_baremos: number;
    servicio_cantidad: number;
    servicio_cod: string;
    servicio_desc: string;
    servicio_id: number;
    servicio_precio_final: number;
    servicio_precio_final_clp: number;
    tipo_servicio_desc: string;
    tipo_servicio_id: number;
    unidad_medida_cod: string;
    unidad_medida_id: number;
  };
  unidades_obra: [
    {
      data_unidad_obra: {
        clave: string;
        cub_has_uob_id: number;
        unidad_obra_cod: string;
        unidad_obra_desc: string;
        uo_precio_total_clp: number;
        uob_cantidad: number;
        uob_unidad_medida_cod: string;
        uob_unidad_medida_id: number;
      };
      data_materiales: Materiales4Detalle[];
    }
  ];
}

export interface Materiales4Detalle {
  codigo_sap: string;
  cub_has_material_id: number;
  factor_conversion: number;
  material_cantidad: number;
  material_cod: string;
  material_desc: string;
  material_unidad_medida_cod: string;
  material_unidad_medida_id: number;
  material_valor_clp: number;
  origen: string;
  tipo_moneda_cod: string;
  tipo_moneda_id: number;
  valor: number;
}

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
  actividad_id: number;
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
  servicio_precio_final_clp: number;
  servicio_tipo: number;
  servicio_unidad_id: number;
  tipo_moneda_id: number;

  actividad_descripcion: string;
  actividad_id: string;

  servicio_tipo_moneda_codigo: string;
  servicio_tipo_moneda_id: number;
  tipo_servicio_descripcion: string;
}

//  GET DATOS UNIDAD OBRA 4 CUB
export interface RequestGetDatosUnidadObra4Cub {
  cantidad: number;
  uo_codigo: string;
}

export interface RespDataGetDatosUnidadObra4Cub {
  // items: DatosUnidadObra4Cub[];
  material_arr: Materiales4Cub[];
  uo_codigo: string;
  uo_nombre: string;
  uo_precio_total_clp: number;
  uo_unidad_id: number;
}

export interface DatosUnidadObra4Cub {
  precargado?: boolean; // si es true, viene de la carga inicial al editar la cubicacion
  uo_rowid?: number;

  material_arr: Materiales4Cub[];
  uo_codigo: string;
  uo_nombre: string;
  uo_precio_total_clp: number;
  uo_unidad_id: number;
  uo_cantidad?: number;
  uob_unidad_medida_cod?: string;
}

export interface Materiales4Cub {
  material_cantidad: number;
  material_codigo: string;
  material_nombre: string;
  material_origen: string;
  material_precio: number;
  material_precio_clp: number;
  material_tipo_moneda_id: number;
  material_unidad_id: number;
  material_unidad_medida_cod?: string;
  material_valor: number;
}

export interface Carrito {
  precargado?: boolean; // si es true, viene de la carga inicial al editar la cubicacion
  servicio_rowid?: number;

  precio_agencia: number;
  precio_proveedor: number;
  servicio_baremos: number;
  servicio_codigo: string;
  servicio_id: number;
  servicio_nombre: string;
  servicio_precio_final: number;
  servicio_precio_final_clp: number;
  servicio_tipo: number;
  servicio_unidad_id: number;
  servicio_unidad_cod?: string;
  tipo_moneda_id: number;
  actividad_descripcion: string;
  actividad_id: string;
  servicio_tipo_moneda_codigo: string;
  servicio_tipo_moneda_id: number;
  tipo_servicio_descripcion: string;
  servicio_cantidad?: number;
  unidades_obras: DatosUnidadObra4Cub[];
}

export interface RequestCreateCubicacion {
  cubicacion_datos: {
    nombre: string;
    tipo_cubicacion_id: number;
    contrato_id: number;
    agencia_id: number;
    proveedor_id: number;
    codigo_acuerdo: string;
    cmarco_has_proveedor_id: number;
    usuario_creador_id: number;
    direccion_desde: string;
    altura_desde: string;
    direccion_hasta: string;
    altura_hasta: string;
    descripcion: string;
  };
  cubicacion_detalle: {
    nuevo: NuevoServicio[];
  };
}

export interface RequestEditCubicacion {
  cubicacion_datos?: {
    id: number;
    nombre?: string;
    tipo_cubicacion_id?: number;
    contrato_id?: number;
    agencia_id?: number;
    proveedor_id?: number;
    codigo_acuerdo?: string;
    cmarco_has_proveedor_id?: number;
    usuario_creador_id?: number;
    direccion_desde?: string;
    altura_desde?: string;
    direccion_hasta?: string;
    altura_hasta?: string;
    descripcion?: string;
  };
  cubicacion_detalle: {
    nuevo?: NuevoServicio[];
    actualizar: {
      servicio?: ServicioUOActualizar[];
      unidad_obra?: ServicioUOActualizar[];
      agregar_uob_a_servicio: UOAgregar[];
    };
  };
}

export interface ServicioUOActualizar {
  rowid: number;
  cantidad: number;
}

export interface UOAgregar {
  servicio_rowid: number;
  uob_codigo: string;
  uob_cantidad: number;
}
export interface NuevoServicio {
  servicio_id: number;
  actividad_id: number;
  tipo_servicio_id: number;
  cantidad: number;
  unidad_obra: NuevoUO[];
}

export interface NuevoUO {
  uob_codigo: string;
  cantidad: number;
}

export interface DataRespCreateCubicacion {
  response: any;
}

export interface DataRespEditCubicacion {
  response: any;
}

export interface RequestDeleteDetallesCubicacion {
  servicio?: number[];
  unidad_obra?: number[];
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
// export interface Cubicacion {
//   asignado: boolean;
//   contrato_marco_id: number;
//   contrato_marco_nombre: string;
//   contrato_marco_tipo_id: number;
//   contrato_marco_tipo_nombre: string;
//   creador_username: string;
//   creador_usuario_id: number;
//   creador_usuario_nombre: string;
//   fecha_creacion: string;
//   id: number;
//   nombre: string;
//   ot_id: number;
//   ot_nombre: string;
//   proveedor_id: number;
//   proveedor_nombre: string;
//   region_id: number;
//   region_nombre: string;
//   total: number;
//   total_tipo_moneda: string;
// }
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
//// export interface RequestEditCubicacion {
////   cubicacion_id: number;
////   cubicacion_nombre: string;
////   region_id: number;
////   contrato_marco_id: number;
////   proveedor_id: number;
////   lpus: LpusEditSave[];
//// }
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
