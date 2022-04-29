import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as baseActions from './base.actions';
import * as baseSelectors from './base.selectors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseFacade {
  constructor(private store: Store<any>) {}

  public loading(action: boolean): void {
    this.store.dispatch(baseActions.loading({ action }));
  }

  public loading$(): Observable<boolean> {
    return this.store.select(baseSelectors.getLoading);
  }
}
