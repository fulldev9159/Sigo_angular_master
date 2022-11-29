import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import {
  AfterHttpService,
  NumeroInternoHttpService,
  OtHttpService,
} from '@services';
import { FiltroPestaniaOT } from '@model';
import * as otActions from './ot.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OTFacade } from './ot.facades';
import { Router } from '@angular/router';

@Injectable()
export class OTEffects {
  constructor(
    private actions$: Actions,
    private otHttpService: OtHttpService,
    private afterHttp: AfterHttpService,
    private numeroInternoHttp: NumeroInternoHttpService,
    private ot: OTFacade,
    private router: Router
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

  // BANDEJA OT EJECUCION
  getBandejaOTEjecucion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getBandejaOTEjecucion),
      concatLatestFrom(() => [this.ot.getFiltrosOT$()]),
      concatMap(([, { filtro_propietario, filtro_tipo }]) =>
        this.otHttpService
          .getBandejaOT({
            filtro_pestania: FiltroPestaniaOT.EN_EJECUCION,
            filtro_propietario,
            filtro_tipo,
          })
          .pipe(
            map(response =>
              otActions.getBandejaOTEjecucionSuccess({ response })
            ),
            catchError(error =>
              of(otActions.getBandejaOTEjecucionError({ error }))
            )
          )
      )
    )
  );

  // BANDEJA OT ABIERTAS
  getBandejaOTAbiertas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getBandejaOTAbiertas),
      concatLatestFrom(() => [this.ot.getFiltrosOT$()]),
      concatMap(([, { filtro_propietario, filtro_tipo }]) =>
        this.otHttpService
          .getBandejaOT({
            filtro_pestania: FiltroPestaniaOT.ABIERTAS,
            filtro_propietario,
            filtro_tipo,
          })
          .pipe(
            map(response =>
              otActions.getBandejaOTAbiertasSuccess({ response })
            ),
            catchError(error =>
              of(otActions.getBandejaOTAbiertasError({ error }))
            )
          )
      )
    )
  );

  // BANDEJA OT CERRADAS
  getBandejaOTCerradas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getBandejaOTCerradas),
      concatLatestFrom(() => [this.ot.getFiltrosOT$()]),
      concatMap(([, { filtro_propietario, filtro_tipo }]) =>
        this.otHttpService
          .getBandejaOT({
            filtro_pestania: FiltroPestaniaOT.CERRADAS,
            filtro_propietario,
            filtro_tipo,
          })
          .pipe(
            map(response =>
              otActions.getBandejaOTCerradasSuccess({ response })
            ),
            catchError(error =>
              of(otActions.getBandejaOTCerradasError({ error }))
            )
          )
      )
    )
  );

  // BANDEJA OT ANULADAS
  getBandejaOTAnuladas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getBandejaOTAnuladas),
      concatLatestFrom(() => [this.ot.getFiltrosOT$()]),
      concatMap(([, { filtro_propietario, filtro_tipo }]) =>
        this.otHttpService
          .getBandejaOT({
            filtro_pestania: FiltroPestaniaOT.ANULADAS,
            filtro_propietario,
            filtro_tipo,
          })
          .pipe(
            map(response =>
              otActions.getBandejaOTAnuladasSuccess({ response })
            ),
            catchError(error =>
              of(otActions.getBandejaOTAnuladasError({ error }))
            )
          )
      )
    )
  );

  // BANDEJA OT QUEBRADAS
  getBandejaOTQuebradas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getBandejaOTQuebradas),
      concatLatestFrom(() => [this.ot.getFiltrosOT$()]),
      concatMap(([, { filtro_propietario, filtro_tipo }]) =>
        this.otHttpService
          .getBandejaOT({
            filtro_pestania: FiltroPestaniaOT.EN_TRAMITE,
            filtro_propietario,
            filtro_tipo,
          })
          .pipe(
            map(response =>
              otActions.getBandejaOTQuebradasSuccess({ response })
            ),
            catchError(error =>
              of(otActions.getBandejaOTQuebradasError({ error }))
            )
          )
      )
    )
  );

  // DOWNLOAD Ots ASIGNADAS
  requestDownloadOTsAsignadas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.downloadOTsAsignadas),
      concatMap(
        ({ fecha_inicio_real_ot__desde, fecha_inicio_real_ot__hasta }) =>
          this.otHttpService
            .downloadOTsAsignadas(
              fecha_inicio_real_ot__desde,
              fecha_inicio_real_ot__hasta
            )
            .pipe(
              map(({ filename, data }) =>
                otActions.downloadOTsAsignadasSuccess({ filename, data })
              ),
              catchError(error =>
                of(otActions.downloadOTsAsignadasError({ error }))
              )
            )
      )
    )
  );

  downloadOTsAsignadas$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.downloadOTsAsignadasSuccess),
        tap(({ filename, data }) => {
          const link = document.createElement('a');
          link.style.display = 'none';
          document.body.appendChild(link);

          const blob = new Blob([data], { type: 'application/ms-excel' });
          const objectURL = URL.createObjectURL(blob);

          link.href = objectURL;
          link.href = URL.createObjectURL(blob);
          link.download = filename;
          link.click();
        })
      ),
    { dispatch: false }
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
          otActions.createOTSuccess,
          otActions.getBandejaOTEjecucionSuccess,
          otActions.getBandejaOTAbiertasSuccess,
          otActions.getBandejaOTCerradasSuccess,
          otActions.getBandejaOTAnuladasSuccess,
          otActions.getBandejaOTQuebradasSuccess
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
          otActions.createOTError,
          otActions.getBandejaOTEjecucionError,
          otActions.getBandejaOTAbiertasError,
          otActions.getBandejaOTCerradasError,
          otActions.getBandejaOTAnuladasError,
          otActions.getBandejaOTQuebradasError,
          otActions.downloadOTsAsignadasError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
