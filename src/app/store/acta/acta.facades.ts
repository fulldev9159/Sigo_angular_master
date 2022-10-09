import { Injectable } from '@angular/core';
import { DetalleServicio4Acta, DetalleUO4Acta, Response } from '@model';
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
}
