import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as otActions from './ot.actions';
import * as otSelectors from './ot.selectors';
import * as OTmodel from './ot.model';
import * as Data from '@data';

@Injectable({
  providedIn: 'root',
})
export class OtFacade {
  constructor(private store: Store<Data.OT>) {}

  // OT
  public getOts({ filtro_propietario, filtro_tipo }): void {
    this.store.dispatch(
      otActions.getOtPendiente({ filtro_propietario, filtro_tipo })
    );
    this.store.dispatch(
      otActions.getOtAbiertas({ filtro_propietario, filtro_tipo })
    );
    this.store.dispatch(
      otActions.getOtCerradas({ filtro_propietario, filtro_tipo })
    );
  }

  public getOtPendiente$(): Observable<Data.OT[]> {
    return this.store.select(otSelectors.getOtPendiente);
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
  public approveOT(otID: number): void {
    this.store.dispatch(otActions.approveOT({ otID }));
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
  public postOt(ot: OTmodel.RequestCreateOT): void {
    this.store.dispatch(otActions.postOt({ ot }));
  }

  // IngreOT con SCE ***
  public postOtSCE(ot: OTmodel.RequestCreateOT): void {
    this.store.dispatch(otActions.postOtSCE({ ot }));
  }
  // POST
  // OT

  // PLANS
  public getPlansAction(data): void {
    this.store.dispatch(otActions.getPlans(data));
  }

  public getPlansSuccess(plan: OTmodel.Plan[]): void {
    this.store.dispatch(otActions.getPlansSuccess({ plan }));
  }

  public getPlansSelector$(): Observable<OTmodel.Plan[]> {
    return this.store.select(otSelectors.getPlans);
  }
  // PLANS

  // SITES
  public getSitesAction(data): void {
    this.store.dispatch(otActions.getSite(data));
  }

  public getSitesSuccess(site: OTmodel.Site[]): void {
    this.store.dispatch(otActions.getSiteSuccess({ site }));
  }

  public getSitesSelector$(): Observable<OTmodel.Site[]> {
    return this.store.select(otSelectors.getSites);
  }
  // SITES

  // PMOS
  public getPmosAction(data): void {
    this.store.dispatch(otActions.getPmo(data));
  }

  public getPmosSuccess(pmo: OTmodel.PMO[]): void {
    this.store.dispatch(otActions.getPmoSuccess({ pmo }));
  }

  public getPmosSelector$(): Observable<OTmodel.PMO[]> {
    return this.store.select(otSelectors.getPmos);
  }
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

  // LPS
  public getLpsAction(data): void {
    this.store.dispatch(otActions.getBudgetLine(data));
  }

  public getLpsSuccess(lp: OTmodel.Lp[]): void {
    this.store.dispatch(otActions.getBudgetLineSuccess({ lp }));
  }

  public getLpsSelector$(): Observable<OTmodel.Lp[]> {
    return this.store.select(otSelectors.getLps);
  }
  // LPS

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

  public getDetalleOtSuccess(detalleot: OTmodel.DataRspDetalleOT): void {
    this.store.dispatch(otActions.getDetalleOtSuccess({ detalleot }));
  }

  public getDetalleOtSelector$(): Observable<OTmodel.DataRspDetalleOT> {
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
    this.store.dispatch(otActions.assignCoordinator({ otID, coordinatorID }));
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

  public resetData(): void {
    this.store.dispatch(otActions.resetData());
  }
}
