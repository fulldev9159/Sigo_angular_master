import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ListUserTableService {
  constructor() {}
  getTableConfig(): any {
    return {
      header: true,
      headerConfig: {
        title: '',
        searchText: 'buscar...',
        paginator: true,
        actionsType: 'Menu',
      },
      body: {
        headers: [
          {
            field: 'username',
            type: 'TEXT',
            sort: 'username',
            header: 'username',
            // width: '10%',
            editable: false,
          },
          {
            field: 'Rut',
            type: 'TEXT',
            sort: 'rut',
            header: 'rut',
            // width: '10%',
            editable: false,
          },
          {
            field: 'Nombres',
            type: 'TEXT-TITLECASE',
            sort: 'nombres',
            header: 'nombres',
            // width: '10%',
            editable: false,
          },
          {
            field: 'Apellidos',
            type: 'TEXT-TITLECASE',
            sort: 'apellidos',
            header: 'apellidos',
            // width: '8%',
            editable: false,
          },
          {
            field: 'Empresa',
            type: 'TEXT-TITLECASE',
            sort: 'empresa',
            header: 'empresa',
            // width: '10%',
            editable: false,
          },
          {
            field: 'Area',
            type: 'TEXT-TITLECASE',
            sort: 'area',
            header: 'area',
            // width: '10%',
            editable: false,
          },
          {
            field: 'Celular',
            type: 'TEXT',
            sort: 'celular',
            header: 'celular',
            // width: '10%',
            editable: false,
          },
          {
            field: 'Email',
            type: 'TEXT',
            sort: 'email',
            header: 'email',
            // width: '10%',
            editable: false,
          },
          {
            field: 'Creado el ',
            type: 'DATE',
            sort: 'create_at',
            header: 'create_at',
            // width: '10%',
            editable: false,
          },
          {
            field: 'Actualizado el ',
            type: 'DATE',
            sort: 'update_at',
            header: 'update_at',
            // width: '10%',
            editable: false,
          },
          {
            field: 'Estado',
            type: 'BOOLEANTEXT',
            sort: 'estado',
            header: 'estado',
            booleantrue: 'Activo',
            booleanfalse: 'Bloqueado',
            width: '5%',
            editable: false,
          },
          {
            field: 'Acciones',
            type: 'ACTIONS',
            sort: null,
            header: null,
            editable: false,
          },
        ],
        sort: ['username', 'rut', 'nombres', 'apellidos', 'proveedor_nombre'],
        actions: [],
      },
    };
  }
}
