import { StatusResponse, ModelUsuario } from '@model';
import { ModelMaterial } from './material';
import {
  ModelActividadId,
  ModelServicio,
  ModelServicioWithTipo,
  ModelServicioWithTipoAndUnidad,
} from './servicio';
import { ModelUnidadObra } from './unidad-obra';

export interface DetalleServicio4Acta {
  servicio_numero_producto: string;
  adicional_aceptacion_estado: string;
  cantidad_total: number;
  evidencia_id: number;
  factor_conversion_precio: number;
  faltante_cantidad: number;
  id: number;
  informe_avance_id: number;
  ot_id: number;
  precio_tipo_moneda_codigo: string;
  precio_tipo_moneda_id: number;
  precio_tipo_moneda_nombre: string;
  prov_has_serv_precio: number;
  puntos_baremos: number;
  requiere_evidencia: boolean;
  servicio_id: number;
  tipo_contrato_id: number;
  unidad_codigo: string;
  unidad_descripcion: string;
  unidad_id: number;

  faltante_porcentaje_entero: number;
  faltante_porcentaje_fraccion: number;

  servicio_codigo: string;
  servicio_descripcion: string;

  valor_unitario_clp: number;

  actividad_descripcion: string;
  tipo_servicio_descripcion: string;
}

export interface DetalleUO4Acta {
  cantidad_total: number;
  faltante_cantidad: number;
  id: number;
  informe_avance_id: number;
  ot_id: number;
  tipo_contrato_id: number;
  unidad_codigo: string;
  unidad_descripcion: string;
  unidad_id: number;
  unidad_obra_cod: string;
  faltante_porcentaje_entero: number;
  faltante_porcentaje_fraccion: number;
  unidad_obra_desc: string;
  valor_unitario_clp: number;
  servicio_adicional_aceptacion_estado: string;

  informe_has_servicio_id: number;
  servicio_codigo: string;
  servicio_descripcion: string;

  servicio_numero_producto: string;
  servicio_requiere_evidencia: boolean;
  servicio_evidencia_id: number;
}

export interface ActaTipoPago {
  id: number;
  descripcion: string;
}

export interface RequestValidarActa {
  ot_id: number;
  tipo_pago: string;
  observacion: string;
  estado: string;
  detalle: {
    servicio: Servicios4ValidarActa[];
    unidad_obra: UOs4ValidarActa[];
  };
}

export interface Servicios4ValidarActa {
  rowid: number;
  cantidad: number;
  porcentaje: number;
}

export interface UOs4ValidarActa {
  rowid: number;
  cantidad: number;
  porcentaje: number;
}

// ACEPTAR/RECHAZAR ADICIONALES
export interface RequestAceptarRechazarAdicionales {
  ot_id: number;
  adicionales_aceptados?: number[];
  adicionales_rechazados?: number[];
  causas_rechazo_id?: number;
  observacion?: string;
}

// LAST ACTA
export interface LastActa {
  created_at: Date;
  flg_pagado: boolean;
  id: number;
  informe_avance_id: number;
  obs_fin_trabajos: string;
  obs_validacion: null;
  ot_id: number;
  tipo_pago: string;
  validacion_estado: string;
  validacion_fecha: Date;
  validacion_usuario_id: number;
  autorizacion_estado: string;
  autorizacion_fecha?: any;
  tipo_sustento: string;
  pmo_codigo: number;
  id_opex?: any;
  lp: string;
  cuenta_sap?: any;
  pep2: string;
  ceco?: any;
  valor_total_clp: number;

  imputacion1_estado: string;
  imputacion1_fecha: Date;
  imputacion2_estado: string;
  imputacion2_fecha: Date;
  flg_pagar_cerrar: Date;

  many_acta_detalle_servicio: DetalleServicioLastActa[];
  many_acta_detalle_uob: DetalleUnidadObraLastActa[];
}

export interface DetalleServicioLastActa {
  acta_id: number;
  id: number;
  informe_has_servicio_id: number;

