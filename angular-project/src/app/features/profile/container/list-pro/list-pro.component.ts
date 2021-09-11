import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileFacade } from '@storeOT/features/profile/profile.facade';
import * as _ from 'lodash';
import * as Data from '@data';

@Component({
  selector: 'app-list-pro',
  templateUrl: './list-pro.component.html',
  styleUrls: ['./list-pro.component.scss'],
})
export class ListProComponent implements OnInit, OnDestroy {
  DisplayDetallesPerfilModal = false;
  ModalDataPermissions$: Observable<Data.PermissionsGroup[]>;
  perfiles$: Observable<Data.Perfil[]>;

  configTable = {
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
          width: '41%',
        },
        // {
        //   field: 'Perfil Superior',
        //   type: 'TEXT',
        //   sort: 'superior_nombre',
        //   header: 'superior_nombre',
        //   editable: false,
        // },
        {
          field: 'Fecha Creación',
          type: 'DATE',
          sort: 'created_at',
          header: 'created_at',
          editable: false,
          width: '10%',
        },
        {
          field: null,
          type: 'ACTIONS',
          sort: null,
          header: null,
          editable: false,
          width: '10%',
        },
      ],
      sort: ['nombre', 'descripcion', 'created_at', 'superior'],
      actions: [
        {
          conditionKey: 'eliminable',
          icon: ' pi pi-pencil',
          class: 'p-button-text p-button-sm',
          onClick: (event: Event, item: Data.Perfil) => {
            this.router.navigate(['/app/profile/form-pro', item.id]);
          },
        },
        {
          icon: 'pi pi-eye',
          class: 'p-button-text p-button-sm',
          onClick: (event: Event, item: Data.Perfil) => {
            this.profileFacade.getProfileSelected(item.id);
          },
        },
        {
          conditionKey: 'eliminable',
          icon: 'pi pi-trash',
          class: 'p-button-text p-button-danger p-button-sm',
          tooltip: 'No puede eliminar perfiles con usuarios asignados',
          onClick: (event: Event, item: Data.Perfil) => {
            if (item.eliminable) {
              this.confirmationService.confirm({
                target: event.target as EventTarget,
                message: `¿Está seguro que desea eliminar este Perfil?`,
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Confirmar',
                rejectLabel: 'Cancelar',
                accept: () => {
                  this.profileFacade.deleteProfile(item.id);
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
    private profileFacade: ProfileFacade,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.profileFacade.getProfile();
    this.perfiles$ = this.profileFacade.getProfile$();
    this.ModalDataPermissions$ = this.profileFacade
      .getProfileSelected$()
      .pipe(
        map((perfil: Data.Perfil) =>
          perfil ? this.getPermissionsGroup(perfil.permisos) : []
        )
      );
  }

  getPermissionsGroup(permissions: Data.Permiso[]): Data.PermissionsGroup[] {
    const data = permissions.map((permit: Data.Permiso) => {
      let permitCustom: any;
      if (permit && permit.slug) {
        permitCustom = { ...permit, module: permit.slug.split('_')[0] };
      }
      return permitCustom;
    });
    return _.chain(data)
      .groupBy('module')
      .map((value, key) => ({ module: key, permissions: value }))
      .value();
  }

  ngOnDestroy(): void {}
}
