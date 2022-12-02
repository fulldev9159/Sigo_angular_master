import { Injectable } from '@angular/core';
import {
  AgenciaContrato,
  ContratosUser,
  Cubicacion,
  CubicacionContrato,
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
  // CLONAR CUBICACION
  public clonarCubicacion(request: RequestCreateCubicacion): void {
    this.store.dispatch(cubicacionActions.clonarCubicacion({ request }));
  }
  // EDIT CUBICACION
  public editCubicacion(request: RequestEditCubicacion): void {
    this.store.dispatch(cubicacionActions.editCubicacion({ request }));
  }
  // EDIT CUBICACION INGENIERIA
  public editCubicacionIngenieria(request: RequestEditCubicacion): void {
    this.store.dispatch(
      cubicacionActions.editCubicacionIngenieria({ request })
    );
  }
  // ELIMINAR CUBICACION
  public eliminarCubicacion(cubicacion_id: number): void {
    this.store.dispatch(
      cubicacionActions.eliminarCubicacion({ cubicacion_id })
    );
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

  public detalleCubicacionSuccess(detalleCubicacion: DetalleCubicacion): void {
    this.store.dispatch(
      cubicacionActions.detalleCubicacionSuccess({ detalleCubicacion })
    );
  }
  public detalleCubicacionError(error: any): void {
    this.store.dispatch(cubicacionActions.detalleCubicacionError({ error }));
  }

  public detalleCubicacion$(): Observable<DetalleCubicacion> {
    return this.store.select(cubicacionSelectors.detalleCubicacion);
  }

  // DETALLE CUBICACION INGENIERIA
  public detalleCubicacionIngenieria(cubicacion_id: number): void {
    this.store.dispatch(
      cubicacionActions.detalleCubicacionIngenieria({ cubicacion_id })
    );
  }

  public detalleCubicacionIngenieriaSuccess(
    detalleCubicacion: DetalleCubicacion
  ): void {
    this.store.dispatch(
      cubicacionActions.detalleCubicacionIngenieriaSuccess({
        detalleCubicacion,
      })
    );
  }
  public detalleCubicacionIngenieriaError(error: any): void {
    this.store.dispatch(
      cubicacionActions.detalleCubicacionIngenieriaError({ error })
    );
  }

  public detalleCubicacionIngenieria$(): Observable<DetalleCubicacion> {
    return this.store.select(cubicacionSelectors.detalleCubicacionIngenieria);
  }

  // ELIMINAR SERVICIO CARRITO
  public eliminarServicioCarrito(
    servicio?: number[],
    unidad_obra?: number[]
  ): void {
    this.store.dispatch(
      cubicacionActions.eliminarServicioCarrito({ servicio, unidad_obra })
    );
  }

  // CUBICACIONES DE UN CONTRATO ESPECIFICO
  public getCubicacionesContrato(contrato_id: number): void {
    this.store.dispatch(
      cubicacionActions.getCubicacionesContrato({ contrato_id })
    );
  }

  public getCubicacionesContrato$(): Observable<CubicacionContrato[]> {
    return this.store.select(cubicacionSelectors.getCubicacionesContrato);
  }

  // ADMIN DE CONTRATO FROM CUB
  public getAdminContratoFromCub(cubicacion_id: number): void {
    this.store.dispatch(
      cubicacionActions.getAdminContratoFromCub({ cubicacion_id })
    );
  }

  public getAdminContratoFromCub$(): Observable<AgenciaContrato[]> {
    return this.store.select(cubicacionSelectors.getAdminContratoFromCub);
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

  // CAMBIAR ORIGEN DE MATERIAL
  public cambiarMaterialOrigenAProveedor(material_id: number): void {
    this.store.dispatch(
      cubicacionActions.CambiarMaterialOrigenAProveedor({ material_id })
    );
  }
}
