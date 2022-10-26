import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ListPerfilesUserTableService {
  constructor(private router: Router) {}
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
            field: 'Perfil',
            type: 'TEXT-MAIN',
            sort: 'nombre',
            header: 'nombre',
            // width: '10%',
            editable: false,
          },
          {
            field: 'Superior',
            type: 'TEXT-TITLECASE',
            sort: 'superior',
            header: 'superior',
            // width: '10%',
            editable: false,
          },
          {
            field: 'Tipo Perfil',
            type: 'TEXT-TITLECASE',
            sort: 'perfil_propio',
            header: 'perfil_propio',
            // width: '10%',
            editable: false,
          },
          {
            field: '',
            type: 'ACTIONS',
            sort: null,
            header: null,
            width: '14rem',
            editable: false,
          },
        ],
        sort: ['nombre'],
        actions: [],
      },
    };
  }
}
