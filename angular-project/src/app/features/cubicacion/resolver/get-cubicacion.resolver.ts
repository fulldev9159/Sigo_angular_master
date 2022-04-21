import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as Service from '@data';
import { RespDataGetDetalleCubs } from '@data/model';

interface Response {
  cubicacion: RespDataGetDetalleCubs;
}

@Injectable({ providedIn: 'root' })
export class GetCubicacionResolver implements Resolve<Response> {
  constructor(
    private router: Router,
    private cubicacion: Service.CubicacionService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Response> | Response {
    const idStr = route.paramMap.get('id');

    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      this.router.navigate([`/not-found`], { skipLocationChange: true });
      return null;
    }

    return this.cubicacion.getDetalleCub(id).pipe(
      map(response => {
        if (response.status.code !== 0) {
          throw new Error(
            `error al intentar encontrar la cubicacion [${response.status.desc}]`
          );
        }

        const cubicacion = response.data;

        if (
          cubicacion.servicios === null &&
          cubicacion.data_cubicacion.length === 0
        ) {
          throw new Error(`cubicacion no existe`);
        }

        return {
          cubicacion,
        };
      }),
      catchError(err => {
        this.router.navigate([`/not-found`], { skipLocationChange: true });
        return throwError(new Error('cubicacion no encontrada'));
      })
    );
  }
}
