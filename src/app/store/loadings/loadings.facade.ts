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

  // REFRESH LOGIN
  public sendingRefreshLogin$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingRefreshLogin);
  }

  // GET PERMISOS PERFIL USER
  public sendingPermisosPerfilUser$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingPermisosPerfilUser4Login);
  }

  // GET AGENCIAS DE UN CONTRATO
  public sendingGetAgenciasContrato$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetAgenciasContrato);
  }

  // GET PROVEEDORES AGENCIAS DE UN CONTRATO
  public sendingGetProveedoresAgenciasContrato$(): Observable<boolean> {
    return this.store.select(
      loadingSelector.sendingGetProveedorAgenciasContrato
    );
  }

  // GET ACTIVIDADES DE UN CONTRATO/PROVEEDOR
  public sendingGetActividadesContratoProveedor$(): Observable<boolean> {
    return this.store.select(
      loadingSelector.sendingGetActividadesContratoProveedor
    );
  }

  // GET TIPO DE SERVICIOS DE UN CONTRATO/PROVEEDOR
  public sendingGetTipoServiciosContrato$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetTipoServiciosContrato);
  }

  // GET  SERVICIOS DE UNA AGENCIA/CONTRATO/PROVEEDOR
  public sendingGetServiciosAgenciaContratoProveedor$(): Observable<boolean> {
    return this.store.select(
      loadingSelector.sendingGetServiciosAgenciaContratoProveedor
    );
  }

  // GET UNIDADES OBRA DE UN SERVICIO DE UNA AGENCIA/CONTRATO/PROVEEDOR
  public sendingGetUnidadesObraServicios$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetUnidadesObraServicios);
  }

  // AGREGAR SERVICIO A CARRITO
  public sendingAgregarServicioCarrito$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingAgregarServicioCarrito);
  }

  // SAVE CUBICACION
  public sendingSaveCubicacion$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingSaveCubicacion);
  }

  // GET CUBICACIONES
  public sendingGetCubicaciones$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetCubicaciones);
  }

  // GET DETALLE CUBICACION
  public sendingDetalleCubicacion$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingDetalleCubicacion);
  }

  // CLONAR CUBICACION
  public sendingClonarCubicacion$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingClonarCubicacion);
  }

  // CUBICACIONES DE UN CONTRATO ESPECIFICO
  public sendingGetCubicacionesContrato$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetCubicacionesContrato);
  }

  // OFICINA CENTRAL
  public sendingGetOficinaCentral$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetOficinaCentral);
  }

  // SOLICITADO POR
  public sendingGetSolicitadoPor$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetSolicitadoPor);
  }

  // COMUNAS FROM CUB
  public sendingGetComunasFromCub$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetComunasFromCub);
  }

  // TIPO DE RED
  public sendingGetTipoDeRed$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetTipoDeRed);
  }

  // TIPO DE TRABAJO
  public sendingGetTipoDeTrabajoFromCub$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetTipoDeTrabajoFromCub);
  }
  // AREA DE NEGOCIO
  public sendingGetAreaDeNegocio$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetAreaDeNegocio);
  }

  // NUMERO INTERNO
  public sendingGetTipoNumeroInterno$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetTipoNumeroInterno);
  }

  // OTS FROM NUMERO INTERNO
  public sendingGetOTsFromNumeroInterno$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetOTsFromNumeroInterno);
  }

  // PLANES DE PROYECTO
  public sendingGetPlanDeProyecto$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetPlanDeProyecto);
  }
  // SITIO PLAN
  public sendingGetSitioPlan$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetSitioPlan);
  }

  // SUSTENTO FINANCIERO
  public sendingGetPMO$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetPMO);
  }

  public sendingGetLP$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetLP);
  }

  public sendingGetPEP2$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetPEP2);
  }

  public sendingGetOPEX$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetOPEX);
  }

  public sendingGetSAP$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetSAP);
  }

  public sendingGetCECO$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetCECO);
  }

  public sendingGetAdminContratoFromCub$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetAdminContratoFromCub);
  }
  public sendingGetProyectos$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetProyectos);
  }

  public sendingCreateOT$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingCreateOT);
  }

  public sendingDownloadOTsAsignadas$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingDownloadOTsAsignadas);
  }

  public sendingGetPosibleSupervisorTrabajos$(): Observable<boolean> {
    return this.store.select(
      loadingSelector.sendingGetPosibleSupervisorTrabajos
    );
  }

  public sendingSendBorradorInformeAvance$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingSendBorradorInformeAvance);
  }

  public sendingGetPerfiles$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingGetPerfiles);
  }

  public sendingInformarTrabajosFinalizados$(): Observable<boolean> {
    return this.store.select(
      loadingSelector.sendingInformarTrabajosFinalizados
    );
  }

  public sendingAprobacionPago$(): Observable<boolean> {
    return this.store.select(loadingSelector.sendingAprobacionPago);
  }
}
