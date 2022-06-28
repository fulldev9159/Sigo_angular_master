import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, withLatestFrom } from 'rxjs/operators';

import { of } from 'rxjs';

import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import * as Data from '@data';
import * as UnidadActions from './unidad.actions';

@Injectable()
export class UnidadEffects {
  constructor(
    private actions$: Actions,
    private unidadService: Data.UnidadService,
    private authFacade: AuthFacade
  ) {}

  getUnidades$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnidadActions.getUnidades),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([data, profile]) =>
        this.unidadService.getUnidades(profile.id).pipe(
          map((unidades: Data.Unidad[]) =>
            UnidadActions.getUnidadesSuccess({ unidades })
          ),
          catchError(error => of(UnidadActions.getUnidadesError({ error })))
        )
      )
    )
  );
}
