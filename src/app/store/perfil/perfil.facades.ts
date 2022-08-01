import { Injectable } from '@angular/core';
import { PerfilesUsuario } from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as perfilSelectors from './perfil.selectors';
import * as perfilActions from './perfil.actions';

@Injectable({
  providedIn: 'root',
})
export class PerfilFacade {
  constructor(private store: Store<any>) {}

  public getPerfilesUsuario(usuario_id: number): void {
    this.store.dispatch(perfilActions.getPerfilesUsuario({ usuario_id }));
  }

  public getPerfilesUsuario$(): Observable<PerfilesUsuario[]> {
    return this.store.select(perfilSelectors.getPerfilesUsuario);
  }
}
