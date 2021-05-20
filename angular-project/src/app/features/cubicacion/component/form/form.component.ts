import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  @Output() public cancel = new EventEmitter();
  @Output() public save = new EventEmitter();
  @Output() public selected = new EventEmitter();
  private destroyInstance$: Subject<boolean> = new Subject();
  public lpuSelected: CubModel.SubContractedServices[];
  public configTable = {
    header: true,
    headerConfig: {
      title: '',
      searchText: 'buscar...',
      paginator: false,
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
          type: 'TEXT',
          sort: 'tipo_servicio',
          header: 'tipo_servicio',
          editable: false,
        },
        {
          field: 'Cantidad	',
          type: 'TEXT',
          sort: 'quantity',
          header: 'quantity',
          editable: false,
        },
        {
          field: 'Unidad	',
          type: 'TEXT',
          sort: 'inventoryStatus',
          header: 'inventoryStatus',
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

    this.lpuSelected = event.value.map((x) => ({
      ...x,
      region: regionName,
      tipo_servicio: tipoServicioName,
    }));
    this.selected.emit(event.value);
  }

  cancelAction(): void {
    this.cancel.emit(true);
  }

  saveAction(): void {
    this.save.emit(true);
  }
}
