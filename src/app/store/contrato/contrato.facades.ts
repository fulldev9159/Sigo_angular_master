import { Injectable } from '@angular/core';
import { AgenciaContrato, PerfilesUsuario, Response } from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as contratoSelectors from './contrato.selectors';
import * as contratoActions from './contrato.actions';

@Injectable({
  providedIn: 'root',
})
export class ContratoFacade {
  constructor(private store: Store<any>) {}

  // GET AGENCIAS DE UN CONTRATO
  public getAgenciasContrato(contrato_id: number): void {
    this.store.dispatch(contratoActions.getAgenciasContrato({ contrato_id }));
  }

  public getAgenciasContrato$(): Observable<AgenciaContrato[]> {
    return this.store.select(contratoSelectors.getAgenciasContrato);
  }
}
