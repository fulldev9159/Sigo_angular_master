import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AreaHttpService, AfterHttpService } from '@services';
import { Router } from '@angular/router';
import * as areaActions from './area.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AreaEffects {
  constructor(
    private actions$: Actions,
    private areaHttpService: AreaHttpService,
    private afterHttp: AfterHttpService,
    private router: Router
  ) {}

  getAreas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(areaActions.getAreas),
      concatMap(() =>
        this.areaHttpService.getAreas().pipe(
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
        this.areaHttpService.getAreas().pipe(
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
        this.areaHttpService.updateArea(request).pipe(
          map(response => areaActions.updateAreaSuccess({ response })),
          catchError(error => of(areaActions.updateAreaError({ error })))
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(areaActions.updateAreaSuccess),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(areaActions.updateAreaError),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );

  redirectAfterSaveAreaSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          //// areaActions.createAreaSuccess,
          areaActions.updateAreaSuccess
        ),
        tap(() => this.router.navigate(['/administracion/areas/list-areas']))
      ),
    { dispatch: false }
  );
}
