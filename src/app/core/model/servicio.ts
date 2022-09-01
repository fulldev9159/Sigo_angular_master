export interface ModelServicio {
  id: number;
  tipo_servicio_id: number;
  unidad_id: number;
  descripcion: string;
  codigo: string;
  estado: boolean;
  es_pack_basico: boolean;
  cantidad_default: number;
  codigo_alcance: string;
  puntos_baremos: number;
  fecha_inicio: string;
  fecha_fin: string;
  requiere_evidencia: boolean;
}

//  GET SERVICIOS DE UNA AGENCIA/CONTRATO
export interface RequestGetServicioTipoAgenciaContratoProveedor {
  agencia_id: number;
  cmarco_has_prov_id: number;
  tipo_servicio_id: number;
  actividad_id: number;
}

export interface ServicioAgenciaContratoProveedor {
  codigo: string;
  descripcion: string;
  id: number;
  puntos_baremos: number;
  requiere_evidencia: boolean;
  unidad_codigo: string;
  unidad_desripcion: string;
  unidad_id: number;
  numero_producto: string;
}

// GET DETALLES DE UN SERVICIO DE UN TIPO DE UNA GENCIA/CONTRATO
export interface RequestGetDetallesServicioTipoAgenciaContratoProveedor {
  agencia_id: number;
  cmarco_has_proveedor_id: number;
  servicio_id: number;
  tipo_servicio_id: number;
  actividad_id: number;
}

export interface DetallesServicioTipoAgenciaContratoProveedor {
  precio_agencia?: number;
  precio_proveedor?: number;
  servicio_baremos?: number;
  servicio_codigo: string;
  servicio_id: number;
  servicio_nombre: string;
  servicio_precio_final?: number;
  servicio_precio_final_clp: number;
  servicio_tipo: number;
  servicio_unidad_id?: number;

  actividad_descripcion: string;
  actividad_id: string;

  servicio_tipo_moneda_codigo?: string;
  servicio_tipo_moneda_id?: number;
  tipo_servicio_descripcion: string;

  numero_producto?: string;

  servicio_unidad_codigo?: string;
  servicio_unidad_descripcion?: string;
}
