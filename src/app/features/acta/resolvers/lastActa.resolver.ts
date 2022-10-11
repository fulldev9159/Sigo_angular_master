import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { DetalleServicio4Acta, LastActa, Response } from '@model';
import { ActaHttpService } from '@services';
import { ActaFacade } from '@storeOT/acta/acta.facades';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LastActaResolver implements Resolve<Response<LastActa>> {
  constructor(
    private service: ActaHttpService,
    private actaFacade: ActaFacade,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Response<LastActa>> | Promise<Response<LastActa>> {
    const idStr = route.paramMap.get('id');

    const id = parseInt(idStr, 10);
    // 93 TODO: CREAR UN PAGINA NOT-FOUND
    if (isNaN(id)) {
      this.router.navigate([`/not-found`], { skipLocationChange: true });
      return null;
    }
    return this.service.getLastActa(id).pipe(
      tap(response => {
        this.actaFacade.getLastActaSuccess(response);
      }),
      catchError(error => {
        this.actaFacade.getLastActaError(error);
        return EMPTY;
      })
    );
  }
}
