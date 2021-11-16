export interface RequestBorradorInformeAvence {
  lpus: LpuInformeAvance[];
}

export interface LpuInformeAvance {
  id_lpu: number;
  informado: number;
}

export interface ResponseBorradorInformeAvance {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}
