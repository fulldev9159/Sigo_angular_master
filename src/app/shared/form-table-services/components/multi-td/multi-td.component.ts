import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CarritoUO } from '@model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: '[zwc-multi-td]',
  templateUrl: './multi-td.component.html',
  styleUrls: ['./multi-td.component.scss'],
})
export class MultiTdComponent {
  @Input() uo: CarritoUO = null;
  @Input() servicio_id: number;
  @Input() controlUOCantidad: FormControl;
  @Output() deleteUO = new EventEmitter<{
    servicio_id: number;
    uo_codigo: string;
  }>();
  trashICon = faTrash;

  constructor() {}

  callDeleteUOFromServicioFromCarrito(
    servicio_id: number,
    uo_codigo: string
  ): void {
    this.deleteUO.emit({ servicio_id, uo_codigo });
  }
}
