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

export interface ResponseInformeAvance {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}
