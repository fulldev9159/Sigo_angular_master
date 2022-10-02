export interface RequestAdicionales {
  ot_id: number;
  adicionales_solicitados?: AdicionalesSolicitados;
}

export interface AdicionalesSolicitados {
  nuevo?: NuevoServicioAdicional[];
  actualizar?: ActualizarServicioAdicional;
}

// NUEVO ADICIONAL
export interface NuevoServicioAdicional {
  servicio_id: number;
  actividad_id: number;
  tipo_servicio_id: number;
  cantidad: number;
  unidad_obra: NuevaUOServicioAdicional[];
}

export interface NuevaUOServicioAdicional {
  uob_codigo: string;
  cantidad: number;
}

// ACTUALIZAR ADICIONAL
export interface ActualizarServicioAdicional {
  servicio: ServicioAdicionalActualizar[];
  unidad_obra: UOAdicionalActualizar[];
  agregar_uob_a_servicio?: AgregarUOAdicionalAServicio[];
}

export interface ServicioAdicionalActualizar {
  rowid: number;
  cantidad: number;
}

export interface UOAdicionalActualizar {
  rowid: number;
  cantidad: number;
}

export interface AgregarUOAdicionalAServicio {
  servicio_rowid: number;
  uob_codigo: string;
  uob_cantidad: number;
}

export interface ResponseAgregarAdicionales {
  ot_id: number;
  informe_avance_id: number;
}
