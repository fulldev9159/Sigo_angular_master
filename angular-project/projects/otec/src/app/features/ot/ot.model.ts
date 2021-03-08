import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

export interface StatusSectionResponse {
  responseCode: number;
  description: string;
}

// Plan
export interface RequestPlanes {
  //   user: string;
  token: string;
  region_id: number;
}

export interface ResponsePlanes {
  data: {
    [id: string]: Planes[];
  };
  status: StatusSectionResponse;
}

export interface Planes {
  plandespliegue_id: number;
  plan: string;
  meta: string;
  tipo: string;
}

// Sitios
export interface RequestSitios {
  //   user: string;
  token: string;
  plandespliegue_id: number;
}

export interface ResponseSitios {
  data: {
    [id: string]: Sitios[];
  };
  status: StatusSectionResponse;
}

export interface Sitios {
  sitio_id: number;
  codigo: string;
  nombre_sitio: string;
  latitud: string;
  longitud: string;
  direccion: string;
}
