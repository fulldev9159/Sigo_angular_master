import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

import { UserFacade } from '@storeOT/features/user/user.facade';
import { User } from '@data';
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
        actionsType: 'Buttons',
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
            field: 'Rol',
            type: 'TEXT',
            sort: 'rol',
            header: 'rol',
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
        actions: [
          {
            icon: ' pi pi-pencil',
            class: 'p-button-text p-button-sm',
            label: 'Editar',
            onClick: (event: Event, item: User) => {
              if (item) {
                // this.router.navigate(['/app/user/form-user', item.id]);
              }
            },
          },
          {
            icon: 'pi pi-trash',
            class: 'p-button-text p-button-danger p-button-sm',
            label: 'Eliminar',
            onClick: (event: Event, item: User) => {
              // if (item.eliminable) {
              this.confirmationService.confirm({
                target: event.target as EventTarget,
                message: `¿Está seguro que desea eliminar este Usuario?`,
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Confirmar',
                rejectLabel: 'Cancelar',
                accept: () => {
                  this.userFacade.deleteUser(+item.id);
                },
              });
              // }
            },
          },
        ],
      },
    };
  }
}
