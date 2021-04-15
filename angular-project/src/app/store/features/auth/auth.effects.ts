import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient) { }

  postLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      concatMap(() =>
        this.http
          .get<any>(
            `https://api.themoviedb.org/3/discover/movie?primary_release_year=2021&sort_by=vote_average.desc`
          )
          .pipe(
            map((res) =>
              authActions.loginSuccess({ login: res.data })
            ),
            catchError((err) =>
              of(authActions.loginError({ error: err }))
            )
          )
      )
    )
  );
}
