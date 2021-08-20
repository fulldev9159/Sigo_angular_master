import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as profileActions from './profile.actions';
import { environment } from '@environment';
import { SnackBarService } from '@utilsSIGO/snack-bar';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private snackService: SnackBarService
  ) {}

  // handleError(error: HttpErrorResponse): void {
  //   let errorMessage = 'Unknown error!';
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side errors
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Server-side errors
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   this.snackService.showMessage(errorMessage, 'error');
  // }

  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getProfile),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/perfiles/get_all`, {}).pipe(
          map((res: any) =>
            profileActions.getProfileSuccess({ profile: res.data })
          ),
          catchError(err => of(profileActions.getProfileError({ error: err })))
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
