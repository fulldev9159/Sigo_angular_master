import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as loadingSelector from './loadings.selectors';
import * as loadingsActions from './loadings.actions';

@Injectable({
  providedIn: 'root',
})
export class LoadingsFacade {
  constructor(private store: Store<any>) {}

  // LOGIN
  public sendigLoading$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingLogin);
  }

  // GET PERFIL USUARIO
  public sendingGetPerfilesUser(): void {
    this.store.dispatch(loadingsActions.sendingGetPerfilesUser());
  }
  public sendingGetPerfilesUser$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetPerfilesUser);
  }

  // 
}
