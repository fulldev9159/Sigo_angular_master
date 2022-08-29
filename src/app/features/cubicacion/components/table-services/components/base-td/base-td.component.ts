import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CarritoService } from '@model';

@Component({
  selector: '[zwc-base-td]',
  templateUrl: './base-td.component.html',
  styleUrls: ['./base-td.component.scss'],
})
export class BaseTdComponent {
  @Input() item: CarritoService = null;
  @Input() controlServicioCantidad: FormControl;
  @Input() controlUOCantidad: FormControl;
  constructor() {}
}
