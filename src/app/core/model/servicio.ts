import {
  DetalleUOCubicacion,
  UnidadObraFromInformeAvance,
} from './unidad-obra';

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

export interface ModelServicioWithTipo extends ModelServicio {
  model_tipo_servicio_id: ModelTipoServicioId;
}

export interface ModelServicioWithTipoAndUnidad extends ModelServicioWithTipo {
  model_unidad_id: {
    id: number;
    codigo: string;
    descripcion: string;
    estado: boolean;
  };
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
  precio: number;
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

// DETALLE SERVICIO CUBICACION
export interface Unidad {
  id: number;
  codigo: string;
  descripcion: string;
  estado: boolean;
}

export interface TipoMoneda {
  id: number;
  codigo: string;
  nombre: string;
}

export interface Actividad {
  codigo: string;
  descripcion: string;
  id: number;
}

export interface DetalleServicioCubicacion {
  id: number;
  cubicacion_id: number;
  servicio_id: number;
  actividad_id: number;
  tipo_servicio_id: number;
  cantidad: number;
  unidad_id: number;
  puntos_baremos: number;
  prov_has_serv_precio: number;
  precio_tipo_moneda_id: number;
  factor_conversion_precio: number;
  requiere_evidencia: boolean;
  valor_unitario_clp: number;
  model_servicio_id: ModelServicio;
  model_unidad_id: Unidad;
  numero_producto: string;
  autorizacion_ing_estado: string;
  autorizacion_ing_usuario_id: number;
  autorizacion_ing_fecha: Date;
  model_precio_tipo_moneda_id: {
    id: number;
    codigo: string;
    nombre: string;
  };
  many_cubicacion_has_uob: DetalleUOCubicacion[];

  model_actividad_id: Actividad;
  model_tipo_servicio_id: ModelTipoServicioId;
}

export interface ModelTipoServicioId {
  id: number;
  codigo: string;
  descripcion: string;
  estado: boolean;
  contrato_marco_id: number;
}
// INFORME AVANCE
export interface ServicioFromInfomeAvance {
  id: number;
  informe_avance_id: number;
  servicio_id: number;
  actividad_id: number;
  tipo_servicio_id: number;
  cantidad: number; // USAR
  cantidad_cubicada: number;
  unidad_id: number;
  puntos_baremos: number;
  prov_has_serv_precio: number;
  precio_tipo_moneda_id: number;
  factor_conversion_precio: number;
  adicional_aceptacion_estado: string;
  adicional_aceptacion_usuario_id: number;
  adicional_aceptacion_fecha: Date;
  adicional_causas_rechazo_id: number;
  adicional_rechazo_observacion: string;
  requiere_evidencia: boolean;
  evidencia_id: number;
  valor_unitario_clp: number;

  model_servicio_id: ModelServicioWithTipo;
  model_unidad_id: Unidad;
  model_precio_tipo_moneda_id: TipoMoneda;
  model_actividad_id: ModelActividadId;
  numero_producto: string;
  many_informe_has_uob: UnidadObraFromInformeAvance[];
}

export interface ModelActividadId {
  id: number;
  descripcion: string;
  codigo: string;
}

export interface ReqSubirEvidencia {
  ot_id: number;
  observaciones: string;
  informe_has_servicio_id: number;
  archivos: number[];
}
