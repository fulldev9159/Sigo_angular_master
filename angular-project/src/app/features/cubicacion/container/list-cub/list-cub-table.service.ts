import { Injectable } from '@angular/core';
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
        actionsType: 'Buttons',
      },
      body: {
        headers: [
          {
            field: 'Nombre',
            type: 'TEXT',
            sort: 'nombre',
            header: 'nombre',
            editable: false,
            width: '20%',
          },
          {
            field: 'Fecha creación',
            type: 'DATE',
            sort: 'fecha_creacion',
            header: 'fecha_creacion',
            width: '8%',
            editable: false,
          },
          {
            field: 'Región',
            type: 'TEXT',
            sort: 'region_nombre',
            header: 'region_nombre',
            width: '10%',
            editable: false,
          },
          {
            field: 'Contrato marco',
            type: 'TEXT',
            sort: 'contrato_marco_nombre',
            header: 'contrato_marco_nombre',
            editable: false,
            width: '8%',
          },
          {
            field: 'Proveedor',
            type: 'TEXT',
            sort: 'proveedor_nombre',
            header: 'proveedor_nombre',
            editable: false,
            width: '10%',
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
            field: 'Creado Por',
            type: 'TEXT',
            sort: 'creador_usuario_nombre',
            header: 'creador_usuario_nombre',
            editable: false,
          },
          {
            field: null,
            type: 'ACTIONS',
            sort: null,
            header: null,
            editable: false,
          },
        ],
        sort: [
          'nombre',
          'fecha',
          'region_nombre',
          'contrato_marco_nombre',
          'total',
          'creador_usuario_nombre',
        ],
        actions: [],
      },
    };
  }
}
