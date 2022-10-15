import { Injectable } from '@angular/core';
import { DatabaseVersion, SessionData } from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as authSelectors from './auth.selectors';
import * as authActions from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(private store: Store<SessionData>) {}

  // SESSION
  public getSessionData$(): Observable<SessionData> {
    return this.store.select(authSelectors.getSessionData);
  }
  public clearSession(): void {
    this.store.dispatch(authActions.ClearSession());
  }

  // LOGIN
  public Login(username: string, password: string): void {
    this.store.dispatch(authActions.login({ username, password }));
  }
  public isLoggin$(): Observable<boolean> {
    return this.store.select(authSelectors.isLoggin);
  }

  // LOGOUT
  public Logout(): void {
    this.store.dispatch(authActions.ClearSession());
    this.store.dispatch(authActions.Logout());
  }

  // REFRESH LOGIN
  public refreshLogin(
    proxy_id: number,
    nombre_perfil: string,
    rol: string
  ): void {
    this.store.dispatch(
      authActions.refreshLogin({ proxy_id, nombre_perfil, rol })
    );
  }

  // GET PERMISOS PERFIL USUARIO 4 LOGIN
  public getPermisosPerfilUsuario4Login(): void {
    this.store.dispatch(authActions.getPermisosPerfilUsuario4Login());
  }

  // SHOW MENU DETALLE OT
  public showMenuDetalleOT(status: boolean): void {
    this.store.dispatch(authActions.showMenuDetalleOT({ status }));
  }
  public showMenuDetalleOT$(): Observable<boolean> {
    return this.store.select(authSelectors.showMenuDetalleOT);
  }

  // RESET PERFIL
  public resetPerfil(): void {
    this.store.dispatch(authActions.resetPerfil());
  }

  // GET DATABASE VERSION
  public getDatabaseVersion(): void {
    this.store.dispatch(authActions.getDatabaseVersion());
  }

  public getDatabaseVersion$(): Observable<DatabaseVersion> {
    return this.store.select(authSelectors.getDatabaseVersion);
  }

  // GET API VERSION
  public getAPIVersion(): void {
    this.store.dispatch(authActions.getAPIVersion());
  }

  public getAPIVersion$(): Observable<string> {
    return this.store.select(authSelectors.getAPIVersion);
  }
}
