import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import * as Data from '@data';
import { OtFacade } from '@storeOT/index';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface ResolverResponse {
  response: Data.Response<any>;
}

@Injectable({ providedIn: 'root' })
export class ComentariosFinalizacionTrabajosResolver
  implements Resolve<ResolverResponse>
{
  constructor(
    private router: Router,
    private service: Data.ActaService,
    private otFacade: OtFacade
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<ResolverResponse>
    | Promise<ResolverResponse>
    | ResolverResponse {
    const ot_id = +route.paramMap.get('id');

    return this.service.getComentatiosfinalizacionTrabajos(ot_id).pipe(
      map(response => {
        this.otFacade.getComentariosFinalizacionTrabajosSuccess(response);
        return { response };
      }),
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
