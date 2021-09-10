import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as profileActions from './profile.actions';
import { environment } from '@environment';
import { SnackBarService } from '@utilsSIGO/snack-bar';

import * as Data from '@data';
@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private perfilService: Data.PerfilService,
    private snackService: SnackBarService
  ) {}

  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getProfile),
      concatMap(() =>
        this.perfilService.getPerfiles().pipe(
          map(
            (perfiles: Data.Perfil[]) =>
              profileActions.getProfileSuccess({ perfiles }),
            catchError(error => of(profileActions.getProfileError({ error })))
          )
        )
      )
    )
  );

  getPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getPermissions),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/perfiles/permisos/get_all`, {
            token: data.token,
          })
          .pipe(
            map((res: any) =>
              profileActions.getPermissionsSuccess({
                permissions: res.data.items,
              })
            ),
            catchError(err =>
              of(profileActions.getPermissionsError({ error: err }))
            )
          )
      )
    )
  );

  postProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.postProfile),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/perfiles/create`, data.profile).pipe(
          map(
            (res: any) => {
              if (+res.status.responseCode !== 0) {
                this.snackService.showMessage(res.status.description, 'error');
              }
              return profileActions.postProfileSuccess({
                profile: res.data.items,
              });
            },
            (error: HttpErrorResponse) => {
              // this.handleError(error);
            }
          ),
          catchError(err =>
            of(profileActions.getPermissionsError({ error: err }))
          )
        )
      )
    )
  );

  putProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.editProfile),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/perfiles/edit`, data).pipe(
          map((res: any) => profileActions.editProfileSuccess()),
          catchError(err => of(profileActions.editProfileError({ error: err })))
        )
      )
    )
  );

  deleteProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.deleteProfile),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/perfiles/delete`, data.profileDelete)
          .pipe(
            map((res: any) =>
              profileActions.deleteProfileSuccess({
                profileId: data.profileDelete.perfil_id,
                res: res.status,
              })
            ),
            catchError(err =>
              of(profileActions.deleteProfileError({ error: err }))
            )
          )
      )
    )
  );
}
