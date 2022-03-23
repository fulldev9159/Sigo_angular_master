import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

import { UserFacade } from '@storeOT/features/user/user.facade';
import { ListPerfilesUserType, User } from '@data';
@Injectable({
  providedIn: 'root',
})
export class ListPerfilesUserTableService {
  constructor(
    private router: Router,
    private userFacade: UserFacade,
    private confirmationService: ConfirmationService
  ) {}
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
            field: 'Perfil',
            type: 'TEXT',
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
