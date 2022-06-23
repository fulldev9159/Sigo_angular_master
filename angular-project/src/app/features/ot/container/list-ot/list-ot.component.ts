import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import {
  MotivoRechazo,
  OT,
  RequestAceptarRechazarOT,
  DetalleInformeAvance,
} from '@data';
import { ConfirmationService } from 'primeng/api';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { map, tap, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AssignCoordinatorFormComponent } from '../../component/assign-coordinator-form/assign-coordinator-form.component';
import { AssignTrabajadorFormComponent } from '../../component/assign-trabajador-form/assign-trabajador-form.component';
import { RegistrarLibroObraComponent } from '@featureOT/ot/component/registrar-libro-obra/registrar-libro-obra';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-ot',
  templateUrl: './list-ot.component.html',
  styleUrls: ['./list-ot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListOtComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  detalleInformeAvance$: Observable<DetalleInformeAvance> =
    this.otFacade.getDetalleInformeAvance$();
  detalleInformeAvanceError$: Observable<any> =
    this.otFacade.getDetalleInformeAvanceError$();

  itemsEjecucion$: Observable<OT[]>;
  itemsAbiertas$: Observable<OT[]>;
  itemsCerradas$: Observable<OT[]>;

  tipoRechazo$: Observable<MotivoRechazo[]> = of([]);

  responsable: 'TODAS';
  tipoOT: 0;
  selectedIndex = 0;
  selectedOTs: string;
  idOtSelected: number;
  razonrechazo: string;

  etapa: string;
  displayAceptacionIncialModal = false;
  displayRechazoIncialModal = false;
  displayAssignTrabajadorModal = false;
  displayLibroObra = false;
  displayAuthOTModal = false;
  displayInformeAvanceModal = false;

  formRechazoInicialControls = {
    tipo_id: new FormControl(null, [Validators.required]),
    motivo: new FormControl(null, [
      Validators.required,
      this.noWhitespace,
      Validators.maxLength(200),
    ]),
  };
  formRechazoIncial: FormGroup = new FormGroup(this.formRechazoInicialControls);

  configTable = {
    header: true,
    headerConfig: {
      title: '',
      searchText: 'buscar...',
      actionsType: 'Menu',
    },
    body: {
      headers: [
        {
          field: 'ID',
          type: 'TEXT',
          sort: 'id',
          header: 'id',
          width: '5%',
          editable: false,
        },
        {
          field: 'Sesión SCE',
          type: 'TEXT',
          sort: 'sce_session',
          header: 'sce_session',
          editable: false,
        },
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
        // {
        //   field: 'Estado',
        //   type: 'TEXT',
        //   sort: 'estado_otdesc',
        //   header: 'estado_otdesc',
        //   editable: false,
        // },
        {
          field: 'Etapa',
          type: 'TEXT',
          sort: 'etapa_otdesc',
          header: 'etapa_otdesc',
          editable: false,
        },
        {
          field: 'Sub-Etapa',
          type: 'TEXT',
          sort: 'subetapa_otdesc',
          header: 'subetapa_otdesc',
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
          field: 'Creado Por',
          type: 'TEXT',
          sort: 'usuario_nombre',
          header: 'usuario_nombre',
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
        'usuario_nombre',
      ],
      actions: (ot: OT) => {
        const actions = [
          {
            icon: 'p-button-icon pi pi-info-circle',
            class: 'p-button-rounded p-button-info p-mr-2',
            label: 'Información',
            onClick: (event: Event, item) => {
              this.router.navigate(['/app/informacion/info-ot', item.id]);
            },
          },
          {
            icon: 'p-button-icon pi pi-book',
            class: 'p-button-rounded p-button-info p-mr-2',
            label: 'Agregar al libro de obras',
            onClick: (event: Event, item) => {
              this.otFacade.selectOT(ot);
              this.displayLibroObra = true;
            },
          },
        ];

        const otAutorizarInicial = (ot.acciones || []).find(
          accion => accion.slug === 'OT_ACEPTAR_INICIAL'
        );

        if (otAutorizarInicial) {
          actions.push({
            icon: 'p-button-icon pi pi-check',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: 'Aceptar OT',
            onClick: (event: Event, item) => {
              this.otFacade.selectOT(ot);
              this.idOtSelected = item.id;
              this.etapa = item.etapa_slug;
              this.displayAceptacionIncialModal = true;
            },
          });

          actions.push({
            icon: 'p-button-icon pi pi-times red',
            class: 'p-button-rounded p-button-danger p-mr-2',
            label: 'Rechazar OT',
            onClick: (event: Event, item) => {
              this.idOtSelected = item.id;
              this.etapa = item.etapa_slug;
              this.displayRechazoIncialModal = true;
              this.otFacade.getAllMotivoRechazoOT('ACEPTACION_JERARQUICA');
            },
          });
        }

        const otAutorizarProveedor = (ot.acciones || []).find(
          accion => accion.slug === 'OT_ACEPTAR_PROVEEDOR'
        );

        if (otAutorizarProveedor) {
          actions.push({
            icon: 'p-button-icon pi pi-check',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: 'Asignar Supervisor de trabajos',
            onClick: (event: Event, item) => {
              this.otFacade.selectOT(ot);
              this.idOtSelected = item.id;
              this.etapa = item.etapa_slug;
              this.displayAssignTrabajadorModal = true;
            },
          });

          actions.push({
            icon: 'p-button-icon pi pi-times red',
            class: 'p-button-rounded p-button-danger p-mr-2',
            label: 'Rechazar OT',
            onClick: (event: Event, item) => {
              this.idOtSelected = item.id;
              this.etapa = item.etapa_slug;
              this.displayRechazoIncialModal = true;
              this.otFacade.getAllMotivoRechazoOT('ACEPTACION_OT_EECC');
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
        // const otAnular = (ot.acciones || []).find(
        //   accion => accion.slug === 'OT_ANULAR'
        // );

        // if (otAnular) {
        //   actions.push({
        //     icon: 'p-button-icon pi pi-times-circle',
        //     class: 'p-button-rounded p-button-success p-mr-2',
        //     label: otAnular.nombre_corto,
        //     onClick: (event: Event, item) => {
        //       this.confirmationService.confirm({
        //         target: event.target as EventTarget,
        //         message: `¿Desea anular Orden de trabajo?`,
        //         icon: 'pi pi-exclamation-triangle',
        //         acceptLabel: 'Confirmar',
        //         rejectLabel: 'Cancelar',
        //         accept: () => {
        //           this.otFacade.cancelOT(ot.id);
        //         },
        //       });
        //     },
        //   });
        // }

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

        const otInformeAvance = (ot.acciones || []).find(
          accion => accion.slug === 'OT_GENERAR_INFORME_AVANCE'
        );

        if (otInformeAvance) {
          actions.push({
            icon: 'p-button-icon pi pi-file-excel',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: 'Generar Informa de Avance',
            onClick: (event: Event, item) => {
              this.router.navigate([
                '/app/informacion/informe-avance',
                item.id,
              ]);
            },
          });
        }

        const otGenerarActa = (ot.acciones || []).find(
          accion => accion.slug === 'OT_GENERAR_ACTA'
        );

        if (otGenerarActa) {
          actions.push({
            icon: 'p-button-icon pi pi-file-excel',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: 'Generar Acta',
            onClick: (event: Event, item) => {
              this.router.navigate([
                '/app/informacion/informe-avance',
                item.id,
              ]);
            },
          });
        }

        const otValidarActas = (ot.acciones || []).find(
          accion => accion.slug === 'OT_VALIDAR_ACTA'
        );

        if (otValidarActas) {
          actions.push({
            icon: 'p-button-icon pi pi-check',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: 'Validar la generación del acta',
            onClick: (event: Event, item) => {
              this.router.navigate(['/app/informacion/acta/', item.id]);
            },
          });
        }

        const otAutorizarPagos = (ot.acciones || []).find(
          accion => accion.slug === 'OT_AUTORIZAR_PAGOS'
        );

        if (otAutorizarPagos) {
          actions.push({
            icon: 'p-button-icon pi pi-money-bill',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: 'Autorizar Pago',
            onClick: (event: Event, item) => {
              this.router.navigate(['/app/informacion/acta/', item.id]);
              // this.confirmationService.confirm({
              //   target: event.target as EventTarget,
              //   message: `¿Desea autorizar pago?`,
              //   icon: 'pi pi-exclamation-triangle',
              //   acceptLabel: 'Confirmar',
              //   rejectLabel: 'Cancelar',
              //   accept: () => {
              //     this.otFacade.authorizePayments(ot.id);
              //   },
              // });
            },
          });
        }

        const otFinalizar = (ot.acciones || []).find(
          accion => accion.slug === 'OT_CERRAR'
        );

        if (otFinalizar) {
          actions.push({
            icon: 'p-button-icon pi pi-check-circle',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: otFinalizar.nombre_corto,
            onClick: (event: Event, item) => {
              this.confirmationService.confirm({
                target: event.target as EventTarget,
                message: `¿Desea finalizar la Orden de Trabajo?`,
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Confirmar',
                rejectLabel: 'Cancelar',
                accept: () => {
                  this.otFacade.finalizeOT(ot.id);
                },
              });
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

  @ViewChild('registrarLibroObraForm', {
    read: RegistrarLibroObraComponent,
    static: false,
  })
  registrarLibroObraForm: RegistrarLibroObraComponent;

  constructor(
    private otFacade: OtFacade,
    private authFacade: AuthFacade,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.otFacade.resetData();
    this.responsable = 'TODAS';
    this.tipoOT = 0;
    this.selectedIndex = 0;
    this.selectedOTs = 'ABIERTAS';

    this.itemsEjecucion$ = this.otFacade.getOtEjecucion$().pipe(
      tap(ots => {
        this.closeAceptacionInicialModal();
        this.closeAssignTrabajadorModal();
        this.closeRegistrarLibroObraModal();
      })
    );

    this.itemsAbiertas$ = this.otFacade.getOtAbiertas$().pipe(
      tap(ots => {
        this.closeAceptacionInicialModal();
        this.closeAssignTrabajadorModal();
        this.closeRegistrarLibroObraModal();
      })
    );

    this.itemsCerradas$ = this.otFacade.getOtCerradas$().pipe(
      tap(ots => {
        this.closeAceptacionInicialModal();
        this.closeAssignTrabajadorModal();
        this.closeRegistrarLibroObraModal();
      })
    );

    this.otFacade.getOts({
      filtro_propietario: this.responsable,
      filtro_tipo: +this.tipoOT,
      filtro_pestania: '',
    });

    this.tipoRechazo$ = this.otFacade.getAllMotivoRechazoOT$();
  }

  onChange($event): void {
    this.selectedIndex = $event.index;
    if (this.selectedIndex === 0) {
      // console.log(this.selectedIndex);
      // console.log(this.responsable);
      // console.log(this.tipoOT);
      this.selectedOTs = 'CERRADAS';
      this.otFacade.getOts({
        filtro_propietario: this.responsable,
        filtro_tipo: +this.tipoOT,
        filtro_pestania: '',
      });
    } else if (this.selectedIndex === 1) {
      // console.log(this.selectedIndex);
      // console.log(this.responsable);
      // console.log(this.tipoOT);
      this.selectedOTs = 'ABIERTAS';
      this.otFacade.getOts({
        filtro_propietario: this.responsable,
        filtro_tipo: +this.tipoOT,
        filtro_pestania: '',
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClick(event): void {
    // console.log(this.selectedIndex);
    // console.log(this.responsable);
    // console.log(this.tipoOT);
    this.otFacade.getOts({
      filtro_propietario: this.responsable,
      filtro_tipo: +this.tipoOT,
      filtro_pestania: '',
    });
  }

  onClickTipo(event): void {
    // console.log(this.selectedIndex);
    // console.log(this.responsable);
    // console.log(this.tipoOT);
    this.otFacade.getOts({
      filtro_propietario: this.responsable,
      filtro_tipo: +this.tipoOT,
      filtro_pestania: '',
    });
  }

  closeAceptacionInicialModal(): void {
    this.otFacade.selectOT(null); // workaround for subscribing the same ot multiple times
    this.idOtSelected = null;
    this.displayAceptacionIncialModal = false;
  }

  AceptacionInicialSubmit(): void {
    const request: RequestAceptarRechazarOT = {
      ot_id: this.idOtSelected,
      values: {
        estado: 'ACEPTADO',
      },
    };

    // console.log(request);
    this.otFacade.AceptarRechazarIncialOT(request);
    this.responsable = 'TODAS';
    this.tipoOT = 0;
    this.selectedIndex = 0;
    this.selectedOTs = 'ABIERTAS';
    this.closeAceptacionInicialModal();
  }

  closeRechazoInicialModal(): void {
    this.idOtSelected = null;
    this.displayRechazoIncialModal = false;
    this.formRechazoIncial.reset();
  }

  rechazoInicialSubmit(): void {
    const request: RequestAceptarRechazarOT = {
      ot_id: this.idOtSelected,
      values: {
        estado: 'RECHAZADO',
        observacion: this.formRechazoIncial.get('motivo').value,
        tipo: +this.formRechazoIncial.get('tipo_id').value,
      },
    };
    console.log(this.etapa);
    if (this.etapa === 'OT_ET_AUTORIZACION_PROVEEDOR') {
      this.otFacade.RechazarProveedorOT(request);
    } else if (this.etapa === 'OT_ET_AUTORIZACION_INICIAL') {
      this.otFacade.AceptarRechazarIncialOT(request);
    }
    this.responsable = 'TODAS';
    this.tipoOT = 0;
    this.selectedIndex = 0;
    this.selectedOTs = 'ABIERTAS';

    this.closeRechazoInicialModal();
  }

  closeAssignTrabajadorModal(): void {
    this.otFacade.selectOT(null); // workaround for subscribing the same ot multiple times
    this.displayAssignTrabajadorModal = false;
    this.idOtSelected = null;
  }

  closeRegistrarLibroObraModal(): void {
    this.otFacade.selectOT(null);
    this.displayLibroObra = false;
  }

  assignTrabajadorFormSubmit(): void {
    this.assignTrabajadorForm.submit();
    this.responsable = 'TODAS';
    this.tipoOT = 0;
    this.selectedIndex = 0;
    this.selectedOTs = 'ABIERTAS';
    this.closeAssignTrabajadorModal();
  }

  registrarLibroObraFormSubmit(): void {
    this.registrarLibroObraForm.submit();
    this.displayLibroObra = false;
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

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  showInformeAvanceModal(ot_id: number): void {
    this.otFacade.getDetalleInformeAvance(ot_id);
    this.displayInformeAvanceModal = true;
  }

  closeInformeAvanceModal(): void {
    //// this.otFacade.getDetalleInformeAvance(null); // TODO
    this.displayInformeAvanceModal = false;
  }
}
