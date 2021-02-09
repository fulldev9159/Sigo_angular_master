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
export interface StatusSectionResponse {
  responseCode: number;
  description: string;
}

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
  subcontratos: number[];
}

export interface RequestRegion {
  username: string;
  token: string;
  subcontrato: number;
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
