import {
  MaterialesFromDetalle,
  MaterialFromInformeAvance,
  Materiales4Cub,
} from './materiales';
import { ModelServicio } from './servicio';
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
  valor_unitario_clp: number;
}

export interface ModelUnidadObra {
  codigo: string;
  descripcion: string;
  unidad_id: number;
}

export interface UnidadObraFromDetalle {
  data_unidad_obra: {
    clave: string;
    cub_has_uob_id: number;
    unidad_obra_cod: string;
    unidad_obra_desc: string;
    uo_precio_total_clp: number;
    uob_cantidad: number;
    uob_unidad_medida_cod: string;
    uob_unidad_medida_id: number;
  };
  data_materiales: MaterialesFromDetalle[];
}

//   GET UNIDADES DE OBREA 4 CUB
export interface RequestGetUnidadObra4Cub {
  servicio_cod: string;
  actividad_id: number;
}

export interface UnidadObra4Cub {
  actividad_id: number;
  clave: string;
  id: number;
  model_actividad_id: { id: number; codigo: string; descripcion: string };
  model_servicio_cod: ModelServicio;
  model_unidad_obra_cod: ModelUnidadObra;
  servicio_cod: string;
  unidad_obra_cod: string;
}

//  GET DATOS UNIDAD OBRA 4 CUB
export interface RequestGetDatosUnidadObra4Cub {
  uo_codigo: string;
}

export interface DetallesUnidadObra4Cub {
  material_arr: Materiales4Cub[];
  uo_codigo: string;
  uo_nombre: string;
  uo_precio_total_clp: number;
  uo_unidad_id: number;
  uo_unidad_codigo: string;
  uo_unidad_descripcion: string;
}
