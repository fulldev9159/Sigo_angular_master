import { Injectable } from '@angular/core';
import {
  AgenciaContrato,
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
}
