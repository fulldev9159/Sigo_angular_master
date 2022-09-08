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
  RequestAutorizarInformeAvance,
  OTService,
  RequestAprobarRechazarOperaciones,
} from '@data';
import { ConfirmationService } from 'primeng/api';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { map, tap, takeUntil, take } from 'rxjs/operators';
import { Router } from '@angular/router';
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
  totalServicios: number;
  totalUO: number;

  detalleInformeAvance$: Observable<DetalleInformeAvance> =
    this.otFacade.getDetalleInformeAvance$();
  // detalleInformeAvanceError$: Observable<any> =
  //   this.otFacade.getDetalleInformeAvanceError();
  sendingDetalleInformeAvance$: Observable<boolean> =
    this.otFacade.sendingDetalleInformeAvance$();

  itemsEjecucion$: Observable<OT[]>;
  itemsAbiertas$: Observable<OT[]>;
  itemsCerradas$: Observable<OT[]>;
  itemsAnuladas$: Observable<OT[]>;
  itemsQuebradas$: Observable<OT[]>;

  tipoRechazo$: Observable<MotivoRechazo[]> = of([]);

  comentarios$ = this.otFacade.getComentariosFinalizacionTrabajos$();

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
  displayAprobarInformeAvanceModal = false;
  displayRechazoInformeAcvanceModal = false;
  displayAuthInformeModal = false;
  displaySoliciarPago = false;
  displayCerrarOT = false;
  displayAnularOT = false;
  displayAprobarRechazarOperaciones = false;
  displayRechazoOperaciones = false;
  displayConfirmarRechazoObras = false;
  displaySolicitarInformeTrabajosFinalizados = false;
  displayInformarTrabajosFinalizados = false;

  formRechazoInicialControls = {
    tipo_id: new FormControl(null, [Validators.required]),
    motivo: new FormControl(null, [
      Validators.required,
      this.noWhitespace,
      Validators.maxLength(200),
    ]),
  };
  formRechazoIncial: FormGroup = new FormGroup(this.formRechazoInicialControls);

  formTrabajosFinalizados: FormGroup = new FormGroup({
    informe: new FormControl('', [Validators.required]),
  });

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

        const otEnviarInformeAvance = (ot.acciones || []).find(
          accion => accion.slug === 'OT_ENVIAR_INFORME_AVANCE'
        );

        if (otEnviarInformeAvance) {
          actions.push({
            icon: 'p-button-icon pi pi-send',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: otEnviarInformeAvance.nombre_corto,
            onClick: (event: Event, item) => {
              this.otFacade.getDetalleInformeAvance(item.id);
              this.displayInformeAvanceModal = true;
            },
          });
        }

        const otAceptarInformeAvance = (ot.acciones || []).find(
          accion => accion.slug === 'OT_AUTORIZAR_INFORME_AVANCE'
        );

        if (otAceptarInformeAvance) {
          actions.push({
            icon: 'p-button-icon pi pi-check',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: otAceptarInformeAvance.nombre_corto,
            onClick: (event: Event, item) => {
              this.idOtSelected = item.id;
              this.etapa = item.etapa_slug;
              this.otFacade.getDetalleInformeAvance(item.id);
              this.displayAprobarInformeAvanceModal = true;
            },
          });

          // actions.push({
          //   icon: 'p-button-icon pi pi-times red',
          //   class: 'p-button-rounded p-button-danger p-mr-2',
          //   label: 'Rechazar Informe de Avance',
          //   onClick: (event: Event, item) => {
          //     this.idOtSelected = item.id;
          //     this.etapa = item.etapa_slug;
          //     this.displayRechazoInformeAcvanceModal = true;
          //     this.otFacade.getDetalleInformeAvance(item.id);
          //     this.otFacade.getAllMotivoRechazoOT('ACEPTACION_OT_EECC');
          //   },
          // });
        }

        const otEditarInformeAvance = (ot.acciones || []).find(
          accion => accion.slug === 'OT_EDITAR_INFORME_AVANCE'
        );

        if (otEditarInformeAvance) {
          actions.push({
            icon: 'p-button-icon pi pi-pencil',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: otEditarInformeAvance.nombre_corto,
            onClick: (event: Event, item) => {
              this.router.navigate([
                '/app/informacion/informe-avance',
                item.id,
              ]);
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
              this.router.navigate(['/app/informacion/generar-acta', item.id]);
            },
          });
        }

        const otValidarActa = (ot.acciones || []).find(
          accion => accion.slug === 'OT_VALIDAR_ACTA'
        );

        if (otValidarActa) {
          actions.push({
            icon: 'p-button-icon pi pi-file-excel',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: 'Validar Acta',
            onClick: (event: Event, item) => {
              this.router.navigate(['/app/informacion/validar-acta', item.id]);
            },
          });
        }

        const otSilicitarPago = (ot.acciones || []).find(
          accion => accion.slug === 'OT_SOLICITAR_PAGO'
        );

        if (otSilicitarPago) {
          actions.push({
            icon: 'p-button-icon pi pi-file-excel',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: 'Solicitar Pago',
            onClick: (event: Event, item) => {
              this.idOtSelected = item.id;
              this.etapa = item.etapa_slug;
              this.displaySoliciarPago = true;
            },
          });
        }

        const otValidarPago = (ot.acciones || []).find(
          accion => accion.slug === 'OT_AUTORIZAR_PAGOS'
        );

        if (otValidarPago) {
          actions.push({
            icon: 'p-button-icon pi pi-file-excel',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: 'Autorizar Pago',
            onClick: (event: Event, item) => {
              this.router.navigate(['/app/informacion/validar-pago', item.id]);
            },
          });
        }

        const cerrarOT = (ot.acciones || []).find(
          accion => accion.slug === 'OT_CERRAR'
        );

        if (cerrarOT) {
          actions.push({
            icon: 'p-button-icon pi pi-file-excel',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: 'Cerrar OT',
            onClick: (event: Event, item) => {
              this.idOtSelected = item.id;
              this.etapa = item.etapa_slug;
              this.displayCerrarOT = true;
            },
          });
        }

        const agregarServAdic = (ot.acciones || []).find(
          accion => accion.slug === 'OT_AGREGAR_SERV_ADIC'
        );

        if (agregarServAdic) {
          actions.push({
            icon: 'p-button-icon pi pi-file-excel',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: 'Agregar servicios adicionales',
            onClick: (event: Event, item) => {
              this.idOtSelected = item.id;
              this.etapa = item.etapa_slug;
              this.router.navigate([
                '/app/informacion/agregar-servicios-adicionales',
                item.id,
              ]);
            },
          });
        }

        const anulatOT = (ot.acciones || []).find(
          accion => accion.slug === 'OT_ANULAR'
        );

        if (anulatOT) {
          actions.push({
            icon: 'p-button-icon pi pi-file-excel',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: 'Anular OT',
            onClick: (event: Event, item) => {
              this.idOtSelected = item.id;
              this.etapa = item.etapa_slug;
              this.displayAnularOT = true;
            },
          });
        }

        const aprobacionOpereaciones = (ot.acciones || []).find(
          accion => accion.slug === 'OT_APROBACION_OPERACIONES'
        );

        if (aprobacionOpereaciones) {
          actions.push({
            icon: 'p-button-icon pi pi-check',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: 'Aprobar/rechazar OT',
            onClick: (event: Event, item) => {
              this.idOtSelected = item.id;
              this.etapa = item.etapa_slug;
              this.otFacade.getDetalleInformeAvance(item.id);
              this.displayAprobarRechazarOperaciones = true;
            },
          });
        }

        const aceptarRechazoOperaciones = (ot.acciones || []).find(
          accion => accion.slug === 'OT_CONFIRMAR_RECHAZO_OBRAS'
        );

        if (aceptarRechazoOperaciones) {
          actions.push({
            icon: 'p-button-icon pi pi-file-excel',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: 'Confirmar Rechazo Obras',
            onClick: (event: Event, item) => {
              this.idOtSelected = item.id;
              this.etapa = item.etapa_slug;
              this.displayConfirmarRechazoObras = true;
            },
          });
        }

        // ADMIN SOLICITA AL TRABAJADOR QUE INFORME DE TRABAJOS FINALIZADOS
        // ES EN LA ETAPA GENERAR NUEVA ACTA
        const solicitarInformeTrabajosFinalizados = (ot.acciones || []).find(
          accion => accion.slug === 'OT_SOLIC_INF_TRABAJO_FIN'
        );

        if (solicitarInformeTrabajosFinalizados) {
          actions.push({
            icon: 'p-button-icon pi pi-file-excel',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: 'Solicitar informe trabajos finalizados',
            onClick: (event: Event, item) => {
              this.idOtSelected = item.id;
              this.etapa = item.etapa_slug;
              this.displaySolicitarInformeTrabajosFinalizados = true;
            },
          });
        }

        // SUPERVISOR DE TRABAJOS DEBE INGRESAR UN INFORME DE TRABAJOS FINALIZADOS
        // ESTA ES UNA NUEVA ETAPA OT_ET_PAGO_INFORMAR_TRABAJOS_FINALIZADOS
        const informarTrabajosFinalizados = (ot.acciones || []).find(
          accion => accion.slug === 'OT_INF_TRABAJO_FIN'
        );

        if (informarTrabajosFinalizados) {
          actions.push({
            icon: 'p-button-icon pi pi-file-excel',
            class: 'p-button-rounded p-button-success p-mr-2',
            label: 'Informar trabajos finalizados',
            onClick: (event: Event, item) => {
              this.idOtSelected = item.id;
              this.etapa = item.etapa_slug;
              this.displayInformarTrabajosFinalizados = true;
            },
          });
        }

        return actions;
      },
    },
  };

  public data = [];

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
    private router: Router,
    private otService: OTService
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

    this.itemsAnuladas$ = this.otFacade.getOtAnuladas$().pipe(
      tap(ots => {
        this.closeAceptacionInicialModal();
        this.closeAssignTrabajadorModal();
        this.closeRegistrarLibroObraModal();
      })
    );
    this.itemsQuebradas$ = this.otFacade.getOtQuebradas$().pipe(
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

    this.subscription.add(
      this.detalleInformeAvance$.subscribe(detalle => {
        if (detalle) {
          detalle.many_informe_has_servicio.forEach(x => {
            this.totalServicios =
              this.totalServicios + +x.valor_unitario_clp * +x.cantidad;
            console.log(this.totalServicios);
            x.many_informe_has_uob.forEach(y => {
              this.totalUO = this.totalUO + +y.valor_unitario_clp * +y.cantidad;
            });
          });
        }
      })
    );

    this.subscription.add(
      this.comentarios$.pipe(take(1)).subscribe(comentario => {
        if (comentario)
          this.formTrabajosFinalizados.get('informe').setValue(comentario);
      })
    );
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
    this.displayInformeAvanceModal = false;
  }

  closeAprobarInformeAvanceModal(): void {
    this.displayAprobarInformeAvanceModal = false;
  }

  closeAnularOT(): void {
    this.displayAnularOT = false;
  }

  AceptarInformeAvance(): void {
    const request: RequestAutorizarInformeAvance = {
      ot_id: this.idOtSelected,
      estado: 'APROBADO',
    };

    // console.log(request);
    this.otFacade.AceptarRechazarInformeAvanceOT(request);
    this.responsable = 'TODAS';
    this.tipoOT = 0;
    this.selectedIndex = 0;
    this.selectedOTs = 'ABIERTAS';
    this.closeAprobarInformeAvanceModal();
  }
  closeAuthInformeModal(): void {
    this.displayAuthInformeModal = false;
  }

  DesplegarRechazoInformeAvance(): void {
    this.displayAuthInformeModal = true;
    this.otFacade.getAllMotivoRechazoOT('ACEPTACION_OT_EECC');
  }

  RechazarInformeAvance(): void {
    const request: RequestAutorizarInformeAvance = {
      ot_id: this.idOtSelected,
      estado: 'RECHAZADO',
      observacion: this.formRechazoIncial.get('motivo').value,
      tipo: +this.formRechazoIncial.get('tipo_id').value,
    };
    this.otFacade.AceptarRechazarInformeAvanceOT(request);
    this.responsable = 'TODAS';
    this.tipoOT = 0;
    this.selectedIndex = 0;
    this.selectedOTs = 'ABIERTAS';
    this.displayAuthInformeModal = false;
  }

  sendDetalleInformeAvance(detalle: DetalleInformeAvance): void {
    this.otFacade.sendDetalleInformeAvance(detalle.ot_id);
    this.closeInformeAvanceModal();
  }

  closeSolicitarPago(): void {
    this.otFacade.selectOT(null);
    this.displaySoliciarPago = false;
  }

  solicitarPago(): void {
    this.displaySoliciarPago = false;
    this.otFacade.solicitarPago(this.idOtSelected);
  }

  closeCerrarOT(): void {
    this.otFacade.selectOT(null);
    this.displayCerrarOT = false;
  }

  cerrarOT(): void {
    this.displayCerrarOT = false;
    this.otFacade.cerrarOT(this.idOtSelected);
  }

  anularOT(): void {
    this.displayAnularOT = false;
    this.otFacade.anularOT(this.idOtSelected);
  }

  closeAprobarRechazarOperaciones(): void {
    this.displayAprobarRechazarOperaciones = false;
  }

  DesplegarRechazoOperaciones(): void {
    this.displayRechazoOperaciones = true;
    this.otFacade.getAllMotivoRechazoOT('VALIDACION_OPERACIONES');
  }
  12;

  closeRechazoOperaciones(): void {
    this.displayRechazoOperaciones = false;
  }

  closeConfirmarRechazoObras(): void {
    this.displayConfirmarRechazoObras = false;
  }

  RechazarOperaciones(): void {
    const request: RequestAprobarRechazarOperaciones = {
      ot_id: this.idOtSelected,
      estado: 'RECHAZAR',
      observacion: this.formRechazoIncial.get('motivo').value,
      tipo_rechazo_id: +this.formRechazoIncial.get('tipo_id').value,
    };
    this.otFacade.AprobarRechazarOperaciones(request);
    this.displayRechazoOperaciones = false;
    this.displayAprobarRechazarOperaciones = false;

    // TODO CERRAR COSAS
  }

  AceptarOperaciones(): void {
    const request: RequestAprobarRechazarOperaciones = {
      ot_id: this.idOtSelected,
      estado: 'APROBAR',
    };
    this.otFacade.AprobarRechazarOperaciones(request);
    this.displayAprobarRechazarOperaciones = false;
  }

  confirmarRechazoObras(): void {
    this.displayConfirmarRechazoObras = false;
    this.otFacade.confirmarRechazoObras(this.idOtSelected);
    // TODO CERRAR COSAS
  }

  closeSolicitarInformeTrabajosFinalizados(): void {
    this.displaySolicitarInformeTrabajosFinalizados = false;
  }

  solicitarInformeTrabajosFinalizados(): void {
    this.otFacade.solicitarInformeTrabajosFinalizados(this.idOtSelected);
    this.displaySolicitarInformeTrabajosFinalizados = false;
  }

  closeInformarTrabajosFinalizados(): void {
    this.displayInformarTrabajosFinalizados = false;
  }

  InformarTrabajosFinalizados(): void {
    this.otFacade.informarTrabajosFinalizados(
      this.idOtSelected,
      this.formTrabajosFinalizados.get('informe').value
    );
    this.displayInformarTrabajosFinalizados = false;
  }
}
