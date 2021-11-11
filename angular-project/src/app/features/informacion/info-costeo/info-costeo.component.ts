import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import * as data from '@data';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { NgxPermissionsService } from 'ngx-permissions';
import { DetalleCubicacion } from '@data';

@Component({
  selector: 'app-info-costeo',
  templateUrl: './info-costeo.component.html',
  styleUrls: ['./info-costeo.component.scss'],
})
export class InfoCosteoComponent implements OnInit {
  subscription: Subscription = new Subscription();
  detalleOt$: Observable<data.DataRspDetalleOT>;
  DisplayModal = false;
  detalleCubicacion$: Observable<DetalleCubicacion[]> = of([]);

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
    private otFacade: OtFacade,
    private cubFacade: CubicacionFacade,
    private permissionsService: NgxPermissionsService
  ) {
    this.subscription.add(
      permissionsService.permissions$.subscribe(permissions => {
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
    this.detalleOt$ = this.otFacade.getDetalleOtSelector$();
    this.detalleCubicacion$ = this.cubFacade.getDetallesCubicacionSelector$();
  }

  getlpus(cubicacion_id: number): void {
    this.DisplayModal = true;
    this.cubFacade.getDetallesCubicacionAction(cubicacion_id);
  }

  Close(): void {
    this.DisplayModal = false;
  }
}
