import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import * as CubModel from '@storeOT/features/cubicacion/cubicacion.model';
import { TableComponetType } from '@storeOT/model';
import { TableComponent } from '@uiOT/table/table.component';
import { ContratoMarco } from '@data';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnDestroy {
  tableValid = true;
  @ViewChild('tableLpus', {
    read: TableComponent,
    static: false,
  })
  tableLpus: TableComponent;

  @Input() formCubicacion: FormGroup;
  @Input() contratosMarcos: ContratoMarco[] = [];
  @Input() Providers: CubModel.Provider[] = [];
  @Input() Regions: CubModel.Region[] = [];
  @Input() TypeServices: CubModel.TypeService[] = [];
  @Input() Services: CubModel.Service[] = [];
  @Input() autoSuggestInitialValue = '';
  @Input() autoSuggestData: CubModel.AutoSuggestItem[] = [];
  // @Input() ConfigTableResumen: TableComponetType;
  msgsLPUQuantityZero = [
    {
      severity: 'error',
      summary: 'ERROR',
      detail: 'No puede haber LPUs con cantidad inferior a 1',
    },
  ];
  hasLPUWithZeroQuantity = false;
  lpusCarrito: CubModel.Service[] = [];
  @Input('lpusCarrito')
  set lpusCarritoInput(lpusCarrito: CubModel.Service[]) {
    this.lpusCarrito = lpusCarrito;
    const item = this.lpusCarrito.find(lpu => lpu.cantidad < 1);
    this.hasLPUWithZeroQuantity = item !== undefined;
  }
  @Input() total: number;
  @Input() currency: string;
  @Output() public cancel = new EventEmitter();
  @Output() public save = new EventEmitter();
  @Output() public lpusSelected = new EventEmitter();
  @Output() public ChangeSearchSuggest = new EventEmitter();
  @Output() public NameSelected = new EventEmitter();
  @Output() public CantidadSelected = new EventEmitter();
  @Output() public BorrarLPUCarrito = new EventEmitter();

  private destroyInstance$: Subject<boolean> = new Subject();

  public ConfigTableResumen = {
    header: true,
    headerConfig: {
      title: '',
      searchText: 'buscar...',
      paginator: false,
      actionsType: 'Buttons',
    },
    body: {
      headers: [
        {
          field: 'Servicio LPU',
          type: 'TEXT',
          sort: 'lpu_nombre',
          header: 'lpu_nombre',
          width: '33%',
          editable: false,
        },
        {
          field: 'Región',
          type: 'TEXT',
          header: 'region',
          width: '10%',
          editable: false,
        },
        {
          field: 'Tipo Servicio',
          type: 'TEXT-TITLECASE',
          sort: 'tipo_servicio',
          header: 'tipo_servicio',
          editable: false,
        },
        {
          field: 'Cantidad	',
          type: 'INPUTNUMBER',
          sort: 'cantidad',
          header: 'cantidad',
          editable: true,
          onchange: (event: Event, item: CubModel.Service) => {
            this.tableValid = this.tableLpus.valid;
            this.CantidadSelected.emit({ event, item });
          },
          validators: [
            Validators.required,
            this.noWhitespace,
            this.nonZero,
            Validators.maxLength(6),
          ],
          errorMessageFn: errors => {
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
          },
        },
        {
          field: 'Unidad	',
          type: 'TEXT',
          sort: 'lpu_unidad_nombre',
          header: 'lpu_unidad_nombre',
          editable: false,
        },
        {
          field: 'Tipo Moneda	',
          type: 'TEXT',
          sort: 'tipo_moneda_cod',
          header: 'tipo_moneda_cod',
          editable: false,
        },
        {
          field: 'Precio',
          type: 'NUMBER',
          sort: 'lpu_precio',
          header: 'lpu_precio',
          editable: false,
        },
        {
          field: 'Subtotal	',
          type: 'NUMBER',
          sort: 'lpu_subtotal',
          header: 'lpu_subtotal',
        },
        {
          field: null,
          type: 'ACTIONS',
          sort: null,
          header: null,
          editable: false,
        },
      ],
      sort: ['lpu_nombre', 'tipo_servicio', 'lpu_precio'],
      actions: [
        {
          icon: 'p-button-icon pi pi-trash',
          class: 'p-button-rounded p-button-danger',
          onClick: (event: Event, item: CubModel.Service) => {
            this.tableValid = this.tableLpus.valid;
            this.BorrarLPUCarrito.emit({ event, item });
          },
        },
      ],
    },
  };

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  nonZero(control: FormControl): any {
    const value = (val => (isNaN(val) ? 0 : val))(parseInt(control.value, 10));
    return value < 1 ? { nonzero: true } : null;
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyInstance$.next(true);
    this.destroyInstance$.complete();
  }

  NameSelectedDummy(item: CubModel.AutoSuggestItem): void {
    this.NameSelected.emit(item.name);
  }

  onChangeAutoSuggest(val: string): void {
    this.ChangeSearchSuggest.emit(val);
  }

  onFocused(val: string): void {}

  inputCleared(): void {
    this.ChangeSearchSuggest.emit('');
  }

  lpusSelectedDummy(event: any): void {
    this.lpusSelected.emit(event);
  }

  cancelAction(): void {
    this.cancel.emit(true);
  }

  saveAction(): void {
    this.save.emit(true);
  }
}
