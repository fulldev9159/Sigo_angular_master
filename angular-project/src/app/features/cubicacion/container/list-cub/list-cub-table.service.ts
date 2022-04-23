import { Injectable } from '@angular/core';
import { AllCubs } from '@data';
@Injectable({
  providedIn: 'root',
})
export class ListCubTableService {
  constructor() {}
  getTableConfig(): any {
    return {
      headerConfig: {
        title: '',
        searchText: 'buscar...',
        paginator: true,
        actionsType: 'ButtonsTest',
      },
      body: {
        headers: [
          {
            field: 'Nombre',
            type: 'TEXT-MAIN',
            sort: 'cubicacion_nombre',
            header: 'cubicacion_nombre',
            editable: false,
            // width: '20%',
          },
          {
            field: 'Tipo Cubicación',
            type: 'TEXT-LABEL-CUB',
            sort: 'tipo_cubicacion_descripcion',
            header: 'tipo_cubicacion_descripcion',
            editable: false,
            // width: '7%',
          },
          {
            field: 'Tipo Contrato',
            type: 'TEXT-LABEL-CUB',
            sort: 'contrato_marco_tipo_nombre',
            header: 'contrato_marco_tipo_nombre',
            editable: false,
            // width: '7%',
          },
          {
            field: 'Código Acuerdo',
            type: 'TEXT',
            sort: 'codigo_acuerdo',
            header: 'codigo_acuerdo',
            editable: false,
            // width: '8%',
          },
          {
            field: 'Contrato marco',
            type: 'TEXT',
            sort: 'contrato_marco_nombre',
            header: 'contrato_marco_nombre',
            editable: false,
            // width: '8%',
          },
          {
            field: 'Agencia',
            type: 'TEXT',
            sort: 'agencia_nombre',
            header: 'agencia_nombre',
            // width: '10%',
            editable: false,
          },
          {
            field: 'Proveedor',
            type: 'TEXT',
            sort: 'proveedor_nombre',
            header: 'proveedor_nombre',
            editable: false,
            // width: '10%',
          },

          {
            field: 'Creado Por',
            type: 'TEXT',
            sort: 'creador_usuario_nombre',
            header: 'creador_usuario_nombre',
            editable: false,
          },
          {
            field: 'Fecha creación',
            type: 'DATE',
            sort: 'cubicacion_fecha_creacion',
            header: 'cubicacion_fecha_creacion',
            width: '8%',
            editable: false,
          },
          {
            field: 'Total',
            type: 'MONEY',
            sort: 'total',
            header: 'total',
            currency: 'total_tipo_moneda',
            width: '10%',
            editable: false,
          },
          {
            field: null,
            type: 'ACTIONS',
            sort: null,
            header: null,
            editable: false,
            width: '14rem',
          },
        ],
        sort: [
          'cubicacion_nombre',
          'cubicacion_fecha_creacion',
          'tipo_cubicacion_descripcion',
          'agencia_nombre',
          'contrato_marco_nombre',
          'total',
          'creador_usuario_nombre',
        ],
        actions: (ot: AllCubs) => {},
      },
    };
  }
}
