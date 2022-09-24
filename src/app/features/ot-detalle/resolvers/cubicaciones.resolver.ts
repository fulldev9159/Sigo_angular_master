import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Cubicacion, DetalleOT, Response } from '@model';
import { CubicacionHttpService } from '@services';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DetalleOTResolver implements Resolve<Response<DetalleOT>> {
  constructor(
    private service: CubicacionHttpService,
    private cubicacionFacade: CubicacionFacade
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Response<DetalleOT>> | Promise<Response<DetalleOT>> {
    return this.service.getCubicaciones().pipe(
      tap(response => {
        this.cubicacionFacade.listarCubicacionesSuccess(response);
      }),
      catchError(error => {
        this.cubicacionFacade.listarCubicacionesError(error);
        return EMPTY;
      })
    );
  }
}
