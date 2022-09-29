import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { DetalleOT, Response } from '@model';
import { OTDetalleFacade } from '@storeOT/ot-detalle/ot-detalle.facades';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { OtDetalleHttpService } from 'src/app/core/service/ot-detalle-http.service';

@Injectable({ providedIn: 'root' })
export class DetalleOTResolver implements Resolve<Response<DetalleOT>> {
  constructor(
    private service: OtDetalleHttpService,
    private OTDetalleFacade: OTDetalleFacade,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Response<DetalleOT>> | Promise<Response<DetalleOT>> {
    const idStr = route.paramMap.get('id');

    const id = parseInt(idStr, 10);
    // TODO: CREAR UN PAGINA NOT-FOUND
    if (isNaN(id)) {
      this.router.navigate([`/not-found`], { skipLocationChange: true });
      return null;
    }
    return this.service.getDetalleOT(id).pipe(
      tap(response => {
        this.OTDetalleFacade.getDetalleOTSuccess(response);
      }),
      catchError(error => {
        this.OTDetalleFacade.getDetalleOTError(error);
        return EMPTY;
      })
    );
  }
}
