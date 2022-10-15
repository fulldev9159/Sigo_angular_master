import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { DetalleServicio4Acta, Response } from '@model';
import { ActaHttpService } from '@services';
import { ActaFacade } from '@storeOT/acta/acta.facades';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Servicios4ActaResolver
  implements Resolve<Response<{ items: DetalleServicio4Acta[] }>>
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
    | Observable<Response<{ items: DetalleServicio4Acta[] }>>
    | Promise<Response<{ items: DetalleServicio4Acta[] }>> {
    const idStr = route.paramMap.get('id');

    const id = parseInt(idStr, 10);
    // 93 TODO: CREAR UN PAGINA NOT-FOUND
    if (isNaN(id)) {
      this.router.navigate([`/not-found`], { skipLocationChange: true });
      return null;
    }
    return this.service.getServicios4Acta(id).pipe(
      tap(response => {
        this.actaFacade.getServicios4ActaSuccess(response);
      }),
      catchError(error => {
        this.actaFacade.getServicios4ActaError(error);
        return EMPTY;
      })
    );
  }
}
