import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, withLatestFrom } from 'rxjs/operators';

import { of } from 'rxjs';

import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import * as Data from '@data';
import * as TipoNumeroInternoActions from './tipo-numero-interno.actions';

@Injectable()
export class TipoNumeroInternoEffects {
  constructor(
    private actions$: Actions,
    private tipoNumeroInternoService: Data.TipoNumeroInternoService,
    private authFacade: AuthFacade
  ) {}

  getTiposNumeroInterno$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TipoNumeroInternoActions.getTiposNumeroInterno),
      concatMap(() =>
        this.tipoNumeroInternoService.getTiposNumeroInterno().pipe(
          map((response: Data.ResponseTipoNumeroInterno) =>
            TipoNumeroInternoActions.getTiposNumeroInternoSuccess({
              tiposNumeroInterno: response.data.items,
            })
          ),
          catchError(error =>
            of(TipoNumeroInternoActions.getTiposNumeroInternoError({ error }))
          )
        )
      )
    )
  );
}
