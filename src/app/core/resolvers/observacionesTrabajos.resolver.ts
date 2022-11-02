import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Response } from '@model';
import { ActaHttpService } from '@services';
import { ActaFacade } from '@storeOT/acta/acta.facades';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ObservacionesTrabajosResolver
  implements
    Resolve<Response<{ ot_id: number; acta_id: number; observacion: string }>>
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
    | Observable<
        Response<{ ot_id: number; acta_id: number; observacion: string }>
      >
    | Promise<
        Response<{ ot_id: number; acta_id: number; observacion: string }>
      > {
    const idStr = route.paramMap.get('id');

    const id = parseInt(idStr, 10);
    // 93 TODO: CREAR UN PAGINA NOT-FOUND
    if (isNaN(id)) {
      this.router.navigate([`/not-found`], { skipLocationChange: true });
      return null;
    }
    return this.service.getComentatiosfinalizacionTrabajos(id).pipe(
      tap(response => {
        this.actaFacade.getComentariosFinalizacionTrabajosSuccess(
          response.data.observacion
        );
      }),
      catchError(error => {
        this.actaFacade.getComentariosFinalizacionTrabajosError(error);
        return EMPTY;
      })
    );
  }
}
