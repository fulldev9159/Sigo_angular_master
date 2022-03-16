export interface DataRspGetProveedores4CreateUser {
  proveedor_array: Proveedores4CreateUser[];
}

export interface Proveedores4CreateUser {
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

/////
export interface ProveedoresResponse {
  data: {
    items: Proveedor[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}
export interface Proveedor {
  id: number;
  nombre: string;
  rut: number;
  email: string;
  telefono: string;
  direccion: string;
  activo: boolean;
}

export interface ResponseSubcontratosProveedor {
  data: {
    items: SubcontratosProveedor[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface SubcontratosProveedor {
  id: number;
  nombre: string;
  subcontrato_id: number[];
}
