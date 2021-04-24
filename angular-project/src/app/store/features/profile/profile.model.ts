export interface Profile {
  id: number;
  name: string;
  descripcion: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  permissions: Permit[];
}

export interface Permit {
  id: number;
  slug: string;
  nombre_corto: string;
  descripcion: string;
  module: string;
}