import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Accion, DetalleOT, Response } from '@model';
import { OTDetalleFacade } from '@storeOT/ot-detalle/ot-detalle.facades';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { OtDetalleHttpService } from 'src/app/core/service/ot-detalle-http.service';

@Injectable({ providedIn: 'root' })
export class AccionesOTResolver implements Resolve<Accion[]> {
  constructor(
    private service: OtDetalleHttpService,
    private OTDetalleFacade: OTDetalleFacade,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Accion[]> | Promise<Accion[]> {
    const idStr = route.paramMap.get('id');

    const id = parseInt(idStr, 10);
    // 93 TODO: CREAR UN PAGINA NOT-FOUND
    if (isNaN(id)) {
      this.router.navigate([`/not-found`], { skipLocationChange: true });
      return null;
    }
    return this.service.getAccionesOT(id).pipe(
      tap(acciones => {
        this.OTDetalleFacade.accionesOTSuccess(acciones);
      }),
      catchError(error => {
        this.OTDetalleFacade.accionesOTError(error);
        return EMPTY;
      })
    );
  }
}
