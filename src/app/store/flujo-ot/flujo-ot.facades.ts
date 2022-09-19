import { Injectable } from '@angular/core';
import { RequestAceptarRechazarOT } from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as flujoOTSelectors from './flujo-ot.selectors';
import * as flujoOTActions from './flujo-ot.actions';

@Injectable({
  providedIn: 'root',
})
export class FlujoOTFacade {
  constructor(private store: Store<any>) {}

  // ACEPTAR O RECHAZAR INCIAL
  public aceptarRechazarIncialOT(request: RequestAceptarRechazarOT): void {
    this.store.dispatch(flujoOTActions.aceptarRechazarIncialOT({ request }));
  }
}
