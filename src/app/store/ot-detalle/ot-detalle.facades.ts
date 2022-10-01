import { Injectable } from '@angular/core';
import { Accion, DetalleOT, Response } from '@model';
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

  // GET ACCIONES OT
  public accionesOT(ot_id: number): void {
    this.store.dispatch(otDetalleActions.getAccionesOT({ ot_id }));
  }

  public accionesOTSuccess(acciones: Accion[]): void {
    this.store.dispatch(otDetalleActions.getAccionesOTSuccess({ acciones }));
  }

  public accionesOTError(error: any): void {
    this.store.dispatch(otDetalleActions.getAccionesOTTError({ error }));
  }

  public accionesOT$(): Observable<Accion[]> {
    return this.store.select(otDetalleSelectors.accionesOT);
  }
}
