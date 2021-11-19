export interface PMO {
  codigo: string;
}

export interface ResponseGetPMO4OT {
  data: {
    items: PMO[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}
