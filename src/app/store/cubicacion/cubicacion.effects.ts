import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService, CubicacionHttpService } from '@services';
import * as cubicacionActions from './cubicacion.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CubicacionEffects {
  constructor(
    private actions$: Actions,
    private cubicacionHttpService: CubicacionHttpService,
    private afterHttp: AfterHttpService
  ) {}

  getTipoCubicacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.getTipoCubicacion),
      concatMap(() =>
        this.cubicacionHttpService.getTipoCubicacion().pipe(
          map(response =>
            cubicacionActions.getTipoCubicacionSuccess({ response })
          ),
          catchError(error =>
            of(cubicacionActions.getTipoCubicacionError({ error }))
          )
        )
      )
    )
  );

  createCubicacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.createCubicacion),
      concatMap(({ request }) =>
        this.cubicacionHttpService.saveCubicacion(request).pipe(
          map(response =>
            cubicacionActions.createCubicacionSuccess({ response })
          ),
          catchError(error =>
            of(cubicacionActions.createCubicacionError({ error }))
          )
        )
      )
    )
  );

  editCubicacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.editCubicacion),
      concatMap(({ request }) =>
        this.cubicacionHttpService.saveCubicacion(request).pipe(
          map(response =>
            cubicacionActions.editCubicacionSuccess({ response })
          ),
          catchError(error =>
            of(cubicacionActions.editCubicacionError({ error }))
          )
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          cubicacionActions.getTipoCubicacionSuccess,
          cubicacionActions.createCubicacionSuccess,
          cubicacionActions.editCubicacionSuccess
        ),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          cubicacionActions.getTipoCubicacionError,
          cubicacionActions.createCubicacionError,
          cubicacionActions.editCubicacionError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
