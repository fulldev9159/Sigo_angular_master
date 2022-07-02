export interface ModelSitio {
  codigo: string;
  comuna: string;
  created_at: Date;
  direccion: string;
  duenno_estructura: string;
  fecha_liberacion: Date;
  fecha_termino: Date;
  geo_lat: number;
  geo_lon: number;
  id: number;
  metas: string;
  nemonico: string;
  nombre: string;
  plan_id: number;
  region_id: number;
  tipo: string;
  vendor: string;
}

export interface Sitio extends ModelSitio {
  model_plan_id: { id: number; nombre: string; estado: true; created_at: Date };
  model_region_id: { id: number; nombre: string; codigo: string };
}
