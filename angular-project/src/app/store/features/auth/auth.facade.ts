import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as authActions from './auth.actions';
import * as authSelectors from './auth.selectors';
import { SessionData, RequestLogin, Perfil, PerfilesUser } from '@data';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(private store: Store<SessionData>) {}

  public reset(): void {
    this.store.dispatch(authActions.reset());
  }

  public postLogin(login: RequestLogin): void {
    this.store.dispatch(authActions.login({ login }));
  }

  public getPerfilesUser(): void {
    this.store.dispatch(authActions.getPerfilesUser());
  }

  public getLogin$(): Observable<SessionData> {
    return this.store.select(authSelectors.getLogin);
  }

  public getCurrentProfile$(): Observable<Perfil> {
    return this.store.select(authSelectors.getCurrentProfile);
  }

  public pefilesUsuario$(): Observable<PerfilesUser[]> {
    return this.store.select(authSelectors.getPerfilesUser);
  }
}
