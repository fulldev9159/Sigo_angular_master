import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as cubicacionActions from './cubicacion.actions';
import * as cubicacionSelectors from './cubicacion.selectors';
import {
  ContractMarco,
  Cubicacion,
  SubContractedProviders,
  SubContractedRegions,
  SubContractedServices,
  SubContractedTypeServices,
} from './cubicacion.model';

@Injectable({
  providedIn: 'root',
})
export class CubicacionFacade {
  constructor(private store: Store<Cubicacion>) {}

  // CUBICACION
  public getCubicacion(data): void {
    this.store.dispatch(cubicacionActions.getCubicacion(data));
  }

  public getCubicacion$(): Observable<Cubicacion[]> {
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
  public replyCubicacion(cubicacion: Cubicacion): void {
    this.store.dispatch(cubicacionActions.replyCubicacion({ cubicacion }));
  }
  // REPLY

  // POST
  public postCubicacion(cubicacion): void {
    this.store.dispatch(cubicacionActions.postCubicacion({ cubicacion }));
  }
  // POST

  // CONSTRACT MARCO
  public getContractMarco(data): void {
    this.store.dispatch(cubicacionActions.getContractMarco(data));
  }

  public getContractMarcoSuccess(contractMarco: ContractMarco[]): void {
    this.store.dispatch(
      cubicacionActions.getContractMarcoSuccess({ contractMarco })
    );
  }

  public getContractMarco$(): Observable<ContractMarco[]> {
    return this.store.select(cubicacionSelectors.getConstractMarco);
  }
  // CONSTRACT MARCO

  // SUBCONTRACTPROVIDERS
  public getSubContractedProviders(data): void {
    this.store.dispatch(cubicacionActions.getSubContractProviders(data));
  }

  public getSubContractedProvidersSuccess(
    subContractedProviders: SubContractedProviders[]
  ): void {
    this.store.dispatch(
      cubicacionActions.getSubContractProvidersSuccess({
        subContractedProviders,
      })
    );
  }

  public getSubContractedProviders$(): Observable<SubContractedProviders[]> {
    return this.store.select(cubicacionSelectors.getSubContractedProviders);
  }
  // SUBCONTRACTPROVIDERS

  // SUBCONTRACTREGIONS
  public getSubContractedRegions(data): void {
    this.store.dispatch(cubicacionActions.getSubContractedRegions(data));
  }

  public getSubContractedRegionsSuccess(
    subContractedRegions: SubContractedRegions[]
  ): void {
    this.store.dispatch(
      cubicacionActions.getSubContractedRegionsSuccess({ subContractedRegions })
    );
  }

  public getSubContractedRegions$(): Observable<SubContractedRegions[]> {
    return this.store.select(cubicacionSelectors.getSubContractedRegions);
  }
  // SUBCONTRACTREGIONS

  // SUBCONTRACTTYPESERVICES
  public getSubContractedTypeServices(data): void {
    this.store.dispatch(cubicacionActions.getSubContractedTypeServices(data));
  }

  public getSubContractedTypeServicesSuccess(
    subContractedTypeServices: SubContractedTypeServices[]
  ): void {
    this.store.dispatch(
      cubicacionActions.getSubContractedTypeServicesSuccess({
        subContractedTypeServices,
      })
    );
  }

  public getSubContractedTypeServices$(): Observable<
    SubContractedTypeServices[]
  > {
    return this.store.select(cubicacionSelectors.getSubContractedTypeServices);
  }
  // SUBCONTRACTTYPESERVICES

  // SUBCONTRACTSERVICES
  public getSubContractedServices(data): void {
    this.store.dispatch(cubicacionActions.getSubContractedServices(data));
  }

  public getSubContractedServicesSuccess(
    subContractedServices: SubContractedServices[]
  ): void {
    this.store.dispatch(
      cubicacionActions.getSubContractedServicesSuccess({
        subContractedServices,
      })
    );
  }

  public getSubContractedServices$(): Observable<SubContractedServices[]> {
    return this.store.select(cubicacionSelectors.getSubContractedServices);
  }

  public resetData(): void {
    this.store.dispatch(cubicacionActions.resetData());
  }
  // SUBCONTRACTSERVICES
  // CUBICACION
}
