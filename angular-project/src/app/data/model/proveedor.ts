export interface ProveedoresResponse {
  data: {
    items: Proveedor[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}
export interface Proveedor {
  id: number;
  nombre: string;
  rut: number;
  email: string;
  telefono: string;
  direccion: string;
  activo: boolean;
}

export interface ResponseSubcontratosProveedor {
  data: {
    items: SubcontratosProveedor[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface SubcontratosProveedor {
  id: number;
  nombre: string;
  subcontrato_id: number[];
}
