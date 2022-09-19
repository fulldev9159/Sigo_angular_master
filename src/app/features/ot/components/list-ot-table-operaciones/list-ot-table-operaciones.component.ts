import { Component, Input, OnInit } from '@angular/core';
import {
  faBook,
  faBookMedical,
  faCircleInfo,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { Accion } from '@model';

@Component({
  selector: 'zwc-list-ot-table-operaciones',
  templateUrl: './list-ot-table-operaciones.component.html',
  styleUrls: ['./list-ot-table-operaciones.component.scss'],
})
export class ListOtTableOperacionesComponent {
  @Input() acciones: Accion[];

  infoIcon = faCircleInfo;
  medicalIcon = faBookMedical;
  bookIcon = faBook;
  playIcon = faPlay;

  // MODALS
  displayModalAgregarRegistroLibroDeObras = false;
  constructor() {}

  findAccion(accion: string): boolean {
    return (
      this.acciones &&
      this.acciones.find(value => value.slug === accion) !== undefined
    );
  }
}
