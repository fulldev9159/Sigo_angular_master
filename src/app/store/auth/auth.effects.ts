import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AfterHttpService,
  AuthHttpService,
  PerfilesHttpService,
} from '@services';
import * as authActions from './auth.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private loginService: AuthHttpService,
    private perfilesHttpService: PerfilesHttpService,
    private afterHttp: AfterHttpService
  ) {}

  // LOGIIN
  Login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      concatMap(({ username, password }) =>
        this.loginService.logIn(username, password).pipe(
          map(response => authActions.loginSuccess({ response })),
          catchError(error => of(authActions.loginError({ error })))
        )
      )
    )
  );

  // REFRESH LOGIIN
  refreshLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.refreshLogin),
      concatMap(({ proxy_id }) =>
        this.loginService.refeshLogin(proxy_id).pipe(
          map(response => authActions.refreshLoginSuccess({ response })),
          catchError(error => of(authActions.refreshLoginError({ error })))
        )
      )
    )
  );

  // GET PERMISOS PERFIL USER 4 LOGIN
  getPermisosPerfilUsuario4Login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getPermisosPerfilUsuario4Login),
      concatMap(() =>
        this.perfilesHttpService.getPermisosPerfilUsuario().pipe(
          map(response =>
            authActions.getPermisosPerfilUsuario4LoginSuccess({ response })
          ),
          catchError(error =>
            of(authActions.getPermisosPerfilUsuario4LoginError({ error }))
          )
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          authActions.loginSuccess,
          authActions.Logout,
          authActions.refreshLoginSuccess,
          authActions.getPermisosPerfilUsuario4LoginSuccess
        ),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          authActions.loginError,
          authActions.refreshLoginError,
          authActions.getPermisosPerfilUsuario4LoginError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
