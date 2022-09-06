import { Injectable } from '@angular/core';
import {
  AgenciaContrato,
  ContratosUser,
  Cubicacion,
  DetalleCubicacion,
  PerfilesUsuario,
  ProveedorAgenciaContrato,
  RequestCreateCubicacion,
  RequestEditCubicacion,
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

  // CREATE CUBICACION
  public createCubicacion(request: RequestCreateCubicacion): void {
    this.store.dispatch(cubicacionActions.createCubicacion({ request }));
  }
  // EDIT CUBICACION
  public editCubicacion(request: RequestEditCubicacion): void {
    this.store.dispatch(cubicacionActions.editCubicacion({ request }));
  }

  // LISTAR CUBICACIONES
  public listarCubicaciones(): void {
    this.store.dispatch(cubicacionActions.listarCubicaciones());
  }
  public listarCubicacionesSuccess(
    response: Response<{ items: Cubicacion[] }>
  ): void {
    this.store.dispatch(
      cubicacionActions.listarCubicacionesSuccess({ response })
    );
  }
  public listarCubicacionesError(error: any): void {
    this.store.dispatch(cubicacionActions.listarCubicacionesError({ error }));
  }
  public listarCubicaciones$(): Observable<Cubicacion[]> {
    return this.store.select(cubicacionSelectors.listarCubicaciones);
  }

  // DETALLE CUBICACION
  public detalleCubicacion(cubicacion_id: number): void {
    this.store.dispatch(cubicacionActions.detalleCubicacion({ cubicacion_id }));
  }

  public detalleCubicacion$(): Observable<DetalleCubicacion> {
    return this.store.select(cubicacionSelectors.detalleCubicacion);
  }

  // RESETS
  public resetContratoSelected(): void {
    this.store.dispatch(cubicacionActions.resetContratoSelected());
  }
  public resetProveedorSelected(): void {
    this.store.dispatch(cubicacionActions.resetProveedorSelected());
  }
  public resetAgenciaSelected(): void {
    this.store.dispatch(cubicacionActions.resetAgenciaSelected());
  }
}
