import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  FormControl,
  FormArray,
  FormGroup,
  Validators,
  ValidatorFn,
} from '@angular/forms';

interface Service {
  lpu_id: number;
  lpu_nombre: string;
  lpu_precio: number;
  tipo_moneda_id: number;
  tipo_moneda_cod: string;
  lpu_numero_producto: string;
  region: string;
  lpu_subtotal: number;
  tipo_servicio: string;
  cantidad: number;

  lpu_unidad_codigo?: number;
  lpu_unidad_nombre?: string;
}

@Component({
  selector: 'app-contrato-movil-lpus-table',
  templateUrl: './contrato-movil-lpus-table.component.html',
  styleUrls: ['./contrato-movil-lpus-table.component.scss'],
})
export class ContratoMovilLpusTableComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  msgsLPUSQuantity = [
    {
      severity: 'info',
      // summary: 'ATENCION',
      detail: 'Al menos 1 LPU debe ser ingresada',
    },
  ];
  total = 0;
  currency = '';
  items: Service[] = [
    //// {
    ////   cantidad: 1,
    ////   lpu_id: 30265,
    ////   lpu_nombre: '"DESINST bastidores de 19"" o 24"""',
    ////   lpu_numero_producto: '',
    ////   lpu_precio: 70349,
    ////   lpu_subtotal: 70349,
    ////   lpu_unidad_codigo: 3,
    ////   lpu_unidad_nombre: 'UNIDAD',
    ////   region: 'XIII',
    ////   tipo_moneda_cod: 'CLP',
    ////   tipo_moneda_id: 2,
    ////   tipo_servicio: 'PROYECTO (FIJA)',
    //// },
    //// {
    ////   cantidad: 1,
    ////   lpu_id: 832,
    ////   lpu_nombre: '"DESINST bastidores de 19"" o 24"""',
    ////   lpu_numero_producto: '',
    ////   lpu_precio: 68942,
    ////   lpu_subtotal: 68942,
    ////   lpu_unidad_codigo: 3,
    ////   lpu_unidad_nombre: 'UNIDAD',
    ////   region: 'XIII',
    ////   tipo_moneda_cod: 'CLP',
    ////   tipo_moneda_id: 2,
    ////   tipo_servicio: 'PROYECTO (FIJA)',
    //// },
  ];

  @Input('items')
  set initItems(items: Service[]) {
    this.initFormControls(items);
    this.items = items;
    this.updateTotal();
  }

  form: FormGroup = new FormGroup({
    cantidades: new FormGroup({}),
  });

  nonZero(control: FormControl): any {
    const value = (val => (isNaN(val) ? 0 : val))(parseInt(control.value, 10));
    return value < 1 ? { nonzero: true } : null;
  }

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  errorMessageFn = errors => {
    if (errors.required) {
      return 'Este campo es requerido';
    } else if (errors.whitespace) {
      return 'Este campo es requerido';
    } else if (errors.nonzero) {
      return 'No son permitidos valores inferiores a 1';
    } else if (errors.maxlength) {
      return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres`;
    }
    return 'Este campo es inválido';
  }; // tslint:disable-line

  constructor() {}

  ngOnInit(): void {
    this.subscription.add(
      this.cantidadesForm.valueChanges.subscribe(data => this.updateTotal())
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get cantidadesForm(): FormGroup {
    return this.form.get('cantidades') as FormGroup;
  }

  initFormControls(items: Service[]): void {
    items.forEach(item => this.addItemControl(item));
  }

  lpuKey(item: Service): string {
    return `lpu_id__${item.lpu_id}`;
  }

  updateTotal(): void {
    this.currency =
      this.items.length === 0 ? '' : this.items[0].tipo_moneda_cod;

    this.total = this.items.reduce(
      (total, item) => total + item.lpu_subtotal,
      0
    );
  }

  get valid(): boolean {
    return this.cantidadesForm.valid && this.items.length > 0;
  }

  touch(): void {
    Object.keys(this.cantidadesForm.controls).forEach(field => {
      const control = this.cantidadesForm.get(field);
      control.markAsTouched({
        onlySelf: true,
      });
    });

    this.cantidadesForm.markAsTouched({
      onlySelf: true,
    });
  }

  addItemControl(item: Service): void {
    const key = this.lpuKey(item);
    this.cantidadesForm.addControl(
      key,
      new FormControl(`${item.cantidad}`, [
        Validators.required,
        this.noWhitespace,
        this.nonZero,
        Validators.maxLength(6),
      ])
    );

    this.subscription.add(
      this.cantidadesForm.get(key).valueChanges.subscribe(value => {
        const index = this.items.findIndex(i => i.lpu_id === item.lpu_id);
        if (index > -1) {
          const cantidad = +value;
          if (!isNaN(cantidad) && cantidad > -1) {
            this.items[index].cantidad = +cantidad;
            this.items[index].lpu_subtotal =
              +this.items[index].lpu_precio * +cantidad;
          }
        }
      })
    );
  }

  addItem(item: Service): void {
    this.items.push(item);
    this.addItemControl(item);
  }

  get values(): Service[] {
    return this.items;
  }
}
