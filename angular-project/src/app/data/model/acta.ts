import { LpuInformeAvanceDetalle } from '.';
import { DataInformeAvance } from './informe-avance';

export interface RequestSaveInformeActaGestor {
  acta_id: number;
  observacion: string;
  valores_detalles: LpuInformeAvanceDetalle[];
}
export interface ResponseGetInformeActa {
  data: {
    items: DataInformeAvance[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}
