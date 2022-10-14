import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RegistroLibroDeObras, Response } from '@model';
import { OTDetalleFacade } from '@storeOT/ot-detalle/ot-detalle.facades';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { LibroObrasHttpService } from '../service/libro-obras-http.service';

@Injectable({ providedIn: 'root' })
export class RegistroLibroLobrasResolver
  implements Resolve<Response<RegistroLibroDeObras[]>>
{
  constructor(
    private service: LibroObrasHttpService,
    private OTDetalleFacade: OTDetalleFacade,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<Response<RegistroLibroDeObras[]>>
    | Promise<Response<RegistroLibroDeObras[]>> {
    const idStr = route.paramMap.get('id');

    const id = parseInt(idStr, 10);
    // 93 TODO: CREAR UN PAGINA NOT-FOUND
    if (isNaN(id)) {
      this.router.navigate([`/not-found`], { skipLocationChange: true });
      return null;
    }
    return this.service.getLibroObras(id).pipe(
      tap(response => {
        this.OTDetalleFacade.getLibroObrassSuccess(response.data);
      }),
      catchError(error => {
        this.OTDetalleFacade.getLibroObrasError(error);
        return EMPTY;
      })
    );
  }
}
