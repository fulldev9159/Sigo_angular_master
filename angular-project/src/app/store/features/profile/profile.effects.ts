import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as profileActions from './profile.actions';
import { environment } from '@environment';

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private http: HttpClient) { }

  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getProfile),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/perfiles/get_all`, {
          token: data.token
        }).pipe(map((res: any) =>
        profileActions.getProfileSuccess({ profile: res.data }),
        ),
          catchError(err => of(profileActions.getProfileError({ error: err }))
          ))))
  );

  
  postProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.postProfile),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/perfiles/create`, data).pipe(map((res: any) =>
        profileActions.postProfileSuccess({ profile: res.data.items }),
        ),
          catchError(err => of(profileActions.postProfileError({ error: err }))
          ))))
  );

}
