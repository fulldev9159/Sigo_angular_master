import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as authActions from './auth.actions';
import * as authSelectors from './auth.selectors';
import { Login, Perfil } from '@data';
import { LoginAuth } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(private store: Store<Login>) {}

  public reset(): void {
    this.store.dispatch(authActions.reset());
  }

  public postLogin(loginAuth: LoginAuth): void {
    this.store.dispatch(authActions.login({ login: loginAuth }));
  }

  public postLoginSuccess(login): void {
    this.store.dispatch(authActions.loginSuccess({ login }));
  }

  public getLogin$(): Observable<Login> {
    return this.store.select(authSelectors.getLogin);
  }

  public getCurrentProfile$(): Observable<Perfil> {
    return this.store.select(authSelectors.getCurrentProfile);
  }
}
