import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService, InformeAvanceHttpService } from '@services';
import * as informeAvanceActions from './informe-avance.actions';
import * as serviciosActions from '@storeOT/servicios/servicios.actions';
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

  // SEND DETALLE INFORME DE AVANCE
  SendDetalleInformeAvance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(informeAvanceActions.sendDetalleInformeAvance),
      concatMap(({ ot_id }) =>
        this.informeAvanceHttp.sendDetalleInformeAvance(ot_id).pipe(
          map(response =>
            informeAvanceActions.sendDetalleInformeAvanceSuccess({ response })
          ),
          catchError(error =>
            of(informeAvanceActions.sendDetalleInformeAvanceError({ error }))
          )
        )
      )
    )
  );

  // ACEPTAR INFORME AVANCE
  aceptarRechazarInformeAvance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(informeAvanceActions.AceptarRechazarInformeAvanceOT),
      concatMap(({ request }) =>
        this.informeAvanceHttp.autorizarInformeAvance(request).pipe(
          map(response =>
            informeAvanceActions.AceptarRechazarInformeAvanceOTSuccess({
              response,
            })
          ),
          catchError(error =>
            of(
              informeAvanceActions.AceptarRechazarInformeAvanceOTError({
                error,
              })
            )
          )
        )
      )
    )
  );

  // ACTUALIZAR INFORME DE AVANCE Y ADICIONALES
  actualizarInformeAvanceYAdicionales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(informeAvanceActions.actualizarInformeAvanceYAdicionales),
      concatMap(({ request_informe_avance, request_adicionales }) =>
        this.informeAvanceHttp.updateInformeAvance(request_informe_avance).pipe(
          map(response =>
            serviciosActions.agregarAdicionales({
              request: request_adicionales,
            })
          ),
          catchError(error =>
            of(
              informeAvanceActions.actualizarInformeAvanceYAdicionalesError({
                error,
              })
            )
          )
        )
      )
    )
  );

  actualizarInformeAvance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(informeAvanceActions.actualizarInformeAvance),
      concatMap(({ request_informe_avance }) =>
        this.informeAvanceHttp.updateInformeAvance(request_informe_avance).pipe(
          map(response =>
            informeAvanceActions.actualizarInformeAvanceSuccess({ response })
          ),
          catchError(error =>
            of(
              informeAvanceActions.actualizarInformeAvanceError({
                error,
              })
            )
          )
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          informeAvanceActions.getDetalleInformeAvanceSuccess,
          informeAvanceActions.sendDetalleInformeAvanceSuccess,
          informeAvanceActions.AceptarRechazarInformeAvanceOTSuccess
        ),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          informeAvanceActions.getDetalleInformeAvanceError,
          informeAvanceActions.sendDetalleInformeAvanceError,
          informeAvanceActions.AceptarRechazarInformeAvanceOTError,
          informeAvanceActions.actualizarInformeAvanceYAdicionalesError,
          informeAvanceActions.actualizarInformeAvanceError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
