export interface LoginAuth {
  username: string;
  password: string;
}

export interface Login {
  token: string;
  usuario_nombre: string;
  usuario_id: number;
  perfiles: Perfil[];
}

export interface Perfil {
  created_at: Date;
  descripcion: string;
  eliminable: boolean;
  id: number;
  nombre: string;
  permisos: Permisos[];
  updated_at: Date;
}

export interface Permisos {
  id: number;
  slug: string;
}
