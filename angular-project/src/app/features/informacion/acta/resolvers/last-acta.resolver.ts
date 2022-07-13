import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { ActaService, LastActa, OTService, Response } from '@data';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface ResolverResponse {
  response: Response<LastActa>;
}

@Injectable({ providedIn: 'root' })
export class LastActaResolver implements Resolve<ResolverResponse> {
  constructor(private router: Router, private service: ActaService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<ResolverResponse>
    | Promise<ResolverResponse>
    | ResolverResponse {
    const ot_id = +route.paramMap.get('id');

    return this.service.getLastActa(ot_id).pipe(
      map(response => ({
        response,
      })),
      catchError(err =>
        of({
          response: {
            status: err.error.status,
            code: err.error.code,
            data: null,
          },
        })
      )
    );
  }
}
