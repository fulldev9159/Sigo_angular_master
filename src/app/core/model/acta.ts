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
