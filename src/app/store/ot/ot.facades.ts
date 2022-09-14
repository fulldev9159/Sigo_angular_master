import { Injectable } from '@angular/core';
import {
  AgenciaContrato,
  ContratosUser,
  Cubicacion,
  CubicacionContrato,
  DetalleCubicacion,
  PerfilesUsuario,
  ProveedorAgenciaContrato,
  RequestCreateCubicacion,
  RequestEditCubicacion,
  Response,
  TipoCubicacion,
} from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as otSelectors from './ot.selectors';
import * as cubicacionActions from './ot.actions';

@Injectable({
  providedIn: 'root',
})
export class OTFacade {
  constructor(private store: Store<any>) {}

  // GET TIPOS DE CUBICACIONES
  public cubicacionSelected(cubicacionSelected: CubicacionContrato): void {
    this.store.dispatch(
      cubicacionActions.cubicacionSelected({ cubicacionSelected })
    );
  }

  public cubicacionSelected$(): Observable<CubicacionContrato> {
    return this.store.select(otSelectors.cubicacionSelected);
  }
}
