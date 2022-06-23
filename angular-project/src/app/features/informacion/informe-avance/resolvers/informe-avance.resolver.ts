import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import * as Data from '@data';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface ResolverResponse {
  response: Data.Response<Data.DetalleInformeAvance>;
}

@Injectable({ providedIn: 'root' })
export class InformeAvanceResolver implements Resolve<ResolverResponse> {
  constructor(private router: Router, private service: Data.OTService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<ResolverResponse>
    | Promise<ResolverResponse>
    | ResolverResponse {
    const ot_id = +route.paramMap.get('id');

    return this.service.getDetalleInformeAvance(ot_id).pipe(
      map(response => ({
        response,
      })),
      catchError(err => {
        this.router.navigate([`/not-found`], { skipLocationChange: true });
        return throwError(new Error('detalle informe avance not found'));
      })
    );
  }
}
