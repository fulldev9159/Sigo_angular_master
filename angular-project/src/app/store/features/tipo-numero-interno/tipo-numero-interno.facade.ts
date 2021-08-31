import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TipoNumeroInternoActions from './tipo-numero-interno.actions';
import * as TipoNumeroInternoSelectors from './tipo-numero-interno.selectors';
import * as Data from '@data';

@Injectable({
  providedIn: 'root',
})
export class TipoNumeroInternoFacade {
  constructor(private store: Store<Data.TipoNumeroInterno>) {}

  public resetData(): void {
    this.store.dispatch(TipoNumeroInternoActions.resetData());
  }

  public getTiposNumeroInterno(): void {
    this.store.dispatch(TipoNumeroInternoActions.getTiposNumeroInterno());
  }

  public getTiposNumeroInterno$(): Observable<Data.TipoNumeroInterno[]> {
    return this.store.select(TipoNumeroInternoSelectors.getTiposNumeroInterno);
  }
}
