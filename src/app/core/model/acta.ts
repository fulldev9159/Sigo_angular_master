import { ModelMaterial } from './material';
import { ModelServicio } from './servicio';
import { ModelUnidadObra } from './unidad-obra';

export interface DetalleServicio4Acta {
  servicio_numero_producto: string;
  adicional_aceptacion_estado: string;
  cantidad_total: number;
  evidencia_id: number;
  factor_conversion_precio: number;
  faltante_cantidad: number;
  id: number;
  informe_avance_id: number;
  ot_id: number;
  precio_tipo_moneda_codigo: string;
  precio_tipo_moneda_id: number;
  precio_tipo_moneda_nombre: string;
  prov_has_serv_precio: number;
  puntos_baremos: number;
  requiere_evidencia: boolean;
  servicio_id: number;
  tipo_contrato_id: number;
  unidad_codigo: string;
  unidad_descripcion: string;
  unidad_id: number;

  faltante_porcentaje_entero: number;
  faltante_porcentaje_fraccion: number;

  servicio_codigo: string;
  servicio_descripcion: string;

  valor_unitario_clp: number;
}

export interface DetalleUO4Acta {
  cantidad_total: number;
  faltante_cantidad: number;
  id: number;
  informe_avance_id: number;
  ot_id: number;
  tipo_contrato_id: number;
  unidad_codigo: string;
  unidad_descripcion: string;
  unidad_id: number;
  unidad_obra_cod: string;
  faltante_porcentaje_entero: number;
  faltante_porcentaje_fraccion: number;
  unidad_obra_desc: string;
  valor_unitario_clp: number;
  servicio_adicional_aceptacion_estado: string;

  informe_has_servicio_id: number;
  servicio_codigo: string;
  servicio_descripcion: string;

  servicio_numero_producto: string;
  servicio_requiere_evidencia: boolean;
  servicio_evidencia_id: number;
}

export interface ActaTipoPago {
  id: number;
  descripcion: string;
}

export interface RequestValidarActa {
  ot_id: number;
  tipo_pago: string;
  observacion: string;
  estado: string;
  detalle: {
    servicio: Servicios4ValidarActa[];
    unidad_obra: UOs4ValidarActa[];
  };
}

export interface Servicios4ValidarActa {
  rowid: number;
  cantidad: number;
  porcentaje: number;
}

export interface UOs4ValidarActa {
  rowid: number;
  cantidad: number;
  porcentaje: number;
}

// ACEPTAR/RECHAZAR ADICIONALES
export interface RequestAceptarRechazarAdicionales {
  ot_id: number;
  adicionales_aceptados?: number[];
  adicionales_rechazados?: number[];
  causas_rechazo_id?: number;
  observacion?: string;
}

// LAST ACTA
export interface LastActa {
  created_at: Date;
  flg_pagado: boolean;
  id: number;
  informe_avance_id: number;
  obs_fin_trabajos: string;
  obs_validacion: null;
  ot_id: number;
  tipo_pago: string;
  validacion_estado: string;
  validacion_fecha: Date;
  validacion_usuario_id: number;
  autorizacion_estado: string;
  autorizacion_fecha?: any;
  tipo_sustento: string;
  pmo_codigo: number;
  id_opex?: any;
  lp: string;
  cuenta_sap?: any;
  pep2: string;
  ceco?: any;
  valor_total_clp: number;

  imputacion1_estado: string;
  imputacion1_fecha: Date;
  imputacion2_estado: string;
  imputacion2_fecha: Date;
  flg_pagar_cerrar: Date;

  many_acta_detalle_servicio: DetalleServicioLastActa[];
  many_acta_detalle_uob: DetalleUnidadObraLastActa[];
}

export interface DetalleServicioLastActa {
  acta_id: number;
  id: number;
  informe_has_servicio_id: number;

  imputacion1_estado: null;
  imputacion2_estado: null;
  imputacion1_json: null;
  imputacion2_json: null;
  model_informe_has_servicio_id: {
    numero_producto: string;
    actividad_id: number;
    adicional_aceptacion_estado: string;
    adicional_aceptacion_fecha: Date;
    adicional_aceptacion_usuario_id: number;
    adicional_causas_rechazo_id: number;
    adicional_rechazo_observacion: string;
    cantidad: number;
    evidencia_id: number;
    factor_conversion_precio: number;
    id: number;
    informe_avance_id: number;
    model_servicio_id: ModelServicio;
    precio_tipo_moneda_id: number;
    prov_has_serv_precio: number;
    puntos_baremos: number;
    requiere_evidencia: boolean;
    servicio_id: number;
    tipo_servicio_id: number;
    unidad_id: number;
    valor_unitario_clp: number;
  };
  pago_cantidad: number;
  pago_porcentaje: number;

  valor_detalle_clp: number;
}

export interface DetalleUnidadObraLastActa {
  id: number;
  acta_id: number;
  informe_has_uob_id: number;
  pago_cantidad: number;
  pago_porcentaje: number;
  model_informe_has_uob_id: {
    id: number;
    informe_has_servicio_id: number;
    unidad_obra_cod: string;
    cantidad: number;
    unidad_id: number;
    clave: string;
    model_informe_has_servicio_id: ModelInformeHasServicio;
    model_unidad_obra_cod: ModelUnidadObra;
    many_informe_has_material: MaterialesLastActa[];
    valor_unitario_clp: number;
  };
  valor_detalle_clp: number;
}

export interface ModelInformeHasServicio {
  id: number;
  informe_avance_id: number;
  servicio_id: number;
  actividad_id: number;
  tipo_servicio_id: number;
  cantidad: number;
  unidad_id: number;
  puntos_baremos: number;
  prov_has_serv_precio: number;
  precio_tipo_moneda_id: number;
  factor_conversion_precio: number;
  adicional_aceptacion_estado: string;
  adicional_aceptacion_usuario_id?: any;
  adicional_aceptacion_fecha?: any;
  adicional_causas_rechazo_id?: any;
  adicional_rechazo_observacion?: any;
  requiere_evidencia: boolean;
  evidencia_id?: any;
  model_servicio_id: ModelServicio;
  numero_producto: string;
}

export interface MaterialesLastActa {
  id: number;
  material_cod: string;
  informe_has_uob_id: number;
  cantidad: number;
  unidad_id: number;
  tipo_moneda_id: number;
  valor: number;
  codigo_sap: string;
  origen: string;
  factor_conversion: number;
  valor_unitario_clp: number;
  model_material_cod: ModelMaterial;
}
