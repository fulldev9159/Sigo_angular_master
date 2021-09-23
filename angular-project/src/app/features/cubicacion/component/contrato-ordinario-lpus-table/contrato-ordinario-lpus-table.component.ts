import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  FormControl,
  FormArray,
  FormGroup,
  Validators,
  ValidatorFn,
} from '@angular/forms';

interface Service {
  key?: number;

  lpu_nombre: string;
  lpu_unidad_codigo: number;
  lpu_unidad_nombre: string;
  cantidad: number;
  lpu_precio: number;
  tipo_moneda_cod: string;
  tipo_moneda_id: number;
  lpu_subtotal: number;
}

@Component({
  selector: 'app-contrato-ordinario-lpus-table',
  templateUrl: './contrato-ordinario-lpus-table.component.html',
  styleUrls: ['./contrato-ordinario-lpus-table.component.scss'],
})
export class ContratoOrdinarioLpusTableComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  maxKey = 0;

  msgsLPUSQuantity = [
    {
      severity: 'info',
      // summary: 'ATENCION',
      detail: 'Al menos 1 LPU debe ser ingresada',
    },
  ];
  total = 0;
  items: Service[] = [];

  @Input() currency = '';

  @Input() unidades: {
    id: number;
    nombre: string;
    descripcion: string;
    estado: string;
  }[] = [];

  @Input('items')
  set initItems(items: Service[]) {
    items = items.map(item => ({
      ...item,
      key: this.generateKey(item),
    }));
    this.initFormControls(items);
    this.items = items;
    this.updateTotal();
  }

  @Output() itemAdded = new EventEmitter<{
    item: Service;
  }>();

  @Output() itemDeleted = new EventEmitter<{
    item: Service;
  }>();

  @Output() cellValueChanged = new EventEmitter<{
    column: string;
    value: any;
    item: Service;
  }>();

  form: FormGroup = new FormGroup({
    lpu_nombres: new FormGroup({}),
    lpu_unidades_codigo: new FormGroup({}),
    cantidades: new FormGroup({}),
    precios: new FormGroup({}),
  });

  mustBeANumber(control: FormControl): any {
    const result = /^\d+$/.test(control.value);
    return result ? null : { benumber: true };
  }

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
    } else if (errors.benumber) {
      return 'Debe ser un número';
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

  get lpuNombresForm(): FormGroup {
    return this.form.get('lpu_nombres') as FormGroup;
  }

  get lpuUnidadesCodigoForm(): FormGroup {
    return this.form.get('lpu_unidades_codigo') as FormGroup;
  }

  get cantidadesForm(): FormGroup {
    return this.form.get('cantidades') as FormGroup;
  }

  get preciosForm(): FormGroup {
    return this.form.get('precios') as FormGroup;
  }

  initFormControls(items: Service[]): void {
    items.forEach(item => this.addItemControl(item));
  }

  generateKey(item: Service): number {
    return this.maxKey++;
  }

  lpuKey(item: Service): string {
    return `lpu_id__${item.key}`;
  }

  updateTotal(): void {
    // this.currency =
    //   this.items.length === 0 ? '' : this.items[0].tipo_moneda_cod;

    this.total = this.items.reduce(
      (total, item) => total + item.lpu_subtotal,
      0
    );
  }

  get valid(): boolean {
    return (
      this.lpuNombresForm.valid &&
      this.lpuUnidadesCodigoForm.valid &&
      this.cantidadesForm.valid &&
      this.preciosForm.valid &&
      this.items.length > 0
    );
  }

  touch(): void {
    this.touchForm(this.lpuNombresForm);
    this.touchForm(this.lpuUnidadesCodigoForm);
    this.touchForm(this.cantidadesForm);
    this.touchForm(this.preciosForm);
  }

  touchForm(form: FormGroup): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({
        onlySelf: true,
      });
    });

    form.markAsTouched({
      onlySelf: true,
    });
  }

  addItemControl(item: Service): void {
    const key = this.lpuKey(item);

    this.lpuNombresForm.addControl(
      key,
      new FormControl(`${item.lpu_nombre}`, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(100),
      ])
    );

    this.subscription.add(
      this.lpuNombresForm.get(key).valueChanges.subscribe(value => {
        const index = this.items.findIndex(i => i.key === item.key);
        if (index > -1) {
          this.items[index].lpu_nombre = value;
          this.cellValueChanged.emit({
            column: 'lpu_nombre',
            value,
            item: this.items[index],
          });
        }
      })
    );

    this.lpuUnidadesCodigoForm.addControl(
      key,
      new FormControl(`${item.lpu_unidad_codigo}`, [Validators.required])
    );

    this.subscription.add(
      this.lpuUnidadesCodigoForm.get(key).valueChanges.subscribe(value => {
        const index = this.items.findIndex(i => i.key === item.key);
        if (index > -1) {
          const lpu_unidad_codigo = +value;
          if (!isNaN(lpu_unidad_codigo)) {
            const unidad = this.unidades.find(
              unidad => unidad.id === lpu_unidad_codigo
            );
            this.items[index].lpu_unidad_codigo = lpu_unidad_codigo;
            this.items[index].lpu_unidad_nombre = unidad ? unidad.nombre : '';
            this.cellValueChanged.emit({
              column: 'lpu_unidad_codigo',
              value,
              item: this.items[index],
            });
          }
        }
      })
    );

    this.cantidadesForm.addControl(
      key,
      new FormControl(`${item.cantidad}`, [
        Validators.required,
        this.noWhitespace,
        this.mustBeANumber,
        this.nonZero,
        Validators.maxLength(6),
      ])
    );

    this.subscription.add(
      this.cantidadesForm.get(key).valueChanges.subscribe(value => {
        const index = this.items.findIndex(i => i.key === item.key);
        if (index > -1) {
          const cantidad = +value;
          if (!isNaN(cantidad) && cantidad > -1) {
            this.items[index].cantidad = +cantidad;
            this.items[index].lpu_subtotal =
              +this.items[index].lpu_precio * +cantidad;
            this.updateTotal();
            this.cellValueChanged.emit({
              column: 'cantidad',
              value: cantidad,
              item: this.items[index],
            });
          }
        }
      })
    );

    this.preciosForm.addControl(
      key,
      new FormControl(`${item.lpu_precio}`, [
        Validators.required,
        this.noWhitespace,
        this.mustBeANumber,
        this.nonZero,
        Validators.maxLength(6),
      ])
    );

    this.subscription.add(
      this.preciosForm.get(key).valueChanges.subscribe(value => {
        const index = this.items.findIndex(i => i.key === item.key);
        if (index > -1) {
          const precio = +value;
          if (!isNaN(precio) && precio > -1) {
            this.items[index].lpu_precio = +precio;
            this.items[index].lpu_subtotal =
              +precio * this.items[index].cantidad;
            this.updateTotal();
            this.cellValueChanged.emit({
              column: 'lpu_precio',
              value: precio,
              item: this.items[index],
            });
          }
        }
      })
    );
  }

  removeItemControl(item: Service): void {
    const key = this.lpuKey(item);

    this.lpuNombresForm.removeControl(key);
    this.lpuUnidadesCodigoForm.removeControl(key);
    this.cantidadesForm.removeControl(key);
    this.preciosForm.removeControl(key);
  }

  addItem(item: Service): void {
    item.key = this.generateKey(item);
    this.items.push(item);
    this.addItemControl(item);
    this.updateTotal();
    this.itemAdded.emit({ item });
  }

  deleteItem(item: Service): void {
    const index = this.items.findIndex(i => i.key === item.key);
    if (index > -1) {
      this.items.splice(index, 1);
      this.removeItemControl(item);
      this.updateTotal();
      this.itemDeleted.emit({ item });
    }
  }

  get values(): Service[] {
    return this.items;
  }

  reset(): void {
    this.lpuNombresForm.reset();
    this.lpuUnidadesCodigoForm.reset();
    this.cantidadesForm.reset();
    this.preciosForm.reset();
    this.items = [];
    this.form = new FormGroup({
      lpu_nombres: new FormGroup({}),
      lpu_unidades_codigo: new FormGroup({}),
      cantidades: new FormGroup({}),
      precios: new FormGroup({}),
    });
    this.updateTotal();
  }
}
