import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Dropdown } from '@model';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { SustentoFinancieroFacade } from '@storeOT/sustento-financiero/sustento-financiero.facades';
import { map, Observable, Subscription } from 'rxjs';

// TODO: INCORPORAR EL PROVISORIO
// TODO: PROBAR INTERACCIONES Y RESETEOS
@Component({
  selector: 'zwc-formulario-ot-sustento-financiero',
  templateUrl: './formulario-ot-sustento-financiero.component.html',
  styleUrls: ['./formulario-ot-sustento-financiero.component.scss'],
})
export class FormularioOtSustentoFinancieroComponent
  implements OnDestroy, OnInit
{
  subscription: Subscription = new Subscription();
  @Input() form: FormGroup;

  // DATOS
  pmo$: Observable<Dropdown[]> = this.sustentoFinancieroFacade.getPMO$().pipe(
    map(values => {
      let tmp = [...values];
      return tmp.sort((a, b) => (a.pmo_codigo > b.pmo_codigo ? 1 : -1));
    }),
    map(values =>
      values.map(value => ({
        name: value.pmo_codigo.toString(),
        code: value.pmo_codigo,
      }))
    )
  );

  lineaPresupuestaria$: Observable<Dropdown[]> = this.sustentoFinancieroFacade
    .getLP$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) =>
          a.linea_presupuestaria_codigo > b.linea_presupuestaria_codigo ? 1 : -1
        );
      }),
      map(values =>
        values.map(value => ({
          name: value.linea_presupuestaria_codigo,
          code: value.linea_presupuestaria_codigo,
        }))
      )
    );

  pep2$: Observable<Dropdown[]> = this.sustentoFinancieroFacade.getPEP2$().pipe(
    map(values => {
      let tmp = [...values];
      return tmp.sort((a, b) => (a.pep2 > b.pep2 ? 1 : -1));
    }),
    map(values =>
      values.map(value => ({
        name: value.pep2,
        code: value.pep2,
      }))
    )
  );

  opex$: Observable<Dropdown[]> = this.sustentoFinancieroFacade
    .getIDsOpex$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.id_opex > b.id_opex ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: value.id_opex.toString(),
          code: value.id_opex,
        }))
      )
    );

  sap$: Observable<Dropdown[]> = this.sustentoFinancieroFacade
    .getCuentaSAP$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.cuenta_sap > b.cuenta_sap ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: value.cuenta_sap.toString(),
          code: value.cuenta_sap,
        }))
      )
    );

  ceco$: Observable<Dropdown[]> = this.sustentoFinancieroFacade.getCECO$().pipe(
    map(values => {
      let tmp = [...values];
      return tmp.sort((a, b) => (a.ceco > b.ceco ? 1 : -1));
    }),
    map(values =>
      values.map(value => ({
        name: value.ceco.toString(),
        code: value.ceco,
      }))
    )
  );

  // LOADINGS
  loadingPMO$: Observable<boolean> = this.loadingsFacade.sendingGetPMO$();
  loadingGetLP$: Observable<boolean> = this.loadingsFacade.sendingGetLP$();
  loadingGetPEP2$: Observable<boolean> = this.loadingsFacade.sendingGetPEP2$();
  loadingGetOPEX$: Observable<boolean> = this.loadingsFacade.sendingGetOPEX$();
  loadingGetSAP$: Observable<boolean> = this.loadingsFacade.sendingGetSAP$();
  loadingGetCECO$: Observable<boolean> = this.loadingsFacade.sendingGetCECO$();

  constructor(
    private sustentoFinancieroFacade: SustentoFinancieroFacade,
    private loadingsFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    this.sustentoFinancieroFacade.getIDsOpex();
    this.configCapex();
    this.subscription.add(
      this.form.get('costos').valueChanges.subscribe(costos => {
        if (costos && costos === 'capex') this.configCapex();
        if (costos && costos === 'opex') this.configOpex();
      })
    );

    this.subscription.add(
      this.form.get('pmo_codigo').valueChanges.subscribe(pmo_codigo => {
        if (pmo_codigo !== null && pmo_codigo !== undefined) {
          this.sustentoFinancieroFacade.getLP(+pmo_codigo);
        }
      })
    );

    this.subscription.add(
      this.form.get('lp_codigo').valueChanges.subscribe(lp_codigo => {
        if (lp_codigo !== null && lp_codigo !== undefined) {
          this.sustentoFinancieroFacade.getPEP2(
            +this.form.value.pmo_codigo,
            lp_codigo
          );
        }
      })
    );

    this.subscription.add(
      this.form.get('id_opex_codigo').valueChanges.subscribe(id_opex_codigo => {
        if (id_opex_codigo !== null && id_opex_codigo !== undefined) {
          this.sustentoFinancieroFacade.getCuentaSAP(id_opex_codigo);
        }
      })
    );

    this.subscription.add(
      this.form
        .get('cuenta_sap_codigo')
        .valueChanges.subscribe(cuenta_sap_codigo => {
          if (cuenta_sap_codigo !== null && cuenta_sap_codigo !== undefined) {
            this.sustentoFinancieroFacade.getCECO(
              this.form.value.id_opex_codigo,
              +cuenta_sap_codigo
            );
          }
        })
    );
  }

  configCapex(): void {
    this.form.get('pmo_codigo').setValidators([Validators.required]);
    this.form.get('lp_codigo').setValidators([Validators.required]);
    this.form.get('pep2_capex_id').setValidators([Validators.required]);

    this.form.get('id_opex_codigo').setValidators(null);
    this.form.get('cuenta_sap_codigo').setValidators(null);
    this.form.get('ceco_codigo').setValidators(null);

    this.form.get('id_opex_codigo').reset();
    this.form.get('cuenta_sap_codigo').reset();
    this.form.get('ceco_codigo').reset();
    this.form.get('ceco_provisorio').reset();
  }

  configOpex(): void {
    this.form.get('pmo_codigo').setValidators(null);
    this.form.get('lp_codigo').setValidators(null);
    this.form.get('pep2_capex_id').setValidators(null);

    this.form.get('id_opex_codigo').setValidators([Validators.required]);
    this.form.get('cuenta_sap_codigo').setValidators([Validators.required]);
    this.form.get('ceco_codigo').setValidators([Validators.required]);

    this.form.get('pmo_codigo').reset();
    this.form.get('lp_codigo').reset();
    this.form.get('pep2_capex_id').reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
