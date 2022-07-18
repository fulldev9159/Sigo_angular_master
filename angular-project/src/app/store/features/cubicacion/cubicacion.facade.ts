import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as cubicacionActions from './cubicacion.actions';
import * as cubicacionSelectors from './cubicacion.selectors';
import {
  Cubicacion,
  RequestEditCubicacion,
  ContratosUser,
  Agencias4Cub,
  Proveedores4Cub,
  RequestGetServicios4Cub,
  RequestGetUnidadObra4Cub,
  TipoCubicacion4Cub,
  Actividad4Cub,
  Servicios4Cub,
  TipoServicioEspecialidad4Cub,
  UnidadObra4Cub,
  RequestGetDatosServicio4Cub,
  Carrito,
  RequestGetDatosUnidadObra4Cub,
  RequestCreateCubicacion,
  RespDataGetDetalleCubs,
  RequestDeleteDetallesCubicacion,
} from '@data';

@Injectable({
  providedIn: 'root',
})
export class CubicacionFacade {
  constructor(private store: Store<Cubicacion>) {}

  //   GET ALL CUBS
  public AllCubs(): void {
    this.store.dispatch(cubicacionActions.getAllCubs());
  }

  public AllCubs$(): Observable<Cubicacion[]> {
    return this.store.select(cubicacionSelectors.allCubs);
  }

  //   GET DETALLE CUB
  public DetalleCub(cubicacion_id: number): void {
    this.store.dispatch(cubicacionActions.getDetalleCubs({ cubicacion_id }));
  }

  public DetalleCub$(): Observable<RespDataGetDetalleCubs> {
    return this.store.select(cubicacionSelectors.detalleCub);
  }

  //   GET CONTRATOS USER 4 CUB
  public contratosUser4Cub(usuario_id: number): void {
    this.store.dispatch(cubicacionActions.getContratosUser4Cub({ usuario_id }));
  }

  public contratosUser4Cub$(): Observable<ContratosUser[]> {
    return this.store.select(cubicacionSelectors.contratosUser4Cub);
  }

  // GET AGENCIAS 4 CUB
  public agencias4cub(contrato_id: number): void {
    this.store.dispatch(cubicacionActions.getAgencia4Cub({ contrato_id }));
  }

  public agencias4cub$(): Observable<Agencias4Cub[]> {
    return this.store.select(cubicacionSelectors.agencias4Cub);
  }

  // GET PROVEEDORES4 CUB
  public proveedores4Cub(agencia_id: number, contrato_id: number): void {
    this.store.dispatch(
      cubicacionActions.getProveedores4Cub({ agencia_id, contrato_id })
    );
  }

  public proveedores4Cub$(): Observable<Proveedores4Cub[]> {
    return this.store.select(cubicacionSelectors.proveedores4Cub);
  }

  // GET TIPO CUBICACION 4 CUB
  public tipoCubicacion4cub(): void {
    this.store.dispatch(cubicacionActions.getTipoCubicacion4Cub());
  }

  public tipoCubicacion4cub$(): Observable<TipoCubicacion4Cub[]> {
    return this.store.select(cubicacionSelectors.tipoCubicacion4Cub);
  }

  // GET ACTIVIDAD 4 CUB
  public actividad4cub(cmarco_has_proveedor: number): void {
    this.store.dispatch(
      cubicacionActions.getActividades4Cub({ cmarco_has_proveedor })
    );
  }

  public actividad4cub$(): Observable<Actividad4Cub[]> {
    return this.store.select(cubicacionSelectors.actividad4Cub);
  }

  // GET TIPO SERVICIO ESPECIALIDAD 4 CUB
  public tipoServicioEspecialidad(
    actividad_id: number,
    contrato_marco_id: number
  ): void {
    this.store.dispatch(
      cubicacionActions.getTipoServicioEspecialidad4Cub({
        actividad_id,
        contrato_marco_id,
      })
    );
  }

