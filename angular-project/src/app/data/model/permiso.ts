export interface Permiso {
  id: number;
  slug: string;
  nombre_corto: string;
  descripcion: string;
}

export interface PermisoResponse {
  data: { items: Permiso[] };

  status: {
    description: string;
    responseCode: number;
  };
}
