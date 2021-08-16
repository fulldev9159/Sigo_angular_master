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

@Injectable()
export class OtEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private snackService: SnackBarService,
    private otService: Data.OTService,
    private authFacade: AuthFacade,
    private otFacade: OtFacade,
    private messageService: MessageService,
    private router: Router
  ) {}

  getOTsEjecucion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getOtEjecucion),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([data, profile]) =>
        this.otService.getOTsEjecucion(profile.id, data.filtro_tipo).pipe(
          map((ots: Data.OT[]) => otActions.getOtSuccessEjecucion({ ot: ots })),
          catchError(error => of(otActions.getOtError({ error })))
        )
      )
    )
  );

  getOTsAbiertas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getOtAbiertas),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([data, profile]) =>
        this.otService
          .getOTsAbiertas(profile.id, data.filtro_propietario, data.filtro_tipo)
          .pipe(
            map((ots: Data.OT[]) =>
              otActions.getOtSuccessAbiertas({ ot: ots })
            ),
            catchError(error => of(otActions.getOtError({ error })))
          )
      )
    )
  );

  getOTsCerradas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getOtCerradas),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([data, profile]) =>
        this.otService
          .getOTsCerradas(profile.id, data.filtro_propietario, data.filtro_tipo)
          .pipe(
            map((ots: Data.OT[]) =>
              otActions.getOtSuccessCerradas({ ot: ots })
            ),
            catchError(error => of(otActions.getOtError({ error })))
          )
      )
    )
  );

  getPlans$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getPlans),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/ingreot/plan/get_all`, {
            token: data.token,
            region_id: data.region_id,
          })
          .pipe(
            map((res: any) => {
              if (+res.status.responseCode !== 0) {
                this.snackService.showMessage(res.status.description, 'error');
              }
              return otActions.getPlansSuccess({ plan: res.data.items });
            }),
            catchError(err => of(otActions.getPlansError({ error: err })))
          )
      )
    )
  );

  getSites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getSite),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/ingreot/sitio/get`, {
            plan_proyecto_id: +data.plan_proyecto_id,
            region_id: +data.region_id,
          })
          .pipe(
            map((res: any) => {
              if (+res.status.responseCode !== 0) {
                this.snackService.showMessage(res.status.description, 'error');
              }
              return otActions.getSiteSuccess({
                site: res.data.items.sort((a: OtModel.Site, b: OtModel.Site) =>
                  a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
                ),
              });
            }),
            catchError(err => of(otActions.getSiteError({ error: err })))
          )
      )
    )
  );

  getPmo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getPmo),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/ingreot/pmo/get`, {
            sitio_codigo: data.sitio_codigo,
          })
          .pipe(
            map((res: any) => {
              if (+res.status.responseCode !== 0) {
                this.snackService.showMessage(res.status.description, 'error');
              }
              return otActions.getPmoSuccess({
                pmo: res.data.items.sort((a: OtModel.PMO, b: OtModel.PMO) =>
                  a.codigo > b.codigo ? 1 : b.codigo > a.codigo ? -1 : 0
                ),
              });
            }),
            catchError(err => of(otActions.getPmoError({ error: err })))
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
              return otActions.getIDOpexSuccess({
                ids_opex: res.data.items.sort(
                  (a: OtModel.IDOpex, b: OtModel.IDOpex) =>
                    a.codigo > b.codigo ? 1 : b.codigo > a.codigo ? -1 : 0
                ),
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
              return otActions.getCuentaSAPSuccess({
                cuentas_sap: res.data.items.sort(
                  (a: OtModel.CuentaSap, b: OtModel.CuentaSap) =>
                    a.codigo > b.codigo ? 1 : b.codigo > a.codigo ? -1 : 0
                ),
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
              return otActions.getCECOSuccess({
                cecos: res.data.items.sort((a: OtModel.CECO, b: OtModel.CECO) =>
                  a.codigo > b.codigo ? 1 : b.codigo > a.codigo ? -1 : 0
                ),
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
              return otActions.getBudgetLineSuccess({
                lp: res.data.items.sort((a: OtModel.Lp, b: OtModel.Lp) =>
                  a.lineas_presupuestarias > b.lineas_presupuestarias
                    ? 1
                    : b.lineas_presupuestarias > a.lineas_presupuestarias
                    ? -1
                    : 0
                ),
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
            map((res: Response<OtModel.DataRspDetalleOT>) => {
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
      concatMap(([{ otID }, profile]) =>
        this.otService.approveOT(profile.id, otID).pipe(
          mapTo(otActions.approveOTSuccess()),
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
      concatMap(([{ otID, coordinatorID }, profile]) =>
        this.otService.assignCoordinator(profile.id, otID, coordinatorID).pipe(
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
      concatMap(([{ otID }, profile]) =>
        this.otService.authorizePayments(profile.id, otID).pipe(
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
}
