import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Response, TipoCubicacion } from '@model';
import { CubicacionHttpService } from '@services';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TipoCubicacionResolver
  implements Resolve<Response<{ items: TipoCubicacion[] }>>
{
  constructor(
    private service: CubicacionHttpService,
    private cubicacionFacade: CubicacionFacade
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<Response<{ items: TipoCubicacion[] }>>
    | Promise<Response<{ items: TipoCubicacion[] }>> {
    return this.service.getTipoCubicacion().pipe(
      tap(response => {
        this.cubicacionFacade.getTipoCubicacionSuccess(response);
      }),
      catchError(error => {
        this.cubicacionFacade.getTipoCubicacionError(error);
        return EMPTY;
      })
    );
  }
}
