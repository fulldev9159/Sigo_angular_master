export interface Permiso {
  permiso_id: number;
  slug: string;
  nombre_corto: string;
  descripcion: string;
}

export interface PermissionModule extends Permiso {
  module: string;
}
export interface PermisoResponse {
  data: { items: Permiso[] };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface ResponseGetRolWithPermisos {
  data: { items: RolWithPermisos[] };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface RolWithPermisos {
  id: number;
  nombre: string;
  permiso: Permiso[];
}
