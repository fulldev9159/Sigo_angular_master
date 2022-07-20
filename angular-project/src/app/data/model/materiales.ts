import { TipoMoneda } from './tipo-moneda';
import { Unidad } from './unidad';

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

  model_unidad_id: Unidad;
  model_tipo_moneda_id: TipoMoneda;
  model_material_cod: ModelMaterial;
}

export interface ModelMaterial {
  codigo: string;
  descripcion: string;
  unidad_id: number;
  origen: string;
  tipo_moneda_id: number;
  valor: number;
  codigo_sap: any;
}

export interface MaterialesFromDetalle {
  codigo_sap: string;
  cub_has_material_id: number;
  factor_conversion: number;
  material_cantidad: number;
  material_cod: string;
  material_desc: string;
  material_unidad_medida_cod: string;
  material_unidad_medida_id: number;
  material_valor_clp: number;
  origen: string;
  tipo_moneda_cod: string;
  tipo_moneda_id: number;
  valor: number;
}

export interface Materiales4Cub {
  material_cantidad: number;
  material_codigo: string;
  material_nombre: string;
  material_origen: string;
  material_precio: number;
  material_precio_clp: number;
  material_tipo_moneda_id: number;
  material_unidad_id: number;
  material_unidad_medida_cod?: string;
  material_valor: number;

  material_unidad_codigo: string;
  material_unidad_descripcion: string;
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
  model_material_cod: ModelMaterial;
}

export interface MaterialesDetalleCubicacion {
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
