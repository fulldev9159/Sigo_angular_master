export interface CubiciacionForm {
  nombre: string;
  contratoId: string;
  proveedorId: string;
  subcontratoId: number;
  regionId: string;
  tiposervicioId: string;
  lpus: LPU[];
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

// Regiones subcontrato
export interface RequestRegion {
  user: string;
  token: string;
  subcontratos: number;
}

export interface DataRegion {
  regiones: Region[];
}
export interface Region {
  id: number;
  nombre: string;
  codigo: string;
}

// Tipo Servicio Subcontrato
export interface RequestTipoServicioSubContrato {
  username: string;
  token: string;
  subcontratos: number;
  region: number;
}

export interface DataTipoServicioSubContrato {
  tipo_servicios: TipoServicio[];
}
export interface TipoServicio {
  id: number;
  nombre: string;
}

// Servicios subcontrato
export interface RequestServiciosSubContrato {
  username: string;
  token: string;
  subcontratos: number;
  region: number;
  tipo_servicio: number;
}

export interface DataServicioContrato {
  servicios: Servicio[];
}

export interface Servicio {
  id_lpu: number;
  nombre: string;
  precio: number;
  tipo_moneda: string;
  numero_producto: string;
}

// LPU
export interface LPU {
  id_lpu: number;
  nombre: string;
  precio: number;
  tipo_moneda: string;
  // numero_producto: string;
  cantidad: number;
  unidad: string;
  region: string;
  tiposervicio: string;
}

// Save Cubicacion

export interface RequestSaveCubicacion {
  // user: string;
  token: string;
  id_cubicacion?: number;
  nombre: string;
  total: number;
  region_id: number;
  region: string;
  contrato_marco: string;
  proveedor: string;
  subcontrato_id: number;
  lpus: Lpus[];
}

export interface Lpus {
  id_lpu: number;
  cantidad: number;
}

// Cubicaciones
export interface RequestCubicaciones {
  user: string;
  token: string;
}

export interface DataCubicaciones {
  cubicaciones: Cubicacion[];
}

export interface Cubicacion {
  cubicacion_id: number;
  total: number;
  nombre: string;
  fecha: string;
  usuario_id: number;
  region_id: number;
  region: string;
  contrato_marco: string;
  proveedor: string;
  subcontrato_id: number;
  asignado: boolean;
  proveedor_id: number;
  admin_contrato?: string;
}

// Detalle cubicacion
export interface RequestDetalleCubicaciones {
  user: string;
  token: string;
  cubicacion_id: number;
}
export interface DataDetalleCubicaciones {
  detalle_cubicacion: DetalleCubicacion[];
}

export interface DetalleCubicacion {
  id_lpu: number;
  nombre: string;
  id_servicio: number;
  precio: number;
  tipo_moneda: string;
  cantidad: number;
  subtotal: number;
  tipo_servicio: string;
}

export interface RequestBorrarCubicaciones {
  user: string;
  token: string;
  id_cubicacion: number;
}
