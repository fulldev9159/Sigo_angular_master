export interface DataRspGetAreas {
  areas: Area[];
}

export interface Area {
  activa: boolean;
  created_at: Date;
  deleted_at: Date;
  descripcion: string;
  id: number;
  interno: boolean;
  nombre: string;
  updated_at: Date;
}

export interface RequestEditArea {
  area_id: number;
  values: ValuesEditArea;
}

export interface ValuesEditArea {
  nombre: string;
  descripcion: string;
  interno: boolean;
  activa: boolean;
}

export interface DataRspEditArea {
  area_id: number;
}
