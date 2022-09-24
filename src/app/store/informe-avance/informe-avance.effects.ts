import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService, InformeAvanceHttpService } from '@services';
import * as informeAvanceActions from './informe-avance.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class InformeAvanceEffects {
  constructor(
    private actions$: Actions,
    private afterHttp: AfterHttpService,
    private informeAvanceHttp: InformeAvanceHttpService
  ) {}

  // GET DETALLE INFORME DE AVANCE
  getDetalleInformeAvance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(informeAvanceActions.getDetalleInformeAvance),
      concatMap(({ ot_id }) =>
        this.informeAvanceHttp.getDetalleInformeAvance(ot_id).pipe(
          map(response =>
            informeAvanceActions.getDetalleInformeAvanceSuccess({ response })
          ),
          catchError(error =>
            of(informeAvanceActions.getDetalleInformeAvanceError({ error }))
          )
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(informeAvanceActions.getDetalleInformeAvanceSuccess),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(informeAvanceActions.getDetalleInformeAvanceError),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
