import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CarritoService, CarritoUO, SessionData } from '@model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: '[zwc-multi-td]',
  templateUrl: './multi-td.component.html',
  styleUrls: ['./multi-td.component.scss'],
})
export class MultiTdComponent {
  @Input() uo: CarritoUO = null;
  @Input() servicio: CarritoService;
  @Input() controlUOCantidad: FormControl;
  @Input() showDelete = true;
  @Output() deleteUO = new EventEmitter<{
    servicio: CarritoService;
    uo: CarritoUO;
  }>();
  trashICon = faTrash;

  sessionData: SessionData = JSON.parse(localStorage.getItem('auth'))
    .sessionData;

  constructor() {}

  callDeleteUOFromServicioFromCarrito(
    servicio: CarritoService,
    uo: CarritoUO
  ): void {
    this.deleteUO.emit({ servicio, uo });
  }
}
