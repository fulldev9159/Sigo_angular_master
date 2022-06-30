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
  faltante_porcentaje: number;
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
}

export interface DetalleActaUob {
  cantidad_total: number;
  faltante_cantidad: number;
  faltante_porcentaje: number;
  id: number;
  informe_avance_id: number;
  ot_id: number;
  tipo_contrato_id: number;
  unidad_codigo: string;
  unidad_descripcion: string;
  unidad_id: number;
  unidad_obra_cod: string;
  valor_clp: number;
}
