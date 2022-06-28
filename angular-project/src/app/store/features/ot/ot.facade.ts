import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as otActions from './ot.actions';
import * as otSelectors from './ot.selectors';
import * as Data from '@data';
import {
  Response,
  ContratosUser,
  DataInformeAvance,
  LpuInformeAvanceDetalle,
  PMO,
  RequestGetOTs,
  RequestSaveBorradorInformeAvance,
  RequestSaveInformeAvance,
  RequestSaveInformeAvanceAdmin,
  LP,
  PEP2,
  OPEX,
  SAP,
  CECO,
  Cubs4OT,
  Proyectos,
  AdminContrato4OT,
  OficinaCentral,
  SolicitadoPor,
  Comuna,
  TipoDeRed,
  TipoDeTrabajo,
  AreaDeNegocio,
  PlanDeProyecto,
  Sitio,
  TipoNumeroInterno,
  NumeroInternoHasOT,
  RequestCreateOTMovil,
  RequestCreateOTFijo,
  RequestCreateOTOrdinario,
  RequestCreateOTBucle,
  DataRespGetDetalleOT,
  RequestAceptarRechazarOT,
  MotivoRechazo,
  PosibleTrabajador,
  DetalleInformeAvance,
  ReqCreateRegistroLibroObra,
  ActaTipoPago,
} from '@data';
import {
  DetalleActa,
  RequestSaveInformeActaGestor,
  RequestSolicitudPagoActa,
} from '@data/model/acta';

@Injectable({
  providedIn: 'root',
})
export class OtFacade {
  constructor(private store: Store<Data.OT>) {}

  // GET OT
  public getOts(request: RequestGetOTs): void {
    this.store.dispatch(
      otActions.getOts({
        request: {
          ...request,
          filtro_pestania: 'EN_EJECUCION',
        },
      })
    );
    this.store.dispatch(
      otActions.getOts({
        request: {
          ...request,
          filtro_pestania: 'ABIERTAS',
        },
      })
    );
    this.store.dispatch(
      otActions.getOts({
        request: {
          ...request,
          filtro_pestania: 'CERRADAS',
        },
      })
    );
  }

  //   GET CONTRATOS USER 4 CUB
  public contratosUser4OT(usuario_id: number): void {
    this.store.dispatch(otActions.getContratosUser4OT({ usuario_id }));
  }

  public contratosUser4OT$(): Observable<ContratosUser[]> {
    return this.store.select(otSelectors.contratosUser4OT);
  }

  //   GET CUBICACIONES 4 CUB
  public cubicaciones4OT(contrato_id: number): void {
    this.store.dispatch(otActions.getCubicaciones4OT({ contrato_id }));
  }

  public cubicaciones4OT$(): Observable<Cubs4OT[]> {
    return this.store.select(otSelectors.cubicaciones4OT);
  }

  //    CUBICACIONES SELECCIONADA
  public cubicacionSeleccionada(cubicacion: Cubs4OT): void {
    this.store.dispatch(otActions.cubicacionSeleccionada({ cubicacion }));
  }
  public cubicacionSeleccionada$(): Observable<Cubs4OT> {
    return this.store.select(otSelectors.cubicacionSeleccionada);
  }

  // PMOS
  public getPMO(sitio_codigo: string): void {
    this.store.dispatch(otActions.getPMO({ sitio_codigo }));
  }

  public getPMO$(): Observable<PMO[]> {
    return this.store.select(otSelectors.getPMO);
  }

  // LPS
  public getLP(pmo_id: number): void {
    this.store.dispatch(otActions.getLineaPresupuestaria({ pmo_id }));
  }

  public getLP$(): Observable<LP[]> {
    return this.store.select(otSelectors.getLps);
  }

  // PEP2
  public getPEP2(
    pmo_codigo: number,
    linea_presupuestaria_codigo: string
  ): void {
    this.store.dispatch(
      otActions.getPEP2({ pmo_codigo, linea_presupuestaria_codigo })
    );
  }

  public getPEP2$(): Observable<PEP2[]> {
    return this.store.select(otSelectors.getPeps2);
  }

  // OPEX
  public getIDsOpex(): void {
    this.store.dispatch(otActions.getIDOpex());
  }

  public getIDsOpex$(): Observable<OPEX[]> {
    return this.store.select(otSelectors.getIDsOpex);
  }

  // Cuentas SAP
  public getCuentaSAP(id_opex: string): void {
    this.store.dispatch(otActions.getCuentaSAP({ id_opex }));
  }

