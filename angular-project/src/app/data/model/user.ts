export interface User {
  id: number;
  username: string;
  rut: string;
  nombres: string;
  apellidos: string;
  celular: string;
  activo: boolean;
  firma: string;
  proveedor_id: number;
  area_id: number;
  email: string;
  created_at: string;
  updated_at: string;
  proveedor_nombre: string;
  area_nombre: string;
}

export interface UsersResponse {
  data: {
    items: User[];
  };

  pagination: {
    total_pages: number;
    items_per_page: number;
    field_order: {
      [index: string]: string;
    }[];
    page: number;
    total_items: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface UserPostRequest {
  id: number;
  username: string;
  nombres: string;
  apellidos: string;
  rut: string;
  firma: string;
  celular: string;
  email: string;
  proveedor_id: number;
  area_id: number;
  perfiles: PerfilFormUser[];
  contratos_marco: number[];
}

export interface PerfilFormUser {
  perfil_id: number;
  persona_a_cargo_id: number;
}

export interface UserPostResponse {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface DetalleUsuarioResponse {
  data: DetalleUsuario;

  status: {
    description: string;
    responseCode: number;
  };
}

export interface DetalleUsuario {
  contratos_marco: ContratoMarco[];
  perfiles: PerfilUser[];
}

export interface ContratoMarco {
  id: number;
  nombre: string;
  tipo_codigo: number;
  tipo_glosa: string;
}

export interface PerfilUser {
  id: number;
  descripcion: string;
  nombre: string;
  persona_a_cargo_id: number;
  persona_a_cargo_nombre: string;
  superior_descripcion: string;
  superior_id: number;
}

export interface UserWithDetail extends User {
  contratos_marco: ContratoMarco[];
  perfiles: PerfilUser[];
}

export interface DeleteResponse {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface ActivacionResponse {
  data: {
    id: number;
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface AreaResponse {
  data: {
    items: Area[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface Area {
  id: number;
  nombre: string;
  descripcion: string;
  interno: boolean;
}
