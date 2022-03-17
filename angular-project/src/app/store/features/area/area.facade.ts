import { Injectable } from '@angular/core';
import { Area, RequestEditArea } from '@data';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as areaActions from './area.actions';
import * as areaSelectors from './area.selectors';

@Injectable({
  providedIn: 'root',
})
export class AreaFacade {
  constructor(private store: Store<any>) {}

  public reset(): void {
    this.store.dispatch(areaActions.reset());
  }

  public getAreas(): void {
    this.store.dispatch(areaActions.getAreas());
  }

  public getAreas$(): Observable<Area[]> {
    return this.store.select(areaSelectors.getAreas);
  }

  public getAreaSelected(area_id: number): void {
    this.store.dispatch(areaActions.getArea({ area_id }));
  }

  public getAreaSelected$(): Observable<Area> {
    return this.store.select(areaSelectors.getAreaSelected);
  }

  public updateArea(request: RequestEditArea): void {
    this.store.dispatch(areaActions.updateArea({ request }));
  }
}