  public getCuentaSAP$(): Observable<SAP[]> {
    return this.store.select(otSelectors.getCuentasSAP);
  }

  // CECOs
  public getCECO(id_opex: string, cuenta_sap: number): void {
    this.store.dispatch(otActions.getCECO({ id_opex, cuenta_sap }));
  }

  public getCECO$(): Observable<CECO[]> {
    return this.store.select(otSelectors.getCECOs);
  }

  // PROYECTOS
  public getProyecto(): void {
    this.store.dispatch(otActions.getProyecto());
  }

  public getProyecto$(): Observable<Proyectos[]> {
    return this.store.select(otSelectors.getProyectos);
  }

  // ADMIN CONTRATO
  public getAdminContrato(cubicacion_id: number): void {
    this.store.dispatch(otActions.getAdminContrato({ cubicacion_id }));
  }

  public getAdminContrato$(): Observable<AdminContrato4OT[]> {
    return this.store.select(otSelectors.getAdminContrato);
  }

  // BUCLE
  public getOficinaCentral(agencia_id: number): void {
    this.store.dispatch(otActions.getOficinaCentral({ agencia_id }));
  }

  public getOficinaCentral$(): Observable<OficinaCentral[]> {
    return this.store.select(otSelectors.getOficinaCentral);
  }

  public getSolicitadoPor(): void {
    this.store.dispatch(otActions.getSolicitadoPor());
  }

  public getSolicitadoPor$(): Observable<SolicitadoPor[]> {
    return this.store.select(otSelectors.getSolicitadoPor);
  }

  public getComuna(cubicacion_id: number): void {
    this.store.dispatch(otActions.getComuna({ cubicacion_id }));
  }

  public getComuna$(): Observable<Comuna[]> {
    return this.store.select(otSelectors.getComuna);
  }

  public getTipoDeRed(): void {
    this.store.dispatch(otActions.getTipoDeRed());
  }

  public getTipoDeRed$(): Observable<TipoDeRed[]> {
    return this.store.select(otSelectors.getTipoDeRed);
  }

  public getTipoDeTrabajo(cubicacion_id: number): void {
    this.store.dispatch(otActions.getTipoDeTrabajo({ cubicacion_id }));
  }

  public getTipoDeTrabajo$(): Observable<TipoDeTrabajo[]> {
    return this.store.select(otSelectors.getTipoDeTrabajo);
  }

  public getAreaDeNegocio(): void {
    this.store.dispatch(otActions.getAreaDeNegocio());
  }

  public getAreaDeNegocio$(): Observable<AreaDeNegocio[]> {
    return this.store.select(otSelectors.getAreaDeNegocio);
  }

  // MOVIL

  public getPlanDeProyecto(): void {
    this.store.dispatch(otActions.getPlanDeProyecto());
  }

  public getPlanDeProyecto$(): Observable<PlanDeProyecto[]> {
    return this.store.select(otSelectors.getPlans);
  }

  public getSitio(plan_id: number): void {
    this.store.dispatch(otActions.getSitio({ plan_id }));
  }

  public getSitio$(): Observable<Sitio[]> {
    return this.store.select(otSelectors.getSitio);
  }

  // FIJO
  // TIPO NUMERO INTERNO
  public getTipoNumeroInterno(): void {
    this.store.dispatch(otActions.getTipoNumeroInterno());
  }

  public getTipoNumeroInterno$(): Observable<TipoNumeroInterno[]> {
    return this.store.select(otSelectors.getTipoNumeroInterno);
  }

  // NUMERO INTERNO HAS OT
  public getNumeroInternoHasOT(numero_interno: string): void {
    this.store.dispatch(otActions.getNumeroInternoHasOT({ numero_interno }));
  }

  public getNumeroInternoHasOT$(): Observable<NumeroInternoHasOT[]> {
    return this.store.select(otSelectors.getNumeroInternoHasOT);
  }

  // CREATE OT
  public createOT(
    request:
      | RequestCreateOTBucle
      | RequestCreateOTFijo
      | RequestCreateOTMovil
      | RequestCreateOTOrdinario
  ): void {
    this.store.dispatch(otActions.createOT({ request }));
  }

  // GET ALL MOTIVO RECHAZO
  public getAllMotivoRechazoOT(tipo: string): void {
    this.store.dispatch(otActions.getAllMotivoRechazoOT({ tipo }));
  }

  public getAllMotivoRechazoOT$(): Observable<MotivoRechazo[]> {
    return this.store.select(otSelectors.getAllMotivoRechazoOT);
  }

