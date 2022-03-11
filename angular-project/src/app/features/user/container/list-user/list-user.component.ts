import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFacade } from '@storeOT/features/user/user.facade';
import { ConfirmationService } from 'primeng/api';
import { Observable, of } from 'rxjs';
import * as Data from '@data';
import { map } from 'rxjs/operators';
import { ListPerfilesUser, TableUserData, User } from '@data';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  public DisplayModal$ = of();
  public usersTableData$: Observable<TableUserData[]>;
  perfilesUser$: Observable<ListPerfilesUser[]>;
  displayModalPerfilesUser$: Observable<boolean>;

  public configTable = {
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
          onClick: (event: Event, item: Data.User) => {
            if (item) {
              this.router.navigate(['/app/user/form-user', item.id]);
            }
          },
        },
        {
          icon: 'pi pi-eye',
          class: 'p-button-text p-button-sm',
          label: 'Detalle',
          onClick: (event: Event, item: Data.User) => {
            // this.userFacade.getAllDataUsuario(item.id);
          },
        },
        {
          icon: 'pi pi-trash',
          class: 'p-button-text p-button-danger p-button-sm',
          label: 'Eliminar',
          onClick: (event: Event, item: Data.User) => {
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
          onClick: (event: Event, item: Data.User) => {
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
          },
        },
      ],
    },
  };

  constructor(
    private router: Router,
    private userFacade: UserFacade,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.userFacade.getAllUsers();
    this.usersTableData$ = this.userFacade.getAllUsers$().pipe(
      map(usuarios => {
        if (usuarios) {
          return usuarios.map(usuario => ({
            id: usuario.id,
            username: usuario.username,
            rut: usuario.rut,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            empresa: usuario.model_proveedor_id.nombre,
            area: usuario.model_area_id.nombre,
            estado: usuario.estado,
          }));
        }
      })
    );
    this.perfilesUser$ = this.userFacade.pefilesUsuario$().pipe(
      map(perfiles => {
        if (perfiles) {
          return perfiles.map(perfil => ({
            id: perfil.perfil_id,
            perfil_propio: perfil.perfil_propio,
            proxy_id: perfil.proxy_id,
            descripcion: perfil.model_perfil.descripcion,
            // rol: perfil.model_perfil.model_rol.nombre,
            nombre: perfil.model_perfil.nombre,
          }));
        }
      })
    );
    this.DisplayModal$ = this.userFacade.DisplayDetalleModal$();
    this.displayModalPerfilesUser$ =
      this.userFacade.displayModalPerfilesUser$$();
  }

  cerrarDisplayModal(value: boolean): void {
    this.userFacade.SetDisplayDetalleModal(value);
  }

  closeAddPerfil(): void {
    this.userFacade.displayModalPerfilesUser(false);
  }
}
