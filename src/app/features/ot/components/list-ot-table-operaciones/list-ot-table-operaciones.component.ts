import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faBook,
  faBookMedical,
  faCircleInfo,
  faPause,
  faPlay,
  faDollar,
  faRectangleXmark,
  faSquareCheck,
  faSquareXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  Accion,
  Dropdown,
  LastSolicitudQuiebre,
  ReqAprobarRechazarSolicitudQuiebre,
  ReqQuiebre,
  ReqSolicitarQuiebre,
  RequestAceptarRechazarOT,
  RequestAprobarRechazarOperaciones,
  RequestCreateRegistroLibroObra,
  DetalleOT,
} from '@model';
import { ViewRechazoComponent } from '@sharedOT/view-rechazo/view-rechazo.component';
import { ActaFacade } from '@storeOT/acta/acta.facades';
import { FlujoOTFacade } from '@storeOT/flujo-ot/flujo-ot.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { OTDetalleFacade } from '@storeOT/ot-detalle/ot-detalle.facades';
import { combineLatest, map, Observable, Subscription, take, tap } from 'rxjs';
import { RegistrarLibroObrasComponent } from '../registrar-libro-obras/registrar-libro-obras.component';

@Component({
  selector: 'zwc-list-ot-table-operaciones',
  templateUrl: './list-ot-table-operaciones.component.html',
  styleUrls: ['./list-ot-table-operaciones.component.scss'],
})
export class ListOtTableOperacionesComponent implements OnDestroy, OnInit {
  subscription: Subscription = new Subscription();

  // 86 TODO: PROBAR COMPORTAMIENTO CON MAS DE UNA OT
  // 87 TODO: CORREGIR COMO SE VE EL TOOLTIP DEL AGREGAR REGISTRO LIBRO DE OBRAS
  // 88 TODO: MIGRAR CASO EN QUE FALLE EL ACEPTAR OT PROVEEDOR Y SE DEBA EMPEZAR EN LA ETAPA DE ASIGNACION
  // 161 TODO: PROGRAMAR EL RECHAZO DEL ACTA POR PARTE DE OPERACIONES
  // 162 TODO: MIGRAR LOS TOUCH Y INVALID FORM DEL  REGISTRO DE LIBRO DE OBRAS
  // 163 TODO: AGREGAR EL SPINNER AL BOTON DE REGISTRO LIBRO DE OBRAS
  // 164 TODO: MEJORAR EL UX CUANDO SE CIERRA EL MODAL DEL REGISTRO DE OBRAS DEBE ESPERAR A QUE TERMINE EL ENDPOINT
  // 165 TODO: AGREGAR SPINNER O LOADING CUANDO PRECIONE PLAY
  // 166 TODO:  MIGRAR EL CERRAR OT
  // 167 TODO: MIGRAR EL ACEPTAR QUIEBRE
  @Input() acciones: Accion[];
  @Input() ot_id: number;

  @ViewChild('rechazoInicialForm', {
    read: ViewRechazoComponent,
    static: false,
  })
  rechazoInicialForm: ViewRechazoComponent;

  @ViewChild('rechazoProveeodrForm', {
    read: ViewRechazoComponent,
    static: false,
  })
  rechazoProveeodrForm: ViewRechazoComponent;

  @ViewChild(RegistrarLibroObrasComponent)
  registrarLibroObraForm: RegistrarLibroObrasComponent;

  @ViewChild('solicitudQuiebreForm', {
    read: ViewRechazoComponent,
    static: false,
  })
  solicitudQuiebreForm: ViewRechazoComponent;

  @ViewChild('QuiebreForm', {
    read: ViewRechazoComponent,
    static: false,
  })
  QuiebreForm: ViewRechazoComponent;

  @ViewChild('rechazoSolicitudQuiebreForm', {
    read: ViewRechazoComponent,
    static: false,
  })
  rechazoSolicitudQuiebreForm: ViewRechazoComponent;

  infoIcon = faCircleInfo;
  medicalIcon = faBookMedical;
  bookIcon = faBook;
  playIcon = faPlay;
  dollarIcon = faDollar;
  pauseIcon = faPause;
  checkIcon = faSquareCheck;
  cancelIcon = faSquareXmark;
  rectanguleIcon = faRectangleXmark;

