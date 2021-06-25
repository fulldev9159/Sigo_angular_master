import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as cubicacionActions from './cubicacion.actions';
import * as cubicacionSelectors from './cubicacion.selectors';
import * as cubModel from './cubicacion.model';

@Injectable({
  providedIn: 'root',
})
export class CubicacionFacade {
  constructor(private store: Store<cubModel.Cubicacion>) {}

  // CUBICACION
  public getCubicacionAction(perfilID: number): void {
    this.store.dispatch(cubicacionActions.getCubicacion({ perfilID }));
  }

  public getCubicacionSelector$(): Observable<cubModel.Cubicacion[]> {
    return this.store.select(cubicacionSelectors.getCubicaciones);
  }

  // DELETE
  public deleteCubicacion(position: number): void {
    this.store.dispatch(
      cubicacionActions.deleteCubicacion({ cubicacionPosition: position })
    );
  }
  // DELETE

  // REPLY
  public replyCubicacion(cubicacion: cubModel.Cubicacion): void {
    this.store.dispatch(cubicacionActions.replyCubicacion({ cubicacion }));
  }
  // REPLY

  // POST
  public postCubicacion(cubicacion): void {
    this.store.dispatch(cubicacionActions.postCubicacion({ cubicacion }));
  }
  // POST

  // CONSTRACT MARCO
  public getContractMarcoAction(): void {
    this.store.dispatch(cubicacionActions.getContractMarco());
  }

  public getContractMarcoSuccess(
    contractMarco: cubModel.ContractMarco[]
  ): void {
    this.store.dispatch(
      cubicacionActions.getContractMarcoSuccess({ contractMarco })
    );
  }

  public getContractMarcoSelector$(): Observable<cubModel.ContractMarco[]> {
    return this.store.select(cubicacionSelectors.getConstractMarco);
  }
  // CONSTRACT MARCO

  // SUBCONTRACTPROVIDERS
  public getSubContractedProvidersAction(data): void {
    this.store.dispatch(cubicacionActions.getSubContractProviders(data));
  }

  public getSubContractedProvidersSuccess(
    subContractedProviders: cubModel.Provider[]
  ): void {
    this.store.dispatch(
      cubicacionActions.getSubContractProvidersSuccess({
        subContractedProviders,
      })
    );
  }

  public getProvidersSelector$(): Observable<cubModel.Provider[]> {
    return this.store.select(cubicacionSelectors.getSubContractedProviders);
  }
  // SUBCONTRACTPROVIDERS

  // SUBCONTRACTREGIONS
  public getSubContractedRegionsAction(data): void {
    this.store.dispatch(cubicacionActions.getSubContractedRegions(data));
  }

  public getSubContractedRegionsSuccess(
    subContractedRegions: cubModel.Region[]
  ): void {
    this.store.dispatch(
      cubicacionActions.getSubContractedRegionsSuccess({ subContractedRegions })
    );
  }

  public getRegionsSelector$(): Observable<cubModel.Region[]> {
    return this.store.select(cubicacionSelectors.getSubContractedRegions);
  }
  // SUBCONTRACTREGIONS

  // SUBCONTRACTTYPESERVICES
  public getSubContractedTypeServicesAction(data): void {
    this.store.dispatch(cubicacionActions.getSubContractedTypeServices(data));
  }

  public getSubContractedTypeServicesSuccess(
    subContractedTypeServices: cubModel.TypeService[]
  ): void {
    this.store.dispatch(
      cubicacionActions.getSubContractedTypeServicesSuccess({
        subContractedTypeServices,
      })
    );
  }

  public getTypeServicesSelector$(): Observable<cubModel.TypeService[]> {
    return this.store.select(cubicacionSelectors.getSubContractedTypeServices);
  }
  // SUBCONTRACTTYPESERVICES

  // SUBCONTRACTSERVICES
  public getSubContractedServicesAction(data): void {
    this.store.dispatch(cubicacionActions.getSubContractedServices(data));
  }

  public getSubContractedServicesSuccess(
    subContractedServices: cubModel.Service[]
  ): void {
    this.store.dispatch(
      cubicacionActions.getSubContractedServicesSuccess({
        subContractedServices,
      })
    );
  }

  public getServicesSelector$(): Observable<cubModel.Service[]> {
    return this.store.select(cubicacionSelectors.getSubContractedServices);
  }

  public resetData(): void {
    this.store.dispatch(cubicacionActions.resetData());
  }
  // SUBCONTRACTSERVICES
  // CUBICACION
  // CONSTRACT MARCO
  public getAutoSuggestAction(filter: string, cantidad: number): void {
    this.store.dispatch(cubicacionActions.getAutoSuggest({ filter, cantidad }));
  }

  public getAutoSuggestSuccess(contractMarco: cubModel.ContractMarco[]): void {
    this.store.dispatch(
      cubicacionActions.getContractMarcoSuccess({ contractMarco })
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
    cubicacion: cubModel.ResponseGetAllCub,
    cubicacion_id: number
  ): void {
    this.store.dispatch(
      cubicacionActions.clonarCubicacion({ cubicacion, cubicacion_id })
    );
  }
}
