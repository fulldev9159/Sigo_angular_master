import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService, LibroObrasHttpService } from '@services';
import * as otDetalleActions from './ot-detalle.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OtDetalleHttpService } from 'src/app/core/service/ot-detalle-http.service';

@Injectable()
export class OTDetalleEffects {
  constructor(
    private actions$: Actions,
    private afterHttp: AfterHttpService,
    private otDetalleHttp: OtDetalleHttpService,
    private libroObrasHttp: LibroObrasHttpService
  ) {}

  // GET DETALLE OT
  getDetalleOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otDetalleActions.getDetalleOT),
      concatMap(({ id }) =>
        this.otDetalleHttp.getDetalleOT(id).pipe(
          map(response => otDetalleActions.getDetalleOTSuccess({ response })),
          catchError(error => of(otDetalleActions.getDetalleOTError({ error })))
        )
      )
    )
  );

  // GET ACCIONES OT
  getAccionesOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otDetalleActions.getAccionesOT),
      concatMap(({ ot_id }) =>
        this.otDetalleHttp.getAccionesOT(ot_id).pipe(
          map(acciones => otDetalleActions.getAccionesOTSuccess({ acciones })),
          catchError(error =>
            of(otDetalleActions.getAccionesOTTError({ error }))
          )
        )
      )
    )
  );

  // GET CATEGORIA ARCHIVOS
  getCategoriasArchivos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otDetalleActions.getCategoriasArchivos),
      concatMap(() =>
        this.libroObrasHttp.getCategoriasArchivos().pipe(
          map(response =>
            otDetalleActions.getCategoriasArchivosSuccess({
              categoriaArchivo: response.data.items,
            })
          ),
          catchError(error =>
            of(otDetalleActions.getCategoriasArchivosError({ error }))
          )
        )
      )
    )
  );

  // SUBIR ARCHIVO/REGISTRO LIBRO DE OBRAS
  subirArchivoLibroObrasYregistrarLibroObras$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otDetalleActions.subirArchivoLibroObrasYregistrarLibroObras),
      concatMap(({ categoria_id, files, request_libroobras }) =>
        this.libroObrasHttp
          .subirArchivo(categoria_id, 'LIBRO_OBRAS', files)
          .pipe(
            map(response => {
              return otDetalleActions.createRegistroLibroObras({
                request: {
                  ...request_libroobras,
                  archivos: response.data.repositorio_archivos_ids,
                },
              });
            }),
            catchError(error =>
              of(
                otDetalleActions.subirArchivoLibroObrasYregistrarLibroObrasError(
                  { error }
                )
              )
            )
          )
      )
    )
  );

  // CREATE REGISTRO LIBRO DE OBRAS
  createRegistroLibroObras$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otDetalleActions.createRegistroLibroObras),
      concatMap(({ request }) =>
        this.libroObrasHttp.createRegistroLibroObras(request).pipe(
          map(response =>
            otDetalleActions.createRegistroLibroObrasSuccess({ response })
          ),
          catchError(error =>
            of(otDetalleActions.createRegistroLibroObrasError({ error }))
          )
        )
      )
    )
  );

  // GET LIBRO OBRAS
  getLibroObras$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otDetalleActions.getLibroObras),
      concatMap(({ ot_id }) =>
        this.libroObrasHttp.getLibroObras(ot_id).pipe(
          map(response =>
            otDetalleActions.getLibroObrasSuccess({
              registrosLibroObras: response.data,
            })
          ),
          catchError(error =>
            of(otDetalleActions.getLibroObrasError({ error }))
          )
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          otDetalleActions.getDetalleOTSuccess,
          otDetalleActions.getAccionesOTSuccess,
          otDetalleActions.createRegistroLibroObrasSuccess
        ),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          otDetalleActions.getDetalleOTError,
          otDetalleActions.getAccionesOTTError,
          otDetalleActions.getCategoriasArchivosError,
          otDetalleActions.subirArchivoLibroObrasYregistrarLibroObrasError,
          otDetalleActions.createRegistroLibroObrasError,
          otDetalleActions.getLibroObrasError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
