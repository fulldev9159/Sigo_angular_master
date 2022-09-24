import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { DetalleInformeAvance, Response } from '@model';
import { InformeAvanceHttpService } from '@services';
import { InformeAvanceFacade } from '@storeOT/informe-avance/informe-avance.facades';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DetalleInformeAvanceResolver
  implements Resolve<Response<DetalleInformeAvance>>
{
  constructor(
    private service: InformeAvanceHttpService,
    private iformeAvanceFacade: InformeAvanceFacade,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<Response<DetalleInformeAvance>>
    | Promise<Response<DetalleInformeAvance>> {
    const idStr = route.paramMap.get('id');

    const id = parseInt(idStr, 10);
    // TODO: CREAR UN PAGINA NOT-FOUND
    if (isNaN(id)) {
      this.router.navigate([`/not-found`], { skipLocationChange: true });
      return null;
    }
    return this.service.getDetalleInformeAvance(id).pipe(
      tap(response => {
        this.iformeAvanceFacade.getDetalleInformeAvanceSuccess(response);
      }),
      catchError(error => {
        this.iformeAvanceFacade.getDetalleInformeAvanceError(error);
        return EMPTY;
      })
    );
  }
}
