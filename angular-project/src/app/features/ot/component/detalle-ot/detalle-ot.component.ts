import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subscription, Subject, Observable } from 'rxjs';
import * as otModel from '@storeOT/features/ot/ot.model';
import * as cubModel from '@storeOT/features/cubicacion/cubicacion.model';

@Component({
  selector: 'app-detalle-ot',
  templateUrl: './detalle-ot.component.html',
  styleUrls: ['./detalle-ot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleOtComponent implements OnInit, OnDestroy {
  @Input() formOt: any;
  @Input() detalleOt: otModel.DataRspDetalleOT;
  @Input() DisplayModal: boolean;
  @Input() detalleCubicacion: cubModel.ResponseDetalleCubicacion[];
  @Output() public getlpus = new EventEmitter();
  @Output() public cerrar = new EventEmitter();
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
          field: 'Tipo Servicio',
          type: 'TEXT-TITLECASE',
          sort: 'tipo_servicio_nombre',
          header: 'tipo_servicio_nombre',
          width: '15%',
          editable: false,
        },
        {
          field: 'Cantidad	',
          type: 'TEXT',
          sort: 'lpu_cantidad',
          header: 'lpu_cantidad',
          editable: true,
        },
        {
          field: 'Unidad	',
          type: 'TEXT',
          sort: 'tipo_unidad_nombre',
          header: 'tipo_unidad_nombre',
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
      ],
      sort: ['lpu_nombre', 'tipo_servicio', 'lpu_precio'],
      actions: [],
    },
  };

  subscription: Subscription = new Subscription();
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getLPUs(cubicacion_id: number): void {
    this.getlpus.emit(cubicacion_id);
  }

  public Close(): void {
    console.log('Close desde dummy ot detalle-ot');
    this.cerrar.emit();
  }
}
