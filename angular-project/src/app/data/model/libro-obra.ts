import { Archivo } from './archivo';

// LIBRO DE OBRAS
export interface ReqCreateRegistroLibroObra {
  ot_id: number;
  // usuario_id: number;
  observaciones: string;
  archivos?: number[];
}

export interface RegistroLibroDeObras {
  created_at: Date;
  tipo_item: string;

  // TIPO LIBRO OBRAS
  archivos: Archivo[];
  id: number;
  observaciones: string;
  perfil_id: number;
  perfil_nombre: string;
  usuario_id: number;
  usuario_nombre: string;

  // TIPO BITACORA
  evento: string;
  mensaje: string;
  metadata: any;
  nivel: string;
}
