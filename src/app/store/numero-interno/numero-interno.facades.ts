import { Injectable } from '@angular/core';
import { TipoNumeroInterno } from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as numeroInternoSelectors from './numero-interno.selectors';
import * as numeroInternoActions from './numero-interno.actions';

@Injectable({
  providedIn: 'root',
})
export class NumeroInternoFacade {
  constructor(private store: Store<any>) {}

  // CREATE OT CONTRATO FIJO : GET TIPOS DE NUMERO INTERNO
  public getTipoDeNumeroInterno(): void {
    this.store.dispatch(numeroInternoActions.getTipoDeNumeroInterno());
  }

  public getTipoDeNumeroInterno$(): Observable<TipoNumeroInterno[]> {
    return this.store.select(numeroInternoSelectors.getTipoDeNumeroInterno);
  }
}
