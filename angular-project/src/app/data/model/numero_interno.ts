import { IdNombreType } from './index';

export interface NumeroInterno {
  id: number;
  model_tipo_numero_interno_id: IdNombreType;
  numero_interno: string;
  ot_id: number;
  tipo_numero_interno_id: number;
}

// FIJO
// NUMERO INTERNO
export interface TipoNumeroInterno extends IdNombreType {}

// NUMERO INTERNO HAS OT
export interface NumeroInternoHasOT {
  id: number;
  ot_id: number;
  numero_interno: string;
  tipo_numero_interno_id: number;
}
