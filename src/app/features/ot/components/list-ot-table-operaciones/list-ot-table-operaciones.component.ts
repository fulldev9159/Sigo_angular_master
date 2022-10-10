import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faBook,
  faBookMedical,
  faCircleInfo,
  faPlay,
  faSquareCheck,
  faSquareXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Accion, Dropdown, RequestAceptarRechazarOT } from '@model';
import { FlujoOTFacade } from '@storeOT/flujo-ot/flujo-ot.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'zwc-list-ot-table-operaciones',
  templateUrl: './list-ot-table-operaciones.component.html',
  styleUrls: ['./list-ot-table-operaciones.component.scss'],
})
export class ListOtTableOperacionesComponent implements OnDestroy {
  subscription: Subscription = new Subscription();

  // 83 TODO: MIGRAR INFORMACIONES
  // 84 TODO: MIGRAR AGREGAR REGISTRO LIBRO DE OBRAS
  // 85 TODO: MIGRAR VER LIBRO DE OBRAS
  // 86 TODO: PROBAR COMPORTAMIENTO CON MAS DE UNA OT
  // 87 TODO: CORREGIR COMO SE VE EL TOOLTIP DEL AGREGAR REGISTRO LIBRO DE OBRAS
  // 88 TODO: MIGRAR CASO EN QUE FALLE EL ACEPTAR OT PROVEEDOR Y SE DEBA EMPEZAR EN LA ETAPA DE ASIGNACION
  @Input() acciones: Accion[];
  @Input() ot_id: number;

  infoIcon = faCircleInfo;
  medicalIcon = faBookMedical;
  bookIcon = faBook;
  playIcon = faPlay;

  // MODALS
  displayModalAgregarRegistroLibroDeObras = false;
  displayModalAceptarInicial = false;
  displayModalRechazoOrdenDeTrabajo = false;
  displayModalAceptarProveedor = false;
  displayModalSolicitudPago = false;

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
    this.displayModalRechazoOrdenDeTrabajo = false;
  }

  rechazarOTInicial(): void {
    this.displayModalRechazoOrdenDeTrabajo = true;
  }

  // ACCIONES ETAPA: OT_ET_AUTORIZACION_PROVEEDOR
  openModalAceptacionOTProveedor(): void {
    this.displayModalAceptarProveedor = true;
    this.flujoOTFacade.getPosibleSupervisorDeTrabajos(this.ot_id);
  }

  rechazarOrdenProveedor(): void {
    this.displayModalRechazoOrdenDeTrabajo = true;
  }

  aceptarOrdenProveedor(): void {
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
