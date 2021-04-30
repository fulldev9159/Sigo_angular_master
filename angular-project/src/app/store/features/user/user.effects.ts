import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as profileActions from './user.actions';
import { environment } from '@environment';

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private http: HttpClient) { }

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getUser),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/usuarios/get_all`, {
          token: data.token
        }).pipe(map((res: any) =>
          profileActions.getUserSuccess({ user: res.data }),
        ),
          catchError(err => of(profileActions.getUserError({ error: err }))
          ))))
  );

  getArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getArea),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/areas/get_all`, {
          token: data.token
        }).pipe(map((res: any) =>
          profileActions.getAreaSuccess({ area: res.data.items }),
        ),
          catchError(err => of(profileActions.getAreaError({ error: err }))
          ))))
  );

  getProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getProvider),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/proveedores/get_all`, {
          token: data.token
        }).pipe(map((res: any) =>
          profileActions.getProviderSuccess({ provider: res.data.items }),
        ),
          catchError(err => of(profileActions.getProviderError({ error: err }))
          ))))
  );

  getHigher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getHigher),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/usuarios/superior_jerarquico/get`, {
          token: data.token
        }).pipe(map((res: any) =>
          profileActions.getHigherSuccess({ higher: res.data.items }),
        ),
          catchError(err => of(profileActions.getHigherError({ error: err }))
          ))))
  );

}
