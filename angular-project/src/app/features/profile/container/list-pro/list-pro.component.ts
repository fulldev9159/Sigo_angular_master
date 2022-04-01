import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileFacade } from '@storeOT/features/profile/profile.facade';
import * as _ from 'lodash';
import {
  ListarPerfil,
  Perfil,
  Permiso,
  PermisosPerfil,
  PermissionsGroup,
} from '@data';
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
  PermisosPerfil$: Observable<PermissionsGroup[]>;
  // PermisosPerfil$: Observable<any[]>;

  // DISPLAY MODALS
  DisplayPermisosPerfilModal$: Observable<boolean> = of(false);
  displayModalEliminarPerfil = false;

  // FORMULARIO

  // TABLE
  configTable = null;

  // EXTRAS
  perfil_id = null;

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
            this.router.navigate(['/app/profile/form-pro', item.id]);
          }
        },
      },
      {
        type: 'button-delete-eliminable',
        tooltipDisabled: 'No se puede eliminar',
        onClick: (event: Event, item: ListarPerfil) => {
          if (item) {
            this.displayModalEliminarPerfil = true;
            this.perfil_id = item.id;
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

    this.DisplayPermisosPerfilModal$ =
      this.profileFacade.modalPermisosPerfil$();

    this.PermisosPerfil$ = this.profileFacade.getPermisosPerfil$().pipe(
      map(perfiles => {
        return this.getPermissionsGroup(perfiles);
      })
    );
  }

  onInitAccionesInicialesAdicionales(): void {}

  closeModalPermisosPerfil(): void {
    this.profileFacade.modalPermisosPerfil(false);
  }

  closeModalEliminarPerfil(): void {
    this.displayModalEliminarPerfil = false;
    this.perfil_id = null;
  }

  EliminarPerfil(): void {
    if (this.perfil_id) {
      this.profileFacade.eliminarPerfil(this.perfil_id);
      this.closeModalEliminarPerfil();
      this.profileFacade.getProfile();
    }
  }

  getPermissionsGroup(permissions: PermisosPerfil[]): PermissionsGroup[] {
    const data = permissions.map(permit => {
      let permitCustom: any;
      if (permit && permit.model_permiso_id.slug) {
        permitCustom = {
          ...permit,
          module: permit.model_permiso_id.slug.split('_')[0],
        };
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
