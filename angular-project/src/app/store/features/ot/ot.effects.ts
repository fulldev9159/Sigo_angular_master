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

  getOTs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getOt),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([data, profile]) =>
        this.otService
          .getOTs(profile.id, data.filtro_propietario, data.filtro_tipo)
          .pipe(
            map((ots: Data.OT[]) => otActions.getOtSuccess({ ot: ots })),
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
            map((res: any) =>
              otActions.getPlansSuccess({ plan: res.data.items })
            ),
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
            map((res: any) =>
              otActions.getSiteSuccess({ site: res.data.items })
            ),
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
            map((res: any) => otActions.getPmoSuccess({ pmo: res.data.items })),
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
            map((res: any) =>
              otActions.getIDOpexSuccess({ ids_opex: res.data.items })
            ),
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
            map((res: any) =>
              otActions.getCuentaSAPSuccess({ cuentas_sap: res.data.items })
            ),
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
            map((res: any) =>
              otActions.getCECOSuccess({ cecos: res.data.items })
            ),
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
            map((res: any) =>
              otActions.getBudgetLineSuccess({ lp: res.data.items })
            ),
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
            map((res: any) =>
              otActions.getPep2Success({ pep2: res.data.items })
            ),
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
            let message = '';
            if (+res.status.responseCode !== 0) {
              if (res.status.description === 'Sin resultados') {
                message = 'No existe ningún proyecto en el sistema';
              }
              this.snackService.showMessage(message, 'error');
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
          map((res: any) => otActions.postOtSuccess({ ot: res.data.items })),
          catchError(err => of(otActions.postOtError({ error: err })))
        )
      )
    )
  );

  // IngreOt con SCE ***
  postOtSCE$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.postOtSCE),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/fromsce/ingreot/ot/create`, data.ot)
          .pipe(
            map((res: any) =>
              otActions.postOtSCESuccess({ ot: res.data.items })
            ),
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
            map((res: Response<OtModel.DataRspDetalleOT>) =>
              otActions.getDetalleOtSuccess({ detalleot: res.data })
            ),
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

          this.otFacade.getOt({
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

          this.otFacade.getOt({
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

          this.otFacade.getOt({
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

          this.otFacade.getOt({
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

          this.otFacade.getOt({
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
}
