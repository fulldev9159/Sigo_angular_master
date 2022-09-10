export interface CarritoService {
  precargado?: boolean; // si es true, viene de la carga inicial al editar la cubicacion
  servicio_rowid?: number;
  servicio_cantidad?: number;
  servicio_unidad_cod?: string;
  servicio_unidad_descripcion?: string;

  // Data response http API
  servicio_id: number;
  servicio_codigo: string;
  servicio_precio_final_clp: number;
  servicio_nombre: string;
  tipo_servicio_descripcion: string;
  tipo_servicio_id: number;

  unidad_obras: CarritoUO[];
}

export interface CarritoUO {
  // servicio_id: number;
  precargado?: boolean; // si es true, viene de la carga inicial al editar la cubicacion
  uo_rowid?: number;
  uo_cantidad?: number;
  uob_unidad_medida_cod?: string;
  uob_unidad_medida_descripcion?: string;

  // Data response http API
  uo_codigo: string;
  uo_nombre: string;
  uo_precio_total_clp: number;
  actividad_descripcion: string;
  actividad_id: number;
}
