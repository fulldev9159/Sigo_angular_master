import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { Cubicacion } from '@storeOT/features/cubicacion/cubicacion.model';
import { ConfirmationService } from 'primeng/api';
import { Subscription, Subject, Observable } from 'rxjs';
import { map, filter, takeUntil } from 'rxjs/operators';
import * as cubModel from '@storeOT/features/cubicacion/cubicacion.model';
import { Login } from '@data';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-detalle-lpus',
  templateUrl: './detalle-lpus.component.html',
  styleUrls: ['./detalle-lpus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleLpusComponent implements OnInit, OnDestroy {
  @Input() DisplayModal: boolean;
  @Input() detalleCubicacion: cubModel.ResponseDetalleCubicacion[];
  @Output() closes = new EventEmitter();
  subscription: Subscription = new Subscription();
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
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Close(): void {
  //   console.log('sdas');
  //   this.close.emit();
  // }
}
