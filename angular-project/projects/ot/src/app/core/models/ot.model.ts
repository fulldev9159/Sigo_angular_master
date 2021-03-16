export interface OTForm {
  nombre: string;
  tipoOT: string;
  cubicacionId: string;
  planId: string;
  sitioId: string;
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
