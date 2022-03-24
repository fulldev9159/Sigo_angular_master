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
            type: 'TEXT-MAIN',
            sort: 'username',
            header: 'username',
            width: '9rem',
            editable: false,
          },
          {
            field: 'Rut',
            type: 'TEXT',
            sort: 'rut',
            header: 'rut',
            width: '7rem',
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
            width: '8.5rem',
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
            width: '5.7rem',
            editable: false,
          },
          {
            field: 'Actualizado el ',
            type: 'DATE',
            sort: 'update_at',
            header: 'update_at',
            width: '5.7rem',
            editable: false,
          },
          {
            field: 'Firma',
            type: 'BOOLEANTEXT',
            sort: 'firma',
            header: 'firma',
            booleantrue: 'Con firma',
            booleanfalse: 'Sin firma',
            width: '5.4rem',
            editable: false,
          },
          {
            field: 'Estado',
            type: 'BOOLEANTEXT',
            sort: 'estado',
            header: 'estado',
            booleantrue: 'Activo',
            booleanfalse: 'Bloqueado',
            width: '4.4rem',
            editable: false,
          },
          {
            field: '',
            type: 'ACTIONS',
            sort: null,
            header: null,
            width: '4.4rem',
            editable: false,
          },
        ],
        sort: ['username', 'rut', 'nombres', 'apellidos', 'proveedor_nombre'],
        actions: [],
      },
    };
  }
}
