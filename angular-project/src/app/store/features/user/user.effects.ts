import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as userActions from './user.actions';
import { environment } from '@environment';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private http: HttpClient) { }

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getUser),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/mockup/usuario/get_all`, {
          token: data.token
        }).pipe(map((res: any) =>
          userActions.getUserSuccess({ user: res.data.items }),
        ),
          catchError(err => of(userActions.getUserError({ error: err }))
          ))))
  );

  getArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getArea),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/areas/get_all`, {
          token: data.token
        }).pipe(map((res: any) =>
          userActions.getAreaSuccess({ area: res.data.items }),
        ),
          catchError(err => of(userActions.getAreaError({ error: err }))
          ))))
  );

  getProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getProvider),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/proveedores/get_all`, {
          token: data.token
        }).pipe(map((res: any) =>
          userActions.getProviderSuccess({ provider: res.data.items }),
        ),
          catchError(err => of(userActions.getProviderError({ error: err }))
          ))))
  );

  getHigher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getHigher),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/mockup/usuarios/superior_jerarquico/get`, {
          token: data.token
        }).pipe(map((res: any) =>
          userActions.getHigherSuccess({ higher: res.data.items }),
        ),
          catchError(err => of(userActions.getHigherError({ error: err }))
          ))))
  );

}
