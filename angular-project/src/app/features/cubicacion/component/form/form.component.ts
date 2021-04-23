import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContractMarco, SubContractedProviders, SubContractedRegions, SubContractedServices, SubContractedTypeServices } from '@storeOT/features/cubicacion/cubicacion.model';
import { SeleccionType } from '@uiOT/seleccion/seleccion.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {

  // declarations
  @Input() formCubicacion: FormGroup;
  @Input() constractMarco: ContractMarco[] = [];
  @Input() subContractedProviders: SubContractedProviders[] = [];
  @Input() subContractedRegions: SubContractedRegions[] = [];
  @Input() subContractedTypeServices: SubContractedTypeServices[] = [];
  @Input() subContractedServices: SubContractedServices[] = [];
  @Output() public cancel = new EventEmitter();
  @Output() public save = new EventEmitter();
  @Output() public selected = new EventEmitter();
  private destroyInstance$: Subject<boolean> = new Subject();
  public configTable = {
    header: true,
    headerConfig: {
      title: '',
      searchText: 'buscar...'
    },
    body: {
      headers: [
        {
          field: null,
          type: 'CHECKBOX',
          sort: 'id',
          header: 'id',
          editable: false
        },
        {
          field: 'Sesión SCE',
          type: 'TEXT',
          sort: 'name',
          header: 'name',
          editable: false
        },
        {
          field: 'Nombre',
          type: 'NUMBER',
          sort: 'price',
          header: 'price',
          editable: false
        },
        {
          field: 'Fecha inicio',
          type: 'TEXT',
          sort: 'category',
          header: 'category',
          editable: false
        },
        {
          field: 'Fecha termino	',
          type: 'TEXT',
          sort: 'quantity',
          header: 'quantity',
          editable: false
        },
        {
          field: 'Contrato marco	',
          type: 'TEXT',
          sort: 'inventoryStatus',
          header: 'inventoryStatus',
          editable: false
        },
        {
          field: null,
          type: 'ACTIONS',
          sort: null,
          header: null,
          editable: false
        }
      ],
      actions: [
        {
          icon: 'p-button-icon pi pi-save',
          class: 'p-button-rounded p-button-success p-mr-2',
          onClick: (item) => {
            console.log(item);
          }
        },
        {
          icon: 'p-button-icon pi pi-pencil',
          class: 'p-button-rounded p-button-warning p-mr-2',
          onClick: (item) => {
            console.log(item);
          }
        },
        {
          icon: 'p-button-icon pi pi-trash',
          class: 'p-button-rounded p-button-danger',
          onClick: (item) => {
            console.log(item);
          }
        }
      ]
    }
  };


  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyInstance$.next(true);
    this.destroyInstance$.complete();
  }

  itemSelected(event: any): void {
    console.log(event);
    this.selected.emit(event.value);
  }

  cancelAction(): void {
    this.cancel.emit(true);
  }

  saveAction(): void {
    this.save.emit(true);
  }

}
