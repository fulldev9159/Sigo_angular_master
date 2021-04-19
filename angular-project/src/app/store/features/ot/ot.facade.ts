import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as otActions from './ot.actions';
import * as otSelectors from './ot.selectors';
import { Lp, Ot, Pep2, Plan, PMO, Site } from './ot.model';

@Injectable({
  providedIn: 'root',
})
export class OtFacade {
  constructor(private store: Store<Ot>) { }

  // OT
  public getOt(): void {
    this.store.dispatch(otActions.getOt());
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
  // OT

  // PLANS
  public getPlans(): void {
    this.store.dispatch(otActions.getPlans());
  }

  public getPlansSuccess(plan: Plan[]): void {
    this.store.dispatch(otActions.getPlansSuccess({ plan }));
  }

  public getPlans$(): Observable<Plan[]> {
    return this.store.select(otSelectors.getPlans);
  }
  // PLANS

  // SITES
  public getSites(): void {
    this.store.dispatch(otActions.getSite());
  }

  public getSitesSuccess(site: Site[]): void {
    this.store.dispatch(otActions.getSiteSuccess({ site }));
  }

  public getSites$(): Observable<Site[]> {
    return this.store.select(otSelectors.getSites);
  }
  // SITES

  // PMOS
  public getPmos(): void {
    this.store.dispatch(otActions.getPmo());
  }

  public getPmosSuccess(pmo: PMO[]): void {
    this.store.dispatch(otActions.getPmoSuccess({ pmo }));
  }

  public getPmos$(): Observable<PMO[]> {
    return this.store.select(otSelectors.getPmos);
  }
  // PMOS

  // LPS
  public getLps(): void {
    this.store.dispatch(otActions.getBudgetLine());
  }

  public getLpsSuccess(lp: Lp): void {
    this.store.dispatch(otActions.getBudgetLineSuccess({ lp }));
  }

  public getLps$(): Observable<Lp> {
    return this.store.select(otSelectors.getLps);
  }
  // LPS

  // PEP2
  public getPep2s(): void {
    this.store.dispatch(otActions.getPep2());
  }

  public getPep2sSuccess(pep2: Pep2[]): void {
    this.store.dispatch(otActions.getPep2Success({ pep2 }));
  }

  public getPep2s$(): Observable<Pep2[]> {
    return this.store.select(otSelectors.getPeps2);
  }
  // PEP2
}
