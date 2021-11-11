// export interface Service {
//   lpu_id: number;
//   lpu_nombre: string;
//   lpu_precio: number;
//   tipo_moneda_id: number;
//   tipo_moneda_cod: string;
//   lpu_numero_producto: string;
//   region: string;
//   lpu_subtotal: number;
//   tipo_servicio: string;
//   cantidad: number;

//   lpu_unidad_codigo?: number;
//   lpu_unidad_nombre?: string;
// }

export interface RequestSaveCubicacion {
  cubicacion_nombre: string;
  region_id: number;
  usuario_id: number;
  contrato_marco_id: number;
  proveedor_id: number;
  // subcontrato_id: number[];
  lpus: LpusRequest[];
}

export interface LpusRequest {
  lpu_id: number;
  cantidad: number;
}