  public tipoServicioEspecialidad$(): Observable<
    TipoServicioEspecialidad4Cub[]
  > {
    return this.store.select(cubicacionSelectors.tipoServicioEspecialidad4Cub);
  }

  // GET SERVICIOS 4 CUB
  public servicios4Cub(request: RequestGetServicios4Cub): void {
    this.store.dispatch(cubicacionActions.getServicios4Cub({ request }));
  }

  public servicios4Cub$(): Observable<Servicios4Cub[]> {
    return this.store.select(cubicacionSelectors.servicios4Cub);
  }

  // GET UNIDADES DE OBRAS 4 CUB
  public unidadObras4Cub(request: RequestGetUnidadObra4Cub): void {
    this.store.dispatch(cubicacionActions.getUnidadObra4Cub({ request }));
  }

  public unidadObras4Cub$(): Observable<UnidadObra4Cub[]> {
    return this.store.select(cubicacionSelectors.unidadObras4Cub);
  }

  // GET DATOS SERVICIO UNIDAD OBRAS 4 CUB AND CARRITO
  public loadDatosServicio4Cub(carrito: Carrito[]): void {
    this.store.dispatch(
      cubicacionActions.loadCarritoDatosServicio4Cub({ carrito })
    );
  }

  public datosServicio4Cub(
    request_servicio: RequestGetDatosServicio4Cub,
    request_uo: RequestGetDatosUnidadObra4Cub
  ): void {
    this.store.dispatch(
      cubicacionActions.getDatosServicio4Cub({ request_servicio, request_uo })
    );
  }

  public datosUnidadObra4Cub(request: RequestGetDatosUnidadObra4Cub): void {
    this.store.dispatch(cubicacionActions.getDatosUnidadObra4Cub({ request }));
  }

  public carrito$(): Observable<Carrito[]> {
    return this.store.select(cubicacionSelectors.carrito);
  }

  // SERVICIO UO REPETIDO ALERT
  public servicioUORepetidoAlert$(): Observable<boolean> {
    return this.store.select(cubicacionSelectors.servicioUORepetidoAlert);
  }

  //  DELETE SERVICE FROM CARRITO 4 CREATE CUB
  public deleteServiceCarrito4CreateCub(servicio_id: number): void {
    this.store.dispatch(
      cubicacionActions.delteServiceCarrito4CreateCub({ servicio_id })
    );
  }

  //  DELETE UO FROM CARRITO 4 CREATE CUB
  public deleteUOCarrito4CreateCub(servicio_id: number, uo_cod: string): void {
    this.store.dispatch(
      cubicacionActions.delteUOCarrito4CreateCub({ servicio_id, uo_cod })
    );
  }

  // CREATE  CUB
  public createCub(request: RequestCreateCubicacion): void {
    this.store.dispatch(cubicacionActions.createCub({ request }));
  }

  // CLON  CUB
  public clonCub(request: RequestCreateCubicacion): void {
    this.store.dispatch(cubicacionActions.clonCub({ request }));
  }

  // EDIT  CUB
  public editCub(request: RequestEditCubicacion): void {
    this.store.dispatch(cubicacionActions.editCub({ request }));
  }

  // DELETE  CUB
  public deleteCub(cubicacion_id: number): void {
    this.store.dispatch(cubicacionActions.deleteCub({ cubicacion_id }));
  }

  // DELETE  CUB
  public deleteDetalleCub(request: RequestDeleteDetallesCubicacion): void {
    this.store.dispatch(cubicacionActions.deleteDetalleCub({ request }));
  }

  public resetData(): void {
    this.store.dispatch(cubicacionActions.resetData());
  }

  public resetServices(): void {
    this.store.dispatch(cubicacionActions.resetServices());
  }

  public resetCarrito(): void {
    this.store.dispatch(cubicacionActions.resetCarrito());
  }
}
