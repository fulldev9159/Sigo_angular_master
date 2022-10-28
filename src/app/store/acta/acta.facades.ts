import { Injectable } from '@angular/core';
import {
  ActaTipoPago,
  DetalleServicio4Acta,
  DetalleUO4Acta,
  LastActa,
  listarActa,
  RequestAceptarRechazarAdicionales,
  RequestValidarActa,
  Response,
  ResponseDetalleActa,
} from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as actaSelectors from './acta.selectors';
import * as actaActions from './acta.actions';

@Injectable({
  providedIn: 'root',
})
export class ActaFacade {
  constructor(private store: Store<any>) {}

  // GET DETALLE SERVICIO PARA GENERAR ACTA
  public getServicios4Acta(ot_id: number): void {
    this.store.dispatch(actaActions.getServicios4Acta({ ot_id }));
  }

  public getServicios4ActaSuccess(
    response: Response<{ items: DetalleServicio4Acta[] }>
  ): void {
    this.store.dispatch(actaActions.getServicios4ActaSuccess({ response }));
  }

  public getServicios4ActaError(error: any) {
    this.store.dispatch(actaActions.getServicios4ActaError({ error }));
  }

  public getServicios4Acta$(): Observable<DetalleServicio4Acta[]> {
    return this.store.select(actaSelectors.getServicios4acta);
  }

  // GET DETALLE UO PARA GENERAR ACTA
  public getUOs4Acta(ot_id: number): void {
    this.store.dispatch(actaActions.getUOs4Acta({ ot_id }));
  }

  public getUOs4ActaSuccess(
    response: Response<{ items: DetalleUO4Acta[] }>
  ): void {
    this.store.dispatch(actaActions.getUOs4ActaSuccess({ response }));
  }

  public getUOs4ActaError(error: any) {
    this.store.dispatch(actaActions.getUOs4ActaError({ error }));
  }

  public getUOs4Acta$(): Observable<DetalleUO4Acta[]> {
    return this.store.select(actaSelectors.getUOs4acta);
  }

  // ENVIAR INFORME TRABAJOS FINALIZADOS ALIAS: GENERAR ACTA
  public informarTrabajosFinalizados(ot_id: number, observacion: string): void {
    this.store.dispatch(
      actaActions.informarTrabajosFinalizados({ ot_id, observacion })
    );
  }

  // GET TIPO PAGO ACTA
  public getActaTiposPago(): void {
    this.store.dispatch(actaActions.getActaTiposPago());
  }

  public getActaTiposPagoSuccess(
    response: Response<{ items: ActaTipoPago[] }>
  ): void {
    this.store.dispatch(actaActions.getActaTiposPagoSuccess({ response }));
  }

  public getActaTiposPagoError(error: any) {
    this.store.dispatch(actaActions.getActaTiposPagoError({ error }));
  }

  public getActaTiposPago$(): Observable<ActaTipoPago[]> {
    return this.store.select(actaSelectors.getActaTipoPago);
  }

  // ACEPTAR RECHAZAR ADICIONALES Y VALIDAR ACTA
  public aceptarRechazarAdicionales(
    requestValidarActa: RequestValidarActa,
    requestAdicionales: RequestAceptarRechazarAdicionales
  ): void {
    this.store.dispatch(
      actaActions.aceptarRechazarAdcionalesValidarActa({
        requestValidarActa,
        requestAdicionales,
      })
    );
  }

  // GET LAST ACTA
  // TODOCOMENT: IMPLEMENTAR COMPLETAMENTE EL NGRX DEL LAST ACTA
  public getLastActaSuccess(response: Response<LastActa>): void {
    this.store.dispatch(actaActions.getLastActaSuccess({ response }));
  }

  public getLastActaError(error: any) {
    this.store.dispatch(actaActions.getLastActaError({ error }));
  }

  // public getlastActa$(): Observable<ActaTipoPago[]> {
  //   return this.store.select(actaSelectors.getActaTipoPago);
  // }

  // GET ACTAS
  // TODOCOMENT: IMPLEMENTAR COMPLETAMENTE EL NGRX DEL LAST ACTA
  public getActasSuccess(actas: listarActa[]): void {
    this.store.dispatch(actaActions.getActasSuccess({ actas }));
  }

  public getActasError(error: any) {
    this.store.dispatch(actaActions.getActasError({ error }));
  }

  // GET DETALLE ACTA
  // TODOCOMENT: IMPLEMENTAR COMPLETAMENTE EL NGRX DEL LAST ACTA

  public getDetalleActa(acta_id: number): void {
    this.store.dispatch(actaActions.getDetalleActa({ acta_id }));
  }

  public getDetalleActaSuccess(response: ResponseDetalleActa): void {
    this.store.dispatch(actaActions.getDetalleActaSuccess({ response }));
  }

  public getDetalleActaError(error: any) {
    this.store.dispatch(actaActions.getDetalleActaError({ error }));
  }

  public getDetalleActa$(): Observable<any> {
    return this.store.select(actaSelectors.getDetalleActa);
  }
}
