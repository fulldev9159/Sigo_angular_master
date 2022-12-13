import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as sustentoFinancieroSelectors from './sustento-financiero.selectors';
import * as sustentoFinancieroActions from './sustento-financiero.actions';
import { CECO, LP, OPEX, PEP2, PMO, SAP, SustentoFinancieroReq } from '@model';

@Injectable({
  providedIn: 'root',
})
export class SustentoFinancieroFacade {
  constructor(private store: Store<any>) {}

  // PMOS
  public getPMO(sitio_codigo: string): void {
    this.store.dispatch(sustentoFinancieroActions.getPMO({ sitio_codigo }));
  }

  public getPMO$(): Observable<PMO[]> {
    return this.store.select(sustentoFinancieroSelectors.getPMO);
  }

  // LPS
  public getLP(pmo_id: number): void {
    this.store.dispatch(
      sustentoFinancieroActions.getLineaPresupuestaria({ pmo_id })
    );
  }

  public getLP$(): Observable<LP[]> {
    return this.store.select(sustentoFinancieroSelectors.getLps);
  }

  // PEP2
  public getPEP2(
    pmo_codigo: number,
    linea_presupuestaria_codigo: string
  ): void {
    this.store.dispatch(
      sustentoFinancieroActions.getPEP2({
        pmo_codigo,
        linea_presupuestaria_codigo,
      })
    );
  }

  public getPEP2$(): Observable<PEP2[]> {
    return this.store.select(sustentoFinancieroSelectors.getPeps2);
  }

  // OPEX
  public getIDsOpex(): void {
    this.store.dispatch(sustentoFinancieroActions.getIDOpex());
  }

  public getIDsOpex$(): Observable<OPEX[]> {
    return this.store.select(sustentoFinancieroSelectors.getIDsOpex);
  }

  // Cuentas SAP
  public getCuentaSAP(id_opex: string): void {
    this.store.dispatch(sustentoFinancieroActions.getCuentaSAP({ id_opex }));
  }

  public getCuentaSAP$(): Observable<SAP[]> {
    return this.store.select(sustentoFinancieroSelectors.getCuentasSAP);
  }

  // CECOs
  public getCECO(id_opex: string, cuenta_sap: number): void {
    this.store.dispatch(
      sustentoFinancieroActions.getCECO({ id_opex, cuenta_sap })
    );
  }

  public getCECO$(): Observable<CECO[]> {
    return this.store.select(sustentoFinancieroSelectors.getCECOs);
  }

  // UPDATE SUSTENTO FINANCIERO
  public updateSustentoFinanciero(
    ot_id: number,
    values: SustentoFinancieroReq
  ): void {
    this.store.dispatch(
      sustentoFinancieroActions.updateSustentoFinanciero({ ot_id, values })
    );
  }
}
