import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService, PerfilesHttpService } from '@services';
import * as perfilActions from './cubicacion.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PerfilEffects {
  constructor(
    private actions$: Actions,
    private perfilesHttpService: PerfilesHttpService,
    private afterHttp: AfterHttpService
  ) {}

  getPerfilesUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(perfilActions.getPerfilesUsuario),
      concatMap(({ usuario_id }) =>
        this.perfilesHttpService.getPerfilesUsuario(usuario_id).pipe(
          map(response =>
            perfilActions.getPerfilesUsuarioSuccess({ response })
          ),
          catchError(error =>
            of(perfilActions.getPerfilesUsuarioError({ error }))
          )
        )
      )
    )
  );

  // getPermisosPerfilUsuario$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(perfilActions.getPermisosPerfilUsuario),
  //     concatMap(() =>
  //       this.perfilesHttpService.getPermisosPerfilUsuario().pipe(
  //         map(response =>
  //           perfilActions.getPermisosPerfilUsuarioSuccess({ response })
  //         ),
  //         catchError(error =>
  //           of(perfilActions.getPermisosPerfilUsuarioError({ error }))
  //         )
  //       )
  //     )
  //   )
  // );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          perfilActions.getPerfilesUsuarioSuccess
          // perfilActions.getPermisosPerfilUsuarioSuccess
        ),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          perfilActions.getPerfilesUsuarioError
          // perfilActions.getPermisosPerfilUsuarioError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
