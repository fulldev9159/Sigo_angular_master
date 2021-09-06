import { Accion } from './accion';

export interface OT {
  id: number;
  nombre: string;
  tipo: string;
  fecha_inicio: string;
  fecha_termino: string;
  contrato_marco_nombre: string;
  proveedor_nombre: string;
  usuario_nombre: string;
  sesion_sce: string;
  estado_otdesc: string;
  etapa_otdesc: string;
  acciones: Accion[];
}

interface FieldOrder {
  ot_id: string;
}

export interface OTsResponse {
  data: {
    items: OT[];
  };

  pagination: {
    total_pages: number;
    items_per_page: number;
    field_order: FieldOrder[];
    page: number;
    total_items: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface ApprovalOTResponse {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface ApprovalPagoOTResponse {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface RejectionOTResponse {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface AssignCoordinatorOTResponse {
  data: {
    ot_id: number;
    user_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface CancelOTResponse {
  data: {
    ot_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface AssignWorkerOTResponse {
  data: {
    ot_id: number;
    user_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface FinalizeOTJobsResponse {
  data: {
    ot_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface ApproveOTMinutesGenerationResponse {
  data: {
    ot_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface RejectOTMinutesGenerationResponse {
  data: {
    ot_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface ApproveOTMinutesValidationResponse {
  data: {
    ot_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface RejectOTMinutesValidationResponse {
  data: {
    ot_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface AuthorizePaymentsResponse {
  data: {
    ot_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface RejectPaymentsResponse {
  data: {
    ot_id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}
