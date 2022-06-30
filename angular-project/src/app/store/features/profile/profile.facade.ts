import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as profileActions from './profile.actions';
import * as profileSelectors from './profile.selectors';
import {
  Perfil,
  Permiso,
  PermisoRol,
  PermisosPerfil,
  RequestCreatePerfil,
  RequestUpdatePerfil,
  Rol,
  RolWithPermisos,
} from '@data';

@Injectable({
  providedIn: 'root',
})
export class ProfileFacade {
  constructor(private store: Store<Perfil>) {}

  // PROFILE
  public getProfile(): void {
    this.store.dispatch(profileActions.getAllProfile());
  }

  public getProfile$(): Observable<Perfil[]> {
    return this.store.select(profileSelectors.getProfiles);
  }

  // PERMISOS PERFIL
  public getPermisosPerfil(perfil_id: number): void {
    this.store.dispatch(profileActions.getPermisosPerfil({ perfil_id }));
  }

  public getPermisosPerfil$(): Observable<PermisosPerfil[]> {
    return this.store.select(profileSelectors.getPermisosPerfil);
  }

  // ELIMINAR PERFIL
  public eliminarPerfil(perfil_id: number): void {
    this.store.dispatch(profileActions.eliminarPerfil({ perfil_id }));
  }

  // MODAL PERMISOS PERFIL
  public modalPermisosPerfil(status: boolean): void {
    this.store.dispatch(profileActions.modalPermisosPerfil({ status }));
  }

  public modalPermisosPerfil$(): Observable<boolean> {
    return this.store.select(profileSelectors.modalPermisosPerfil);
  }

  // GET ALL ROLES 4 CREATE EDIT PERFIL
  public getAllRoles4createEditPerfil(): void {
    this.store.dispatch(profileActions.getAllRoles4CreateEditPerfil());
  }

  public getAllRoles4createEditPerfil$(): Observable<Rol[]> {
    return this.store.select(profileSelectors.AllRoles4createEditPerfil);
  }

  // GET PERMISOS ROL 4 CREATE EDIT PERFIL
  public getPermisosRol4CreateEdit(rol_id: number): void {
    this.store.dispatch(
      profileActions.getPermisosRol4CreateEditPerfil({ rol_id })
    );
  }

  public getPermisosRol4CreateEdit$(): Observable<PermisoRol[]> {
    return this.store.select(profileSelectors.PermisosRol4createEditPerfil);
  }

  // CREATE PERFIL
  public createPerfil(request: RequestCreatePerfil): void {
    this.store.dispatch(profileActions.createPerfil({ request }));
  }

  // EDIT PERFIL
  public updatePerfil(request: RequestUpdatePerfil): void {
    this.store.dispatch(profileActions.updatePerfil({ request }));
  }

  public resetData(): void {
    this.store.dispatch(profileActions.resetData());
  }
}
