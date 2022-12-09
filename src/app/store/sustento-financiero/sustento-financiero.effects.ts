import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService, SustentoFinancieroHttpService } from '@services';
import * as otActions from './sustento-financiero.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SustentoFinancieroEffects {
  constructor(
    private actions$: Actions,
    private afterHttp: AfterHttpService,
    private sustentoFinancieroHttpService: SustentoFinancieroHttpService
  ) {}

  getPMO$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getPMO),
      concatMap(({ sitio_codigo }) =>
        this.sustentoFinancieroHttpService.getPMO4OT(sitio_codigo).pipe(
          map(response => otActions.getPMOSuccess({ response })),
          catchError(error => of(otActions.getPmoError({ error })))
        )
      )
    )
  );

  getLineaPresupuestaria$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getLineaPresupuestaria),
      concatMap(({ pmo_id }) =>
        this.sustentoFinancieroHttpService.getLineaPresupuestaria(pmo_id).pipe(
          map(response =>
            otActions.getLineaPresupuestariaSuccess({ response })
          ),
          catchError(error =>
            of(otActions.getLineaPresupuestariaError({ error }))
          )
        )
      )
    )
  );

  getPep2$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getPEP2),
      concatMap(({ pmo_codigo, linea_presupuestaria_codigo }) =>
        this.sustentoFinancieroHttpService
          .getPEP2(pmo_codigo, linea_presupuestaria_codigo)
          .pipe(
            map(response => otActions.getPEP2Success({ response })),
            catchError(error => of(otActions.getPEP2Error({ error })))
          )
      )
    )
  );

  getIDOpex$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getIDOpex),
      concatMap(() =>
        this.sustentoFinancieroHttpService.getOPEX().pipe(
          map(response => otActions.getIDOpexSuccess({ response })),
          catchError(error => of(otActions.getIDOpexError({ error })))
        )
      )
    )
  );

  getCuentasSAP$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getCuentaSAP),
      concatMap(({ id_opex }) =>
        this.sustentoFinancieroHttpService.getSAP(id_opex).pipe(
          map(response => otActions.getCuentaSAPSuccess({ response })),
          catchError(error => of(otActions.getCuentaSAPError({ error })))
        )
      )
    )
  );

  getCECO$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getCECO),
      concatMap(({ id_opex, cuenta_sap }) =>
        this.sustentoFinancieroHttpService.getCECO(id_opex, cuenta_sap).pipe(
          map(response => otActions.getCECOSuccess({ response })),
          catchError(error => of(otActions.getCECOError({ error })))
        )
      )
    )
  );

  updateSustentoFinanciero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.updateSustentoFinanciero),
      concatMap(({ ot_id, values }) =>
        this.sustentoFinancieroHttpService
          .updateSustentoFinanciero(ot_id, values)
          .pipe(
            map(response => otActions.updateSustentoFinancieroSuccess()),
            catchError(error =>
              of(otActions.updateSustentoFinancieroError({ error }))
            )
          )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          otActions.getPMOSuccess,
          otActions.getLineaPresupuestariaSuccess,
          otActions.getPEP2Success,
          otActions.getIDOpexSuccess,
          otActions.getCuentaSAPSuccess,
          otActions.getCECOSuccess,
          otActions.updateSustentoFinancieroSuccess
        ),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          otActions.getPmoError,
          otActions.getLineaPresupuestariaError,
          otActions.getPEP2Error,
          otActions.getIDOpexError,
          otActions.getCuentaSAPError,
          otActions.getCECOError,
          otActions.updateSustentoFinancieroError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
