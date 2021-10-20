import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { Subscription, Subject, Observable } from 'rxjs';
import * as otModel from '@storeOT/features/ot/ot.model';
import * as cubModel from '@storeOT/features/cubicacion/cubicacion.model';
import { NgxPermissionsService } from 'ngx-permissions';
import { OtFacade } from '@storeOT/features/ot/ot.facade';

import * as Data from '@data';

interface Icon {
  [st: string]: string;
}
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
  @Input() registroLibroObras: Data.RegistroLibroObra[];
  @Output() public getlpus = new EventEmitter();
  @Output() public cerrar = new EventEmitter();
  registosLibroDeObras$: Observable<Data.RegistroLibroObra[]>;
  adjuntos: Data.AdjuntosArray[] = [];
  apiUrl = '';

  icons: Icon[] = [];

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

  constructor(
    @Inject('environment') environment,
    private permissionsService: NgxPermissionsService,
    private otFacade: OtFacade
  ) {
    this.apiUrl = environment.api || 'http://localhost:4040';
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
    const docx = 'docx';
    const jpg = 'jpg';
    const jpeg = 'jpeg';
    const pdf = 'pdf';
    const png = 'PNG';
    const json = 'json';
    const txt = 'txt';
    const xls = 'xls';
    const csv = 'csv';
    this.icons[docx] = 'pi-file';
    this.icons[json] = 'pi-file';
    this.icons[txt] = 'pi-file';
    this.icons[jpg] = 'pi-image';
    this.icons[jpeg] = 'pi-image';
    this.icons[png] = 'pi-image';
    this.icons[pdf] = 'pi-file-pdf';
    this.icons[xls] = 'pi-file-excel';
    this.icons[csv] = 'pi-file-excel';
    this.registosLibroDeObras$ = this.otFacade.getRegistrosLibroObras$();
    this.subscription.add(
      this.registosLibroDeObras$.subscribe(registros => {
        registros.forEach(registro => {
          const temp: Data.AdjuntosArray[] = registro.archivos_adjuntos.map(
            adjunto => ({
              autor: registro.usuario_nombre,
              fecha: registro.created_at,
              extension: adjunto.extension,
              nombre_original: adjunto.nombre_original,
              size: adjunto.size,
              url: adjunto.url,
            })
          );
          this.adjuntos.push(...temp);
        });
      })
    );
  }

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

  getIcon(type: string): void {
    return this.icons[type];
  }

  tabSelected(event): void {
    // console.log('event', event);
  }

  getUrl(url: string): string {
    return `${this.apiUrl}${url}`;
  }

  getColor(extension: string): string {
    if (extension === 'xls' || extension === 'csv') {
      return '#047004';
    }
    if (extension === 'docx' || extension === 'txt' || extension === 'json') {
      return '#0d0d5a';
    }

    if (extension === 'pdf') {
      return '#ab0e0e';
    }

    if (extension === 'jpeg' || extension === 'jpg' || extension === 'PNG') {
      return '#01a5a5';
    }
  }
}
