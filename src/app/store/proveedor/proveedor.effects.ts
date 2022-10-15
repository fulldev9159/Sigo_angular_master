import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AfterHttpService,
  ContratoHttpService,
  ProveedorHttpService,
} from '@services';
import * as proveedorActions from './proveedor.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProveedorEffects {
  constructor(
    private actions$: Actions,
    private proveedorHttpService: ProveedorHttpService,
    private afterHttp: AfterHttpService
  ) {}

  getProveedoresAgenciaContrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(proveedorActions.getProveedoresAgenciaContrato),
      concatMap(({ agencia_id, contrato_id }) =>
        this.proveedorHttpService
          .getProveedoresAgenciaContrato(agencia_id, contrato_id)
          .pipe(
            map(response =>
              proveedorActions.getProveedoresAgenciaContratoSuccess({
                response,
              })
            ),
            catchError(error =>
              of(proveedorActions.getProveedoresAgenciaContratoError({ error }))
            )
          )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(proveedorActions.getProveedoresAgenciaContratoSuccess),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(proveedorActions.getProveedoresAgenciaContratoError),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
