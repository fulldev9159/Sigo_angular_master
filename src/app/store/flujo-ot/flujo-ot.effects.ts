import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService } from '@services';
import * as flujoOTActions from './flujo-ot.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FlujoOtHttpService } from 'src/app/core/service/flujo-ot-http.service';

@Injectable()
export class FlujoOTEffects {
  constructor(
    private actions$: Actions,
    private afterHttp: AfterHttpService,
    private flujoOTServiceHttp: FlujoOtHttpService
  ) {}

  // ACEPTAR O RECHAZAR INCIAL
  AceptarRechazarIncialOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flujoOTActions.aceptarRechazarIncialOT),
      concatMap(({ request }) =>
        this.flujoOTServiceHttp.aceptarRechazarIncialOT(request).pipe(
          map(response =>
            flujoOTActions.aceptarRechazarIncialOTSuccess({ response })
          ),
          catchError(error =>
            of(flujoOTActions.aceptarRechazarIncialOTError({ error }))
          )
        )
      )
    )
  );

  // GET POSIBLE SUPERVISOR DE TRABAJOS
  getPosibleSupervisorDeTrabajos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flujoOTActions.getPosibleSupervisorDeTrabajos),
      concatMap(({ ot_id }) =>
        this.flujoOTServiceHttp.getPosibleSupervisorDeTrabajos(ot_id).pipe(
          map(response =>
            flujoOTActions.getPosibleSupervisorDeTrabajosSuccess({ response })
          ),
          catchError(error =>
            of(flujoOTActions.getPosibleSupervisorDeTrabajosError({ error }))
          )
        )
      )
    )
  );

  // ACEPTAR OT PROVEEDOR Y ASIGNAR SUPERVISOR DE TRABAJOS
  aceptarOTProveedor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flujoOTActions.aceptarOTProveedor),
      concatMap(({ request_aceptacion, ot_id, proxy_id, concepto }) =>
        this.flujoOTServiceHttp
          .aceptarRechazarOTProveedor(request_aceptacion)
          .pipe(
            map(response =>
              flujoOTActions.asignarSupervisorTrabajo({
                ot_id,
                proxy_id,
                concepto,
              })
            ),
            catchError(error =>
              of(flujoOTActions.aceptarOTProveedorError({ error }))
            )
          )
      )
    )
  );

  asignarSupervisorTrabajo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flujoOTActions.asignarSupervisorTrabajo),
      concatMap(({ ot_id, proxy_id, concepto }) =>
        this.flujoOTServiceHttp
          .updateUsuarioInvolucrado(ot_id, proxy_id, concepto)
          .pipe(
            map(response =>
              flujoOTActions.asignarSupervisorTrabajoSuccess({ response })
            ),
            catchError(error =>
              of(flujoOTActions.asignarSupervisorTrabajoError({ error }))
            )
          )
      )
    )
  );

  // SOLICITAR PAGO
  solicitarPago$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flujoOTActions.solicitarPago),
      concatMap(({ ot_id }) =>
        this.flujoOTServiceHttp.solicitarPago(ot_id).pipe(
          map(response => flujoOTActions.solicitarPagoSuccess({ response })),
          catchError(error => of(flujoOTActions.solicitarPagoError({ error })))
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          flujoOTActions.aceptarRechazarIncialOTSuccess,
          flujoOTActions.getPosibleSupervisorDeTrabajosSuccess,
          flujoOTActions.asignarSupervisorTrabajoSuccess,
          flujoOTActions.solicitarPagoSuccess
        ),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          flujoOTActions.aceptarRechazarIncialOTError,
          flujoOTActions.getPosibleSupervisorDeTrabajosError,
          flujoOTActions.aceptarOTProveedorError,
          flujoOTActions.asignarSupervisorTrabajoError,
          flujoOTActions.solicitarPagoError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
