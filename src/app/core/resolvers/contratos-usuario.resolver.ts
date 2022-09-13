import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { ContratosUser, Response } from '@model';
import { UsuarioHttpService } from '@services';
import { UsuarioFacade } from '@storeOT/usuario/usuario.facades';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContratosUsuarioResolver
  implements Resolve<Response<{ items: ContratosUser[] }>>
{
  constructor(
    private service: UsuarioHttpService,
    private usuarioFacade: UsuarioFacade
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<Response<{ items: ContratosUser[] }>>
    | Promise<Response<{ items: ContratosUser[] }>> {
    const user_id = JSON.parse(localStorage.getItem('auth')).sessionData
      .usuario_id;

    return this.service.getContratosUsuario(user_id).pipe(
      tap(response => {
        this.usuarioFacade.getContratosUsuarioSuccess(response);
      }),
      catchError(error => {
        this.usuarioFacade.getContratosUsuarioError(error);
        return EMPTY;
      })
    );
  }
}
