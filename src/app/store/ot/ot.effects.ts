import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AfterHttpService,
  NumeroInternoHttpService,
  OtHttpService,
} from '@services';
import * as otActions from './ot.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class OTEffects {
  constructor(
    private actions$: Actions,
    private otHttpService: OtHttpService,
    private afterHttp: AfterHttpService,
    private numeroInternoHttp: NumeroInternoHttpService
  ) {}

  // CREATE OT
  createOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.createOT),
      concatMap(({ request }) =>
        this.otHttpService.createOT(request).pipe(
          map(response => otActions.createOTSuccess({ response })),
          catchError(error => of(otActions.createOTError({ error })))
        )
      )
    )
  );

  // CREATE OT CONTRATO BUCLE : GET OFICINA CENTRAL
  getOficinaCentral$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getOficinaCentral),
      concatMap(({ agencia_id }) =>
        this.otHttpService.getOficinaCentral(agencia_id).pipe(
          map(response => otActions.getOficinaCentralSuccess({ response })),
          catchError(error => of(otActions.getOficinaCentralError({ error })))
        )
      )
    )
  );

  // CREATE OT CONTRATO BUCLE : SOLICITADO POR
  getSolicitadoPor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getSolicitadoPor),
      concatMap(() =>
        this.otHttpService.getSolicitadoPor().pipe(
          map(response => otActions.getSolicitadoPorSuccess({ response })),
          catchError(error => of(otActions.getSolicitadoPorError({ error })))
        )
      )
    )
  );

  // CREATE OT CONTRATO BUCLE : GET COUMNAS FROM CUBICACION
  getComunasFromCub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getComunasFromCub),
      concatMap(({ cubicacion_id }) =>
        this.otHttpService.getComunasFromCub(cubicacion_id).pipe(
          map(response => otActions.getComunasFromCubSuccess({ response })),
          catchError(error => of(otActions.getComunasFromCublError({ error })))
        )
      )
    )
  );

  // CREATE OT CONTRATO BUCLE : GET TIPO DE RED
  getTipoDeRed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getTipoDeRed),
      concatMap(() =>
        this.otHttpService.getTipoDeRed().pipe(
          map(response => otActions.getTipoDeRedSuccess({ response })),
          catchError(error => of(otActions.getTipoDeRedError({ error })))
        )
      )
    )
  );

  // CREATE OT CONTRATO BUCLE : GET TIPO DE TRABAJO FROM CUB
  getTipoDeTrabajoFromCub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getTipoDeTrabajoFromCub),
      concatMap(({ cubicacion_id }) =>
        this.otHttpService.getTipoDeTrabajoFromCub(cubicacion_id).pipe(
          map(response =>
            otActions.getTipoDeTrabajoFromCubSuccess({ response })
          ),
          catchError(error =>
            of(otActions.getTipoDeTrabajoFromCubError({ error }))
          )
        )
      )
    )
  );

  // CREATE OT CONTRATO BUCLE : GET AREA DE NEGOCIO
  getAreaDeNegocio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getAreaDeNegocio),
      concatMap(() =>
        this.otHttpService.getAreaDeNegocio().pipe(
          map(response => otActions.getAreaDeNegocioSuccess({ response })),
          catchError(error => of(otActions.getAreaDeNegocioError({ error })))
        )
      )
    )
  );

  // CREATE OT CONTRATO MOVIL : GET PLANES DE PROYECTO
  getPlanDeProyecto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getPlanDeProyecto),
      concatMap(() =>
        this.otHttpService.getPlanDeProyecto().pipe(
          map(response => otActions.getPlanDeProyectoSuccess({ response })),
          catchError(error => of(otActions.getPlanDeProyectoError({ error })))
        )
      )
    )
  );

  // CREATE OT CONTRATO MOVIL : GET SITIOS DE UN PLAN PROYECTO
  getSitioPlanProyecto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getSitioPlanProyecto),
      concatMap(({ plan_id }) =>
        this.otHttpService.getSitioPlan(plan_id).pipe(
          map(response => otActions.getSitioPlanProyectoSuccess({ response })),
          catchError(error =>
            of(otActions.getSitioPlanProyectoError({ error }))
          )
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          otActions.getOficinaCentralSuccess,
          otActions.getSolicitadoPorSuccess,
          otActions.getComunasFromCubSuccess,
          otActions.getTipoDeRedSuccess,
          otActions.getTipoDeTrabajoFromCubSuccess,
          otActions.getAreaDeNegocioSuccess,
          otActions.getPlanDeProyectoSuccess,
          otActions.getSitioPlanProyectoSuccess,
          otActions.createOTSuccess
        ),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          otActions.getOficinaCentralError,
          otActions.getSolicitadoPorError,
          otActions.getComunasFromCublError,
          otActions.getTipoDeRedError,
          otActions.getTipoDeTrabajoFromCubError,
          otActions.getAreaDeNegocioError,
          otActions.getPlanDeProyectoError,
          otActions.getSitioPlanProyectoError,
          otActions.createOTError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
