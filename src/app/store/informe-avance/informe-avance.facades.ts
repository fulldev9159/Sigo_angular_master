import { Injectable } from '@angular/core';
import { DetalleInformeAvance, Response } from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as informeAvanceSelectors from './informe-avance.selectors';
import * as informeAvanceActions from './informe-avance.actions';

@Injectable({
  providedIn: 'root',
})
export class InformeAvanceFacade {
  constructor(private store: Store<any>) {}

  // GET DETALLE INFORME AVANCE
  public getDetalleInformeAvance(ot_id: number): void {
    this.store.dispatch(
      informeAvanceActions.getDetalleInformeAvance({ ot_id })
    );
  }

  public getDetalleInformeAvanceSuccess(
    response: Response<DetalleInformeAvance>
  ): void {
    this.store.dispatch(
      informeAvanceActions.getDetalleInformeAvanceSuccess({ response })
    );
  }
  public getDetalleInformeAvanceError(error: any): void {
    this.store.dispatch(
      informeAvanceActions.getDetalleInformeAvanceError({ error })
    );
  }

  public getDetalleInformeAvance$(): Observable<DetalleInformeAvance> {
    return this.store.select(informeAvanceSelectors.getDetalleInformeAvance);
  }
}
