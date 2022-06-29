import { MaterialFromInformeAvance } from './materiales';
import { Unidad } from './unidad';

export interface UnidadObraFromInformeAvance {
  id: number;
  informe_has_servicio_id: number;
  unidad_obra_cod: string;
  cantidad: number;
  unidad_id: number;
  clave: string;

  model_unidad_obra_cod: ModelUnidadObra;
  model_unidad_id: Unidad;
  many_informe_has_material: MaterialFromInformeAvance[];
}

export interface ModelUnidadObra {
  codigo: string;
  descripcion: string;
  unidad_id: number;
}
