export interface RegistroLibroObraRequest {
  ot_id: number;
  observaciones: string;
  files: any;
}

export interface GetLibroObrasResponse {
  data: {
    items: RegistroLibroObra[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface RegistroLibroObra {
  created_at: Date;
  id: number;
  observaciones: string;
  perfil_descripcion: string;
  perfil_id: number;
  perfil_nombre: string;
  usuario_email: string;
  usuario_id: number;
  usuario_nombre: string;
  usuario_rut: number;
  archivos_adjuntos: ArchivosAdjuntos[];
}

export interface ArchivosAdjuntos {
  extension: string;
  nombre_original: string;
  size: string;
  url: string;
}
export interface AdjuntosArray {
  autor: string;
  fecha: Date;
  extension: string;
  nombre_original: string;
  size: string;
  url: string;
}