  imputacion1_estado: null;
  imputacion2_estado: null;
  imputacion1_json: null;
  imputacion2_json: null;
  model_informe_has_servicio_id: {
    numero_producto: string;
    actividad_id: number;
    adicional_aceptacion_estado: string;
    adicional_aceptacion_fecha: Date;
    adicional_aceptacion_usuario_id: number;
    adicional_causas_rechazo_id: number;
    adicional_rechazo_observacion: string;
    cantidad: number;
    evidencia_id: number;
    factor_conversion_precio: number;
    id: number;
    informe_avance_id: number;
    // model_servicio_id: ModelServicio;
    precio_tipo_moneda_id: number;
    prov_has_serv_precio: number;
    puntos_baremos: number;
    requiere_evidencia: boolean;
    servicio_id: number;
    tipo_servicio_id: number;
    unidad_id: number;
    valor_unitario_clp: number;
    model_servicio_id: ModelServicioWithTipoAndUnidad;
    model_actividad_id: ModelActividadId;
  };
  pago_cantidad: number;
  pago_porcentaje: number;

  valor_detalle_clp: number;
}

export interface DetalleUnidadObraLastActa {
  id: number;
  acta_id: number;
  informe_has_uob_id: number;
  pago_cantidad: number;
  pago_porcentaje: number;
  model_informe_has_uob_id: {
    id: number;
    informe_has_servicio_id: number;
    unidad_obra_cod: string;
    cantidad: number;
    unidad_id: number;
    clave: string;
    model_informe_has_servicio_id: ModelInformeHasServicio;
    model_unidad_obra_cod: ModelUnidadObra;
    model_unidad_id: {
      id: number;
      codigo: string;
      descripcion: string;
      estado: boolean;
    };
    many_informe_has_material: MaterialesLastActa[];
    valor_unitario_clp: number;
  };
  valor_detalle_clp: number;
}

export interface ModelInformeHasServicio {
  id: number;
  informe_avance_id: number;
  servicio_id: number;
  actividad_id: number;
  tipo_servicio_id: number;
  cantidad: number;
  unidad_id: number;
  puntos_baremos: number;
  prov_has_serv_precio: number;
  precio_tipo_moneda_id: number;
  factor_conversion_precio: number;
  adicional_aceptacion_estado: string;
  adicional_aceptacion_usuario_id?: any;
  adicional_aceptacion_fecha?: any;
  adicional_causas_rechazo_id?: any;
  adicional_rechazo_observacion?: any;
  requiere_evidencia: boolean;
  evidencia_id?: any;
  model_servicio_id: ModelServicio;
  numero_producto: string;
}

export interface MaterialesLastActa {
  id: number;
  material_cod: string;
  informe_has_uob_id: number;
  cantidad: number;
  unidad_id: number;
  tipo_moneda_id: number;
  valor: number;
  codigo_sap: string;
  origen: string;
  factor_conversion: number;
  valor_unitario_clp: number;
  model_material_cod: ModelMaterial;
}

export interface listarActa {
  id: number;
  ot_id: number;
  informe_avance_id: number;
  obs_fin_trabajos: string;
  obs_validacion?: any;
  validacion_usuario_id: number;
  validacion_estado: string;
  validacion_fecha: Date;
  autorizacion_estado: string;
  autorizacion_fecha?: any;
  tipo_pago: string;
  flg_pagado: boolean;
  tipo_sustento: string;
  pmo_codigo: number;
  id_opex?: any;
  lp: string;
  cuenta_sap?: any;
  pep2: string;
  ceco?: any;
  imputacion1_estado: string;
  imputacion1_fecha?: any;
  imputacion2_estado: string;
  imputacion2_fecha?: any;
  flg_pagar_cerrar?: any;
  created_at: Date;
  pdf_archivo_id?: any;
  model_ot_id: OTActa;
  model_informe_avance_id: ModelInformeAvanceActa;
  model_validacion_usuario_id: ModelValidacionUsuarioActa;
}

