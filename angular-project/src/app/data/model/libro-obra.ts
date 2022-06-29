// LIBRO DE OBRAS
export interface ReqCreateRegistroLibroObra {
  ot_id: number;
  usuario_id: number;
  observaciones: string;
  archivos?: number[];
}

export interface DataRespGetLibroDeObras {
  items: any[];
}
