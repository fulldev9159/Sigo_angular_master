export interface TypeService {
  id: number;
  nombre: string;
}

export interface Service {
  lpu_id: number;
  lpu_nombre: string;
  lpu_precio: number;
  tipo_moneda_id: number;
  tipo_moneda_cod: string;
  lpu_numero_producto: string;
  region: string;
  lpu_subtotal: number;
  tipo_servicio: string;
  cantidad: number;

  lpu_unidad_codigo?: number;
  lpu_unidad_nombre?: string;
}

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

export interface AutoSuggestRequest {
  filter: string;
  cantidad: number;
}

export interface AutoSuggestResponseData {
  items: string[];
}

export interface AutoSuggestItem {
  id: number;
  name: string;
}

export interface ResponseDetalleCubicacion {
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
