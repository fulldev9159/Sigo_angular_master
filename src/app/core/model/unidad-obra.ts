import { ModelServicio } from './servicio';

export interface ModelUnidadObra {
  codigo: string;
  descripcion: string;
  unidad_id: number;
}

export interface RequestGetUnidadObraServicio {
  servicio_cod: string;
  actividad_id: number;
}

export interface UnidadObraServicio {
  actividad_id: number;
  clave: string;
  id: number;
  model_actividad_id: { id: number; codigo: string; descripcion: string };
  model_servicio_cod: ModelServicio;
  model_unidad_obra_cod: ModelUnidadObra;
  servicio_cod: string;
  unidad_obra_cod: string;
}
