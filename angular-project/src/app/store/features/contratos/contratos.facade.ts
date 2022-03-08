import { Injectable } from '@angular/core';
import { ContratoMarco, ReqActivarContrato, ReqEditContrato } from '@data';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as contratosActions from './contratos.actions';
import * as contratoSelectors from './contratos.selectors';

@Injectable({
  providedIn: 'root',
})
export class ContratoFacade {
  constructor(private store: Store<any>) {}

  public reset(): void {
    this.store.dispatch(contratosActions.reset());
  }

  public getAllContratos(): void {
    this.store.dispatch(contratosActions.getContratos());
  }

  public getAllContratos$(): Observable<ContratoMarco[]> {
    return this.store.select(contratoSelectors.getContratos);
  }

  public getSingleContratoSelected(contrato_id: number): void {
    this.store.dispatch(contratosActions.getSingleContrato({ contrato_id }));
  }

  public getSingleContratoSelected$(): Observable<ContratoMarco> {
    return this.store.select(contratoSelectors.getContratoSelected);
  }

  public updateContrato(request: ReqEditContrato): void {
    this.store.dispatch(contratosActions.updateContrato({ request }));
  }

  public ActivateContrato(request: ReqActivarContrato): void {
    this.store.dispatch(contratosActions.activateContrato({ request }));
  }
}
