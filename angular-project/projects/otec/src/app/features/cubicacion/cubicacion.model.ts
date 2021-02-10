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
  id: number;
  nombre: string;
  precio: number;
  tipo_moneda: string;
  numero_producto: string;
}
