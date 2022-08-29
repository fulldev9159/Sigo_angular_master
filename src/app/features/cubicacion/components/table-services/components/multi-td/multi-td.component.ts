import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CarritoUO } from '@model';

@Component({
  selector: '[zwc-multi-td]',
  templateUrl: './multi-td.component.html',
  styleUrls: ['./multi-td.component.scss'],
})
export class MultiTdComponent {
  @Input() uo: CarritoUO = null;
  @Input() controlUOCantidad: FormControl;

  constructor() {}
}