export interface OTActa {
  id: number;
  proyecto_id?: any;
  propietario_usuario_id: number;
  responsable_proxy_id: number;
  tipo_estado_ot_id: number;
  tipo_etapa_ot_id: number;
  sce_session: string;
  flg_quiebre: boolean;
  aceptacion_inicial_id: number;
  created_at: Date;
  nombre: string;
  cubicacion_id: number;
  cubicacion_ing_id?: any;
  observaciones: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  tipo_sustento: string;
  es_sustento_provisorio: boolean;
  pmo_codigo: number;
  id_opex?: any;
  lp: string;
  cuenta_sap?: any;
  pep2: string;
  ceco?: any;
  carta_adjudicacion?: any;
  fecha_adjudicacion?: any;
  numero_pedido?: any;
  materia?: any;
  plan_id?: any;
  sitio_plan_id?: any;
  oficina_central_id: number;
  solicitante_id: number;
  direccion: string;
  altura: string;
  piso: string;
  departamento: string;
  comuna_id: number;
  tipo_red_id: number;
  tipo_trabajo_id: number;
  tiene_boleta_garantia: boolean;
  tiene_permisos: boolean;
  area_negocio: string;
  nombre_proyectista: string;
}

export interface ModelInformeAvanceActa {
  id: number;
  ot_id: number;
  observacion?: any;
  envio_usuario_id: number;
  envio_fecha: Date;
  aprobacion_usuario_id: number;
  aprobacion_estado: string;
  aprobacion_fecha: Date;
  costo: number;
  created_at: Date;
}

