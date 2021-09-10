import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { takeUntil } from 'rxjs/operators';
import { ProfileFacade } from '@storeOT/features/profile/profile.facade';
import * as ModelProfile from '@storeOT/features/profile/profile.model';
import * as _ from 'lodash';
import * as Data from '@data';

@Component({
  selector: 'app-list-pro',
  templateUrl: './list-pro.component.html',
  styleUrls: ['./list-pro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListProComponent implements OnInit, OnDestroy {
  // declarations
  public authLogin = null;
  public DisplayModal = false;
  public ModalDataPermissions: any[] = [];
  public items$: Observable<any[]>;
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
          field: 'Nombre Perfil',
          type: 'TEXT',
          sort: 'nombre',
          header: 'nombre',
          editable: false,
        },
        {
          field: 'Descripción',
          type: 'TEXT',
          sort: 'descripcion',
          header: 'descripcion',
          editable: false,
        },
        {
          field: 'Perfil Superior',
          type: 'TEXT',
          sort: 'superior_nombre',
          header: 'superior_nombre',
          editable: false,
        },
        {
          field: 'Fecha Creación',
          type: 'DATE',
          sort: 'created_at',
          header: 'created_at',
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
      sort: ['nombre', 'descripcion', 'created_at', 'superior'],
      actions: [
        {
          conditionKey: 'eliminable',
          icon: 'p-button-icon pi pi-pencil',
          class: 'p-button-rounded p-button-warning p-mr-2',
          onClick: (event: Event, item) => {
            this.profileFacade.setFormProfile({
              form: {
                id: item.id,
                nombre: item.nombre,
                descripcion: item.descripcion,
                permisos: item.permisos,
                superior: item.superior_id,
              },
            });

            this.router.navigate(['/app/profile/form-pro', item.id]);
          },
        },
        {
          icon: 'p-button-icon pi pi-eye',
          class: 'p-button-rounded p-button-info p-mr-2',
          onClick: (event: Event, item) => {
            const data = item.permisos.map((permit: Data.Permiso) => {
              let permitCustom;
              if (permit && permit.slug) {
                permitCustom = { ...permit, module: permit.slug.split('_')[0] };
              }
              return permitCustom;
            });
            // console.log(_.chain(data).groupBy('module').map((value, key) => ({ module: key, permissions: value })).value())
            this.ModalDataPermissions = _.chain(data)
              .groupBy('module')
              .map((value, key) => ({ module: key, permissions: value }))
              .value();
            this.DisplayModal = true;
          },
        },
        {
          conditionKey: 'eliminable',
          icon: 'p-button-icon pi pi-trash',
          class: 'p-button-rounded p-button-danger',
          tooltip: 'No puede eliminar perfiles con usuarios asignados',
          onClick: (event: Event, item) => {
            if (item.eliminable) {
              this.confirmationService.confirm({
                target: event.target as EventTarget,
                message: `¿Está seguro que desea eliminar este Perfil?`,
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Confirmar',
                rejectLabel: 'Cancelar',
                accept: () => {
                  this.profileFacade.deleteProfile({
                    profileDelete: {
                      perfil_id: +item.id,
                    },
                  });
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Perfil eliminado',
                    detail: 'Eliminación realizada con Éxito!',
                  });
                },
              });
            }
          },
        },
      ],
    },
  };

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private profileFacade: ProfileFacade,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    // traemos contratos des api mediante efectos
    this.authFacade
      .getLogin$()
      .pipe(takeUntil(this.destroyInstance))
      .subscribe(authLogin => {
        if (authLogin) {
          // asignamos datos de usuario autenticado a variable local
          this.authLogin = authLogin;
        }
      });
  }

  ngOnInit(): void {
    this.authFacade
      .getLogin$()
      .pipe(takeUntil(this.destroyInstance))
      .subscribe(authLogin => {
        if (authLogin) {
          this.profileFacade.getProfile();
        }
      });

    this.items$ = this.profileFacade.getProfile$();
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }
}
