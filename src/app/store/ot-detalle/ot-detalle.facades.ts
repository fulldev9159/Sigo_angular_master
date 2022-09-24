import { Injectable } from '@angular/core';
import { DetalleOT, Response } from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as otDetalleSelectors from './ot-detalle.selectors';
import * as otDetalleActions from './ot-detalle.actions';

@Injectable({
  providedIn: 'root',
})
export class OTDetalleFacade {
  constructor(private store: Store<any>) {}

  // GET DETALLE OT
  public getDetalleOT(id: number): void {
    this.store.dispatch(otDetalleActions.getDetalleOT({ id }));
  }

  public getDetalleOTSuccess(response: Response<DetalleOT>): void {
    this.store.dispatch(otDetalleActions.getDetalleOTSuccess({ response }));
  }

  public getDetalleOTError(error: any): void {
    this.store.dispatch(otDetalleActions.getDetalleOTError({ error }));
  }

  public getDetalleOT$(): Observable<DetalleOT> {
    return this.store.select(otDetalleSelectors.detalleOT);
  }
}
