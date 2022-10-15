import { ModelAgencia } from './agencia';

export interface OficinaCentral {
  id: number;
  descripcion: string;
  agencia_id: number;
  idafac: string;
}
export interface OficinaCentralWithAgenciaModel extends OficinaCentral {
  model_agencia_id: ModelAgencia;
}
