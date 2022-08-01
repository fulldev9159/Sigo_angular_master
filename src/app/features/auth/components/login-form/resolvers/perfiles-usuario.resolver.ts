import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { PerfilesUsuario, Response } from '@model';
import { PerfilesHttpService } from '@services';
import { PerfilFacade } from '@storeOT/perfil/perfil.facades';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PerfilesUsuarioResolver
  implements Resolve<Response<{ perfiles: PerfilesUsuario[] }>>
{
  constructor(
    private service: PerfilesHttpService,
    private perfilFacade: PerfilFacade
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<Response<{ perfiles: PerfilesUsuario[] }>>
    | Promise<Response<{ perfiles: PerfilesUsuario[] }>> {
    const user_id = JSON.parse(localStorage.getItem('auth')).sessionData
      .usuario_id;

    return this.service.getPerfilesUsuario(user_id).pipe(
      tap(response => {
        console.log(response);
        this.perfilFacade.getPerfilesUsuarioSuccess(response);
      }),
      catchError(error => {
        console.log(error);
        this.perfilFacade.getPerfilesUsuarioError(error);
        return EMPTY;
      })
    );
  }
}
