import { Dropdown } from 'primeng/dropdown';

export interface OTForm {
  nombre: string;
  tipoOT: string;
  cubicacionId: string;
  planId: string;
  sitioId: DropdownForm;
  pmoId: string;
  lineapresupuestariaId: string;
  fechainicio: Date;
  fechatermino: Date;
  observacion: string;
  pep2provisorio: string;
  pep2Id: string;
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

// GUARDAR OT

export interface OT {
  token: string;
  nombre_ot: string;
  tipo_ot: string;
  cubicacion_id: number;
  plan_despliegue_id: number;
  emplazamiento_id: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  observacion: string;
  linea_presupuestaria_codigo: string;
  pmo_codigo: string;
  pep2_codigo: string;
  pep2_provisorio: boolean;
}

// Get OT

export interface RequestGetOt {
    // user: string;
  token: string;
}
export interface DataGetOT {
  ots: OT[];
}
export interface OT {
  nombre_ot: string;
  tipo_ot: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  cubicacion_id: number;
  plan_despliegue_id: number;
  emplazamiento_id: number;
  observacion: string;
  linea_presupuestaria_codigo: string;
  pmo_codigo: string;
  pep2_codigo: string;
  pep2_provisorio: boolean;
}
