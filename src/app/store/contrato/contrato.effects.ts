import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService, ContratoHttpService } from '@services';
import { Router } from '@angular/router';
import * as contratoActions from './contrato.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ContratoEffects {
  constructor(
    private actions$: Actions,
    private contratoHttpService: ContratoHttpService,
    private afterHttp: AfterHttpService,
    private router: Router
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

  getContratos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contratoActions.getContratos),
      concatMap(() =>
        this.contratoHttpService.getAllContratos().pipe(
          map(response => contratoActions.getContratosSuccess({ response })),
          catchError(error => of(contratoActions.getContratosError({ error })))
        )
      )
    )
  );

  getSingleContrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contratoActions.getSingleContrato),
      concatMap(({ contrato_id }) =>
        this.contratoHttpService.getAllContratos().pipe(
          map(response =>
            contratoActions.getSingleContratoSuccess({ contrato_id, response })
          ),
          catchError(error => of(contratoActions.getContratosError({ error })))
        )
      )
    )
  );

  updateContrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contratoActions.updateContrato),
      concatMap(({ request }) =>
        this.contratoHttpService.updateContrato(request).pipe(
          map(response => contratoActions.updateContratoSuccess({ response })),
          catchError(error =>
            of(contratoActions.updateContratoError({ error }))
          )
        )
      )
    )
  );

  ActivateContrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contratoActions.activateContrato),
      concatMap(({ request }) =>
        this.contratoHttpService.activateContrato(request).pipe(
          map(response =>
            contratoActions.activateContratoSuccess({ response })
          ),
          catchError(error =>
            of(contratoActions.activateContratoError({ error }))
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
          contratoActions.getTipoServiciosContratoSuccess,
          contratoActions.updateContratoSuccess,
          contratoActions.activateContratoSuccess
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
          contratoActions.getTipoServiciosContratoError,
          contratoActions.getContratosError,
          contratoActions.updateContratoError,
          contratoActions.activateContratoError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );

  redirectAfterSaveContratoSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          //// contratoActions.createContratoSuccess,
          contratoActions.updateContratoSuccess
        ),
        tap(() =>
          this.router.navigate(['/administracion/contratos/list-contratos'])
        )
      ),
    { dispatch: false }
  );
}
