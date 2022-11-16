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
    private authHttpService: AuthHttpService,
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

  // TWO FACTOR AUTHENTICATION
  Login2FA$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login2FA),
      concatMap(({ code }) =>
        this.loginService.logIn2FA(code).pipe(
          map(response => authActions.login2FASuccess()),
          catchError(error => of(authActions.login2FAError({ error })))
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

  getDatabaseVersion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getDatabaseVersion),
      concatMap(() =>
        this.authHttpService.getDatabaseVersion().pipe(
          map(response => authActions.getDatabaseVersionSuccess({ response })),
          catchError(error =>
            of(authActions.getDatabaseVersionError({ error }))
          )
        )
      )
    )
  );

  getAPIVersion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getAPIVersion),
      concatMap(() =>
        this.authHttpService.getAPIVersion().pipe(
          map(response => authActions.getAPIVersionSuccess({ response })),
          catchError(error => {
            return of(authActions.getAPIVersionError({ error }));
          })
        )
      )
    )
  );

  getNotificaciones$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getNotificaciones,
        authActions.marcarNotificacionesSuccess),
      concatMap(() =>
        this.authHttpService.getNotificaciones().pipe(
          map(response => authActions.getNotificacionesSuccess({ response })),
          catchError(error => {
            return of(authActions.getNotificacionesError({ error }));
          })
        )
      )
    )
  );

  marcarNotificaciones$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.marcarNotificaciones),
      concatMap(({ id }) =>
        this.authHttpService.marcarNotificaciones(id).pipe(
          map(response =>
            authActions.marcarNotificacionesSuccess({ response })
          ),
          catchError(error => {
            return of(authActions.marcarNotificacionesError({ error }));
          })
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          authActions.loginSuccess,
          authActions.login2FASuccess,
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
          authActions.login2FAError,
          authActions.refreshLoginError,
          authActions.getPermisosPerfilUsuario4LoginError,
          authActions.getDatabaseVersionError,
          authActions.getAPIVersionError,
          authActions.getNotificacionesError,
          authActions.marcarNotificacionesError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
