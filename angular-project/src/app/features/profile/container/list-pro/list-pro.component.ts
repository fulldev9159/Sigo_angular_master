import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileFacade } from '@storeOT/features/profile/profile.facade';
import * as _ from 'lodash';
import { ListarPerfil, Perfil, Permiso, PermissionsGroup } from '@data';
import { ListProTableService } from './list-pro-table.service';

@Component({
  selector: 'app-list-pro',
  templateUrl: './list-pro.component.html',
  styleUrls: ['./list-pro.component.scss'],
})
export class ListProComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  // DATOS A USAR
  perfiles$: Observable<ListarPerfil[]>;

  // DISPLAY MODALS
  DisplayDetallesPerfilModal = false;
  ModalDataPermissions$: Observable<PermissionsGroup[]>;

  // FORMULARIO

  // TABLE
  configTable = null;

  // EXTRAS

  // CONSTRUCTOR
  constructor(
    private router: Router,
    private listProTableService: ListProTableService,
    private profileFacade: ProfileFacade
  ) {}

  ngOnInit(): void {
    this.onInitResetInicial();
    this.onInitGetInitialData();
    this.onInitSetInitialData();
    this.onInitAccionesInicialesAdicionales();

    // this.ModalDataPermissions$ = this.profileFacade
    //   .getProfileSelected$()
    //   .pipe(
    //     map((perfil: Data.Perfil) =>
    //       perfil ? this.getPermissionsGroup(perfil.permisos) : []
    //     )
    //   );
  }

  onInitResetInicial(): void {
    this.profileFacade.resetData();
  }

  onInitGetInitialData(): void {
    this.profileFacade.getProfile();
  }

  onInitSetInitialData(): void {
    this.configTable = this.listProTableService.getTableConfig();
    (this.configTable.body.actions as Array<any>).push(
      {
        type: 'alldisplay',
        label: 'Ver permisos',
        onClick: (event: Event, item: ListarPerfil) => {
          if (item) {
            this.profileFacade.getPermisosPerfil(item.id);
          }
        },
      },
      {
        type: 'alldisplay-eliminable',
        label: 'Editar',
        tooltipDisabled: 'No se puede editar',
        onClick: (event: Event, item: ListarPerfil) => {
          if (item) {
            // this.userFacade.displayModalPerfilesUser(true);
            // this.userFacade.getAllPerfiles();
            // this.userFacade.perfilSelected(item);
          }
        },
      }
    );

    this.perfiles$ = this.profileFacade.getProfile$().pipe(
      map(perfiles =>
        perfiles.map(perfil => ({
          ...perfil,
          rol: perfil.model_rol_id.nombre,
        }))
      )
    );
  }

  onInitAccionesInicialesAdicionales(): void {}

  getPermissionsGroup(permissions: Permiso[]): PermissionsGroup[] {
    const data = permissions.map((permit: Permiso) => {
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
