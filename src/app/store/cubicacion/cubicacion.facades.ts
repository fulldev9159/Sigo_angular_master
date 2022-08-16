import { Injectable } from '@angular/core';
import {
  AgenciaContrato,
  ContratosUser,
  PerfilesUsuario,
  ProveedorAgenciaContrato,
  Response,
  TipoCubicacion,
} from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as cubicacionSelectors from './cubicacion.selectors';
import * as cubicacionActions from './cubicacion.actions';

@Injectable({
  providedIn: 'root',
})
export class CubicacionFacade {
  constructor(private store: Store<any>) {}

  // GET TIPOS DE CUBICACIONES
  public getTipoCubicacion(): void {
    this.store.dispatch(cubicacionActions.getTipoCubicacion());
  }

  public getTipoCubicacionSuccess(
    response: Response<{ items: TipoCubicacion[] }>
  ): void {
    this.store.dispatch(
      cubicacionActions.getTipoCubicacionSuccess({ response })
    );
  }

  public getTipoCubicacionError(error: any) {
    this.store.dispatch(cubicacionActions.getTipoCubicacionError({ error }));
  }

  public getTipoCubicacion$(): Observable<TipoCubicacion[]> {
    return this.store.select(cubicacionSelectors.getTipoCubicacion);
  }

  // CONTRATO SELECTED
  public contratoSelected(contratoUserSelected: ContratosUser): void {
    this.store.dispatch(
      cubicacionActions.contratoSelected({ contratoUserSelected })
    );
  }

  public contratoSelected$(): Observable<ContratosUser> {
    return this.store.select(cubicacionSelectors.contratoSelected);
  }

  // PROVEEDOR SELECTED
  public proveedorSelected(proveedorSelected: ProveedorAgenciaContrato): void {
    this.store.dispatch(
      cubicacionActions.proveedorSelected({ proveedorSelected })
    );
  }

  public proveedorSelected$(): Observable<ProveedorAgenciaContrato> {
    return this.store.select(cubicacionSelectors.proveedorSelected);
  }

  // AGENCIA SELECTED
  public agenciaSelected(agenciaSelected: AgenciaContrato): void {
    this.store.dispatch(cubicacionActions.agenciaSelected({ agenciaSelected }));
  }

  public agenciaSelected$(): Observable<AgenciaContrato> {
    return this.store.select(cubicacionSelectors.agenciaSelected);
  }
}
