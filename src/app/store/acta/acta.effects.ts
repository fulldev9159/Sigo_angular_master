import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActaHttpService, AfterHttpService } from '@services';
import * as actaActions from './acta.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ActaEffects {
  constructor(
    private actions$: Actions,
    private afterHttp: AfterHttpService,
    private actaHttp: ActaHttpService
  ) {}

  // GET DETALLE SERVICIO PARA GENERAR ACTA
  $getServicios4Acta = createEffect(() =>
    this.actions$.pipe(
      ofType(actaActions.getServicios4Acta),
      concatMap(({ ot_id }) =>
        this.actaHttp.getServicios4Acta(ot_id).pipe(
          map(response => actaActions.getServicios4ActaSuccess({ response })),
          catchError(error => of(actaActions.getServicios4ActaError({ error })))
        )
      )
    )
  );

  // GET DETALLE UO PARA GENERAR ACTA
  $getUOs4Acta = createEffect(() =>
    this.actions$.pipe(
      ofType(actaActions.getUOs4Acta),
      concatMap(({ ot_id }) =>
        this.actaHttp.getUOs4Acta(ot_id).pipe(
          map(response => actaActions.getUOs4ActaSuccess({ response })),
          catchError(error => of(actaActions.getUOs4ActaError({ error })))
        )
      )
    )
  );
  // ENVIAR INFORME TRABAJOS FINALIZADOS ALIAS: GENERAR ACTA
  informarTrabajosFinalizados$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actaActions.informarTrabajosFinalizados),
      concatMap(({ ot_id, observacion }) =>
        this.actaHttp.informarTrabajosFinalizados(ot_id, observacion).pipe(
          map(response =>
            actaActions.informarTrabajosFinalizadosSuccess({ response })
          ),
          catchError(err =>
            of(actaActions.informarTrabajosFinalizadosError({ error: err }))
          )
        )
      )
    )
  );

  // TODOCOMENT: REVISAR BIEN ESTÁ LOGICA DE AGRUPACION
  // APROBAR RECHAZAR ADICIONALES Y VALIDAR ACTA
  aceptarRechazarAdicionales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actaActions.aceptarRechazarAdcionalesValidarActa),
      concatMap(({ requestValidarActa, requestAdicionales }) =>
        this.actaHttp.aceptarRechazarAdicionales(requestAdicionales).pipe(
          map(response =>
            actaActions.validarActa({ request: requestValidarActa })
          ),
          catchError(error =>
            of(actaActions.aceptarRechazarAdcionalesValidarActaError({ error }))
          )
        )
      )
    )
  );

  validarActa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actaActions.validarActa),
      concatMap(({ request }) =>
        this.actaHttp.validarActa(request).pipe(
          map(response => actaActions.validarActaSuccess({ response })),
          catchError(error => of(actaActions.validarActaError({ error })))
        )
      )
    )
  );

  getTotalActas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actaActions.getTotalActas),
      concatMap(({ ot_id }) =>
        this.actaHttp.getTotalActas(ot_id).pipe(
          map(response =>
            actaActions.getTotalActasSuccess({
              totalActas: response.data.total,
            })
          ),
          catchError(error => of(actaActions.getTotalActasError({ error })))
        )
      )
    )
  );

  getActas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actaActions.getActas),
      concatMap(({ ot_id }) =>
        this.actaHttp.getActas(ot_id).pipe(
          map(response =>
            actaActions.getActasSuccess({ actas: response.data.items })
          ),
          catchError(error => of(actaActions.getActasError({ error })))
        )
      )
    )
  );

  // COMENTARIOS TRABAJOS FINALIZADOS
  getComentariosTrabajosFinalizados$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actaActions.getComentariosFinalizacionTrabajos),
      concatMap(({ ot_id }) =>
        this.actaHttp.getComentatiosfinalizacionTrabajos(ot_id).pipe(
          map(response =>
            actaActions.getComentariosFinalizacionTrabajosSuccess({
              comentariosFinalizacionTrabajos: response.data.observacion,
            })
          ),
          catchError(err =>
            of(
              actaActions.getComentariosFinalizacionTrabajosError({
                error: err,
              })
            )
          )
        )
      )
    )
  );

  getDetalleActa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actaActions.getDetalleActa),
      concatMap(({ acta_id }) =>
        this.actaHttp.detallesActa(acta_id).pipe(
          map(response => actaActions.getDetalleActaSuccess({ response })),
          catchError(error => of(actaActions.getDetalleActaError({ error })))
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          actaActions.getServicios4ActaSuccess,
          actaActions.getUOs4ActaSuccess,
          actaActions.informarTrabajosFinalizadosSuccess,
          actaActions.validarActaSuccess
        ),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          actaActions.getServicios4ActaError,
          actaActions.getUOs4ActaError,
          actaActions.informarTrabajosFinalizadosError,
          actaActions.aceptarRechazarAdcionalesValidarActaError,
          actaActions.validarActaError,
          actaActions.getTotalActasError,
          actaActions.getComentariosFinalizacionTrabajosError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
