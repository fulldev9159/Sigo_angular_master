import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, withLatestFrom } from 'rxjs/operators';

import { of } from 'rxjs';

import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import * as Data from '@data';
import * as TipoMonedaActions from './tipo-moneda.actions';

@Injectable()
export class TipoMonedaEffects {
  constructor(
    private actions$: Actions,
    private tipoMonedaService: Data.TipoMonedaService,
    private authFacade: AuthFacade
  ) {}

  getTiposMoneda$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TipoMonedaActions.getTiposMoneda),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([data, profile]) =>
        this.tipoMonedaService.getTiposMoneda(profile.id).pipe(
          map((tipos_moneda: Data.TipoMoneda[]) =>
            TipoMonedaActions.getTiposMonedaSuccess({ tipos_moneda })
          ),
          catchError(error =>
            of(TipoMonedaActions.getTiposMonedaError({ error }))
          )
        )
      )
    )
  );
}
