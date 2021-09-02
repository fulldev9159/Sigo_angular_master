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
