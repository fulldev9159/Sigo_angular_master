export interface ProveedorAgenciaContrato {
  cmarco_has_proveedor_id: number;
  codigo_acuerdo?: string;
  id: number;
  nombre?: string;
}

export interface ModelProveedor {
  created_at: Date;
  deleted_at: Date;
  direccion: string;
  dv: string;
  email: string;
  estado: boolean;
  id: number;
  interno: boolean;
  model_tipo_proveedor_id: null;
  nombre: string;
  numero_contrato: number;
  razon_social: string;
  representante_legal: string;
  rut: number;
  telefono: string;
  tipo_proveedor_id: number;
  updated_at: string;
  vigencia_garantia: number;
}

export interface Proveedores4Cub {
  cmarco_has_proveedor_id: number;
  codigo_acuerdo: string;
  id: number;
  nombre: string;
}
