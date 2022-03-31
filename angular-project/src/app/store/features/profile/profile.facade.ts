import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as profileActions from './profile.actions';
import * as profileSelectors from './profile.selectors';
import { Perfil, Permiso, PermisosPerfil, Roles, RolWithPermisos } from '@data';

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

  public getAllRoles4createEditPerfil$(): Observable<Roles[]> {
    return this.store.select(profileSelectors.AllRoles4createEditPerfil);
  }

  ///
  public getProfileSelected(perfil_id: number): void {
    this.store.dispatch(profileActions.getProfileSelected({ perfil_id }));
  }

  // public getProfileSelected$(): Observable<Data.Perfil> {
  //   return this.store.select(profileSelectors.getProfileSelected);
  // }

  // // PERMISSIONS
  // public getPermissions(): void {
  //   this.store.dispatch(profileActions.getPermissions());
  // }

  // public getPermissions$(): Observable<Data.Permiso[]> {
  //   return this.store.select(profileSelectors.getPermissions);
  // }
  // // PERMISSIONS

  // // ROL PERMISSIONS
  // public getRolPermissions(rol_id: number): void {
  //   this.store.dispatch(profileActions.getRolPermisos({ rol_id }));
  // }

  // public getRolPermissions$(): Observable<Permiso[]> {
  //   return this.store.select(profileSelectors.getRolPermissions);
  // }
  // ROL PERMISSIONS

  // DELETE
  public deleteProfile(perfil_id: number): void {
    this.store.dispatch(profileActions.deleteProfile({ perfil_id }));
  }
  // DELETE

  // // CREATE
  // public createPerfil(perfil: Data.CreatePerfilRequest): void {
  //   this.store.dispatch(profileActions.createPerfil({ perfil }));
  // }
  // // CREATE

  // // EDIT
  // public editProfile(perfil: Data.EditPerfilRequest): void {
  //   this.store.dispatch(profileActions.editProfile({ perfil }));
  // }

  // FORM
  public resetData(): void {
    this.store.dispatch(profileActions.resetData());
  }

  // public getRols(): void {
  //   this.store.dispatch(profileActions.getRols());
  // }

  // public getRols$(): Observable<Data.Rols[]> {
  //   return this.store.select(profileSelectors.getRols);
  // }
  // PROFILE
}