  // ACEPTAR O RECHAZAR INCIAL
  public AceptarRechazarIncialOT(request: RequestAceptarRechazarOT): void {
    this.store.dispatch(otActions.AceptarRechazarIncialOT({ request }));
  }

  // Trabajador Supervisor OT
  public getPosibleTrabajador(ot_id: number): void {
    this.store.dispatch(otActions.getPosibleTrabajador({ ot_id }));
  }

  public getPosibleTrabajador$(): Observable<PosibleTrabajador[]> {
    return this.store.select(otSelectors.getPosibleTrabajador);
  }

  // ACEPTAR PROVEDOR
  public AceptarProveedorOT(
    request: RequestAceptarRechazarOT,
    ot_id: number,
    proxy_id: number,
    concepto: string
  ): void {
    this.store.dispatch(
      otActions.AceptarProveedorOT({ request, ot_id, proxy_id, concepto })
    );
  }

  // ASIGNAR SUPERVISOR DE TRABAJOS
  public AsignarSupervisorTrabajos(
    ot_id: number,
    proxy_id: number,
    concepto: string
  ): void {
    this.store.dispatch(
      otActions.AsignarSupervisorTrabajosOT({ ot_id, proxy_id, concepto })
    );
  }

  // RECHAZAR PROVEEDOR
  public RechazarProveedorOT(request: RequestAceptarRechazarOT): void {
    this.store.dispatch(otActions.RechazarProveedorOT({ request }));
  }

  // GET DETALE INFORME DE AVANCE
  public getDetalleInformeAvance(ot_id: number): void {
    this.store.dispatch(otActions.getDetalleInformeAvance({ ot_id }));
  }

  public getDetalleInformeAvanceSuccess(response: any): void {
    this.store.dispatch(otActions.getDetalleInformeAvanceSuccess({ response }));
  }

  public getDetalleInformeAvance$(): Observable<DetalleInformeAvance> {
    return this.store.select(otSelectors.getDetalleInformeAvance);
  }

  public getDetalleInformeAvanceError$(): Observable<any> {
    return this.store.select(otSelectors.getDetalleInformeAvanceError);
  }

  // UPDATE DETALE INFORME DE AVANCE
  public updateDetalleInformeAvance(
    ot_id: number,
    id: number,
    data: {
      servicio: {
        row_id: number;
        cantidad: number;
      }[];
      unidad_obra: {
        row_id: number;
        cantidad: number;
      }[];
    }
  ): void {
    this.store.dispatch(
      otActions.updateDetalleInformeAvance({ ot_id, id, data })
    );
  }

  public updatingDetalleInformeAvance$(): Observable<boolean> {
    return this.store.select(otSelectors.updatingDetalleInformeAvance);
  }

  // SEND DETALE INFORME DE AVANCE
  public sendDetalleInformeAvance(ot_id: number): void {
    this.store.dispatch(otActions.sendDetalleInformeAvance({ ot_id }));
  }

  public sendingDetalleInformeAvance$(): Observable<boolean> {
    return this.store.select(otSelectors.sendingDetalleInformeAvance);
  }

  // GET ACTA TIPOS PAGO
  public getActaTiposPagoSuccess(
    response: Response<{ items: ActaTipoPago[] }>
  ): void {
    this.store.dispatch(otActions.getActaTiposPagoSuccess({ response }));
  }

  public getActaTiposPago$(): Observable<ActaTipoPago[]> {
    return this.store.select(otSelectors.getActaTiposPago);
  }

  // GET CATEGORIA ARCHIVO
  public getCategoriasArchivos(): void {
    this.store.dispatch(otActions.getCategoriasArchivos());
  }

  public getCategoriasArchivos$(): Observable<any[]> {
    return this.store.select(otSelectors.getCategoriasArchivos);
  }

  // SUBIR ARCHIVO/REGISTRO LIBRO OBRAS
  public subirArchivoRegistroLibroObras(
    tipo: number,
    files: any,
    request_libroobras: ReqCreateRegistroLibroObra
  ): void {
    this.store.dispatch(
      otActions.subirArchivoLibroObras({
        categoria_id: tipo,
        files,
        request_libroobras,
      })
    );
  }

  // CREATE REGISTRO LIBRO OBRAS
  public createRegistroLibroObras(request: ReqCreateRegistroLibroObra): void {
    this.store.dispatch(otActions.createRegistroLibroObras({ request }));
  }

