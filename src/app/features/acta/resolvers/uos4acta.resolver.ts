import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { DetalleUO4Acta, Response } from '@model';
import { ActaHttpService } from '@services';
import { ActaFacade } from '@storeOT/acta/acta.facades';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UOs4ActaResolver
  implements Resolve<Response<{ items: DetalleUO4Acta[] }>>
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
    | Observable<Response<{ items: DetalleUO4Acta[] }>>
    | Promise<Response<{ items: DetalleUO4Acta[] }>> {
    const idStr = route.paramMap.get('id');

    const id = parseInt(idStr, 10);
    // 93 TODO: CREAR UN PAGINA NOT-FOUND
    if (isNaN(id)) {
      this.router.navigate([`/not-found`], { skipLocationChange: true });
      return null;
    }
    return this.service.getUOs4Acta(id).pipe(
      tap(response => {
        this.actaFacade.getUOs4ActaSuccess(response);
      }),
      catchError(error => {
        this.actaFacade.getUOs4ActaError(error);
        return EMPTY;
      })
    );
  }
}
