import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import * as CubModel from '@storeOT/features/cubicacion/cubicacion.model';
import { TableComponetType } from '@storeOT/model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() formCubicacion: FormGroup;
  @Input() contratosMarcos: CubModel.ContractMarco[] = [];
  @Input() Providers: CubModel.Provider[] = [];
  @Input() Regions: CubModel.Region[] = [];
  @Input() TypeServices: CubModel.TypeService[] = [];
  @Input() Services: CubModel.Service[] = [];
  @Input() autoSuggestData: CubModel.AutoSuggestItem[] = [];
  // @Input() ConfigTableResumen: TableComponetType;
  @Input() lpusCarrito: CubModel.Service[] = [];
  @Input() total: number;
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
            this.CantidadSelected.emit({ event, item });
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
            this.BorrarLPUCarrito.emit({ event, item });
          },
        },
      ],
    },
  };

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
