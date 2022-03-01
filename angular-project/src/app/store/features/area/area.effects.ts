import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as areaActions from './area.actions';
import { AreaService, AlertMessageActions } from '@data';

@Injectable()
export class AreaEffects {
  constructor(
    private actions$: Actions,
    private areaService: AreaService,
    private alertMessageAction: AlertMessageActions
  ) {}

  getAreas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(areaActions.getAreas),
      concatMap(() =>
        this.areaService.getAreas().pipe(
          map(response => areaActions.getAreasSuccess({ response })),
          catchError(error => of(areaActions.getAreasError({ error })))
        )
      )
    )
  );

  getArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(areaActions.getArea),
      concatMap(({ area_id }) =>
        this.areaService.getAreas().pipe(
          map(response => areaActions.getAreaSuccess({ area_id, response })),
          catchError(error => of(areaActions.getAreasError({ error })))
        )
      )
    )
  );

  updateArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(areaActions.updateArea),
      concatMap(({ request }) =>
        this.areaService.updateArea(request).pipe(
          map(response => areaActions.updateAreaSuccess({ response })),
          catchError(error => of(areaActions.updateAreaError({ error })))
        )
      )
    )
  );

  notifyOK$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(areaActions.updateAreaSuccess),
        tap(action => {
          this.alertMessageAction.messageActions(
            action.response.status.code,
            action.response.status.desc,
            action.type,
            action
          );
        })
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(areaActions.updateAreaError),
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
