export interface ModelUsuario {
  apellidos: string;
  area_id: number;
  celular: string;
  created_at: Date;
  email: string;
  estado: boolean;
  firma_archivo_id: number;
  id: number;
  nombres: string;
  proveedor_id: number;
  rut: string;
  updated_at: Date;
  username: string;
  eliminable: boolean;
}

export interface ModelProxyUsuarios {
  created_at: Date;
  id: number;
  model_usuario_id: ModelUsuario;
  perfil_id: number;
  superior_proxy_id: number;
  updated_at: Date;
  usuario_id: number;
  usuario_orig: number;
}

export interface ModelUsuarioSuperior extends ModelProxyUsuarios {
  model_usuario_id: ModelUsuario;
}
