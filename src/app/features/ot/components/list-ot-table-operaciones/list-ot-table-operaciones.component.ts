import { Component, Input, OnInit } from '@angular/core';
import {
  faBook,
  faBookMedical,
  faCircleInfo,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { Accion, RequestAceptarRechazarOT } from '@model';
import { FlujoOTFacade } from '@storeOT/flujo-ot/flujo-ot.facades';

@Component({
  selector: 'zwc-list-ot-table-operaciones',
  templateUrl: './list-ot-table-operaciones.component.html',
  styleUrls: ['./list-ot-table-operaciones.component.scss'],
})
export class ListOtTableOperacionesComponent {
  // TODO: MIGRAR INFORMACIONES
  // TODO: MIGRAR AGREGAR REGISTRO LIBRO DE OBRAS
  // TODO: MIGRAR VER LIBRO DE OBRAS
  // TODO: PROBAR COMPORTAMIENTO CON MAS DE UNA OT
  // TODO: CORREGIR COMO SE VE EL TOOLTIP DEL AGREGAR REGISTRO LIBRO DE OBRAS
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

  constructor(private flujoOTFacade: FlujoOTFacade) {}

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

  findAccion(accion: string): boolean {
    return (
      this.acciones &&
      this.acciones.find(value => value.slug === accion) !== undefined
    );
  }
}
