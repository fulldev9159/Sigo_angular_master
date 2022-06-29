export interface NumeroInterno {
  id: number;
  model_tipo_numero_interno_id: ModelTipoNumeroInterno;
  numero_interno: string;
  ot_id: number;
  tipo_numero_interno_id: number;
}

export interface ModelTipoNumeroInterno {
  id: number;
  nombre: string;
}
