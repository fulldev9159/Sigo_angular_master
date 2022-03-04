import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as contratosActions from './contratos.actions';
import { ContratosService, AlertMessageActions } from '@data';

@Injectable()
export class ContratosEffects {
  constructor(
    private actions$: Actions,
    private contratosService: ContratosService,
    private alertMessageAction: AlertMessageActions
  ) {}

  getContratos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contratosActions.getContratos),
      concatMap(() =>
        this.contratosService.getAllContratos().pipe(
          map(response => contratosActions.getContratosSuccess({ response })),
          catchError(error => of(contratosActions.getContratosError({ error })))
        )
      )
    )
  );

  getSingleContrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contratosActions.getSingleContrato),
      concatMap(({ contrato_id }) =>
        this.contratosService.getAllContratos().pipe(
          map(response =>
            contratosActions.getSingleContratoSuccess({ contrato_id, response })
          ),
          catchError(error => of(contratosActions.getContratosError({ error })))
        )
      )
    )
  );

  // updateArea$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(areaActions.updateArea),
  //     concatMap(({ request }) =>
  //       this.areaService.updateArea(request).pipe(
  //         map(response => areaActions.updateAreaSuccess({ response })),
  //         catchError(error => of(areaActions.updateAreaError({ error })))
  //       )
  //     )
  //   )
  // );

  // notifyOK$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(contratosActions.updateAreaSuccess),
  //       tap(action => {
  //         this.alertMessageAction.messageActions(
  //           action.response.status.code,
  //           action.response.status.desc,
  //           action.type,
  //           action
  //         );
  //       })
  //     ),
  //   { dispatch: false }
  // );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(contratosActions.getContratosError),
        tap(action =>
          this.alertMessageAction.messageActions(
            action.error.error.status.code,
            action.error.error.status.desc,
            action.type,
            action
          )
        )
      ),
    { dispatch: false }
  );
}
