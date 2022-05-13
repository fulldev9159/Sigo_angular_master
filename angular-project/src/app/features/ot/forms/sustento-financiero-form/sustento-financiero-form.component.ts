import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import {
  FormGroup,
  FormControl,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { PMO, LP, PEP2, OPEX, SAP, CECO } from '@data';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sustento-financiero-form',
  templateUrl: './sustento-financiero-form.component.html',
  styleUrls: ['./sustento-financiero-form.component.scss'],
})
export class SustentoFinancieroFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  pmos$: Observable<PMO[]> = of([]);
  lps$: Observable<LP[]> = of([]);
  pep2s$: Observable<PEP2[]> = of([]);
  ids_opex$: Observable<OPEX[]> = of([]);
  cuentas_sap$: Observable<SAP[]> = of([]);
  cecos$: Observable<CECO[]> = of([]);

  moneyIcon = faMoneyBill;

  @Input() form: FormGroup;

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  constructor(private otFacade: OtFacade) {}

  ngOnInit(): void {
    this.otFacade.getIDsOpex();

    this.pmos$ = this.otFacade.getPMO$().pipe(
      map(pmos => pmos || []),
      tap(pmos => this.checkPMOsAndEnable(pmos))
    );

    this.lps$ = this.otFacade.getLP$().pipe(
      map(lps => lps || []),
      tap(lps => this.checkLPsAndEnable(lps))
    );

    this.pep2s$ = this.otFacade.getPEP2$().pipe(
      map(pep2s => pep2s || []),
      tap(pep2s => this.checkPep2sAndEnable(pep2s))
    );

    this.ids_opex$ = this.otFacade.getIDsOpex$().pipe(
      map(opexs => opexs || []),
      tap(opexs => this.checkOPEXsAndEnable(opexs))
    );

    this.cuentas_sap$ = this.otFacade.getCuentaSAP$().pipe(
      map(saps => saps || []),
      tap(saps => this.checkSAPsAndEnable(saps))
    );

    this.cecos$ = this.otFacade.getCECO$().pipe(
      map(cecos => cecos || []),
      tap(cecos => this.checkCECOsAndEnable(cecos))
    );

    this.initCostosFormControlEvent();
    this.initPMOFormControlEvent();
    this.initLPsFormControlEvent();
    this.initPEP2FormControlEvent();
    this.initOPEXFormControlEvent();
    this.initCuentaSAPFormControlEvent();
    this.initCECOFormControlEvent();
  }

  initCostosFormControlEvent(): void {
    this.subscription.add(
      this.form.get('costos').valueChanges.subscribe(costos => {
        if (costos === 'capex') {
          this.resetControl(this.form.get('pep2_provisorio'));
          this.form.get('pmo_codigo').setValidators([Validators.required]);
          this.form.get('lp_codigo').setValidators([Validators.required]);
          this.form.get('pep2_capex_id').setValidators([Validators.required]);
          this.form.get('id_opex_codigo').setValidators(null);
          this.form.get('cuenta_sap_codigo').setValidators(null);
          this.form.get('ceco_codigo').setValidators(null);
          this.form.get('ceco_provisorio').setValidators(null);
          this.resetControl(this.form.get('id_opex_codigo'));
          this.resetControl(this.form.get('cuenta_sap_codigo'));
          this.resetControl(this.form.get('ceco_codigo'));
          this.resetControl(this.form.get('ceco_provisorio'));
        } else if (costos === 'opex') {
          this.resetControl(this.form.get('pmo_codigo'));
          this.resetControl(this.form.get('lp_codigo'));
          this.resetControl(this.form.get('pep2_capex_id'));
          this.resetControl(this.form.get('pep2_provisorio'));
          this.form.get('id_opex_codigo').setValidators([Validators.required]);
          this.form
            .get('cuenta_sap_codigo')
            .setValidators([Validators.required]);
          this.form.get('ceco_codigo').setValidators([Validators.required]);
          this.form.get('pmo_codigo').setValidators(null);
          this.form.get('lp_codigo').setValidators(null);
          this.form.get('pep2_capex_id').setValidators(null);
          this.form.get('pep2_provisorio').setValidators(null);
        }
      })
    );
  }

  initPMOFormControlEvent(): void {
    this.subscription.add(
      this.form.get('pmo_codigo').valueChanges.subscribe(pmo_codigo => {
        this.resetLPFormControl();
        if (pmo_codigo !== null && pmo_codigo !== undefined) {
          this.otFacade.getLP(+pmo_codigo);
        } else {
          this.checkLPsAndEnable([]);
        }
      })
    );
  }

  initLPsFormControlEvent(): void {
    this.subscription.add(
      this.form.get('lp_codigo').valueChanges.subscribe(lp_codigo => {
        this.resetPep2FormControl();
        if (lp_codigo !== null && lp_codigo !== undefined) {
          this.otFacade.getPEP2(+this.form.value.pmo_codigo, lp_codigo);
        } else {
          this.checkPep2sAndEnable([]);
        }
      })
    );
  }

  initPEP2FormControlEvent(): void {
    this.subscription.add(
      this.form.get('pep2_capex_id').valueChanges.subscribe(pep2_capex_id => {
        this.resetPep2ProvisorioFormControl();
        if (
          pep2_capex_id !== null &&
          pep2_capex_id !== undefined &&
          pep2_capex_id === 'capex_provisorio'
        ) {
          this.form
            .get('pep2_provisorio')
            .setValidators([Validators.required, this.noWhitespace]);
        } else if (
          pep2_capex_id !== null &&
          pep2_capex_id !== undefined &&
          pep2_capex_id !== 'capex_provisorio'
        ) {
          this.form.get('pep2_provisorio').setValidators(null);
        }
      })
    );
  }

  initOPEXFormControlEvent(): void {
    this.subscription.add(
      this.form.get('id_opex_codigo').valueChanges.subscribe(id_opex_codigo => {
        this.resetSAPsFormControl();
        if (id_opex_codigo !== null && id_opex_codigo !== undefined) {
          this.otFacade.getCuentaSAP(id_opex_codigo);
        } else {
          this.checkSAPsAndEnable([]);
        }
      })
    );
  }

  initCuentaSAPFormControlEvent(): void {
    this.subscription.add(
      this.form
        .get('cuenta_sap_codigo')
        .valueChanges.subscribe(cuenta_sap_codigo => {
          this.resetCECOFormControl();
          if (cuenta_sap_codigo !== null && cuenta_sap_codigo !== undefined) {
            this.otFacade.getCECO(
              this.form.value.id_opex_codigo,
              +cuenta_sap_codigo
            );
          }
        })
    );
  }

  initCECOFormControlEvent(): void {
    this.subscription.add(
      this.form.get('ceco_codigo').valueChanges.subscribe(ceco_codigo => {
        this.resetCECOProvisorioFormControl();
        if (
          ceco_codigo !== null &&
          ceco_codigo !== undefined &&
          ceco_codigo === 'ceco_provisorio'
        ) {
          this.form
            .get('ceco_provisorio')
            .setValidators([Validators.required, this.noWhitespace]);
        } else if (
          ceco_codigo !== null &&
          ceco_codigo !== undefined &&
          ceco_codigo !== 'ceco_provisorio'
        ) {
          this.form.get('ceco_provisorio').setValidators(null);
        }
      })
    );
  }

  checkPMOsAndEnable(pmos: PMO[]): void {
    if (pmos.length > 0) {
      this.form.get('pmo_codigo').enable();
    } else {
      this.form.get('pmo_codigo').disable();
    }
  }

  checkLPsAndEnable(lps: LP[]): void {
    if (lps.length > 0) {
      this.form.get('lp_codigo').enable();
    } else {
      this.form.get('lp_codigo').disable();
    }
  }

  checkPep2sAndEnable(pep2s: PEP2[]): void {
    if (pep2s.length > 0) {
      this.form.get('pep2_capex_id').enable();
    } else {
      this.form.get('pep2_capex_id').disable();
    }
  }

  checkOPEXsAndEnable(opexs: OPEX[]): void {
    if (opexs.length > 0) {
      this.form.get('id_opex_codigo').enable();
    } else {
      this.form.get('id_opex_codigo').disable();
    }
  }

  checkSAPsAndEnable(saps: SAP[]): void {
    if (saps.length > 0) {
      this.form.get('cuenta_sap_codigo').enable();
    } else {
      this.form.get('cuenta_sap_codigo').disable();
    }
  }

  checkCECOsAndEnable(cecos: CECO[]): void {
    if (cecos.length > 0) {
      this.form.get('ceco_codigo').enable();
    } else {
      this.form.get('ceco_codigo').disable();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  resetPMOCodigoFormControl(): void {
    this.form.get('pmo_codigo').reset();
    this.otFacade.resetPMO();
  }

  resetLPFormControl(): void {
    this.form.get('lp_codigo').reset();
    this.otFacade.resetLPs();
  }

  resetPep2FormControl(): void {
    this.form.get('pep2_capex_id').reset();
    this.otFacade.resetPEP2();
  }

  resetPep2ProvisorioFormControl(): void {
    this.form.get('pep2_provisorio').reset();
  }

  resetOPEXFormControl(): void {
    this.form.get('ids_opex').reset();
  }

  resetSAPsFormControl(): void {
    this.form.get('cuenta_sap_codigo').reset();
    this.otFacade.resetSAP();
  }

  resetCECOFormControl(): void {
    this.form.get('ceco_codigo').reset();
    this.otFacade.resetCECO();
  }

  resetCECOProvisorioFormControl(): void {
    this.form.get('ceco_provisorio').reset();
  }

  resetControl(control: AbstractControl): void {
    control.reset();
    control.clearValidators();
    control.markAsUntouched();
    control.markAsPristine();
    control.updateValueAndValidity();
  }

  touch(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({
        onlySelf: true,
      });
    });

    this.form.markAsTouched({
      onlySelf: true,
    });
  }

  get valid(): boolean {
    return this.form.valid;
  }
}
