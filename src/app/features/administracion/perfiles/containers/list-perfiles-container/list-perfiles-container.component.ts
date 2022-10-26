import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PerfilFacade } from '@storeOT/perfil/perfil.facades';
import * as _ from 'lodash';
import {
  ListarPerfil,
  Perfil,
  Permiso,
  PermisosPerfil,
  PermissionsGroup,
} from '@model';
//// import { ListProTableService } from './list-pro-table.service';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';

@Component({
  selector: 'zwc-list-perfiles-container',
  templateUrl: './list-perfiles-container.component.html',
  styleUrls: ['./list-perfiles-container.component.scss'],
})
export class ListPerfilesContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  // DATOS A USAR
  perfiles$: Observable<ListarPerfil[]> = this.profileFacade.getProfile$().pipe(
    map(perfiles =>
      perfiles?.map(perfil => ({
        ...perfil,
        rol: perfil.model_rol_id.nombre,
        estado: true,
      }))
    )
  );

  PermisosPerfil$: Observable<PermissionsGroup[]> = this.profileFacade
    .getPermisosPerfil$()
    .pipe(map(perfiles => this.getPermissionsGroup(perfiles)));

  // LOADINGS
  loadingGetPerfiles$: Observable<boolean> =
    this.loadingFacade.sendingGetPerfiles$();

  // DISPLAY MODALS
  DisplayPermisosPerfilModal = false;
  displayModalEliminarPerfil = false;

  // EXTRAS
  perfil_id: number | null = null;

  // ICONS
  permisosIcon = faEye;
  editIcon = faPencil;
  trashICon = faTrash;

  // CONSTRUCTOR
  constructor(
    private profileFacade: PerfilFacade,
    private loadingFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    this.profileFacade.resetData();
    this.profileFacade.getProfile();
  }

  closeModalPermisosPerfil(): void {
    this.profileFacade.resetPermisosPerfil();
    this.DisplayPermisosPerfilModal = false;
  }

  closeModalEliminarPerfil(): void {
    this.displayModalEliminarPerfil = false;
    this.perfil_id = null;
  }

  EliminarPerfil(): void {
    if (this.perfil_id) {
      this.profileFacade.eliminarPerfil(this.perfil_id);
      this.closeModalEliminarPerfil();
      setTimeout(() => {
        this.profileFacade.getProfile();
      }, 700);
    }
  }

  getPermissionsGroup(permissions: PermisosPerfil[]): PermissionsGroup[] {
    const data = permissions?.map(permit => {
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

  verPermisos(perfil: ListarPerfil): void {
    this.DisplayPermisosPerfilModal = true;
    this.profileFacade.getPermisosPerfil(perfil.id);
  }

  eliminar(perfil: ListarPerfil): void {
    this.displayModalEliminarPerfil = true;
    this.perfil_id = perfil.id;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
