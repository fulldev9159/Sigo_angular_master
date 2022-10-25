export * from './auth';
export * from './perfil';
export * from './rol';
export * from './usuario';
export * from './accion';
export * from './usuario';
export * from './contrato';
export * from './cubicacion';
export * from './proveedor';
export * from './servicio';
export * from './unidad-obra';
export * from './carrito';
export * from './material';
export * from './ot';
export * from './agencia';
export * from './numero_interno';
export * from './sustento-financiero';
export * from './proyectos';
export * from './flujo-ot';
export * from './ot-detalle';
export * from './comuna';
export * from './oficina-central';
export * from './tipo-trabajo';
export * from './informe-avance';
export * from './servicios_adicionales';
export * from './acta';
export * from './archivo';
export * from './libro-obras';
export * from './permiso';
export * from './guia-subgrupo';
export * from './area';

export interface Response<T> {
  data: T;
  status: StatusResponse;
}

export interface StatusResponse {
  desc: string;
  code: number;
}

export interface IdNombreType {
  id: number;
  nombre: string;
}

export interface Dropdown {
  name: string;
  code: number | string;
}
