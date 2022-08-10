import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import {
  DataRespGetDetalleOT,
  DetalleInformeAvance,
  InformeAvanceService,
  OTService,
  Response,
} from '@data';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DetalleOTResolver
  implements Resolve<Response<DataRespGetDetalleOT>>
{
  constructor(private service: OTService, private otFacade: OtFacade) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<Response<DataRespGetDetalleOT>>
    | Promise<Response<DataRespGetDetalleOT>> {
    const ot_id = +route.paramMap.get('id');

    return this.service.getDetalleOT(ot_id).pipe(
      tap(response => {
        this.otFacade.getDetalleOTSuccess(response);
      }),
      catchError(error => {
        this.otFacade.getDetalleOTError(error);
        return EMPTY;
      })
    );
  }
}
