import { MaterialesManoObra } from './material';

export interface CarritoService {
  precargado?: boolean; // si es true, viene de la carga inicial al editar la cubicacion
  servicio_rowid?: number;
  servicio_cantidad?: number;
  servicio_unidad_cod?: string;
  servicio_unidad_descripcion?: string;
  adicional?: string;
  servicios_adicional_dummy?: boolean;

  // Data response http API
  servicio_id: number;
  servicio_codigo?: string;
  numero_producto: string;
  servicio_precio_final_clp: number;
  servicio_nombre: string;
  tipo_servicio_descripcion: string;
  tipo_servicio_id: number;
  faltante_porcentaje_entero?: number;
  prov_has_serv_precio?: number;
  puntos_baremos?: number;
  autorizado_ingenieria?: string;
  requiere_evidencia?: boolean;

  unidad_obras: CarritoUO[];
}

export interface CarritoUO {
  // servicio_id: number;
  precargado?: boolean; // si es true, viene de la carga inicial al editar la cubicacion
  uo_rowid?: number;
  uo_cantidad?: number;
  uob_unidad_medida_cod?: string;
  uob_unidad_medida_descripcion?: string;
  adicional?: string;
  adicional_existente_ia?: boolean;

  // Data response http API
  uo_codigo: string;
  uo_nombre: string;
  uo_precio_total_clp: number;
  actividad_descripcion: string;
  actividad_id: number;

  material_arr?: MaterialesManoObra[];
}
