export interface ModelContratoMarco {
  aprob_jerarq_inic: boolean;
  costo_max: number;
  estado: boolean;
  fecha_fin: Date;
  fecha_inicio: Date;
  id: number;
  nombre: string;
  tiene_encuesta: boolean;
  tipo_contrato_id: number;
  tipo_moneda_id: number;
  tipo_pago: string;
  validacion_operaciones: boolean;
}

export interface AgenciaContrato {
  id: number;
  nombre: string;
}

export interface ActividadContratoProveedor {
  actividad_id: number;
  descripcion: string;
}
