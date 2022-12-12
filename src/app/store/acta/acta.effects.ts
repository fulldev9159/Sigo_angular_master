import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActaHttpService, AfterHttpService } from '@services';
import * as actaActions from './acta.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { concat } from 'lodash';

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

  // QUIEN AUTORIZO PAGO
  quienAutorizoPagoOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actaActions.quienAutorizoPago),
      concatMap(({ ot_id, acta_id }) =>
        this.actaHttp.quienAutorizoPago(ot_id, acta_id).pipe(
          map(response =>
            actaActions.quienAutorizoPagoSuccess({
              quienAautorizado: response.data.items,
            })
          ),
          catchError(err =>
            of(actaActions.quienAutorizoPagoError({ error: err }))
          )
        )
      )
    )
  );

  // APROBAR RECHAZAR SOLICITUD PAGO
  aprobarRechazarSolicitudPago$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actaActions.aprobarRechazarSolicitudPago),
      concatMap(({ request }) =>
        this.actaHttp.aprobarRechazarSolicitudPago(request).pipe(
          map(response =>
            actaActions.aprobarRechazarSolicitudPagoSuccess({ response })
          ),
          catchError(error =>
            of(actaActions.aprobarRechazarSolicitudPagoError({ error }))
          )
        )
      )
    )
  );

  // SOLICITAR INFORME TRABAJOS FINALIZADOS
  solicitarInformeTrabajosFinalizados$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actaActions.solicitarInformeTrabajosFinalizados),
      concatMap(({ ot_id }) =>
        this.actaHttp.solicitarInformeTrabajosFinalizados(ot_id).pipe(
          map(response =>
            actaActions.solicitarInformeTrabajosFinalizadosSuccess({ response })
          ),
          catchError(err =>
            of(
              actaActions.solicitarInformeTrabajosFinalizadosError({
                error: err,
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
          actaActions.getServicios4ActaSuccess,
          actaActions.getUOs4ActaSuccess,
          actaActions.informarTrabajosFinalizadosSuccess,
          actaActions.validarActaSuccess,
          actaActions.aprobarRechazarSolicitudPagoSuccess,
          actaActions.solicitarInformeTrabajosFinalizadosSuccess,
          actaActions.getCombineImputacion2Success
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
          actaActions.getComentariosFinalizacionTrabajosError,
          actaActions.quienAutorizoPagoError,
          actaActions.aprobarRechazarSolicitudPagoError,
          actaActions.solicitarInformeTrabajosFinalizadosError,
          actaActions.getCombineImputacion2Error
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );

  ///   Get Actas Imputacion2     
  getActasImputacion2$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actaActions.getActasImputacion2),      
      concatMap(() => 
        this.actaHttp.getActasImputacion2().pipe(
          map(response => actaActions.getActasImputacion2Success({response})),
          catchError(error => of(actaActions.getActasImputacion2Error({ error })))
        )
      )           
    )
  );

  
  /// Request combine imputacion2
  getCombineImputacion2$ = createEffect(() => 
    this.actions$.pipe(
      ofType(actaActions.getCombineImputacion2),
      concatMap( data =>
        this.actaHttp.getCombineImputacion2(data).pipe(
          map(response => actaActions.getCombineImputacion2Success({response})),
          catchError(error => of(actaActions.getCombineImputacion2Error({error})))
        )
      )
    )
  );



  
}
