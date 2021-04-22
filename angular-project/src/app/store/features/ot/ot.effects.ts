import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as otActions from './ot.actions';
import { environment } from '@environment';

@Injectable()
export class OtEffects {
  constructor(private actions$: Actions, private http: HttpClient) { }

  getOt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getOt),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/ingreot/ot/get`, {
          token: data.token, usuario_id: data.usuario_id, tipo_usuario: data.tipo_usuario
        }).pipe(map((res: any) =>
          otActions.getOtSuccess({ ot: res.data.items }),
        ),
          catchError(err => of(otActions.getOtError({ error: err }))
          ))))
  );

  getPlans$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getPlans),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/ingreot/plan/get`, {
          token: data.token, region_id: data.region_id
        }).pipe(map((res: any) =>
          otActions.getPlansSuccess({ plan: res.data.items }),
        ),
          catchError(err => of(otActions.getPlansError({ error: err }))
          ))))
  );

  getSites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getSite),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/ingreot/sitio/get`, {
          token: data.token, plan_despliegue_id: +data.plan_despliegue_id
        }).pipe(map((res: any) =>
          otActions.getSiteSuccess({ site: res.data.items }),
        ),
          catchError(err => of(otActions.getSiteError({ error: err }))
          ))))
  );

  getPmo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getPmo),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/ingreot/pmo/get`, {
          token: data.token, emplazamiento_codigo: data.emplazamiento_codigo
        }).pipe(map((res: any) =>
          otActions.getPmoSuccess({ pmo: res.data.items }),
        ),
          catchError(err => of(otActions.getPmoError({ error: err }))
          ))))
  );

  getLineaPresupuestaria$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getBudgetLine),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/ingreot/lp/get`, {
          token: data.token, pmo_id: +data.pmo_id
        }).pipe(map((res: any) =>
          otActions.getBudgetLineSuccess({ lp: res.data.items }),
        ),
          catchError(err => of(otActions.getBudgetLineError({ error: err }))
          ))))
  );

  getPep2$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getPep2),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/ingreot/pep2/get`, {
          token: data.token, pmo_codigo: data.pmo_id, lp_codigo: data.lp_codigo
        }).pipe(map((res: any) =>
          otActions.getPep2Success({ pep2: res.data.items }),
        ),
          catchError(err => of(otActions.getPep2Error({ error: err }))
          ))))
  );

  postOt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.postOt),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/ingreot/ot/save`, {
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
          pep2_provisorio: data.ot.pep2_provisorio
        }).pipe(map((res: any) =>
          otActions.postOtSuccess({ ot: res.data.items }),
        ),
          catchError(err => of(otActions.postOtError({ error: err }))
          ))))
  );

}
