import { Injectable } from '@angular/core';
import { ContratosUser, PerfilesUsuario, Response } from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as usuarioSelectors from './ususario.selectors';
import * as usuarioActions from './usuario.actions';

@Injectable({
  providedIn: 'root',
})
export class UsuarioFacade {
  constructor(private store: Store<any>) {}

  // GET CONTRATOS USUARIO
  public getContratosUsuario(usuario_id: number): void {
    this.store.dispatch(usuarioActions.getContratosUsuario({ usuario_id }));
  }

  public getContratosUsuarioSuccess(
    response: Response<{ items: ContratosUser[] }>
  ): void {
    this.store.dispatch(
      usuarioActions.getContratosUsuarioSuccess({ response })
    );
  }

  public getContratosUsuarioError(error: any) {
    this.store.dispatch(usuarioActions.getContratosUsuarioError({ error }));
  }

  public getContratosUsuario$(): Observable<ContratosUser[]> {
    return this.store.select(usuarioSelectors.getContratosUsuario);
  }
}
