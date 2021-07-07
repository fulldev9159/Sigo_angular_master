import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

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
import { OTService, OT } from '@data';
import * as otActions from './ot.actions';

import { environment } from '@environment';

@Injectable()
export class OtEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private snackService: SnackBarService,
    private otService: OTService,
    private authFacade: AuthFacade
  ) {}

  getOTs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getOt),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([data, profile]) =>
        this.otService
          .getOTs(profile.id, data.filtro_propietario, data.filtro_tipo)
          .pipe(
            map((ots: OT[]) => otActions.getOtSuccess({ ot: ots })),
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
          map((res: any) => otActions.postOtSuccess({ ot: res.data.items })),
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
        tap(() => {
          console.log('APROBADO!');
        })
      ),
    { dispatch: false }
  );

  notifyAfterApproveOTError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.approveOTError),
        tap(({ error }) => {
          console.error(`could not approve the ot [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  rejectOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.rejectOT),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ otID }, profile]) =>
        this.otService.rejectOT(profile.id, otID).pipe(
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
        tap(() => {
          console.log('RECHAZADO!');
        })
      ),
    { dispatch: false }
  );

  notifyAfterRejectOTError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.rejectOTError),
        tap(({ error }) => {
          console.error(`could not reject the ot [${error.message}]`);
        })
      ),
    { dispatch: false }
  );
}
