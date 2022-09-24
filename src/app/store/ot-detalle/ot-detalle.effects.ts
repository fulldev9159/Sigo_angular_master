import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService } from '@services';
import * as otDetalleActions from './ot-detalle.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OtDetalleHttpService } from 'src/app/core/service/ot-detalle-http.service';

@Injectable()
export class OTDetalleEffects {
  constructor(
    private actions$: Actions,
    private afterHttp: AfterHttpService,
    private otDetalleHttp: OtDetalleHttpService
  ) {}

  // GET DETALLE OT
  getDetalleOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otDetalleActions.getDetalleOT),
      concatMap(({ id }) =>
        this.otDetalleHttp.getDetalleOT(id).pipe(
          map(response => otDetalleActions.getDetalleOTSuccess({ response })),
          catchError(error => of(otDetalleActions.getDetalleOTError({ error })))
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otDetalleActions.getDetalleOTSuccess),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otDetalleActions.getDetalleOTError),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
