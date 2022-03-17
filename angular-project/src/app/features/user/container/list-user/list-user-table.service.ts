import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

import { UserFacade } from '@storeOT/features/user/user.facade';
import { User } from '@data';
@Injectable({
  providedIn: 'root',
})
export class ListUserTableService {
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
        actions: [
          {
            icon: ' pi pi-pencil',
            class: 'p-button-text p-button-sm',
            label: 'Editar',
            onClick: (event: Event, item: User) => {
              if (item) {
                this.router.navigate(['/app/user/form-user', item.id]);
              }
            },
          },
          {
            icon: 'pi pi-eye',
            class: 'p-button-text p-button-sm',
            label: 'Detalle',
            onClick: (event: Event, item: User) => {
              // this.userFacade.getAllDataUsuario(item.id);
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
          {
            icon: ' pi pi-ban',
            class: 'p-button-text p-button-danger p-button-sm',
            labelVariable: true,
            label: 'activo',
            onClick: (event: Event, item: User) => {
              // if (item.eliminable) {
              const txt = item.estado ? 'Bloquear' : 'Activar';
              this.confirmationService.confirm({
                target: event.target as EventTarget,
                message: `¿Está seguro que desea ${txt} este Usuario?`,
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Confirmar',
                rejectLabel: 'Cancelar',
                accept: () => {
                  this.userFacade.activateUser(+item.id, !item.estado);
                },
              });
              // }
            },
          },
          {
            icon: ' pi pi-plus',
            class: 'p-button-text p-button-danger p-button-sm',
            label: 'Agregar Perfil',
            onClick: (event: Event, item: User) => {
              this.userFacade.getPerfilesUser(item.id);
              this.userFacade.seletedUser4AddPerfil(item);
              // this.nombreUsuario = item.nombres + ' ' + item.apellidos;
              // this.usuario_id = item.id;
              this.userFacade.getAllPerfiles();
            },
          },
        ],
      },
    };
  }
}
