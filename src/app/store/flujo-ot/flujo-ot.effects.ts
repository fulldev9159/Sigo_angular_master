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

  rechazarOTProveedor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flujoOTActions.rechazarOTProveedor),
      concatMap(({ request }) =>
        this.flujoOTServiceHttp.aceptarRechazarOTProveedor(request).pipe(
          map(response =>
            flujoOTActions.rechazarOTProveedorSuccess({ response })
          ),
          catchError(error =>
            of(flujoOTActions.rechazarOTProveedorError({ error }))
          )
        )
      )
    )
  );

  anularOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flujoOTActions.anularOT),
      concatMap(({ ot_id }) =>
        this.flujoOTServiceHttp.anularOT(ot_id).pipe(
          map(response => flujoOTActions.anularOTSuccess({ response })),
          catchError(error => of(flujoOTActions.anularOTError({ error })))
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

  // APROBAR RECHAZAR ACTA
  aprobarRechazarOperaciones$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flujoOTActions.aprobarRechazarOperaciones),
      concatMap(({ request }) =>
        this.flujoOTServiceHttp.aceptarRechazarOperaciones(request).pipe(
          map(response =>
            flujoOTActions.aprobarRechazarOperacionesSuccess({ response })
          ),
          catchError(error =>
            of(flujoOTActions.aprobarRechazarOperacionesError({ error }))
          )
        )
      )
    )
  );

  // GET ALL MOTIVO RECHAZO
  getAllMotivoRechazoOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flujoOTActions.getAllMotivoRechazoOT),
      concatMap(({ tipo }) =>
        this.flujoOTServiceHttp.getAllMotivoRechazoOT(tipo).pipe(
          map(response =>
            flujoOTActions.getAllMotivoRechazoOTSuccess({
              motivo_rechazo: response.data.items,
            })
          ),
          catchError(error =>
            of(flujoOTActions.getAllMotivoRechazoOTError({ error }))
          )
        )
      )
    )
  );

  // CONFIRMAR RECHAZO OBRAS
  confirmarRechazoObras$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flujoOTActions.confirmarRechazoObras),
      concatMap(({ ot_id }) =>
        this.flujoOTServiceHttp.confirmarRechazoObras(ot_id).pipe(
          map(response =>
            flujoOTActions.confirmarRechazoObrasSuccess({ response })
          ),
          catchError(error =>
            of(flujoOTActions.confirmarRechazoObrasError({ error }))
          )
        )
      )
    )
  );

  // CERRAR OT
  cerrarOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flujoOTActions.cerrarOT),
      concatMap(({ ot_id }) =>
        this.flujoOTServiceHttp.cerrarOT(ot_id).pipe(
          map(response => flujoOTActions.cerrarOTSuccess({ response })),
          catchError(error => of(flujoOTActions.cerrarOTError({ error })))
        )
      )
    )
  );

  // GET SOLICITAR QUIEBRE OT
  getSolicitudQuiebre$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flujoOTActions.getSolicitudQuiebre),
      concatMap(({ ot_id }) =>
        this.flujoOTServiceHttp.getSolicitudQuiebre(ot_id).pipe(
          map(response =>
            flujoOTActions.getSolicitudQuiebreSuccess({
              lastSolicitudQuiebre: response.data,
            })
          ),
          catchError(error =>
            of(flujoOTActions.getSolicitudQuiebreError({ error }))
          )
        )
      )
    )
  );

  // SOLICITAR QUIEBRE OT
  solicitarQuiebre$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flujoOTActions.solicitarQuiebre),
      concatMap(({ request }) =>
        this.flujoOTServiceHttp.solicitarQuiebre(request).pipe(
          map(response => flujoOTActions.solicitarQuiebreSuccess({ response })),
          catchError(error =>
            of(flujoOTActions.solicitarQuiebreError({ error }))
          )
        )
      )
    )
  );

  // QUIEBRE OT
  quiebre$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flujoOTActions.quiebre),
      concatMap(({ request }) =>
        this.flujoOTServiceHttp.quiebre(request).pipe(
          map(response => flujoOTActions.quiebreSuccess({ response })),
          catchError(error => of(flujoOTActions.quiebreError({ error })))
        )
      )
    )
  );

  // APROBAR/RECHAZAR QUIEBRE OT
  aprobarRechazarSolicitudQuiebre$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flujoOTActions.aprobarRechazarSolicitudQuiebre),
      concatMap(({ request }) =>
        this.flujoOTServiceHttp.aprobarRechazarSolicitudQuiebre(request).pipe(
          map(response =>
            flujoOTActions.aprobarRechazarSolicitudQuiebreSuccess({ response })
          ),
          catchError(error =>
            of(flujoOTActions.aprobarRechazarSolicitudQuiebreError({ error }))
          )
        )
      )
    )
  );

  // DESQUIEBRE OT
  desquiebre$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flujoOTActions.desquiebre),
      concatMap(({ ot_id }) =>
        this.flujoOTServiceHttp.desquiebre(ot_id).pipe(
          map(response => flujoOTActions.desquiebreSuccess({ response })),
          catchError(error => of(flujoOTActions.desquiebreError({ error })))
        )
      )
    )
  );

  // CIERRE ADMINISTRATIVO OT
  cierreAdministrativo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flujoOTActions.cierreAdministrativo),
      concatMap(({ request }) =>
        this.flujoOTServiceHttp.cierreAdministrativo(request).pipe(
          map(response =>
            flujoOTActions.cierreAdministrativoSuccess({ response })
          ),
          catchError(error =>
            of(flujoOTActions.cierreAdministrativoError({ error }))
          )
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
          flujoOTActions.solicitarPagoSuccess,
          flujoOTActions.aprobarRechazarOperacionesSuccess,
          flujoOTActions.confirmarRechazoObrasSuccess,
          flujoOTActions.cerrarOTSuccess,
          flujoOTActions.anularOTSuccess,
          flujoOTActions.rechazarOTProveedorSuccess,
          flujoOTActions.solicitarQuiebreSuccess,
          flujoOTActions.desquiebreSuccess,
          flujoOTActions.cierreAdministrativoSuccess,
          flujoOTActions.aprobarRechazarSolicitudQuiebreSuccess
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
          flujoOTActions.solicitarPagoError,
          flujoOTActions.aprobarRechazarOperacionesError,
          flujoOTActions.getAllMotivoRechazoOTError,
          flujoOTActions.confirmarRechazoObrasError,
          flujoOTActions.cerrarOTError,
          flujoOTActions.anularOTError,
          flujoOTActions.rechazarOTProveedorError,
          flujoOTActions.solicitarQuiebreError,
          flujoOTActions.desquiebreError,
          flujoOTActions.cierreAdministrativoError,
          flujoOTActions.getSolicitudQuiebreError,
          flujoOTActions.aprobarRechazarSolicitudQuiebreError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
