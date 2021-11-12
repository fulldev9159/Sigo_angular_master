import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { DetalleCubicacion } from '@data';

@Component({
  selector: 'app-detalle-cubicacion-table',
  templateUrl: './detalle-cubicacion-table.component.html',
  styleUrls: ['./detalle-cubicacion-table.component.scss'],
})
export class DetalleCubicacionTableComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  detalleCubicacion$: Observable<DetalleCubicacion[]>;
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

  constructor(
    private cubageFacade: CubicacionFacade,
    private permissionsService: NgxPermissionsService
  ) {
    this.subscription.add(
      this.permissionsService.permissions$.subscribe(permissions => {
        if (permissions.OT_VER_VALOR_LPU) {
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

  ngOnInit(): void {
    this.detalleCubicacion$ =
      this.cubageFacade.getDetallesCubicacionSelector$();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
