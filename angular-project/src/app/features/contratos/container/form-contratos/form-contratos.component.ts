import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';

import { ContratoFacade } from '@storeOT/features/contratos/contratos.facade';
import { ContratoMarco, ReqEditContrato } from '@data';

import moment from 'moment';
@Component({
  selector: 'app-form-contratos',
  templateUrl: './form-contratos.component.html',
  styleUrls: ['./form-contratos.component.scss'],
})
export class FormContratosComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  contratoSelected$: Observable<ContratoMarco>;
  tipoContrato$: Observable<any[]> = of([
    {
      nombre: 'Móvil',
      id: 1,
    },
    {
      nombre: 'Fijo',
      id: 2,
    },
    {
      nombre: 'Ordinario',
      id: 3,
    },
    {
      nombre: 'Bucle',
      id: 4,
    },
  ]);

  tipoMoneda$: Observable<any[]> = of([
    {
      nombre: 'USD (Dolar Americano)',
      id: 1,
    },
    {
      nombre: 'CLP (Peso Chileno)',
      id: 2,
    },
    {
      nombre: 'CLF (Unidad de fomento Chilena)',
      id: 3,
    },
    {
      nombre: 'UTM (Unidad tributarioa mensual)',
      id: 4,
    },
    {
      nombre: 'GBP  (Libra esterlina)',
      id: 5,
    },
    {
      nombre: 'EUR (Euro)',
      id: 6,
    },
  ]);

  tipoPago$: Observable<any[]> = of([
    {
      nombre: 'TODOS',
      id: 'TODOS',
    },
    {
      nombre: 'TOTAL',
      id: 'TOTAL',
    },
    {
      nombre: 'PARCIAL',
      id: 'PARCIAL',
    },
  ]);

  formControls = {
    id: new FormControl(null),
    nombre: new FormControl(null, [
      Validators.required,
      this.noWhitespace,
      // Validators.maxLength(20),
    ]),
    fecha_inicio: new FormControl(null, [Validators.required]),
    fecha_fin: new FormControl(null, [Validators.required]),
    tipo_contrato_id: new FormControl(null, [Validators.required]),
    tipo_moneda_id: new FormControl(null, [Validators.required]),
    aprob_jerarq_inic: new FormControl(null, [Validators.required]),
    validacion_operaciones: new FormControl(null, [Validators.required]),
    tiene_encuesta: new FormControl(null, [Validators.required]),
    tipo_pago: new FormControl(null, [Validators.required]),
    costo_max: new FormControl(null, [Validators.required]),
    activo: new FormControl(null, [
      Validators.required,
      // Validators.maxLength(20),
    ]),
  };

  formContrato: FormGroup = new FormGroup(this.formControls);
  constructor(
    private contratoFacade: ContratoFacade,
    private route: ActivatedRoute,
    private router: Router,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.contratoFacade.reset();
    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        if (params.get('id') != null) {
          this.contratoFacade.getSingleContratoSelected(+params.get('id'));
        }
      })
    );

    this.subscription.add(
      this.contratoFacade.getSingleContratoSelected$().subscribe(contrato => {
        if (contrato) {
          this.formContrato.get('id').setValue(contrato.id);
          this.formContrato.get('nombre').setValue(contrato.nombre);
          this.formContrato
            .get('fecha_inicio')
            .setValue(new Date(contrato.fecha_inicio));
          this.formContrato
            .get('fecha_fin')
            .setValue(new Date(contrato.fecha_fin));
          this.formContrato
            .get('tipo_contrato_id')
            .setValue(contrato.tipo_contrato_id);
          this.formContrato
            .get('tipo_moneda_id')
            .setValue(contrato.tipo_moneda_id);
          this.formContrato
            .get('aprob_jerarq_inic')
            .setValue(contrato.aprob_jerarq_inic);
          this.formContrato
            .get('validacion_operaciones')
            .setValue(contrato.validacion_operaciones);
          this.formContrato
            .get('tiene_encuesta')
            .setValue(contrato.tiene_encuesta);
          this.formContrato.get('tipo_pago').setValue(contrato.tipo_pago);
          this.formContrato.get('costo_max').setValue(contrato.costo_max);
          this.formContrato
            .get('activo')
            .setValue(contrato.estado ? 'activo' : 'inactivo');
        }
      })
    );

    setTimeout(() => {
      this.detector.detectChanges();
    }, 1000);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  goBack(): void {
    this.contratoFacade.reset();
    this.router.navigate(['/app/contratos/list-contratos']);
  }

  save(): void {
    const fecha_inicio = moment(
      this.formContrato.get('fecha_inicio').value
    ).utcOffset('+0300');
    const fecha_fin = moment(
      this.formContrato.get('fecha_fin').value
    ).utcOffset('+0300');
    const request: ReqEditContrato = {
      contrato_marco_id: +this.formContrato.get('id').value,
      values: {
        nombre: this.formContrato.get('nombre').value,
        fecha_inicio: fecha_inicio.format(),
        fecha_fin: fecha_fin.format(),
        tipo_contrato_id: +this.formContrato.get('tipo_contrato_id').value,
        costo_max: +this.formContrato.get('costo_max').value,
        tipo_moneda_id: +this.formContrato.get('tipo_moneda_id').value,
        tipo_pago: this.formContrato.get('tipo_pago').value,
        aprob_jerarq_inic: this.formContrato.get('aprob_jerarq_inic').value,
        validacion_operaciones: this.formContrato.get('validacion_operaciones')
          .value,
        tiene_encuesta: this.formContrato.get('tiene_encuesta').value,
        activo:
          this.formContrato.get('activo').value === 'activo' ? true : false,
      },
    };
    console.log('request', request);
    this.contratoFacade.updateContrato(request);
  }
}
