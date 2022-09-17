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