  // GET LIBRO OBRAS
  public getLibroObras(ot_id: number): void {
    this.store.dispatch(otActions.getLibroObras({ ot_id }));
  }
  public getLibroObras$(): Observable<any[]> {
    return this.store.select(otSelectors.getLibroObras);
  }
  // Resets
  public resetData(): void {
    this.store.dispatch(otActions.resetData());
  }
  public resetContrato(): void {
    this.store.dispatch(otActions.resetContrato());
  }

  public resetPlanProyecto(): void {
    this.store.dispatch(otActions.resetPlan());
  }
  public resetSitio(): void {
    this.store.dispatch(otActions.resetSitio());
  }

  public resetPMO(): void {
    this.store.dispatch(otActions.resetPMO());
  }
  public resetLPs(): void {
    this.store.dispatch(otActions.resetLPs());
  }

  public resetSAP(): void {
    this.store.dispatch(otActions.resetSAP());
  }

  public resetPEP2(): void {
    this.store.dispatch(otActions.resetPEP2());
  }

  public resetCECO(): void {
    this.store.dispatch(otActions.resetCECO());
  }

  // ////

  public getOtEjecucion$(): Observable<Data.OT[]> {
    return this.store.select(otSelectors.getOtEjecucion);
  }

  public getOtAbiertas$(): Observable<Data.OT[]> {
    return this.store.select(otSelectors.getOtAbiertas);
  }

  public getOtCerradas$(): Observable<Data.OT[]> {
    return this.store.select(otSelectors.getOtCerradas);
  }
  public getOtFilters$(): Observable<{
    filtro_propietario: string;
    filtro_tipo: string;
  }> {
    return this.store.select(otSelectors.getOtFilters);
  }

  public selectOT(ot: Data.OT): void {
    this.store.dispatch(otActions.selectOT({ ot }));
  }

  public getSelectedOT$(): Observable<Data.OT> {
    return this.store.select(otSelectors.getSelectedOT);
  }

  // ESTADOS DE OT
  public approveOT(otID: number, coordinador_id: number): void {
    this.store.dispatch(otActions.approveOT({ otID, coordinador_id }));
  }

  public rejectOT(otID: number, motivo: string): void {
    this.store.dispatch(otActions.rejectOT({ otID, motivo }));
  }

  public cancelOT(otID: number): void {
    this.store.dispatch(otActions.cancelOT({ otID }));
  }

  public finalizeOTJobs(otID: number): void {
    this.store.dispatch(otActions.finalizeOTJobs({ otID }));
  }
  // ESTADOS DE OT

  // DELETE
  public deleteOt(position: number): void {
    this.store.dispatch(otActions.deleteOt({ otPosition: position }));
  }
  // DELETE

  // // REPLY
  // public replyOt(ot: OTmodel.RequestCreateOT): void {
  //   this.store.dispatch(otActions.replyOt({ ot }));
  // }
  // // REPLY

  // // POST
  // public postOt(
  //   ot: OTmodel.RequestCreateOT | OTmodel.RequestCreateOTFijo
  // ): void {
  //   this.store.dispatch(otActions.postOt({ ot }));
  // }

  // // IngreOT con SCE ***
  // public postOtSCE(ot: OTmodel.RequestCreateOT): void {
  //   this.store.dispatch(otActions.postOtSCE({ ot }));
  // }
  // // POST
  // // OT

  // Detalle OT
  public getDetalleOT(id: number): void {
    this.store.dispatch(otActions.getDetalleOT({ id }));
  }

  public getDetalleOT$(): Observable<DataRespGetDetalleOT> {
    return this.store.select(otSelectors.getDetalleOT);
  }

  // Coordinadores OT
  public getCoordinators(otID: number): void {
    this.store.dispatch(otActions.getCoordinators({ otID }));
  }

  // public getCoordinators$(): Observable<Data.User[]> {
  //   return this.store.select(otSelectors.getCoordinators);
  // }

  public assignCoordinator(otID: number, coordinatorID: number): void {
    this.store.dispatch(
      otActions.assignCoordinator({ otID, coordinador_id: coordinatorID })
    );
  }

  public assignTrabajador(otID: number, trabajadorID: number): void {
    this.store.dispatch(otActions.assignTrabajador({ otID, trabajadorID }));
  }

  // Actas
  public approveOTMinutesGeneration(otID: number): void {
    this.store.dispatch(otActions.approveOTMinutesGeneration({ otID }));
  }

