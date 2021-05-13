import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { UserFacade } from '@storeOT/features/user/user.facade';
import * as Model from '@storeOT/features/user/user.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit, OnDestroy {
  // declarations
  public authLogin = null;
  public DisplayModal = false;
  public celular = '';
  public email = '';
  public items$: Observable<any[]>;
  public itemsDetail$: Observable<Model.UserDetail>;
  private destroyInstance: Subject<boolean> = new Subject();

  public configTable = {
    header: true,
    headerConfig: {
      title: '',
      searchText: 'buscar...',
    },
    body: {
      headers: [
        {
          field: 'username',
          type: 'TEXT',
          sort: 'username',
          header: 'username',
          editable: false,
        },
        {
          field: 'Rut',
          type: 'TEXT',
          sort: 'rut',
          header: 'rut',
          editable: false,
        },
        {
          field: 'Nombres',
          type: 'TEXT',
          sort: 'nombres',
          header: 'nombres',
          editable: false,
        },
        {
          field: 'Apellidos',
          type: 'TEXT',
          sort: 'apellidos',
          header: 'apellidos',
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
          field: 'Compañia',
          type: 'TEXT',
          sort: 'proveedor_nombre',
          header: 'proveedor_nombre',
          editable: false,
        },
        {
          field: 'Area',
          type: 'TEXT',
          sort: 'area_nombre',
          header: 'area_nombre',
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
          icon: 'p-button-icon pi pi-pencil',
          class: 'p-button-rounded p-button-warning p-mr-2',
          label: 'Editar',
          onClick: (event: Event, item) => {
            this.userFacade.setFormUser({
              form: {
                id: item.id,
                nombre: item.nombre,
                descripcion: item.descripcion,
                permisos: item.permisos,
              },
            });

            this.router.navigate(['/app/user/form-user', item.id]);
          },
        },
        {
          icon: 'p-button-icon pi pi-eye',
          class: 'p-button-rounded p-button-info p-mr-2',
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
          icon: 'p-button-icon pi pi-trash',
          class: 'p-button-rounded p-button-danger',
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
                this.userFacade.deleteUser({
                  userDelete: {
                    usuario_id: +item.id,
                  },
                });
                this.messageService.add({
                  severity: 'success',
                  summary: 'usuario eliminado',
                  detail: 'Eliminación realizada con Éxito!',
                });
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
  ) {
    this.authFacade
      .getLogin$()
      .pipe(takeUntil(this.destroyInstance))
      .subscribe((authLogin) => {
        if (authLogin) {
          this.authLogin = authLogin;
        }
      });
  }

  ngOnInit(): void {
    this.userFacade.getUsers();
    this.items$ = this.userFacade.getUsers$();
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }
}
