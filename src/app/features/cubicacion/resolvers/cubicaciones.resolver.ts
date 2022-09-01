import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Cubicacion, Response } from '@model';
import { CubicacionHttpService } from '@services';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CubicacionesResolver
  implements Resolve<Response<{ items: Cubicacion[] }>>
{
  constructor(
    private service: CubicacionHttpService,
    private cubicacionFacade: CubicacionFacade
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<Response<{ items: Cubicacion[] }>>
    | Promise<Response<{ items: Cubicacion[] }>> {
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
