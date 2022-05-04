import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as otActions from './ot.actions';
import * as otSelectors from './ot.selectors';
import * as OTmodel from './ot.model';
import * as Data from '@data';
import {
  ContratosUser,
  DataInformeAvance,
  LpuInformeAvanceDetalle,
  Plan,
  PMO,
  RequestGetOTs,
  RequestSaveBorradorInformeAvance,
  RequestSaveInformeAvance,
  RequestSaveInformeAvanceAdmin,
  Sitio,
  LP,
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

  //   GET CONTRATOS USER 4 CUB
  public contratosUser4OT(usuario_id: number): void {
    this.store.dispatch(otActions.getContratosUser4OT({ usuario_id }));
  }

  public contratosUser4OT$(): Observable<ContratosUser[]> {
    return this.store.select(otSelectors.contratosUser4OT);
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
  // LPS

  // ////
  // OT
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

  // REPLY
  public replyOt(ot: OTmodel.RequestCreateOT): void {
    this.store.dispatch(otActions.replyOt({ ot }));
  }
  // REPLY

  // POST
  public postOt(
    ot: OTmodel.RequestCreateOT | OTmodel.RequestCreateOTFijo
  ): void {
    this.store.dispatch(otActions.postOt({ ot }));
  }

  // IngreOT con SCE ***
  public postOtSCE(ot: OTmodel.RequestCreateOT): void {
    this.store.dispatch(otActions.postOtSCE({ ot }));
  }
  // POST
  // OT

  // PLANS
  public getPlans(region_id: number): void {
    this.store.dispatch(otActions.getPlans({ region_id }));
  }

  public getPlans$(): Observable<Plan[]> {
    return this.store.select(otSelectors.getPlans);
  }
  // PLANS

  // SITES
  public getSitesAction(plan_proyecto_id: number, region_id: number): void {
    this.store.dispatch(otActions.getSite({ plan_proyecto_id, region_id }));
  }

  public getSitesSelector$(): Observable<Sitio[]> {
    return this.store.select(otSelectors.getSites);
  }
  // SITES

  // PMOS

  public getIDsOpex(): void {
    this.store.dispatch(otActions.getIDOpex());
  }

  public getIDsOpexSuccess(ids_opex: OTmodel.IDOpex[]): void {
    this.store.dispatch(otActions.getIDOpexSuccess({ ids_opex }));
  }

  public getIDsOpexSelector$(): Observable<OTmodel.IDOpex[]> {
    return this.store.select(otSelectors.getIDsOpex);
  }
  // IDOpex

  // Cuentas SAP
  public getCuentaSAPAction(data): void {
    this.store.dispatch(otActions.getCuentaSAP(data));
  }

  public getCuentaSAPSuccess(cuentas_sap: OTmodel.CuentaSap[]): void {
    this.store.dispatch(otActions.getCuentaSAPSuccess({ cuentas_sap }));
  }

  public getCuentaSAPSelector$(): Observable<OTmodel.CuentaSap[]> {
    return this.store.select(otSelectors.getCuentasSAP);
  }
  // Cuentas SAP

  // CECOs
  public getCECOAction(data): void {
    this.store.dispatch(otActions.getCECO(data));
  }

  public getCECOSuccess(cecos: OTmodel.CECO[]): void {
    this.store.dispatch(otActions.getCECOSuccess({ cecos }));
  }

  public getCECOSelector$(): Observable<OTmodel.CECO[]> {
    return this.store.select(otSelectors.getCECOs);
  }
  // CECOs

  // PEP2
  public getPep2sAction(data): void {
    this.store.dispatch(otActions.getPep2(data));
  }

  public getPep2sSuccess(pep2: OTmodel.Pep2[]): void {
    this.store.dispatch(otActions.getPep2Success({ pep2 }));
  }

  public getPep2sSelector$(): Observable<OTmodel.Pep2[]> {
    return this.store.select(otSelectors.getPeps2);
  }
  // PEP2

  // Proyectos
  public getProyectoAction(): void {
    this.store.dispatch(otActions.getProyecto());
  }

  public getProyectoSuccess(proyectos: OTmodel.Proyecto[]): void {
    this.store.dispatch(otActions.getProyectoSuccess({ proyectos }));
  }

  public getProyectoSelector$(): Observable<OTmodel.Proyecto[]> {
    return this.store.select(otSelectors.getProyectos);
  }
  // Proyectos

  // Detalle OT
  public getDetalleOtAction(id: number): void {
    this.store.dispatch(otActions.getDetalleOt({ id }));
  }

  public getDetalleOtSuccess(detalleot: Data.DataRspDetalleOT): void {
    this.store.dispatch(otActions.getDetalleOtSuccess({ detalleot }));
  }

  public getDetalleOtSelector$(): Observable<Data.DataRspDetalleOT> {
    return this.store.select(otSelectors.getDetalleOt);
  }

  // Coordinadores OT
  public getCoordinators(otID: number): void {
    this.store.dispatch(otActions.getCoordinators({ otID }));
  }

  public getCoordinators$(): Observable<Data.User[]> {
    return this.store.select(otSelectors.getCoordinators);
  }

  public assignCoordinator(otID: number, coordinatorID: number): void {
    this.store.dispatch(
      otActions.assignCoordinator({ otID, coordinador_id: coordinatorID })
    );
  }

  // Trabajador Supervisor OT
  public getTrabajadores(otID: number): void {
    this.store.dispatch(otActions.getTrabajadores({ otID }));
  }

  public getTrabajadores$(): Observable<Data.User[]> {
    return this.store.select(otSelectors.getTrabajadores);
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

  public getRegistrosLibroObras$(): Observable<Data.RegistroLibroObra[]> {
    return this.store.select(otSelectors.getRegistrosLibroObra);
  }

  // Resets
  public resetData(): void {
    this.store.dispatch(otActions.resetData());
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
