import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CarritoService } from '@model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: '[zwc-base-td-view]',
  templateUrl: './base-td.component.html',
  styleUrls: ['./base-td.component.scss'],
})
export class BaseTdViewComponent {
  @Input() item: CarritoService = null;

  constructor() {}
}
