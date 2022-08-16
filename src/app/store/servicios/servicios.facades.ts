import { Injectable } from '@angular/core';
import {
  ContratosUser,
  PerfilesUsuario,
  RequestGetServiciosAgenciaContratoProveedor,
  Response,
  ServicioAgenciaContratoProveedor,
  TipoCubicacion,
} from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as serviciosSelectors from './servicios.selectors';
import * as serviciosActions from './servicios.actions';

@Injectable({
  providedIn: 'root',
})
export class ServiciosFacade {
  constructor(private store: Store<any>) {}

  // GET SERVICIOS DE UNA AGENCIA/CONTRATO/PROVEEDOR
  public getServiciosAgenciaContratoProveedor(
    request: RequestGetServiciosAgenciaContratoProveedor
  ): void {
    this.store.dispatch(
      serviciosActions.getServiciosAgenciaContratoProveedor({ request })
    );
  }

  public getServiciosAgenciaContratoProveedor$(): Observable<
    ServicioAgenciaContratoProveedor[]
  > {
    return this.store.select(
      serviciosSelectors.getServiciosAgenciaContratoProveedor
    );
  }
}
