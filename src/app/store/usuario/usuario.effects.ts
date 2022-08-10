import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService, UsuarioHttpService } from '@services';
import * as usuarioActions from './usuario.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private usuarioHttpService: UsuarioHttpService,
    private afterHttp: AfterHttpService
  ) {}

  getContratosUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.getContratosUsuario),
      concatMap(({ usuario_id }) =>
        this.usuarioHttpService.getContratosUsuario(usuario_id).pipe(
          map(response =>
            usuarioActions.getContratosUsuarioSuccess({ response })
          ),
          catchError(error =>
            of(usuarioActions.getContratosUsuarioError({ error }))
          )
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(usuarioActions.getContratosUsuarioSuccess),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(usuarioActions.getContratosUsuarioError),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
