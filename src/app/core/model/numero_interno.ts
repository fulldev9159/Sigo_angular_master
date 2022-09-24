export interface TipoNumeroInterno {
  id: number;
  nombre: string;
}

// NUMERO INTERNO HAS OT
export interface OTFromNumeroInterno {
  id: number;
  ot_id: number;
  numero_interno: string;
  tipo_numero_interno_id: number;
}

export interface NumeroInterno {
  id: number;
  model_tipo_numero_interno_id: TipoNumeroInterno;
  numero_interno: string;
  ot_id: number;
  tipo_numero_interno_id: number;
}
