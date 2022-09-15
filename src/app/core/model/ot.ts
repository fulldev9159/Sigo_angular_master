import { ModelAgencia } from './agencia';

export interface OficinaCentral {
  id: number;
  descripcion: string;
  agencia_id: number;
  idafac: string;
  model_agencia_id: ModelAgencia;
}
