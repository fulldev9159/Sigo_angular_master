
export interface Login {
  token: string;
  usuario_nombre: string;
  usuario_id: number;
  roles_modulos: Rol[];
}


export interface Rol {
  id: number;
  nombre: string;
  modulos: Module[];
}

export interface Module {
  nombre: string;
  privilegio: any;
}

