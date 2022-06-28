// GET PMO
export interface DataRespGetPMO {
  items: PMO[];
}

export interface PMO {
  pmo_codigo: number;
}

// GET LINEA PRESUPUESTARIA
export interface DataRespGetLP {
  items: LP[];
}

export interface LP {
  ano: number;
  created_at: Date;
  denominacion: string;
  emplazamiento_codigo: string;
  id: number;
  linea_presupuestaria_codigo: string;
  model_tipo_contrato: { id: number; nombre: string };
  pep2: string;
  pmo_codigo: number;
  tipo_contrato: number;
}

// GET PMO
export interface DataRespGetPEP2 {
  items: PEP2[];
}

export interface PEP2 {
  ano: number;
  created_at: Date;
  denominacion: string;
  emplazamiento_codigo: string;
  id: number;
  linea_presupuestaria_codigo: string;
  model_tipo_contrato: { id: number; nombre: string };
  pep2: string;
  pmo_codigo: number;
  tipo_contrato: number;
}

// GET OPEX
export interface DataRespGetOPEX {
  items: OPEX[];
}

export interface OPEX {
  ano: number;
  ceco: string;
  created_at: Date;
  cuenta_sap: number;
  id: number;
  id_opex: string;
}

// GET SAP
export interface DataRespGetSAP {
  items: SAP[];
}

export interface SAP {
  ano: number;
  ceco: string;
  created_at: Date;
  cuenta_sap: number;
  id: number;
  id_opex: string;
}

// GET CECO
export interface DataRespGetCECO {
  items: CECO[];
}

export interface CECO {
  ano: number;
  ceco: string;
  created_at: Date;
  cuenta_sap: number;
  id: number;
  id_opex: string;
}
