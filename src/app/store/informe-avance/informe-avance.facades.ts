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

  // ACTUALIZAR SOLO EL INFORME DE AVANCE
  public actualizarInformeAvance(
    request_informe_avance: RequestUpdateInformeAvance,
    ot_id: number
  ): void {
    this.store.dispatch(
      informeAvanceActions.actualizarInformeAvance({
        request_informe_avance,
        ot_id,
      })
    );
  }

  // ACTUALIZAR INFORME DE AVANCE Y ENVIAR INFORME DE AVANCE
  public actualizarInformeAvanceYenviar(
    request_informe_avance: RequestUpdateInformeAvance,
    ot_id: number
  ): void {
    this.store.dispatch(
      informeAvanceActions.actualizarInformeAvanceYenviar({
        request_informe_avance,
        ot_id,
      })
    );
  }
  // ACTUALIZAR INFORME DE AVANCE, ADICIONALES Y ENVIAR INFORME DE AVANCE
  public actualizarInformeAvanceAdicionalesYenviar(
    request_informe_avance: RequestUpdateInformeAvance,
    request_adicionales: RequestAdicionales,
    ot_id: number
  ): void {
    this.store.dispatch(
      informeAvanceActions.actualizarInformeAvanceAdicionalesYenviar({
        request_informe_avance,
        request_adicionales,
        ot_id,
      })
    );
  }

  // ACTUALIZAR INFORME DE AVANCE Y AUTORIZAR INFORME DE AVANCE
  public actualizarInformeAvanceYautorizar(
    request_informe_avance: RequestUpdateInformeAvance,
    request_autorizacion: RequestAutorizarInformeAvance
  ): void {
    this.store.dispatch(
      informeAvanceActions.actualizarInformeAvanceYautorizarIA({
        request_informe_avance,
        request_autorizacion,
      })
    );
  }
  // ACTUALIZAR INFORME DE AVANCE, ADICIONALES Y ENVIAR INFORME DE AVANCE
  public actualizarInformeAvanceAdicionalesYautorizar(
    request_informe_avance: RequestUpdateInformeAvance,
    request_adicionales: RequestAdicionales,
    request_autorizacion: RequestAutorizarInformeAvance
  ): void {
    this.store.dispatch(
      informeAvanceActions.actualizarInformeAvanceAdicionalesYautorizarIA({
        request_informe_avance,
        request_adicionales,
        request_autorizacion,
      })
    );
  }

  // SEND DETALLE INFORME AVANCE
  // public sendDetalleInformeAvance(ot_id: number): void {
  //   this.store.dispatch(
  //     informeAvanceActions.sendDetalleInformeAvance({ ot_id })
  //   );
  // }

  // ACEPTACION RECHAZO INFORME AVANCE
  public AceptarRechazarInformeAvanceOT(
    request: RequestAutorizarInformeAvance
  ): void {
    this.store.dispatch(
      informeAvanceActions.AceptarRechazarInformeAvanceOT({ request })
    );
  }

  // CAMBIAR ORIGEN DE MATERIAL
  public cambiarMaterialOrigenAProveedor(material_id: number): void {
    this.store.dispatch(
      informeAvanceActions.CambiarMaterialOrigenAProveedor({ material_id })
    );
  }
}
