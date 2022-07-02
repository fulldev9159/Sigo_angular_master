import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as authActions from './auth.actions';
import { AuthService, AlertMessageActions } from '@data';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private alertMessageAction: AlertMessageActions
  ) {}

  postLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      concatMap(({ login }) =>
        this.authService.login(login).pipe(
          map(response => authActions.loginSuccess({ response })),
          catchError(error => of(authActions.loginError({ error })))
        )
      )
    )
  );

  getPerfil$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getPerfilesUser),
      concatMap(({ usuario_id }) =>
        this.authService.getPerfilesUser(usuario_id).pipe(
          map(response => authActions.getPerfilesUserSuccess({ response })),
          catchError(error => of(authActions.getPerfilesUserError({ error })))
        )
      )
    )
  );

  setPerfilSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.setPerfilSelected),
      concatMap(({ proxy_id, nombre_perfil_select }) =>
        this.authService.refesh(proxy_id).pipe(
          map(response =>
            authActions.setPerfilSelectedSuccess({
              proxy_id,
              nombre_perfil_select,
              response,
            })
          ),
          catchError(error => of(authActions.setPerfilSelectedError({ error })))
        )
      )
    )
  );

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.refresh),
      concatMap(({ proxy_id }) =>
        this.authService.refesh(proxy_id).pipe(
          map(response =>
            authActions.refreshSuccess({
              proxy_id,
              response,
            })
          ),
          catchError(error => of(authActions.refreshUserError({ error })))
        )
      )
    )
  );

  getPermisosPefil$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getPerrmisoPerfil),
      concatMap(() =>
        this.authService.getPermisosPerfil().pipe(
          map(response => authActions.getPerrmisoPerfilSuccess({ response })),
          catchError(error =>
            of(authActions.getPerrmisoPerfilUserError({ error }))
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
          authActions.setPerfilSelectedSuccess,
          authActions.getPerrmisoPerfilSuccess
        ),
        tap(action => {
          this.alertMessageAction.messageActions(
            action.response.status.code,
            action.response.status.desc,
            action.type,
            action
          );
        })
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginError, authActions.getPerfilesUserError),
        tap(action =>
          this.alertMessageAction.messageActions(
            action.error.error.status.code,
            action.error.error.status.desc,
            action.type,
            action
          )
        )
      ),
    { dispatch: false }
  );
}
