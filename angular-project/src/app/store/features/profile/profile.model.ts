export interface Profile {
  id: number;
  name: string,
  descripcion:string,
  fecha_creacion: Date,
  fecha_actualizacion:Date,
  permissions: permissions[]
}

export interface permissions {
  permiso_id: number,
  permiso_slug: string,
}