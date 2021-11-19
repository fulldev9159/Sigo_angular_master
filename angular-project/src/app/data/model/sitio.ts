export interface Sitio {
  id: number;
  codigo: string;
  nombre: string;
  geo_lat: string;
  geo_lon: string;
  direccion: string;
}

export interface ResponseGetSitio4OT {
  data: {
    items: Sitio[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}
