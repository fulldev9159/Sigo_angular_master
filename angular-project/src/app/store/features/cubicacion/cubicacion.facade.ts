import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as cubicacionActions from './cubicacion.actions';
import * as cubicacionSelectors from './cubicacion.selectors';
import * as cubModel from './cubicacion.model';
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
} from '@data';

@Injectable({
  providedIn: 'root',
})
export class CubicacionFacade {
  constructor(private store: Store<Cubicacion>) {}

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
  public postCubicacion(cubicacion): void {
    this.store.dispatch(cubicacionActions.postCubicacion({ cubicacion }));
  }
  // POST

  // POST
  public editCubicacion(cubicacion: RequestEditCubicacion): void {
    this.store.dispatch(cubicacionActions.editCubicacion({ cubicacion }));
  }
  // POST

  // CONSTRACT MARCO
  public getContractMarcoAction(): void {
    this.store.dispatch(cubicacionActions.getContractMarco());
  }

  public getContractMarcoSuccess(contractMarco: ContratoMarco4Cub[]): void {
    this.store.dispatch(
      cubicacionActions.getContractMarcoSuccess({
        contratosMarcos: contractMarco,
      })
    );
  }

  public getContractMarcoSelector$(): Observable<ContratoMarco4Cub[]> {
    return this.store.select(cubicacionSelectors.getConstractMarco);
  }
  // CONSTRACT MARCO

  // SUBCONTRACTPROVIDERS
  public getSubContractedProvidersAction(data): void {
    this.store.dispatch(cubicacionActions.getSubContractProviders(data));
  }

  public getSubContractedProvidersSuccess(
    subContractedProviders: SubcontratosProveedor[]
  ): void {
    this.store.dispatch(
      cubicacionActions.getSubContractProvidersSuccess({
        subcontratosProveedor: subContractedProviders,
      })
    );
  }

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

  public getSubContractedRegionsSuccess(
    subContractedRegions: RegionSubcontrato4Cub[]
  ): void {
    this.store.dispatch(
      cubicacionActions.getSubContractedRegionsSuccess({
        regionesSubcontrato: subContractedRegions,
      })
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

  public getSubContractedTypeServicesSuccess(
    subContractedTypeServices: TipoLpu[]
  ): void {
    this.store.dispatch(
      cubicacionActions.getSubContractedTypeServicesSuccess({
        subContractedTypeServices,
      })
    );
  }

  public getTypeServicesSelector$(): Observable<TipoLpu[]> {
    return this.store.select(cubicacionSelectors.getSubContractedTypeServices);
  }
  // SUBCONTRACTTYPESERVICES

  // SUBCONTRACTSERVICES
  public getSubContractedServicesAction(data): void {
    this.store.dispatch(cubicacionActions.getSubContractedServices(data));
  }

  public getSubContractedServicesSuccess(
    subContractedServices: LpuCarrito4Cub[]
  ): void {
    this.store.dispatch(
      cubicacionActions.getSubContractedServicesSuccess({
        subContractedServices,
      })
    );
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
  public getAutoSuggestAction(filter: string, cantidad: number): void {
    this.store.dispatch(cubicacionActions.getAutoSuggest({ filter, cantidad }));
  }

  public getAutoSuggestSuccess(contractMarco: ContratoMarco4Cub[]): void {
    this.store.dispatch(
      cubicacionActions.getContractMarcoSuccess({
        contratosMarcos: contractMarco,
      })
    );
  }

  public getAutoSuggestSelector$(): Observable<cubModel.AutoSuggestItem[]> {
    return this.store.select(cubicacionSelectors.getAutoSuggest);
  }

  public getDetallesCubicacionAction(cubicacion_id: number): void {
    this.store.dispatch(
      cubicacionActions.getDetalleCubicacion({ cubicacion_id })
    );
  }

  public getDetallesCubicacionSelector$(): Observable<
    cubModel.ResponseDetalleCubicacion[]
  > {
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
