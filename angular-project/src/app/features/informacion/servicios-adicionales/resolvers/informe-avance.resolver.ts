import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DetalleInformeAvance, InformeAvanceService, Response } from '@data';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class InformeAvanceResolver2
  implements Resolve<Response<DetalleInformeAvance>>
{
  constructor(
    private service: InformeAvanceService,
    private otFacade: OtFacade
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<Response<DetalleInformeAvance>>
    | Promise<Response<DetalleInformeAvance>> {
    const ot_id = +route.paramMap.get('id');

    return this.service.getDetalleInformeAvance(ot_id).pipe(
      tap(response => {
        this.otFacade.getDetalleInformeAvanceSuccess(response);
      }),
      catchError(error => {
        this.otFacade.getDetalleInformeAvanceError(error);
        return EMPTY;
      })
    );
  }
}
