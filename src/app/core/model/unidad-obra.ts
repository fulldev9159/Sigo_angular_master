import {
  DetalleMaterialCubicacion,
  MaterialesManoObra,
  MaterialFromInformeAvance,
} from './material';
import { ModelServicio, Unidad } from './servicio';

export interface ModelUnidadObra {
  codigo: string;
  descripcion: string;
  unidad_id: number;
}

// GET UNIDADES DE OBRA DE UN SERVICIO

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

// GET DETALLES DE UNA UNIDAD DE OBRA DE UN SERVICIO
export interface DetallesUnidadObraServicio {
  material_arr?: MaterialesManoObra[];
  uo_codigo: string;
  uo_nombre: string;
  uo_precio_total_clp: number;
  uo_unidad_id?: number;
  uo_unidad_codigo?: string;
  uo_unidad_descripcion?: string;
}

// DETALLE UO CUBICACION
export interface DetalleUOCubicacion {
  id: number;
  cubicacion_has_servicio_id: number;
  unidad_obra_cod: string;
  cantidad: number;
  unidad_id: number;
  clave: string;
  valor_unitario_clp: number;
  model_unidad_obra_cod: ModelUnidadObra;
  model_unidad_id: Unidad;
  many_cubicacion_has_material: DetalleMaterialCubicacion[];
}

// INFORME AVANCE
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
  valor_unitario_clp: number;
}
