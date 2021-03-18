import { Dropdown } from 'primeng/dropdown';

export interface OTForm {
  nombre: string;
  tipoOT: string;
  cubicacionId: string;
  planId: string;
  sitioId: DropdownForm;
  pmoId: string;
  lineapresupuestariaId: string;
}

export interface DropdownForm {
  name: string;
  code: string;
}

// Plan
export interface RequestPlanes {
  //   user: string;
  token: string;
  region_id: number;
}

export interface DataPlanes {
  planes: Planes[];
}

export interface Planes {
  plandespliegue_id: number;
  plan: string;
  metas: string;
  tipo: string;
}

// Sitios
export interface RequestSitios {
  //   user: string;
  token: string;
  plandespliegue_id: number;
}

export interface DataSitios {
  sitios: Sitios[];
}

export interface Sitios {
  sitio_id: number;
  codigo: string;
  nombre_sitio: string;
  latitud: string;
  longitud: string;
  direccion: string;
}

// PMO
export interface RequestPMO {
  //   user: string;
  token: string;
  codigo: number;
}

export interface DataPMO {
  pmo: PMO[];
}

export interface PMO {
  codigo: number;
}

// Linea Presupuestaria
export interface RequestLineaPresupuestaria {
  //   user: string;
  token: string;
  pmo_id: number;
}

export interface DataLineaPresupuestaria {
  lineas_presupuestarias: string[];
}

// export interface LinePresupuestaria {
//   _: number;
// }

// Linea Presupuestaria
export interface RequestPEP2 {
  //   user: string;
  token: string;
  pmo_codigo: string;
  linea_presupuestaria_codigo: string;
}

export interface DataPEP2 {
  pep2: string[];
}
