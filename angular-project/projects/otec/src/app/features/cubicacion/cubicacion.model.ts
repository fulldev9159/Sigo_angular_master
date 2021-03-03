export interface StatusSectionResponse {
  responseCode: number;
  description: string;
}

// Contratos
export interface RequestContrato {
  username: string;
  token: string;
}

export interface ResponseContrato {
  data: {
    [id: string]: ContratoMarco[];
  };
  status: StatusSectionResponse;
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

export interface ResponseProveedor {
  data: {
    [id: string]: Proveedores[];
  };
  status: StatusSectionResponse;
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

export interface ResponseRegion {
  data: {
    [id: string]: Region[];
  };
  status: StatusSectionResponse;
}

export interface Region {
  id: number;
  nombre: string;
  codigo: string;
}

// Tipo Servicio subcontrato
export interface RequestTipoServicioSubContrato {
  username: string;
  token: string;
  subcontratos: number;
  region: number;
}

export interface ResponseTipoServicioSubContrato {
  data: {
    [id: string]: TipoServicio[];
  };
  status: StatusSectionResponse;
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

export interface ResponseServicioContrato {
  data: {
    [id: string]: Servicio[];
  };
  status: StatusSectionResponse;
}

export interface Servicio {
  id_lpu: number;
  nombre: string;
  precio: number;
  tipo_moneda: string;
  numero_producto: string;
}

export interface Product {
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

export interface ResponseSaveCubicacion {
  data: string;
  status: StatusSectionResponse;
}

// Cubicaciones
export interface RequestCubicaciones {
  user: string;
  token: string;
}

export interface ResponseCubicaciones {
  data: {
    [id: string]: Cubicacion[];
  };
  status: StatusSectionResponse;
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

export interface RequestBorrarCubicaciones {
  user: string;
  token: string;
  id_cubicacion: number;
}
export interface ResponseDetalleCubicaciones {
  data: {
    [id: string]: DetalleCubicacion[];
  };
  status: StatusSectionResponse;
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
