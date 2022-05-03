import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as cubicacionActions from './cubicacion.actions';
import * as cubicacionSelectors from './cubicacion.selectors';
import {
  ContratoMarco4Cub,
  Cubicacion,
  CubicacionWithLpu,
  RegionSubcontrato4Cub,
  RequestEditCubicacion,
  SubcontratosProveedor,
  TipoLpu,
  LpuCarrito4Cub,
  Lpu4Cub,
  AutoSuggestItem,
  DetalleCubicacion,
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
  public actividad4cub(): void {
    this.store.dispatch(cubicacionActions.getActividades4Cub());
  }

  public actividad4cub$(): Observable<Actividad4Cub[]> {
    return this.store.select(cubicacionSelectors.actividad4Cub);
  }

  // GET TIPO SERVICIO ESPECIALIDAD 4 CUB
  public tipoServicioEspecialidad(actividad_id: number): void {
    this.store.dispatch(
      cubicacionActions.getTipoServicioEspecialidad4Cub({ actividad_id })
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
  public deleteServiceCarrito4CreateCub(servicio_cod: string): void {
    this.store.dispatch(
      cubicacionActions.delteServiceCarrito4CreateCub({ servicio_cod })
    );
  }

  //  DELETE UO FROM CARRITO 4 CREATE CUB
  public deleteUOCarrito4CreateCub(servicio_cod: string, uo_cod: string): void {
    this.store.dispatch(
      cubicacionActions.delteUOCarrito4CreateCub({ servicio_cod, uo_cod })
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

  // /////

  // CUBICACION
  public getCubicacionAction(): void {
    this.store.dispatch(cubicacionActions.getCubs());
  }

  public getCubicacionSelector$(): Observable<Cubicacion[]> {
    return this.store.select(cubicacionSelectors.getCubicaciones);
  }

  public resetSingleCubicacion(): void {
    this.store.dispatch(cubicacionActions.resetSingleCubicacion());
  }

  public getSingleCubicacion(id: number): void {
    this.store.dispatch(
      cubicacionActions.getSingleCubicacion({ cubicacion_id: id })
    );
  }

  public getSingleCubicacion$(): Observable<CubicacionWithLpu> {
    return this.store.select(cubicacionSelectors.getSingleCubicacion);
  }

  public getSingleCubicacionError$(): Observable<Error> {
    return this.store.select(cubicacionSelectors.getCubicacionError);
  }

  // DELETE
  public deleteCubicacion(cubicacion_id: number): void {
    this.store.dispatch(cubicacionActions.deleteCubicacion({ cubicacion_id }));
  }
  // DELETE

  // REPLY
  public replyCubicacion(cubicacion: Cubicacion): void {
    this.store.dispatch(cubicacionActions.replyCubicacion({ cubicacion }));
  }
  // REPLY

  // POST
  // public postCubicacion(cubicacion): void {
  //   this.store.dispatch(cubicacionActions.createCub({ cubicacion }));
  // }
  // POST

  // POST
  public editCubicacion(cubicacion: RequestEditCubicacion): void {
    this.store.dispatch(cubicacionActions.editCubicacion({ cubicacion }));
  }
  // POST

  // CONSTRACT MARCO
  public getContractMarcoAction(): void {
    this.store.dispatch(cubicacionActions.getContractMarco4Cub());
  }

  public getContractMarcoSelector$(): Observable<ContratoMarco4Cub[]> {
    return this.store.select(cubicacionSelectors.getConstractMarco);
  }
  // CONSTRACT MARCO

  public getProvidersSelector$(): Observable<SubcontratosProveedor[]> {
    return this.store.select(cubicacionSelectors.getSubContractedProviders);
  }
  // SUBCONTRACTPROVIDERS

  // SUBCONTRACTREGIONS
  public getSubContractedRegionsAction(subcontratos_id: number[]): void {
    this.store.dispatch(
      cubicacionActions.getSubContractedRegions({ subcontratos_id })
    );
  }
  public getRegionsSelector$(): Observable<RegionSubcontrato4Cub[]> {
    return this.store.select(cubicacionSelectors.getSubContractedRegions);
  }
  // SUBCONTRACTREGIONS

  // SUBCONTRACTTYPESERVICES
  public getSubContractedTypeServicesAction(data): void {
    this.store.dispatch(cubicacionActions.getSubContractedTypeServices(data));
  }

  public getTypeServicesSelector$(): Observable<TipoLpu[]> {
    return this.store.select(cubicacionSelectors.getSubContractedTypeServices);
  }
  // SUBCONTRACTTYPESERVICES

  // SUBCONTRACTSERVICES
  public getSubContractedServicesAction(data): void {
    this.store.dispatch(cubicacionActions.getSubContractedServices(data));
  }

  public getServicesSelector$(): Observable<Lpu4Cub[]> {
    return this.store.select(cubicacionSelectors.getSubContractedServices);
  }

  public resetData(): void {
    this.store.dispatch(cubicacionActions.resetData());
  }

  public resetServices(): void {
    this.store.dispatch(cubicacionActions.resetServices());
  }
  // SUBCONTRACTSERVICES
  // CUBICACION
  // CONSTRACT MARCO
  public getAutoSuggestAction(filtro: string, cantidad: number): void {
    this.store.dispatch(cubicacionActions.getAutoSuggest({ filtro, cantidad }));
  }

  public getAutoSuggestSelector$(): Observable<AutoSuggestItem[]> {
    return this.store.select(cubicacionSelectors.getAutoSuggest);
  }

  public getDetallesCubicacionAction(cubicacion_id: number): void {
    this.store.dispatch(
      cubicacionActions.getDetalleCubicacion({ cubicacion_id })
    );
  }

  public getDetallesCubicacionSelector$(): Observable<DetalleCubicacion[]> {
    return this.store.select(cubicacionSelectors.getDetalleCubicacion);
  }

  public ClonarCubicacionAction(
    cubicacion: Cubicacion,
    cubicacion_id: number
  ): void {
    this.store.dispatch(
      cubicacionActions.clonarCubicacion({ cubicacion, cubicacion_id })
    );
  }

  public selectCubicacion(cubicacion: Cubicacion): void {
    this.store.dispatch(cubicacionActions.selectCubicacion({ cubicacion }));
  }

  public getSelectedCubicacion$(): Observable<Cubicacion> {
    return this.store.select(cubicacionSelectors.getSelectedCubicacion);
  }

  public getSavingCubicacion$(): Observable<boolean> {
    return this.store.select(cubicacionSelectors.getSavingCubicacion);
  }

  public getSaveCubicacionError$(): Observable<Error> {
    return this.store.select(cubicacionSelectors.getSaveCubicacionError);
  }
}
