import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as authActions from './auth.actions';
import { AuthService, AlertMessageActions } from '@data';
import { SnackBarService } from '@utilsSIGO/snack-bar';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private alertMessageAction: AlertMessageActions
  ) {}

  postLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      concatMap(({ login }) =>
        this.authService.login(login).pipe(
          map(response => authActions.loginSuccess({ response })),
          catchError(error => of(authActions.loginError({ error })))
        )
      )
    )
  );

  getPerfil$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.perfiles),
      concatMap(() =>
        this.authService.getPerfiles().pipe(
          map(response => authActions.perfilesSuccess({ response })),
          catchError(error => of(authActions.loginError({ error })))
        )
      )
    )
  );

  notifyAfterSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess, authActions.perfilesSuccess),
        tap(action => {
          this.alertMessageAction.messageActions(
            action.response.status,
            action.type
          );
        })
      ),
    { dispatch: false }
  );

  // notifyAfterError = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(
  //         cubActions.getCubsError,
  //         cubActions.getSingleCubicacionError,
  //         cubActions.getContractMarcoError,
  //         cubActions.getSubContractProvidersError,
  //         cubActions.getSubContractedRegionsError,
  //         cubActions.getSubContractedTypeServicesError,
  //         cubActions.getSubContractedServicesError,
  //         cubActions.createCubError,
  //         cubActions.editCubicacionError,
  //         cubActions.getAutoSuggestError,
  //         cubActions.getDetalleCubicacionError,
  //         cubActions.deleteCubicacionError
  //       ),
  //       tap(action =>
  //         this.messageService.actionsErrors(action.error.message, action.type)
  //       )
  //     ),
  //   { dispatch: false }
  // );

  // notifySuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(),
  //       tap(({ response }) => {
  //         if (+response.status.code === 0) {
  //           this.snackService.showMessage(`Login Exitoso`, 'OK', 2000);
  //         } else {
  //           this.snackService.showMessage(response.status.desc, 'error');
  //         }
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // notifyAfterLoginError = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(authActions.loginError),
  //       tap(({ error }) => {
  //         this.snackService.showMessage('Usuario/Password incorrecto', 'error');
  //       })
  //     ),
  //   { dispatch: false }
  // );
}
