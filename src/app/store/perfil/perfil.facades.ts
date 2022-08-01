import { Injectable } from '@angular/core';
import { PerfilesUsuario, Response } from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as perfilSelectors from './perfil.selectors';
import * as perfilActions from './perfil.actions';

@Injectable({
  providedIn: 'root',
})
export class PerfilFacade {
  constructor(private store: Store<any>) {}

  // GET PERFILES USUARIO
  public getPerfilesUsuario(usuario_id: number): void {
    this.store.dispatch(perfilActions.getPerfilesUsuario({ usuario_id }));
  }

  public getPerfilesUsuarioSuccess(
    response: Response<{ perfiles: PerfilesUsuario[] }>
  ): void {
    this.store.dispatch(perfilActions.getPerfilesUsuarioSuccess({ response }));
  }

  public getPerfilesUsuarioError(error: any) {
    this.store.dispatch(perfilActions.getPerfilesUsuarioError({ error }));
  }

  public getPerfilesUsuario$(): Observable<PerfilesUsuario[]> {
    return this.store.select(perfilSelectors.getPerfilesUsuario);
  }
}
