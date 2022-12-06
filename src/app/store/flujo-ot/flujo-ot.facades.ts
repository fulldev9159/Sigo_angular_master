import { Injectable } from '@angular/core';
import {
  MotivoRechazo,
  PosibleSupervisorTrabajo,
  ReqSolicitarQuiebre,
  RequestAceptarRechazarOT,
  RequestAprobarRechazarOperaciones,
} from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as flujoOTSelectors from './flujo-ot.selectors';
import * as flujoOTActions from './flujo-ot.actions';

@Injectable({
  providedIn: 'root',
})
export class FlujoOTFacade {
  constructor(private store: Store<any>) {}

  // ACEPTAR O RECHAZAR INCIAL
  public aceptarRechazarIncialOT(request: RequestAceptarRechazarOT): void {
    this.store.dispatch(flujoOTActions.aceptarRechazarIncialOT({ request }));
  }

  // GET POSIBLE SUPERVISOR DE TRABAJOS
  public getPosibleSupervisorDeTrabajos(ot_id: number): void {
    this.store.dispatch(
      flujoOTActions.getPosibleSupervisorDeTrabajos({ ot_id })
    );
  }

  public getPosibleSupervisorDeTrabajos$(): Observable<
    PosibleSupervisorTrabajo[]
  > {
    return this.store.select(flujoOTSelectors.getPosibleSupervisorDeTrabajos);
  }

  // ACEPTAR OT PROVEDOR
  public aceptarOTProveedor(
    request_aceptacion: RequestAceptarRechazarOT,
    ot_id: number,
    proxy_id: number,
    concepto: string
  ): void {
    this.store.dispatch(
      flujoOTActions.aceptarOTProveedor({
        request_aceptacion,
        ot_id,
        proxy_id,
        concepto,
      })
    );
  }

  // RECHAZAR OT PROVEDOR
  public rechazarOTProveedor(request: RequestAceptarRechazarOT): void {
    this.store.dispatch(
      flujoOTActions.rechazarOTProveedor({
        request,
      })
    );
  }

  // ASIGNAR SUPERVISOR DE TRABAJOS
  public asignarSupervisorTrabajo(
    ot_id: number,
    proxy_id: number,
    concepto: string
  ): void {
    this.store.dispatch(
      flujoOTActions.asignarSupervisorTrabajo({ ot_id, proxy_id, concepto })
    );
  }

  // SOLICITAR PAGO
  public solicitarPago(ot_id: number): void {
    this.store.dispatch(flujoOTActions.solicitarPago({ ot_id }));
  }

  // ACEPTAR O RECHAZAR OPERACIONES
  public aprobarRechazarOperaciones(
    request: RequestAprobarRechazarOperaciones
  ): void {
    this.store.dispatch(flujoOTActions.aprobarRechazarOperaciones({ request }));
  }

  // GET POSIBLE SUPERVISOR DE TRABAJOS
  public getMotivosRechazo(tipo: string): void {
    this.store.dispatch(flujoOTActions.getAllMotivoRechazoOT({ tipo }));
  }

  public getMotivosRechazo$(): Observable<MotivoRechazo[]> {
    return this.store.select(flujoOTSelectors.motivosRechazo);
  }

  // CONFIRMAR RECHAZO OBRAS
  public confirmarRechazoObras(ot_id: number): void {
    this.store.dispatch(flujoOTActions.confirmarRechazoObras({ ot_id }));
  }

  // CERRAR OT
  public cerrarOT(ot_id: number): void {
    this.store.dispatch(flujoOTActions.cerrarOT({ ot_id }));
  }

  // ANULAR OT
  public anularOT(ot_id: number): void {
    this.store.dispatch(flujoOTActions.anularOT({ ot_id }));
  }

  // SOLICITAR QUIEBRE OT
  public solicitarQuiebre(request: ReqSolicitarQuiebre): void {
    this.store.dispatch(flujoOTActions.solicitarQuiebre({ request }));
  }

  // DESQUIEBRE OT
  public desquiebre(ot_id: number): void {
    this.store.dispatch(flujoOTActions.desquiebre({ ot_id }));
  }

  // CIERRE ADMINISTRATIVO OT
  public cierreAdministrativo(ot_id: number): void {
    this.store.dispatch(flujoOTActions.cierreAdministrativo({ ot_id }));
  }
}