export interface ModelValidacionUsuarioActa {
  id: number;
  username: string;
  guia_subgrupo_id: number;
  delegated_auth: boolean;
  password?: any;
  rut: string;
  nombres: string;
  apellidos: string;
  celular: string;
  estado: boolean;
  proveedor_id: number;
  area_id: number;
  email: string;
  firma_archivo_id?: any;
  eliminable: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ResponseDetalleActa {
  status: StatusResponse;
  acta: ActaDetalleActa;
  pdf_acta: {
    concepto: string;
    categoria_id: number;
    categoria_nombre: string;
    extension: string;
    nombre_original: string;
    size: number;
    human_size: string;
    url: string;
    created_at: Date;
  };
  data: {
    items: dataDetalleActa[];
  };
}

export interface dataDetalleActa {
  id: number;
  nivel: string;
  evento: string;
  mensaje: string;
  metadata: string;
  created_at: Date;
  bitacora_nivel: number;
}

export interface ActaDetalleActa {
  id: number;
  ot_id: number;
  informe_avance_id: number;
  obs_fin_trabajos: string;
  obs_validacion?: any;
  validacion_usuario_id: number;
  validacion_estado: string;
  validacion_fecha: Date;
  autorizacion_estado: string;
  autorizacion_fecha?: any;
  tipo_pago: string;
  flg_pagado: boolean;
  tipo_sustento: string;
  pmo_codigo: number;
  id_opex?: any;
  lp: string;
  cuenta_sap?: any;
  pep2: string;
  ceco?: any;
  imputacion1_estado: string;
  imputacion1_fecha?: any;
  imputacion2_estado: string;
  imputacion2_fecha?: any;
  flg_pagar_cerrar?: any;
  created_at: Date;
  pdf_archivo_id?: any;
  model_ot_id: OTDetalleActa;
  model_informe_avance_id: {
    id: number;
    ot_id: number;
    observacion?: any;
    envio_usuario_id: number;
    envio_fecha: Date;
    aprobacion_usuario_id: number;
    aprobacion_estado: string;
    aprobacion_fecha: Date;
    costo: number;
    created_at: Date;
  };
  model_validacion_usuario_id: {
    id: number;
    username: string;
    guia_subgrupo_id: number;
    delegated_auth: boolean;
    password?: any;
    rut: string;
    nombres: string;
    apellidos: string;
    celular: string;
    estado: boolean;
    proveedor_id: number;
    area_id: number;
    email: string;
    firma_archivo_id?: any;
    eliminable: boolean;
    created_at: Date;
    updated_at: Date;
  };
}

export interface OTDetalleActa {
  id: number;
  proyecto_id?: any;
  propietario_usuario_id: number;
  responsable_proxy_id: number;
  tipo_estado_ot_id: number;
  tipo_etapa_ot_id: number;
  sce_session: string;
  flg_quiebre: boolean;
  aceptacion_inicial_id: number;
  created_at: Date;
  nombre: string;
  cubicacion_id: number;
  cubicacion_ing_id?: any;
  observaciones: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  tipo_sustento: string;
  es_sustento_provisorio: boolean;
  pmo_codigo: number;
  id_opex?: any;
  lp: string;
  cuenta_sap?: any;
  pep2: string;
  ceco?: any;
  carta_adjudicacion?: any;
  fecha_adjudicacion?: any;
  numero_pedido?: any;
  materia?: any;
  plan_id?: any;
  sitio_plan_id?: any;
  oficina_central_id: number;
  solicitante_id: number;
  direccion: string;
  altura: string;
  piso: string;
  departamento: string;
  comuna_id: number;
  tipo_red_id: number;
  tipo_trabajo_id: number;
  tiene_boleta_garantia: boolean;
  tiene_permisos: boolean;
  area_negocio: string;
  nombre_proyectista: string;
}

export interface QuienAutorizoActa {
  ot_id: number;
  acta_id: number;
  proxy_id: number;
  ot_total: number;
  monto_max: number;
  created_at: Date;
  model_acta_id: {
    id: number;
    ot_id: number;
    informe_avance_id: number;
    observacion?: any;
    validacion_usuario_id: number;
    validacion_estado: string;
    validacion_fecha: Date;
    autorizacion_estado: string;
    autorizacion_fecha: Date;
    tipo_pago: string;
    flg_pagado: boolean;
    tipo_sustento: string;
    pmo_codigo: number;
    id_opex?: any;
    lp: string;
    cuenta_sap?: any;
    pep2: string;
    ceco?: any;
    created_at: Date;
  };
  model_ot_id: {
    id: number;
    proyecto_id?: any;
    propietario_usuario_id: number;
    responsable_proxy_id: number;
    tipo_estado_ot_id: number;
    tipo_etapa_ot_id: number;
    sce_session: string;
    flg_quiebre: boolean;
    aceptacion_inicial_id: number;
    created_at: Date;
    nombre: string;
    cubicacion_id: number;
    observaciones: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    tipo_sustento: string;
    es_sustento_provisorio: boolean;
    pmo_codigo: number;
    id_opex?: any;
    lp: string;
    cuenta_sap?: any;
    pep2: string;
    ceco?: any;
    carta_adjudicacion?: any;
    fecha_adjudicacion?: any;
    numero_pedido?: any;
    materia?: any;
    plan_id?: any;
    sitio_plan_id?: any;
    oficina_central_id: number;
    solicitante_id: number;
    direccion: string;
    altura: string;
    piso: string;
    departamento: string;
    comuna_id: number;
    tipo_red_id: number;
    tipo_trabajo_id: number;
    tiene_boleta_garantia?: any;
    tiene_permisos?: any;
    area_negocio: string;
    nombre_proyectista: string;
  };
  model_proxy_id: {
    id: number;
    usuario_orig: number;
    usuario_id: number;
    perfil_id: number;
    superior_proxy_id: number;
    created_at: Date;
    updated_at: Date;
    model_usuario_id: ModelUsuario;
  };
}

export interface RequestAprobacionRechazoSolicitudPago {
  ot_id: number;
  acta_id: number;
  ot_total: number;
  autoriza_pago: string; // AUTORIZADO, NO_AUTORIZADO
  tipo_rechazo?: number;
  observacion: string;
}