  // MODALS
  displayModalAgregarRegistroLibroDeObras = false;
  displayModalCambiarSustentoFinanciero = false;
  displayModalAceptarInicial = false;
  displayModalRechazoOrdenDeTrabajo = false;
  displayModalRechazoOrdenDeTrabajoInicial = false;
  displayModalAceptarProveedor = false;
  displayModalSolicitudPago = false;
  displayModalAprobacionOperaciones = false;
  displayModalRechazoObras = false;
  displayModalCerrarOT = false;
  displayModalAnularOT = false;
  displayModalInformeTrabajosFinalizados = false;
  displayModalSendInformeTrabajosFinalizados = false;
  displayModalSolicitarQuiebre = false;
  displayModalDesquiebre = false;
  displayModalCierreAdministrativo = false;
  displayAprobarRechazarQuiebreGestor = false;
  displayQuiebreGestor = false;
  displayModalRechazarSolicitudQuiebre = false;

  // DATA
  posibleSupervisorDeTrabajo$: Observable<Dropdown[]> = this.flujoOTFacade
    .getPosibleSupervisorDeTrabajos$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: value.nombre,
          code: value.id,
        }))
      )
    );

  motivosRechazo$: Observable<Dropdown[]> = this.flujoOTFacade
    .getMotivosRechazo$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.motivo > b.motivo ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: value.motivo,
          code: value.id,
        }))
      )
    );

  flagSolicitudQuiebre$: Observable<LastSolicitudQuiebre> =
    this.flujoOTFacade.getSolicitudQuiebre$();

  // FORM
  formControls = {
    trabajador_id: new FormControl('', [Validators.required]),
  };
  form: FormGroup = new FormGroup(this.formControls);

  formTrabajosFinalizados: FormGroup = new FormGroup({
    informe: new FormControl('', [Validators.required]),
  });

  otDetalle$: Observable<DetalleOT> = this.otDetalleFacade.getDetalleOT$();

  // LOADINGS
  loadingPosibleSupervisorDeTrabajos$: Observable<boolean> =
    this.loadingsFacade.sendingGetPosibleSupervisorTrabajos$();
  loadingLastSolicitudPago$: Observable<boolean> =
    this.loadingsFacade.sendingLastSolicitudQuiebre$();

  constructor(
    private flujoOTFacade: FlujoOTFacade,
    private otDetalleFacade: OTDetalleFacade,
    private actaFacade: ActaFacade,
    private loadingsFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.actaFacade
        .getComentariosFinalizacionTrabajos$()
        .subscribe(v => this.formTrabajosFinalizados.get('informe').setValue(v))
    );

    this.subscription.add(
      this.loadingsFacade
        .sendingUpdateSustentoFinanciero$()
        .subscribe(loading => {
          if (!loading) {
            this.closeModalCambiarSustentoFinanciero();
          }
        })
    );
  }

  // ACCIONES ETAPA: OT_ET_AUTORIZACION_INICIAL
  confirmarAceptacionOTInicial(): void {
    const request: RequestAceptarRechazarOT = {
      ot_id: this.ot_id,
      values: {
        estado: 'ACEPTADO',
      },
    };

    this.flujoOTFacade.aceptarRechazarIncialOT(request);
    this.displayModalRechazoOrdenDeTrabajoInicial = false;
    this.displayModalAceptarInicial = false;
  }

  ShowModelrechazarOTInicial(): void {
    this.flujoOTFacade.getMotivosRechazo('PAGO_JERARQUICO');
    this.displayModalRechazoOrdenDeTrabajoInicial = true;
  }

  closeModalRechazoInicial(): void {
    this.displayModalRechazoOrdenDeTrabajoInicial = false;
    this.displayModalAceptarInicial = false;
    this.rechazoInicialForm.formRechazo.reset();
  }

  RechazarOTInicial(): void {
    const request: RequestAceptarRechazarOT = {
      ot_id: this.ot_id,
      values: {
        estado: 'RECHAZADO',
        observacion: this.rechazoInicialForm.formRechazo.get('motivo').value,
        tipo: +this.rechazoInicialForm.formRechazo.get('tipo_id').value,
      },
    };

    this.flujoOTFacade.aceptarRechazarIncialOT(request);
    this.closeModalRechazoInicial();
  }

  // ACCIONES ETAPA: OT_ET_AUTORIZACION_PROVEEDOR
  openModalAceptacionOTProveedor(): void {
    this.displayModalAceptarProveedor = true;
    this.flujoOTFacade.getPosibleSupervisorDeTrabajos(this.ot_id);
  }

  displayModalrechazarOrdenProveedor(): void {
    this.flujoOTFacade.getMotivosRechazo('ACEPTACION_OT_EECC');
    this.displayModalRechazoOrdenDeTrabajo = true;
  }

  closeModalRechazoProveedor(): void {
    this.displayModalRechazoOrdenDeTrabajo = false;
    this.displayModalAceptarProveedor = false;
    this.rechazoProveeodrForm.formRechazo.reset();
  }

  rechazarOrdenProveedor(): void {
    const request: RequestAceptarRechazarOT = {
      ot_id: this.ot_id,
      values: {
        estado: 'RECHAZADO',
        observacion: this.rechazoProveeodrForm.formRechazo.get('motivo').value,
        tipo: +this.rechazoProveeodrForm.formRechazo.get('tipo_id').value,
      },
    };

    this.flujoOTFacade.rechazarOTProveedor(request);
    this.closeModalRechazoProveedor();
  }

  aceptarOrdenProveedor(): void {
    if (this.formValid) {
      const request: RequestAceptarRechazarOT = {
        ot_id: this.ot_id,
        values: {
          estado: 'ACEPTADO',
        },
      };
      this.flujoOTFacade.aceptarOTProveedor(
        request,
        this.ot_id,
        +this.form.get('trabajador_id').value,
        'SUPERVISOR_DE_TRABAJOS'
      );
      this.displayModalAceptarProveedor = false;
    }
  }

  //

  findAccion(accion: string): boolean {
    return (
      this.acciones &&
      this.acciones.find(value => value.slug === accion) !== undefined
    );
  }

  confirmarSolicitarPago(): void {
    this.flujoOTFacade.solicitarPago(this.ot_id);
    this.displayModalSolicitudPago = false;
  }

  aprobarActaOperaciones(): void {
    const request: RequestAprobarRechazarOperaciones = {
      ot_id: this.ot_id,
      estado: 'APROBAR',
    };
    this.flujoOTFacade.aprobarRechazarOperaciones(request);
    this.displayModalAprobacionOperaciones = false;
  }

  rechazarActaOperaciones(): void {}

  // ACCIONES REGISTRAR LIBRO DE OBAS
  registrarLibroObras(): void {
    if (this.registrarLibroObraForm.valid) {
      const request_registrar_libroObras: RequestCreateRegistroLibroObra = {
        ot_id: this.ot_id,
        observaciones:
          this.registrarLibroObraForm.form.get('observaciones').value,
      };

      this.otDetalleFacade.subirArchivoLibroObrasYregistrarLibroObras(
        +this.registrarLibroObraForm.form.get('categoria').value,
        this.registrarLibroObraForm.uploadedFiles['files'],
        request_registrar_libroObras
      );

      this.registrarLibroObraForm.filesform.clear();
      this.registrarLibroObraForm.form.reset();

      this.displayModalAgregarRegistroLibroDeObras = false;
    }
  }

  confirmarRechazoObras(): void {
    this.displayModalRechazoObras = false;
    this.flujoOTFacade.confirmarRechazoObras(this.ot_id);
  }

  cerrarOT(): void {
    this.flujoOTFacade.cerrarOT(this.ot_id);
    this.displayModalCerrarOT = false;
  }

  // OT_ET_ANULACION_POR_RECHAZO_PROV
  anularOT(): void {
    this.flujoOTFacade.anularOT(this.ot_id);
    this.displayModalAnularOT = false;
  }

  // OT_ET_PAGO_INFORMAR_TRABAJOS_FINALIZADOS
  displayInformeTrabajosFinalizados(): void {
    this.actaFacade.getComentariosFinalizacionTrabajos(this.ot_id);
    this.displayModalInformeTrabajosFinalizados = true;
  }

  closeModalInformeTrabajosFinalizados(): void {
    this.formTrabajosFinalizados.reset();
    this.displayModalInformeTrabajosFinalizados = false;
  }

  sendInformeTrabajosFinalizados(): void {
    this.actaFacade.informarTrabajosFinalizados(
      this.ot_id,
      this.formTrabajosFinalizados.get('informe').value
    );
  }

  // QUIEBRE
  showModalSolicitarQuiebre(): void {
    this.flujoOTFacade.getSolicitudQuiebre(this.ot_id);
    this.flujoOTFacade.getMotivosRechazo('MOTIVO_QUIEBRE');
    this.displayModalSolicitarQuiebre = true;
  }

  confirmarSolicitudQuiebre(): void {
    const request: ReqSolicitarQuiebre = {
      ot_id: this.ot_id,
      observacion: this.solicitudQuiebreForm.formRechazo.get('motivo').value,
      tipo_motivo_quiebre:
        +this.solicitudQuiebreForm.formRechazo.get('tipo_id').value,
    };
    this.flujoOTFacade.solicitarQuiebre(request);
    this.displayModalSolicitarQuiebre = false;
  }

  showModalQuebrarGestor(): void {
    this.flujoOTFacade.getSolicitudQuiebre(this.ot_id);
    this.flujoOTFacade.getMotivosRechazo('MOTIVO_QUIEBRE');
    this.displayAprobarRechazarQuiebreGestor = true;
  }

  quiebreGestor(): void {
    let request: ReqQuiebre = {
      ot_id: this.ot_id,
      observacion: this.QuiebreForm.formRechazo.get('motivo').value,
      tipo_causa_id: +this.QuiebreForm.formRechazo.get('tipo_id').value,
    };

    this.flujoOTFacade.quiebre(request);
    this.displayAprobarRechazarQuiebreGestor = false;
  }

  // RECHAZAR SOLICITUD DE QUIEBRE
  displayRechazoSolicitudQuiebre(): void {
    this.flujoOTFacade.getMotivosRechazo('RECHAZO_QUIEBRE');
    this.displayModalRechazarSolicitudQuiebre = true;
  }

  closeModalRechazoSolicitudQuiebre(): void {
    this.displayModalRechazarSolicitudQuiebre = false;
    this.displayAprobarRechazarQuiebreGestor = false;
    this.rechazoSolicitudQuiebreForm.formRechazo.reset();
  }

  rechazarSolicitudQuiebre(solicitud_id: number): void {
    let request: ReqAprobarRechazarSolicitudQuiebre = {
      id: solicitud_id,
      values: {
        aprobacion_estado: 'RECHAZADO',
        causa_rechazo_id:
          +this.rechazoSolicitudQuiebreForm.formRechazo.get('tipo_id').value,
        motivo_rechazo:
          this.rechazoSolicitudQuiebreForm.formRechazo.get('motivo').value,
      },
    };
    this.flujoOTFacade.aprobarRechazarSolicitudQuiebre(request);
    this.closeModalRechazoSolicitudQuiebre();
  }

  aprobarSolicitudQuiebre(solicitud_id: number): void {
    let request: ReqAprobarRechazarSolicitudQuiebre = {
      id: solicitud_id,
      values: {
        aprobacion_estado: 'APROBADO',
      },
    };
    this.flujoOTFacade.aprobarRechazarSolicitudQuiebre(request);
    this.displayAprobarRechazarQuiebreGestor = false;
  }

  // DESQUIEBRE
  confirmarDesquiebre(): void {
    this.flujoOTFacade.desquiebre(this.ot_id);
    this.displayModalDesquiebre = false;
  }

  // CIERRE ADMINISTRATIVO
  confirmarCierreAdministrativo(): void {
    this.flujoOTFacade.cierreAdministrativo(this.ot_id);
    this.displayModalCierreAdministrativo = false;
  }

  // CAMBIO SUSTENTO FINANCIERO
  openModalCambiarSustentoFinanciero(): void {
    if (this.ot_id !== undefined) {
      this.displayModalCambiarSustentoFinanciero = true;
      this.otDetalleFacade.getDetalleOT(this.ot_id);
    }
  }

  closeModalCambiarSustentoFinanciero(): void {
    if (this.ot_id !== undefined) {
      this.displayModalCambiarSustentoFinanciero = false;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get formValid(): boolean {
    return this.form?.valid ?? false;
  }
}
