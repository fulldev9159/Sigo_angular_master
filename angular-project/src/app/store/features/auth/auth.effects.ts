import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as authActions from './auth.actions';
import { environment } from '@environment';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient) { }

  postLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/login_new`, { username: data.login.username, password: data.login.password }).pipe(map((res: any) =>
          authActions.loginSuccess({ login: res.data }),
        ),
          catchError(err => of(authActions.loginSuccess({ login: err }))
          ))))
  );
}
