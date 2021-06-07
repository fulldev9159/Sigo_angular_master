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
  AutoSuggestForm
} from './cubicacion.model';

@Injectable({
  providedIn: 'root',
})
export class CubicacionFacade {
  constructor(private store: Store<Cubicacion>) {}

  // CUBICACION
  public getCubicacion(): void {
    this.store.dispatch(cubicacionActions.getCubicacion());
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
  public getContractMarcoAction(): void {
    this.store.dispatch(cubicacionActions.getContractMarco());
  }

  public getContractMarcoSuccess(contractMarco: ContractMarco[]): void {
    this.store.dispatch(
      cubicacionActions.getContractMarcoSuccess({ contractMarco })
    );
  }

  public getContractMarcoSelector$(): Observable<ContractMarco[]> {
    return this.store.select(cubicacionSelectors.getConstractMarco);
  }
  // CONSTRACT MARCO

  // SUBCONTRACTPROVIDERS
  public getSubContractedProvidersAction(data): void {
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

  public getSubContractedProvidersSelector$(): Observable<
    SubContractedProviders[]
  > {
    return this.store.select(cubicacionSelectors.getSubContractedProviders);
  }
  // SUBCONTRACTPROVIDERS

  // SUBCONTRACTREGIONS
  public getSubContractedRegionsAction(data): void {
    this.store.dispatch(cubicacionActions.getSubContractedRegions(data));
  }

  public getSubContractedRegionsSuccess(
    subContractedRegions: SubContractedRegions[]
  ): void {
    this.store.dispatch(
      cubicacionActions.getSubContractedRegionsSuccess({ subContractedRegions })
    );
  }

  public getSubContractedRegionsSelector$(): Observable<
    SubContractedRegions[]
  > {
    return this.store.select(cubicacionSelectors.getSubContractedRegions);
  }
  // SUBCONTRACTREGIONS

  // SUBCONTRACTTYPESERVICES
  public getSubContractedTypeServicesAction(data): void {
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

  public getSubContractedTypeServicesSelector$(): Observable<
    SubContractedTypeServices[]
  > {
    return this.store.select(cubicacionSelectors.getSubContractedTypeServices);
  }
  // SUBCONTRACTTYPESERVICES

  // SUBCONTRACTSERVICES
  public getSubContractedServicesAction(data): void {
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

  public getSubContractedServicesSelector$(): Observable<
    SubContractedServices[]
  > {
    return this.store.select(cubicacionSelectors.getSubContractedServices);
  }

  public resetData(): void {
    this.store.dispatch(cubicacionActions.resetData());
  }
  // SUBCONTRACTSERVICES
  // CUBICACION
  // CONSTRACT MARCO
  public getAutoSuggestAction(filter: string, cantidad: number): void {
    this.store.dispatch(cubicacionActions.getAutoSuggest({filter, cantidad}));
  }

  public getAutoSuggestSuccess(contractMarco: ContractMarco[]): void {
    this.store.dispatch(
      cubicacionActions.getContractMarcoSuccess({ contractMarco })
    );
  }

  public getAutoSuggestSelector$(): Observable<AutoSuggestForm[]> {
    return this.store.select(cubicacionSelectors.getAutoSuggest);
  }
}
