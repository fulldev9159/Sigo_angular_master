import { Injectable } from '@angular/core';
import {
  PerfilesUsuario,
  Response,
  Perfil,
  Permiso,
  PermisoRol,
  PermisosPerfil,
  RequestCreatePerfil,
  RequestUpdatePerfil,
  Rol,
} from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as perfilSelectors from './perfil.selectors';
import * as perfilActions from './perfil.actions';

@Injectable({
  providedIn: 'root',
})
export class PerfilFacade {
  constructor(private store: Store<any>) {}

  // GET PERFILES USUARIO
  public getPerfilesUsuario(usuario_id: number): void {
    this.store.dispatch(perfilActions.getPerfilesUsuario({ usuario_id }));
  }

  public getPerfilesUsuarioSuccess(
    response: Response<{ perfiles: PerfilesUsuario[] }>
  ): void {
    this.store.dispatch(perfilActions.getPerfilesUsuarioSuccess({ response }));
  }

  public getPerfilesUsuarioError(error: any) {
    this.store.dispatch(perfilActions.getPerfilesUsuarioError({ error }));
  }

  public getPerfilesUsuario$(): Observable<PerfilesUsuario[]> {
    return this.store.select(perfilSelectors.getPerfilesUsuario);
  }

  // GET PERMISOS PERFIL USUARIO
  // public getPermisosPerfilUsuario(): void {
  //   this.store.dispatch(perfilActions.getPermisosPerfilUsuario());
  // }

  // PROFILE
  public getProfile(): void {
    this.store.dispatch(perfilActions.getAllProfile());
  }

  public getProfile$(): Observable<Perfil[]> {
    return this.store.select(perfilSelectors.getProfiles);
  }

  // PERMISOS PERFIL
  public getPermisosPerfil(perfil_id: number): void {
    this.store.dispatch(perfilActions.getPermisosPerfil({ perfil_id }));
  }

  public getPermisosPerfil$(): Observable<PermisosPerfil[]> {
    return this.store.select(perfilSelectors.getPermisosPerfil);
  }

  // ELIMINAR PERFIL
  public eliminarPerfil(perfil_id: number): void {
    this.store.dispatch(perfilActions.eliminarPerfil({ perfil_id }));
  }

  // MODAL PERMISOS PERFIL
  public modalPermisosPerfil(status: boolean): void {
    this.store.dispatch(perfilActions.modalPermisosPerfil({ status }));
  }

  public modalPermisosPerfil$(): Observable<boolean> {
    return this.store.select(perfilSelectors.modalPermisosPerfil);
  }

  // GET ALL ROLES 4 CREATE EDIT PERFIL
  public getAllRoles4createEditPerfil(): void {
    this.store.dispatch(perfilActions.getAllRoles4CreateEditPerfil());
  }

  public getAllRoles4createEditPerfil$(): Observable<Rol[]> {
    return this.store.select(perfilSelectors.AllRoles4createEditPerfil);
  }

  // GET PERMISOS ROL 4 CREATE EDIT PERFIL
  public getPermisosRol4CreateEdit(rol_id: number): void {
    this.store.dispatch(
      perfilActions.getPermisosRol4CreateEditPerfil({ rol_id })
    );
  }

  public getPermisosRol4CreateEdit$(): Observable<PermisoRol[]> {
    return this.store.select(perfilSelectors.PermisosRol4createEditPerfil);
  }

  // CREATE PERFIL
  public createPerfil(request: RequestCreatePerfil): void {
    this.store.dispatch(perfilActions.createPerfil({ request }));
  }

  // EDIT PERFIL
  public updatePerfil(request: RequestUpdatePerfil): void {
    this.store.dispatch(perfilActions.updatePerfil({ request }));
  }

  public resetData(): void {
    this.store.dispatch(perfilActions.resetData());
  }

  public resetPermisosPerfil(): void {
    this.store.dispatch(perfilActions.resetPermisosPerfil());
  }
}
