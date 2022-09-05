import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CarritoService } from '@model';
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
    servicio_id: number;
  }>();

  trashICon = faTrash;

  constructor() {}

  callDeleteServicioFromCarrito(servicio_id: number): void {
    this.deleteServicio.emit({ servicio_id });
  }
}
