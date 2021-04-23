export interface Profile {
  id: number;
  nombre: string,
  descripcion:string,
  // fecha_creacion: Date,
  // fecha_actualizacion:Date,
  permisos: permissions[]
}

export interface permissions {
  id: number,
  slug: string,
  nombre_corto: string,
  descripcion: string
}