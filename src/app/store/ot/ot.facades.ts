import { Injectable } from '@angular/core';
import {
  AgenciaContrato,
  Comuna,
  ContratosUser,
  Cubicacion,
  CubicacionContrato,
  DetalleCubicacion,
  OficinaCentral,
  PerfilesUsuario,
  ProveedorAgenciaContrato,
  RequestCreateCubicacion,
  RequestEditCubicacion,
  Response,
  SolicitadoPor,
  TipoCubicacion,
  TipoDeRed,
  TipoDeTrabajo,
} from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as otSelectors from './ot.selectors';
import * as otActions from './ot.actions';

@Injectable({
  providedIn: 'root',
})
export class OTFacade {
  constructor(private store: Store<any>) {}

  // GET CUBICACION SELECCIONADA
  public cubicacionSelected(cubicacionSelected: CubicacionContrato): void {
    this.store.dispatch(otActions.cubicacionSelected({ cubicacionSelected }));
  }

  public cubicacionSelected$(): Observable<CubicacionContrato> {
    return this.store.select(otSelectors.cubicacionSelected);
  }

  // CREATE OT CONTRATO BUCLE : GET OFICINA CENTRAL
  public getOficinaCentral(agencia_id: number): void {
    this.store.dispatch(otActions.getOficinaCentral({ agencia_id }));
  }

  public getOficinaCentral$(): Observable<OficinaCentral[]> {
    return this.store.select(otSelectors.getOficinaCentral);
  }

  // CREATE OT CONTRATO BUCLE : GET SOLICITADO POR
  public getSolicitadoPor(): void {
    this.store.dispatch(otActions.getSolicitadoPor());
  }

  public getSolicitadoPor$(): Observable<SolicitadoPor[]> {
    return this.store.select(otSelectors.getSolicitadoPor);
  }

  // CREATE OT CONTRATO BUCLE : GET COUMNAS FROM CUBICACION
  public getComunasFromCub(cubicacion_id: number): void {
    this.store.dispatch(otActions.getComunasFromCub({ cubicacion_id }));
  }

  public getComunasFromCub$(): Observable<Comuna[]> {
    return this.store.select(otSelectors.getComunasFromCub);
  }

  // CREATE OT CONTRATO BUCLE : GET TIPO DE RED
  public getTipoDeRed(): void {
    this.store.dispatch(otActions.getTipoDeRed());
  }

  public getTipoDeRed$(): Observable<TipoDeRed[]> {
    return this.store.select(otSelectors.getTipoDeRed);
  }

  // CREATE OT CONTRATO BUCLE : GET TIPO DE TRABAJO
  public getTipoDeTrabajoFromCub(cubicacion_id: number): void {
    this.store.dispatch(otActions.getTipoDeTrabajoFromCub({ cubicacion_id }));
  }

  public getTipoDeTrabajoFromCub$(): Observable<TipoDeTrabajo[]> {
    return this.store.select(otSelectors.getTipoDeTrabajoFromCub);
  }
}
