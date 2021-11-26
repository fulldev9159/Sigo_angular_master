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

export interface DetalleActa {
  id: number;
  detalle_id: number;
  detalle_lpu_id: number;
  lpu_descripcion: string;
  lpu_codigo: string;
  cantidad_cubicada: number;
  cantidad_pendiente: number;
  cantidad_aprobada_historica: number;
  cantidad_informada: number;
  total_aprobado: number;
  total_cubicado: number;
}
export interface ResponseGetDetalleActa {
  data: {
    items: DetalleActa[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface RequestSolicitudPagoActa {
  acta_id: number;
  porcentajes_detalles: LpusPorcentajes[];
}

export interface LpusPorcentajes {
  detalle_id: number;
  porcentaje_solicitado: number;
}
