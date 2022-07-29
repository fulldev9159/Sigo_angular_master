import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as loadingSelector from './loadings.selectors';

@Injectable({
  providedIn: 'root',
})
export class LoadingsFacade {
  constructor(private store: Store<any>) {}

  public sendigLoading$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingLogin);
  }
}
