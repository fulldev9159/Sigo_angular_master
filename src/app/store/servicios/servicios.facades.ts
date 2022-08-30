import { Injectable } from '@angular/core';
import {
  CarritoService,
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

  // ADD SERVICIO TO CARRITO
  public addServicioCarrito(
    requestService: RequestGetDetallesServicioTipoAgenciaContratoProveedor,
    uo_codigo: string
  ): void {
    this.store.dispatch(
      serviciosActions.addServicioCarrito({ requestService, uo_codigo })
    );
  }

  public carrito$(): Observable<CarritoService[]> {
    return this.store.select(serviciosSelectors.carrito);
  }

  // ALERTA PARA INDICAR QUE YA EXISTE UN SERVICIO EN EL CARRITO
  public alertServicioExistenteCarrito(value: boolean): void {
    this.store.dispatch(
      serviciosActions.alertServicioExistenteCarrito({ value })
    );
  }

  public alertServicioExistenteCarrito$(): Observable<boolean> {
    return this.store.select(serviciosSelectors.alertServicioExistenteCarrito);
  }

  // DETELE FROM CARRITO
  public deleteServicioFromCarrito(servicio_id: number): void {
    this.store.dispatch(
      serviciosActions.deleteServicioFromCarrito({ servicio_id })
    );
  }

  public deleteUOFromServicioFromCarrito(
    servicio_id: number,
    uo_codigo: string
  ): void {
    this.store.dispatch(
      serviciosActions.deleteUOFromServicioFromCarrito({
        servicio_id,
        uo_codigo,
      })
    );
  }

  // RESETS
  public resetServiciosAgenciaContratoProveedor(): void {
    this.store.dispatch(
      serviciosActions.resetServiciosAgenciaContratoProveedor()
    );
  }
  public resetUnidadesObraServicio(): void {
    this.store.dispatch(serviciosActions.resetUnidadesObraServicio());
  }

  public resetServicioSelected(): void {
    this.store.dispatch(serviciosActions.resetServicioSelected());
  }
}
