import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as cubicacionActions from './cubicacion.actions';
import { environment } from '@environment';

@Injectable()
export class CubicacionEffects {
  constructor(private actions$: Actions, private http: HttpClient) { }

  // postLogin$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(cubicacionActions.login),
  //     concatMap(() =>
  //       this.http
  //         .post<any>(`${environment.api}login`, null)
  //         .pipe(
  //           map((res) =>
  //             cubicacionActions.loginSuccess({ login: res.data })
  //           ),
  //           catchError((err) =>
  //             of(cubicacionActions.loginError({ error: err }))
  //           )
  //         )
  //     )
  //   )
  // );

  // postLogin$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(cubicacionActions.login),
  //     concatMap((data: any) =>
  //       this.http.post(`${environment.api}login`, { User: 'jcastill' }).pipe(map(res =>
  //         cubicacionActions.loginSuccess({ login: data.data }),
  //       ),
  //         catchError(err => of(cubicacionActions.loginSuccess({ login: err }))
  //         ))))
  // );
}
