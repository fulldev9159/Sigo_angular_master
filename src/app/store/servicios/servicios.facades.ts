import { Injectable } from '@angular/core';
import {
  ContratosUser,
  PerfilesUsuario,
  RequestGetDetallesServicioTipoAgenciaContratoProveedor,
  RequestGetServicioTipoAgenciaContratoProveedor,
  Response,
  ServicioAgenciaContratoProveedor,
  TipoCubicacion,
} from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as serviciosSelectors from './servicios.selectors';
import * as serviciosActions from './servicios.actions';
import {
  RequestGetUnidadObraServicio,
  UnidadObraServicio,
} from 'src/app/core/model/unidad-obra';

@Injectable({
  providedIn: 'root',
})
export class ServiciosFacade {
  constructor(private store: Store<any>) {}

  // GET SERVICIOS DE UNA AGENCIA/CONTRATO/PROVEEDOR
  public getServiciosAgenciaContratoProveedor(
    request: RequestGetServicioTipoAgenciaContratoProveedor
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

  // GET UNIDADES DE OBRA DE UN SERVICIO DE UNA AGENCIA/CONTRATO/PROVEEDOR
  public getUnidadesObraServicio(request: RequestGetUnidadObraServicio): void {
    this.store.dispatch(serviciosActions.getUnidadesObraServicio({ request }));
  }

  public getUnidadesObraServicio$(): Observable<UnidadObraServicio[]> {
    return this.store.select(serviciosSelectors.getUnidadesObraServicio);
  }

  // SERVICIO SELECTED
  public servicioSelected(
    servicioSelected: ServicioAgenciaContratoProveedor
  ): void {
    this.store.dispatch(
      serviciosActions.servicioSelected({ servicioSelected })
    );
  }

  public servicioSelected$(): Observable<ServicioAgenciaContratoProveedor> {
    return this.store.select(serviciosSelectors.servicioSelected);
  }

  // UNIDAD DE OBRA SELECTED
  public unidadObraSelected(unidadObraSelected: UnidadObraServicio): void {
    this.store.dispatch(
      serviciosActions.unidadObraSelected({ unidadObraSelected })
    );
  }

  public unidadObraSelected$(): Observable<UnidadObraServicio> {
    return this.store.select(serviciosSelectors.unidadObraSelected);
  }

  // SERVICIO EXISTENTE
  public theServiceExist(): Observable<boolean> {
    return this.store.select(serviciosSelectors.theServicioExist);
  }

  // ADD SERVICIO TO CARRITO
  public addServicioCarrito(
    request: RequestGetDetallesServicioTipoAgenciaContratoProveedor
  ): void {
    this.store.dispatch(serviciosActions.addServicioCarrito({ request }));
  }

  // ADD UNIDAD DE OBRA TO SERVICIO TO CARRITO
  public addUnidadObraCarrito(servicio_id: number, uo_codigo: string): void {
    this.store.dispatch(
      serviciosActions.addUnidadObraCarrito({ servicio_id, uo_codigo })
    );
  }
}
