import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { UserFacade } from '@storeOT/features/user/user.facade';
import { ListPerfilesUserType, User } from '@data';
@Injectable({
  providedIn: 'root',
})
export class ListPerfilesUserTableService {
  constructor(private router: Router, private userFacade: UserFacade) {}
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
