export interface Notificaciones {
  data: {
    registros_nuevos: DataNotificaciones[];
    registros_vistos: DataNotificaciones[];
    total_nuevos: number;
  };
  pagination: any;
  status: {
    descripcion: string;
    responseCode: number;
  };
}

export interface DataNotificaciones {
  checked_at: any;
  created_at: Date;
  id: number;
  mensaje: string;
  metadata: any;
  permiso_slug: string;
}
