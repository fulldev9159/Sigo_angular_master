import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import {
  FormGroup,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { DetalleOT, SustentoFinancieroReq } from '@model';
import { SustentoFinancieroFacade } from '@storeOT/sustento-financiero/sustento-financiero.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';

function NoProvisorios(group: AbstractControl): ValidationErrors | null {
  const costos_control = group.get('costos');

  if (costos_control) {
    const costos = costos_control.value;

    if (costos === 'capex') {
      const pep2_capex_id_control = group.get('pep2_capex_id');
      const pep2_capex_id = pep2_capex_id_control.value ?? '';

      if (pep2_capex_id === 'capex_provisorio') {
        return { noprovisorios: 'capex_provisorio' };
      }
    } else if (costos === 'opex') {
      const ceco_codigo_control = group.get('ceco_codigo');
      const ceco_codigo = ceco_codigo_control.value ?? '';

      if (ceco_codigo === 'ceco_provisorio') {
        return { noprovisorios: 'ceco_provisorio' };
      }
    }
  }

  return null;
}

@Component({
  selector: 'zwc-formulario-ot-sustento-financiero-modal',
  templateUrl: './formulario-ot-sustento-financiero-modal.component.html',
  styleUrls: ['./formulario-ot-sustento-financiero-modal.component.scss'],
})
export class FormularioOtSustentoFinancieroModalComponent implements OnChanges {
  sendingUpdateSustentoFinanciero$: Observable<boolean> =
    this.loadingsFacade.sendingUpdateSustentoFinanciero$();
  @Input() detalle?: DetalleOT;

  form: FormGroup = new FormGroup(
    {
      costos: new FormControl('capex', []),

      pmo_codigo: new FormControl(null, []),
      lp_codigo: new FormControl(null, []),
      pep2_capex_id: new FormControl(null, []),
      pep2_provisorio: new FormControl(null, []),

      id_opex_codigo: new FormControl(null, []),
      cuenta_sap_codigo: new FormControl(null, []),
      ceco_codigo: new FormControl(null, []),
      ceco_provisorio: new FormControl(null, []),
    },
    [NoProvisorios] //// TODO comentar esta línea si se desea guardar provisorios
  );

  constructor(
    private sustentoFinancieroFacade: SustentoFinancieroFacade,
    private loadingsFacade: LoadingsFacade
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['detalle']) {
      const detalle = changes['detalle'].currentValue;
      if (detalle) {
        this.initForm(detalle);
      }
    }
  }

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
    //// if (values.costos === 'capex') {
    ////   this.sustentoFinancieroFacade.getLP(+values.pmo_codigo);
    ////   this.sustentoFinancieroFacade.getPEP2(
    ////     +values.pmo_codigo,
    ////     values.lp_codigo
    ////   );
    //// }
    //// }

    this.sustentoFinancieroFacade.getIDsOpex();
    //// if (values.costos === 'opex') {
    ////   this.sustentoFinancieroFacade.getCuentaSAP(values.id_opex_codigo);
    ////   this.sustentoFinancieroFacade.getCECO(
    ////     values.id_opex_codigo,
    ////     +values.cuenta_sap_codigo
    ////   );
    //// }

    //// TODO comentar estas dos líneas si se desea guardar provisorios
    this.form.get('pep2_provisorio').disable();
    this.form.get('ceco_provisorio').disable();

    setTimeout(() => {
      this.form.get('costos').setValue(values.costos);
      if (values.costos === 'capex') {
        this.form.get('pmo_codigo').setValue(values.pmo_codigo);
        this.form.get('lp_codigo').setValue(values.lp_codigo);
        this.form.get('pep2_capex_id').setValue(values.pep2_capex_id);
        if (values.pep2_provisorio !== null) {
          this.form.get('pep2_provisorio').setValue(values.pep2_provisorio);
        }
      } else if (values.costos === 'opex') {
        this.form.get('id_opex_codigo').setValue(values.id_opex_codigo);
        this.form.get('cuenta_sap_codigo').setValue(values.cuenta_sap_codigo);
        this.form.get('ceco_codigo').setValue(values.ceco_codigo);
        if (values.ceco_provisorio !== null) {
          this.form.get('ceco_provisorio').setValue(values.ceco_provisorio);
        }
      }
    });
  }

  get values(): SustentoFinancieroReq {
    const {
      costos,

      pmo_codigo,
      lp_codigo,
      pep2_capex_id,
      pep2_provisorio,

      id_opex_codigo,
      cuenta_sap_codigo,
      ceco_codigo,
      ceco_provisorio,
    } = this.form.getRawValue();

    const tipo_sustento = costos.toUpperCase();

    const request: SustentoFinancieroReq = {
      tipo_sustento,

      es_sustento_provisorio:
        tipo_sustento === 'CAPEX'
          ? pep2_capex_id === 'capex_provisorio'
          : ceco_codigo === 'ceco_provisorio',

      pmo_codigo: tipo_sustento === 'CAPEX' ? +pmo_codigo : pmo_codigo,
      lp: lp_codigo,
      pep2:
        tipo_sustento === 'CAPEX'
          ? pep2_capex_id === 'capex_provisorio'
            ? pep2_provisorio
            : pep2_capex_id
          : pep2_capex_id,

      id_opex: id_opex_codigo,
      cuenta_sap:
        tipo_sustento === 'CAPEX' ? cuenta_sap_codigo : +cuenta_sap_codigo,
      ceco:
        tipo_sustento === 'OPEX'
          ? ceco_codigo === 'ceco_provisorio'
            ? ceco_provisorio
            : ceco_codigo
          : ceco_codigo,
    };

    return request;
  }

  get valid(): boolean {
    return this.form.valid;
  }

  submit(): void {
    if (this.detalle && this.valid) {
      const {
        ot: { id },
      } = this.detalle;
      const values = this.values;
      this.sustentoFinancieroFacade.updateSustentoFinanciero(id, values);
    }
  }
}
