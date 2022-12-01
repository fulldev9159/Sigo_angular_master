import { Injectable } from '@angular/core';
import {} from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ingenieriaSelectors from './ingenieria.selectors';
import * as ingenieriaActions from './ingenieria.actions';

@Injectable({
  providedIn: 'root',
})
export class IngenieriaFacade {
  constructor(private store: Store<any>) {}

  // ENVIAR RESULTADO INGENIERIA
  public enviarResultadoIngenieria(ot_id: number): void {
    this.store.dispatch(ingenieriaActions.enviarResultadoIngenieria({ ot_id }));
  }
}
