import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { CategoriaArchivo, Response } from '@model';
import { LibroObrasHttpService } from '@services';
import { OTDetalleFacade } from '@storeOT/ot-detalle/ot-detalle.facades';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriaArchivosResolver
  implements Resolve<Response<{ items: CategoriaArchivo[] }>>
{
  constructor(
    private service: LibroObrasHttpService,
    private otDetalleFacade: OTDetalleFacade
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<Response<{ items: CategoriaArchivo[] }>>
    | Promise<Response<{ items: CategoriaArchivo[] }>> {
    return this.service.getCategoriasArchivos().pipe(
      tap(response => {
        this.otDetalleFacade.getCategoriasArchivosSuccess(response.data.items);
      }),
      catchError(error => {
        this.otDetalleFacade.getCategoriasArchivosError(error);
        return EMPTY;
      })
    );
  }
}
