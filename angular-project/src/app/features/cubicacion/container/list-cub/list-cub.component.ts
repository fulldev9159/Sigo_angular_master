import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { Cubicacion } from '@storeOT/features/cubicacion/cubicacion.model';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { map, filter, takeUntil } from 'rxjs/operators';
import * as cubModel from '@storeOT/features/cubicacion/cubicacion.model';
import { Login } from '@data';
import { MessageService } from 'primeng/api';
import { CloneCubageFormComponent } from '../../component/clone-cubage-form/clone-cubage-form.component';

@Component({
  selector: 'app-list-cub',
  templateUrl: './list-cub.component.html',
  styleUrls: ['./list-cub.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCubComponent implements OnInit, OnDestroy {
  // declarations
  public items$: Observable<Cubicacion[]>;
  public displayClonatedCubageNameModal = false;
  public DisplayModal = false;
  private destroyInstance: Subject<boolean> = new Subject();
  public detalleCubicacion$: Observable<cubModel.ResponseDetalleCubicacion[]>;
  public authLogin: Login = null;
  public configTable = {
    header: true,
    headerConfig: {
      title: '',
      searchText: 'buscar...',
      paginator: true,
      actionsType: 'Buttons',
    },
    body: {
      headers: [
        {
          field: 'Nombre',
          type: 'TEXT',
          sort: 'nombre',
          header: 'nombre',
          editable: false,
          width: '20%',
        },
        {
          field: 'Fecha creación',
          type: 'DATE',
          sort: 'fecha_creacion',
          header: 'fecha_creacion',
          width: '8%',
          editable: false,
        },
        {
          field: 'Región',
          type: 'TEXT',
          sort: 'region_nombre',
          header: 'region_nombre',
          width: '15%',
          editable: false,
        },
        {
          field: 'Contrato marco',
          type: 'TEXT',
          sort: 'contrato_marco_nombre',
          header: 'contrato_marco_nombre',
          editable: false,
          width: '10%',
        },
        {
          field: 'Proveedor',
          type: 'TEXT',
          sort: 'proveedor_nombre',
          header: 'proveedor_nombre',
          editable: false,
          width: '15%',
        },
        {
          field: 'Total',
          type: 'NUMBER',
          sort: 'total',
          header: 'total',
          width: '10%',
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
      sort: [
        'nombre',
        'fecha',
        'region_nombre',
        'contrato_marco_nombre',
        'total',
      ],
      actions: [
        {
          icon: 'p-button-icon pi pi-copy',
          class: 'p-button p-button-help p-mr-2',
          onClick: (event: Event, item: cubModel.Cubicacion) => {
            this.cloneCubageForm.reset();
            this.cubageFacade.selectCubicacion(item);
            this.displayClonatedCubageNameModal = true;
          },
        },
        {
          icon: 'p-button-icon pi pi-eye',
          class: 'p-button p-button-info p-mr-2',
          onClick: (event: Event, item) => {
            this.DisplayModal = true;
            this.cubageFacade.getDetallesCubicacionAction(item.id);
          },
        },
        {
          disabled: 'asignado',
          tooltipDisabled: 'No puede editar una cubicacion asignada a una OT',
          icon: 'p-button-icon pi pi-pencil',
          class: 'p-button p-button-warning p-mr-2',
          onClick: (event: Event, item) => {
            if (item) {
              this.router.navigate(['/app/cubicacion/form-cub', item.id]);
            }
          },
        },
        {
          disabled: 'asignado',
          tooltipDisabled: 'No puede eliminar una cubicacion asignada a una OT',
          icon: 'p-button-icon pi pi-trash',
          class: 'p-button p-button-danger',
          onClick: (event: Event, item: cubModel.Cubicacion) => {
            this.confirmationService.confirm({
              target: event.target as EventTarget,
              message: '¿Está seguro que desea eliminar esta cubicación?',
              icon: 'pi pi-exclamation-triangle',
              acceptLabel: 'Confirmar',
              rejectLabel: 'Cancelar',
              accept: () => {
                this.cubageFacade.deleteCubicacion(item.id);
              },
            });
          },
        },
      ],
    },
  };

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

  @ViewChild('cloneCubageForm', {
    read: CloneCubageFormComponent,
    static: false,
  })
  cloneCubageForm: CloneCubageFormComponent;

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private cubageFacade: CubicacionFacade,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.authFacade
      .getLogin$()
      .pipe(takeUntil(this.destroyInstance))
      .subscribe(authLogin => {
        if (authLogin) {
          this.authLogin = authLogin;
        }
      });

    this.authFacade
      .getCurrentProfile$()
      .pipe(takeUntil(this.destroyInstance))
      .subscribe(profile => {
        if (profile) {
          this.cubageFacade.getCubicacionAction(+profile.id);
        }
      });

    this.detalleCubicacion$ =
      this.cubageFacade.getDetallesCubicacionSelector$();
    this.items$ = this.cubageFacade.getCubicacionSelector$();
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }

  closeClonatedCubageNameModal(): void {
    this.displayClonatedCubageNameModal = false;
  }

  cloneCubabeFormSubmit(): void {
    this.cloneCubageForm.submit();
    this.displayClonatedCubageNameModal = false;
  }
}
