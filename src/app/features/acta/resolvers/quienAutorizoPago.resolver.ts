import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {
  DetalleServicio4Acta,
  LastActa,
  QuienAutorizoActa,
  Response,
} from '@model';
import { ActaHttpService } from '@services';
import { ActaFacade } from '@storeOT/acta/acta.facades';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuienAutorizoPagoResolver
  implements Resolve<Response<{ items: QuienAutorizoActa[] }>>
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
    | Observable<Response<{ items: QuienAutorizoActa[] }>>
    | Promise<Response<{ items: QuienAutorizoActa[] }>> {
    const idStr = route.paramMap.get('id');

    const id = parseInt(idStr, 10);
    // 93 TODO: CREAR UN PAGINA NOT-FOUND
    if (isNaN(id)) {
      this.router.navigate([`/not-found`], { skipLocationChange: true });
      return null;
    }
    return this.service.quienAutorizoPago(id).pipe(
      tap(response => {
        this.actaFacade.quienAutorizoPagoSuccess(response.data.items);
      }),
      catchError(error => {
        this.actaFacade.quienAutorizoPagoError(error);
        return EMPTY;
      })
    );
  }
}
