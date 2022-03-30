import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ListProTableService {
  constructor() {}
  getTableConfig(): any {
    return {
      header: true,
      headerConfig: {
        title: '',
        searchText: 'buscar...',
        paginator: true,
        actionsType: 'ButtonsTest',
      },
      body: {
        headers: [
          {
            field: 'Nombre Perfil',
            type: 'TEXT-MAIN',
            sort: 'nombre',
            header: 'nombre',
            editable: false,
          },
          {
            field: 'Rol',
            type: 'TEXT',
            sort: 'rol',
            header: 'rol',
            editable: false,
          },
          {
            field: 'Descripción',
            type: 'TEXT',
            sort: 'descripcion',
            header: 'descripcion',
            editable: false,
            width: '41%',
          },
          {
            field: 'Fecha Creación',
            type: 'DATE',
            sort: 'created_at',
            header: 'created_at',
            editable: false,
            width: '10%',
          },

          {
            field: 'Fecha Modificación',
            type: 'DATE',
            sort: 'updated_at',
            header: 'updated_at',
            editable: false,
            width: '10%',
          },
          {
            field: null,
            type: 'ACTIONS',
            sort: null,
            header: null,
            editable: false,
            width: '10%',
          },
        ],
        sort: ['nombre', 'descripcion', 'created_at', 'superior'],
        actions: [],
      },
    };
  }
}
