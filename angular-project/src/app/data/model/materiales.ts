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
