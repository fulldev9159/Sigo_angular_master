export interface Plan {
  id: number;
  nombre: string;
  metas: string;
  vendor: string;
  tipo: string;
}

export interface ResponseGetPlanes4OT {
  data: {
    items: Plan[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}
