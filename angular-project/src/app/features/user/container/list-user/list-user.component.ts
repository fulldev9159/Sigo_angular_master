import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { UserFacade } from '@storeOT/features/user/user.facade';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import * as Data from '@data';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUserComponent implements OnInit, OnDestroy {
  // declarations
  public DisplayModal = false;
  public celular = '';
  public email = '';
  public items$: Observable<any[]>;
  public itemsDetail$: Observable<Data.DetalleUsuario>;
  private destroyInstance: Subject<boolean> = new Subject();

  public configTable = {
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
          width: '8%',
          editable: false,
        },
        // {
        //   field: 'Email',
        //   type: 'TEXT',
        //   sort: 'email',
        //   header: 'email',
        //   editable: false,
        // },
        // {
        //   field: 'Celular',
        //   type: 'TEXT',
        //   sort: 'celular',
        //   header: 'nombre',
        //   editable: false,
        // },
        {
          field: 'Empresa',
          type: 'TEXT-TITLECASE',
          sort: 'proveedor_nombre',
          header: 'proveedor_nombre',
          // width: '10%',
          editable: false,
        },
        {
          field: 'Area',
          type: 'TEXT-TITLECASE',
          sort: 'area_nombre',
          header: 'area_nombre',
          // width: '10%',
          editable: false,
        },
        {
          field: 'Estado',
          type: 'BOOLEANTEXT',
          sort: 'activo',
          header: 'activo',
          booleantrue: 'Activo',
          booleanfalse: 'Bloqueado',
          width: '5%',
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
        'username',
        'rut',
        'nombres',
        'apellidos',
        // 'email',
        // 'celular',
        'proveedor_nombre',
      ],
      actions: [
        {
          icon: ' pi pi-pencil',
          class: 'p-button-text p-button-sm',
          label: 'Editar',
          onClick: (event: Event, item) => {
            if (item) {
              this.router.navigate(['/app/user/form-user', item.id]);
            }
          },
        },
        {
          icon: 'pi pi-eye',
          class: 'p-button-text p-button-sm',
          label: 'Detalle',
          onClick: (event: Event, item) => {
            this.email = item.email;
            this.celular = item.celular;
            this.userFacade.getUserDetail(item.id);
            this.itemsDetail$ = this.userFacade.getUserDetail$();
            this.DisplayModal = true;
          },
        },
        {
          icon: 'pi pi-trash',
          class: 'p-button-text p-button-danger p-button-sm',
          label: 'Eliminar',
          onClick: (event: Event, item) => {
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
          onClick: (event: Event, item) => {
            // if (item.eliminable) {
            const txt = item.activo ? 'Bloquear' : 'Activar';
            this.confirmationService.confirm({
              target: event.target as EventTarget,
              message: `¿Está seguro que desea ${txt} este Usuario?`,
              icon: 'pi pi-exclamation-triangle',
              acceptLabel: 'Confirmar',
              rejectLabel: 'Cancelar',
              accept: () => {
                this.userFacade.activateUser(+item.id, !item.activo);
              },
            });
            // }
          },
        },
      ],
    },
  };

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private userFacade: UserFacade,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.userFacade.getAllUsers();
    this.items$ = this.userFacade.getUsers$();
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }
}
