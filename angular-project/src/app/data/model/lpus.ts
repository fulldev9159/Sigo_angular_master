export interface ResponseTipoLpu {
  data: {
    items: TipoLpu[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface TipoLpu {
  id: number;
  nombre: string;
}
