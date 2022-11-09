import { Injectable } from '@angular/core';
import { OTFromNumeroInterno, TipoNumeroInterno } from '@model';
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

  // CREATE OT CONTRATO FIJO : GET OT FROM NUMERO INTERNO
  public getOTFromNumeroInterno(
    tipo_numero_interno_id: number,
    numero_interno: string
  ): void {
    this.store.dispatch(
      numeroInternoActions.getOTFromNumeroInterno({
        tipo_numero_interno_id,
        numero_interno,
      })
    );
  }

  public getOTFromNumeroInterno$(): Observable<OTFromNumeroInterno[]> {
    return this.store.select(numeroInternoSelectors.getOTFromNumeroInterno);
  }
}
