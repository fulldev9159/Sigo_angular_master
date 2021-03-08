export interface StatusSectionResponse {
  responseCode: number;
  description: string;
}

// Cubicaciones
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
