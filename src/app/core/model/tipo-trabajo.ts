// GET TIPO DE TRABAJO
export interface TipoDeTrabajo {
  tipo_trabajo_codigo: string;
  tipo_trabajo_descripcion: string;
  tipo_trabajo_id: number;
}

export interface DetalleTipoDeTrabajo {
  id: number;
  codigo: string;
  descripcion: string;
  estado: boolean;
  tipo_cubicacion_id: number;
}
