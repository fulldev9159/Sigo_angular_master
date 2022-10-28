import { Injectable } from '@angular/core';
import {
  ActaTipoPago,
  DetalleServicio4Acta,
  DetalleUO4Acta,
  LastActa,
  RequestAceptarRechazarAdicionales,
  RequestValidarActa,
  Response,
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

  // GET TOTAL ACTAS
  public getTotalActas(ot_id: number): void {
    this.store.dispatch(actaActions.getTotalActas({ ot_id }));
  }

  public getTotalActasSuccess(response: Response<{ total: number }>): void {
    this.store.dispatch(
      actaActions.getTotalActasSuccess({ totalActas: response.data.total })
    );
  }

  public getTotalActasError(error: any) {
    this.store.dispatch(actaActions.getTotalActasError({ error }));
  }

  public getTotalActas$(): Observable<number> {
    return this.store.select(actaSelectors.getTotalActas);
  }
}
