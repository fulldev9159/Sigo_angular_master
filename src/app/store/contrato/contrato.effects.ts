import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService, ContratoHttpService } from '@services';
import * as contratoActions from './contrato.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ContratoEffects {
  constructor(
    private actions$: Actions,
    private contratoHttpService: ContratoHttpService,
    private afterHttp: AfterHttpService
  ) {}

  getAgenciasContrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contratoActions.getAgenciasContrato),
      concatMap(({ contrato_id }) =>
        this.contratoHttpService.getAgenciasContrato(contrato_id).pipe(
          map(response =>
            contratoActions.getAgenciasContratoSuccess({ response })
          ),
          catchError(error =>
            of(contratoActions.getAgenciasContratoError({ error }))
          )
        )
      )
    )
  );

  getActividadesContratoProveedor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contratoActions.getActividadesContratoProveedor),
      concatMap(({ cmarco_has_proveedor }) =>
        this.contratoHttpService
          .getActividadesContratoProveedor(cmarco_has_proveedor)
          .pipe(
            map(response =>
              contratoActions.getActividadesContratoProveedorSuccess({
                response,
              })
            ),
            catchError(error =>
              of(
                contratoActions.getActividadesContratoProveedorError({ error })
              )
            )
          )
      )
    )
  );

  getTipoServiciosContrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contratoActions.getTipoServiciosContrato),
      concatMap(({ actividad_id, contrato_marco_id }) =>
        this.contratoHttpService
          .getTipoServiciosContrato(actividad_id, contrato_marco_id)
          .pipe(
            map(response =>
              contratoActions.getTipoServiciosContratoSuccess({
                response,
              })
            ),
            catchError(error =>
              of(contratoActions.getTipoServiciosContratoError({ error }))
            )
          )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          contratoActions.getAgenciasContratoSuccess,
          contratoActions.getActividadesContratoProveedorSuccess,
          contratoActions.getTipoServiciosContratoSuccess
        ),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          contratoActions.getAgenciasContratoError,
          contratoActions.getActividadesContratoProveedorError,
          contratoActions.getTipoServiciosContratoError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
