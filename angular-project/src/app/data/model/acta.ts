import { DetalleServicioLastActa } from './servicio';
import { DetalleUnidadObraLastActa } from './unidad-obra';

export interface ActaTipoPago {
  id: number;
  descripcion: string;
}

export interface DetalleActaServicio {
  adicional_aceptacion_estado: string;
  cantidad_total: number;
  evidencia_id: any;
  factor_conversion_monto: number;
  factor_conversion_precio: number;
  faltante_cantidad: number;
  id: number;
  informe_avance_id: number;
  monto_tipo_moneda_codigo: string;
  monto_tipo_moneda_id: number;
  monto_tipo_moneda_nombre: string;
  ot_id: number;
  precio_tipo_moneda_codigo: string;
  precio_tipo_moneda_id: number;
  precio_tipo_moneda_nombre: string;
  prov_has_serv_monto: number;
  prov_has_serv_precio: number;
  puntos_baremos: number;
  requiere_evidencia: boolean;
  servicio_id: number;
  tipo_contrato_id: number;
  unidad_codigo: string;
  unidad_descripcion: string;
  unidad_id: number;
  valor_clp: number;

  faltante_porcentaje_entero: number;
  faltante_porcentaje_fraccion: number;

  servicio_codigo: string;
  servicio_descripcion: string;

  valor_unitario_clp: number;
}

export interface DetalleActaUob {
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
  valor_clp: number;
  faltante_porcentaje_entero: number;
  faltante_porcentaje_fraccion: number;
  unidad_obra_desc: string;
  valor_unitario_clp: number;

  informe_has_servicio_id: number;
  servicio_codigo: string;
  servicio_descripcion: string;
}

export interface LastActa {
  created_at: Date;
  flg_pagado: boolean;
  id: number;
  informe_avance_id: number;
  many_acta_detalle_servicio?: DetalleServicioLastActa[];
  many_acta_detalle_uob?: DetalleUnidadObraLastActa[];
  observacion: string;
  ot_id: number;
  tipo_pago: string;
  validacion_estado: string;
  validacion_fecha: Date;
  validacion_usuario_id: Date;
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
}

export interface RequestAprobacionRechazoSolicitudPago {
  ot_id: number;
  acta_id: number;
  ot_total: number;
  autoriza_pago: string; // AUTORIZADO, NO_AUTORIZADO
  tipo_rechazo?: number;
  observacion: string;
}
