import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ActaTipoPago, Response } from '@model';
import { ActaHttpService } from '@services';
import { ActaFacade } from '@storeOT/acta/acta.facades';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActaTiposPagosResolver
  implements Resolve<Response<{ items: ActaTipoPago[] }>>
{
  constructor(
    private service: ActaHttpService,
    private actaFacade: ActaFacade,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<Response<{ items: ActaTipoPago[] }>>
    | Promise<Response<{ items: ActaTipoPago[] }>> {
    return this.service.getActaTiposPago().pipe(
      tap(response => {
        this.actaFacade.getActaTiposPagoSuccess(response);
      }),
      catchError(error => {
        this.actaFacade.getActaTiposPagoError(error);
        return EMPTY;
      })
    );
  }
}
