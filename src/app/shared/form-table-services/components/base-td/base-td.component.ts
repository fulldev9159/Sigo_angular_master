import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CarritoService, CarritoUO } from '@model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: '[zwc-base-td]',
  templateUrl: './base-td.component.html',
  styleUrls: ['./base-td.component.scss'],
})
export class BaseTdComponent {
  @Input() item: CarritoService = null;
  @Input() controlServicioCantidad: FormControl;
  @Input() controlUOCantidad: FormControl;
  @Output() deleteServicio = new EventEmitter<{
    servicio: CarritoService;
  }>();
  @Output() deleteUO = new EventEmitter<{
    servicio: CarritoService;
    uo: CarritoUO;
  }>();
  // @Output() showModalConfirmacion = new EventEmitter<{
  //   servicio_id: number;
  //   servicio_rowid: number;
  // }>();

  trashICon = faTrash;

  constructor() {}

  callDeleteServicioFromCarrito(servicio: CarritoService): void {
    this.deleteServicio.emit({ servicio });
  }

  callDeleteUOFromServicioFromCarrito(
    servicio: CarritoService,
    uo: CarritoUO
  ): void {
    this.deleteUO.emit({ servicio, uo });
  }

  // callShowModalConfirmacion(servicio_id: number, servicio_rowid: number): void {
  //   this.showModalConfirmacion.emit({ servicio_id, servicio_rowid });
  // }
}
