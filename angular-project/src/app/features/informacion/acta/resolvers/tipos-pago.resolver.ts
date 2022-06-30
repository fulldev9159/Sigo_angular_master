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
  response: Data.Response<{ items: Data.ActaTipoPago[] }>;
}

@Injectable({ providedIn: 'root' })
export class TiposPagoResolver implements Resolve<ResolverResponse> {
  constructor(private router: Router, private service: Data.OTService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<ResolverResponse>
    | Promise<ResolverResponse>
    | ResolverResponse {
    //// const ot_id = +route.paramMap.get('id');

    return this.service.getActaTiposPago().pipe(
      map(response => ({
        response,
      })),
      catchError(err =>
        of({
          response: {
            status: err.error.status,
            code: err.error.code,
            data: {
              items: [],
            },
          },
        })
      )
    );
  }
}
