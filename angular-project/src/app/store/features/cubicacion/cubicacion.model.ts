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

export interface SubContractedProviders {
  id: number;
  nombre: string;
  subcontrato_id: number[];
}

export interface SubContractedRegions {
  id: number;
  nombre: string;
  codigo: string;
}

export interface SubContractedTypeServices {
  id: number;
  nombre: string;
}

export interface SubContractedServices {
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

export interface SaveCubicacionRequest {
  cubicacion_nombre: string;
  region_id: number;
  usuario_id: number;
  contrato_marco_id: number;
  proveedor_id: number;
  subcontrato_id: number[];
  lpus: {
    lpu_id: number;
    cantidad: number;
  };
}
