import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import {
  catchError,
  concatMap,
  map,
  mapTo,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';

import { SnackBarService } from '@utilsSIGO/snack-bar';

import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import * as Data from '@data';
import * as otActions from './ot.actions';

import { environment } from '@environment';

import { Response } from '@storeOT/model';
import * as OtModel from './ot.model';
import { RequestGetOTs } from '@data';
import {
  DetalleActa,
  LpusPorcentajes,
  RequestSolicitudPagoActa,
} from '@data/model/acta';

@Injectable()
export class OtEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private snackService: SnackBarService,
    private otService: Data.OTService,
    private informeAvanceService: Data.InformAvenceService,
    private planProyectoService: Data.PlanProyectoService,
    private sitioService: Data.SitioService,
    private sustentofinancieroService: Data.SustentoFinancieroService,
    private actaService: Data.ActaService,
    private userService: Data.UserService,
    private authFacade: AuthFacade,
    private otFacade: OtFacade,
    private messageService: MessageService,
    private messageServiceInt: Data.NotifyAfter,
    private router: Router
  ) {}

  getContratos4OT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getContratosUser4OT),
      concatMap(({ usuario_id }) =>
        this.userService.getContratosUser(usuario_id).pipe(
          map(response => otActions.getContratosUser4OTSuccess({ response })),
          catchError(err =>
            of(otActions.getContratosUser4OTError({ error: err }))
          )
        )
      )
    )
  );

  // ////

  getOTs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getOts),
      concatMap(({ request }) =>
        this.otService.getOTs(request).pipe(
          map(({ ots, status }) => {
            if (request.filtro_pestania === 'EN_EJECUCION') {
              return otActions.getOtEjecucionSuccess({ ots, status });
            } else if (request.filtro_pestania === 'ABIERTAS') {
              return otActions.getOtAbiertasSuccess({ ots, status });
            } else if (request.filtro_pestania === 'CERRADAS') {
              return otActions.getOtSuccessCerradas({ ots, status });
            }
          }),
          catchError(error => of(otActions.getOtsError({ error })))
        )
      )
    )
  );

  getPlans$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getPlans),
      concatMap(({ region_id }) =>
        this.planProyectoService.getPlans4OT(region_id).pipe(
          map(({ plans, status }) =>
            otActions.getPlansSuccess({ plans, status })
          ),
          catchError(error => of(otActions.getPlansError({ error })))
        )
      )
    )
  );

  getSites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getSite),
      concatMap(({ plan_proyecto_id, region_id }) =>
        this.sitioService.getSitios4OT(plan_proyecto_id, region_id).pipe(
          map(
            ({ sitio, status }) =>
              otActions.getSiteSuccess({
                sitio,
                status,
              }),
            catchError(err => of(otActions.getSiteError({ error: err })))
          )
        )
      )
    )
  );

  getPmo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getPmo),
      concatMap(({ sitio_codigo }) =>
        this.sustentofinancieroService.getPMO4OT(sitio_codigo).pipe(
          map(({ pmos, status }) =>
            otActions.getPmoSuccess({
              pmos,
              status,
            })
          ),
          catchError(error => of(otActions.getPmoError({ error })))
        )
      )
    )
  );

  getIDOpex$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getIDOpex),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/ingreot/opex/id_opex/get_all`, {})
          .pipe(
            map((res: any) => {
              if (+res.status.responseCode !== 0) {
                this.snackService.showMessage(res.status.description, 'error');
              }

              const SortOPEXs = res.data.items
                ? res.data.items.sort((a: OtModel.IDOpex, b: OtModel.IDOpex) =>
                    a.codigo > b.codigo ? 1 : b.codigo > a.codigo ? -1 : 0
                  )
                : [];
              return otActions.getIDOpexSuccess({
                ids_opex: SortOPEXs,
              });
            }),
            catchError(err => of(otActions.getIDOpexError({ error: err })))
          )
      )
    )
  );

  getCuentasSAP$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getCuentaSAP),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/ingreot/opex/cuenta_sap/get`, {
            id_opex: data.id_opex_codigo,
          })
          .pipe(
            map((res: any) => {
              if (+res.status.responseCode !== 0) {
                this.snackService.showMessage(res.status.description, 'error');
              }
              const SortCuentasSOAP = res.data.items
                ? res.data.items.sort(
                    (a: OtModel.CuentaSap, b: OtModel.CuentaSap) =>
                      a.codigo > b.codigo ? 1 : b.codigo > a.codigo ? -1 : 0
                  )
                : [];
              return otActions.getCuentaSAPSuccess({
                cuentas_sap: SortCuentasSOAP,
              });
            }),
            catchError(err => of(otActions.getCuentaSAPError({ error: err })))
          )
      )
    )
  );

  getCECO$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getCECO),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/ingreot/opex/ceco/get`, {
            id_opex: data.id_opex_codigo,
            cuenta_sap: data.cuenta_sap_codigo,
          })
          .pipe(
            map((res: any) => {
              if (+res.status.responseCode !== 0) {
                this.snackService.showMessage(res.status.description, 'error');
              }
              const SortCECOs = res.data.items
                ? res.data.items.sort((a: OtModel.CECO, b: OtModel.CECO) =>
                    a.codigo > b.codigo ? 1 : b.codigo > a.codigo ? -1 : 0
                  )
                : [];
              return otActions.getCECOSuccess({
                cecos: SortCECOs,
              });
            }),
            catchError(err => of(otActions.getCECOError({ error: err })))
          )
      )
    )
  );

  getLineaPresupuestaria$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getBudgetLine),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/ingreot/lp/get`, {
            token: data.token,
            pmo_codigo: +data.pmo_codigo,
          })
          .pipe(
            map((res: any) => {
              if (+res.status.responseCode !== 0) {
                this.snackService.showMessage(res.status.description, 'error');
              }
              const SortLPs = res.data.items
                ? res.data.items.sort((a: OtModel.Lp, b: OtModel.Lp) =>
                    a.lineas_presupuestarias > b.lineas_presupuestarias
                      ? 1
                      : b.lineas_presupuestarias > a.lineas_presupuestarias
                      ? -1
                      : 0
                  )
                : [];
              return otActions.getBudgetLineSuccess({
                lp: SortLPs,
              });
            }),
            catchError(err => of(otActions.getBudgetLineError({ error: err })))
          )
      )
    )
  );

  getPep2$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getPep2),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/ingreot/pep2/get`, {
            token: data.token,
            pmo_codigo: +data.pmo_codigo,
            lp_codigo: data.lp_codigo,
          })
          .pipe(
            map((res: any) => {
              if (+res.status.responseCode !== 0) {
                this.snackService.showMessage(res.status.description, 'error');
              }
              return otActions.getPep2Success({ pep2: res.data.items });
            }),
            catchError(err => of(otActions.getPep2Error({ error: err })))
          )
      )
    )
  );

  getProyecto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getProyecto),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/proyectos/get_all`, {}).pipe(
          map((res: any) => {
            if (+res.status.responseCode !== 0) {
              this.snackService.showMessage(
                `No existen proyectos - ${res.status.description}`,
                'error'
              );
            }
            return otActions.getProyectoSuccess({ proyectos: res.data.items });
          }),
          catchError(err => of(otActions.getProyectoError({ error: err })))
        )
      )
    )
  );

  postOt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.postOt),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/ingreot/ot/create`, data.ot).pipe(
          tap(res => {
            this.messageService.add({
              severity: 'success',
              summary: 'Registro guardado',
              detail: 'Registro se ha generado con Éxito!',
            });
            this.router.navigate(['app/ot/list-ot']);
          }),
          map((res: any) => {
            if (+res.status.responseCode !== 0) {
              this.snackService.showMessage(res.status.description, 'error');
            }
            return otActions.postOtSuccess({ ot: res.data.items });
          }),
          catchError(err => of(otActions.postOtError({ error: err })))
        )
      )
    )
  );

  getDetalleOt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getDetalleOt),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/ingreot/ot/detalle/get`, {
            id: data.id,
          })
          .pipe(
            map((res: Response<Data.DataRspDetalleOT>) => {
              if (+res.status.responseCode !== 0) {
                this.snackService.showMessage(res.status.description, 'error');
              }
              return otActions.getDetalleOtSuccess({ detalleot: res.data });
            }),
            catchError(err => of(otActions.postOtError({ error: err })))
          )
      )
    )
  );

  approveOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.approveOT),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID, coordinador_id }, profile]) =>
        this.otService.approveOT(profile.id, otID).pipe(
          map(() => otActions.assignCoordinator({ otID, coordinador_id })),
          catchError(error => of(otActions.approveOTError({ error })))
        )
      )
    )
  );

  notifyAfterApproveOTSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.approveOTSuccess),
        withLatestFrom(this.otFacade.getOtFilters$()),
        tap(([data, { filtro_propietario, filtro_tipo }]) => {
          this.snackService.showMessage('Orden de trabajo aceptada', 'ok');

          this.otFacade.getOts({
            filtro_propietario,
            filtro_tipo,
            filtro_pestania: '',
          });
        })
      ),
    { dispatch: false }
  );

  notifyAfterApproveOTError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.approveOTError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible aceptar la orden de trabajo',
            'error'
          );
          console.error(`could not approve the ot [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  rejectOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.rejectOT),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID, motivo }, profile]) =>
        this.otService.rejectOT(profile.id, otID, motivo).pipe(
          mapTo(otActions.rejectOTSuccess()),
          catchError(error => of(otActions.rejectOTError({ error })))
        )
      )
    )
  );

  notifyAfterRejectOTSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.rejectOTSuccess),
        withLatestFrom(this.otFacade.getOtFilters$()),
        tap(([data, { filtro_propietario, filtro_tipo }]) => {
          this.snackService.showMessage('Orden de trabajo rechazada', 'ok');

          this.otFacade.getOts({
            filtro_propietario,
            filtro_tipo,
            filtro_pestania: '',
          });
        })
      ),
    { dispatch: false }
  );

  notifyAfterRejectOTError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.rejectOTError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible rechazar la orden de trabajo',
            'error'
          );
          console.error(`could not reject the ot [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  getCoordinators$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getCoordinators),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID }, profile]) =>
        this.otService.getCoordinators(profile.id, otID).pipe(
          map((coordinators: Data.User[]) =>
            otActions.getCoordinatorsSuccess({ coordinators })
          ),
          catchError(error => of(otActions.getCoordinatorsError({ error })))
        )
      )
    )
  );

  assignCoordinator$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.assignCoordinator),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID, coordinador_id }, profile]) =>
        this.otService.assignCoordinator(profile.id, otID, coordinador_id).pipe(
          mapTo(otActions.assignCoordinatorSuccess()),
          catchError(error => of(otActions.assignCoordinatorError({ error })))
        )
      )
    )
  );

  notifyAfterAssignCoordinatorSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.assignCoordinatorSuccess),
        withLatestFrom(this.otFacade.getOtFilters$()),
        tap(([data, { filtro_propietario, filtro_tipo }]) => {
          this.snackService.showMessage('Coordinador asignado', 'ok');

          this.otFacade.getOts({
            filtro_propietario,
            filtro_tipo,
            filtro_pestania: '',
          });
        })
      ),
    { dispatch: false }
  );

  notifyAfterAssignCoordinatorError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.assignCoordinatorError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible asignar el coordinador',
            'error'
          );
          console.error(`could not assign the coordinator [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  // Trabajadores
  getTrabajador$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getTrabajadores),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID }, profile]) =>
        this.otService.getTrabajadores(profile.id, otID).pipe(
          map((trabajadores: Data.User[]) =>
            otActions.getTrabajadoresSuccess({ trabajadores })
          ),
          catchError(error => of(otActions.getTrabajadoresError({ error })))
        )
      )
    )
  );

  assignTrabajador$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.assignTrabajador),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID, trabajadorID }, profile]) =>
        this.otService.assignTrabajador(profile.id, otID, trabajadorID).pipe(
          mapTo(otActions.assignTrabajadorSuccess()),
          catchError(error => of(otActions.assignTrabajadorError({ error })))
        )
      )
    )
  );

  notifyAfterAssignTrabajadorSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.assignTrabajadorSuccess),
        withLatestFrom(this.otFacade.getOtFilters$()),
        tap(([data, { filtro_propietario, filtro_tipo }]) => {
          this.snackService.showMessage('Trabajador asignado', 'ok');

          this.otFacade.getOts({
            filtro_propietario,
            filtro_tipo,
            filtro_pestania: '',
          });
        })
      ),
    { dispatch: false }
  );

  notifyAfterAssignTrabajadorError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.assignTrabajadorError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible asignar el trabajador',
            'error'
          );
          console.error(`could not assign the trabajador [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  // Cancelar
  cancelOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.cancelOT),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID }, profile]) =>
        this.otService.cancelOT(profile.id, otID).pipe(
          mapTo(otActions.cancelOTSuccess()),
          catchError(error => of(otActions.cancelOTError({ error })))
        )
      )
    )
  );

  notifyAfterCancelOTSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.cancelOTSuccess),
        withLatestFrom(this.otFacade.getOtFilters$()),
        tap(([data, { filtro_propietario, filtro_tipo }]) => {
          this.snackService.showMessage('Orden de trabajo anulada', 'ok');

          this.otFacade.getOts({
            filtro_propietario,
            filtro_tipo,
            filtro_pestania: '',
          });
        })
      ),
    { dispatch: false }
  );

  notifyAfterCancelOTError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.cancelOTError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible anular orden de trabajo',
            'error'
          );
          console.error(`could not cancel the ot [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  // Finalizar trabajados
  finalizeOTJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.finalizeOTJobs),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID }, profile]) =>
        this.otService.finalizeOTJobs(profile.id, otID).pipe(
          mapTo(otActions.finalizeOTJobsSuccess()),
          catchError(error => of(otActions.finalizeOTJobsError({ error })))
        )
      )
    )
  );

  notifyAfterFinalizeOTJobsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.finalizeOTJobsSuccess),
        withLatestFrom(this.otFacade.getOtFilters$()),
        tap(([data, { filtro_propietario, filtro_tipo }]) => {
          this.snackService.showMessage(
            'Trabajos de esta orden finalizados',
            'ok'
          );

          this.otFacade.getOts({
            filtro_propietario,
            filtro_tipo,
            filtro_pestania: '',
          });
        })
      ),
    { dispatch: false }
  );

  notifyAfterFinalizeOTJobsError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.finalizeOTJobsError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible finalizar los trabajos para esta orden',
            'error'
          );
          console.error(`could not finalize the ot jobs [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  // Aprobar la generación del acta
  approveOTMinutesGeneration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.approveOTMinutesGeneration),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID }, profile]) =>
        this.otService.approveOTMinutesGeneration(profile.id, otID).pipe(
          mapTo(otActions.approveOTMinutesGenerationSuccess()),
          catchError(error =>
            of(otActions.approveOTMinutesGenerationError({ error }))
          )
        )
      )
    )
  );

  notifyAfterApproveOTMinutesGenerationSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.approveOTMinutesGenerationSuccess),
        withLatestFrom(this.otFacade.getOtFilters$()),
        tap(([data, { filtro_propietario, filtro_tipo }]) => {
          this.snackService.showMessage(
            'Aceptada la generación del acta',
            'ok'
          );

          this.otFacade.getOts({
            filtro_propietario,
            filtro_tipo,
            filtro_pestania: '',
          });
        })
      ),
    { dispatch: false }
  );

  notifyAfterApproveOTMinutesGenerationError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.approveOTMinutesGenerationError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible aceptar la generación del acta',
            'error'
          );
          console.error(
            `could not approve the ot minutes generation [${error.message}]`
          );
        })
      ),
    { dispatch: false }
  );

  // Rechazar la generación del acta
  rejectOTMinutesGeneration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.rejectOTMinutesGeneration),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID }, profile]) =>
        this.otService.rejectOTMinutesGeneration(profile.id, otID).pipe(
          mapTo(otActions.rejectOTMinutesGenerationSuccess()),
          catchError(error =>
            of(otActions.rejectOTMinutesGenerationError({ error }))
          )
        )
      )
    )
  );

  notifyAfterRejectOTMinutesGenerationSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.rejectOTMinutesGenerationSuccess),
        withLatestFrom(this.otFacade.getOtFilters$()),
        tap(([data, { filtro_propietario, filtro_tipo }]) => {
          this.snackService.showMessage(
            'Rechazada la generación del acta',
            'ok'
          );

          this.otFacade.getOts({
            filtro_propietario,
            filtro_tipo,
            filtro_pestania: '',
          });
        })
      ),
    { dispatch: false }
  );

  notifyAfterRejectOTMinutesGenerationError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.rejectOTMinutesGenerationError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible rechazar la generación del acta',
            'error'
          );
          console.error(
            `could not reject the ot minutes generation [${error.message}]`
          );
        })
      ),
    { dispatch: false }
  );

  // // Aprobar la validación del acta
  // approveOTMinutesValidation$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(otActions.approveOTMinutesValidation),
  //     withLatestFrom(this.authFacade.getCurrentProfile$()),
  //     concatMap(([{ otID }, profile]) =>
  //       this.otService.approveOTMinutesValidation(profile.id, otID).pipe(
  //         mapTo(otActions.approveOTMinutesValidationSuccess()),
  //         catchError(error =>
  //           of(otActions.approveOTMinutesValidationError({ error }))
  //         )
  //       )
  //     )
  //   )
  // );

  notifyAfterApproveOTMinutesValidationSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.approveOTMinutesValidationSuccess),
        withLatestFrom(this.otFacade.getOtFilters$()),
        tap(([data, { filtro_propietario, filtro_tipo }]) => {
          this.snackService.showMessage(
            'Aceptada la validación del acta',
            'ok'
          );

          this.otFacade.getOts({
            filtro_propietario,
            filtro_tipo,
            filtro_pestania: '',
          });
        })
      ),
    { dispatch: false }
  );

  notifyAfterApproveOTMinutesValidationError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.approveOTMinutesValidationError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible aceptar la validación del acta',
            'error'
          );
          console.error(
            `could not approve the ot minutes validation [${error.message}]`
          );
        })
      ),
    { dispatch: false }
  );

  // Rechazar la validación del acta
  // rejectOTMinutesValidation$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(otActions.rejectOTMinutesValidation),
  //     withLatestFrom(this.authFacade.getCurrentProfile$()),
  //     concatMap(([{ otID }, profile]) =>
  //       this.otService.rejectOTMinutesValidation(profile.id, otID).pipe(
  //         mapTo(otActions.rejectOTMinutesValidationSuccess()),
  //         catchError(error =>
  //           of(otActions.rejectOTMinutesValidationError({ error }))
  //         )
  //       )
  //     )
  //   )
  // );

  notifyAfterRejectOTMinutesValidationSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.rejectOTMinutesValidationSuccess),
        withLatestFrom(this.otFacade.getOtFilters$()),
        tap(([data, { filtro_propietario, filtro_tipo }]) => {
          this.snackService.showMessage(
            'Rechazada la validación del acta',
            'ok'
          );

          this.otFacade.getOts({
            filtro_propietario,
            filtro_tipo,
            filtro_pestania: '',
          });
        })
      ),
    { dispatch: false }
  );

  notifyAfterRejectOTMinutesValidationError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.rejectOTMinutesValidationError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible rechazar la validación del acta',
            'error'
          );
          console.error(
            `could not reject the ot minutes validation [${error.message}]`
          );
        })
      ),
    { dispatch: false }
  );

  // Autorizar pagos
  authorizePayments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.authorizePayments),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID, user_id }, profile]) =>
        this.otService.authorizePayments(user_id, otID).pipe(
          mapTo(otActions.authorizePaymentsSuccess()),
          catchError(error => of(otActions.authorizePaymentsError({ error })))
        )
      )
    )
  );

  notifyAfterAuthorizePaymentsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.authorizePaymentsSuccess),
        withLatestFrom(this.otFacade.getOtFilters$()),
        tap(([data, { filtro_propietario, filtro_tipo }]) => {
          this.snackService.showMessage('Pago autorizado', 'ok');

          this.otFacade.getOts({
            filtro_propietario,
            filtro_tipo,
            filtro_pestania: '',
          });
        })
      ),
    { dispatch: false }
  );

  notifyAfterAuthorizePaymentsError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.authorizePaymentsError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible autorizar el pago',
            'error'
          );
          console.error(`could not authorize the payments [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  // Rechazar pagos
  rejectPayments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.rejectPayments),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID }, profile]) =>
        this.otService.rejectPayments(profile.id, otID).pipe(
          mapTo(otActions.rejectPaymentsSuccess()),
          catchError(error => of(otActions.rejectPaymentsError({ error })))
        )
      )
    )
  );

  notifyAfterRejectPaymentsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.rejectPaymentsSuccess),
        withLatestFrom(this.otFacade.getOtFilters$()),
        tap(([data, { filtro_propietario, filtro_tipo }]) => {
          this.snackService.showMessage('Pago rechazado', 'ok');

          this.otFacade.getOts({
            filtro_propietario,
            filtro_tipo,
            filtro_pestania: '',
          });
        })
      ),
    { dispatch: false }
  );

  notifyAfterRejectPaymentsError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.rejectPaymentsError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible rechazar el pago',
            'error'
          );
          console.error(`could not reject the payments [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  // Cerrar OT
  finalizeOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.finalizeOT),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID }, profile]) =>
        this.otService.finalizeOT(profile.id, otID).pipe(
          mapTo(otActions.finalizeOTSuccess()),
          catchError(error => of(otActions.finalizeOTError({ error })))
        )
      )
    )
  );

  notifyAfterFinalizeOTSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.finalizeOTSuccess),
        withLatestFrom(this.otFacade.getOtFilters$()),
        tap(([data, { filtro_propietario, filtro_tipo }]) => {
          this.snackService.showMessage('Orden de trabajo finalizada', 'ok');

          this.otFacade.getOts({
            filtro_propietario,
            filtro_tipo,
            filtro_pestania: '',
          });
        })
      ),
    { dispatch: false }
  );

  notifyAfterFinalizeOTError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.finalizeOTError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible finalizar la Orden de Trabajo',
            'error'
          );
          console.error(`could not finalize ot [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  registrarLibroObras$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.registrarLibroObra),
      concatMap(({ registro }) =>
        this.otService.registrarLibroObra(registro).pipe(
          mapTo(otActions.registrarLibroObraSuccess()),
          catchError(error => of(otActions.registrarLibroObraError({ error })))
        )
      )
    )
  );

  registrarLibroObrasSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.registrarLibroObraSuccess),
        tap(() => {
          this.snackService.showMessage(
            'Registro agregado exitosamente al libro de obras',
            'ok'
          );
        })
      ),
    { dispatch: false }
  );

  registrarLibroObrasError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.registrarLibroObraError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No fue posible registrar en el libro de obras',
            'error'
          );
          console.error(`could not assign the coordinator [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  getRegistrarLibroObras$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getRegistrosLibroObra),
      concatMap(({ ot_id }) =>
        this.otService.getRegistrosLibroObra(ot_id).pipe(
          map((registroslibroobras: Data.GetLibroObrasResponse) =>
            otActions.getRegistrosLibroObraSuccess({
              registroslibroobras: registroslibroobras.data.items,
            })
          ),
          catchError(error =>
            of(otActions.getRegistrosLibroObraError({ error }))
          )
        )
      )
    )
  );

  getRegistrarLibroObrasError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.registrarLibroObraError),
        tap(({ error }) => {
          this.snackService.showMessage(
            'No se pudieron obtner los registros del libro de obras',
            'error'
          );
          console.error(`can't get registers [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  // inicializarInformeAvance$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(otActions.inicializarInformeAvance),
  //     concatMap(({ ot_id }) =>
  //       this.informeAvanceService.inicializaInforme(ot_id).pipe(
  //         map(({ status }) => {
  //           if (status.responseCode === 0) {
  //             this.otFacade.getDataInformeAvanceTrabajador(ot_id);
  //           }
  //           return otActions.inicializarInformeAvanceSuccess({
  //             status,
  //           });
  //         }),
  //         catchError(error =>
  //           of(otActions.inicializarInformeAvanceError({ error }))
  //         )
  //       )
  //     )
  //   )
  // );

  getDataInformeAvanceTrabajador$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getDataInformeAvanceTrabajador),
      concatMap(({ ot_id }) =>
        this.informeAvanceService.getInformeAvanceTrabajador(ot_id).pipe(
          map(({ dataInformeAvance: datoInformeAvance, status }) =>
            otActions.getDataInformeAvanceTrabajadorSuccess({
              dataInformeAvance: datoInformeAvance,
              status,
            })
          ),
          catchError(error =>
            of(otActions.getDataInformeAvanceError({ error }))
          )
        )
      )
    )
  );

  getDataInformeAvanceAdminEC$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getDataInformeAvanceAdminEC),
      concatMap(({ ot_id }) =>
        this.informeAvanceService.getInformeAvanceAdministradorEC(ot_id).pipe(
          map(({ dataInformeAvance: datoInformeAvance, status }) =>
            otActions.getDataInformeAvanceAdminECSuccess({
              dataInformeAvance: datoInformeAvance,
              status,
            })
          ),
          catchError(error =>
            of(otActions.getDataInformeAvanceError({ error }))
          )
        )
      )
    )
  );

  saveInformeAvanceTrabajador$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.saveInformeAvanceTrabajador),
      withLatestFrom(this.otFacade.getInfoOtId$()),
      concatMap(([{ request }, ot_id]) =>
        this.informeAvanceService.saveInformeAvanceTrabajador(request).pipe(
          map(({ status }) =>
            otActions.saveInformeAvanceTrabajadorSuccess({
              ot_id,
              status,
            })
          ),
          catchError(error => of(otActions.saveInformeAvanceError({ error })))
        )
      )
    )
  );

  saveInformeAvanceAdminEC$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.saveInformeAvanceAdminEC),
      concatMap(({ request }) =>
        this.informeAvanceService.saveInformeAvanceAdministrador(request).pipe(
          map(({ status }) =>
            otActions.saveInformeAvanceAdminECSuccess({
              status,
            })
          ),
          catchError(error => of(otActions.saveInformeAvanceError({ error })))
        )
      )
    )
  );

  saveBorradorInformeAvance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.saveBorradorInformeAvance),
      withLatestFrom(this.otFacade.getInfoOtId$()),
      concatMap(([{ request }, ot_id]) =>
        this.informeAvanceService.saveBorradorInformeAvance(request).pipe(
          map(({ status }) =>
            otActions.saveBorradorInformeAvanceSuccess({
              ot_id,
              status,
            })
          ),
          catchError(error =>
            of(otActions.saveBorradorInformeAvanceError({ error }))
          )
        )
      )
    )
  );

  rechazarInformeAvance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.rechazarInformeAvance),
      concatMap(({ informe_id }) =>
        this.informeAvanceService.rechazarInformeAvance(informe_id).pipe(
          map(({ status }) =>
            otActions.rechazarInformeAvanceSuccess({
              status,
            })
          ),
          catchError(error =>
            of(otActions.rechazarInformeAvanceError({ error }))
          )
        )
      )
    )
  );

  getDataInformeActa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getDataInformeActa),
      concatMap(({ ot_id }) =>
        this.actaService.getInformeActa(ot_id).pipe(
          map(({ dataInformeActa, status }) =>
            otActions.getDataInformeActaSuccess({
              dataInformeActa,
              status,
            })
          ),
          catchError(error => of(otActions.getDataInformeActaError({ error })))
        )
      )
    )
  );

  saveInformeActa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.saveInformeActa),
      withLatestFrom(this.otFacade.getInfoOtId$()),
      concatMap(([{ request }, ot_id]) =>
        this.actaService.saveInformeActa(request).pipe(
          map(({ status }) => {
            this.otFacade.getDetalleActaMezcla(ot_id);
            return otActions.saveInformeActaSuccess({
              status,
            });
          }),
          catchError(error => of(otActions.saveInformeActaError({ error })))
        )
      )
    )
  );

  rechazarInformeActa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.rechazarInformeActa),
      concatMap(({ informe_id }) =>
        this.actaService.rechazarInformeActa(informe_id).pipe(
          map(({ status }) =>
            otActions.rechazarInformeActaSuccess({
              status,
            })
          ),
          catchError(error => of(otActions.rechazarInformeActaError({ error })))
        )
      )
    )
  );

  getDetalleActaMezcla$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getDetalleActaMezcla),
      concatMap(({ ot_id }) =>
        this.actaService.getActaDetalle(ot_id).pipe(
          map(({ dataInformeActa, status }) => {
            console.log(dataInformeActa);

            const lpus: LpusPorcentajes[] = dataInformeActa.map(f => {
              return { detalle_id: f.detalle_id, porcentaje_solicitado: 1.0 };
            });

            const request: RequestSolicitudPagoActa = {
              acta_id: dataInformeActa[0].id,
              porcentajes_detalles: lpus,
            };
            console.log(request);

            this.otFacade.sendSolicitudPagoActa(request);
            return otActions.getDetalleActaSuccess({
              dataInformeActa,
              status,
            });
          }),
          catchError(error => of(otActions.getDetalleActaError({ error })))
        )
      )
    )
  );

  sendSolicitudPagoActa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.sendSolicitudPagoActa),
      concatMap(({ request }) =>
        this.actaService.solicitudPagoActa(request).pipe(
          map(({ status }) =>
            otActions.sendSolicitudPagoActaSuccess({
              status,
            })
          ),
          catchError(error =>
            of(otActions.sendSolicitudPagoActaError({ error }))
          )
        )
      )
    )
  );

  getDetalleActa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getDetalleActa),
      concatMap(({ ot_id }) =>
        this.actaService.getActaDetalle(ot_id).pipe(
          map(({ dataInformeActa, status }) =>
            otActions.getDetalleActaSuccess({
              dataInformeActa,
              status,
            })
          ),
          catchError(error => of(otActions.getDetalleActaError({ error })))
        )
      )
    )
  );

  notifyAfterSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          otActions.getOtEjecucionSuccess,
          otActions.getOtAbiertasSuccess,
          otActions.getOtSuccessCerradas,
          otActions.saveBorradorInformeAvanceSuccess,
          otActions.saveInformeAvanceTrabajadorSuccess,
          otActions.saveInformeAvanceAdminECSuccess,
          otActions.getDataInformeAvanceTrabajadorSuccess,
          otActions.getDataInformeAvanceAdminECSuccess,
          otActions.rechazarInformeAvanceSuccess,
          otActions.getDataInformeActaSuccess,
          otActions.saveInformeActaSuccess,
          otActions.rechazarInformeActaSuccess,
          // otActions.inicializarInformeAvanceSuccess,
          otActions.getPlansSuccess,
          otActions.getSiteSuccess,
          otActions.getPmoSuccess,
          otActions.getDetalleActaSuccess,
          otActions.sendSolicitudPagoActaSuccess
        ),
        tap(action =>
          this.messageServiceInt.actions200(action.status, action.type, action)
        )
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          otActions.getOtsError,
          otActions.saveBorradorInformeAvanceError,
          otActions.saveInformeAvanceError,
          otActions.getDataInformeAvanceError,
          otActions.rechazarInformeAvanceError,
          otActions.getDataInformeActaError,
          otActions.saveInformeActaError,
          otActions.rechazarInformeActaError,
          // otActions.inicializarInformeAvanceError,
          otActions.getPlansError,
          otActions.getSiteError,
          otActions.getPmoError,
          otActions.getDetalleActaError
        ),
        tap(action =>
          this.messageServiceInt.actionsErrors(
            action.error.message,
            action.type
          )
        )
      ),
    { dispatch: false }
  );
}
