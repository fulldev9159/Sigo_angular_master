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

export interface ResponseLpu4Cub {
  data: {
    items: Lpu4Cub[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface Lpu4Cub {
  lpu_id: number;
  lpu_nombre: string;
  lpu_precio: number;
  tipo_moneda_id: number;
  tipo_moneda_cod: string;
  lpu_numero_producto: string;
  lpu_unidad_codigo: number;
  lpu_unidad_nombre: string;
}

export interface LpuCarrito4Cub extends Lpu4Cub {
  lpu_subtotal: number;
  tipo_servicio: string;
  cantidad: number;
}
