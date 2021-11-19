// INICIALIZADOR INFORME AVANCE init
export interface ResponseInicializarInformeAvance {
  data: {
    borrador_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

// INICIALIZADOR INFORME AVANCE end

// GET INFORME AVANCE init
export interface ResponseGetInformeAvance {
  data: {
    items: DataInformeAvance[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface DataInformeAvance {
  detalle_id: number;
  detalle_tipo: string;
  ot_id: number;
  informe_id: number;
  detalle_lpu_id: number;
  lpu_nombre: string;
  lpu_numero_producto: string;
  LpuPrecio: number;
  cantidad_cubicada: number;
  cantidad_aprobada: number;
  cantidad_pendiente: number;
  cantidad_aprobada_historica: number;
  cantidad_informada: number;
}

// GET INFORME AVANCE done

export interface LpuInformeAvanceDetalle {
  detalle_id: number;
  cantidad_informada: number;
}

// SEND BORRADOR init
export interface RequestSaveBorradorInformeAvance {
  valores_detalles: LpuInformeAvanceDetalle[];
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

// SEND BORRADOR done

// SEND INFORME init
export interface RequestSaveInformeAvance {
  informe_id: number;
  valores_detalles: LpuInformeAvanceDetalle[];
}
export interface ResponseSendInformeAvance {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

// SEND INFORME done
