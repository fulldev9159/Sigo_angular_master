import {
  Component,
  Input,
  SimpleChanges,
  OnInit,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DetalleOT } from '@model';
import { SustentoFinancieroFacade } from '@storeOT/sustento-financiero/sustento-financiero.facades';

@Component({
  selector: 'zwc-formulario-ot-sustento-financiero-modal',
  templateUrl: './formulario-ot-sustento-financiero-modal.component.html',
  styleUrls: ['./formulario-ot-sustento-financiero-modal.component.scss'],
})
export class FormularioOtSustentoFinancieroModalComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() detalle?: DetalleOT;

  form?: FormGroup = new FormGroup({
    costos: new FormControl('capex', []),

    pmo_codigo: new FormControl(null, []),
    lp_codigo: new FormControl(null, []),
    pep2_capex_id: new FormControl(null, []),
    pep2_provisorio: new FormControl(null, []),

    id_opex_codigo: new FormControl(null, []),
    cuenta_sap_codigo: new FormControl(null, []),
    ceco_codigo: new FormControl(null, []),
    ceco_provisorio: new FormControl(null, []),
  });

  constructor(private sustentoFinancieroFacade: SustentoFinancieroFacade) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['detalle']) {
      const detalle = changes['detalle'].currentValue;
      if (detalle) {
        setTimeout(() => {
          //// console.log('set detalle', JSON.stringify(detalle, null, 2));
          this.initForm(detalle);
        }, 1000);
      } else {
        this.form = undefined;
      }
    }
  }

  ngOnDestroy(): void {}

  initForm(detalle: DetalleOT): void {
    const {
      ot: {
        tipo_sustento,
        es_sustento_provisorio,

        pmo_codigo,
        lp,
        pep2,

        id_opex,
        cuenta_sap,
        ceco,
      },
    } = detalle;

    const values = {
      costos: tipo_sustento.toLowerCase(),
      pmo_codigo,
      lp_codigo: lp,
      pep2_capex_id:
        tipo_sustento === 'CAPEX'
          ? es_sustento_provisorio
            ? 'capex_provisorio'
            : pep2
          : null,
      pep2_provisorio:
        tipo_sustento === 'CAPEX'
          ? es_sustento_provisorio
            ? pep2
            : null
          : null,

      id_opex_codigo: id_opex,
      cuenta_sap_codigo: cuenta_sap,
      ceco_codigo:
        tipo_sustento === 'OPEX'
          ? es_sustento_provisorio
            ? 'ceco_provisorio'
            : ceco
          : null,
      ceco_provisorio:
        tipo_sustento === 'OPEX'
          ? es_sustento_provisorio
            ? ceco
            : null
          : null,
    };

    //// if (
    ////   cubicacionSelected &&
    ////   cubicacionSelected.tipo_contrato_marco_nombre !== 'Móvil'
    //// ) {
    this.sustentoFinancieroFacade.getPMO('');
    if (values.costos === 'capex') {
      this.sustentoFinancieroFacade.getLP(+values.pmo_codigo);
      this.sustentoFinancieroFacade.getPEP2(
        +values.pmo_codigo,
        values.lp_codigo
      );
    }
    //// }

    this.sustentoFinancieroFacade.getIDsOpex();
    if (values.costos === 'opex') {
      this.sustentoFinancieroFacade.getCuentaSAP(values.id_opex_codigo);
      this.sustentoFinancieroFacade.getCECO(
        values.id_opex_codigo,
        +values.cuenta_sap_codigo
      );
    }

    this.form = undefined;
    this.form = new FormGroup({
      costos: new FormControl(values.costos, []),

      pmo_codigo: new FormControl(values.pmo_codigo, []),
      lp_codigo: new FormControl(values.lp_codigo, []),
      pep2_capex_id: new FormControl(values.pep2_capex_id, []),
      pep2_provisorio: new FormControl(values.pep2_provisorio, []),

      id_opex_codigo: new FormControl(values.id_opex_codigo, []),
      cuenta_sap_codigo: new FormControl(values.cuenta_sap_codigo, []),
      ceco_codigo: new FormControl(values.ceco_codigo, []),
      ceco_provisorio: new FormControl(values.ceco_provisorio, []),
    });

    //// this.form.get('costos').updateValueAndValidity({ emitEvent: true });
  }

  get values(): any {
    if (this.form) {
      return this.form.getRawValue();
    }

    return undefined;
  }
}
