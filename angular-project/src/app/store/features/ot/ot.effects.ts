import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as otActions from './ot.actions';
import { environment } from '@environment';

@Injectable()
export class OtEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  getOt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getOt),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/ingreot/ot/get`, {
            token: data.token,
            usuario_id: data.usuario_id,
            tipo_usuario: data.tipo_usuario,
          })
          .pipe(
            map((res: any) => otActions.getOtSuccess({ ot: res.data.items })),
            catchError((err) => of(otActions.getOtError({ error: err })))
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
            catchError((err) => of(otActions.getPlansError({ error: err })))
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
            catchError((err) => of(otActions.getSiteError({ error: err })))
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
            catchError((err) => of(otActions.getPmoError({ error: err })))
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
            catchError((err) => of(otActions.getIDOpexError({ error: err })))
          )
      )
    )
  );

  getCuentasSAP$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getCuentaSAP),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/ingreot/opex/cuenta_sap/get`, {})
          .pipe(
            map((res: any) =>
              otActions.getCuentaSAPSuccess({ cuentas_sap: res.data.items })
            ),
            catchError((err) => of(otActions.getCuentaSAPError({ error: err })))
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
            catchError((err) =>
              of(otActions.getBudgetLineError({ error: err }))
            )
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
            catchError((err) => of(otActions.getPep2Error({ error: err })))
          )
      )
    )
  );

  postOt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.postOt),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/ingreot/ot/save`, {
            gestor_id: +data.ot.gestor_id,
            nombre: data.ot.nombre,
            tipo: data.ot.tipo,
            cubicacion_id: +data.ot.cubicacion_id,
            plan_despliegue_id: +data.ot.plan_despliegue_id,
            sitio_id: +data.ot.sitio_id,
            fecha_inicio: data.ot.fecha_inicio,
            fecha_fin: data.ot.fecha_fin,
            observaciones: data.ot.observaciones,
            pmo_codigo: +data.ot.pmo_codigo,
            lp_codigo: data.ot.lp_codigo,
            pep2_codigo: data.ot.pep2_codigo,
            pep2_provisorio: data.ot.pep2_provisorio,
            token: data.ot.token,
          })
          .pipe(
            map((res: any) => otActions.postOtSuccess({ ot: res.data.items })),
            catchError((err) => of(otActions.postOtError({ error: err })))
          )
      )
    )
  );
}
