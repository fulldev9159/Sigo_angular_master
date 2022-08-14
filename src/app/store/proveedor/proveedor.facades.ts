import { Injectable } from '@angular/core';
import {
  AgenciaContrato,
  PerfilesUsuario,
  ProveedorAgenciaContrato,
  Response,
} from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as proveedorSelectors from './proveedor.selectors';
import * as proveedorActions from './proveedor.actions';

@Injectable({
  providedIn: 'root',
})
export class ProveedorFacade {
  constructor(private store: Store<any>) {}

  // GET PROVEEDORES DE UNA AGENCIAS DE UN CONTRATO
  public getProveedoresAgenciaContrato(
    agencia_id: number,
    contrato_id: number
  ): void {
    this.store.dispatch(
      proveedorActions.getProveedoresAgenciaContrato({
        agencia_id,
        contrato_id,
      })
    );
  }

  public getProveedoresAgenciaContrato$(): Observable<
    ProveedorAgenciaContrato[]
  > {
    return this.store.select(proveedorSelectors.getProveedoresAgenciasContrato);
  }
}
