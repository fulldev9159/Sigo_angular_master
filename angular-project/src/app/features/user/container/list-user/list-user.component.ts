import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { UserFacade } from '@storeOT/features/user/user.facade';
import { ConfirmationService } from 'primeng/api';
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
  public items$: Observable<any[]>;
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
          header: 'nombre',
          editable: false,
        },
        {
          field: 'Apellidos',
          type: 'TEXT',
          sort: 'apellidos',
          header: 'nombre',
          editable: false,
        },
        {
          field: 'Email',
          type: 'TEXT',
          sort: 'email',
          header: 'email',
          editable: false,
        },
        {
          field: 'Celular',
          type: 'TEXT',
          sort: 'celular',
          header: 'nombre',
          editable: false,
        },
        {
          field: 'Compañia',
          type: 'TEXT',
          sort: 'proveedor_nombre',
          header: 'proveedor_nombre',
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
        'email',
        'celular',
        'proveedor_nombre',
      ],
      actions: [
        {
          icon: 'p-button-icon pi pi-pencil',
          class: 'p-button-rounded p-button-warning p-mr-2',
          onClick: (event: Event, item) => {
            this.userFacade.setFormUser({
              form: {
                id: item.id,
                nombre: item.nombre,
                descripcion: item.descripcion,
                permisos: item.permisos,
              },
            });

            this.router.navigate(['/app/profile/form-pro', item.id]);
          },
        },
        {
          icon: 'p-button-icon pi pi-eye',
          class: 'p-button-rounded p-button-info p-mr-2',
          onClick: (item) => {
            console.log(item);
          },
        },
        {
          icon: 'p-button-icon pi pi-trash',
          class: 'p-button-rounded p-button-danger',
          onClick: (item) => {
            console.log(item);
          },
        },
      ],
    },
  };

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private userFacade: UserFacade,
    private confirmationService: ConfirmationService
  ) {
    this.authFacade
      .getLogin$()
      .pipe(takeUntil(this.destroyInstance))
      .subscribe((authLogin) => {
        if (authLogin) {
          // asignamos datos de usuario autenticado a variable local
          this.authLogin = authLogin;
        }
      });
  }

  ngOnInit(): void {
    this.userFacade.getUsers({
      token: this.authLogin.token,
    });

    this.items$ = this.userFacade.getUsers$();
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }
}
