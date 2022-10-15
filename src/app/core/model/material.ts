import { TipoMoneda, Unidad } from './servicio';

export interface ModelMaterial {
  codigo: string;
  descripcion: string;
  unidad_id: number;
  origen: string;
  tipo_moneda_id: number;
  valor: number;
  codigo_sap: any;
}

export interface MaterialesManoObra {
  material_cantidad?: number;
  material_codigo?: string;
  material_nombre: string;
  material_origen?: string;
  material_precio?: number;
  material_precio_clp?: number;
  material_tipo_moneda_id?: number;
  material_unidad_id?: number;
  material_unidad_medida_cod?: string;
  material_valor?: number;

  material_unidad_codigo?: string;
  material_unidad_descripcion?: string;
}

// DETALLE MATERIAL CUBICACION
export interface DetalleMaterialCubicacion {
  id: number;
  material_cod: string;
  cubicacion_has_uob_id: number;
  cantidad: number;
  unidad_id: number;
  tipo_moneda_id: number;
  valor: number;
  codigo_sap?: any;
  origen: string;
  factor_conversion: number;
  valor_unitario_clp: number;
  model_unidad_id: Unidad;
  model_tipo_moneda_id: TipoMoneda;
  model_material_cod: ModelMaterial;
}

// INFORME DE AVANCE
export interface MaterialFromInformeAvance {
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

  model_unidad_id: Unidad;
  model_tipo_moneda_id: TipoMoneda;
  model_material_cod: ModelMaterial;
}