  public rejectOTMinutesGeneration(otID: number): void {
    this.store.dispatch(otActions.rejectOTMinutesGeneration({ otID }));
  }

  public approveOTMinutesValidation(otID: number): void {
    this.store.dispatch(otActions.approveOTMinutesValidation({ otID }));
  }

  public rejectOTMinutesValidation(otID: number): void {
    this.store.dispatch(otActions.rejectOTMinutesValidation({ otID }));
  }

  // Pagos
  public authorizePayments(otID: number, user_id: number): void {
    this.store.dispatch(otActions.authorizePayments({ otID, user_id }));
  }

  public rejectPayments(otID: number): void {
    this.store.dispatch(otActions.rejectPayments({ otID }));
  }

  // Pagos
  public finalizeOT(otID: number): void {
    this.store.dispatch(otActions.finalizeOT({ otID }));
  }

  // Libro Obras
  public registrarLibroObras(registro: Data.RegistroLibroObraRequest): void {
    this.store.dispatch(otActions.registrarLibroObra({ registro }));
  }

  public getRegistrosLibroObras(ot_id: number): void {
    this.store.dispatch(otActions.getRegistrosLibroObra({ ot_id }));
  }

  // public getRegistrosLibroObras$(): Observable<Data.RegistroLibroObra[]> {
  //   return this.store.select(otSelectors.getRegistrosLibroObra);
  // }

  public getSavingOT$(): Observable<boolean> {
    return this.store.select(otSelectors.getSavingOT);
  }

  public getSaveOTError$(): Observable<Error> {
    return this.store.select(otSelectors.getSaveOTError);
  }

  // public inicializarInformeAvanceTrabajador(ot_id: number): void {
  //   this.store.dispatch(otActions.inicializarInformeAvance({ ot_id }));
  // }

  public getDataInformeAvanceTrabajador(ot_id: number): void {
    this.store.dispatch(otActions.getDataInformeAvanceTrabajador({ ot_id }));
  }
  public getDataInformeAvanceAdminEC(ot_id: number): void {
    this.store.dispatch(otActions.getDataInformeAvanceAdminEC({ ot_id }));
  }

  public getDataInformeAvanceTrabajador$(): Observable<DataInformeAvance[]> {
    return this.store.select(otSelectors.getDataInformeAvanceTrabajador);
  }
  public getDataInformeAvanceAdminEC$(): Observable<DataInformeAvance[]> {
    return this.store.select(otSelectors.getDataInformeAvanceAdminEC);
  }

  public saveInformeAvanceTrabajador(request: RequestSaveInformeAvance): void {
    this.store.dispatch(otActions.saveInformeAvanceTrabajador({ request }));
  }
  public saveInformeAvanceAdminEC(
    request: RequestSaveInformeAvanceAdmin
  ): void {
    this.store.dispatch(otActions.saveInformeAvanceAdminEC({ request }));
  }

  public saveBorradorInformeAvance(
    request: RequestSaveBorradorInformeAvance
  ): void {
    this.store.dispatch(otActions.saveBorradorInformeAvance({ request }));
  }

  public rechazarInformeAvance(informe_id: number): void {
    this.store.dispatch(otActions.rechazarInformeAvance({ informe_id }));
  }

  public getDataInformeActa(ot_id: number): void {
    this.store.dispatch(otActions.getDataInformeActa({ ot_id }));
  }

  public getDataInformeActa$(): Observable<DataInformeAvance[]> {
    return this.store.select(otSelectors.getDataInformeActa);
  }

  public saveInformeActa(request: RequestSaveInformeActaGestor): void {
    this.store.dispatch(otActions.saveInformeActa({ request }));
  }

  public rechazarInformeActa(informe_id: number): void {
    this.store.dispatch(otActions.rechazarInformeActa({ informe_id }));
  }

  public getInfoOtId$(): Observable<number> {
    return this.store.select(otSelectors.getInfoOtId);
  }

  public getDetalleActaMezcla(ot_id: number): void {
    this.store.dispatch(otActions.getDetalleActaMezcla({ ot_id }));
  }

  public getDataSolicitudPago(ot_id: number): void {
    this.store.dispatch(otActions.getDetalleActa({ ot_id }));
  }

  public getDataSolicitudPago$(): Observable<DetalleActa[]> {
    return this.store.select(otSelectors.getDataSolicitudPago);
  }
  public sendSolicitudPagoActa(request: RequestSolicitudPagoActa): void {
    this.store.dispatch(otActions.sendSolicitudPagoActa({ request }));
  }
}
