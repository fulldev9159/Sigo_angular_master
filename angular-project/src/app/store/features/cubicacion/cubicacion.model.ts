export interface Cubicacion {
  id: string;
  total: number;
  nombre: string;
  fecha_creacion: string;
  usuario_id: number;
  usuario_nombre: string;
  region_id: number;
  region_nombre: string;
  contrato_marco_nombre: string;
  proveedor_id: number;
  proveedor_nombre: string;
  subcontrato_id: number;
}

export interface ContractMarco {
  id: number;
  nombre: string;
  tipo_contrato_id: string;
  tipo_contrato_nombre: string;
}

export interface Provider {
  id: number;
  nombre: string;
  subcontrato_id: number[];
}

export interface Region {
  id: number;
  nombre: string;
  codigo: string;
}

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

export interface ResponseGetAllCub {
  adm_contrato_nombre: string;
  asignado: boolean;
  contrato_marco_id: number;
  contrato_marco_nombre: string;
  contrato_marco_tipo_id: number;
  contrato_marco_tipo_nombre: string;
  fecha_creacion: Date;
  id: number;
  nombre: string;
  ot_id: number;
  ot_nombre: string;
  proveedor_id: number;
  proveedor_nombre: string;
  region_id: number;
  region_nombre: string;
  subcontrato_id: number;
  total: number;
  username: string;
  usuario_id: number;
  usuario_nombre: string;
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
