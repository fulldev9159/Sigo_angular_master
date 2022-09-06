import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CarritoUO } from '@model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: '[zwc-multi-td-view]',
  templateUrl: './multi-td.component.html',
  styleUrls: ['./multi-td.component.scss'],
})
export class MultiTdViewComponent {
  @Input() uo: CarritoUO = null;

  constructor() {}
}
