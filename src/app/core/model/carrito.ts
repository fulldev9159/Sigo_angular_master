export interface CarritoService {
  precargado?: boolean; // si es true, viene de la carga inicial al editar la cubicacion
  servicio_rowid?: number;
  servicio_cantidad?: number;
  servicio_unidad_cod?: string;

  // Data response http API
  servicio_id: number;
  servicio_precio_final_clp: number;
  servicio_nombre: string;
  actividad_descripcion: string;
  tipo_servicio_descripcion: string;

  unidad_obras: {
    // servicio_id: number;
    precargado?: boolean; // si es true, viene de la carga inicial al editar la cubicacion
    uo_rowid?: number;
    uo_cantidad?: number;
    uob_unidad_medida_cod?: string;

    // Data response http API
    uo_codigo: string;
    uo_nombre: string;
    uo_precio_total_clp: number;
  }[];
}

// export interface CarritoUnidadObra {
//   servicio_id: number;
//   precargado?: boolean; // si es true, viene de la carga inicial al editar la cubicacion
//   uo_rowid?: number;
//   uo_cantidad?: number;
//   uob_unidad_medida_cod?: string;

//   // Data response http API
//   uo_codigo: string;
//   uo_nombre: string;
//   uo_precio_total_clp: number;
// }
