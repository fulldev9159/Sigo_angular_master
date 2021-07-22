import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { OT } from '@data';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { map, tap, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AssignCoordinatorFormComponent } from '../../component/assign-coordinator-form/assign-coordinator-form.component';
import { AssignTrabajadorFormComponent } from '../../component/assign-trabajador-form/assign-trabajador-form.component';

@Component({
  selector: 'app-list-ot',
  templateUrl: './list-ot.component.html',
  styleUrls: ['./list-ot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListOtComponent implements OnInit, OnDestroy {
  public items$: Observable<OT[]>;

  public responsable: 'MIAS';
  public tipoOT: 'OT';
  public selectedIndex = 0;
  public selectedOTs: string;
  public idOtSelected: number;
  public razonrechazo: string;
  private destroyInstance: Subject<boolean> = new Subject();

  displayAssignCoordinatorModal = false;
  displayAssignTrabajadorModal = false;

  displayAuthOTModal = false;

  public configTable = {
    header: true,
    headerConfig: {
      title: '',
      searchText: 'buscar...',
      actionsType: 'Menu',
    },
    body: {
      headers: [
        // {
        //   field: null,
        //   type: 'CHECKBOX',
        //   sort: 'id',
        //   header: 'id',
        //   editable: false
        // },
        {
          field: 'ID',
          type: 'TEXT',
          sort: 'id',
          header: 'id',
          width: '5%',
          editable: false,
        },
        // {
        //   field: 'Sesión SCE',
        //   type: 'TEXT',
        //   sort: 'sesion_sce',
        //   header: 'sesion_sce',
        //   editable: false,
        // },
        {
          field: 'Nombre',
          type: 'TEXT',
          sort: 'nombre',
          header: 'nombre',
          editable: false,
        },
        // {
        //   field: 'Responsable',
        //   type: 'TEXT',
        //   sort: 'responsable',
        //   header: 'responsable',
        //   editable: false,
        // },
        {
          field: 'Estado',
          type: 'TEXT',
          sort: 'estado_otdesc',
          header: 'estado_otdesc',
          editable: false,
        },
        {
          field: 'Etapa',
          type: 'TEXT',
          sort: 'etapa_otdesc',
          header: 'etapa_otdesc',
          editable: false,
        },
        {
          field: 'Fecha inicio',
          type: 'DATE',
          sort: 'fecha_inicio',
          header: 'fecha_inicio',
          editable: false,
        },
        {
          field: 'Fecha termino',
          type: 'DATE',
          sort: 'fecha_termino',
          header: 'fecha_termino',
          editable: false,
        },
        {
          field: 'Contrato',
          type: 'TEXT',
          sort: 'contrato_marco_nombre',
          header: 'contrato_marco_nombre',
          editable: false,
        },
        {
          field: 'Proveedor',
          type: 'TEXT',
          sort: 'proveedor_nombre',
          header: 'proveedor_nombre',
          editable: false,
        },
        {
          field: null,
          type: 'ACTIONS',
          sort: null,
          header: null,
          width: '6%',
          editable: false,
        },
      ],
      sort: [
        'id',
        'nombre',
        'fecha_inicio',
        'contrato_marco_nombre',
        'proveedor_nombre',
      ],
      actions: (ot: OT) => {
        const actions = [
          {
            icon: 'p-button-icon pi pi-info-circle',
            class: 'p-button-rounded p-button-info p-mr-2',
            label: 'Información',
            onClick: (event: Event, item) => {
              this.router.navigate(['/app/ot/detalle-ot/', item.id]);
            },
          },
        ];

        const otAutorizar = (ot.acciones || []).find(
          accion => accion.slug === 'OT_AUTORIZAR'
        );

        if (otAutorizar) {
          actions.push({
            icon: 'p-button-icon pi pi-check',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: 'Aceptar',
            onClick: (event: Event, item) => {
              this.confirmationService.confirm({
                target: event.target as EventTarget,
                message: `¿Desea aceptar Orden de trabajo?`,
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Confirmar',
                rejectLabel: 'Cancelar',
                accept: () => {
                  this.otFacade.approveOT(ot.id);
                },
              });
            },
          });

          actions.push({
            icon: 'p-button-icon pi pi-times',
            class: 'p-button-rounded p-button-danger p-mr-2',
            label: 'Rechazar',
            onClick: (event: Event, item) => {
              this.idOtSelected = item.id;
              this.displayAuthOTModal = true;
            },
          });
        }

        const otAsignarCoordinador = (ot.acciones || []).find(
          accion => accion.slug === 'OT_ASIGNAR_COORDINADOR'
        );

        if (otAsignarCoordinador) {
          actions.push({
            icon: 'p-button-icon pi pi-user',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: otAsignarCoordinador.nombre_corto,
            onClick: (event: Event, item) => {
              this.otFacade.selectOT(ot);
              this.displayAssignCoordinatorModal = true;
            },
          });
        }

        const otAnular = (ot.acciones || []).find(
          accion => accion.slug === 'OT_ANULAR'
        );

        if (otAnular) {
          actions.push({
            icon: 'p-button-icon pi pi-times-circle',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: otAnular.nombre_corto,
            onClick: (event: Event, item) => {
              this.confirmationService.confirm({
                target: event.target as EventTarget,
                message: `¿Desea anular Orden de trabajo?`,
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Confirmar',
                rejectLabel: 'Cancelar',
                accept: () => {
                  this.otFacade.cancelOT(ot.id);
                },
              });
            },
          });
        }

        const otFinalizarTrabajos = (ot.acciones || []).find(
          accion => accion.slug === 'OT_FINALIZAR_TRABAJOS'
        );

        if (otFinalizarTrabajos) {
          actions.push({
            icon: 'p-button-icon pi pi-check-square',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: otFinalizarTrabajos.nombre_corto,
            onClick: (event: Event, item) => {
              this.confirmationService.confirm({
                target: event.target as EventTarget,
                message: `¿Desea finalizar trabajos?`,
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Confirmar',
                rejectLabel: 'Cancelar',
                accept: () => {
                  this.otFacade.finalizeOTJobs(ot.id);
                },
              });
            },
          });
        }
        const otAsignarTranbajador = (ot.acciones || []).find(
          accion => accion.slug === 'OT_ASIGNAR_TRABAJADOR'
        );

        if (otAsignarTranbajador) {
          actions.push({
            icon: 'p-button-icon pi pi-user',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: otAsignarTranbajador.nombre_corto,
            onClick: (event: Event, item) => {
              this.otFacade.selectOT(ot);
              this.displayAssignTrabajadorModal = true;
            },
          });
        }

        return actions;
      },
    },
  };

  public data = [];

  @ViewChild('assignCoordinatorForm', {
    read: AssignCoordinatorFormComponent,
    static: false,
  })
  assignCoordinatorForm: AssignCoordinatorFormComponent;

  @ViewChild('assignTrabajadorForm', {
    read: AssignTrabajadorFormComponent,
    static: false,
  })
  assignTrabajadorForm: AssignTrabajadorFormComponent;

  constructor(
    private otFacade: OtFacade,
    private authFacade: AuthFacade,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.responsable = 'MIAS';
    this.tipoOT = 'OT';
    this.selectedIndex = 0;
    this.selectedOTs = 'ABIERTAS';

    this.items$ = this.otFacade.getOt$().pipe(
      tap(ots => {
        this.closeAssignCoordinatorModal();
        this.closeAssignTrabajadorModal();
      })
    );

    this.otFacade.getOt({
      filtro_propietario: this.responsable,
      filtro_tipo: this.tipoOT,
    });
  }

  onChange($event): void {
    this.selectedIndex = $event.index;
    if (this.selectedIndex === 0) {
      // console.log(this.selectedIndex);
      // console.log(this.responsable);
      // console.log(this.tipoOT);
      this.selectedOTs = 'CERRADAS';
      this.otFacade.getOt({
        filtro_propietario: this.responsable,
        filtro_tipo: this.tipoOT,
      });
    } else if (this.selectedIndex === 1) {
      // console.log(this.selectedIndex);
      // console.log(this.responsable);
      // console.log(this.tipoOT);
      this.selectedOTs = 'ABIERTAS';
      this.otFacade.getOt({
        filtro_propietario: this.responsable,
        filtro_tipo: this.tipoOT,
      });
    }
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }

  onClick(event): void {
    // console.log(this.selectedIndex);
    // console.log(this.responsable);
    // console.log(this.tipoOT);
    this.otFacade.getOt({
      filtro_propietario: this.responsable,
      filtro_tipo: this.tipoOT,
    });
  }

  onClickTipo(event): void {
    // console.log(this.selectedIndex);
    // console.log(this.responsable);
    // console.log(this.tipoOT);
    this.otFacade.getOt({
      filtro_propietario: this.responsable,
      filtro_tipo: this.tipoOT,
    });
  }

  closeAssignCoordinatorModal(): void {
    this.otFacade.selectOT(null); // workaround for subscribing the same ot multiple times
    this.displayAssignCoordinatorModal = false;
  }

  assignCoordinatorFormSubmit(): void {
    console.log(this.assignCoordinatorForm);
    this.assignCoordinatorForm.submit();
  }

  closeAssignTrabajadorModal(): void {
    this.otFacade.selectOT(null); // workaround for subscribing the same ot multiple times
    this.displayAssignTrabajadorModal = false;
  }

  assignTrabajadorFormSubmit(): void {
    console.log(this.assignTrabajadorForm);
    this.assignTrabajadorForm.submit();
  }

  closeAuthOTModal(): void {
    this.idOtSelected = null;
    this.displayAuthOTModal = false;
  }

  rechazarOT(otId: number): void {
    console.log(this.razonrechazo);
    this.otFacade.rejectOT(otId, this.razonrechazo);
    this.closeAuthOTModal();
  }
}
