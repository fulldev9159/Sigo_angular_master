import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { AfterHttpService, IngenieriaHttpService } from '@services';
import * as ingenieriaActions from './ingenieria.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class IngenieriaEffects {
  constructor(
    private actions$: Actions,
    private afterHttp: AfterHttpService,
    private ingenieriaService: IngenieriaHttpService
  ) {}

  // ENVIAR RESULTADO INGENIERIA
  enviarResultadoIngenieria$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ingenieriaActions.enviarResultadoIngenieria),
      concatMap(({ ot_id }) =>
        this.ingenieriaService.enviarResultadoIngenieria(ot_id).pipe(
          map(response =>
            ingenieriaActions.enviarResultadoIngenieriaSuccess({ response })
          ),
          catchError(error =>
            of(ingenieriaActions.enviarResultadoIngenieriaError({ error }))
          )
        )
      )
    )
  );

  // APROBAR/RECHAZAR INGENIERIA
  aprobarRechazarIngenieria$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ingenieriaActions.aprobarRechazarIngenieria),
      concatMap(({ request }) =>
        this.ingenieriaService.aprobarRechazarIngenieria(request).pipe(
          map(response =>
            ingenieriaActions.aprobarRechazarIngenieriaSuccess({ response })
          ),
          catchError(error =>
            of(ingenieriaActions.aprobarRechazarIngenieriaError({ error }))
          )
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ingenieriaActions.enviarResultadoIngenieriaSuccess,
          ingenieriaActions.aprobarRechazarIngenieriaSuccess
        ),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ingenieriaActions.enviarResultadoIngenieriaError,
          ingenieriaActions.aprobarRechazarIngenieriaError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
