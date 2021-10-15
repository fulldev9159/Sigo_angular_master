export interface ResponseTipoNumeroInterno {
  data: {
    items: TipoNumeroInterno[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface TipoNumeroInterno {
  id: string;
  nombre: string;
}
