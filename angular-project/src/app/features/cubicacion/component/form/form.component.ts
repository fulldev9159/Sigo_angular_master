import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import * as CubModel from '@storeOT/features/cubicacion/cubicacion.model';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnDestroy {
  // declarations
  @Input() formCubicacion: FormGroup;
  @Input() constractMarco: CubModel.ContractMarco[] = [];
  @Input() subContractedProviders: CubModel.SubContractedProviders[] = [];
  @Input() subContractedRegions: CubModel.SubContractedRegions[] = [];
  @Input() subContractedTypeServices: CubModel.SubContractedTypeServices[] = [];
  @Input() subContractedServices: CubModel.SubContractedServices[] = [];
  @Input() autoSuggestData: CubModel.AutoSuggestForm[] = [];
  @Output() public cancel = new EventEmitter();
  @Output() public save = new EventEmitter();
  @Output() public selected = new EventEmitter();
  @Output() public ChangeSearchContainer = new EventEmitter();
  @Output() public selectSearch = new EventEmitter();
  private destroyInstance$: Subject<boolean> = new Subject();
  public lpuSelected: CubModel.SubContractedServices[] = [];
  public total = 0;
  public keyword = 'name';

  public configTable = {
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
          onchange: (event: Event, item) => {
            this.lpuSelected = this.lpuSelected.map((x) => {
              if (x.lpu_id === item.lpu_id) {
                return {
                  ...x,
                  cantidad: +(event.target as HTMLInputElement).value,
                  lpu_subtotal: +(
                    +x.lpu_precio * +(event.target as HTMLInputElement).value
                  ),
                };
              }
              return x;
            });
            this.total = this.lpuSelected.reduce((total, currentValue) => {
              return total + currentValue.lpu_subtotal;
            }, 0);
            this.selected.emit(this.lpuSelected);
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
          icon: 'p-button-icon pi pi-eye',
          class: 'p-button-rounded p-button-warning p-mr-2',
          onClick: (item) => {
            console.log(item);
          },
        },
        {
          icon: 'p-button-icon pi pi-trash',
          class: 'p-button-rounded p-button-danger',
          onClick: (item) => {
            console.log(item);
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

  itemSelected(event: any): void {
    const regionIDstr = 'region_id';
    const regionID = this.formCubicacion.controls[regionIDstr].value;
    const tipoServicioIDstr = 'tipo_servicio_id';
    const tipoServicioID =
      this.formCubicacion.controls[tipoServicioIDstr].value;
    const regionName = this.subContractedRegions.filter(
      (x) => x.id === +regionID
    )[0].codigo;
    const tipoServicioName = this.subContractedTypeServices.filter(
      (x) => x.id === +tipoServicioID
    )[0].nombre;

    this.lpuSelected = event.value.map((x) => {
      let cantidad = 1;
      let lpu_subtotal = x.lpu_precio;
      if (this.lpuSelected.length > 0) {
        const lpuExistente = this.lpuSelected.filter(
          (y) => +y.lpu_id === +x.lpu_id
        );
        if (lpuExistente.length > 0) {
          cantidad = lpuExistente[0].cantidad;
          lpu_subtotal = +(+x.lpu_precio * +cantidad);
        }
      }
      return {
        ...x,
        region: regionName,
        tipo_servicio: tipoServicioName,
        cantidad,
        lpu_subtotal,
      };
    });
    this.total = this.lpuSelected.reduce((total, currentValue) => {
      return total + currentValue.lpu_subtotal;
    }, 0);
    this.selected.emit(this.lpuSelected);
  }

  selectEvent(item): void {
    // do something with selected item
    this.selectSearch.emit(item.name);
  }

  onChangeSearch(val: string): void {
    this.ChangeSearchContainer.emit(val);
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(val: string): void {
    // do something when input is focused
  }

  cancelAction(): void {
    this.cancel.emit(true);
  }

  saveAction(): void {
    this.save.emit(true);
  }
}
