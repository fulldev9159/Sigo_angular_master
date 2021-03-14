export interface CubiciacionForm {
  nombre: string;
  contratoId: string;
  proveedorId: string;
  subcontratoId: number;
  regionId: string;
  tipoServicioId: string;
}

// Contratos
export interface RequestContrato {
  username: string;
  token: string;
}

export interface DataContrato {
  contratos_marco: ContratoMarco[];
}

export interface ContratoMarco {
  id: number;
  nombre: string;
  tipo_contrato: string;
}

// Proveedores subcontrato
export interface RequestProveedor {
  username: string;
  token: string;
  contrato_marco: number;
}

export interface DataProveedor {
  proveedores: Proveedores[];
}

export interface Proveedores {
  id: number;
  nombre: string;
  subcontrato_id: number[];
}

export interface Region {
  id: number;
  nombre: string;
  codigo: string;
}

export interface TipoServicio {
  id: number;
  nombre: string;
}
