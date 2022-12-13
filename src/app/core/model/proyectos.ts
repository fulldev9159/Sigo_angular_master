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
