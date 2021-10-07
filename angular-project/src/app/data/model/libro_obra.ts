export interface RegistroLibroObraRequest {
  ot_id: number;
  observaciones: string;
  files: any;
}

export interface RegistroLibroObra {
  observacion: string;
  adjuntos: Adjunto[];
  autor: string;
  fecha: Date;
  rol: string;
}

export interface Adjunto {
  nombre: string;
  type: string;
  peso: string;
  autor: string;
  fecha: Date;
  url: string;
}
