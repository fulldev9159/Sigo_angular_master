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
import { ConfirmationService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { Cubicacion, Login } from '@data';
import { CloneCubageFormComponent } from '../../forms/clone-cubage-form/clone-cubage-form.component';

@Component({
  selector: 'app-list-cub',
  templateUrl: './list-cub.component.html',
  styleUrls: ['./list-cub.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCubComponent implements OnInit, OnDestroy {
  public cubicaciones$: Observable<Cubicacion[]>;
  public displayClonatedCubageNameModal = false;
  public DisplayModalDetalleCubicacion = false;
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
          width: '10%',
          editable: false,
        },
        {
          field: 'Contrato marco',
          type: 'TEXT',
          sort: 'contrato_marco_nombre',
          header: 'contrato_marco_nombre',
          editable: false,
          width: '8%',
        },
        {
          field: 'Proveedor',
          type: 'TEXT',
          sort: 'proveedor_nombre',
          header: 'proveedor_nombre',
          editable: false,
          width: '10%',
        },
        {
          field: 'Total',
          type: 'MONEY',
          sort: 'total',
          header: 'total',
          currency: 'total_tipo_moneda',
          width: '10%',
          editable: false,
        },
        {
          field: 'Creado Por',
          type: 'TEXT',
          sort: 'creador_usuario_nombre',
          header: 'creador_usuario_nombre',
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
        'creador_usuario_nombre',
      ],
      actions: (cub: Cubicacion) => {
        const actions = [
          {
            disabled: false,
            tooltipDisabled: '',
            icon: 'p-button-icon pi pi-copy',
            class: 'p-button p-button-help p-mr-2',
            onClick: (event: Event, item: Cubicacion) => {
              this.cloneCubageForm.reset();
              this.cubageFacade.selectCubicacion(item);
              this.displayClonatedCubageNameModal = true;
            },
          },
          {
            icon: 'p-button-icon pi pi-eye',
            class: 'p-button p-button-info p-mr-2',
            onClick: (event: Event, item: Cubicacion) => {
              this.DisplayModalDetalleCubicacion = true;
              this.cubageFacade.getDetallesCubicacionAction(item.id);
            },
          },
        ];

        let disabled = false;
        let tooltipTextEdit = '';
        let tooltipTextDelete = '';
        if (cub.asignado) {
          disabled = true;
          tooltipTextEdit = 'No puede editar una cubicacion asignada a una OT';
          tooltipTextDelete =
            'No puede eliminar una cubicacion asignada a una OT';
        } else if (this.authLogin.usuario_id !== cub.creador_usuario_id) {
          disabled = true;
          tooltipTextEdit = 'No puede editar cubicaciones de otro usuario';
          tooltipTextDelete = 'No puede eliminar cubicaciones de otro usuario';
        }

        actions.push(
          {
            disabled,
            tooltipDisabled: tooltipTextEdit,
            icon: 'p-button-icon pi pi-pencil',
            class: 'p-button p-button-warning p-mr-2',
            onClick: (event: Event, item: Cubicacion) => {
              if (item) {
                this.router.navigate(['/app/cubicacion/form-cub', item.id]);
              }
            },
          },
          {
            disabled,
            tooltipDisabled: tooltipTextDelete,
            icon: 'p-button-icon pi pi-trash',
            class: 'p-button p-button-danger',
            onClick: (event: Event, item: Cubicacion) => {
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
          }
        );
        return actions;
      },
    },
  };

  @ViewChild('cloneCubageForm', {
    read: CloneCubageFormComponent,
    static: false,
  })
  cloneCubageForm: CloneCubageFormComponent;

  subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private cubageFacade: CubicacionFacade,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.cubageFacade.resetData();
    this.subscription.add(
      this.authFacade.getLogin$().subscribe(authLogin => {
        if (authLogin) {
          this.authLogin = authLogin;
        }
      })
    );
    this.cubageFacade.getCubicacionAction();
    this.cubicaciones$ = this.cubageFacade.getCubicacionSelector$();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cloneCubabeFormSubmit(): void {
    this.cloneCubageForm.submit();
    this.displayClonatedCubageNameModal = false;
  }
}
