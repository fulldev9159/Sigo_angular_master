import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService, PerfilesHttpService } from '@services';
import * as perfilActions from './perfil.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PerfilEffects {
  constructor(
    private actions$: Actions,
    private perfilesHttpService: PerfilesHttpService,
    private afterHttp: AfterHttpService
  ) {}

  Login$ = createEffect(() =>
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

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(perfilActions.getPerfilesUsuarioSuccess),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(perfilActions.getPerfilesUsuarioError),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
