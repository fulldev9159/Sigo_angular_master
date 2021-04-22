import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { takeUntil } from 'rxjs/operators';
import { ProfileFacade } from '@storeOT/features/profile/profile.facade';


@Component({
  selector: 'app-list-pro',
  templateUrl: './list-pro.component.html',
  styleUrls: ['./list-pro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListProComponent implements OnInit, OnDestroy {
  // declarations
  public DisplayModal = false;
  public ModalDataPermissions = []
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
          field: 'Nombre Perfil',
          type: 'TEXT',
          sort: 'name',
          header: 'name',
          editable: false
        },
        {
          field: 'Descripción',
          type: 'TEXT',
          sort: 'descripcion',
          header: 'descripcion',
          editable: false,
        },
        {
          field: 'Fecha creación',
          type: 'DATE',
          sort: 'fecha_creacion',
          header: 'fecha_creacion',
          editable: false,
        },
        {
          field: 'Fecha modificación',
          type: 'DATE',
          sort: 'fecha_actualizacion',
          header: 'fecha_actualizacion',
          editable: false,
        },
        {
          "field": null,
          "type": "ACTIONS",
          "sort": null,
          "header": null,
          "editable": false
        }
        
      ],
      sort: ['nombre', 'descripcion', 'fecha_creacion', 'fecha_actualizacion'],
      actions: [
        {
          icon: 'p-button-icon pi pi-pencil',
          class: 'p-button-rounded p-button-warning p-mr-2',
        },
        {
          icon: 'p-button-icon pi pi-eye',
          class: 'p-button-rounded p-button-info',
          onClick: (item) => {
            this.ModalDataPermissions= item.permissions
            this.DisplayModal=true
          },
        },
      ],
    },
  };

  public data = [
    {
      id: 1,
      name: 'Gestor',
      descripcion:'Perfil que gestiona las Cubicaciones y OTs',
      fecha_creacion: "2021-03-01T03:00:00.000Z",
      fecha_actualizacion:"2021-03-28T03:00:00.000Z",
      permissions: [
        {
          permiso_id: 1,
          permiso_slug: 'OT_LIST',
        },
        {
          permiso_id: 2,
          permiso_slug: 'OT_CREATE',
        },
        {
          permiso_id: 3,
          permiso_slug: 'OT_EDIT',
        },
        {
          permiso_id: 6,
          permiso_slug: 'OT_DELETE',
        },
        {
          permiso_id: 7,
          permiso_slug: 'CUBAGE_LIST',
        },
        {
          permiso_id: 8,
          permiso_slug: 'CUBAGE_CREATE',
        },
        {
          permiso_id: 11,
          permiso_slug: 'CUBAGE_EDIT',
        },
      ],
    },
    {
      id: 2,
      name: 'Administrador de contrato',
      descripcion:'Perfil para quien de parte del proveedor asignado gestione el equipo que ejecutará los trabajos',
      fecha_creacion: "2021-03-01T03:00:00.000Z",
      fecha_actualizacion:"2021-03-28T03:00:00.000Z",
      permissions: [
        {
          permiso_id: 1,
          permiso_slug: 'OT_LIST',
        },
        {
          permiso_id: 3,
          permiso_slug: 'OT_ACCEPT',
        },
        {
          permiso_id: 4,
          permiso_slug: 'OT_REJECT',
        },
      ],
    },
  ];

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private profileFacade: ProfileFacade,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.authFacade.getLogin$()
      .pipe(takeUntil(this.destroyInstance))
      .subscribe(authLogin => {
        if (authLogin) {
          this.profileFacade.getProfile({ token: authLogin.token});
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }
}
