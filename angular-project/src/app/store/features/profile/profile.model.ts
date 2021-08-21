export interface Profile {
  id: number;
  nombre: string;
  descripcion: string;
  created_at: Date;
  updated_at: Date;
  permisos: Permit[];
  superior_id: number;
  superior_nombre: string;
}

export interface Permit {
  id: number;
  slug: string;
  nombre_corto: string;
  descripcion: string;
}

export interface Form {
  id: number;
  nombre: string;
  descripcion: string;
  permisos: number[];
  superior: number;
}
