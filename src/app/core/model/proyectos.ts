export interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  costo_estimado: number;

  usuario_creador_id: number;

  //// created_at: string;
  //// model_usuario_creador_id: ...
}

export interface RequestCreateProyecto {
  nombre: string;
  descripcion: string;
  costo_estimado: number;
}

export interface DetalleProyectoTablaDebitado {
  id_ot: number;
  nombre_ot: string;
  tipo_estado_ot_nombre: string;
  tipo_etapa_ot_nombre: string;
  pep2: string;
  proyecto_id: number;
  proyecto_nombre: string;
  monto_pagar_ot_clp: number;
  porc_debitado_sobre_cien: number;
  monto_total_proyecto: number;
}
