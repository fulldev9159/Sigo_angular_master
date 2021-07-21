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
import { NgxPermissionsService } from 'ngx-permissions';

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

  configHeaders = [
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
  ];

  configSort = ['lpu_nombre', 'tipo_servicio'];

  public ConfigTableResumen = {
    header: true,
    headerConfig: {
      title: '',
      searchText: 'buscar...',
      paginator: false,
      actionsType: 'Buttons',
    },
    body: {
      headers: this.configHeaders,
      sort: this.configSort,
      actions: [],
    },
  };

  subscription: Subscription = new Subscription();
  constructor(private permissionsService: NgxPermissionsService) {
    this.subscription.add(
      permissionsService.permissions$.subscribe(permissions => {
        if (permissions['OT_VER_VALOR_LPU']) {
          this.ConfigTableResumen = {
            ...this.ConfigTableResumen,
            body: {
              headers: [
                ...this.configHeaders,
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
                  editable: false,
                },
              ],
              sort: [...this.configSort, 'lpu_precio'],
              actions: [],
            },
          };
        }
      })
    );
  }

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
