import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, of, BehaviorSubject, Subject } from 'rxjs';
import {
  withLatestFrom,
  map,
  tap,
  filter,
  debounceTime,
  takeUntil,
} from 'rxjs/operators';
import { GeneralFormService } from '../../service/general-form.service';
import { TipoMonedaFacade } from '@storeOT/features/tipo-moneda/tipo-moneda.facade';
import { UnidadFacade } from '@storeOT/features/unidad/unidad.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { ContratoOrdinarioLpusTableComponent } from '../../component/contrato-ordinario-lpus-table/contrato-ordinario-lpus-table.component';
import { Unidad, TipoMoneda } from '@data';
import { CubicacionWithLpu } from '@data';

interface CartItem {
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
  selector: 'app-contrato-ordinario-form',
  templateUrl: './contrato-ordinario-form.component.html',
  styleUrls: ['./contrato-ordinario-form.component.scss'],
})
export class ContratoOrdinarioFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  @Output() valueChanges = new EventEmitter<any>();

  initializationFinished$: Subject<boolean> = new Subject();
  selectedCubicacion$: Observable<CubicacionWithLpu>;
  selectedCubicacion: CubicacionWithLpu;
  selectedCubicacionError$: Observable<Error> = of(null);
  incompleteCubicacionError$: Observable<Error> = of(null);

  tiposMoneda$: Observable<TipoMoneda[]> = of([]);
  tiposMoneda: TipoMoneda[] = []; // TODO: mejorar ésto
  unidades$: Observable<Unidad[]> = of([]);
  unidades: Unidad[] = []; // TODO: mejorar ésto

  lpusCarrito: CartItem[] = [];
  currency = '';

  @ViewChild('tableLpus', {
    read: ContratoOrdinarioLpusTableComponent,
    static: false,
  })
  tableLpus: ContratoOrdinarioLpusTableComponent;

  controls = {
    tipo_moneda_id: new FormControl(null, [Validators.required]),
    tipo_moneda_cod: new FormControl(null, [Validators.required]),
    descripcion: new FormControl(null, [
      Validators.required,
      this.noWhitespace,
      Validators.maxLength(300),
    ]),
  };

  form: FormGroup = new FormGroup(this.controls);

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
    if (errors.required || errors.whitespace) {
      return 'Este campo es requerido';
    }
    if (errors.maxlength) {
      return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres`;
    }
    return 'Este campo es inválido';
  }; // tslint:disable-line

  constructor(
    private generalFormService: GeneralFormService,
    private cubageFacade: CubicacionFacade,
    private tipoMonedaFacade: TipoMonedaFacade,
    private unidadFacade: UnidadFacade,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tipoMonedaFacade.resetData();
    this.unidadFacade.resetData();

    this.tiposMoneda$ = this.tipoMonedaFacade.getTiposMoneda$().pipe(
      map(tiposMoneda => tiposMoneda || []),
      map(tiposMoneda => (this.tiposMoneda = tiposMoneda)),
      tap(tiposMoneda => this.checkTiposMonedaAndEnable(tiposMoneda))
    );

    this.unidades$ = this.unidadFacade.getUnidades$().pipe(
      map(unidades => unidades || []),
      tap(unidades => (this.unidades = unidades))
    );

    this.subscription.add(
      this.generalFormService.valueChanges.subscribe(item => {
        if (item) {
          switch (item.controlName) {
            case 'subcontrato_id':
              this.resetTiposMonedaFormControl();
              if (item.value) {
                this.tipoMonedaFacade.getTiposMoneda();
                this.unidadFacade.getUnidades();
              }
              break;
          }
        }
      })
    );

    this.subscription.add(
      this.form
        .get('tipo_moneda_id')
        .valueChanges.pipe(withLatestFrom(this.tiposMoneda$))
        .subscribe(([tipo_moneda_id, tiposMoneda]) => {
          if (tipo_moneda_id !== undefined && tipo_moneda_id !== null) {
            const tipoMoneda = (tiposMoneda || []).find(
              t => t.id === +tipo_moneda_id
            );
            if (tipoMoneda) {
              this.form.get('tipo_moneda_cod').setValue(tipoMoneda.codigo);
              this.updateCurrency(tipoMoneda.codigo);

              this.valueChanges.emit({
                controlName: 'tipo_moneda_id',
                value: {
                  tipo_moneda_id,
                  tipo_moneda: tipoMoneda,
                },
              });
            } else {
              this.form.get('tipo_moneda_cod').setValue('');
              this.updateCurrency('');

              this.valueChanges.emit({
                controlName: 'tipo_moneda_id',
                value: null,
              });
            }
          } else {
            this.form.get('tipo_moneda_cod').setValue('');
            this.updateCurrency('');

            this.valueChanges.emit({
              controlName: 'tipo_moneda_id',
              value: null,
            });
          }
          this.resetLpusCarrito();
        })
    );

    this.subscription.add(
      this.form.get('tipo_moneda_cod').valueChanges.subscribe(tipo_moneda_cod =>
        this.valueChanges.emit({
          controlName: 'tipo_moneda_cod',
          value: { tipo_moneda_cod },
        })
      )
    );

    this.subscription.add(
      this.form.get('descripcion').valueChanges.subscribe(descripcion =>
        this.valueChanges.emit({
          controlName: 'descripcion',
          value: { descripcion },
        })
      )
    );

    this.form.get('tipo_moneda_id').disable({ emitEvent: false });

    this.selectedCubicacion$ = this.cubageFacade
      .getSingleCubicacion$()
      .pipe(
        filter(cubicacion => cubicacion !== null && cubicacion !== undefined)
      );

    this.selectedCubicacionError$ = this.cubageFacade
      .getSingleCubicacionError$()
      .pipe(filter(error => error !== null && error !== undefined));

    this.subscription.add(
      this.tiposMoneda$
        .pipe(
          filter(
            tiposMoneda =>
              tiposMoneda !== null &&
              tiposMoneda !== undefined &&
              tiposMoneda.length > 0
          ),
          takeUntil(this.initializationFinished$),
          withLatestFrom(this.selectedCubicacion$)
        )
        .subscribe(([tiposMoneda, cubicacion]) => {
          const tipoMoneda = tiposMoneda.find(
            reg => reg.id === cubicacion.lpus[0].tipo_moneda_id
          );

          this.form.get('descripcion').setValue('No tiene descripcion');

          if (tipoMoneda) {
            setTimeout(() => {
              this.form.get('tipo_moneda_id').setValue(tipoMoneda.id);

              this.lpusCarrito = cubicacion.lpus.map(lpu => ({
                lpu_nombre: lpu.lpu_nombre,
                lpu_unidad_codigo: lpu.tipo_unidad_codigo,
                lpu_unidad_nombre: lpu.tipo_unidad_nombre,
                cantidad: lpu.lpu_cantidad,
                lpu_precio: lpu.lpu_precio,
                tipo_moneda_cod: lpu.tipo_moneda_cod,
                tipo_moneda_id: lpu.tipo_moneda_id,
                lpu_subtotal: lpu.lpu_subtotal,
              }));

              this.initializationFinished$.next(true);
              this.detector.detectChanges();
            }, 0);
          } else {
            this.initializationFinished$.next(true);
            this.incompleteCubicacionError$ = of(
              new Error('incomplete cubage')
            );
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.initializationFinished$.next(true);
    this.initializationFinished$.complete();
  }

  resetTiposMonedaFormControl(): void {
    this.form.get('tipo_moneda_id').reset();
  }

  checkTiposMonedaAndEnable(tiposMoneda: TipoMoneda[]): void {
    if (tiposMoneda.length > 0) {
      this.form.get('tipo_moneda_id').enable();
    } else {
      this.form.get('tipo_moneda_id').disable();
    }
  }

  resetLpusCarrito(): void {
    this.tableLpusReset();
    this.valueChanges.emit({
      controlName: 'lpus',
      value: {
        lpus: [],
      },
    });
  }

  updateCurrency(currency: string): void {
    this.currency = currency;
  }

  notAllowedToAddRow(): boolean {
    const { tipo_moneda_id } = this.form.getRawValue();
    const items = this.tableLpusValues;
    const canAdd =
      tipo_moneda_id !== null && (items.length === 0 || this.tableLpusValid);
    return !canAdd;
  }

  addTableRow(): void {
    const { tipo_moneda_id, tipo_moneda_cod } = this.form.getRawValue();

    this.tableLpusAddItem({
      lpu_nombre: '',
      lpu_unidad_codigo: this.unidades.length > 0 ? this.unidades[0].id : null,
      lpu_unidad_nombre:
        this.unidades.length > 0 ? this.unidades[0].nombre : '',
      cantidad: 0,
      lpu_precio: 0,
      tipo_moneda_cod,
      tipo_moneda_id,
      lpu_subtotal: 0,
    });
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

    this.tableLpusTouch();
  }

  get valid(): boolean {
    return this.form.valid && this.tableLpusValid;
  }

  tableLpusAddItem(item: CartItem): void {
    if (this.tableLpus !== undefined) {
      this.tableLpus.addItem(item);
    }
  }

  tableLpusReset(): void {
    if (this.tableLpus !== undefined) {
      this.tableLpus.reset();
    }
  }

  tableLpusTouch(): void {
    if (this.tableLpus !== undefined) {
      this.tableLpus.touch();
    }
  }

  get tableLpusValid(): boolean {
    if (this.tableLpus === undefined) {
      return false;
    }
    return this.tableLpus.valid;
  }

  get tableLpusValues(): CartItem[] {
    if (this.tableLpus === undefined) {
      return [];
    }
    return this.tableLpus.values;
  }

  itemAdded({ item }): void {
    const items = this.tableLpusValues;
    this.detector.detectChanges();
    this.valueChanges.emit({
      controlName: 'lpus',
      value: {
        lpus: items,
      },
    });
  }

  itemDeleted({ item }): void {
    const items = this.tableLpusValues;
    this.detector.detectChanges();
    this.valueChanges.emit({
      controlName: 'lpus',
      value: {
        lpus: items,
      },
    });
  }

  cellValueChanged({ cantidad, item }): void {
    const items = this.tableLpusValues;
    this.detector.detectChanges();
    this.valueChanges.emit({
      controlName: 'lpus',
      value: {
        lpus: items,
      },
    });
  }

  get values(): any {
    const { tipo_moneda_id, tipo_moneda_cod, descripcion } =
      this.form.getRawValue();
    const items = this.tableLpusValues;

    return {
      tipo_moneda_id: +tipo_moneda_id,
      tipo_moneda_cod,
      descripcion,
      lpus: items.map(item => ({
        lpu_nombre: item.lpu_nombre,
        lpu_unidad_codigo: item.lpu_unidad_codigo,
        lpu_unidad_nombre: item.lpu_unidad_nombre,
        cantidad: item.cantidad,
        lpu_precio: item.lpu_precio,
        tipo_moneda_cod: item.tipo_moneda_cod,
        tipo_moneda_id: item.tipo_moneda_id,
        lpu_subtotal: item.lpu_subtotal,
      })),
    };
  }
}
