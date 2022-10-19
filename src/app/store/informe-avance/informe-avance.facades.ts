import { Injectable } from '@angular/core';
import {
  DetalleInformeAvance,
  RequestAdicionales,
  RequestAutorizarInformeAvance,
  RequestUpdateInformeAvance,
  Response,
} from '@model';
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

  // SEND DETALLE INFORME AVANCE
  public sendDetalleInformeAvance(ot_id: number): void {
    this.store.dispatch(
      informeAvanceActions.sendDetalleInformeAvance({ ot_id })
    );
  }

  // ACEPTACION RECHAZO INFORME AVANCE
  public AceptarRechazarInformeAvanceOT(
    request: RequestAutorizarInformeAvance
  ): void {
    this.store.dispatch(
      informeAvanceActions.AceptarRechazarInformeAvanceOT({ request })
    );
  }

  // ACTUALIZAR INFORME DE AVANCE Y ADICIONALES
  public actualizarInformeAvanceYAdicionales(
    request_informe_avance: RequestUpdateInformeAvance,
    request_adicionales: RequestAdicionales
  ): void {
    this.store.dispatch(
      informeAvanceActions.actualizarInformeAvanceYAdicionales({
        request_informe_avance,
        request_adicionales,
      })
    );
  }

  public actualizarInformeAvance(
    request_informe_avance: RequestUpdateInformeAvance
  ): void {
    this.store.dispatch(
      informeAvanceActions.actualizarInformeAvance({
        request_informe_avance,
      })
    );
  }
}
