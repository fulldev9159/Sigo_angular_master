import { Injectable } from '@angular/core';
import { ContratoMarco } from '@data';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as contratosActions from './contratos.actions';
import * as areaSelectors from './contratos.selectors';

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
    return this.store.select(areaSelectors.getContratos);
  }

  // public getAreaSelected(area_id: number): void {
  //   this.store.dispatch(contratosActions.getArea({ area_id }));
  // }

  // public getAreaSelected$(): Observable<Area> {
  //   return this.store.select(areaSelectors.getAreaSelected);
  // }

  // public updateArea(request: RequestEditArea): void {
  //   this.store.dispatch(contratosActions.updateArea({ request }));
  // }
}
