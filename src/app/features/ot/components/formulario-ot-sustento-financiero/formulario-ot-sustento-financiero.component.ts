import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dropdown } from '@model';
import { SustentoFinancieroFacade } from '@storeOT/sustento-financiero/sustento-financiero.facades';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'zwc-formulario-ot-sustento-financiero',
  templateUrl: './formulario-ot-sustento-financiero.component.html',
  styleUrls: ['./formulario-ot-sustento-financiero.component.scss'],
})
export class FormularioOtSustentoFinancieroComponent implements OnDestroy {
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
  constructor(private sustentoFinancieroFacade: SustentoFinancieroFacade) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
