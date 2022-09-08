import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Cubicacion, DetalleCubicacion, Response } from '@model';
import { CubicacionHttpService } from '@services';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DetalleCubicacionResolver
  implements Resolve<Response<DetalleCubicacion>>
{
  constructor(
    private service: CubicacionHttpService,
    private cubicacionFacade: CubicacionFacade,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<Response<DetalleCubicacion>>
    | Promise<Response<DetalleCubicacion>> {
    const idStr = route.paramMap.get('id');

    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      this.router.navigate([`/not-found`], { skipLocationChange: true });
      return null;
    }
    return this.service.getDetalleCubicacion(id).pipe(
      tap(response => {
        this.cubicacionFacade.detalleCubicacionSuccess(response);
      }),
      catchError(error => {
        this.cubicacionFacade.detalleCubicacionError(error);
        return EMPTY;
      })
    );
  }
}
