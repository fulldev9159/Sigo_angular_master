import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TipoMonedaActions from './tipo-moneda.actions';
import * as TipoMonedaSelectors from './tipo-moneda.selectors';
import * as Data from '@data';

@Injectable({
  providedIn: 'root',
})
export class TipoMonedaFacade {
  constructor(private store: Store<Data.TipoMoneda>) {}

  public resetData(): void {
    this.store.dispatch(TipoMonedaActions.resetData());
  }

  public getTiposMoneda(): void {
    this.store.dispatch(TipoMonedaActions.getTiposMoneda());
  }

  public getTiposMoneda$(): Observable<Data.TipoMoneda[]> {
    return this.store.select(TipoMonedaSelectors.getTiposMoneda);
  }
}
