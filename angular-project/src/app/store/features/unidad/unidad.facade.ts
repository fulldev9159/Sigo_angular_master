import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UnidadActions from './unidad.actions';
import * as UnidadSelectors from './unidad.selectors';
import * as Data from '@data';

@Injectable({
  providedIn: 'root',
})
export class UnidadFacade {
  constructor(private store: Store<Data.Unidad>) {}

  public resetData(): void {
    this.store.dispatch(UnidadActions.resetData());
  }

  public getUnidades(): void {
    this.store.dispatch(UnidadActions.getUnidades());
  }

  public getUnidades$(): Observable<Data.Unidad[]> {
    return this.store.select(UnidadSelectors.getUnidades);
  }
}
