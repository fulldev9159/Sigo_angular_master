import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faBook,
  faBookMedical,
  faCircleInfo,
  faPlay,
  faSquareCheck,
  faSquareXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  Accion,
  Dropdown,
  RequestAceptarRechazarOT,
  RequestAprobarRechazarOperaciones,
  RequestCreateRegistroLibroObra,
} from '@model';
import { ViewRechazoComponent } from '@sharedOT/view-rechazo/view-rechazo.component';
import { FlujoOTFacade } from '@storeOT/flujo-ot/flujo-ot.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { OTDetalleFacade } from '@storeOT/ot-detalle/ot-detalle.facades';
import { map, Observable, Subscription } from 'rxjs';
import { RegistrarLibroObrasComponent } from '../registrar-libro-obras/registrar-libro-obras.component';

@Component({
  selector: 'zwc-list-ot-table-operaciones',
  templateUrl: './list-ot-table-operaciones.component.html',
  styleUrls: ['./list-ot-table-operaciones.component.scss'],
})
export class ListOtTableOperacionesComponent implements OnDestroy {
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

  infoIcon = faCircleInfo;
  medicalIcon = faBookMedical;
  bookIcon = faBook;
  playIcon = faPlay;

  // MODALS
  displayModalAgregarRegistroLibroDeObras = false;
  displayModalAceptarInicial = false;
  displayModalRechazoOrdenDeTrabajo = false;
  displayModalRechazoOrdenDeTrabajoInicial = false;
  displayModalAceptarProveedor = false;
  displayModalSolicitudPago = false;
  displayModalAprobacionOperaciones = false;
  displayModalRechazoObras = false;
  displayModalCerrarOT = false;
  displayModalAnularOT = false;

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

  //
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

  // FORM
  formControls = {
    trabajador_id: new FormControl('', [Validators.required]),
  };
  form: FormGroup = new FormGroup(this.formControls);

  // LOADINGS
  loadingPosibleSupervisorDeTrabajos$: Observable<boolean> =
    this.loadingsFacade.sendingGetPosibleSupervisorTrabajos$();

  checkIcon = faSquareCheck;
  cancelIcon = faSquareXmark;

  constructor(
    private flujoOTFacade: FlujoOTFacade,
    private otDetalleFacade: OTDetalleFacade,
    private loadingsFacade: LoadingsFacade
  ) {}

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

      this.registrarLibroObraForm.filesform.clear();

      this.otDetalleFacade.subirArchivoLibroObrasYregistrarLibroObras(
        +this.registrarLibroObraForm.form.get('categoria').value,
        this.registrarLibroObraForm.uploadedFiles['files'],
        request_registrar_libroObras
      );

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get formValid(): boolean {
    return this.form?.valid ?? false;
  }
}
