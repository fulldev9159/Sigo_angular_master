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
