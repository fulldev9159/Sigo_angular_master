import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as cubicacionActions from './cubicacion.actions';
import * as cubicacionSelectors from './cubicacion.selectors';
import {
  ContractMarco,
  Cubicacion,
  Provider,
  Region,
  Service,
  TypeService,
  AutoSuggestItem,
} from './cubicacion.model';

@Injectable({
  providedIn: 'root',
})
export class CubicacionFacade {
  constructor(private store: Store<Cubicacion>) {}

  // CUBICACION
  public getCubicacion(perfilID: number): void {
    this.store.dispatch(cubicacionActions.getCubicacion({perfilID}));
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
    subContractedProviders: Provider[]
  ): void {
    this.store.dispatch(
      cubicacionActions.getSubContractProvidersSuccess({
        subContractedProviders,
      })
    );
  }

  public getProvidersSelector$(): Observable<
    Provider[]
  > {
    return this.store.select(cubicacionSelectors.getSubContractedProviders);
  }
  // SUBCONTRACTPROVIDERS

  // SUBCONTRACTREGIONS
  public getSubContractedRegionsAction(data): void {
    this.store.dispatch(cubicacionActions.getSubContractedRegions(data));
  }

  public getSubContractedRegionsSuccess(
    subContractedRegions: Region[]
  ): void {
    this.store.dispatch(
      cubicacionActions.getSubContractedRegionsSuccess({ subContractedRegions })
    );
  }

  public getRegionsSelector$(): Observable<
    Region[]
  > {
    return this.store.select(cubicacionSelectors.getSubContractedRegions);
  }
  // SUBCONTRACTREGIONS

  // SUBCONTRACTTYPESERVICES
  public getSubContractedTypeServicesAction(data): void {
    this.store.dispatch(cubicacionActions.getSubContractedTypeServices(data));
  }

  public getSubContractedTypeServicesSuccess(
    subContractedTypeServices: TypeService[]
  ): void {
    this.store.dispatch(
      cubicacionActions.getSubContractedTypeServicesSuccess({
        subContractedTypeServices,
      })
    );
  }

  public getTypeServicesSelector$(): Observable<
    TypeService[]
  > {
    return this.store.select(cubicacionSelectors.getSubContractedTypeServices);
  }
  // SUBCONTRACTTYPESERVICES

  // SUBCONTRACTSERVICES
  public getSubContractedServicesAction(data): void {
    this.store.dispatch(cubicacionActions.getSubContractedServices(data));
  }

  public getSubContractedServicesSuccess(
    subContractedServices: Service[]
  ): void {
    this.store.dispatch(
      cubicacionActions.getSubContractedServicesSuccess({
        subContractedServices,
      })
    );
  }

  public getServicesSelector$(): Observable<
    Service[]
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
    this.store.dispatch(cubicacionActions.getAutoSuggest({ filter, cantidad }));
  }

  public getAutoSuggestSuccess(contractMarco: ContractMarco[]): void {
    this.store.dispatch(
      cubicacionActions.getContractMarcoSuccess({ contractMarco })
    );
  }

  public getAutoSuggestSelector$(): Observable<AutoSuggestItem[]> {
    return this.store.select(cubicacionSelectors.getAutoSuggest);
  }
}
