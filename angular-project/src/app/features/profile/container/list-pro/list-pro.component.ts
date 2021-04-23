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
          sort: 'nombre',
          header: 'nombre',
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
            this.ModalDataPermissions= item.permisos
            this.DisplayModal=true
          },
        },
      ],
    },
  };

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

      this.items$ = this.profileFacade.getProfile$();
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }
}
