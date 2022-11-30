import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { DetalleCubicacion, DetalleOT, Response } from '@model';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { OTDetalleFacade } from '@storeOT/ot-detalle/ot-detalle.facades';
import {
  catchError,
  EMPTY,
  map,
  mergeMap,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { OtDetalleHttpService } from 'src/app/core/service/ot-detalle-http.service';
import { CubicacionHttpService } from '../service/cubicacion-http.service';

@Injectable({ providedIn: 'root' })
export class DetalleCubicacionIngFromOTResolver
  implements Resolve<Response<DetalleCubicacion>>
{
  constructor(
    private service: OtDetalleHttpService,
    private cubicacionService: CubicacionHttpService,
    private OTDetalleFacade: OTDetalleFacade,
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
    // 93 TODO: CREAR UN PAGINA NOT-FOUND
    if (isNaN(id)) {
      this.router.navigate([`/not-found`], { skipLocationChange: true });
      return null;
    }
    return this.service.getDetalleOT(id).pipe(
      mergeMap(response => {
        return this.cubicacionService
          .getDetalleCubicacion(response.data.ot.cubicacion_ing_id)
          .pipe(
            map(response => {
              this.cubicacionFacade.detalleCubicacionIngenieriaSuccess(
                response.data
              );
              return response;
            }),
            catchError(error => {
              this.cubicacionFacade.detalleCubicacionIngenieriaError(error);
              return EMPTY;
            })
          );
      }),
      catchError(error => {
        this.OTDetalleFacade.getDetalleOTError(error);
        return EMPTY;
      })
    );
  }
}
