import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as otActions from './ot.actions';
import * as otSelectors from './ot.selectors';
import {
  CECO,
  CuentaSap,
  IDOpex,
  Lp,
  Ot,
  Pep2,
  Plan,
  PMO,
  Site,
} from './ot.model';

@Injectable({
  providedIn: 'root',
})
export class OtFacade {
  constructor(private store: Store<Ot>) {}

  // OT
  public getOt(data: any): void {
    this.store.dispatch(otActions.getOt(data));
  }

  public getOt$(): Observable<Ot[]> {
    return this.store.select(otSelectors.getOt);
  }

  // DELETE
  public deleteOt(position: number): void {
    this.store.dispatch(otActions.deleteOt({ otPosition: position }));
  }
  // DELETE

  // REPLY
  public replyOt(ot: Ot): void {
    this.store.dispatch(otActions.replyOt({ ot }));
  }
  // REPLY

  // POST
  public postOt(ot: Ot): void {
    this.store.dispatch(otActions.postOt({ ot }));
  }
  // POST
  // OT

  // PLANS
  public getPlans(data): void {
    this.store.dispatch(otActions.getPlans(data));
  }

  public getPlansSuccess(plan: Plan[]): void {
    this.store.dispatch(otActions.getPlansSuccess({ plan }));
  }

  public getPlans$(): Observable<Plan[]> {
    return this.store.select(otSelectors.getPlans);
  }
  // PLANS

  // SITES
  public getSites(data): void {
    this.store.dispatch(otActions.getSite(data));
  }

  public getSitesSuccess(site: Site[]): void {
    this.store.dispatch(otActions.getSiteSuccess({ site }));
  }

  public getSites$(): Observable<Site[]> {
    return this.store.select(otSelectors.getSites);
  }
  // SITES

  // PMOS
  public getPmos(data): void {
    this.store.dispatch(otActions.getPmo(data));
  }

  public getPmosSuccess(pmo: PMO[]): void {
    this.store.dispatch(otActions.getPmoSuccess({ pmo }));
  }

  public getPmos$(): Observable<PMO[]> {
    return this.store.select(otSelectors.getPmos);
  }
  // PMOS

  public getIDsOpex(): void {
    this.store.dispatch(otActions.getIDOpex());
  }

  public getIDsOpexSuccess(ids_opex: IDOpex[]): void {
    this.store.dispatch(otActions.getIDOpexSuccess({ ids_opex }));
  }

  public getIDsOpex$(): Observable<IDOpex[]> {
    return this.store.select(otSelectors.getIDsOpex);
  }
  // IDOpex

  // Cuentas SAP
  public getCuentaSAP(data): void {
    this.store.dispatch(otActions.getCuentaSAP(data));
  }

  public getCuentaSAPSuccess(cuentas_sap: CuentaSap[]): void {
    this.store.dispatch(otActions.getCuentaSAPSuccess({ cuentas_sap }));
  }

  public getCuentaSAP$(): Observable<CuentaSap[]> {
    return this.store.select(otSelectors.getCuentasSAP);
  }
  // Cuentas SAP

  // CECOs
  public getCECO(data): void {
    this.store.dispatch(otActions.getCECO(data));
  }

  public getCECOSuccess(cecos: CECO[]): void {
    this.store.dispatch(otActions.getCECOSuccess({ cecos }));
  }

  public getCECO$(): Observable<CECO[]> {
    return this.store.select(otSelectors.getCECOs);
  }
  // CECOs

  // LPS
  public getLps(data): void {
    this.store.dispatch(otActions.getBudgetLine(data));
  }

  public getLpsSuccess(lp: Lp[]): void {
    this.store.dispatch(otActions.getBudgetLineSuccess({ lp }));
  }

  public getLps$(): Observable<Lp[]> {
    return this.store.select(otSelectors.getLps);
  }
  // LPS

  // PEP2
  public getPep2s(data): void {
    this.store.dispatch(otActions.getPep2(data));
  }

  public getPep2sSuccess(pep2: Pep2[]): void {
    this.store.dispatch(otActions.getPep2Success({ pep2 }));
  }

  public getPep2s$(): Observable<Pep2[]> {
    return this.store.select(otSelectors.getPeps2);
  }
  // PEP2
}
